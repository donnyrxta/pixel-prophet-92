/**
 * Internal API: Generate AI Emails
 * Uses OpenRouter/Grok to generate personalized cold emails
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'x-ai/grok-4.1-free';

// Simple auth check
const INTERNAL_PASSWORD = process.env.INTERNAL_API_PASSWORD || 'soho-internal-2024';

function checkAuth(req: VercelRequest): boolean {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    return authHeader.slice(7) === INTERNAL_PASSWORD;
}

const SYSTEM_PROMPT = `You are SoHo Connect's AI Email Strategist. Your mission is to create hyper-personalized cold emails that convert hospitality decision-makers into discovery call bookings.

CORE PRINCIPLES:
- Use ONLY the provided company data—NO external web browsing
- Reference specific details from the property description, rating, or review count
- Every email must incorporate SoHo Connect's value prop: turning free Wi-Fi into a 23% repeat booking increase
- Subject lines must feel like a peer-to-peer question, not a sales pitch
- Body must use the '3 Questions' framework: reveal data blindness → quantify loss → offer audit/calculator
- Keep total length < 140 words for initial email, < 80 for follow-up
- Write at a 6th-grade reading level
- Never use 'excited,' 'thrilled,' or generic flattery
- Always end with a micro-commitment CTA ('Want me to send the breakdown?')

FORBIDDEN PHRASES:
- 'I saw that...'
- 'Congratulations on...'
- 'We help companies like yours...'
- 'Just following up...'

OUTPUT FORMAT (Strict JSON):
{
  "initial_email": {
    "subject": "String (max 50 chars)",
    "body": "String (max 140 words)",
    "personalization_hook": "String",
    "lead_score": "Number (1-100)"
  },
  "follow_up_email": {
    "subject": "String",
    "body": "String",
    "send_delay_hours": "Number"
  },
  "offer_asset": {
    "type": "calculator|audit|both",
    "reasoning": "String"
  },
  "automation_flags": {
    "send_immediately": "Boolean",
    "requires_manual_review": "Boolean"
  }
}`;

interface LeadData {
    name: string;
    email: string;
    contactPerson?: string;
    website?: string;
    description?: string;
    rating?: number;
    numberOfReviews?: number;
    category?: string;
    address?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!checkAuth(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'OPENROUTER_API_KEY not configured' });
        }

        const { lead, leads } = req.body as { lead?: LeadData; leads?: LeadData[] };

        // Single lead or batch processing
        const leadsToProcess = leads || (lead ? [lead] : []);

        if (leadsToProcess.length === 0) {
            return res.status(400).json({ error: 'Please provide lead or leads in request body' });
        }

        const results: { lead: LeadData; email?: any; error?: string }[] = [];
        const rateLimitMs = 3000; // 3 seconds between requests

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

                if (!aiContent) {
                    throw new Error('Empty AI response');
                }

                // Parse JSON from AI response
                const cleanJson = aiContent
                    .replace(/```json\n?/g, '')
                    .replace(/```\n?/g, '')
                    .trim();

                const parsedEmail = JSON.parse(cleanJson);
                results.push({ lead: currentLead, email: parsedEmail });

            } catch (error) {
                results.push({
                    lead: currentLead,
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }

            // Rate limiting between requests
            if (i < leadsToProcess.length - 1) {
                await new Promise(resolve => setTimeout(resolve, rateLimitMs));
            }
        }

        return res.status(200).json({
            success: true,
            results,
            processed: results.length,
            successful: results.filter(r => r.email).length,
            failed: results.filter(r => r.error).length,
        });

    } catch (error) {
        console.error('Generate email error:', error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to generate emails',
        });
    }
}
