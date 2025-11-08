/**
 * Product Catalog - SohoConnect Electronics Division
 * Phase 3: Complete product data with SEO optimization
 */

import type { Product } from '@/types/shop';

export const PRODUCTS: Product[] = [
  // SMARTPHONES
  {
    id: 'iphone-15-pro-128',
    name: 'iPhone 15 Pro 128GB',
    slug: 'iphone-15-pro-128gb',
    category: 'smartphones',
    price: 1299,
    currency: 'USD',
    image: '/images/products/iphone-15-pro.jpg',
    images: [
      '/images/products/iphone-15-pro.jpg',
      '/images/products/iphone-15-pro-2.jpg',
      '/images/products/iphone-15-pro-3.jpg'
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
    image: '/images/products/samsung-s24.jpg',
    images: ['/images/products/samsung-s24.jpg', '/images/products/samsung-s24-2.jpg'],
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

  // CCTV SYSTEMS
  {
    id: 'hikvision-4ch-kit',
    name: 'Hikvision 4-Channel CCTV Kit',
    slug: 'hikvision-4-channel-cctv-kit',
    category: 'cctv',
    price: 450,
    currency: 'USD',
    image: '/images/products/hikvision-kit.jpg',
    images: ['/images/products/hikvision-kit.jpg'],
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
    image: '/images/products/dahua-system.jpg',
    images: ['/images/products/dahua-system.jpg'],
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
    image: '/images/products/anker-powerbank.jpg',
    images: ['/images/products/anker-powerbank.jpg'],
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

  // BUSINESS CONSUMABLES
  {
    id: 'hp-laserjet-m404dn',
    name: 'HP LaserJet Pro M404dn',
    slug: 'hp-laserjet-pro-m404dn',
    category: 'consumables',
    price: 320,
    currency: 'USD',
    image: '/images/products/hp-printer.jpg',
    images: ['/images/products/hp-printer.jpg'],
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
