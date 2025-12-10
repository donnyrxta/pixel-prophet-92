/**
 * Internal API: Send Campaign Emails
 * Sends emails via Brevo with rate limiting and follow-up scheduling
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API_BASE = 'https://api.brevo.com/v3';

// Simple auth check
const INTERNAL_PASSWORD = process.env.INTERNAL_API_PASSWORD || 'soho-internal-2024';

function checkAuth(req: VercelRequest): boolean {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    return authHeader.slice(7) === INTERNAL_PASSWORD;
}

interface EmailToSend {
    toEmail: string;
    toName?: string;
    subject: string;
    body: string;
    leadScore?: number;
    propertyName?: string;
}

async function sendBrevoEmail(
    apiKey: string,
    senderEmail: string,
    senderName: string,
    email: EmailToSend
): Promise<{ success: boolean; messageId?: string; error?: string }> {
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

        const data = await res.json() as { messageId?: string };
        return { success: true, messageId: data.messageId };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
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
        const brevoApiKey = process.env.BREVO_API_KEY;
        if (!brevoApiKey) {
            return res.status(500).json({ error: 'BREVO_API_KEY not configured' });
        }

        const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@sohoconnect.co.zw';
        const senderName = process.env.BREVO_SENDER_NAME || 'SoHo Connect';
        const qualityScoreThreshold = parseInt(process.env.QUALITY_SCORE_THRESHOLD || '50');
        const rateLimitMs = parseInt(process.env.EMAIL_RATE_LIMIT_MS || '3000');

        const {
            emails,
            campaignId,
            dryRun = false
        } = req.body as {
            emails: EmailToSend[];
            campaignId?: string;
            dryRun?: boolean;
        };

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({ error: 'Please provide emails array' });
        }

        const results: {
            email: string;
            success: boolean;
            messageId?: string;
            error?: string;
            skipped?: boolean;
            skipReason?: string;
        }[] = [];

        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];

            // Quality gate: skip low-scoring leads
            if (email.leadScore !== undefined && email.leadScore < qualityScoreThreshold) {
                results.push({
                    email: email.toEmail,
                    success: false,
                    skipped: true,
                    skipReason: `Lead score ${email.leadScore} below threshold ${qualityScoreThreshold}`,
                });
                continue;
            }

            // Dry run mode - don't actually send
            if (dryRun) {
                results.push({
                    email: email.toEmail,
                    success: true,
                    skipped: true,
                    skipReason: 'Dry run mode - email not sent',
                });
                continue;
            }

            // Send via Brevo
            const result = await sendBrevoEmail(brevoApiKey, senderEmail, senderName, email);
            results.push({
                email: email.toEmail,
                ...result,
            });

            // Rate limiting between sends
            if (i < emails.length - 1 && result.success) {
                await new Promise(resolve => setTimeout(resolve, rateLimitMs));
            }
        }

        const sent = results.filter(r => r.success && !r.skipped).length;
        const skipped = results.filter(r => r.skipped).length;
        const failed = results.filter(r => !r.success && !r.skipped).length;

        return res.status(200).json({
            success: true,
            campaignId,
            results,
            summary: {
                total: emails.length,
                sent,
                skipped,
                failed,
            },
        });

    } catch (error) {
        console.error('Send campaign error:', error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to send campaign',
        });
    }
}
