// Inventory Watcher Service (ESM)
// Comprehensive inline comments included as requested.

import fs from 'node:fs';
import path from 'node:path';
import {
  ensureDirs,
  INPUT_DIR,
  log,
  processFile,
} from './inventory-lib.mjs';

// Initialize directories and log startup
ensureDirs();
log('Inventory watcher starting...');
log(`Watching directory: ${INPUT_DIR}`);

// Debounce map to avoid duplicate processing while files are being written
const pending = new Map();

// Process all existing files on startup (catch-up run)
try {
  const initialFiles = fs.readdirSync(INPUT_DIR);
  for (const name of initialFiles) {
    const full = path.join(INPUT_DIR, name);
    if (fs.statSync(full).isFile()) scheduleProcess(full);
  }
} catch (e) {
  log(`Startup scan failed: ${e.message}`);
}

// Helper to schedule file processing with a small delay
function scheduleProcess(filePath) {
  // Only handle CSV/JSON
  const ext = path.extname(filePath).toLowerCase();
  if (!['.csv', '.json'].includes(ext)) return;
  // Skip if already scheduled
  if (pending.has(filePath)) return;
  // Delay to let the OS finish writing
  const t = setTimeout(async () => {
    pending.delete(filePath);
    if (!fs.existsSync(filePath)) return; // File may have been removed
    const result = processFile(filePath);
    if (result.ok) {
      log(`File processed: ${filePath} (${result.count} records)`);
    } else {
      log(`File failed: ${filePath} (errors: ${result.errors?.length ?? 0})`);
    }
  }, 300);
  pending.set(filePath, t);
}

// Cross-platform directory watch using fs.watch with rename/change events
try {
  const watcher = fs.watch(INPUT_DIR, { persistent: true }, (eventType, filename) => {
    if (!filename) return;
    const full = path.join(INPUT_DIR, filename);
    // Both 'rename' (create/delete) and 'change' can indicate new data
    scheduleProcess(full);
  });

  watcher.on('error', (err) => {
    log(`Watcher error: ${err.message}`);
  });
} catch (e) {
  log(`Failed to start watcher: ${e.message}`);
}

// Optional: periodic rescan as a fallback for OS watch quirks
setInterval(() => {
  try {
    const files = fs.readdirSync(INPUT_DIR);
    for (const name of files) {
      const full = path.join(INPUT_DIR, name);
      if (fs.existsSync(full) && fs.statSync(full).isFile()) scheduleProcess(full);
    }
  } catch (e) {
    log(`Rescan error: ${e.message}`);
  }
}, 30_000);

