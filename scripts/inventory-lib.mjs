// Inventory Loader Library (ESM)
// Comprehensive inline comments are included as requested.

import fs from 'node:fs';
import path from 'node:path';

// Directories and files used by the loader
export const INPUT_DIR = path.resolve('inventory', 'incoming');
export const ARCHIVE_DIR = path.resolve('inventory', 'archive');
export const ERROR_DIR = path.resolve('inventory', 'errors');
export const LOG_DIR = path.resolve('logs');
export const LOG_FILE = path.join(LOG_DIR, 'inventory-watcher.log');
export const OUTPUT_JSON_PATH = path.resolve('public', 'data', 'inventory.json');

// Allowed top-level categories (input) and mapping to internal shop categories
const CATEGORY_MAP = {
  Phones: 'smartphones',
  Tablets: 'accessories', // Optionally create a dedicated 'tablets' category later
  Watches: 'accessories',
  Earbuds: 'accessories',
};

// Required CSV/JSON fields for validation
export const REQUIRED_FIELDS = ['category', 'brand', 'product', 'variant', 'price_usd', 'promo', 'notes'];

// Ensure required directories exist
export function ensureDirs() {
  [INPUT_DIR, ARCHIVE_DIR, ERROR_DIR, LOG_DIR, path.dirname(OUTPUT_JSON_PATH)].forEach((p) => {
    fs.mkdirSync(p, { recursive: true });
  });
}

// Append a line to the log file (with timestamp)
export function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  try {
    fs.appendFileSync(LOG_FILE, line, 'utf8');
  } catch (err) {
    console.error('Logging failed:', err);
  }
}

// Read a text file safely
function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Simple CSV parser for well-formed comma-separated values (no quoted commas)
// Returns an array of objects keyed by header row
export function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].split(',').map((h) => h.trim());
  const rows = lines.slice(1);
  return rows.map((line) => {
    const cols = line.split(',').map((c) => c.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i] ?? '';
    });
    return obj;
  });
}

// JSON parser with error handling
export function parseJSON(jsonText) {
  try {
    const data = JSON.parse(jsonText);
    if (!Array.isArray(data)) throw new Error('JSON must be an array of records');
    return data;
  } catch (err) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }
}

// Validate a single record structure and basic data types
export function validateRecord(rec) {
  // Check required fields
  for (const f of REQUIRED_FIELDS) {
    if (!(f in rec)) return { ok: false, error: `Missing field: ${f}` };
  }
  // Category mapping presence
  if (!CATEGORY_MAP[rec.category]) return { ok: false, error: `Unknown category: ${rec.category}` };
  // Price: allow blank for missing; otherwise must be numeric
  if (rec.price_usd !== '' && isNaN(Number(rec.price_usd))) {
    return { ok: false, error: `Invalid price_usd: ${rec.price_usd}` };
  }
  // Promo must be TRUE/FALSE (case-insensitive accepted)
  const promoVal = String(rec.promo).toUpperCase();
  if (!['TRUE', 'FALSE'].includes(promoVal)) {
    return { ok: false, error: `Invalid promo flag: ${rec.promo}` };
  }
  return { ok: true };
}

// Normalize a record into internal format used by the site
export function normalizeRecord(rec) {
  // Map category
  const category = CATEGORY_MAP[rec.category];
  // Price normalization
  const priceUsd = rec.price_usd === '' ? null : Number(rec.price_usd);
  // Promo boolean
  const promo = String(rec.promo).toUpperCase() === 'TRUE';

  // Variant parsing heuristics
  const variant = rec.variant || '';
  let storageGB = null;
  let ramGB = null;
  let sizeMM = null;
  let lte = false;
  let tb = false;

  // Handle 1TB explicit
  if (/\b1TB\b/i.test(variant) || /\b1024\b/.test(variant)) {
    storageGB = 1024;
    tb = true;
  }
  // Storage/RAM like "256/8" or "256/?"
  else if (/^\d+\/\d+$/i.test(variant) || /^\d+\/\?$/i.test(variant)) {
    const [s, r] = variant.split('/');
    storageGB = Number(s);
    ramGB = r === '?' ? null : Number(r);
  }
  // Storage only (e.g., "256", "512")
  else if (/^\d+$/.test(variant)) {
    storageGB = Number(variant);
  }
  // Watch sizes (e.g., "45mm") and LTE flag
  if (/mm$/i.test(variant)) {
    const m = variant.match(/(\d+)/);
    sizeMM = m ? Number(m[1]) : null;
  }
  if (/LTE/i.test(variant)) {
    lte = true;
  }

  // Notes sanitization (avoid overly long strings)
  const notes = String(rec.notes || '').slice(0, 500);

  return {
    category,
    brand: rec.brand,
    product: rec.product,
    variant,
    priceUsd,
    promo,
    notes,
    attributes: { storageGB, ramGB, sizeMM, lte, tb },
    key: `${category}|${rec.brand}|${rec.product}|${variant}`,
  };
}

// Merge new records into the existing output JSON (de-duplicate by key)
export function mergeInventory(existing, additions) {
  const byKey = new Map();
  for (const rec of existing) byKey.set(rec.key, rec);
  for (const rec of additions) byKey.set(rec.key, rec);
  return Array.from(byKey.values());
}

// Write JSON atomically (to avoid partial writes)
export function writeInventoryJson(records) {
  const tmpPath = OUTPUT_JSON_PATH + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(records, null, 2), 'utf8');
  fs.renameSync(tmpPath, OUTPUT_JSON_PATH);
}

// Move processed file to archive with a timestamp suffix
export function archiveFile(filePath) {
  const base = path.basename(filePath);
  const stamped = `${Date.now()}-${base}`;
  const dest = path.join(ARCHIVE_DIR, stamped);
  fs.renameSync(filePath, dest);
  return dest;
}

// Move malformed file to errors directory and write a sidecar error log
export function moveToError(filePath, errorMessage) {
  const base = path.basename(filePath);
  const dest = path.join(ERROR_DIR, base);
  fs.renameSync(filePath, dest);
  const errLogPath = dest + '.error.txt';
  fs.writeFileSync(errLogPath, String(errorMessage), 'utf8');
  return dest;
}

// Process a single file end-to-end
export function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  log(`Processing file: ${filePath}`);
  try {
    const text = readText(filePath);
    const rawRecords = ext === '.csv' ? parseCSV(text) : ext === '.json' ? parseJSON(text) : null;
    if (!rawRecords) throw new Error(`Unsupported file type: ${ext}`);

    // Validate all records first
    const errors = [];
    for (let i = 0; i < rawRecords.length; i++) {
      const v = validateRecord(rawRecords[i]);
      if (!v.ok) errors.push(`Line ${i + 2}: ${v.error}`); // +2 accounts for header
    }
    if (errors.length > 0) {
      log(`Validation failed (${errors.length} errors)`);
      moveToError(filePath, errors.join('\n'));
      return { ok: false, errors };
    }

    // Normalize
    const normalized = rawRecords.map((r) => normalizeRecord(r));

    // Load existing output (if any)
    let existing = [];
    if (fs.existsSync(OUTPUT_JSON_PATH)) {
      try {
        existing = JSON.parse(fs.readFileSync(OUTPUT_JSON_PATH, 'utf8'));
      } catch (e) {
        log(`Existing output JSON invalid, resetting: ${e.message}`);
      }
    }

    // Merge and write
    const merged = mergeInventory(existing, normalized);
    writeInventoryJson(merged);
    const archivedPath = archiveFile(filePath);
    log(`Processed successfully → ${archivedPath}; total records: ${merged.length}`);
    return { ok: true, count: normalized.length };
  } catch (err) {
    log(`Processing error: ${err.message}`);
    moveToError(filePath, err.message);
    return { ok: false, errors: [String(err.message)] };
  }
}

