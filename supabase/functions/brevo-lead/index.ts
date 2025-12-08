import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const BREVO_API_BASE = 'https://api.brevo.com/v3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  message?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  authority?: string;
  sourceForm: string;
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrerUrl?: string;
  landingPage?: string;
  consentText?: string;
  bantScore?: number;
  leadTier?: 'hot' | 'warm' | 'cold';
}

interface BrevoContactPayload {
  email: string;
  attributes: Record<string, unknown>;
  listIds: number[];
  updateEnabled: boolean;
}

interface BrevoEmailPayload {
  sender: { name: string; email: string };
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent injection
function sanitizeInput(input: string | undefined): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 1000); // Limit length
}

// Normalize phone to E.164 format (basic Zimbabwe handling)
function normalizePhone(phone: string | undefined): string {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '263' + cleaned.substring(1);
  }
  if (!cleaned.startsWith('263') && cleaned.length <= 9) {
    cleaned = '263' + cleaned;
  }
  return '+' + cleaned;
}

// Create or update contact in Brevo
async function createBrevoContact(payload: BrevoContactPayload) {
  console.log('Creating/updating Brevo contact:', payload.email);
  
  const response = await fetch(`${BREVO_API_BASE}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY!,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Brevo contact creation failed:', errorText);
    throw new Error(`Brevo API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Send transactional email via Brevo
async function sendBrevoEmail(payload: BrevoEmailPayload) {
  console.log('Sending Brevo email to:', payload.to[0].email);
  
  const response = await fetch(`${BREVO_API_BASE}/smtp/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY!,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Brevo email sending failed:', errorText);
    throw new Error(`Brevo SMTP error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Generate acknowledgement email HTML
function generateAcknowledgementEmail(firstName: string, services?: string[]): string {
  const servicesHtml = services?.length 
    ? `<p>Services you're interested in: <strong>${services.join(', ')}</strong></p>` 
    : '';
    
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1c1917; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #003B7A 0%, #00A7E1 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { padding: 30px; background: #fafaf9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #57534e; }
        .cta { display: inline-block; background: #003B7A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Soho Connect</h1>
        </div>
        <div class="content">
          <h2>Hi ${firstName || 'there'}!</h2>
          <p>Thank you for reaching out to Soho Connect. We've received your inquiry and our team is reviewing it.</p>
          ${servicesHtml}
          <p>We typically respond within <strong>2-24 hours</strong> depending on the complexity of your request.</p>
          <p>In the meantime, feel free to explore our portfolio and services on our website.</p>
          <a href="https://sohoconnect.co.zw" class="cta">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>Soho Connect | 7 Luck Street, Harare CBD</p>
          <p>+263 71 457 0414 | info@sohoconnect.co.zw</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate internal notification email HTML
function generateInternalNotificationEmail(lead: LeadPayload): string {
  const tierColors = {
    hot: '#ef4444',
    warm: '#f59e0b',
    cold: '#6b7280'
  };
  
  const tierColor = lead.leadTier ? tierColors[lead.leadTier] : '#6b7280';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1c1917; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #003B7A; padding: 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 20px; }
        .tier-badge { display: inline-block; background: ${tierColor}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .content { padding: 20px; background: #fafaf9; }
        .field { margin-bottom: 12px; }
        .field-label { font-weight: 600; color: #57534e; font-size: 12px; text-transform: uppercase; }
        .field-value { margin-top: 4px; }
        .score { font-size: 24px; font-weight: bold; color: #003B7A; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Lead Captured</h1>
        </div>
        <div class="content">
          <p>
            <span class="tier-badge">${lead.leadTier || 'unscored'} lead</span>
            ${lead.bantScore ? `<span class="score" style="margin-left: 10px;">Score: ${lead.bantScore}/100</span>` : ''}
          </p>
          
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${lead.firstName || ''} ${lead.lastName || ''}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value"><a href="mailto:${lead.email}">${lead.email}</a></div>
          </div>
          
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value"><a href="tel:${lead.phone}">${lead.phone || 'Not provided'}</a></div>
          </div>
          
          ${lead.company ? `
          <div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${lead.company}</div>
          </div>
          ` : ''}
          
          ${lead.services?.length ? `
          <div class="field">
            <div class="field-label">Services Interested In</div>
            <div class="field-value">${lead.services.join(', ')}</div>
          </div>
          ` : ''}
          
          ${lead.budget ? `
          <div class="field">
            <div class="field-label">Budget</div>
            <div class="field-value">${lead.budget}</div>
          </div>
          ` : ''}
          
          ${lead.timeline ? `
          <div class="field">
            <div class="field-label">Timeline</div>
            <div class="field-value">${lead.timeline}</div>
          </div>
          ` : ''}
          
          ${lead.message ? `
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value">${lead.message}</div>
          </div>
          ` : ''}
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e7e5e4;">
          
          <div class="field">
            <div class="field-label">Source Form</div>
            <div class="field-value">${lead.sourceForm}</div>
          </div>
          
          ${lead.sourceUrl ? `
          <div class="field">
            <div class="field-label">Source URL</div>
            <div class="field-value"><a href="${lead.sourceUrl}">${lead.sourceUrl}</a></div>
          </div>
          ` : ''}
          
          ${lead.utmSource || lead.utmCampaign ? `
          <div class="field">
            <div class="field-label">Campaign Attribution</div>
            <div class="field-value">
              Source: ${lead.utmSource || '-'} | 
              Medium: ${lead.utmMedium || '-'} | 
              Campaign: ${lead.utmCampaign || '-'}
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Check API key
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY not configured');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload: LeadPayload = await req.json();
    
    console.log('Received lead payload:', JSON.stringify({
      ...payload,
      email: payload.email ? '***@***' : undefined // Mask email in logs
    }));

    // Validate required fields
    if (!payload.email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!isValidEmail(payload.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize all inputs
    const sanitized: LeadPayload = {
      email: payload.email.toLowerCase().trim(),
      firstName: sanitizeInput(payload.firstName),
      lastName: sanitizeInput(payload.lastName),
      phone: normalizePhone(payload.phone),
      company: sanitizeInput(payload.company),
      message: sanitizeInput(payload.message),
      services: payload.services?.map(s => sanitizeInput(s)),
      budget: sanitizeInput(payload.budget),
      timeline: sanitizeInput(payload.timeline),
      authority: sanitizeInput(payload.authority),
      sourceForm: sanitizeInput(payload.sourceForm) || 'unknown',
      sourceUrl: sanitizeInput(payload.sourceUrl),
      utmSource: sanitizeInput(payload.utmSource),
      utmMedium: sanitizeInput(payload.utmMedium),
      utmCampaign: sanitizeInput(payload.utmCampaign),
      utmContent: sanitizeInput(payload.utmContent),
      referrerUrl: sanitizeInput(payload.referrerUrl),
      landingPage: sanitizeInput(payload.landingPage),
      consentText: sanitizeInput(payload.consentText),
      bantScore: payload.bantScore,
      leadTier: payload.leadTier,
    };

    // Determine list ID based on lead tier (default to general list)
    // You can configure these list IDs in Brevo dashboard
    const listIds: number[] = [];
    // Add your Brevo list IDs here when configured
    // e.g., if (sanitized.leadTier === 'hot') listIds.push(HOT_LEADS_LIST_ID);

    // Create/update contact in Brevo
    const contactPayload: BrevoContactPayload = {
      email: sanitized.email,
      attributes: {
        FIRSTNAME: sanitized.firstName,
        LASTNAME: sanitized.lastName,
        PHONE: sanitized.phone,
        COMPANY: sanitized.company,
        MESSAGE: sanitized.message,
        SERVICES: sanitized.services?.join(', '),
        BUDGET: sanitized.budget,
        TIMELINE: sanitized.timeline,
        AUTHORITY: sanitized.authority,
        SOURCE_FORM: sanitized.sourceForm,
        SOURCE_URL: sanitized.sourceUrl,
        UTM_SOURCE: sanitized.utmSource,
        UTM_MEDIUM: sanitized.utmMedium,
        UTM_CAMPAIGN: sanitized.utmCampaign,
        UTM_CONTENT: sanitized.utmContent,
        REFERRER_URL: sanitized.referrerUrl,
        LANDING_PAGE: sanitized.landingPage,
        CONSENT_TEXT: sanitized.consentText,
        CONSENT_TS: new Date().toISOString(),
        BANT_SCORE: sanitized.bantScore,
        LEAD_TIER: sanitized.leadTier,
      },
      listIds,
      updateEnabled: true,
    };

    await createBrevoContact(contactPayload);
    console.log('Contact created/updated successfully');

    // Send acknowledgement email to lead
    try {
      await sendBrevoEmail({
        sender: {
          name: 'Soho Connect',
          email: 'hello@sohoconnect.co.zw',
        },
        to: [{ email: sanitized.email, name: sanitized.firstName }],
        subject: 'Thank you for contacting Soho Connect',
        htmlContent: generateAcknowledgementEmail(sanitized.firstName || '', sanitized.services),
      });
      console.log('Acknowledgement email sent');
    } catch (emailError) {
      console.error('Failed to send acknowledgement email:', emailError);
      // Don't fail the request if email fails
    }

    // Send internal notification (for hot leads especially)
    try {
      await sendBrevoEmail({
        sender: {
          name: 'Soho Connect Leads',
          email: 'leads@sohoconnect.co.zw',
        },
        to: [{ email: 'info@sohoconnect.co.zw', name: 'Sales Team' }],
        subject: `[${sanitized.leadTier?.toUpperCase() || 'NEW'}] Lead: ${sanitized.firstName} ${sanitized.lastName} - ${sanitized.sourceForm}`,
        htmlContent: generateInternalNotificationEmail(sanitized),
      });
      console.log('Internal notification sent');
    } catch (emailError) {
      console.error('Failed to send internal notification:', emailError);
      // Don't fail the request if email fails
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Lead captured successfully'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
