/**
 * Nightly sync utility to reconcile Brevo contacts (tags, bounces, unsubscribes).
 * Intended to run via cron/CI: `ts-node scripts/brevo-sync.ts`
 */
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_BASE = 'https://api.brevo.com/v3';

if (!BREVO_API_KEY) {
  console.error('BREVO_API_KEY missing; aborting sync');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'api-key': BREVO_API_KEY,
};

async function fetchBounces() {
  // Pulls hard bounces to mirror suppression locally.
  const res = await fetch(`${BREVO_API_BASE}/smtp/statistics/reports?event=hardBounce`, { headers });
  if (!res.ok) throw new Error(`Failed to fetch bounces: ${res.status}`);
  return res.json();
}

async function main() {
  // Skeleton: integrate with Strapi to mark contacts as bounced/unsubscribed.
  const bounces = await fetchBounces();
  console.log('Bounces', JSON.stringify(bounces, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
