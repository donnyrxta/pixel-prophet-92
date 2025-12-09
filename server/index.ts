import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load env vars from root .env if running from root
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Auth middleware
const INTERNAL_PASSWORD = process.env.INTERNAL_API_PASSWORD || 'soho-internal-2024';

const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (authHeader.slice(7) !== INTERNAL_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// --- Logic from upload-leads.ts ---
app.post('/api/internal/upload-leads', checkAuth, async (req, res) => {
    try {
        const { csvContent } = req.body;

        if (csvContent) {
            const lines = csvContent.trim().split(/\r?\n/);
            if (lines.length < 2) return res.json({ leads: [], totalParsed: 0, validLeads: 0 });

            const headers = lines[0].split(',').map((h: string) => h.trim().toLowerCase().replace(/['"]/g, ''));
            const rows = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map((v: string) => v.trim().replace(/^["']|["']$/g, ''));
                const row: any = {};
                headers.forEach((header: string, idx: number) => {
                    row[header] = values[idx] || '';
                });
                rows.push(row);
            }

            const leads = rows
                .map(row => ({
                    name: row.name || row.property_name || row.company || row.business_name || '',
                    email: row.email || row.contact_email || row.email_address || '',
                    contactPerson: row.contact_person || row.contact_name || row.contact || row.person || undefined,
                    website: row.website || row.url || row.site || undefined,
                    description: row.description || row.about || row.bio || undefined,
                    rating: row.rating ? parseFloat(row.rating) : undefined,
                    numberOfReviews: row.reviews || row.review_count || row.number_of_reviews
                        ? parseInt(row.reviews || row.review_count || row.number_of_reviews)
                        : undefined,
                    category: row.category || row.type || row.industry || undefined,
                    address: row.address || row.location || row.city || undefined,
                }))
                .filter(lead => lead.name && lead.email);

            return res.json({
                success: true,
                leads,
                totalParsed: lines.length - 1,
                validLeads: leads.length,
            });
        }

        return res.status(400).json({ error: 'Please provide csvContent' });
    } catch (error) {
        console.error('Upload leads error:', error);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to parse leads' });
    }
});

// --- Logic from generate-email.ts ---
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'x-ai/grok-4.1-free';
const SYSTEM_PROMPT = `You are SoHo Connect's AI Email Strategist... (same prompt as implementation)`;

app.post('/api/internal/generate-email', checkAuth, async (req, res) => {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'OPENROUTER_API_KEY not configured' });
        }

        const { leads } = req.body;
        const leadsToProcess = leads || [];

        if (leadsToProcess.length === 0) {
            return res.status(400).json({ error: 'Please provide leads' });
        }

        const results = [];
        const rateLimitMs = 3000;

        // Process only first few for brevity in this single request loop if needed, 
        // but here we process all sequentially.
        for (let i = 0; i < leadsToProcess.length; i++) {
            const currentLead = leadsToProcess[i];

            try {
                const userContent = JSON.stringify({
                    property_name: currentLead.name,
                    contact_email: currentLead.email,
                    contact_name: currentLead.contactPerson || 'there',
                    website: currentLead.website,
                    description: currentLead.description,
                    tripadvisor_rating: currentLead.rating,
                    review_count: currentLead.numberOfReviews,
                    category: currentLead.category,
                    location: currentLead.address,
                    confidence_score: currentLead.rating ? 'high' : 'medium',
                });

                // Use node-fetch or global fetch (available in Node 20+, else need polyfill)
                // Ensure TSX or Node version supports fetch
                const response = await fetch(OPENROUTER_API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'https://sohoconnect.com',
                    },
                    body: JSON.stringify({
                        model: MODEL,
                        temperature: 0.35,
                        max_tokens: 800,
                        messages: [
                            { role: 'system', content: SYSTEM_PROMPT },
                            { role: 'user', content: userContent },
                        ],
                    }),
                });

                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`OpenRouter error: ${response.status} ${text}`);
                }

                const data = await response.json();
                const aiContent = data.choices?.[0]?.message?.content;

                if (!aiContent) throw new Error('Empty AI response');

                const cleanJson = aiContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                const parsedEmail = JSON.parse(cleanJson);
                results.push({ lead: currentLead, email: parsedEmail });

            } catch (error) {
                results.push({ lead: currentLead, error: error instanceof Error ? error.message : 'Unknown error' });
            }

            if (i < leadsToProcess.length - 1) {
                await new Promise(resolve => setTimeout(resolve, rateLimitMs));
            }
        }

        return res.json({
            success: true,
            results,
            processed: results.length,
            successful: results.filter(r => r.email).length,
            failed: results.filter(r => r.error).length,
        });

    } catch (error) {
        console.error('Generate email error:', error);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed' });
    }
});

// --- Logic from send-campaign.ts ---
const BREVO_API_BASE = 'https://api.brevo.com/v3';

async function sendBrevoEmail(apiKey: string, senderEmail: string, senderName: string, email: any) {
    try {
        const res = await fetch(`${BREVO_API_BASE}/smtp/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({
                sender: { email: senderEmail, name: senderName },
                to: [{ email: email.toEmail, name: email.toName }],
                subject: email.subject,
                htmlContent: `<html><body>${email.body.replace(/\n/g, '<br>')}</body></html>`,
            }),
        });

        if (!res.ok) {
            const text = await res.text();
            return { success: false, error: `Brevo error: ${res.status} ${text}` };
        }
        const data = await res.json();
        return { success: true, messageId: data.messageId };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

app.post('/api/internal/send-campaign', checkAuth, async (req, res) => {
    try {
        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) return res.status(500).json({ error: 'BREVO_API_KEY not configured' });

        const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@sohoconnect.co.zw';
        const senderName = process.env.BREVO_SENDER_NAME || 'SoHo Connect';
        const qualityScoreThreshold = parseInt(process.env.QUALITY_SCORE_THRESHOLD || '50');
        const rateLimitMs = parseInt(process.env.EMAIL_RATE_LIMIT_MS || '3000');

        const { emails, campaignId, dryRun = false } = req.body;
        if (!emails || !Array.isArray(emails)) return res.status(400).json({ error: 'No emails provided' });

        const results = [];

        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];

            if (email.leadScore !== undefined && email.leadScore < qualityScoreThreshold) {
                results.push({ email: email.toEmail, success: false, skipped: true, skipReason: 'Low score' });
                continue;
            }

            if (dryRun) {
                results.push({ email: email.toEmail, success: true, skipped: true, skipReason: 'Dry run' });
                continue;
            }

            const result = await sendBrevoEmail(apiKey, senderEmail, senderName, email);
            results.push({ email: email.toEmail, ...result });

            if (i < emails.length - 1 && result.success) {
                await new Promise(resolve => setTimeout(resolve, rateLimitMs));
            }
        }

        return res.json({
            success: true,
            campaignId,
            results,
            summary: {
                total: emails.length,
                sent: results.filter(r => r.success && !r.skipped).length,
                skipped: results.filter(r => r.skipped).length,
                failed: results.filter(r => !r.success && !r.skipped).length,
            }
        });

    } catch (error) {
        console.error('Send campaign error:', error);
        return res.status(500).json({ error: 'Failed to send campaign' });
    }
});

// --- Logic from campaign-logs.ts ---
import { createClient } from '@supabase/supabase-js';

const getSupabase = () => {
    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

app.all('/api/internal/campaign-logs', checkAuth, async (req, res) => {
    const supabase = getSupabase();
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

    const { action } = req.query;

    try {
        if (req.method === 'GET') {
            if (action === 'campaigns') {
                const { data, error } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false });
                if (error) throw error;
                return res.json({ campaigns: data });
            }
            if (action === 'logs') {
                const { campaignId, status, limit = 50 } = req.query;
                let query = supabase.from('outreach_logs').select('*').order('created_at', { ascending: false }).limit(Number(limit));
                if (campaignId) query = query.eq('campaign_id', campaignId);
                if (status) query = query.eq('status', status);
                const { data, error } = await query;
                if (error) throw error;
                return res.json({ logs: data });
            }
        }

        if (req.method === 'POST') {
            if (action === 'campaign') {
                const { name, totalLeads = 0 } = req.body;
                const { data, error } = await supabase.from('campaigns').insert({ name, total_leads: totalLeads, status: 'draft' }).select().single();
                if (error) throw error;
                return res.status(201).json({ campaign: data });
            }
            if (action === 'logs') {
                const { logs } = req.body;
                const { data, error } = await supabase.from('outreach_logs').insert(logs).select();
                if (error) throw error;
                return res.status(201).json({ logs: data });
            }
        }

        if (req.method === 'PUT' && action === 'campaign') {
            const { id } = req.query;
            const { data, error } = await supabase.from('campaigns').update(req.body).eq('id', id).select().single();
            if (error) throw error;
            return res.json({ campaign: data });
        }

        return res.status(400).json({ error: 'Invalid action' });

    } catch (error) {
        console.error('Campaign logs error:', error);
        return res.status(500).json({ error: 'Database error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Environment check:');
    console.log('- OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set' : 'Missing');
    console.log('- BREVO_API_KEY:', process.env.BREVO_API_KEY ? 'Set' : 'Missing');
    console.log('- SUPABASE_URL:', process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL ? 'Set' : 'Missing');
    console.log('- SUPABASE_KEY:', process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing');
});
