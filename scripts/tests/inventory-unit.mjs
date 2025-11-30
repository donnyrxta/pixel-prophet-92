// Unit tests for inventory parsing/validation (simple, dependency-free)
// Uses console.assert and logs; exit code indicates pass/fail.

import { parseCSV, validateRecord, normalizeRecord, REQUIRED_FIELDS } from '../inventory-lib.mjs';

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    failures++;
    console.error('FAIL:', msg);
  } else {
    console.log('PASS:', msg);
  }
}

// Sample CSV line set
const csv = `category,brand,product,variant,price_usd,promo,notes\nPhones,Samsung,A06,64/4,72,TRUE,`;
const recs = parseCSV(csv);
assert(recs.length === 1, 'parseCSV returns one record');
assert(REQUIRED_FIELDS.every((f) => f in recs[0]), 'record has required fields');

const v1 = validateRecord(recs[0]);
assert(v1.ok === true, 'validateRecord accepts valid record');

const n1 = normalizeRecord(recs[0]);
assert(n1.category === 'smartphones', 'category mapped to smartphones');
assert(n1.attributes.storageGB === 64, 'storageGB parsed');
assert(n1.attributes.ramGB === 4, 'ramGB parsed');
assert(n1.promo === true, 'promo parsed TRUE');

// Invalid price
const badCsv = `category,brand,product,variant,price_usd,promo,notes\nPhones,Samsung,A06,64/4,abc,TRUE,`;
const badRec = parseCSV(badCsv)[0];
const v2 = validateRecord(badRec);
assert(v2.ok === false, 'validateRecord rejects invalid price');

// Unknown category
const badCatCsv = `category,brand,product,variant,price_usd,promo,notes\nOther,Samsung,A06,64/4,72,TRUE,`;
const v3 = validateRecord(parseCSV(badCatCsv)[0]);
assert(v3.ok === false, 'validateRecord rejects unknown category');

if (failures > 0) {
  console.error(`Unit tests failed: ${failures}`);
  process.exit(1);
} else {
  console.log('All unit tests passed');
}

