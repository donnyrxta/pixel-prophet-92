import type { VercelRequest, VercelResponse } from '@vercel/node';
import { upsertContact } from '../src/lib/brevo';

/**
 * Brevo Webhook Handler
 * 
 * Processes email delivery events from Brevo:
 * - bounce: Hard/soft bounces - mark contact as invalid
 * - unsubscribe: User opted out - update blacklist status
 * - complaint: Spam report - immediately blacklist
 * - click: Link clicked - log for analytics
 * - open: Email opened - log for analytics
 * 
 * Configure in Brevo Dashboard → Settings → Webhooks:
 * URL: https://yourdomain.com/api/brevo-webhook
 * Events: bounce, unsubscribe, complaint, click, open
 */

type BrevoEvent = {
  event: 'bounce' | 'hard_bounce' | 'soft_bounce' | 'unsubscribe' | 'complaint' | 'spam' | 'click' | 'open' | 'delivered' | 'request';
  email: string;
  date?: string;
  ts?: number;
  ts_event?: number;
  reason?: string;
  tag?: string;
  message_id?: string;
  campaign_id?: number;
  link?: string;
  ip?: string;
};

// Rate limiting: track requests per IP
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per minute
const RATE_WINDOW = 60000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers for preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Signature');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    console.warn('[brevo-webhook] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting check
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
  if (isRateLimited(clientIp)) {
    console.warn('[brevo-webhook] Rate limited:', clientIp);
    return res.status(429).json({ error: 'Too many requests' });
  }

  try {
    // Brevo sends events as an array or single object
    const rawBody = req.body;
    const events: BrevoEvent[] = Array.isArray(rawBody) ? rawBody : [rawBody];

    console.log(`[brevo-webhook] Received ${events.length} event(s)`);

    const results: { email: string; event: string; action: string }[] = [];

    for (const event of events) {
      if (!event.email || !event.event) {
        console.warn('[brevo-webhook] Invalid event payload:', event);
        continue;
      }

      const email = event.email.toLowerCase().trim();
      const eventType = event.event.toLowerCase();

      console.log(`[brevo-webhook] Processing: ${eventType} for ${email}`);

      switch (eventType) {
        case 'bounce':
        case 'hard_bounce':
          // Hard bounce: permanent delivery failure
          // Mark contact as invalid to prevent future sends
          await upsertContact({
            email,
            attributes: {
              BOUNCED: true,
              BOUNCE_DATE: new Date().toISOString(),
              BOUNCE_REASON: event.reason || 'hard_bounce',
            },
            emailBlacklisted: true, // Stop all email sends
          });
          results.push({ email, event: eventType, action: 'blacklisted' });
          console.warn(`[brevo-webhook] Hard bounce: ${email} - ${event.reason}`);
          break;

        case 'soft_bounce':
          // Soft bounce: temporary failure (mailbox full, server down)
          // Don't blacklist, but track for monitoring
          await upsertContact({
            email,
            attributes: {
              SOFT_BOUNCE_COUNT: 1, // Will increment on each occurrence
              LAST_SOFT_BOUNCE: new Date().toISOString(),
              SOFT_BOUNCE_REASON: event.reason || 'temporary_failure',
            },
          });
          results.push({ email, event: eventType, action: 'tracked' });
          console.info(`[brevo-webhook] Soft bounce: ${email} - ${event.reason}`);
          break;

        case 'unsubscribe':
          // User clicked unsubscribe link
          // Must honor immediately per CAN-SPAM/GDPR
          await upsertContact({
            email,
            attributes: {
              UNSUBSCRIBED: true,
              UNSUBSCRIBE_DATE: new Date().toISOString(),
            },
            emailBlacklisted: true, // Stop marketing emails
          });
          results.push({ email, event: eventType, action: 'unsubscribed' });
          console.info(`[brevo-webhook] Unsubscribed: ${email}`);
          break;

        case 'complaint':
        case 'spam':
          // User marked email as spam
          // Critical: immediately blacklist and log for reputation monitoring
          await upsertContact({
            email,
            attributes: {
              SPAM_COMPLAINT: true,
              COMPLAINT_DATE: new Date().toISOString(),
            },
            emailBlacklisted: true,
          });
          results.push({ email, event: eventType, action: 'spam_complaint' });
          console.error(`[brevo-webhook] SPAM COMPLAINT: ${email} - Investigate immediately!`);
          break;

        case 'click':
          // User clicked a link in the email
          // Track for engagement scoring
          await upsertContact({
            email,
            attributes: {
              LAST_CLICK: new Date().toISOString(),
              LAST_CLICK_URL: event.link || 'unknown',
              ENGAGEMENT_SCORE: 10, // Increment engagement
            },
          });
          results.push({ email, event: eventType, action: 'engagement_tracked' });
          console.log(`[brevo-webhook] Click: ${email} on ${event.link}`);
          break;

        case 'open':
          // User opened the email
          // Track for engagement scoring
          await upsertContact({
            email,
            attributes: {
              LAST_OPEN: new Date().toISOString(),
              ENGAGEMENT_SCORE: 5, // Increment engagement
            },
          });
          results.push({ email, event: eventType, action: 'engagement_tracked' });
          console.log(`[brevo-webhook] Open: ${email}`);
          break;

        case 'delivered':
          // Email successfully delivered
          // Good for monitoring delivery rates
          console.log(`[brevo-webhook] Delivered: ${email}`);
          results.push({ email, event: eventType, action: 'logged' });
          break;

        case 'request':
          // Email send requested (pre-delivery)
          console.log(`[brevo-webhook] Request: ${email}`);
          results.push({ email, event: eventType, action: 'logged' });
          break;

        default:
          console.log(`[brevo-webhook] Unhandled event: ${eventType} for ${email}`);
          results.push({ email, event: eventType, action: 'ignored' });
      }
    }

    return res.status(200).json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error: any) {
    console.error('[brevo-webhook] Error processing webhook:', error.message);
    return res.status(500).json({
      error: 'Webhook processing failed',
      message: error.message,
    });
  }
}
