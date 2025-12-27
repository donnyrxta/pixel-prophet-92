import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { webstoreProducts, webstoreCategories } from '../src/data/webstore-products';

const BASE_URL = 'https://sohoconnect.co.zw';

// All static routes from App.tsx - COMPREHENSIVE LIST
const staticRoutes = [
  // Core pages
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  
  // Service detail pages
  { path: '/services/printing', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/branding', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/digital-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/signage', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/payment-services', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/wifi-marketing', priority: '0.8', changefreq: 'weekly' },
  
  // Webstore pages
  { path: '/webstore', priority: '0.9', changefreq: 'daily' },
  { path: '/compare', priority: '0.6', changefreq: 'weekly' },
  
  // Location pages (Local SEO)
  { path: '/locations/harare', priority: '0.8', changefreq: 'weekly' },
  { path: '/locations/bulawayo', priority: '0.8', changefreq: 'weekly' },
  { path: '/locations/gweru', priority: '0.8', changefreq: 'weekly' },
  { path: '/locations/mutare', priority: '0.8', changefreq: 'weekly' },
  
  // SEO landing pages
  { path: '/smartphones-harare', priority: '0.8', changefreq: 'weekly' },
  { path: '/laptops-zimbabwe', priority: '0.8', changefreq: 'weekly' },
  { path: '/cctv-installation-harare', priority: '0.8', changefreq: 'weekly' },
  { path: '/vehicle-branding-harare', priority: '0.8', changefreq: 'weekly' },
  { path: '/business-cards-harare', priority: '0.8', changefreq: 'weekly' },
  
  // Blog pages
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/blog/mining-camp-wifi-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/solar-wifi-off-grid-guide', priority: '0.7', changefreq: 'monthly' },
  
  // Tools & Resources
  { path: '/tools/wifi-token-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/ad-planner', priority: '0.6', changefreq: 'weekly' },
  
  // Resource Guides
  { path: '/resources/guides/laptop-guide-2026', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/guides/smartphone-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/guides/print-finishes-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/guides/cctv-buyers-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/resources/guides/fleet-branding-guide', priority: '0.7', changefreq: 'monthly' },
];

// Portfolio images for image sitemap
const portfolioImages = [
  // Branding
  { loc: '/images/portfolio/branding/africa-umbrella.jpg', caption: 'Custom branded umbrella for corporate events', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/branding/bucket-hat-embroidery.jpg', caption: 'Embroidered bucket hats with company logo', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/branding/corporate-caps-sinet.jpg', caption: 'Corporate branded caps for Sinet', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/branding/corporate-umbrella.jpg', caption: 'Premium corporate umbrellas with branding', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/branding/dtf-printed-tshirts.jpg', caption: 'DTF printed t-shirts for brand promotion', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/branding/zimnat-branded-notebooks.jpg', caption: 'Custom branded notebooks for Zimnat', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/branding/zitoga-caps.jpg', caption: 'Branded caps for Zitoga company', geo: 'Harare, Zimbabwe' },
  // Printing
  { loc: '/images/portfolio/printing/calendar-2024.jpg', caption: 'Custom printed calendar 2024', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/printing/diaries-bulk.jpg', caption: 'Bulk printed corporate diaries', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/printing/diaries-stack.jpg', caption: 'Premium printed diary stack', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/printing/ferodah-diaries.jpg', caption: 'Ferodah branded diaries printing', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/printing/poly-masvingo-design.jpg', caption: 'Polytechnic Masvingo custom design', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/printing/screen-printed-shirts.jpg', caption: 'Screen printed promotional shirts', geo: 'Harare, Zimbabwe' },
  // Signage
  { loc: '/images/portfolio/signage/advertising-gazebo.jpg', caption: 'Custom branded advertising gazebo tent', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/signage/car-branding-full.jpg', caption: 'Full vehicle wrap branding', geo: 'Harare, Zimbabwe' },
  { loc: '/images/portfolio/signage/zec-tent-branding.jpg', caption: 'ZEC branded tent for events', geo: 'Harare, Zimbabwe' },
  // Hero images
  { loc: '/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg', caption: 'Premium printing materials and design services in Harare', geo: 'Harare, Zimbabwe' },
  { loc: '/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg', caption: 'Professional design and branding services', geo: 'Harare, Zimbabwe' },
];

console.log('🗺️  Sitemap Generator Started');
console.log(`📅 Build Date: ${new Date().toISOString()}`);

try {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // ============ MAIN SITEMAP ============
  let mainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Static Routes with images for key pages
  staticRoutes.forEach(route => {
    mainXml += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>`;
    
    // Add featured image for homepage
    if (route.path === '') {
      mainXml += `
    <image:image>
      <image:loc>${BASE_URL}/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg</image:loc>
      <image:caption>Soho Connect - Premium Printing and Design Services in Harare, Zimbabwe</image:caption>
      <image:geo_location>Harare, Zimbabwe</image:geo_location>
      <image:title>Soho Connect Harare</image:title>
    </image:image>`;
    }
    
    mainXml += `
  </url>`;
  });

  // Webstore Categories
  webstoreCategories.forEach(category => {
    mainXml += `
  <url>
    <loc>${BASE_URL}/webstore/category/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
    
    if (category.image) {
      mainXml += `
    <image:image>
      <image:loc>${category.image.startsWith('http') ? category.image : BASE_URL + category.image}</image:loc>
      <image:caption>${category.name} - ${category.tagline}</image:caption>
      <image:title>${category.name} in Harare, Zimbabwe</image:title>
    </image:image>`;
    }
    
    mainXml += `
  </url>`;
  });

  // Webstore Products
  webstoreProducts.forEach(product => {
    mainXml += `
  <url>
    <loc>${BASE_URL}/webstore/product/${product.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>`;
    
    // Add product image
    if (product.image) {
      mainXml += `
    <image:image>
      <image:loc>${product.image.startsWith('http') ? product.image : BASE_URL + product.image}</image:loc>
      <image:caption>${product.name} - ${product.description.substring(0, 100)}</image:caption>
      <image:title>${product.name}</image:title>
    </image:image>`;
    }
    
    // Add additional product images
    if (product.images && product.images.length > 0) {
      product.images.slice(0, 3).forEach((img, idx) => {
        if (img !== product.image) {
          mainXml += `
    <image:image>
      <image:loc>${img.startsWith('http') ? img : BASE_URL + img}</image:loc>
      <image:caption>${product.name} - View ${idx + 2}</image:caption>
      <image:title>${product.name}</image:title>
    </image:image>`;
        }
      });
    }
    
    mainXml += `
  </url>`;
  });

  mainXml += `
</urlset>`;

  // ============ IMAGE SITEMAP ============
  let imageXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${BASE_URL}/portfolio</loc>`;

  portfolioImages.forEach(img => {
    imageXml += `
    <image:image>
      <image:loc>${BASE_URL}${img.loc}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:geo_location>${img.geo}</image:geo_location>
      <image:title>${img.caption}</image:title>
    </image:image>`;
  });

  imageXml += `
  </url>
</urlset>`;

  // ============ SITEMAP INDEX ============
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Write all sitemap files
  const mainPath = resolve(process.cwd(), 'public', 'sitemap.xml');
  const imagePath = resolve(process.cwd(), 'public', 'sitemap-images.xml');
  const indexPath = resolve(process.cwd(), 'public', 'sitemap-index.xml');

  writeFileSync(mainPath, mainXml);
  console.log(`✅ Main sitemap generated: ${mainPath}`);
  
  writeFileSync(imagePath, imageXml);
  console.log(`✅ Image sitemap generated: ${imagePath}`);
  
  writeFileSync(indexPath, sitemapIndex);
  console.log(`✅ Sitemap index generated: ${indexPath}`);

  // Count URLs
  const staticCount = staticRoutes.length;
  const categoryCount = webstoreCategories.length;
  const productCount = webstoreProducts.length;
  const totalUrls = staticCount + categoryCount + productCount;

  console.log(`\n📊 Sitemap Statistics:`);
  console.log(`   Static pages: ${staticCount}`);
  console.log(`   Categories: ${categoryCount}`);
  console.log(`   Products: ${productCount}`);
  console.log(`   Total URLs: ${totalUrls}`);
  console.log(`   Portfolio images: ${portfolioImages.length}`);
  console.log(`\n🎉 All sitemaps generated successfully!`);

} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
