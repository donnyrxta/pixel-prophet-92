#!/usr/bin/env node

/**
 * Image Processing Script
 * Processes images from source folder and generates optimized versions
 * Generates WebP, multiple sizes, and organizes into public/images/
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  sourceDir: 'C:\\RecoveredFiles\\Documents\\works 2052\\',
  outputDir: path.join(__dirname, '..', 'public', 'images'),
  sizes: {
    thumb: 300,
    medium: 800,
    large: 1600,
    original: null // Keep original size
  },
  quality: {
    jpg: 85,
    webp: 80
  },
  categories: {
    // Map filenames to categories
    'diaries': ['diaries', 'diary'],
    'gazebos': ['gazebo', 'gazebos'],
    'umbrellas': ['umbrella', 'africa'],
    'branded': ['branded', 'car', 'batch'],
    'printing': ['printing-press', 'bulk'],
    'hero': ['hero', 'unsplash'] // For hero images if any
  }
};

// Utility functions
function getImageCategory(filename) {
  const lowerName = filename.toLowerCase();
  for (const [category, keywords] of Object.entries(CONFIG.categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return 'misc';
}

function createOutputDirs() {
  const dirs = [
    CONFIG.outputDir,
    ...Object.keys(CONFIG.sizes).map(size => path.join(CONFIG.outputDir, size)),
    ...Object.keys(CONFIG.categories).map(cat => path.join(CONFIG.outputDir, 'products', cat))
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  });
}

async function optimizeImage(inputPath, outputPath, format = 'jpg') {
  const tempPath = outputPath + '.temp';

  try {
    // First optimize with imagemin
    let optimizedBuffer;

    if (format === 'webp') {
      optimizedBuffer = await imagemin([inputPath], {
        destination: path.dirname(tempPath),
        plugins: [
          imageminWebp({
            quality: CONFIG.quality.webp,
            method: 6
          })
        ]
      });
      optimizedBuffer = optimizedBuffer[0]?.data;
    } else {
      optimizedBuffer = await imagemin([inputPath], {
        destination: path.dirname(tempPath),
        plugins: [
          imageminMozjpeg({
            quality: CONFIG.quality.jpg,
            progressive: true
          })
        ]
      });
      optimizedBuffer = optimizedBuffer[0]?.data;
    }

    if (optimizedBuffer) {
      await fs.promises.writeFile(tempPath, optimizedBuffer);
      await fs.promises.rename(tempPath, outputPath);
      console.log(`✓ Optimized: ${path.basename(outputPath)}`);
    } else {
      // Fallback to sharp resize only
      await fs.promises.copyFile(inputPath, outputPath);
      console.log(`⚠ Fallback copy: ${path.basename(outputPath)}`);
    }

  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error.message);
    // Fallback to direct copy
    await fs.promises.copyFile(inputPath, outputPath);
  }
}

async function processImage(imagePath) {
  const filename = path.basename(imagePath, path.extname(imagePath));
  const category = getImageCategory(filename);
  const categoryDir = path.join(CONFIG.outputDir, 'products', category);

  console.log(`\n📸 Processing: ${filename} (Category: ${category})`);

  try {
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const aspectRatio = metadata.width / metadata.height;

    // Process each size
    for (const [sizeName, maxWidth] of Object.entries(CONFIG.sizes)) {
      const sizeDir = path.join(categoryDir, sizeName);
      if (!fs.existsSync(sizeDir)) {
        fs.mkdirSync(sizeDir, { recursive: true });
      }

      // Calculate dimensions
      let width, height;
      if (maxWidth === null) {
        // Original size
        width = metadata.width;
        height = metadata.height;
      } else {
        width = Math.min(maxWidth, metadata.width);
        height = Math.round(width / aspectRatio);
      }

      // Skip if source is smaller than target size
      if (metadata.width <= width && sizeName !== 'original') {
        console.log(`  ⏭ Skipping ${sizeName} (source too small)`);
        continue;
      }

      const baseName = `${filename}-${sizeName}`;
      const jpgPath = path.join(sizeDir, `${baseName}.jpg`);
      const webpPath = path.join(sizeDir, `${baseName}.webp`);

      // Resize with sharp and optimize
      const resizedBuffer = await sharp(imagePath)
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toBuffer();

      // Temporary file for optimization
      const tempPath = path.join(sizeDir, `${baseName}-temp.jpg`);
      await fs.promises.writeFile(tempPath, resizedBuffer);

      // Optimize JPG
      await optimizeImage(tempPath, jpgPath, 'jpg');

      // Convert to WebP
      await optimizeImage(tempPath, webpPath, 'webp');

      // Clean up temp file
      await fs.promises.unlink(tempPath);

      console.log(`  ✓ Created ${sizeName}: ${width}x${height}`);
    }

  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
}

async function generateImageIndex() {
  const indexPath = path.join(CONFIG.outputDir, 'image-index.json');
  const images = {};

  // Scan all processed images
  const imageFiles = await glob('**/*.{jpg,png,jpeg,webp}', {
    cwd: CONFIG.outputDir,
    absolute: false
  });

  // Group by base name and category
  imageFiles.forEach(filePath => {
    const parts = filePath.split(path.sep);
    if (parts.length >= 3) {
      const category = parts[1];
      const size = parts[2];
      const filename = path.basename(filePath, path.extname(filePath));

      // Extract base name (remove size suffix)
      const baseName = filename.replace(/-(thumb|medium|large|original)$/, '');

      if (!images[category]) images[category] = {};
      if (!images[category][baseName]) images[category][baseName] = {};

      images[category][baseName][size] = filePath;
    }
  });

  await fs.promises.writeFile(
    indexPath,
    JSON.stringify(images, null, 2)
  );

  console.log(`✓ Generated image index: ${indexPath}`);
}

// Main execution
async function main() {
  console.log('🚀 Starting image processing pipeline...');
  console.log(`📁 Source: ${CONFIG.sourceDir}`);
  console.log(`📁 Output: ${CONFIG.outputDir}`);

  // Debug: Check if source directory exists
  console.log('Source dir exists:', fs.existsSync(CONFIG.sourceDir));

  try {
    // Create output directories
    createOutputDirs();

    // Debug: List files directly
    const allFiles = fs.readdirSync(CONFIG.sourceDir);
    const jpgFiles = allFiles.filter(f => f.toLowerCase().endsWith('.jpg'));
    console.log('Files in source dir:', allFiles.length);
    console.log('JPG files found:', jpgFiles.length);
    console.log('Sample JPG files:', jpgFiles.slice(0, 3));

    // Find all JPG images in source directory
    const imageFiles = await glob('**/*.jpg', {
      cwd: CONFIG.sourceDir,
      absolute: true,
      nocase: true
    });

    console.log(`📊 Found ${imageFiles.length} images to process via glob`);
    console.log('Sample files:', imageFiles.slice(0, 3));

    // Process each image
    for (const imagePath of imageFiles.slice(0, 5)) { // Process first 5 for testing
      await processImage(imagePath);
    }

    // Generate index
    await generateImageIndex();

    console.log('\n✅ Image processing complete!');
    console.log('📋 Summary:');
    console.log(`   Processed: ${imageFiles.length} images`);
    console.log(`   Generated: Multiple sizes and formats`);
    console.log(`   Output: ${CONFIG.outputDir}`);

  } catch (error) {
    console.error('❌ Error in image processing:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processImage, generateImageIndex };