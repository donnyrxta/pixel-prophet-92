/**
 * Internal API: Campaign Logs
 * CRUD operations for campaign and outreach logs
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple auth check
const INTERNAL_PASSWORD = process.env.INTERNAL_API_PASSWORD || 'soho-internal-2024';

function checkAuth(req: VercelRequest): boolean {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    return authHeader.slice(7) === INTERNAL_PASSWORD;
}

// Supabase client for serverless
async function getSupabaseClient() {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase credentials not configured');
    }

    return createClient(supabaseUrl, supabaseKey);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!checkAuth(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const supabase = await getSupabaseClient();
        const { action } = req.query;

        // GET: List campaigns or logs
        if (req.method === 'GET') {
            if (action === 'campaigns') {
                const { data, error } = await supabase
                    .from('campaigns')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                return res.status(200).json({ campaigns: data });
            }

            if (action === 'logs') {
                const { campaignId, status, limit = 50 } = req.query;
                let query = supabase
                    .from('outreach_logs')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(Number(limit));

                if (campaignId) query = query.eq('campaign_id', campaignId);
                if (status) query = query.eq('status', status);

                const { data, error } = await query;
                if (error) throw error;
                return res.status(200).json({ logs: data });
            }

            return res.status(400).json({ error: 'Invalid action. Use ?action=campaigns or ?action=logs' });
        }

        // POST: Create campaign or log entries
        if (req.method === 'POST') {
            if (action === 'campaign') {
                const { name, totalLeads = 0 } = req.body;
                if (!name) {
                    return res.status(400).json({ error: 'Campaign name is required' });
                }

                const { data, error } = await supabase
                    .from('campaigns')
                    .insert({ name, total_leads: totalLeads, status: 'draft' })
                    .select()
                    .single();

                if (error) throw error;
                return res.status(201).json({ campaign: data });
            }

            if (action === 'logs') {
                const { logs } = req.body;
                if (!logs || !Array.isArray(logs)) {
                    return res.status(400).json({ error: 'logs array is required' });
                }

                const { data, error } = await supabase
                    .from('outreach_logs')
                    .insert(logs)
                    .select();

                if (error) throw error;
                return res.status(201).json({ logs: data, count: data.length });
            }

            return res.status(400).json({ error: 'Invalid action. Use ?action=campaign or ?action=logs' });
        }

        // PUT: Update campaign or log
        if (req.method === 'PUT') {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'id query parameter is required' });
            }

            if (action === 'campaign') {
                const { data, error } = await supabase
                    .from('campaigns')
                    .update(req.body)
                    .eq('id', id)
                    .select()
                    .single();

                if (error) throw error;
                return res.status(200).json({ campaign: data });
            }

            if (action === 'log') {
                const { data, error } = await supabase
                    .from('outreach_logs')
                    .update(req.body)
                    .eq('id', id)
                    .select()
                    .single();

                if (error) throw error;
                return res.status(200).json({ log: data });
            }

            return res.status(400).json({ error: 'Invalid action' });
        }

        // DELETE: Remove campaign or log
        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'id query parameter is required' });
            }

            if (action === 'campaign') {
                const { error } = await supabase
                    .from('campaigns')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                return res.status(200).json({ deleted: true });
            }

            if (action === 'log') {
                const { error } = await supabase
                    .from('outreach_logs')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                return res.status(200).json({ deleted: true });
            }

            return res.status(400).json({ error: 'Invalid action' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Campaign logs error:', error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to process request',
        });
    }
}
