/**
 * Webstore product catalog data
 * Unified product database for all divisions: Design, Print, Corporate Wear, CCTV, Marketing
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
  images: string[];  // Product gallery images
  stock: number;  // Inventory count
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
    tagline: 'Premium Print Quality',
    description: 'High-quality printing services for business cards, flyers, banners, and more.',
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
    tagline: 'Professional Apparel',
    description: 'Custom branded corporate wear, uniforms, and promotional apparel.',
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
    tagline: 'Amplify Your Message',
    description: 'Digital marketing services, content creation, and promotional materials.',
    image: 'https://images.pexels.com/photos/3952237/pexels-photo-3952237.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImages: [
      {
        image: 'https://images.pexels.com/photos/3952237/pexels-photo-3952237.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: 'DIGITAL',
        subtitle: 'MARKETING',
        description: 'Strategic campaigns that drive results.'
      }
    ]
  }
];

export const webstoreProducts: WebstoreProduct[] = [
  // CCTV & Security Products
  {
    id: 'solar-cctv-kit',
    slug: 'solar-cctv-kit',
    name: 'Solar CCTV Kit',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Smart Security',
    description: 'Complete solar-powered surveillance kit including IP cameras, NVR, solar panels and UPS for continuous monitoring.',
    price: 899.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6461307/pexels-photo-6461307.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6461307/pexels-photo-6461307.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6461306/pexels-photo-6461306.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6461305/pexels-photo-6461305.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 8,
    featured: true,
    trending: true,
    isBundle: true,
    bundleItems: ['solar-panel', 'ip-camera', 'nvr', 'ups'],
    reviews: [
      { name: 'Tafadzwa K.', rating: 5, comment: 'Easy installation and great solar performance. My farm is secure 24/7.' },
      { name: 'Sarah M.', rating: 4, comment: 'Cameras deliver clear footage even at night. Would love even more storage.' },
    ],
    tags: ['solar', 'CCTV', 'surveillance', 'security'],
    seoKeywords: ['solar CCTV Zimbabwe', 'UPS CCTV Harare', 'solar surveillance kit']
  },
  {
    id: 'retail-shrinkage-pack',
    name: 'Retail Shrinkage Pack',
    category: 'cctv',
    subcategory: 'Smart Security',
    description: 'Reduce retail losses with a four-camera IP surveillance system, panic button, compliance signage and weekly health checks.',
    price: 699.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6874583/pexels-photo-6874583.jpeg?auto=compress&cs=tinysrgb&w=800',
    trending: true,
    tags: ['retail', 'CCTV', 'security', 'surveillance'],
    seoKeywords: ['retail security Zimbabwe', 'CCTV store kit Harare', 'shrinkage prevention']
  },
  {
    id: 'visitor-management-bundle',
    name: 'Visitor Management Bundle',
    category: 'cctv',
    subcategory: 'Visitor Management',
    description: 'Ensure secure visitor flows with smart ID card printing service, lanyards, sign-in sheets and privacy signage.',
    price: 159.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['visitor management', 'ID cards', 'security'],
    seoKeywords: ['visitor management Zimbabwe', 'ID card printing Harare']
  },

  // Marketing Products
  {
    id: 'restaurant-launch-kit',
    name: 'Restaurant Launch Kit',
    category: 'marketing',
    subcategory: 'Launch Kits',
    description: 'Jump-start your eatery with custom menu design, table talkers, delivery stickers and caps.',
    price: 349.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/2611812/pexels-photo-2611812.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    trending: true,
    tags: ['restaurant', 'branding', 'marketing', 'launch kit'],
    seoKeywords: ['restaurant branding Zimbabwe', 'menu printing Harare', 'restaurant launch kit']
  },
  {
    id: 'pop-up-shop-kit',
    name: 'Pop-Up Shop Starter Kit',
    category: 'marketing',
    subcategory: 'Launch Kits',
    description: 'Everything you need for a successful pop-up: roll-up banners, counter mats, price cards, and staff tees.',
    price: 299.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['pop-up', 'retail', 'branding'],
    seoKeywords: ['pop-up shop branding Zimbabwe', 'retail launch kit Harare']
  },

  // Design Services
  {
    id: 'brand-identity-package',
    name: 'Complete Brand Identity Package',
    category: 'design',
    subcategory: 'Brand Identity',
    description: 'Professional logo design, brand guidelines, color palette, typography system, and stationery templates.',
    price: 599.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tags: ['branding', 'logo', 'design'],
    seoKeywords: ['brand identity Zimbabwe', 'logo design Harare', 'branding package']
  },
  {
    id: 'social-media-pack',
    name: 'Monthly Social Media Pack',
    category: 'design',
    subcategory: 'Digital Design',
    description: 'Monthly content calendar, post templates, story highlights, and ad creatives.',
    price: 199.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['social media', 'content', 'design'],
    seoKeywords: ['social media content Zimbabwe', 'Facebook ads creatives Harare']
  },

  // Print Products
  {
    id: 'business-cards-premium',
    name: 'Premium Business Cards',
    category: 'print',
    subcategory: 'Stationery',
    description: '500 premium business cards with spot UV, foiling, or embossing finish.',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['business cards', 'premium print', 'stationery'],
    seoKeywords: ['foil business cards Zimbabwe', 'embossed business cards Harare']
  },
  {
    id: 'vehicle-branding-package',
    name: 'Vehicle Branding Package',
    category: 'print',
    subcategory: 'Vehicle Branding',
    description: 'Partial vehicle wrap with custom graphics, magnets, and reflective stickers.',
    price: 449.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['vehicle branding', 'wraps', 'decals'],
    seoKeywords: ['vehicle branding Zimbabwe', 'car decals Harare', 'vehicle wraps']
  },

  // Corporate Wear
  {
    id: 'nfc-business-card',
    name: 'NFC Smart Business Card',
    category: 'corporate-wear',
    subcategory: 'Smart Merch',
    description: 'Share your contact details with a single tap. Custom-branded NFC cards.',
    price: 19.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=800',
    trending: true,
    tags: ['NFC', 'smart card', 'networking'],
    seoKeywords: ['NFC business cards Zimbabwe', 'smart merch Harare']
  },
  {
    id: 'corporate-gift-set',
    name: 'Corporate Gift Set',
    category: 'corporate-wear',
    subcategory: 'Corporate Gifts',
    description: 'Delight clients and employees with executive pens, notebooks and power banks.',
    price: 74.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3560437/pexels-photo-3560437.jpeg?auto=compress&cs=tinysrgb&w=800',
    trending: true,
    tags: ['corporate gifts', 'executive', 'branded'],
    seoKeywords: ['corporate gifts Zimbabwe', 'executive gift sets Harare']
  },
  {
    id: 'branded-workwear-bundle',
    name: 'Branded Workwear Bundle',
    category: 'corporate-wear',
    subcategory: 'Workwear',
    description: 'Safety vests, overalls, and branded apparel for your team.',
    price: 189.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['workwear', 'safety', 'branded apparel'],
    seoKeywords: ['branded workwear Zimbabwe', 'safety vests printing Harare']
  }
];

// Helper functions
export const getProductsByCategory = (categoryId: string): WebstoreProduct[] => {
  return webstoreProducts.filter(p => p.category === categoryId);
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

export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
  return webstoreCategories.find(c => c.slug === slug);
};
