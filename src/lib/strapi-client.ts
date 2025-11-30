// Safe environment variable access for Vite/Browser and Node/Tests
const getEnv = () => {
  try {
    // Check for Vite's import.meta.env
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env;
    }
  } catch {
    // Ignore errors accessing import.meta
  }

  try {
    // Check for Node's process.env
    // @ts-ignore - process might not be defined in browser
    if (typeof process !== 'undefined' && process.env) {
      return process.env;
    }
  } catch {
    // Ignore errors accessing process
  }

  return {};
};

const env = getEnv();
const STRAPI_BASE_URL: string = env.VITE_STRAPI_BASE_URL || 'http://localhost:1337';
const STRAPI_TOKEN: string | undefined = env.VITE_STRAPI_API_TOKEN;

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}), // use token when present
};

async function post(path: string, body: Record<string, unknown>) {
  // Helper for POST calls to Strapi REST API.
  const res = await fetch(`${STRAPI_BASE_URL}${path}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi POST ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function createConsentEntry(payload: Record<string, unknown>) {
  // Persists consent choices for audit; assumes a Strapi collection type `consents`.
  return post('/api/consents', { data: payload });
}

export async function createLeadEntry(payload: Record<string, unknown>) {
  // Persists captured leads; assumes a Strapi collection type `leads`.
  return post('/api/leads', { data: payload });
}

export async function recordEvent(payload: Record<string, unknown>) {
  // Records generic events; can be used for GA4 parity if needed.
  return post('/api/events', { data: payload });
}
