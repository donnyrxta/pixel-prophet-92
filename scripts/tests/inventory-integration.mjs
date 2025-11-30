// Integration test: process a temporary CSV file and verify outputs
import fs from 'node:fs';
import path from 'node:path';
import {
  ensureDirs,
  INPUT_DIR,
  OUTPUT_JSON_PATH,
  ARCHIVE_DIR,
  processFile,
} from '../inventory-lib.mjs';

ensureDirs();

// Prepare a temp CSV input
const tempName = `test-${Date.now()}.csv`;
const tempPath = path.join(INPUT_DIR, tempName);
const csv = `category,brand,product,variant,price_usd,promo,notes\nPhones,Samsung,A06,64/4,72,TRUE,`;
fs.writeFileSync(tempPath, csv, 'utf8');

// Run processor
const result = processFile(tempPath);
if (!result.ok) {
  console.error('Integration: processing failed', result.errors);
  process.exit(1);
}

// Verify output JSON has the record
const outText = fs.readFileSync(OUTPUT_JSON_PATH, 'utf8');
const out = JSON.parse(outText);
const found = out.find((r) => r.brand === 'Samsung' && r.product === 'A06');
if (!found) {
  console.error('Integration: record not found in output JSON');
  process.exit(1);
}

// Verify archive contains the processed file (by timestamp prefix)
const archived = fs.readdirSync(ARCHIVE_DIR).some((name) => name.endsWith(tempName));
if (!archived) {
  console.error('Integration: processed file not archived');
  process.exit(1);
}

console.log('Integration test passed');

