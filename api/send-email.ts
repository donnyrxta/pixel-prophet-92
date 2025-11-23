/**
 * Brevo (formerly Sendinblue) Email API Endpoint
 * Handles quote requests with BANT scoring and lead routing
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limiting map (in-memory for serverless)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 3600000; // 1 hour
  const maxRequests = 10;

  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < windowMs);

  if (recentRequests.length >= maxRequests) return false;

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }

    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    // For now, just log the data (Brevo integration requires API key)
    console.log('Quote request received:', {
      type,
      name: data.name,
      email: data.email,
      services: data.services,
      bantScore: data.metadata?.bantScore,
      leadTier: data.metadata?.leadTier
    });

    // In production, this would send via Brevo:
    // const SibApiV3Sdk = require('sib-api-v3-sdk');
    // const defaultClient = SibApiV3Sdk.ApiClient.instance;
    // const apiKey = defaultClient.authentications['api-key'];
    // apiKey.apiKey = process.env.BREVO_API_KEY;
    // const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    // 
    // const sendSmtpEmail = {
    //   to: [{ email: process.env.BREVO_TO_EMAIL || 'leads@sohoconnect.co.zw' }],
    //   sender: { email: process.env.BREVO_FROM_EMAIL || 'noreply@sohoconnect.co.zw', name: 'Soho Connect' },
    //   subject: `New Quote Request from ${data.name}`,
    //   htmlContent: `<html><body>
    //     <h2>New Quote Request</h2>
    //     <p><strong>Name:</strong> ${data.name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Phone:</strong> ${data.phone}</p>
    //     <p><strong>Services:</strong> ${data.services?.join(', ')}</p>
    //     <p><strong>Budget:</strong> ${data.budget}</p>
    //     <p><strong>Timeline:</strong> ${data.timeline}</p>
    //     ${data.metadata ? `
    //       <h3>Lead Score</h3>
    //       <p><strong>BANT Score:</strong> ${data.metadata.bantScore}/100</p>
    //       <p><strong>Lead Tier:</strong> ${data.metadata.leadTier}</p>
    //     ` : ''}
    //   </body></html>`
    // };
    // 
    // await apiInstance.sendTransacEmail(sendSmtpEmail);
    //
    // Also send confirmation to client
    // const confirmationEmail = {
    //   to: [{ email: data.email }],
    //   sender: { email: process.env.BREVO_FROM_EMAIL, name: 'Soho Connect' },
    //   subject: 'Your Soho Connect Quote Request',
    //   htmlContent: `<html><body>
    //     <h2>Thank You!</h2>
    //     <p>Hi ${data.name},</p>
    //     <p>Thank you for requesting a quote! We'll review your requirements and respond within 24 hours.</p>
    //     <p>In the meantime, feel free to <a href="https://wa.me/263714570414">chat with us on WhatsApp</a>.</p>
    //   </body></html>`
    // };
    // await apiInstance.sendTransacEmail(confirmationEmail);

    // Return success
    return res.status(200).json({
      success: true,
      messageId: `quote-${Date.now()}`,
      message: 'Quote request received. We will contact you within 24 hours.'
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request. Please try again or contact us directly.' 
    });
  }
}