import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { webstoreProducts, webstoreCategories } from '@/data/webstore-products';

const BASE_URL = 'https://sohoconnect.co.zw';

const staticRoutes = [
  '',
  '/services',
  '/portfolio',
  '/about',
  '/contact',
  '/services/printing',
  '/services/branding',
  '/services/digital-marketing',
  '/services/signage',
  '/services/payment-services',
  '/webstore',
  '/locations/harare',
  '/locations/bulawayo',
  '/locations/gweru',
  '/locations/mutare',
  '/smartphones-harare',
  '/laptops-zimbabwe',
  '/cctv-installation-harare',
  '/vehicle-branding-harare',
  '/business-cards-harare',
  '/blog'
];

console.log('Script started');

try {
    const currentDate = new Date().toISOString().split('T')[0];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Routes
    staticRoutes.forEach(route => {
        xml += `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Categories
    webstoreCategories.forEach(category => {
        xml += `
  <url>
    <loc>${BASE_URL}/webstore/category/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Products
    webstoreProducts.forEach(product => {
        xml += `
  <url>
    <loc>${BASE_URL}/webstore/product/${product.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
    console.log(`Writing sitemap to: ${outputPath}`);
    writeFileSync(outputPath, xml);
    console.log('✅ Sitemap generated successfully.');
} catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
}
