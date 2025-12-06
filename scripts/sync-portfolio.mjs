// ============================================================================
// PORTFOLIO SYNC SCRIPT
// ============================================================================
// Purpose: Automates the process of adding new images to the website portfolio.
// Usage:   npm run sync-portfolio
// 
// How it works:
// 1. Scans 'public/images/portfolio/{category}' folders for new images.
// 2. Checks if they are already present in 'src/data/portfolio.ts'.
// 3. If new, it intelligently appends them to the data file with default values.
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const PORTFOLIO_IMAGES_DIR = path.join(PUBLIC_DIR, 'images/portfolio');
const DATA_FILE = path.join(__dirname, '../src/data/portfolio.ts');

// Categories to scan (must match folder names in public/images/portfolio)
const CATEGORIES = ['printing', 'branding', 'signage', 'digital'];

// Helper to convert filename to title
// e.g., "domed-stickers.jpg" -> "Domed Stickers"
function toTitleCase(filename) {
    const name = path.parse(filename).name;
    return name
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Helper to map folder name to Category Type
function getCategoryRequest(folder) {
    const map = {
        'printing': 'Printing',
        'branding': 'Branding',
        'signage': 'Signage',
        'digital': 'Digital'
    };
    return map[folder] || 'Printing';
}

async function syncPortfolio() {
    console.log('🔄 Starting Portfolio Sync...');

    // 1. Read existing data file
    if (!fs.existsSync(DATA_FILE)) {
        console.error('❌ Could not find src/data/portfolio.ts');
        process.exit(1);
    }
    let fileContent = fs.readFileSync(DATA_FILE, 'utf-8');

    // 2. Scan directories for images
    const newItems = [];
    let maxId = 0;

    // specific simplified regex to find max ID in the existing file
    const idMatches = fileContent.matchAll(/id:\s*(\d+)/g);
    for (const match of idMatches) {
        const id = parseInt(match[1]);
        if (id > maxId) maxId = id;
    }

    console.log(`ℹ️  Current Max ID: ${maxId}`);

    for (const category of CATEGORIES) {
        const catDir = path.join(PORTFOLIO_IMAGES_DIR, category);
        if (!fs.existsSync(catDir)) continue;

        const files = fs.readdirSync(catDir);
        for (const file of files) {
            if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

            const imagePath = `/images/portfolio/${category}/${file}`;

            // Check if this image already exists in the file
            if (fileContent.includes(imagePath)) {
                // console.log(`  Skipping existing: ${file}`);
                continue;
            }

            console.log(`✨ Found NEW image: ${file}`);
            maxId++;

            const newItem = {
                id: maxId,
                title: toTitleCase(file),
                client: "Valued Client", // Default placeholder
                category: getCategoryRequest(category),
                image: imagePath,
                description: `High-quality ${toTitleCase(file)} project delivered to client specifications.`,
                results: [
                    "Professional finish",
                    "Client satisfaction",
                    "On-time delivery"
                ]
            };
            newItems.push(newItem);
        }
    }

    if (newItems.length === 0) {
        console.log('✅ Portfolio is up to date. No new images found.');
        return;
    }

    // 3. Append new items to the file
    // We look for the closing of the array "];" and insert before it
    const lastBracketIndex = fileContent.lastIndexOf('];');
    if (lastBracketIndex === -1) {
        console.error('❌ Could not find closing bracket "];" in portfolio.ts');
        return;
    }

    const newItemsString = newItems.map(item => {
        // Convert object to TS string, but keep it pretty
        return `  {
    id: ${item.id},
    title: "${item.title}",
    client: "${item.client}",
    category: "${item.category}",
    image: "${item.image}",
    description: "${item.description}",
    results: [
      "${item.results[0]}",
      "${item.results[1]}",
      "${item.results[2]}"
    ]
  }`;
    }).join(',\n');

    // Insert with a comma if needed
    // We check if the character before "];" is a comma or just whitespace
    // Simplest way: always prepend a comma

    // Construct new content
    const updatedContent =
        fileContent.slice(0, lastBracketIndex) +
        ',\n' +
        newItemsString +
        '\n' +
        fileContent.slice(lastBracketIndex);

    fs.writeFileSync(DATA_FILE, updatedContent, 'utf-8');

    console.log(`🎉 Successfully added ${newItems.length} new items to src/data/portfolio.ts`);
    console.log('👉 Please review the new entries in src/data/portfolio.ts to update descriptions and clients.');
}

syncPortfolio();
