/**
 * Product Catalog - SohoConnect Electronics Division
 * Phase 3: Complete product data with SEO optimization
 */

import type { Product } from '@/types/shop';
import { useQuery } from '@tanstack/react-query';

export const PRODUCTS: Product[] = [
  // SMARTPHONES
  {
    id: 'iphone-15-pro-128',
    name: 'iPhone 15 Pro 128GB',
    slug: 'iphone-15-pro-128gb',
    category: 'smartphones',
    price: 1299,
    currency: 'USD',
    image: '/images/electronics/iphone-business.jpg',
    images: [
      '/images/electronics/iphone-business.jpg'
    ],
    description: 'The iPhone 15 Pro features a titanium design, the powerful A17 Pro chip, and a customizable Action button. With Pro camera system including 48MP Main camera, you can capture stunning photos and 4K video.',
    shortDescription: 'Titanium. A17 Pro chip. Pro camera system.',
    inStock: true,
    stockCount: 15,
    featured: true,
    sku: 'SOHO-IP15P-128-TIT',

    features: [
      'A17 Pro chip with 6-core CPU',
      '6.1-inch Super Retina XDR display',
      'Pro camera system (48MP, 12MP, 12MP)',
      'Up to 29 hours video playback',
      'Titanium design with textured matte glass',
      'Action button for quick access',
      'Face ID facial recognition',
      'USB-C connector with USB 3 speeds'
    ],

    specifications: {
      'Display': '6.1-inch OLED, 2556 x 1179 pixels',
      'Processor': 'A17 Pro chip',
      'Storage': '128GB',
      'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      'Battery': 'Up to 23 hours video playback',
      'OS': 'iOS 17',
      'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3',
      'Water Resistance': 'IP68 (6m for 30 min)',
      'Dimensions': '146.6 x 70.6 x 8.25 mm',
      'Weight': '187g'
    },

    warranty: '12 months Apple warranty',
    delivery: 'Same-day delivery in Harare CBD',

    seoTitle: 'iPhone 15 Pro 128GB - Buy in Harare | SohoConnect Electronics',
    seoDescription: 'Buy iPhone 15 Pro with titanium design and A17 Pro chip in Harare. Authorized dealer. Warranty included. Same-day delivery. Shop at SohoConnect Electronics.',
    seoKeywords: ['iPhone 15 Pro Harare', 'buy iPhone Zimbabwe', 'Apple smartphone Harare']
  },

  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    category: 'smartphones',
    price: 1199,
    currency: 'USD',
    image: '/images/electronics/iphone-business.jpg',
    images: ['/images/electronics/iphone-business.jpg'],
    description: 'Samsung Galaxy S24 Ultra with built-in S Pen, 200MP camera, and powerful Galaxy AI features. The ultimate productivity and creativity tool.',
    shortDescription: 'S Pen. 200MP camera. Galaxy AI.',
    inStock: true,
    stockCount: 12,
    featured: true,
    sku: 'SOHO-S24U-256-BLK',

    features: [
      'Built-in S Pen for precision control',
      '200MP wide camera with AI zoom',
      '6.8-inch Dynamic AMOLED 2X display',
      'Snapdragon 8 Gen 3 for Galaxy',
      'Galaxy AI with real-time translation',
      '5000mAh battery with 45W charging',
      'Titanium frame design',
      'IP68 water & dust resistance'
    ],

    specifications: {
      'Display': '6.8-inch AMOLED, 3120 x 1440 pixels, 120Hz',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB / 512GB / 1TB',
      'Camera': '200MP Main, 50MP Periscope, 12MP Ultra Wide, 10MP Telephoto',
      'Battery': '5000mAh',
      'OS': 'Android 14, One UI 6.1',
      'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Water Resistance': 'IP68'
    },

    warranty: '12 months Samsung warranty',
    delivery: 'Same-day delivery in Harare CBD',

    seoTitle: 'Samsung Galaxy S24 Ultra - Buy in Harare | SohoConnect',
    seoDescription: 'Buy Samsung S24 Ultra with 200MP camera and S Pen in Harare. Authorized dealer. Warranty. Same-day delivery. Shop SohoConnect Electronics.',
    seoKeywords: ['Samsung S24 Ultra Harare', 'buy Samsung Zimbabwe', 'Galaxy phone Harare']
  },

  // BLACK FRIDAY SAMSUNG A-SERIES
  { id: 'samsung-a06-64', name: 'Samsung Galaxy A06 (64GB/4GB)', slug: 'samsung-galaxy-a06-64gb', category: 'smartphones', price: 72, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Affordable Samsung Galaxy A06 with 64GB storage and 4GB RAM. Perfect entry-level smartphone.', shortDescription: '64GB storage, 4GB RAM, Long battery life', inStock: true, stockCount: 20, featured: true, sku: 'SOHO-A06-64-4', features: ['64GB storage', '4GB RAM', 'Long-lasting battery', 'Android OS'], specifications: { 'Storage': '64GB', 'RAM': '4GB', 'OS': 'Android' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A06 64GB - BLACK FRIDAY SALE - Buy in Harare | SohoConnect', seoDescription: 'Samsung Galaxy A06 BLACK FRIDAY deal. 64GB/4GB only $72. Shop in Harare at SohoConnect.', seoKeywords: ['Samsung A06 Harare', 'cheap Samsung Zimbabwe', 'Black Friday phones'] },
  { id: 'samsung-a06-128', name: 'Samsung Galaxy A06 (128GB/4GB)', slug: 'samsung-galaxy-a06-128gb', category: 'smartphones', price: 85, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A06 with 128GB storage and 4GB RAM. Great value smartphone.', shortDescription: '128GB storage, 4GB RAM', inStock: true, stockCount: 20, featured: true, sku: 'SOHO-A06-128-4', features: ['128GB storage', '4GB RAM', 'Long-lasting battery'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A06 128GB - BLACK FRIDAY - Buy in Harare | SohoConnect', seoDescription: 'Samsung A06 128GB BLACK FRIDAY special $85. Shop SohoConnect Harare.', seoKeywords: ['Samsung A06 Harare', 'Samsung 128GB Zimbabwe'] },
  { id: 'samsung-a07-64', name: 'Samsung Galaxy A07 (64GB/4GB)', slug: 'samsung-galaxy-a07-64gb', category: 'smartphones', price: 77, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A07 with 64GB storage. Reliable performance.', shortDescription: '64GB storage, 4GB RAM', inStock: true, stockCount: 18, featured: true, sku: 'SOHO-A07-64-4', features: ['64GB storage', '4GB RAM'], specifications: { 'Storage': '64GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A07 64GB - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung A07 64GB $77 BLACK FRIDAY deal. Shop SohoConnect.', seoKeywords: ['Samsung A07 Harare', 'Samsung Zimbabwe'] },
  { id: 'samsung-a07-128', name: 'Samsung Galaxy A07 (128GB/4GB)', slug: 'samsung-galaxy-a07-128gb', category: 'smartphones', price: 89, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A07 with 128GB storage.', shortDescription: '128GB storage, 4GB RAM', inStock: true, stockCount: 18, featured: true, sku: 'SOHO-A07-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A07 128GB - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung A07 128GB $89. BLACK FRIDAY special. SohoConnect Harare.', seoKeywords: ['Samsung A07 Harare', 'Samsung phones Zimbabwe'] },
  { id: 'samsung-a07-128-6', name: 'Samsung Galaxy A07 (128GB/6GB)', slug: 'samsung-galaxy-a07-128gb-6gb', category: 'smartphones', price: 110, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A07 with enhanced 6GB RAM.', shortDescription: '128GB storage, 6GB RAM', inStock: true, stockCount: 15, sku: 'SOHO-A07-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A07 128GB/6GB - Harare | SohoConnect', seoDescription: 'Samsung A07 with 6GB RAM. $110 at SohoConnect Harare.', seoKeywords: ['Samsung A07 Harare'] },
  { id: 'samsung-a05s-128', name: 'Samsung Galaxy A05s (128GB/4GB)', slug: 'samsung-galaxy-a05s-128gb', category: 'smartphones', price: 109, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A05s with 128GB storage.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 12, sku: 'SOHO-A05S-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A05s - Harare | SohoConnect', seoDescription: 'Samsung A05s 128GB. $109 at SohoConnect.', seoKeywords: ['Samsung A05s Harare'] },
  { id: 'samsung-a16-128-4', name: 'Samsung Galaxy A16 (128GB/4GB)', slug: 'samsung-galaxy-a16-128gb', category: 'smartphones', price: 118, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A16 with excellent performance.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 15, sku: 'SOHO-A16-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A16 - Harare | SohoConnect', seoDescription: 'Samsung A16 128GB $118. SohoConnect Harare.', seoKeywords: ['Samsung A16 Harare'] },
  { id: 'samsung-a16-128-6', name: 'Samsung Galaxy A16 (128GB/6GB)', slug: 'samsung-galaxy-a16-128gb-6gb', category: 'smartphones', price: 135, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A16 with 6GB RAM for better multitasking.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 15, sku: 'SOHO-A16-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A16 6GB RAM - Harare | SohoConnect', seoDescription: 'Samsung A16 128GB/6GB $135. SohoConnect.', seoKeywords: ['Samsung A16 Harare'] },
  { id: 'samsung-a16-256-8', name: 'Samsung Galaxy A16 (256GB/8GB)', slug: 'samsung-galaxy-a16-256gb-8gb', category: 'smartphones', price: 165, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A16 with premium 256GB storage and 8GB RAM.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-A16-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A16 256GB - Harare | SohoConnect', seoDescription: 'Samsung A16 256GB/8GB $165. SohoConnect Harare.', seoKeywords: ['Samsung A16 Harare'] },
  { id: 'samsung-a17-128-4', name: 'Samsung Galaxy A17 (128GB/4GB)', slug: 'samsung-galaxy-a17-128gb', category: 'smartphones', price: 140, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A17 with great features.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 12, featured: true, sku: 'SOHO-A17-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A17 - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung A17 128GB $140. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung A17 Harare'] },
  { id: 'samsung-a17-128-6', name: 'Samsung Galaxy A17 (128GB/6GB)', slug: 'samsung-galaxy-a17-128gb-6gb', category: 'smartphones', price: 153, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A17 with enhanced RAM.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 12, featured: true, sku: 'SOHO-A17-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A17 6GB - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung A17 6GB $153. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung A17 Harare'] },
  { id: 'samsung-a17-256-8', name: 'Samsung Galaxy A17 (256GB/8GB)', slug: 'samsung-galaxy-a17-256gb-8gb', category: 'smartphones', price: 180, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A17 with maximum storage and RAM.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 10, featured: true, sku: 'SOHO-A17-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A17 256GB - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung A17 256GB/8GB $180. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung A17 Harare'] },
  { id: 'samsung-a26-128-6', name: 'Samsung Galaxy A26 (128GB/6GB)', slug: 'samsung-galaxy-a26-128gb-6gb', category: 'smartphones', price: 180, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A26 with great performance.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-A26-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A26 - Harare | SohoConnect', seoDescription: 'Samsung A26 128GB/6GB $180. SohoConnect.', seoKeywords: ['Samsung A26 Harare'] },
  { id: 'samsung-a26-256-8', name: 'Samsung Galaxy A26 (256GB/8GB)', slug: 'samsung-galaxy-a26-256gb-8gb', category: 'smartphones', price: 215, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A26 with premium specs.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-A26-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A26 256GB - Harare | SohoConnect', seoDescription: 'Samsung A26 256GB/8GB $215. SohoConnect.', seoKeywords: ['Samsung A26 Harare'] },
  { id: 'samsung-a34-128-8', name: 'Samsung Galaxy A34 (128GB/8GB)', slug: 'samsung-galaxy-a34-128gb-8gb', category: 'smartphones', price: 220, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A34 with premium features.', shortDescription: '128GB, 8GB RAM', inStock: true, stockCount: 6, sku: 'SOHO-A34-128-8', features: ['128GB storage', '8GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A34 - Harare | SohoConnect', seoDescription: 'Samsung A34 128GB/8GB $220. SohoConnect.', seoKeywords: ['Samsung A34 Harare'] },
  { id: 'samsung-a35-128-8', name: 'Samsung Galaxy A35 (128GB/8GB)', slug: 'samsung-galaxy-a35-128gb-8gb', category: 'smartphones', price: 210, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A35 with excellent camera.', shortDescription: '128GB, 8GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-A35-128-8', features: ['128GB storage', '8GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A35 - Harare | SohoConnect', seoDescription: 'Samsung A35 128GB/8GB $210. SohoConnect.', seoKeywords: ['Samsung A35 Harare'] },
  { id: 'samsung-a35-256-8', name: 'Samsung Galaxy A35 (256GB/8GB)', slug: 'samsung-galaxy-a35-256gb-8gb', category: 'smartphones', price: 240, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A35 with more storage.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-A35-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A35 256GB - Harare | SohoConnect', seoDescription: 'Samsung A35 256GB/8GB $240. SohoConnect.', seoKeywords: ['Samsung A35 Harare'] },
  { id: 'samsung-a36-128-8', name: 'Samsung Galaxy A36 (128GB/8GB)', slug: 'samsung-galaxy-a36-128gb-8gb', category: 'smartphones', price: 240, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A36 with premium performance.', shortDescription: '128GB, 8GB RAM', inStock: true, stockCount: 7, sku: 'SOHO-A36-128-8', features: ['128GB storage', '8GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A36 - Harare | SohoConnect', seoDescription: 'Samsung A36 128GB/8GB $240. SohoConnect.', seoKeywords: ['Samsung A36 Harare'] },
  { id: 'samsung-a36-256-8', name: 'Samsung Galaxy A36 (256GB/8GB)', slug: 'samsung-galaxy-a36-256gb-8gb', category: 'smartphones', price: 270, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A36 with expanded storage.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 7, sku: 'SOHO-A36-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A36 256GB - Harare | SohoConnect', seoDescription: 'Samsung A36 256GB/8GB $270. SohoConnect.', seoKeywords: ['Samsung A36 Harare'] },
  { id: 'samsung-a36-256-12', name: 'Samsung Galaxy A36 (256GB/12GB)', slug: 'samsung-galaxy-a36-256gb-12gb', category: 'smartphones', price: 275, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A36 with maximum RAM.', shortDescription: '256GB, 12GB RAM', inStock: true, stockCount: 5, sku: 'SOHO-A36-256-12', features: ['256GB storage', '12GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '12GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A36 12GB RAM - Harare | SohoConnect', seoDescription: 'Samsung A36 256GB/12GB $275. SohoConnect.', seoKeywords: ['Samsung A36 Harare'] },
  { id: 'samsung-a56-128-8', name: 'Samsung Galaxy A56 (128GB/8GB)', slug: 'samsung-galaxy-a56-128gb-8gb', category: 'smartphones', price: 300, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A56 with flagship features.', shortDescription: '128GB, 8GB RAM', inStock: true, stockCount: 6, sku: 'SOHO-A56-128-8', features: ['128GB storage', '8GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A56 - Harare | SohoConnect', seoDescription: 'Samsung A56 128GB/8GB $300. SohoConnect.', seoKeywords: ['Samsung A56 Harare'] },
  { id: 'samsung-a56-256-8', name: 'Samsung Galaxy A56 (256GB/8GB)', slug: 'samsung-galaxy-a56-256gb-8gb', category: 'smartphones', price: 330, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy A56 with expanded storage.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 6, sku: 'SOHO-A56-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung A56 256GB - Harare | SohoConnect', seoDescription: 'Samsung A56 256GB/8GB $330. SohoConnect.', seoKeywords: ['Samsung A56 Harare'] },

  // SAMSUNG F-SERIES
  { id: 'samsung-f05-64', name: 'Samsung Galaxy F05 (64GB/4GB)', slug: 'samsung-galaxy-f05-64gb', category: 'smartphones', price: 74, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy F05 budget smartphone.', shortDescription: '64GB, 4GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-F05-64-4', features: ['64GB storage', '4GB RAM'], specifications: { 'Storage': '64GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung F05 - Harare | SohoConnect', seoDescription: 'Samsung F05 64GB $74. SohoConnect.', seoKeywords: ['Samsung F05 Harare'] },
  { id: 'samsung-f06-128-4', name: 'Samsung Galaxy F06 (128GB/4GB)', slug: 'samsung-galaxy-f06-128gb', category: 'smartphones', price: 90, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy F06 with 128GB storage.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-F06-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung F06 - Harare | SohoConnect', seoDescription: 'Samsung F06 128GB $90. SohoConnect.', seoKeywords: ['Samsung F06 Harare'] },
  { id: 'samsung-f06-128-6', name: 'Samsung Galaxy F06 (128GB/6GB)', slug: 'samsung-galaxy-f06-128gb-6gb', category: 'smartphones', price: 105, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy F06 with 6GB RAM.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-F06-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung F06 6GB - Harare | SohoConnect', seoDescription: 'Samsung F06 6GB $105. SohoConnect.', seoKeywords: ['Samsung F06 Harare'] },
  { id: 'samsung-f16-128-4', name: 'Samsung Galaxy F16 (128GB/4GB)', slug: 'samsung-galaxy-f16-128gb', category: 'smartphones', price: 135, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy F16 mid-range smartphone.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-F16-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung F16 - Harare | SohoConnect', seoDescription: 'Samsung F16 128GB $135. SohoConnect.', seoKeywords: ['Samsung F16 Harare'] },
  { id: 'samsung-f16-128-6', name: 'Samsung Galaxy F16 (128GB/6GB)', slug: 'samsung-galaxy-f16-128gb-6gb', category: 'smartphones', price: 138, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy F16 with 6GB RAM.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-F16-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung F16 6GB - Harare | SohoConnect', seoDescription: 'Samsung F16 6GB $138. SohoConnect.', seoKeywords: ['Samsung F16 Harare'] },
  { id: 'samsung-f17-128-4', name: 'Samsung Galaxy F17 (128GB/4GB)', slug: 'samsung-galaxy-f17-128gb', category: 'smartphones', price: 142, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy F17 with great features.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 8, featured: true, sku: 'SOHO-F17-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung F17 - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung F17 $142. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung F17 Harare'] },
  { id: 'samsung-f55-256-8', name: 'Samsung Galaxy F55 (256GB/8GB)', slug: 'samsung-galaxy-f55-256gb-8gb', category: 'smartphones', price: 220, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy F55 premium F-series phone.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 5, featured: true, sku: 'SOHO-F55-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung F55 - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung F55 256GB $220. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung F55 Harare'] },

  // SAMSUNG M-SERIES
  { id: 'samsung-m06-128-4', name: 'Samsung Galaxy M06 (128GB/4GB)', slug: 'samsung-galaxy-m06-128gb', category: 'smartphones', price: 90, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M06 with massive battery.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-M06-128-4', features: ['128GB storage', '4GB RAM', 'Large battery'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M06 - Harare | SohoConnect', seoDescription: 'Samsung M06 128GB $90. SohoConnect.', seoKeywords: ['Samsung M06 Harare'] },
  { id: 'samsung-m07-64-4', name: 'Samsung Galaxy M07 (64GB/4GB)', slug: 'samsung-galaxy-m07-64gb', category: 'smartphones', price: 78, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M07 budget M-series.', shortDescription: '64GB, 4GB RAM', inStock: true, stockCount: 10, featured: true, sku: 'SOHO-M07-64-4', features: ['64GB storage', '4GB RAM'], specifications: { 'Storage': '64GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M07 - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung M07 $78. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung M07 Harare'] },
  { id: 'samsung-m16-128-4', name: 'Samsung Galaxy M16 (128GB/4GB)', slug: 'samsung-galaxy-m16-128gb', category: 'smartphones', price: 130, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M16 with good performance.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-M16-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M16 - Harare | SohoConnect', seoDescription: 'Samsung M16 $130. SohoConnect.', seoKeywords: ['Samsung M16 Harare'] },
  { id: 'samsung-m16-128-6', name: 'Samsung Galaxy M16 (128GB/6GB)', slug: 'samsung-galaxy-m16-128gb-6gb', category: 'smartphones', price: 137, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M16 with 6GB RAM.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-M16-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M16 6GB - Harare | SohoConnect', seoDescription: 'Samsung M16 6GB $137. SohoConnect.', seoKeywords: ['Samsung M16 Harare'] },
  { id: 'samsung-m16-128-8', name: 'Samsung Galaxy M16 (128GB/8GB)', slug: 'samsung-galaxy-m16-128gb-8gb', category: 'smartphones', price: 155, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M16 with 8GB RAM.', shortDescription: '128GB, 8GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-M16-128-8', features: ['128GB storage', '8GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M16 8GB - Harare | SohoConnect', seoDescription: 'Samsung M16 8GB $155. SohoConnect.', seoKeywords: ['Samsung M16 Harare'] },
  { id: 'samsung-m17-128-4', name: 'Samsung Galaxy M17 (128GB/4GB)', slug: 'samsung-galaxy-m17-128gb', category: 'smartphones', price: 145, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M17 with great battery.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 8, featured: true, sku: 'SOHO-M17-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M17 - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung M17 $145. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung M17 Harare'] },
  { id: 'samsung-m35-256-8', name: 'Samsung Galaxy M35 (256GB/8GB)', slug: 'samsung-galaxy-m35-256gb-8gb', category: 'smartphones', price: 220, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M35 premium M-series.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 5, sku: 'SOHO-M35-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M35 - Harare | SohoConnect', seoDescription: 'Samsung M35 256GB $220. SohoConnect.', seoKeywords: ['Samsung M35 Harare'] },
  { id: 'samsung-m36-128-6', name: 'Samsung Galaxy M36 (128GB/6GB)', slug: 'samsung-galaxy-m36-128gb-6gb', category: 'smartphones', price: 150, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M36 with excellent features.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 6, sku: 'SOHO-M36-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M36 - Harare | SohoConnect', seoDescription: 'Samsung M36 128GB $150. SohoConnect.', seoKeywords: ['Samsung M36 Harare'] },
  { id: 'samsung-m55s-128-8', name: 'Samsung Galaxy M55s (128GB/8GB)', slug: 'samsung-galaxy-m55s-128gb-8gb', category: 'smartphones', price: 220, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M55s premium phone.', shortDescription: '128GB, 8GB RAM', inStock: true, stockCount: 5, sku: 'SOHO-M55S-128-8', features: ['128GB storage', '8GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M55s - Harare | SohoConnect', seoDescription: 'Samsung M55s 128GB $220. SohoConnect.', seoKeywords: ['Samsung M55s Harare'] },
  { id: 'samsung-m55s-256-8', name: 'Samsung Galaxy M55s (256GB/8GB)', slug: 'samsung-galaxy-m55s-256gb-8gb', category: 'smartphones', price: 230, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy M55s with more storage.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 5, sku: 'SOHO-M55S-256-8', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung M55s 256GB - Harare | SohoConnect', seoDescription: 'Samsung M55s 256GB $230. SohoConnect.', seoKeywords: ['Samsung M55s Harare'] },

  // SAMSUNG S-SERIES FLAGSHIPS
  { id: 'samsung-s23-256-rf', name: 'Samsung Galaxy S23 (256GB, Refurbished)', slug: 'samsung-galaxy-s23-256gb-rf', category: 'smartphones', price: 310, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Refurbished Samsung Galaxy S23 flagship.', shortDescription: '256GB, Refurbished', inStock: true, stockCount: 3, sku: 'SOHO-S23-256-RF', features: ['256GB storage', 'Flagship camera'], specifications: { 'Storage': '256GB', 'Condition': 'Refurbished' }, warranty: '6 months warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S23 Refurbished - Harare | SohoConnect', seoDescription: 'Samsung S23 refurbished $310. SohoConnect.', seoKeywords: ['Samsung S23 Harare'] },
  { id: 'samsung-s23-256', name: 'Samsung Galaxy S23 (256GB)', slug: 'samsung-galaxy-s23-256gb', category: 'smartphones', price: 560, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S23 flagship smartphone.', shortDescription: '256GB, Flagship', inStock: true, stockCount: 4, sku: 'SOHO-S23-256', features: ['256GB storage', 'Premium camera'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S23 - Harare | SohoConnect', seoDescription: 'Samsung S23 256GB $560. SohoConnect.', seoKeywords: ['Samsung S23 Harare'] },
  { id: 'samsung-s24-128', name: 'Samsung Galaxy S24 (128GB)', slug: 'samsung-galaxy-s24-128gb', category: 'smartphones', price: 550, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S24 with Galaxy AI.', shortDescription: '128GB, Galaxy AI', inStock: true, stockCount: 5, sku: 'SOHO-S24-128', features: ['128GB storage', 'Galaxy AI'], specifications: { 'Storage': '128GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S24 - Harare | SohoConnect', seoDescription: 'Samsung S24 128GB $550. SohoConnect.', seoKeywords: ['Samsung S24 Harare'] },
  { id: 'samsung-s24-256', name: 'Samsung Galaxy S24 (256GB)', slug: 'samsung-galaxy-s24-256gb', category: 'smartphones', price: 550, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S24 with more storage.', shortDescription: '256GB, Galaxy AI', inStock: true, stockCount: 5, sku: 'SOHO-S24-256', features: ['256GB storage', 'Galaxy AI'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S24 256GB - Harare | SohoConnect', seoDescription: 'Samsung S24 256GB $550. SohoConnect.', seoKeywords: ['Samsung S24 Harare'] },
  { id: 'samsung-s24-fe-256', name: 'Samsung Galaxy S24 FE (256GB)', slug: 'samsung-galaxy-s24-fe-256gb', category: 'smartphones', price: 420, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S24 FE Fan Edition.', shortDescription: '256GB, Fan Edition', inStock: true, stockCount: 6, sku: 'SOHO-S24-FE-256', features: ['256GB storage', 'FE features'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S24 FE - Harare | SohoConnect', seoDescription: 'Samsung S24 FE $420. SohoConnect.', seoKeywords: ['Samsung S24 FE Harare'] },
  { id: 'samsung-s24-ultra-256', name: 'Samsung Galaxy S24 Ultra (256GB)', slug: 'samsung-galaxy-s24-ultra-256gb', category: 'smartphones', price: 790, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S24 Ultra flagship with S Pen.', shortDescription: '256GB, S Pen, 200MP', inStock: true, stockCount: 3, sku: 'SOHO-S24-ULTRA-256', features: ['256GB storage', 'S Pen', '200MP camera'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S24 Ultra - Harare | SohoConnect', seoDescription: 'Samsung S24 Ultra $790. SohoConnect.', seoKeywords: ['Samsung S24 Ultra Harare'] },
  { id: 'samsung-s24-ultra-512', name: 'Samsung Galaxy S24 Ultra (512GB)', slug: 'samsung-galaxy-s24-ultra-512gb', category: 'smartphones', price: 900, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S24 Ultra with 512GB storage.', shortDescription: '512GB, S Pen', inStock: true, stockCount: 2, sku: 'SOHO-S24-ULTRA-512', features: ['512GB storage', 'S Pen'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S24 Ultra 512GB - Harare | SohoConnect', seoDescription: 'Samsung S24 Ultra 512GB $900. SohoConnect.', seoKeywords: ['Samsung S24 Ultra Harare'] },
  { id: 'samsung-s25-fe-256', name: 'Samsung Galaxy S25 FE (256GB)', slug: 'samsung-galaxy-s25-fe-256gb', category: 'smartphones', price: 600, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 FE latest Fan Edition.', shortDescription: '256GB, Latest FE', inStock: true, stockCount: 5, featured: true, sku: 'SOHO-S25-FE-256', features: ['256GB storage'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 FE - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung S25 FE $600. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung S25 FE Harare'] },
  { id: 'samsung-s25-128', name: 'Samsung Galaxy S25 (128GB)', slug: 'samsung-galaxy-s25-128gb', category: 'smartphones', price: 620, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 latest flagship.', shortDescription: '128GB, Latest', inStock: true, stockCount: 4, sku: 'SOHO-S25-128', features: ['128GB storage'], specifications: { 'Storage': '128GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 - Harare | SohoConnect', seoDescription: 'Samsung S25 $620. SohoConnect.', seoKeywords: ['Samsung S25 Harare'] },
  { id: 'samsung-s25-256', name: 'Samsung Galaxy S25 (256GB)', slug: 'samsung-galaxy-s25-256gb', category: 'smartphones', price: 700, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 with more storage.', shortDescription: '256GB, Latest', inStock: true, stockCount: 4, sku: 'SOHO-S25-256', features: ['256GB storage'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 256GB - Harare | SohoConnect', seoDescription: 'Samsung S25 256GB $700. SohoConnect.', seoKeywords: ['Samsung S25 Harare'] },
  { id: 'samsung-s25-plus-256', name: 'Samsung Galaxy S25 Plus (256GB)', slug: 'samsung-galaxy-s25-plus-256gb', category: 'smartphones', price: 840, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 Plus larger screen.', shortDescription: '256GB, Plus', inStock: true, stockCount: 3, sku: 'SOHO-S25-PLUS-256', features: ['256GB storage'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 Plus - Harare | SohoConnect', seoDescription: 'Samsung S25 Plus $840. SohoConnect.', seoKeywords: ['Samsung S25 Plus Harare'] },
  { id: 'samsung-s25-plus-512', name: 'Samsung Galaxy S25 Plus (512GB)', slug: 'samsung-galaxy-s25-plus-512gb', category: 'smartphones', price: 880, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 Plus with 512GB.', shortDescription: '512GB, Plus', inStock: true, stockCount: 2, sku: 'SOHO-S25-PLUS-512', features: ['512GB storage'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 Plus 512GB - Harare | SohoConnect', seoDescription: 'Samsung S25 Plus 512GB $880. SohoConnect.', seoKeywords: ['Samsung S25 Plus Harare'] },
  { id: 'samsung-s25-ultra-256', name: 'Samsung Galaxy S25 Ultra (256GB)', slug: 'samsung-galaxy-s25-ultra-256gb', category: 'smartphones', price: 890, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 Ultra flagship.', shortDescription: '256GB, Ultra, S Pen', inStock: true, stockCount: 3, featured: true, sku: 'SOHO-S25-ULTRA-256', features: ['256GB storage', 'S Pen'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 Ultra - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung S25 Ultra $890. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung S25 Ultra Harare'] },
  { id: 'samsung-s25-ultra-512', name: 'Samsung Galaxy S25 Ultra (512GB)', slug: 'samsung-galaxy-s25-ultra-512gb', category: 'smartphones', price: 1050, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 Ultra with 512GB.', shortDescription: '512GB, Ultra', inStock: true, stockCount: 2, sku: 'SOHO-S25-ULTRA-512', features: ['512GB storage', 'S Pen'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 Ultra 512GB - Harare | SohoConnect', seoDescription: 'Samsung S25 Ultra 512GB $1050. SohoConnect.', seoKeywords: ['Samsung S25 Ultra Harare'] },
  { id: 'samsung-s25-ultra-1tb', name: 'Samsung Galaxy S25 Ultra (1TB)', slug: 'samsung-galaxy-s25-ultra-1tb', category: 'smartphones', price: 1180, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 Ultra with 1TB storage.', shortDescription: '1TB, Ultra', inStock: true, stockCount: 1, sku: 'SOHO-S25-ULTRA-1TB', features: ['1TB storage', 'S Pen'], specifications: { 'Storage': '1TB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 Ultra 1TB - Harare | SohoConnect', seoDescription: 'Samsung S25 Ultra 1TB $1180. SohoConnect.', seoKeywords: ['Samsung S25 Ultra Harare'] },
  { id: 'samsung-s25-edge-256', name: 'Samsung Galaxy S25 Edge (256GB)', slug: 'samsung-galaxy-s25-edge-256gb', category: 'smartphones', price: 900, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 Edge curved display.', shortDescription: '256GB, Edge', inStock: true, stockCount: 2, sku: 'SOHO-S25-EDGE-256', features: ['256GB storage', 'Edge display'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 Edge - Harare | SohoConnect', seoDescription: 'Samsung S25 Edge $900. SohoConnect.', seoKeywords: ['Samsung S25 Edge Harare'] },
  { id: 'samsung-s25-edge-512', name: 'Samsung Galaxy S25 Edge (512GB)', slug: 'samsung-galaxy-s25-edge-512gb', category: 'smartphones', price: 940, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy S25 Edge with 512GB.', shortDescription: '512GB, Edge', inStock: true, stockCount: 1, sku: 'SOHO-S25-EDGE-512', features: ['512GB storage', 'Edge display'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung S25 Edge 512GB - Harare | SohoConnect', seoDescription: 'Samsung S25 Edge 512GB $940. SohoConnect.', seoKeywords: ['Samsung S25 Edge Harare'] },

  // SAMSUNG FOLDABLES
  { id: 'samsung-zflip6-256', name: 'Samsung Galaxy Z Flip 6 (256GB)', slug: 'samsung-galaxy-z-flip-6-256gb', category: 'smartphones', price: 730, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Flip 6 foldable phone.', shortDescription: '256GB, Foldable', inStock: true, stockCount: 2, sku: 'SOHO-ZFLIP6-256', features: ['256GB storage', 'Foldable display'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Flip 6 - Harare | SohoConnect', seoDescription: 'Samsung Z Flip 6 $730. SohoConnect.', seoKeywords: ['Samsung Z Flip Harare'] },
  { id: 'samsung-zflip6-512', name: 'Samsung Galaxy Z Flip 6 (512GB)', slug: 'samsung-galaxy-z-flip-6-512gb', category: 'smartphones', price: 840, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Flip 6 with 512GB.', shortDescription: '512GB, Foldable', inStock: true, stockCount: 1, sku: 'SOHO-ZFLIP6-512', features: ['512GB storage', 'Foldable display'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Flip 6 512GB - Harare | SohoConnect', seoDescription: 'Samsung Z Flip 6 512GB $840. SohoConnect.', seoKeywords: ['Samsung Z Flip Harare'] },
  { id: 'samsung-zfold6-256', name: 'Samsung Galaxy Z Fold 6 (256GB)', slug: 'samsung-galaxy-z-fold-6-256gb', category: 'smartphones', price: 1220, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Fold 6 tablet-phone hybrid.', shortDescription: '256GB, Fold', inStock: true, stockCount: 1, sku: 'SOHO-ZFOLD6-256', features: ['256GB storage', 'Tablet mode'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Fold 6 - Harare | SohoConnect', seoDescription: 'Samsung Z Fold 6 $1220. SohoConnect.', seoKeywords: ['Samsung Z Fold Harare'] },
  { id: 'samsung-zfold6-512', name: 'Samsung Galaxy Z Fold 6 (512GB)', slug: 'samsung-galaxy-z-fold-6-512gb', category: 'smartphones', price: 1300, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Fold 6 with 512GB.', shortDescription: '512GB, Fold', inStock: true, stockCount: 1, sku: 'SOHO-ZFOLD6-512', features: ['512GB storage', 'Tablet mode'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Fold 6 512GB - Harare | SohoConnect', seoDescription: 'Samsung Z Fold 6 512GB $1300. SohoConnect.', seoKeywords: ['Samsung Z Fold Harare'] },
  { id: 'samsung-zflip7-fe-256', name: 'Samsung Galaxy Z Flip 7 FE (256GB)', slug: 'samsung-galaxy-z-flip-7-fe-256gb', category: 'smartphones', price: 850, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Flip 7 FE new foldable.', shortDescription: '256GB, FE Foldable', inStock: true, stockCount: 2, featured: true, sku: 'SOHO-ZFLIP7-FE-256', features: ['256GB storage', 'Foldable'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Flip 7 FE - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Samsung Z Flip 7 FE $850. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Samsung Z Flip 7 Harare'] },
  { id: 'samsung-zflip7-256', name: 'Samsung Galaxy Z Flip 7 (256GB)', slug: 'samsung-galaxy-z-flip-7-256gb', category: 'smartphones', price: 880, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Flip 7 latest foldable.', shortDescription: '256GB, Latest Flip', inStock: true, stockCount: 2, sku: 'SOHO-ZFLIP7-256', features: ['256GB storage', 'Foldable'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Flip 7 - Harare | SohoConnect', seoDescription: 'Samsung Z Flip 7 $880. SohoConnect.', seoKeywords: ['Samsung Z Flip 7 Harare'] },
  { id: 'samsung-zfold7-256', name: 'Samsung Galaxy Z Fold 7 (256GB)', slug: 'samsung-galaxy-z-fold-7-256gb', category: 'smartphones', price: 1530, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Fold 7 latest fold.', shortDescription: '256GB, Latest Fold', inStock: true, stockCount: 1, sku: 'SOHO-ZFOLD7-256', features: ['256GB storage', 'Tablet mode'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Fold 7 - Harare | SohoConnect', seoDescription: 'Samsung Z Fold 7 $1530. SohoConnect.', seoKeywords: ['Samsung Z Fold 7 Harare'] },
  { id: 'samsung-zfold7-512', name: 'Samsung Galaxy Z Fold 7 (512GB)', slug: 'samsung-galaxy-z-fold-7-512gb', category: 'smartphones', price: 1650, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Fold 7 with 512GB.', shortDescription: '512GB, Fold', inStock: true, stockCount: 1, sku: 'SOHO-ZFOLD7-512', features: ['512GB storage', 'Tablet mode'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Fold 7 512GB - Harare | SohoConnect', seoDescription: 'Samsung Z Fold 7 512GB $1650. SohoConnect.', seoKeywords: ['Samsung Z Fold 7 Harare'] },
  { id: 'samsung-zfold7-1tb', name: 'Samsung Galaxy Z Fold 7 (1TB)', slug: 'samsung-galaxy-z-fold-7-1tb', category: 'smartphones', price: 1960, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Samsung Galaxy Z Fold 7 with 1TB.', shortDescription: '1TB, Fold', inStock: true, stockCount: 1, sku: 'SOHO-ZFOLD7-1TB', features: ['1TB storage', 'Tablet mode'], specifications: { 'Storage': '1TB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Z Fold 7 1TB - Harare | SohoConnect', seoDescription: 'Samsung Z Fold 7 1TB $1960. SohoConnect.', seoKeywords: ['Samsung Z Fold 7 Harare'] },

  // LAPTOPS
  {
    id: 'lenovo-ideapad-3-256',
    name: 'Lenovo IdeaPad 3 (256GB SSD, 8GB RAM)',
    slug: 'lenovo-ideapad-3-256-8',
    category: 'laptops',
    price: 499,
    currency: 'USD',
    image: '/images/electronics/laptop-workspace.jpg',
    images: ['/images/electronics/laptop-workspace.jpg'],
    description: 'Reliable 15.6" business laptop with AMD Ryzen, 256GB SSD and 8GB RAM. Perfect for office productivity.',
    shortDescription: 'Ryzen. 256GB SSD. 8GB RAM.',
    inStock: true,
    stockCount: 10,
    featured: true,
    sku: 'SOHO-LEN-IDEA3-256-8',
    features: [
      'AMD Ryzen 5 processor',
      '15.6" Full HD display',
      '256GB SSD storage',
      '8GB DDR4 RAM',
      'Windows 11 Pro'
    ],
    specifications: {
      'Display': '15.6" FHD 1920x1080',
      'Processor': 'AMD Ryzen 5',
      'Storage': '256GB SSD',
      'Memory': '8GB DDR4',
      'OS': 'Windows 11 Pro',
    },
    warranty: '12 months Lenovo warranty',
    delivery: 'Next-day delivery in Harare',
    seoTitle: 'Lenovo IdeaPad 3 - Buy in Harare | SohoConnect',
    seoDescription: 'Lenovo IdeaPad 3 with Ryzen, 256GB SSD and 8GB RAM. Perfect office laptop. Buy in Harare at SohoConnect.',
    seoKeywords: ['Lenovo laptop Harare', 'business laptop Zimbabwe']
  },
  {
    id: 'hp-250-g8-512',
    name: 'HP 250 G8 (512GB SSD, 16GB RAM)',
    slug: 'hp-250-g8-512-16',
    category: 'laptops',
    price: 629,
    currency: 'USD',
    image: '/images/electronics/laptop-workspace.jpg',
    images: ['/images/electronics/laptop-workspace.jpg'],
    description: 'Durable HP 250 G8 with Intel i5, 512GB SSD and 16GB RAM. Ideal for demanding business workloads.',
    shortDescription: 'Intel i5. 512GB SSD. 16GB RAM.',
    inStock: true,
    stockCount: 6,
    featured: false,
    sku: 'SOHO-HP-250G8-512-16',
    features: [
      'Intel Core i5',
      '14" Full HD display',
      '512GB SSD storage',
      '16GB DDR4 RAM',
      'Windows 11 Pro'
    ],
    specifications: {
      'Display': '14" FHD 1920x1080',
      'Processor': 'Intel Core i5',
      'Storage': '512GB SSD',
      'Memory': '16GB DDR4',
      'OS': 'Windows 11 Pro',
    },
    warranty: '12 months HP warranty',
    delivery: 'Next-day delivery in Harare',
    seoTitle: 'HP 250 G8 - Buy in Harare | SohoConnect',
    seoDescription: 'HP 250 G8 with Core i5, 512GB SSD and 16GB RAM. Business laptop. Buy in Harare at SohoConnect.',
    seoKeywords: ['HP laptop Harare', 'business laptop Zimbabwe']
  },

  // CCTV SYSTEMS
  {
    id: 'hikvision-4ch-kit',
    name: 'Hikvision 4-Channel CCTV Kit',
    slug: 'hikvision-4-channel-cctv-kit',
    category: 'cctv',
    price: 450,
    currency: 'USD',
    image: '/images/electronics/cctv-security.jpg',
    images: ['/images/electronics/cctv-security.jpg'],
    description: 'Complete 1080p surveillance system with 4 weatherproof cameras, DVR, and professional installation. Perfect for homes and small businesses in Zimbabwe.',
    shortDescription: '4 cameras. 1080p. Professional installation.',
    inStock: true,
    stockCount: 8,
    sku: 'SOHO-HIK-4CH-1080',

    features: [
      '4x 1080p weatherproof cameras',
      '4-channel DVR with 1TB HDD',
      'Night vision up to 20m',
      'Motion detection alerts',
      'Remote viewing via mobile app',
      'Professional installation included',
      'Weatherproof IP66 rating',
      '2-year warranty'
    ],

    specifications: {
      'Resolution': '1080p Full HD',
      'Cameras': '4x bullet cameras',
      'Storage': '1TB HDD',
      'Night Vision': 'Up to 20m',
      'Viewing Angle': '90 degrees',
      'Recording': 'Continuous / motion-triggered',
      'Remote Access': 'iOS & Android app',
      'Power': '12V DC adapter'
    },

    warranty: '2 years parts & labor',
    delivery: 'Installation within 48 hours',

    seoTitle: 'Hikvision 4-Channel CCTV Kit - Installation in Harare | SohoConnect',
    seoDescription: 'Complete CCTV system with installation in Harare. 4 cameras, 1080p, night vision. Professional setup. 2-year warranty. Shop SohoConnect.',
    seoKeywords: ['CCTV Harare', 'Hikvision Zimbabwe', 'security cameras Harare']
  },

  {
    id: 'dahua-8ch-system',
    name: 'Dahua 8-Channel 4K CCTV System',
    slug: 'dahua-8-channel-4k-system',
    category: 'cctv',
    price: 850,
    currency: 'USD',
    image: '/images/electronics/cctv-security.jpg',
    images: ['/images/electronics/cctv-security.jpg'],
    description: 'Professional 4K surveillance system with 8 cameras, AI-powered person/vehicle detection, and advanced night vision. Ideal for businesses and large properties.',
    shortDescription: '8 cameras. 4K resolution. AI detection.',
    inStock: true,
    stockCount: 5,
    sku: 'SOHO-DAH-8CH-4K',

    features: [
      '8x 4K AI cameras',
      '8-channel NVR with 2TB HDD',
      'AI person & vehicle detection',
      'Color night vision up to 30m',
      'Smart motion alerts',
      'Remote viewing & playback',
      'Professional installation',
      '3-year warranty'
    ],

    specifications: {
      'Resolution': '4K Ultra HD (8MP)',
      'Cameras': '8x dome/bullet cameras',
      'Storage': '2TB HDD (expandable)',
      'Night Vision': 'Color up to 30m',
      'AI Features': 'Person/vehicle detection, line crossing',
      'Recording': '24/7 continuous',
      'Remote Access': 'Web, iOS, Android',
      'Power': 'PoE'
    },

    warranty: '3 years parts & labor',
    delivery: 'Installation within 48 hours',

    seoTitle: 'Dahua 8-Channel 4K CCTV System - Professional Installation Harare',
    seoDescription: '4K CCTV with AI detection. 8 cameras, professional installation in Harare. 3-year warranty. Shop SohoConnect Electronics.',
    seoKeywords: ['4K CCTV Harare', 'Dahua Zimbabwe', 'AI security cameras Harare']
  },

  // TECH ACCESSORIES
  {
    id: 'anker-powerbank-20k',
    name: 'Anker PowerCore 20000mAh',
    slug: 'anker-powercore-20000mah',
    category: 'accessories',
    price: 45,
    currency: 'USD',
    image: '/images/electronics/laptop-workspace.jpg',
    images: ['/images/electronics/laptop-workspace.jpg'],
    description: 'High-capacity portable charger with fast charging support. Perfect for Zimbabwe\'s power challenges. Charge multiple devices simultaneously.',
    shortDescription: '20000mAh. Fast charging. Dual USB.',
    inStock: true,
    stockCount: 25,
    sku: 'SOHO-ANK-PB-20K',

    features: [
      '20000mAh capacity',
      'PowerIQ fast charging',
      'Dual USB outputs',
      'LED power indicator',
      'Surge protection',
      'Premium build quality',
      'Compact & portable',
      '18-month warranty'
    ],

    specifications: {
      'Capacity': '20000mAh / 72Wh',
      'Input': '5V/2A',
      'Output': 'USB-A: 5V/3A, USB-C: 5V/3A',
      'Charging Time': '10-11 hours',
      'Weight': '356g',
      'Dimensions': '158 x 74 x 19mm'
    },

    warranty: '18 months',
    delivery: 'Next-day delivery in Harare',

    seoTitle: 'Anker PowerCore 20000mAh Powerbank - Buy in Harare | SohoConnect',
    seoDescription: 'Anker 20000mAh powerbank with fast charging. Perfect for load shedding. Shop in Harare at SohoConnect Electronics.',
    seoKeywords: ['powerbank Harare', 'Anker Zimbabwe', 'portable charger Harare']
  },

  // SAMSUNG TABLETS
  { id: 'samsung-tab-a9-64', name: 'Samsung Galaxy Tab A9 (64GB)', slug: 'samsung-galaxy-tab-a9-64gb', category: 'tablets', price: 105, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab A9 tablet with 64GB storage.', shortDescription: '64GB, 8.7-inch display', inStock: true, stockCount: 8, sku: 'SOHO-TAB-A9-64', features: ['64GB storage', '8.7-inch display'], specifications: { 'Storage': '64GB', 'Screen': '8.7-inch' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab A9 64GB - Harare | SohoConnect', seoDescription: 'Samsung Tab A9 64GB $105. SohoConnect.', seoKeywords: ['Samsung Tablet Harare', 'Tab A9 Zimbabwe'] },
  { id: 'samsung-tab-a9-128', name: 'Samsung Galaxy Tab A9 (128GB)', slug: 'samsung-galaxy-tab-a9-128gb', category: 'tablets', price: 140, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab A9 with 128GB storage.', shortDescription: '128GB, 8.7-inch', inStock: true, stockCount: 8, sku: 'SOHO-TAB-A9-128', features: ['128GB storage', '8.7-inch display'], specifications: { 'Storage': '128GB', 'Screen': '8.7-inch' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab A9 128GB - Harare | SohoConnect', seoDescription: 'Samsung Tab A9 128GB $140. SohoConnect.', seoKeywords: ['Samsung Tablet Harare'] },
  { id: 'samsung-tab-a9plus-64', name: 'Samsung Galaxy Tab A9+ (64GB)', slug: 'samsung-galaxy-tab-a9plus-64gb', category: 'tablets', price: 175, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab A9+ with larger display.', shortDescription: '64GB, 11-inch', inStock: true, stockCount: 6, sku: 'SOHO-TAB-A9PLUS-64', features: ['64GB storage', '11-inch display'], specifications: { 'Storage': '64GB', 'Screen': '11-inch' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab A9+ - Harare | SohoConnect', seoDescription: 'Samsung Tab A9+ $175. SohoConnect.', seoKeywords: ['Samsung Tablet Harare'] },
  { id: 'samsung-tab-a9plus-128', name: 'Samsung Galaxy Tab A9+ (128GB)', slug: 'samsung-galaxy-tab-a9plus-128gb', category: 'tablets', price: 200, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab A9+ with 128GB.', shortDescription: '128GB, 11-inch', inStock: true, stockCount: 6, sku: 'SOHO-TAB-A9PLUS-128', features: ['128GB storage', '11-inch display'], specifications: { 'Storage': '128GB', 'Screen': '11-inch' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab A9+ 128GB - Harare | SohoConnect', seoDescription: 'Samsung Tab A9+ 128GB $200. SohoConnect.', seoKeywords: ['Samsung Tablet Harare'] },
  { id: 'samsung-tab-s9-128', name: 'Samsung Galaxy Tab S9 (128GB)', slug: 'samsung-galaxy-tab-s9-128gb', category: 'tablets', price: 550, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab S9 premium tablet.', shortDescription: '128GB, S series', inStock: true, stockCount: 4, sku: 'SOHO-TAB-S9-128', features: ['128GB storage', 'Premium display'], specifications: { 'Storage': '128GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab S9 - Harare | SohoConnect', seoDescription: 'Samsung Tab S9 $550. SohoConnect.', seoKeywords: ['Samsung Tab S9 Harare'] },
  { id: 'samsung-tab-s9-256', name: 'Samsung Galaxy Tab S9 (256GB)', slug: 'samsung-galaxy-tab-s9-256gb', category: 'tablets', price: 680, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab S9 with 256GB.', shortDescription: '256GB, S series', inStock: true, stockCount: 4, sku: 'SOHO-TAB-S9-256', features: ['256GB storage'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab S9 256GB - Harare | SohoConnect', seoDescription: 'Samsung Tab S9 256GB $680. SohoConnect.', seoKeywords: ['Samsung Tab S9 Harare'] },
  { id: 'samsung-tab-s10fe-128', name: 'Samsung Galaxy Tab S10 FE (128GB)', slug: 'samsung-galaxy-tab-s10-fe-128gb', category: 'tablets', price: 470, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab S10 FE tablet.', shortDescription: '128GB, FE', inStock: true, stockCount: 5, sku: 'SOHO-TAB-S10FE-128', features: ['128GB storage'], specifications: { 'Storage': '128GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab S10 FE - Harare | SohoConnect', seoDescription: 'Samsung Tab S10 FE $470. SohoConnect.', seoKeywords: ['Samsung Tab S10 Harare'] },
  { id: 'samsung-tab-s10fe-256', name: 'Samsung Galaxy Tab S10 FE (256GB)', slug: 'samsung-galaxy-tab-s10-fe-256gb', category: 'tablets', price: 600, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab S10 FE with 256GB.', shortDescription: '256GB, FE', inStock: true, stockCount: 5, sku: 'SOHO-TAB-S10FE-256', features: ['256GB storage'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab S10 FE 256GB - Harare | SohoConnect', seoDescription: 'Samsung Tab S10 FE 256GB $600. SohoConnect.', seoKeywords: ['Samsung Tab S10 Harare'] },
  { id: 'samsung-tab-s10plus-256', name: 'Samsung Galaxy Tab S10 Plus (256GB)', slug: 'samsung-galaxy-tab-s10-plus-256gb', category: 'tablets', price: 990, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab S10 Plus premium tablet.', shortDescription: '256GB, Plus', inStock: true, stockCount: 3, sku: 'SOHO-TAB-S10PLUS-256', features: ['256GB storage', 'Large display'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab S10 Plus - Harare | SohoConnect', seoDescription: 'Samsung Tab S10 Plus $990. SohoConnect.', seoKeywords: ['Samsung Tab S10 Harare'] },
  { id: 'samsung-tab-s10ultra-256', name: 'Samsung Galaxy Tab S10 Ultra (256GB)', slug: 'samsung-galaxy-tab-s10-ultra-256gb', category: 'tablets', price: 1070, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab S10 Ultra flagship tablet.', shortDescription: '256GB, Ultra', inStock: true, stockCount: 2, sku: 'SOHO-TAB-S10ULTRA-256', features: ['256GB storage', 'Ultra display'], specifications: { 'Storage': '256GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab S10 Ultra - Harare | SohoConnect', seoDescription: 'Samsung Tab S10 Ultra $1070. SohoConnect.', seoKeywords: ['Samsung Tab S10 Harare'] },
  { id: 'samsung-tab-s10ultra-512', name: 'Samsung Galaxy Tab S10 Ultra (512GB)', slug: 'samsung-galaxy-tab-s10-ultra-512gb', category: 'tablets', price: 1260, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Tab S10 Ultra with 512GB.', shortDescription: '512GB, Ultra', inStock: true, stockCount: 2, sku: 'SOHO-TAB-S10ULTRA-512', features: ['512GB storage', 'Ultra display'], specifications: { 'Storage': '512GB' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Tab S10 Ultra 512GB - Harare | SohoConnect', seoDescription: 'Samsung Tab S10 Ultra 512GB $1260. SohoConnect.', seoKeywords: ['Samsung Tab S10 Harare'] },

  // SAMSUNG WATCHES
  { id: 'samsung-watch5pro', name: 'Samsung Galaxy Watch 5 Pro 45mm', slug: 'samsung-galaxy-watch-5-pro-45mm', category: 'watches', price: 170, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 5 Pro smartwatch.', shortDescription: '45mm, Pro features', inStock: true, stockCount: 5, sku: 'SOHO-WATCH5PRO-45', features: ['45mm case', 'Pro features'], specifications: { 'Size': '45mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 5 Pro - Harare | SohoConnect', seoDescription: 'Samsung Watch 5 Pro $170. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watch6-43', name: 'Samsung Galaxy Watch 6 Classic 43mm', slug: 'samsung-galaxy-watch-6-classic-43mm', category: 'watches', price: 150, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 6 Classic.', shortDescription: '43mm, Classic', inStock: true, stockCount: 6, sku: 'SOHO-WATCH6-43', features: ['43mm case', 'Classic design'], specifications: { 'Size': '43mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 6 Classic - Harare | SohoConnect', seoDescription: 'Samsung Watch 6 Classic $150. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watch6-47', name: 'Samsung Galaxy Watch 6 Classic 47mm', slug: 'samsung-galaxy-watch-6-classic-47mm', category: 'watches', price: 160, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 6 Classic 47mm.', shortDescription: '47mm, Classic', inStock: true, stockCount: 6, sku: 'SOHO-WATCH6-47', features: ['47mm case'], specifications: { 'Size': '47mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 6 Classic 47mm - Harare | SohoConnect', seoDescription: 'Samsung Watch 6 Classic 47mm $160. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watch7-40', name: 'Samsung Galaxy Watch 7 40mm', slug: 'samsung-galaxy-watch-7-40mm', category: 'watches', price: 190, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 7 smartwatch.', shortDescription: '40mm, Latest', inStock: true, stockCount: 7, sku: 'SOHO-WATCH7-40', features: ['40mm case'], specifications: { 'Size': '40mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 7 - Harare | SohoConnect', seoDescription: 'Samsung Watch 7 $190. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watch7-44', name: 'Samsung Galaxy Watch 7 44mm', slug: 'samsung-galaxy-watch-7-44mm', category: 'watches', price: 190, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 7 44mm.', shortDescription: '44mm, Latest', inStock: true, stockCount: 7, sku: 'SOHO-WATCH7-44', features: ['44mm case'], specifications: { 'Size': '44mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 7 44mm - Harare | SohoConnect', seoDescription: 'Samsung Watch 7 44mm $190. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watchultra-47', name: 'Samsung Galaxy Watch Ultra 47mm LTE', slug: 'samsung-galaxy-watch-ultra-47mm-lte', category: 'watches', price: 350, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch Ultra with LTE.', shortDescription: '47mm, Ultra, LTE', inStock: true, stockCount: 3, sku: 'SOHO-WATCHULTRA-47', features: ['47mm case', 'LTE connectivity'], specifications: { 'Size': '47mm', 'Connectivity': 'LTE' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch Ultra - Harare | SohoConnect', seoDescription: 'Samsung Watch Ultra LTE $350. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watch8-40', name: 'Samsung Galaxy Watch 8 40mm', slug: 'samsung-galaxy-watch-8-40mm', category: 'watches', price: 270, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 8 latest smartwatch.', shortDescription: '40mm, Latest', inStock: true, stockCount: 5, sku: 'SOHO-WATCH8-40', features: ['40mm case', 'Latest features'], specifications: { 'Size': '40mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 8 - Harare | SohoConnect', seoDescription: 'Samsung Watch 8 $270. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watch8-44', name: 'Samsung Galaxy Watch 8 44mm', slug: 'samsung-galaxy-watch-8-44mm', category: 'watches', price: 300, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 8 44mm.', shortDescription: '44mm, Latest', inStock: true, stockCount: 5, sku: 'SOHO-WATCH8-44', features: ['44mm case'], specifications: { 'Size': '44mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 8 44mm - Harare | SohoConnect', seoDescription: 'Samsung Watch 8 44mm $300. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watch8-46-classic', name: 'Samsung Galaxy Watch 8 Classic 46mm', slug: 'samsung-galaxy-watch-8-classic-46mm', category: 'watches', price: 370, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch 8 Classic.', shortDescription: '46mm, Classic', inStock: true, stockCount: 4, sku: 'SOHO-WATCH8-46-CLASSIC', features: ['46mm case', 'Classic design'], specifications: { 'Size': '46mm' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch 8 Classic - Harare | SohoConnect', seoDescription: 'Samsung Watch 8 Classic $370. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },
  { id: 'samsung-watchultra2-47', name: 'Samsung Galaxy Watch Ultra 2 47mm LTE', slug: 'samsung-galaxy-watch-ultra-2-47mm-lte', category: 'watches', price: 490, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Galaxy Watch Ultra 2 with LTE.', shortDescription: '47mm, Ultra 2, LTE', inStock: true, stockCount: 2, sku: 'SOHO-WATCHULTRA2-47', features: ['47mm case', 'LTE', 'Ultra features'], specifications: { 'Size': '47mm', 'Connectivity': 'LTE' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Watch Ultra 2 - Harare | SohoConnect', seoDescription: 'Samsung Watch Ultra 2 LTE $490. SohoConnect.', seoKeywords: ['Samsung Watch Harare'] },

  // SAMSUNG BUDS
  { id: 'samsung-buds-core', name: 'Samsung Buds Core', slug: 'samsung-buds-core', category: 'accessories', price: 40, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Buds Core wireless earbuds.', shortDescription: 'Wireless earbuds', inStock: true, stockCount: 15, sku: 'SOHO-BUDS-CORE', features: ['Wireless', 'Good sound'], specifications: { 'Type': 'Wireless earbuds' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Buds Core - Harare | SohoConnect', seoDescription: 'Samsung Buds Core $40. SohoConnect.', seoKeywords: ['Samsung Buds Harare'] },
  { id: 'samsung-buds2-pro', name: 'Samsung Buds 2 Pro', slug: 'samsung-buds-2-pro', category: 'accessories', price: 110, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Buds 2 Pro with ANC.', shortDescription: 'Pro earbuds, ANC', inStock: true, stockCount: 10, sku: 'SOHO-BUDS2-PRO', features: ['ANC', 'Premium sound'], specifications: { 'Type': 'Pro earbuds' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Buds 2 Pro - Harare | SohoConnect', seoDescription: 'Samsung Buds 2 Pro $110. SohoConnect.', seoKeywords: ['Samsung Buds Harare'] },
  { id: 'samsung-buds3', name: 'Samsung Buds 3', slug: 'samsung-buds-3', category: 'accessories', price: 120, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Buds 3 latest earbuds.', shortDescription: 'Latest earbuds', inStock: true, stockCount: 12, sku: 'SOHO-BUDS3', features: ['Latest tech'], specifications: { 'Type': 'Earbuds' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Buds 3 - Harare | SohoConnect', seoDescription: 'Samsung Buds 3 $120. SohoConnect.', seoKeywords: ['Samsung Buds Harare'] },
  { id: 'samsung-buds3-pro', name: 'Samsung Buds 3 Pro', slug: 'samsung-buds-3-pro', category: 'accessories', price: 140, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Samsung Buds 3 Pro premium earbuds.', shortDescription: 'Pro earbuds', inStock: true, stockCount: 10, sku: 'SOHO-BUDS3-PRO', features: ['Pro features', 'ANC'], specifications: { 'Type': 'Pro earbuds' }, warranty: '12 months Samsung warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Samsung Buds 3 Pro - Harare | SohoConnect', seoDescription: 'Samsung Buds 3 Pro $140. SohoConnect.', seoKeywords: ['Samsung Buds Harare'] },

  // NOKIA PHONES
  { id: 'nokia-105', name: 'Nokia 105', slug: 'nokia-105', category: 'smartphones', price: 10, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 105 basic phone.', shortDescription: 'Basic phone', inStock: true, stockCount: 20, sku: 'SOHO-NOKIA-105', features: ['Long battery', 'Durable'], specifications: { 'Type': 'Basic phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 105 - Harare | SohoConnect', seoDescription: 'Nokia 105 $10. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-106', name: 'Nokia 106', slug: 'nokia-106', category: 'smartphones', price: 13, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 106 basic phone.', shortDescription: 'Basic phone', inStock: true, stockCount: 20, sku: 'SOHO-NOKIA-106', features: ['Long battery'], specifications: { 'Type': 'Basic phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 106 - Harare | SohoConnect', seoDescription: 'Nokia 106 $13. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-110', name: 'Nokia 110', slug: 'nokia-110', category: 'smartphones', price: 17, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 110 basic phone.', shortDescription: 'Basic phone', inStock: true, stockCount: 18, sku: 'SOHO-NOKIA-110', features: ['Long battery'], specifications: { 'Type': 'Basic phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 110 - Harare | SohoConnect', seoDescription: 'Nokia 110 $17. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-6300', name: 'Nokia 6300', slug: 'nokia-6300', category: 'smartphones', price: 20, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 6300 classic phone.', shortDescription: 'Classic phone', inStock: true, stockCount: 15, sku: 'SOHO-NOKIA-6300', features: ['Classic design'], specifications: { 'Type': 'Feature phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 6300 - Harare | SohoConnect', seoDescription: 'Nokia 6300 $20. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-3310', name: 'Nokia 3310', slug: 'nokia-3310', category: 'smartphones', price: 20, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 3310 iconic phone.', shortDescription: 'Iconic phone', inStock: true, stockCount: 15, sku: 'SOHO-NOKIA-3310', features: ['Iconic design', 'Durable'], specifications: { 'Type': 'Feature phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 3310 - Harare | SohoConnect', seoDescription: 'Nokia 3310 $20. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-130', name: 'Nokia 130', slug: 'nokia-130', category: 'smartphones', price: 24, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 130 feature phone.', shortDescription: 'Feature phone', inStock: true, stockCount: 12, sku: 'SOHO-NOKIA-130', features: ['Long battery'], specifications: { 'Type': 'Feature phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 130 - Harare | SohoConnect', seoDescription: 'Nokia 130 $24. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-150', name: 'Nokia 150', slug: 'nokia-150', category: 'smartphones', price: 25, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 150 feature phone.', shortDescription: 'Feature phone', inStock: true, stockCount: 12, sku: 'SOHO-NOKIA-150', features: ['Long battery'], specifications: { 'Type': 'Feature phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 150 - Harare | SohoConnect', seoDescription: 'Nokia 150 $25. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-6310', name: 'Nokia 6310', slug: 'nokia-6310', category: 'smartphones', price: 45, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 6310 feature phone.', shortDescription: 'Feature phone', inStock: true, stockCount: 10, sku: 'SOHO-NOKIA-6310', features: ['Classic design'], specifications: { 'Type': 'Feature phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 6310 - Harare | SohoConnect', seoDescription: 'Nokia 6310 $45. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'nokia-3210', name: 'Nokia 3210', slug: 'nokia-3210', category: 'smartphones', price: 47, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Nokia 3210 classic reborn.', shortDescription: 'Classic phone', inStock: true, stockCount: 10, sku: 'SOHO-NOKIA-3210', features: ['Classic reborn'], specifications: { 'Type': 'Feature phone' }, warranty: '12 months Nokia warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Nokia 3210 - Harare | SohoConnect', seoDescription: 'Nokia 3210 $47. SohoConnect.', seoKeywords: ['Nokia Harare'] },
  { id: 'hmd-aura-64', name: 'HMD Aura (64GB/4GB)', slug: 'hmd-aura-64gb-4gb', category: 'smartphones', price: 85, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'HMD Aura smartphone with 64GB.', shortDescription: '64GB, 4GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-HMD-AURA-64', features: ['64GB storage', '4GB RAM'], specifications: { 'Storage': '64GB', 'RAM': '4GB' }, warranty: '12 months warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'HMD Aura - Harare | SohoConnect', seoDescription: 'HMD Aura $85. SohoConnect.', seoKeywords: ['HMD Harare'] },

  // OTHER BRANDS
  { id: 'huawei-gt4-watch-41', name: 'Huawei GT4 Watch 41mm', slug: 'huawei-gt4-watch-41mm', category: 'watches', price: 130, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Huawei GT4 smartwatch.', shortDescription: '41mm, GT4', inStock: true, stockCount: 5, sku: 'SOHO-HUAWEI-GT4-41', features: ['41mm case', 'Fitness tracking'], specifications: { 'Size': '41mm' }, warranty: '12 months Huawei warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Huawei GT4 Watch - Harare | SohoConnect', seoDescription: 'Huawei GT4 Watch $130. SohoConnect.', seoKeywords: ['Huawei Watch Harare'] },
  { id: 'oneplus-13r-256-12', name: 'OnePlus 13R (256GB/12GB)', slug: 'oneplus-13r-256gb-12gb', category: 'smartphones', price: 475, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'OnePlus 13R flagship killer.', shortDescription: '256GB, 12GB RAM', inStock: true, stockCount: 4, sku: 'SOHO-ONEPLUS-13R-256', features: ['256GB storage', '12GB RAM', 'Fast charging'], specifications: { 'Storage': '256GB', 'RAM': '12GB' }, warranty: '12 months OnePlus warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'OnePlus 13R - Harare | SohoConnect', seoDescription: 'OnePlus 13R $475. SohoConnect.', seoKeywords: ['OnePlus Harare'] },
  { id: 'pixel-7-pro-512', name: 'Google Pixel 7 Pro (512GB)', slug: 'google-pixel-7-pro-512gb', category: 'smartphones', price: 495, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 7 Pro with pure Android.', shortDescription: '512GB, Pixel camera', inStock: true, stockCount: 3, sku: 'SOHO-PIXEL-7PRO-512', features: ['512GB storage', 'Pixel camera', 'Pure Android'], specifications: { 'Storage': '512GB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 7 Pro - Harare | SohoConnect', seoDescription: 'Google Pixel 7 Pro $495. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-8-pro-256', name: 'Google Pixel 8 Pro (256GB)', slug: 'google-pixel-8-pro-256gb', category: 'smartphones', price: 625, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 8 Pro with Tensor G3.', shortDescription: '256GB, Tensor G3', inStock: true, stockCount: 4, sku: 'SOHO-PIXEL-8PRO-256', features: ['256GB storage', 'Tensor G3'], specifications: { 'Storage': '256GB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 8 Pro - Harare | SohoConnect', seoDescription: 'Google Pixel 8 Pro $625. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-8a-128', name: 'Google Pixel 8a (128GB)', slug: 'google-pixel-8a-128gb', category: 'smartphones', price: 410, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 8a affordable flagship.', shortDescription: '128GB, Affordable', inStock: true, stockCount: 5, sku: 'SOHO-PIXEL-8A-128', features: ['128GB storage'], specifications: { 'Storage': '128GB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 8a - Harare | SohoConnect', seoDescription: 'Google Pixel 8a $410. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-9a-128', name: 'Google Pixel 9a (128GB)', slug: 'google-pixel-9a-128gb', category: 'smartphones', price: 500, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 9a latest affordable flagship.', shortDescription: '128GB, Latest', inStock: true, stockCount: 5, sku: 'SOHO-PIXEL-9A-128', features: ['128GB storage'], specifications: { 'Storage': '128GB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 9a - Harare | SohoConnect', seoDescription: 'Google Pixel 9a $500. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-9-pro-256', name: 'Google Pixel 9 Pro (256GB)', slug: 'google-pixel-9-pro-256gb', category: 'smartphones', price: 930, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 9 Pro flagship.', shortDescription: '256GB, Pro', inStock: true, stockCount: 3, sku: 'SOHO-PIXEL-9PRO-256', features: ['256GB storage'], specifications: { 'Storage': '256GB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 9 Pro - Harare | SohoConnect', seoDescription: 'Google Pixel 9 Pro $930. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-9-pro-xl-128', name: 'Google Pixel 9 Pro XL (128GB)', slug: 'google-pixel-9-pro-xl-128gb', category: 'smartphones', price: 885, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 9 Pro XL large flagship.', shortDescription: '128GB, XL', inStock: true, stockCount: 3, sku: 'SOHO-PIXEL-9PROXL-128', features: ['128GB storage', 'Large display'], specifications: { 'Storage': '128GB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 9 Pro XL - Harare | SohoConnect', seoDescription: 'Google Pixel 9 Pro XL $885. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-9-pro-xl-1tb', name: 'Google Pixel 9 Pro XL (1TB)', slug: 'google-pixel-9-pro-xl-1tb', category: 'smartphones', price: 1200, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 9 Pro XL with 1TB.', shortDescription: '1TB, XL', inStock: true, stockCount: 1, sku: 'SOHO-PIXEL-9PROXL-1TB', features: ['1TB storage'], specifications: { 'Storage': '1TB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 9 Pro XL 1TB - Harare | SohoConnect', seoDescription: 'Google Pixel 9 Pro XL 1TB $1200. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-10-pro-xl-256', name: 'Google Pixel 10 Pro XL (256GB)', slug: 'google-pixel-10-pro-xl-256gb', category: 'smartphones', price: 1070, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Google Pixel 10 Pro XL latest flagship.', shortDescription: '256GB, Latest', inStock: true, stockCount: 2, sku: 'SOHO-PIXEL-10PROXL-256', features: ['256GB storage', 'Latest Tensor'], specifications: { 'Storage': '256GB' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel 10 Pro XL - Harare | SohoConnect', seoDescription: 'Google Pixel 10 Pro XL $1070. SohoConnect.', seoKeywords: ['Google Pixel Harare'] },
  { id: 'pixel-watch3-41', name: 'Google Pixel Watch 3 41mm', slug: 'google-pixel-watch-3-41mm', category: 'watches', price: 310, currency: 'USD', image: '/images/electronics/laptop-workspace.jpg', images: ['/images/electronics/laptop-workspace.jpg'], description: 'Google Pixel Watch 3 smartwatch.', shortDescription: '41mm, Wear OS', inStock: true, stockCount: 4, sku: 'SOHO-PIXEL-WATCH3-41', features: ['41mm case', 'Wear OS'], specifications: { 'Size': '41mm' }, warranty: '12 months Google warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Google Pixel Watch 3 - Harare | SohoConnect', seoDescription: 'Google Pixel Watch 3 $310. SohoConnect.', seoKeywords: ['Google Pixel Watch Harare'] },

  // REDMI PHONES
  { id: 'redmi-a3-128-4', name: 'Redmi A3 (128GB/4GB)', slug: 'redmi-a3-128gb-4gb', category: 'smartphones', price: 70, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi A3 budget smartphone.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 15, featured: true, sku: 'SOHO-REDMI-A3-128', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi A3 - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Redmi A3 $70. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Redmi Harare', 'Xiaomi Zimbabwe'] },
  { id: 'redmi-a3x-128-4', name: 'Redmi A3x (128GB/4GB)', slug: 'redmi-a3x-128gb-4gb', category: 'smartphones', price: 70, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi A3x budget smartphone.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 15, sku: 'SOHO-REDMI-A3X-128', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi A3x - Harare | SohoConnect', seoDescription: 'Redmi A3x $70. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-a4-128-4', name: 'Redmi A4 (128GB/4GB)', slug: 'redmi-a4-128gb-4gb', category: 'smartphones', price: 100, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi A4 budget smartphone.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 12, sku: 'SOHO-REDMI-A4-128', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi A4 - Harare | SohoConnect', seoDescription: 'Redmi A4 $100. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-a5-64-3', name: 'Redmi A5 (64GB/3GB)', slug: 'redmi-a5-64gb-3gb', category: 'smartphones', price: 63, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi A5 entry-level smartphone.', shortDescription: '64GB, 3GB RAM', inStock: true, stockCount: 15, featured: true, sku: 'SOHO-REDMI-A5-64', features: ['64GB storage', '3GB RAM'], specifications: { 'Storage': '64GB', 'RAM': '3GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi A5 - BLACK FRIDAY - Harare | SohoConnect', seoDescription: 'Redmi A5 $63. BLACK FRIDAY. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-13x-256-8', name: 'Redmi 13X (256GB/8GB)', slug: 'redmi-13x-256gb-8gb', category: 'smartphones', price: 120, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi 13X with good specs.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-REDMI-13X-256', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi 13X - Harare | SohoConnect', seoDescription: 'Redmi 13X $120. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-14c-128-4', name: 'Redmi 14C (128GB/4GB)', slug: 'redmi-14c-128gb-4gb', category: 'smartphones', price: 87, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi 14C budget smartphone.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 12, sku: 'SOHO-REDMI-14C-128', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi 14C - Harare | SohoConnect', seoDescription: 'Redmi 14C $87. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-14c-256-8', name: 'Redmi 14C (256GB/8GB)', slug: 'redmi-14c-256gb-8gb', category: 'smartphones', price: 110, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi 14C with more storage.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 12, sku: 'SOHO-REDMI-14C-256', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi 14C 256GB - Harare | SohoConnect', seoDescription: 'Redmi 14C 256GB $110. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-15c-128-4', name: 'Redmi 15C (128GB/4GB)', slug: 'redmi-15c-128gb-4gb', category: 'smartphones', price: 100, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi 15C latest budget phone.', shortDescription: '128GB, 4GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-REDMI-15C-128-4', features: ['128GB storage', '4GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '4GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi 15C - Harare | SohoConnect', seoDescription: 'Redmi 15C $100. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-15c-128-6', name: 'Redmi 15C (128GB/6GB)', slug: 'redmi-15c-128gb-6gb', category: 'smartphones', price: 100, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi 15C with 6GB RAM.', shortDescription: '128GB, 6GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-REDMI-15C-128-6', features: ['128GB storage', '6GB RAM'], specifications: { 'Storage': '128GB', 'RAM': '6GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi 15C 6GB - Harare | SohoConnect', seoDescription: 'Redmi 15C 6GB $100. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-15c-256-8', name: 'Redmi 15C (256GB/8GB)', slug: 'redmi-15c-256gb-8gb', category: 'smartphones', price: 115, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi 15C with premium specs.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-REDMI-15C-256', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi 15C 256GB - Harare | SohoConnect', seoDescription: 'Redmi 15C 256GB $115. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-15-256-8', name: 'Redmi 15 (256GB/8GB)', slug: 'redmi-15-256gb-8gb', category: 'smartphones', price: 180, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi 15 mid-range smartphone.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-REDMI-15-256', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi 15 - Harare | SohoConnect', seoDescription: 'Redmi 15 $180. SohoConnect.', seoKeywords: ['Redmi Harare'] },
  { id: 'redmi-note13-pro-plus-512-12', name: 'Redmi Note 13 Pro+ (512GB/12GB)', slug: 'redmi-note-13-pro-plus-512gb-12gb', category: 'smartphones', price: 320, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi Note 13 Pro+ flagship killer.', shortDescription: '512GB, 12GB RAM', inStock: true, stockCount: 5, sku: 'SOHO-REDMI-N13PROPLUS-512', features: ['512GB storage', '12GB RAM'], specifications: { 'Storage': '512GB', 'RAM': '12GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi Note 13 Pro+ - Harare | SohoConnect', seoDescription: 'Redmi Note 13 Pro+ $320. SohoConnect.', seoKeywords: ['Redmi Note Harare'] },
  { id: 'redmi-note14-256-8', name: 'Redmi Note 14 (256GB/8GB)', slug: 'redmi-note-14-256gb-8gb', category: 'smartphones', price: 165, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi Note 14 mid-range phone.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 10, sku: 'SOHO-REDMI-N14-256', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi Note 14 - Harare | SohoConnect', seoDescription: 'Redmi Note 14 $165. SohoConnect.', seoKeywords: ['Redmi Note Harare'] },
  { id: 'redmi-note14-pro-256-8', name: 'Redmi Note 14 Pro (256GB/8GB)', slug: 'redmi-note-14-pro-256gb-8gb', category: 'smartphones', price: 230, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi Note 14 Pro with premium features.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 8, sku: 'SOHO-REDMI-N14PRO-256', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi Note 14 Pro - Harare | SohoConnect', seoDescription: 'Redmi Note 14 Pro $230. SohoConnect.', seoKeywords: ['Redmi Note Harare'] },
  { id: 'redmi-note14-pro-512-12', name: 'Redmi Note 14 Pro (512GB/12GB)', slug: 'redmi-note-14-pro-512gb-12gb', category: 'smartphones', price: 255, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi Note 14 Pro with maximum specs.', shortDescription: '512GB, 12GB RAM', inStock: true, stockCount: 6, sku: 'SOHO-REDMI-N14PRO-512', features: ['512GB storage', '12GB RAM'], specifications: { 'Storage': '512GB', 'RAM': '12GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi Note 14 Pro 512GB - Harare | SohoConnect', seoDescription: 'Redmi Note 14 Pro 512GB $255. SohoConnect.', seoKeywords: ['Redmi Note Harare'] },
  { id: 'redmi-note14-pro-plus-256-8', name: 'Redmi Note 14 Pro+ (256GB/8GB)', slug: 'redmi-note-14-pro-plus-256gb-8gb', category: 'smartphones', price: 280, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi Note 14 Pro+ flagship specs.', shortDescription: '256GB, 8GB RAM', inStock: true, stockCount: 6, sku: 'SOHO-REDMI-N14PROPLUS-256', features: ['256GB storage', '8GB RAM'], specifications: { 'Storage': '256GB', 'RAM': '8GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi Note 14 Pro+ - Harare | SohoConnect', seoDescription: 'Redmi Note 14 Pro+ $280. SohoConnect.', seoKeywords: ['Redmi Note Harare'] },
  { id: 'redmi-note14-pro-plus-512', name: 'Redmi Note 14 Pro+ (512GB)', slug: 'redmi-note-14-pro-plus-512gb', category: 'smartphones', price: 350, currency: 'USD', image: '/images/electronics/iphone-business.jpg', images: ['/images/electronics/iphone-business.jpg'], description: 'Redmi Note 14 Pro+ with 512GB storage.', shortDescription: '512GB', inStock: true, stockCount: 4, sku: 'SOHO-REDMI-N14PROPLUS-512', features: ['512GB storage'], specifications: { 'Storage': '512GB' }, warranty: '12 months Xiaomi warranty', delivery: 'Same-day delivery in Harare CBD', seoTitle: 'Redmi Note 14 Pro+ 512GB - Harare | SohoConnect', seoDescription: 'Redmi Note 14 Pro+ 512GB $350. SohoConnect.', seoKeywords: ['Redmi Note Harare'] },

  // BUSINESS CONSUMABLES
  {
    id: 'hp-laserjet-m404dn',
    name: 'HP LaserJet Pro M404dn',
    slug: 'hp-laserjet-pro-m404dn',
    category: 'consumables',
    price: 320,
    currency: 'USD',
    image: '/images/business/printing-press.jpg',
    images: ['/images/business/printing-press.jpg'],
    description: 'Professional laser printer with duplex printing, fast output, and low running costs. Ideal for Zimbabwean businesses requiring reliable printing.',
    shortDescription: 'Laser. Duplex. 40ppm.',
    inStock: true,
    stockCount: 6,
    sku: 'SOHO-HP-M404DN',

    features: [
      '40 pages per minute',
      'Automatic duplex printing',
      '350-sheet input tray',
      'Network ready (Ethernet)',
      'Mobile printing support',
      'Energy efficient',
      '1200 dpi resolution',
      '1-year warranty'
    ],

    specifications: {
      'Type': 'Monochrome laser',
      'Print Speed': 'Up to 40ppm',
      'Resolution': '1200 x 1200 dpi',
      'Paper Handling': '350-sheet tray',
      'Duplex': 'Automatic',
      'Connectivity': 'Ethernet, USB',
      'Monthly Duty': 'Up to 80,000 pages',
      'Toner Yield': 'Up to 10,000 pages'
    },

    warranty: '12 months HP warranty',
    delivery: 'Same-day delivery in Harare CBD',

    seoTitle: 'HP LaserJet Pro M404dn Printer - Buy in Harare | SohoConnect',
    seoDescription: 'HP laser printer with duplex printing. Fast, reliable, low cost. Perfect for Harare businesses. Shop SohoConnect Electronics.',
    seoKeywords: ['HP printer Harare', 'laser printer Zimbabwe', 'business printer Harare']
  }
];

type InventoryItem = {
  category: string;
  brand: string;
  product: string;
  variant: string;
  priceUsd?: number;
  promo?: boolean;
  notes?: string;
  attributes?: {
    storageGB?: number | null;
    ramGB?: number | null;
    sizeMM?: number | null;
    lte?: boolean | null;
    tb?: boolean | null;
  };
  key?: string;
};

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Category-specific image mapping
const CATEGORY_IMAGES: Record<string, string[]> = {
  smartphones: [
    '/images/electronics/iphone-business.jpg',
    '/images/electronics/smartphone-hero.jpg',
    '/images/electronics/mobile-phone.jpg'
  ],
  tablets: [
    '/images/electronics/tablet-hero.jpg',
    '/images/electronics/ipad-business.jpg'
  ],
  watches: [
    '/images/electronics/smartwatch-hero.jpg',
    '/images/electronics/watch-fitness.jpg'
  ],
  accessories: [
    '/images/electronics/accessories-hero.jpg',
    '/images/electronics/tech-accessories.jpg'
  ],
  laptops: [
    '/images/electronics/laptop-hero.jpg',
    '/images/electronics/macbook-business.jpg'
  ],
  cctv: [
    '/images/electronics/cctv-camera.jpg',
    '/images/electronics/security-system.jpg'
  ],
  consumables: [
    '/images/electronics/office-supplies.jpg',
    '/images/electronics/tech-consumables.jpg'
  ]
};

// Brand-specific product descriptions
const BRAND_DESCRIPTIONS: Record<string, string> = {
  'Samsung': 'Samsung electronics combining innovation with reliability. Trusted brand for quality devices.',
  'Nokia': 'Classic Nokia durability meets modern features. Built to last with legendary battery life.',
  'Google': 'Pure Android experience with cutting-edge AI. Photography excellence with Pixel camera technology.',
  'OnePlus': 'Flagship performance at competitive prices. Fast charging and smooth display technology.',
  'Huawei': 'Premium Leica camera systems and elegant design. Advanced photography capabilities.',
  'Redmi': 'Exceptional value with flagship features. Xiaomi quality at affordable prices.',
  'Xiaomi': 'Innovation and affordability combined. Feature-rich smartphones for everyone.',
  'Apple': 'Premium iOS ecosystem with seamless integration. Industry-leading performance and security.',
  'Infinix': 'Feature-packed smartphones for budget-conscious buyers. Great value for money.',
  'Tecno': 'Affordable smartphones with impressive features. Popular in African markets.',
  'itel': 'Entry-level smartphones with essential features. Perfect for first-time smartphone users.',
  'Realme': 'Youth-focused brand with trendy designs. Competitive specs at great prices.',
  'Oppo': 'Camera-centric smartphones with fast charging. Sleek designs and vibrant displays.',
  'Vivo': 'Photography-focused with innovative features. Excellent selfie cameras.',
};

// Category-specific feature highlights
const CATEGORY_FEATURES: Record<string, string[]> = {
  smartphones: [
    'Same-day delivery in Harare CBD',
    '12 months warranty',
    'Original accessories included',
    'Free screen protector'
  ],
  tablets: [
    'Same-day delivery in Harare CBD',
    '12 months warranty',
    'Perfect for productivity and entertainment',
    'Long battery life'
  ],
  watches: [
    'Same-day delivery in Harare CBD',
    '12 months warranty',
    'Fitness tracking & health monitoring',
    'Water resistant design'
  ],
  accessories: [
    'Same-day delivery in Harare CBD',
    '6 months warranty',
    'Compatible with major brands',
    'Genuine products guaranteed'
  ]
};

function mapInventoryToProduct(item: InventoryItem): Product {
  const name = [item.brand, item.product, item.variant].filter(Boolean).join(' ').trim();
  const slug = toSlug(name);
  const sku = [item.brand, item.product, item.variant].filter(Boolean).join('-').toUpperCase();
  const price = typeof item.priceUsd === 'number' ? item.priceUsd : 0;
  const category = (item.category || 'accessories') as Product['category'];

  // Get category-specific images
  const categoryImages = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.accessories;
  const image = categoryImages[0];
  const images = categoryImages;

  const attributes = item.attributes || {};

  // Build specs array
  const specs: string[] = [];
  if (attributes.storageGB) specs.push(`${attributes.storageGB}GB storage`);
  if (attributes.ramGB) specs.push(`${attributes.ramGB}GB RAM`);
  if (attributes.sizeMM) specs.push(`${attributes.sizeMM}mm display`);
  if (attributes.lte) specs.push('4G LTE');
  if (attributes.tb) specs.push('Thunderbolt');

  const specsText = specs.join(', ');
  const shortSpecs = specs.slice(0, 2).join(' • ');

  // Build rich description
  const brandDesc = BRAND_DESCRIPTIONS[item.brand] || `${item.brand} quality electronics.`;
  const features = CATEGORY_FEATURES[category] || CATEGORY_FEATURES.accessories;

  let description = `${name} - ${brandDesc}`;
  if (specsText) description += ` Features: ${specsText}.`;
  if (item.promo) description += ' ⚡ BLACK FRIDAY SPECIAL PRICE!';
  description += ` ${features.join('. ')}.`;

  // Build short description
  let shortDescription = shortSpecs || name;
  if (item.promo) shortDescription += ' • BLACK FRIDAY';

  // SEO optimization
  const seoTitle = `${name} - Buy in Harare | SohoConnect Zimbabwe`;
  const seoDescription = `${name} ${specsText ? `with ${specsText}` : ''} available in Harare. ${item.promo ? 'BLACK FRIDAY deal! ' : ''}Same-day delivery. Shop at SohoConnect.`;
  const seoKeywords = [
    `${item.brand} ${item.product} Harare`,
    `${item.brand} ${item.product} Zimbabwe`,
    `buy ${name} Harare`,
    category === 'smartphones' ? 'smartphones Harare' : '',
    item.promo ? 'Black Friday Zimbabwe' : '',
    `${item.brand} dealer Zimbabwe`
  ].filter(Boolean);

  return {
    id: slug,
    name,
    slug,
    category,
    price,
    currency: 'USD',
    image,
    images,
    description,
    shortDescription,
    inStock: true,
    stockCount: 50,
    featured: !!item.promo,
    sku,
    features: specs.length > 0 ? specs : undefined,
    specifications: attributes.storageGB || attributes.ramGB ? {
      ...(attributes.storageGB && { 'Storage': `${attributes.storageGB}GB` }),
      ...(attributes.ramGB && { 'RAM': `${attributes.ramGB}GB` }),
      ...(attributes.sizeMM && { 'Display': `${attributes.sizeMM}mm` }),
      ...(attributes.lte && { 'Connectivity': '4G LTE' }),
      ...(attributes.tb && { 'Ports': 'Thunderbolt' }),
    } : undefined,
    warranty: '12 months manufacturer warranty',
    delivery: 'Same-day delivery in Harare CBD',
    seoTitle,
    seoDescription,
    seoKeywords,
  };
}

export async function fetchInventoryProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/data/inventory.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load inventory');
    const data = await res.json();
    if (Array.isArray(data)) {
      try {
        localStorage.setItem('inventory-cache', JSON.stringify({ ts: Date.now(), data }));
      } catch {}
      return data.map(mapInventoryToProduct);
    }
    return [];
  } catch (e) {
    try {
      const cached = localStorage.getItem('inventory-cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.data)) return parsed.data.map(mapInventoryToProduct);
      }
    } catch {}
    throw e instanceof Error ? e : new Error('Failed to load inventory');
  }
}

export function useInventoryProducts() {
  return useQuery({
    queryKey: ['inventory-products'],
    queryFn: fetchInventoryProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured === true);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.shortDescription?.toLowerCase().includes(lowerQuery)
  );
}
