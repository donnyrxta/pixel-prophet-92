/**
 * Enhanced Webstore product catalog data
 * Integrated from Next.js solution with full product details, reviews, and stock management
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
    slug: 'retail-shrinkage-pack',
    name: 'Retail Shrinkage Pack',
    category: 'CCTV & Security',
    categorySlug: 'cctv',
    subcategory: 'Smart Security',
    description: 'Reduce retail losses with a four-camera IP surveillance system, panic button, compliance signage and weekly health checks.',
    price: 699.50,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6874583/pexels-photo-6874583.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6874583/pexels-photo-6874583.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6874582/pexels-photo-6874582.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6874581/pexels-photo-6874581.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 12,
    trending: true,
    isBundle: true,
    bundleItems: ['camera', 'panic-button', 'signage', 'health-check'],
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
    images: [
      'https://images.pexels.com/photos/7709113/pexels-photo-7709113.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7709114/pexels-photo-7709114.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 9,
    isBundle: true,
    bundleItems: ['id-cards', 'lanyards', 'sign-in-sheets', 'privacy-signage'],
    reviews: [
      { name: 'Blessing S.', rating: 5, comment: 'Our visitor management has never been smoother. Highly recommend.' },
      { name: 'Farai D.', rating: 4, comment: 'Professional and easy to implement. The privacy signage is a nice touch.' },
    ],
    tags: ['visitor management', 'ID cards', 'security'],
    seoKeywords: ['visitor management Zimbabwe', 'ID card printing Harare']
  },

  // Marketing Products
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
      'https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 5,
    featured: true,
    trending: true,
    isBundle: true,
    bundleItems: ['menu', 'table-talker', 'stickers', 'caps', 'social-pack'],
    reviews: [
      { name: 'Kudzi P.', rating: 5, comment: 'This kit had everything we needed to open our café! Menus were beautiful.' },
    ],
    tags: ['restaurant', 'branding', 'marketing', 'launch kit'],
    seoKeywords: ['restaurant branding Zimbabwe', 'menu printing Harare', 'restaurant launch kit']
  },
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
    images: [
      'https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1106477/pexels-photo-1106477.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
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
    images: [
      'https://images.pexels.com/photos/4451000/pexels-photo-4451000.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4450999/pexels-photo-4450999.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 7,
    isBundle: true,
    bundleItems: ['banner', 'price-cards', 'counter-mats', 'staff-tees'],
    reviews: [
      { name: 'Brighton L.', rating: 5, comment: 'Fantastic kit for our market stall. Banner and price cards look professional.' },
    ],
    tags: ['pop-up', 'retail', 'branding'],
    seoKeywords: ['pop-up shop branding Zimbabwe', 'retail launch kit Harare']
  },

  // Print Products
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
    images: [
      'https://images.pexels.com/photos/3760076/pexels-photo-3760076.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3760075/pexels-photo-3760075.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 0,
    isBundle: true,
    bundleItems: ['flyers', 'pens', 'tees'],
    reviews: [],
    tags: ['eco-friendly', 'sustainable', 'print'],
    seoKeywords: ['eco-friendly printing Zimbabwe', 'sustainable merch Harare']
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
    images: [
      'https://images.pexels.com/photos/5905876/pexels-photo-5905876.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5905875/pexels-photo-5905875.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 15,
    reviews: [
      { name: 'Chenai G.', rating: 4, comment: 'My personalised calendar turned out beautifully. Delivery was quick.' },
    ],
    tags: ['personalized', 'calendar', 'photo print'],
    seoKeywords: ['photo calendar Zimbabwe', 'custom calendar Harare']
  },
  {
    id: 'business-cards-premium',
    slug: 'premium-business-cards',
    name: 'Premium Business Cards',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Stationery',
    description: '500 premium business cards with spot UV, foiling, or embossing finish.',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 50,
    reviews: [
      { name: 'Michael T.', rating: 5, comment: 'Premium business cards with spot UV finish look amazing. They make a lasting impression at networking events.' },
    ],
    tags: ['business cards', 'premium print', 'stationery'],
    seoKeywords: ['foil business cards Zimbabwe', 'embossed business cards Harare']
  },
  {
    id: 'vehicle-branding-package',
    slug: 'vehicle-branding-package',
    name: 'Vehicle Branding Package',
    category: 'Print Products',
    categorySlug: 'print',
    subcategory: 'Vehicle Branding',
    description: 'Partial vehicle wrap with custom graphics, magnets, and reflective stickers.',
    price: 449.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 3,
    tags: ['vehicle branding', 'wraps', 'decals'],
    seoKeywords: ['vehicle branding Zimbabwe', 'car decals Harare', 'vehicle wraps']
  },

  // Corporate Wear
  {
    id: 'corporate-gift-set',
    slug: 'corporate-gift-set',
    name: 'Corporate Gift Set',
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
    isBundle: true,
    bundleItems: ['pens', 'notebooks', 'power-banks', 'desk-calendars'],
    reviews: [
      { name: 'Nomsa K.', rating: 4, comment: 'Our partners loved the gifts. Notebook quality is top notch.' },
    ],
    tags: ['corporate gifts', 'executive', 'branded'],
    seoKeywords: ['corporate gifts Zimbabwe', 'executive gift sets Harare']
  },
  {
    id: 'branded-workwear-bundle',
    slug: 'branded-workwear-bundle',
    name: 'Branded Workwear Bundle',
    category: 'Corporate Wear',
    categorySlug: 'corporate-wear',
    subcategory: 'Workwear',
    description: 'Safety vests, overalls, and branded apparel for your team.',
    price: 189.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 15,
    tags: ['workwear', 'safety', 'branded apparel'],
    seoKeywords: ['branded workwear Zimbabwe', 'safety vests printing Harare']
  },

  // Design Services
  {
    id: 'brand-identity-package',
    slug: 'brand-identity-package',
    name: 'Complete Brand Identity Package',
    category: 'Design Services',
    categorySlug: 'design',
    subcategory: 'Brand Identity',
    description: 'Professional logo design, brand guidelines, color palette, typography system, and stationery templates.',
    price: 599.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 10,
    featured: true,
    tags: ['branding', 'logo', 'design'],
    seoKeywords: ['brand identity Zimbabwe', 'logo design Harare', 'branding package']
  },
  {
    id: 'social-media-pack',
    slug: 'social-media-pack',
    name: 'Monthly Social Media Pack',
    category: 'Design Services',
    categorySlug: 'design',
    subcategory: 'Digital Design',
    description: 'Monthly content calendar, post templates, story highlights, and ad creatives.',
    price: 199.00,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    stock: 20,
    tags: ['social media', 'content', 'design'],
    seoKeywords: ['social media content Zimbabwe', 'Facebook ads creatives Harare']
  }
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
