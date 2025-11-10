import { Campaign } from './types';

const METRICS_KEY = 'sc_ad_metrics';

type MetricsStore = Record<string, { impressions: number; clicks: number; conversions?: number }>;

function readStore(): MetricsStore {
  try {
    const raw = localStorage.getItem(METRICS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(store: MetricsStore) {
  localStorage.setItem(METRICS_KEY, JSON.stringify(store));
}

export function trackImpression(campaignId: string) {
  const store = readStore();
  const m = store[campaignId] ?? { impressions: 0, clicks: 0 };
  m.impressions++;
  store[campaignId] = m;
  writeStore(store);
}

export function trackClick(campaignId: string) {
  const store = readStore();
  const m = store[campaignId] ?? { impressions: 0, clicks: 0 };
  m.clicks++;
  store[campaignId] = m;
  writeStore(store);
}

export function getMetrics(campaignId: string) {
  const store = readStore();
  const m = store[campaignId] ?? { impressions: 0, clicks: 0 };
  const ctr = m.impressions ? +(100 * (m.clicks / m.impressions)).toFixed(2) : 0;
  return { ...m, ctr };
}

export function attachCampaignMetrics(campaign: Campaign) {
  const m = getMetrics(campaign.id);
  campaign.metrics = { impressions: m.impressions, clicks: m.clicks };
}

