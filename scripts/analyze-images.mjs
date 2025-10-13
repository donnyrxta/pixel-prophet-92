import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, extname } from 'path';
import imageSize from 'image-size';

const clientsDir = join(process.cwd(), 'public', 'images', 'clients');
const outPath = join(clientsDir, 'analysis.json');

function getSvgViewBox(svgContent) {
  const match = svgContent.match(/viewBox\s*=\s*"([^"]+)"/i);
  if (!match) return null;
  const parts = match[1].split(/\s+/).map(Number);
  if (parts.length === 4) {
    return { width: parts[2], height: parts[3] };
  }
  return null;
}

function analyzeFile(filePath) {
  const ext = extname(filePath).toLowerCase().replace('.', '');
  const stats = statSync(filePath);
  const sizeBytes = stats.size;
  const sizeKB = +(sizeBytes / 1024).toFixed(2);
  let width = null;
  let height = null;
  let type = ext;

  try {
    const dims = imageSize(filePath);
    if (dims && dims.width && dims.height) {
      width = dims.width;
      height = dims.height;
      type = dims.type || ext;
    }
  } catch (e) {
    // Fallback for SVGs missing explicit size: try viewBox
    if (ext === 'svg') {
      const content = readFileSync(filePath, 'utf8');
      const vb = getSvgViewBox(content);
      if (vb) {
        width = vb.width;
        height = vb.height;
        type = 'svg';
      }
    }
  }

  const pixelCount = width && height ? width * height : null;
  const aspectRatio = width && height ? +(width / height).toFixed(4) : null;

  return {
    file: filePath.replace(process.cwd(), '').replace(/\\/g, '/'),
    format: type,
    sizeKB,
    sizeBytes,
    width,
    height,
    pixelCount,
    aspectRatio,
  };
}

function main() {
  const files = readdirSync(clientsDir)
    .filter((f) => !f.toLowerCase().endsWith('.md'))
    .map((f) => join(clientsDir, f));

  const analyses = files.map(analyzeFile);

  writeFileSync(outPath, JSON.stringify({ analyzedAt: new Date().toISOString(), items: analyses }, null, 2));
  console.log(JSON.stringify(analyses, null, 2));
}

main();