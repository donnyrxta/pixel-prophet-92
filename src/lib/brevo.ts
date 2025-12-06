const BREVO_API_BASE = 'https://api.brevo.com/v3';

// Helper to get env vars safely in both Vite and Node
const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
    return (import.meta as any).env[key];
  }
  return undefined;
};

// Helper to read the API key from env; keeps secret out of client bundles.
// In Vite, use import.meta.env instead of process.env
const apiKey = getEnv('VITE_BREVO_API_KEY') || getEnv('BREVO_API_KEY');

// Ensure we fail fast if the key is missing
if (!apiKey) {
  // eslint-disable-next-line no-console
  console.warn('VITE_BREVO_API_KEY is not set; Brevo calls will be skipped');
}

type ContactPayload = {
  email: string;
  attributes?: Record<string, unknown>;
  listIds?: number[];
  emailBlacklisted?: boolean;
  smsBlacklisted?: boolean;
  updateEnabled?: boolean;
};

type EventPayload = {
  event: string;
  properties?: Record<string, unknown>;
};

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  ...(apiKey ? { 'api-key': apiKey } : {}), // attach key only when available
};

export async function upsertContact(payload: ContactPayload) {
  // Creates or updates a contact; Brevo uses updateEnabled flag to avoid duplicates.
  if (!apiKey) return { skipped: true };
  const res = await fetch(`${BREVO_API_BASE}/contacts`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ updateEnabled: true, ...payload }),
  });
  // Brevo returns 204 on update and 201 on create; treat any 2xx as success.
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo upsert failed: ${res.status} ${text}`);
  }
  return res.status;
}

export async function addContactToList(email: string, listIds: number[]) {
  // Adds an existing contact to list(s); convenient for segmentation.
  if (!apiKey) return { skipped: true };
  const res = await fetch(`${BREVO_API_BASE}/contacts/lists`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ emails: [email], listIds }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo list add failed: ${res.status} ${text}`);
  }
  return res.status;
}

export async function sendTransactionalTemplate(
  templateId: number,
  to: { email: string; name?: string }[],
  params?: Record<string, unknown>
) {
  // Sends a transactional email (receipts, DOI, notifications) using a Brevo template.
  if (!apiKey) return { skipped: true };
  const senderEmail = getEnv('VITE_BREVO_SENDER_EMAIL') || 'info@sohoconnect.co.zw';
  
  const res = await fetch(`${BREVO_API_BASE}/smtp/email`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      templateId,
      to,
      params,
      sender: { email: senderEmail },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo transactional failed: ${res.status} ${text}`);
  }
  return res.status;
}

export async function trackEvent(payload: EventPayload) {
  // Sends a custom event for personalization; free tier allows basic events.
  if (!apiKey) return { skipped: true };
  const res = await fetch(`${BREVO_API_BASE}/events`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo event failed: ${res.status} ${text}`);
  }
  return res.status;
}

export const trackBrevoEvent = trackEvent;

export function extractClientMeta(req: any) {
  // Captures lightweight metadata for consent/audit trails.
  return {
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown',
    ua: req.headers['user-agent'] || 'unknown',
    referer: req.headers.referer || req.headers.origin || 'unknown',
  };
}

export async function createBrevoContact(payload: ContactPayload) {
  if (!apiKey) return { skipped: true } as const;
  return upsertContact(payload);
}

export async function sendBrevoEmail(params: {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
}) {
  if (!apiKey) return { skipped: true } as const;
  const senderEmail = getEnv('VITE_BREVO_SENDER_EMAIL') || 'info@sohoconnect.co.zw';

  const res = await fetch(`${BREVO_API_BASE}/smtp/email`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      sender: { email: senderEmail },
      to: [{ email: params.toEmail, name: params.toName }],
      subject: params.subject,
      htmlContent: params.htmlContent,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo SMTP email failed: ${res.status} ${text}`);
  }
  return res.status;
}
