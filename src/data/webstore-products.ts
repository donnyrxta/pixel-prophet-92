/**
 * Comprehensive Webstore Product Catalog
 * Includes all business categories with SEO-optimized mock data
 * Categories: Design, Print, Corporate Wear, CCTV, Marketing, Office Supplies, ICT, Workwear, Fleet Branding
 */

export interface ProductReview {
  name: string;
  rating: number;
  comment: string;
}

export interface WebstoreProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  description: string;
  price: number;
  currency: 'USD' | 'ZWL';
  image: string;
  images: string[];
  stock: number;
  featured?: boolean;
  trending?: boolean;
  isBundle?: boolean;
  bundleItems?: string[];
  reviews?: ProductReview[];
  tags: string[];
  seoKeywords: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  heroImages: {
    image: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
}

export const webstoreCategories: ProductCategory[] = [
  {
    id: 'design',
    name: 'Design Services',
    slug: 'design',
    tagline: 'Elevate Your Brand',
    description: 'Professional logo design, brand kits and marketing materials tailored to your business.',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'BRAND',
        subtitle: 'IDENTITY',
        description: 'Create a memorable brand that stands out from the competition.'
      },
      {
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'VISUAL',
        subtitle: 'SYSTEMS',
        description: 'Consistent design language across all touchpoints.'
      }
    ]
  },
  {
    id: 'print',
    name: 'Print Products',
    slug: 'print',
    tagline: 'Print Excellence',
    description: 'High-quality printing solutions for flyers, brochures, banners and more.',
    image: 'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'PREMIUM',
        subtitle: 'PRINTING',
        description: 'Professional print solutions with fast turnaround times.'
      }
    ]
  },
  {
    id: 'corporate-wear',
    name: 'Corporate Wear',
    slug: 'corporate-wear',
    tagline: 'Dress Your Brand',
    description: 'Quality apparel and uniforms branded with your logo.',
    image: 'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'CORPORATE',
        subtitle: 'BRANDING',
        description: 'Outfit your team with professional branded apparel.'
      }
    ]
  },
  {
    id: 'cctv',
    name: 'CCTV & Security',
    slug: 'cctv',
    tagline: 'Secure Your Premises',
    description: 'Reliable surveillance systems, access control and visitor management solutions.',
    image: 'https://images.pexels.com/photos/7784241/pexels-photo-7784241.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/7784241/pexels-photo-7784241.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'SECURITY',
        subtitle: 'SOLUTIONS',
        description: 'Professional surveillance for peace of mind.'
      },
      {
        image: 'https://images.pexels.com/photos/6461307/pexels-photo-6461307.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'SOLAR',
        subtitle: 'POWERED',
        description: 'Uninterrupted security with solar CCTV systems.'
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Products',
    slug: 'marketing',
    tagline: 'Engage Your Audience',
    description: 'Innovative marketing tools to connect with your customers.',
    image: 'https://images.pexels.com/photos/3952237/pexels-photo-3952237.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/3952237/pexels-photo-3952237.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'DIGITAL',
        subtitle: 'MARKETING',
        description: 'Strategic campaigns that drive results.'
      }
    ]
  },
  {
    id: 'office-supplies',
    name: 'Office Supplies',
    slug: 'office-supplies',
    tagline: 'Equip Your Workspace',
    description: 'Essential business consumables and stationery for smooth operations.',
    image: 'https://images.pexels.com/photos/4226266/pexels-photo-4226266.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/4226266/pexels-photo-4226266.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'OFFICE',
        subtitle: 'ESSENTIALS',
        description: 'Quality supplies for productive workspaces.'
      }
    ]
  },
  {
    id: 'ict',
    name: 'ICT Products',
    slug: 'ict',
    tagline: 'Technology Solutions',
    description: 'Smartphones, accessories, and tech products for modern businesses.',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'TECH',
        subtitle: 'SOLUTIONS',
        description: 'Modern technology for efficient operations.'
      }
    ]
  },
  {
    id: 'workwear',
    name: 'Workwear & PPE',
    slug: 'workwear',
    tagline: 'Safety First',
    description: 'Branded workwear, safety vests, and personal protective equipment.',
    image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'WORK',
        subtitle: 'SAFETY',
        description: 'Professional workwear that protects and brands.'
      }
    ]
  },
  {
    id: 'fleet-branding',
    name: 'Fleet Branding',
    slug: 'fleet-branding',
    tagline: 'Mobile Advertising',
    description: 'Vehicle wraps, magnets, and decals to turn your fleet into moving billboards.',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'FLEET',
        subtitle: 'BRANDING',
        description: 'Transform vehicles into powerful brand ambassadors.'
      }
    ]
  }
];

export const webstoreProducts: WebstoreProduct[] = [
  // ===== DESIGN SERVICES =====
  {
    id: 'brand-identity-package',
    slug: 'brand-identity-package',
    name: 'Complete Brand Identity Package',
    category: 'Design Services',
    categorySlug: 'design',
    subcategory: 'Brand Identity',
    description: 'Professional logo design, brand guidelines, color palette, typography system, and stationery templates. Everything you need to establish a strong brand presence.',
    price: 599.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 10,
    featured: true,
    trending: true,
    isBundle: true,
    bundleItems: ['Logo design (3 concepts)', 'Brand guidelines PDF', 'Color palette', 'Typography system', 'Business card template', 'Letterhead template'],
    reviews: [
      { name: 'Thomas M.', rating: 5, comment: 'The branding package transformed our business image. Professional and creative team!' },
    ],
    tags: ['branding', 'logo', 'design', 'identity'],
    seoKeywords: ['brand identity Zimbabwe', 'logo design Harare', 'branding package Zimbabwe']
  },
  {
    id: 'logo-design-basic',
    slug: 'logo-design-basic',
    name: 'Logo Design - Basic Package',
    category: 'Design Services',
    categorySlug: 'design',
    subcategory: 'Logo Design',
    description: 'Professional logo design with 2 initial concepts and 2 revision rounds. Perfect for startups and small businesses.',
    price: 149.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 20,
    tags: ['logo', 'design', 'branding'],
    seoKeywords: ['logo design Zimbabwe', 'affordable logo Harare']
  },
  {
    id: 'social-media-pack',
    slug: 'social-media-pack',
    name: 'Monthly Social Media Content Pack',
    category: 'Design Services',
    categorySlug: 'design',
    subcategory: 'Digital Design',
    description: 'Monthly content calendar, 30 post templates, story highlights, and 5 ad creatives. Boost your social presence!',
    price: 199.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 15,
    trending: true,
    tags: ['social media', 'content', 'design', 'marketing'],
    seoKeywords: ['social media content Zimbabwe', 'Facebook ads creatives Harare']
  },
  {
    id: 'website-design',
    slug: 'website-design-package',
    name: 'Website Design Package',
    category: 'Design Services',
    categorySlug: 'design',
    subcategory: 'Web Design',
    description: '5-page responsive website design with modern UI/UX, mobile optimization, and SEO-ready structure.',
    price: 799.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 5,
    featured: true,
    tags: ['website', 'design', 'web development'],
    seoKeywords: ['website design Zimbabwe', 'web design Harare']
  },

  // ===== PRINT PRODUCTS =====
  {
    id: 'business-cards-premium',
    slug: 'premium-business-cards',
    name: 'Premium Business Cards (500pcs)',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Stationery',
    description: '500 premium business cards with spot UV, foiling, or embossing finish. Make lasting impressions.',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 50,
    trending: true,
    reviews: [
      { name: 'Michael T.', rating: 5, comment: 'Premium business cards with spot UV finish look amazing. Great quality!' },
    ],
    tags: ['business cards', 'premium print', 'stationery'],
    seoKeywords: ['foil business cards Zimbabwe', 'embossed business cards Harare', 'premium business cards']
  },
  {
    id: 'flyers-1000',
    slug: 'flyers-1000pcs',
    name: 'Flyers (1000pcs) - A5',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Marketing Print',
    description: '1000 full-color A5 flyers on 150gsm gloss paper. Perfect for promotions and events.',
    price: 45.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3760076/pexels-photo-3760076.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3760076/pexels-photo-3760076.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 100,
    tags: ['flyers', 'printing', 'marketing'],
    seoKeywords: ['flyer printing Zimbabwe', 'cheap flyers Harare']
  },
  {
    id: 'banners-rollup',
    slug: 'rollup-banner-800x2000',
    name: 'Roll-Up Banner (800x2000mm)',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Large Format',
    description: 'Premium roll-up banner with aluminum stand. Portable and professional display for events.',
    price: 65.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 30,
    tags: ['banner', 'roll-up', 'display'],
    seoKeywords: ['rollup banner Harare', 'banner printing Zimbabwe']
  },
  {
    id: 'brochures-tri-fold',
    slug: 'brochures-tri-fold-500',
    name: 'Tri-Fold Brochures (500pcs)',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Marketing Print',
    description: '500 tri-fold brochures on 170gsm gloss paper. Showcase your products and services elegantly.',
    price: 95.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 40,
    tags: ['brochures', 'print', 'marketing'],
    seoKeywords: ['brochure printing Zimbabwe', 'tri-fold brochure Harare']
  },
  {
    id: 'calendars-wall',
    slug: 'wall-calendars-2026',
    name: '2026 Wall Calendars (Customized)',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Calendars',
    description: 'Custom-designed wall calendars with your branding. 13 pages (cover + 12 months), wire-bound.',
    price: 8.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5905876/pexels-photo-5905876.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/5905876/pexels-photo-5905876.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 200,
    tags: ['calendar', 'printing', 'corporate gifts'],
    seoKeywords: ['2026 calendars Zimbabwe', 'custom calendar Harare']
  },
  {
    id: 'photo-calendar',
    slug: 'photo-to-product-calendar',
    name: 'Photo-to-Product Calendar',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Personalized Print',
    description: 'Turn cherished photos into bespoke wall calendars. Our AI cleans your images, we print and deliver.',
    price: 34.95,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5905876/pexels-photo-5905876.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/5905876/pexels-photo-5905876.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 15,
    reviews: [
      { name: 'Chenai G.', rating: 4, comment: 'My personalised calendar turned out beautifully. Delivery was quick.' },
    ],
    tags: ['personalized', 'calendar', 'photo print'],
    seoKeywords: ['photo calendar Zimbabwe', 'custom calendar Harare']
  },
  {
    id: 'ncr-books',
    slug: 'ncr-invoice-books',
    name: 'NCR Invoice Books (Duplicate)',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Business Forms',
    description: 'Custom NCR invoice books with your branding. 50 sheets per book, duplicate copies.',
    price: 12.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 100,
    tags: ['NCR', 'invoice', 'business forms'],
    seoKeywords: ['NCR books Zimbabwe', 'invoice books Harare']
  },
  {
    id: 'restaurant-launch-kit',
    slug: 'restaurant-launch-kit',
    name: 'Restaurant Launch Kit',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Launch Kits',
    description: 'Jump-start your eatery with custom menu design, table talkers, delivery stickers, staff caps and a social media starter pack.',
    price: 349.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/2611812/pexels-photo-2611812.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2611812/pexels-photo-2611812.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2611811/pexels-photo-2611811.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 5,
    featured: true,
    trending: true,
    isBundle: true,
    bundleItems: ['Menu design & print (50 pcs)', 'Table talkers (20 pcs)', 'Delivery stickers (200 pcs)', 'Staff caps (5 pcs)', 'Social media graphics set'],
    reviews: [
      { name: 'Kudzi P.', rating: 5, comment: 'This kit had everything we needed to open our café! Menus were beautiful.' },
    ],
    tags: ['restaurant', 'branding', 'marketing', 'launch kit'],
    seoKeywords: ['restaurant branding Zimbabwe', 'menu printing Harare', 'restaurant launch kit']
  },
  {
    id: 'eco-print-bundle',
    slug: 'eco-friendly-print-bundle',
    name: 'Eco-Friendly Print Bundle',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Sustainable Printing',
    description: 'Promote your brand sustainably with recycled paper flyers, bamboo pens and organic cotton tees printed with soy inks.',
    price: 129.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3760076/pexels-photo-3760076.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3760076/pexels-photo-3760076.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 12,
    isBundle: true,
    bundleItems: ['500 recycled flyers', '50 bamboo pens', '10 organic cotton tees'],
    tags: ['eco-friendly', 'sustainable', 'print'],
    seoKeywords: ['eco-friendly printing Zimbabwe', 'sustainable merch Harare']
  },

  // ===== CORPORATE WEAR =====
  {
    id: 'polo-shirts-branded',
    slug: 'branded-polo-shirts',
    name: 'Branded Polo Shirts',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Apparel',
    description: 'Quality cotton polo shirts with embroidered or printed logo. Available in multiple colors.',
    price: 18.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 200,
    trending: true,
    tags: ['polo', 'corporate wear', 'branded apparel'],
    seoKeywords: ['branded polo shirts Zimbabwe', 'corporate apparel Harare']
  },
  {
    id: 't-shirts-branded',
    slug: 'branded-t-shirts',
    name: 'Branded T-Shirts (Cotton)',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Apparel',
    description: '100% cotton t-shirts with screen printing or vinyl. Perfect for events and team uniforms.',
    price: 8.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/8148576/pexels-photo-8148576.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/8148576/pexels-photo-8148576.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 500,
    tags: ['t-shirt', 'apparel', 'branding'],
    seoKeywords: ['branded t-shirts Zimbabwe', 'custom t-shirts Harare']
  },
  {
    id: 'caps-branded',
    slug: 'branded-caps',
    name: 'Branded Caps & Hats',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Accessories',
    description: 'Custom embroidered caps and hats. Various styles including snapbacks, baseball caps, and bucket hats.',
    price: 6.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 300,
    tags: ['caps', 'hats', 'apparel'],
    seoKeywords: ['branded caps Zimbabwe', 'custom caps Harare']
  },
  {
    id: 'corporate-gift-set',
    slug: 'corporate-gift-set',
    name: 'Executive Corporate Gift Set',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Corporate Gifts',
    description: 'Delight clients and employees with executive pens, notebooks, desk calendars and branded power banks packaged elegantly.',
    price: 74.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3560437/pexels-photo-3560437.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3560437/pexels-photo-3560437.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3560436/pexels-photo-3560436.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 25,
    trending: true,
    featured: true,
    isBundle: true,
    bundleItems: ['Executive pen', 'Leather notebook', 'Branded power bank', 'Desk calendar'],
    reviews: [
      { name: 'Nomsa K.', rating: 4, comment: 'Our partners loved the gifts. Notebook quality is top notch.' },
    ],
    tags: ['corporate gifts', 'executive', 'branded'],
    seoKeywords: ['corporate gifts Zimbabwe', 'executive gift sets Harare']
  },
  {
    id: 'lanyards',
    slug: 'custom-lanyards',
    name: 'Custom Lanyards',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Accessories',
    description: 'Branded lanyards for events, conferences, and office ID cards. Various colors and attachment options.',
    price: 2.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 1000,
    tags: ['lanyards', 'accessories', 'branding'],
    seoKeywords: ['lanyards printing Zimbabwe', 'custom lanyards Harare']
  },
  {
    id: 'domed-stickers',
    slug: 'domed-stickers',
    name: 'Domed Stickers & Key Rings',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Promotional Items',
    description: '3D domed stickers and key rings with resin coating. Durable and eye-catching promotional items.',
    price: 3.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1038038/pexels-photo-1038038.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/1038038/pexels-photo-1038038.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 500,
    trending: true,
    tags: ['domed stickers', 'key rings', 'promotional'],
    seoKeywords: ['domed stickers Zimbabwe', 'key rings Harare', 'resin stickers']
  },
  {
    id: 'branded-diaries',
    slug: 'branded-diaries-2026',
    name: '2026 Branded Diaries',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Corporate Gifts',
    description: 'Elegant A5 diaries with custom cover branding. Perfect corporate gifts for clients and staff.',
    price: 12.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/261857/pexels-photo-261857.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/261857/pexels-photo-261857.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 300,
    tags: ['diaries', 'notebooks', 'corporate gifts'],
    seoKeywords: ['branded diaries Zimbabwe', 'corporate diaries Harare', '2026 diaries']
  },

  // ===== CCTV & SECURITY =====
  {
    id: 'solar-cctv-kit',
    slug: 'solar-cctv-kit',
    name: 'Solar CCTV Kit (4 Cameras)',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Smart Security',
    description: 'Complete solar-powered surveillance kit including 4 IP cameras, NVR, solar panels and UPS for continuous monitoring.',
    price: 899.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6461307/pexels-photo-6461307.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6461307/pexels-photo-6461307.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6461306/pexels-photo-6461306.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 8,
    featured: true,
    trending: true,
    isBundle: true,
    bundleItems: ['4x 2MP IP cameras', '4-channel NVR with 1TB HDD', 'Solar panel 100W', 'UPS battery backup', 'Cables & installation kit'],
    reviews: [
      { name: 'Tafadzwa K.', rating: 5, comment: 'Easy installation and great solar performance. My farm is secure 24/7.' },
      { name: 'Sarah M.', rating: 4, comment: 'Cameras deliver clear footage even at night. Would love even more storage.' },
    ],
    tags: ['solar', 'CCTV', 'surveillance', 'security'],
    seoKeywords: ['solar CCTV Zimbabwe', 'UPS CCTV Harare', 'solar surveillance kit']
  },
  {
    id: 'retail-shrinkage-pack',
    slug: 'retail-shrinkage-pack',
    name: 'Retail Shrinkage Prevention Pack',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Smart Security',
    description: 'Reduce retail losses with a four-camera IP surveillance system, panic button, compliance signage and weekly health checks.',
    price: 699.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6874583/pexels-photo-6874583.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/6874583/pexels-photo-6874583.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 12,
    trending: true,
    isBundle: true,
    bundleItems: ['4x dome cameras', 'DVR with 500GB HDD', 'Panic button', 'CCTV warning signage', '3-month weekly health check service'],
    reviews: [
      { name: 'Rutendo D.', rating: 4, comment: 'Great value pack, cameras are crisp. Compliance signage is very useful.' },
    ],
    tags: ['retail', 'CCTV', 'security', 'surveillance'],
    seoKeywords: ['retail security Zimbabwe', 'CCTV store kit Harare', 'shrinkage prevention']
  },
  {
    id: 'visitor-management-bundle',
    slug: 'visitor-management-bundle',
    name: 'Visitor Management Bundle',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Visitor Management',
    description: 'Ensure secure visitor flows with smart ID card printing service, lanyards, sign-in sheets and privacy signage.',
    price: 159.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 9,
    isBundle: true,
    bundleItems: ['ID card printer rental (1 month)', '100 blank PVC cards', '100 lanyards', 'Visitor log books (2)', 'Privacy signage (3 pieces)'],
    reviews: [
      { name: 'Blessing S.', rating: 5, comment: 'Our visitor management has never been smoother. Highly recommend.' },
      { name: 'Farai D.', rating: 4, comment: 'Professional and easy to implement. The privacy signage is a nice touch.' },
    ],
    tags: ['visitor management', 'ID cards', 'security'],
    seoKeywords: ['visitor management Zimbabwe', 'ID card printing Harare']
  },
  {
    id: 'ip-camera-2mp',
    slug: 'ip-camera-2mp',
    name: '2MP IP Camera (Outdoor)',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Cameras',
    description: 'Weatherproof 2MP IP camera with night vision up to 30m. PoE support and mobile viewing.',
    price: 79.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/7784241/pexels-photo-7784241.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/7784241/pexels-photo-7784241.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 50,
    tags: ['IP camera', 'CCTV', 'surveillance'],
    seoKeywords: ['IP camera Zimbabwe', 'outdoor CCTV Harare']
  },
  {
    id: 'nvr-8-channel',
    slug: 'nvr-8-channel',
    name: '8-Channel NVR with 2TB HDD',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Recording Equipment',
    description: '8-channel network video recorder with 2TB surveillance-grade hard drive. Supports up to 8MP cameras.',
    price: 299.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 20,
    tags: ['NVR', 'recorder', 'storage'],
    seoKeywords: ['NVR Zimbabwe', 'CCTV recorder Harare']
  },
  {
    id: 'cctv-installation',
    slug: 'cctv-installation-service',
    name: 'Professional CCTV Installation',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Services',
    description: 'Professional installation service including site survey, cable routing, camera mounting, and system configuration.',
    price: 150.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 100,
    tags: ['installation', 'service', 'CCTV'],
    seoKeywords: ['CCTV installation Harare', 'CCTV setup Zimbabwe']
  },

  // ===== MARKETING PRODUCTS =====
  {
    id: 'nfc-business-card',
    slug: 'nfc-smart-business-card',
    name: 'NFC Smart Business Card',
    category: 'Marketing Products',
    categorySlug: 'marketing',
    subcategory: 'Smart Merch',
    description: 'Share your contact details with a single tap. Custom-branded NFC cards that link to your website, landing page or WhatsApp.',
    price: 19.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 20,
    trending: true,
    reviews: [
      { name: 'Munya N.', rating: 4, comment: 'Works like magic, customers love tapping to get my contact details!' },
      { name: 'Alice T.', rating: 5, comment: 'Sleek design and easy to set up. Received it in two days.' },
    ],
    tags: ['NFC', 'smart card', 'networking'],
    seoKeywords: ['NFC business cards Zimbabwe', 'smart merch Harare']
  },
  {
    id: 'pop-up-shop-kit',
    slug: 'pop-up-shop-starter-kit',
    name: 'Pop-Up Shop Starter Kit',
    category: 'Marketing Products',
    categorySlug: 'marketing',
    subcategory: 'Launch Kits',
    description: 'Everything you need for a market stall or pop-up event: roll-up banner, price cards, branded counter mats and staff tees.',
    price: 249.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/4451000/pexels-photo-4451000.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4451000/pexels-photo-4451000.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 7,
    isBundle: true,
    bundleItems: ['Roll-up banner', '20 price cards', '2 counter mats', '5 staff t-shirts'],
    reviews: [
      { name: 'Brighton L.', rating: 5, comment: 'Fantastic kit for our market stall. Banner and price cards look professional.' },
    ],
    tags: ['pop-up', 'retail', 'branding'],
    seoKeywords: ['pop-up shop branding Zimbabwe', 'retail launch kit Harare']
  },
  {
    id: 'qr-menu-kit',
    slug: 'qr-menu-system',
    name: 'QR Menu System (Contactless)',
    category: 'Marketing Products',
    categorySlug: 'marketing',
    subcategory: 'Digital Solutions',
    description: 'UV-coated table QR codes with digital menu hosting. Update your menu in real-time without reprinting.',
    price: 89.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5717959/pexels-photo-5717959.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/5717959/pexels-photo-5717959.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 15,
    tags: ['QR code', 'digital menu', 'restaurant'],
    seoKeywords: ['QR menu Zimbabwe', 'digital restaurant menu Harare']
  },
  {
    id: 'event-branding-kit',
    slug: 'event-branding-kit',
    name: 'Event Branding Kit',
    category: 'Marketing Products',
    categorySlug: 'marketing',
    subcategory: 'Events',
    description: 'Complete event branding: 2 roll-ups, 100 lanyards, 50 staff t-shirts, backdrop banner.',
    price: 399.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 5,
    featured: true,
    isBundle: true,
    bundleItems: ['2 roll-up banners', '100 lanyards', '50 branded t-shirts', '3x2m backdrop banner'],
    tags: ['events', 'branding', 'marketing'],
    seoKeywords: ['event branding Zimbabwe', 'conference branding Harare']
  },

  // ===== OFFICE SUPPLIES =====
  {
    id: 'office-starter-pack',
    slug: 'office-starter-pack',
    name: 'Office Starter Pack',
    category: 'Office Supplies',
    categorySlug: 'office-supplies',
    subcategory: 'Stationery Bundles',
    description: 'Essential office supplies: pens, notepads, staplers, paper clips, sticky notes, and folders.',
    price: 45.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/4226266/pexels-photo-4226266.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4226266/pexels-photo-4226266.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 50,
    isBundle: true,
    bundleItems: ['20 pens', '10 notepads', '2 staplers', '100 paper clips', '5 sticky note pads', '20 folders'],
    tags: ['office', 'supplies', 'stationery'],
    seoKeywords: ['office supplies Zimbabwe', 'stationery Harare']
  },
  {
    id: 'printer-paper-a4',
    slug: 'printer-paper-a4-ream',
    name: 'A4 Printer Paper (500 sheets)',
    category: 'Office Supplies',
    categorySlug: 'office-supplies',
    subcategory: 'Paper Products',
    description: 'High-quality 80gsm A4 white paper, 500 sheets per ream. Perfect for documents and printing.',
    price: 4.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 500,
    tags: ['paper', 'A4', 'printing'],
    seoKeywords: ['printer paper Zimbabwe', 'A4 paper Harare']
  },
  {
    id: 'whiteboard-magnetic',
    slug: 'magnetic-whiteboard',
    name: 'Magnetic Whiteboard (90x60cm)',
    category: 'Office Supplies',
    categorySlug: 'office-supplies',
    subcategory: 'Office Equipment',
    description: 'Magnetic dry-erase whiteboard with aluminum frame. Includes marker and eraser.',
    price: 35.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5700184/pexels-photo-5700184.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/5700184/pexels-photo-5700184.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 25,
    tags: ['whiteboard', 'office', 'equipment'],
    seoKeywords: ['whiteboard Zimbabwe', 'office whiteboard Harare']
  },
  {
    id: 'desk-organizer',
    slug: 'desk-organizer-set',
    name: 'Desk Organizer Set',
    category: 'Office Supplies',
    categorySlug: 'office-supplies',
    subcategory: 'Desk Accessories',
    description: 'Keep your workspace tidy with pen holder, document tray, and cable organizer.',
    price: 22.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/4226278/pexels-photo-4226278.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4226278/pexels-photo-4226278.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 40,
    tags: ['desk', 'organizer', 'office'],
    seoKeywords: ['desk organizer Zimbabwe', 'office accessories Harare']
  },

  // ===== ICT PRODUCTS =====
  {
    id: 'smartphone-android',
    slug: 'android-smartphone-mid-range',
    name: 'Android Smartphone - Mid-Range',
    category: 'ICT Products',
    categorySlug: 'ict',
    subcategory: 'Smartphones',
    description: '6.5" display, 128GB storage, 4GB RAM, dual SIM, 48MP camera. Perfect for business use.',
    price: 249.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 30,
    trending: true,
    tags: ['smartphone', 'android', 'mobile'],
    seoKeywords: ['smartphones Zimbabwe', 'android phone Harare', 'business phones']
  },
  {
    id: 'laptop-bag',
    slug: 'laptop-bag-15-inch',
    name: 'Laptop Bag (15.6 inch)',
    category: 'ICT Products',
    categorySlug: 'ict',
    subcategory: 'Accessories',
    description: 'Padded laptop bag with multiple compartments. Fits laptops up to 15.6 inches.',
    price: 35.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 60,
    tags: ['laptop', 'bag', 'accessories'],
    seoKeywords: ['laptop bag Zimbabwe', 'computer bag Harare']
  },
  {
    id: 'usb-flash-drive',
    slug: 'usb-flash-drive-64gb',
    name: 'USB Flash Drive (64GB)',
    category: 'ICT Products',
    categorySlug: 'ict',
    subcategory: 'Storage',
    description: 'High-speed USB 3.0 flash drive with 64GB capacity. Reliable data storage.',
    price: 12.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/4203100/pexels-photo-4203100.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4203100/pexels-photo-4203100.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 200,
    tags: ['USB', 'flash drive', 'storage'],
    seoKeywords: ['USB flash drive Zimbabwe', 'flash disk Harare']
  },
  {
    id: 'wireless-mouse',
    slug: 'wireless-mouse',
    name: 'Wireless Mouse',
    category: 'ICT Products',
    categorySlug: 'ict',
    subcategory: 'Computer Accessories',
    description: 'Ergonomic wireless mouse with 2.4GHz connection. Works with Windows, Mac, and Linux.',
    price: 15.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 100,
    tags: ['mouse', 'wireless', 'computer'],
    seoKeywords: ['wireless mouse Zimbabwe', 'computer mouse Harare']
  },
  {
    id: 'power-bank',
    slug: 'power-bank-20000mah',
    name: 'Power Bank (20000mAh)',
    category: 'ICT Products',
    categorySlug: 'ict',
    subcategory: 'Power Solutions',
    description: 'High-capacity power bank with dual USB ports. Fast charging for smartphones and tablets.',
    price: 28.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 80,
    trending: true,
    tags: ['power bank', 'charger', 'battery'],
    seoKeywords: ['power bank Zimbabwe', 'portable charger Harare']
  },

  // ===== WORKWEAR & PPE =====
  {
    id: 'safety-vests',
    slug: 'reflective-safety-vests',
    name: 'Reflective Safety Vests (Branded)',
    category: 'Workwear & PPE',
    categorySlug: 'workwear',
    subcategory: 'Safety Wear',
    description: 'High-visibility safety vests with reflective strips. Custom printing available.',
    price: 8.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 200,
    trending: true,
    tags: ['safety vest', 'PPE', 'workwear'],
    seoKeywords: ['safety vests Zimbabwe', 'reflective vests Harare', 'branded workwear']
  },
  {
    id: 'branded-workwear-bundle',
    slug: 'branded-workwear-bundle',
    name: 'Branded Workwear Bundle',
    category: 'Workwear & PPE',
    categorySlug: 'workwear',
    subcategory: 'Workwear',
    description: 'Safety vests, overalls, and branded apparel for your team. Complete professional outfit.',
    price: 189.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 15,
    isBundle: true,
    bundleItems: ['2 safety vests', '2 overalls', '2 branded t-shirts', '2 caps'],
    tags: ['workwear', 'safety', 'branded apparel'],
    seoKeywords: ['branded workwear Zimbabwe', 'safety vests printing Harare']
  },
  {
    id: 'overalls',
    slug: 'branded-overalls',
    name: 'Branded Overalls',
    category: 'Workwear & PPE',
    categorySlug: 'workwear',
    subcategory: 'Workwear',
    description: 'Durable cotton overalls with custom logo embroidery. Available in multiple colors.',
    price: 45.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 50,
    tags: ['overalls', 'workwear', 'industrial'],
    seoKeywords: ['branded overalls Zimbabwe', 'work overalls Harare']
  },
  {
    id: 'hard-hats',
    slug: 'safety-hard-hats',
    name: 'Safety Hard Hats (Branded)',
    category: 'Workwear & PPE',
    categorySlug: 'workwear',
    subcategory: 'PPE',
    description: 'Industrial safety hard hats with adjustable straps. Logo printing available.',
    price: 12.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 100,
    tags: ['hard hat', 'PPE', 'safety'],
    seoKeywords: ['hard hats Zimbabwe', 'safety helmets Harare']
  },

  // ===== FLEET BRANDING =====
  {
    id: 'vehicle-branding-package',
    slug: 'vehicle-branding-package',
    name: 'Vehicle Branding Package',
    category: 'Fleet Branding',
    categorySlug: 'fleet-branding',
    subcategory: 'Vehicle Wraps',
    description: 'Partial vehicle wrap with custom graphics, magnets, and reflective stickers. Transform your vehicles into mobile billboards.',
    price: 449.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 3,
    featured: true,
    trending: true,
    isBundle: true,
    bundleItems: ['Partial wrap design & print', '2 vehicle magnets', 'Reflective stickers set', 'Professional installation'],
    tags: ['vehicle branding', 'wraps', 'decals'],
    seoKeywords: ['vehicle branding Zimbabwe', 'car decals Harare', 'vehicle wraps']
  },
  {
    id: 'car-magnets',
    slug: 'vehicle-magnets',
    name: 'Vehicle Magnets (Pair)',
    category: 'Fleet Branding',
    categorySlug: 'fleet-branding',
    subcategory: 'Vehicle Graphics',
    description: 'Removable vehicle magnets with custom graphics. Easy to apply and remove.',
    price: 45.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 50,
    tags: ['magnets', 'vehicle', 'branding'],
    seoKeywords: ['car magnets Zimbabwe', 'vehicle magnets Harare']
  },
  {
    id: 'vehicle-decals',
    slug: 'vehicle-decals-custom',
    name: 'Custom Vehicle Decals',
    category: 'Fleet Branding',
    categorySlug: 'fleet-branding',
    subcategory: 'Vehicle Graphics',
    description: 'Weather-resistant vinyl decals for vehicles. Custom shapes and sizes available.',
    price: 25.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 100,
    tags: ['decals', 'stickers', 'vehicle'],
    seoKeywords: ['vehicle decals Zimbabwe', 'car stickers Harare']
  },
  {
    id: 'full-vehicle-wrap',
    slug: 'full-vehicle-wrap',
    name: 'Full Vehicle Wrap',
    category: 'Fleet Branding',
    categorySlug: 'fleet-branding',
    subcategory: 'Vehicle Wraps',
    description: 'Complete vehicle wrap with custom design. Maximum brand visibility on the road.',
    price: 1299.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: ['https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800'],
    stock: 2,
    featured: true,
    tags: ['vehicle wrap', 'branding', 'advertising'],
    seoKeywords: ['full vehicle wrap Zimbabwe', 'car wrapping Harare']
  },
];

// Helper functions
export const getProductsByCategory = (categorySlug: string): WebstoreProduct[] => {
  return webstoreProducts.filter(p => p.categorySlug === categorySlug);
};

export const getTrendingProducts = (): WebstoreProduct[] => {
  return webstoreProducts.filter(p => p.trending);
};

export const getFeaturedProducts = (): WebstoreProduct[] => {
  return webstoreProducts.filter(p => p.featured);
};

export const getProductById = (id: string): WebstoreProduct | undefined => {
  return webstoreProducts.find(p => p.id === id);
};

export const getProductBySlug = (slug: string): WebstoreProduct | undefined => {
  return webstoreProducts.find(p => p.slug === slug);
};

export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
  return webstoreCategories.find(c => c.slug === slug);
};

export const getInStockProducts = (): WebstoreProduct[] => {
  return webstoreProducts.filter(p => p.stock > 0);
};

export const getProductsWithReviews = (): WebstoreProduct[] => {
  return webstoreProducts.filter(p => p.reviews && p.reviews.length > 0);
};

export const searchProducts = (query: string): WebstoreProduct[] => {
  const lowerQuery = query.toLowerCase();
  return webstoreProducts.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    p.seoKeywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
};
