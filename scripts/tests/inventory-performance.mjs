// Performance test: generate large in-memory CSV and measure parse/normalize time
import { parseCSV, normalizeRecord, validateRecord } from '../inventory-lib.mjs';

const COUNT = 10000; // adjustable size

// Generate synthetic data
let body = '';
for (let i = 0; i < COUNT; i++) {
  body += `\nPhones,Samsung,A${String(100 + i)},256/8,199,TRUE,`;
}
const csv = `category,brand,product,variant,price_usd,promo,notes${body}`;

const t0 = performance.now();
const recs = parseCSV(csv);
const t1 = performance.now();

let valErrors = 0;
for (const r of recs) {
  const v = validateRecord(r);
  if (!v.ok) valErrors++;
}
const t2 = performance.now();

const normalized = recs.map(normalizeRecord);
const t3 = performance.now();

console.log(`Records: ${recs.length}`);
console.log(`Parse ms: ${(t1 - t0).toFixed(1)}`);
console.log(`Validate ms: ${(t2 - t1).toFixed(1)} (errors: ${valErrors})`);
console.log(`Normalize ms: ${(t3 - t2).toFixed(1)}`);

if (valErrors > 0) process.exit(1);
console.log('Performance test completed');

