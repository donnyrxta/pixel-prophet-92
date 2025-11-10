import { ABTestAssignment, AdVariant } from './types';

function getOrCreateVisitorId(): string {
  const key = 'sc_ad_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = Math.random().toString(36).slice(2);
    localStorage.setItem(key, id);
  }
  return id;
}

function hashToIndex(input: string, modulo: number): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h << 5) - h + input.charCodeAt(i);
  return Math.abs(h) % modulo;
}

export function chooseVariant(variants: AdVariant[]): ABTestAssignment {
  const visitorId = getOrCreateVisitorId();
  // Stable assignment based on hash to keep experience consistent per visitor
  const index = hashToIndex(visitorId, variants.length);
  const variantId = variants[index].id;
  return { visitorId, variantId };
}

