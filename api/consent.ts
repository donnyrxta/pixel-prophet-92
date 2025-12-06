import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createConsentEntry } from '../src/lib/strapi-client';
import { upsertContact, extractClientMeta } from '../src/lib/brevo';

type ConsentBody = {
  email?: string;
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
  source?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Accepts consent preferences, saves to Strapi, and updates Brevo contact attributes.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, analytics, marketing, necessary, source }: ConsentBody = req.body;
    const meta = extractClientMeta(req); // capture IP/UA for audit trail

    // Persist consent to Strapi for compliance evidence.
    await createConsentEntry({
      email: email || 'anonymous',
      analytics,
      marketing,
      necessary,
      source: source || meta.referer,
      ...meta,
    });

    // Update Brevo contact attributes + blacklist flags per consent.
    if (email) {
      await upsertContact({
        email,
        attributes: {
          CONSENT_ANALYTICS: analytics,
          CONSENT_MARKETING: marketing,
          CONSENT_NECESSARY: necessary,
          CONSENT_SOURCE: source || meta.referer,
        },
        emailBlacklisted: !marketing, // unsubscribe from marketing if not permitted
        smsBlacklisted: true, // default to SMS opt-out on free tier for safety
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    // Log and surface minimal detail to client.
    console.error('consent api error', error);
    return res.status(500).json({ error: 'Unable to persist consent' });
  }
}
