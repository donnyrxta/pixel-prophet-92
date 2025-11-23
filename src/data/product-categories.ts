/**
 * Comprehensive Product Categories for Soho Connect Webstore
 * All business categories with SEO optimization
 */

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  seoDescription: string;
  image: string;
  icon: string;
  featured: boolean;
}

export const productCategories: ProductCategory[] = [
  {
    id: 'business-consumables',
    name: 'Business Consumables',
    slug: 'business-consumables',
    tagline: 'Essential Office Supplies',
    description: 'Complete range of office consumables, stationery, and daily business essentials.',
    seoDescription: 'Buy business consumables in Harare - office supplies, stationery, printer cartridges, paper products. Fast delivery across Zimbabwe.',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '📋',
    featured: true
  },
  {
    id: 'office-supplies',
    name: 'Office Supplies',
    slug: 'office-supplies',
    tagline: 'Equip Your Workspace',
    description: 'Premium office furniture, equipment, and organizational solutions for modern workspaces.',
    seoDescription: 'Office supplies Harare - desks, chairs, filing cabinets, whiteboards, office equipment. Quality products for Zimbabwe businesses.',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '🗄️',
    featured: true
  },
  {
    id: 'cctv-security',
    name: 'CCTV & Security',
    slug: 'cctv-security',
    tagline: 'Secure Your Business',
    description: 'Advanced CCTV systems, access control, and comprehensive security solutions.',
    seoDescription: 'CCTV systems Harare - security cameras, surveillance, access control, alarm systems. Professional installation in Zimbabwe.',
    image: 'https://images.pexels.com/photos/7784241/pexels-photo-7784241.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '📹',
    featured: true
  },
  {
    id: 'workwear',
    name: 'Workwear & PPE',
    slug: 'workwear',
    tagline: 'Safety First',
    description: 'Industrial workwear, safety equipment, and personal protective equipment (PPE).',
    seoDescription: 'Workwear Zimbabwe - safety boots, overalls, hard hats, PPE, industrial clothing. Bulk orders available in Harare.',
    image: 'https://images.pexels.com/photos/5691540/pexels-photo-5691540.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '🦺',
    featured: false
  },
  {
    id: 'vehicle-branding',
    name: 'Vehicle & Fleet Branding',
    slug: 'vehicle-branding',
    tagline: 'Mobile Advertising',
    description: 'Professional vehicle wraps, fleet branding, and mobile advertising solutions.',
    seoDescription: 'Vehicle branding Harare - car wraps, fleet graphics, mobile advertising, vehicle signage. Transform your fleet in Zimbabwe.',
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '🚗',
    featured: true
  },
  {
    id: 'smartphones-ict',
    name: 'Smartphones & ICT',
    slug: 'smartphones-ict',
    tagline: 'Stay Connected',
    description: 'Latest smartphones, tablets, laptops, and ICT equipment for modern businesses.',
    seoDescription: 'Smartphones Harare - mobile phones, tablets, laptops, ICT equipment. Latest technology products in Zimbabwe.',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '📱',
    featured: true
  },
  {
    id: 'domed-stickers',
    name: 'Domed Stickers & Labels',
    slug: 'domed-stickers',
    tagline: 'Premium Branding',
    description: '3D domed stickers, labels, and premium branding materials with resin finish.',
    seoDescription: 'Domed stickers Harare - 3D labels, resin stickers, premium branding materials. Custom designs for Zimbabwe businesses.',
    image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '🏷️',
    featured: false
  },
  {
    id: 'branded-diaries',
    name: 'Branded Diaries & Notebooks',
    slug: 'branded-diaries',
    tagline: 'Corporate Gifting',
    description: 'Custom branded diaries, planners, notebooks, and corporate gifts.',
    seoDescription: 'Branded diaries Harare - custom notebooks, corporate planners, business gifts. Personalized stationery in Zimbabwe.',
    image: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '📓',
    featured: false
  },
  {
    id: 'print-products',
    name: 'Print Products',
    slug: 'print-products',
    tagline: 'Professional Printing',
    description: 'Business cards, flyers, brochures, banners, and all printing services.',
    seoDescription: 'Printing services Harare - business cards, flyers, brochures, banners, posters. Fast turnaround in Zimbabwe.',
    image: 'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '🖨️',
    featured: true
  },
  {
    id: 'design-services',
    name: 'Design Services',
    slug: 'design-services',
    tagline: 'Creative Excellence',
    description: 'Logo design, branding, graphic design, and complete visual identity packages.',
    seoDescription: 'Design services Harare - logo design, branding, graphic design, visual identity. Professional designers in Zimbabwe.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '🎨',
    featured: true
  },
  {
    id: 'corporate-wear',
    name: 'Corporate Wear',
    slug: 'corporate-wear',
    tagline: 'Dress Your Team',
    description: 'Branded corporate clothing, uniforms, and professional apparel.',
    seoDescription: 'Corporate wear Harare - branded clothing, uniforms, company apparel. Custom embroidery in Zimbabwe.',
    image: 'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '👔',
    featured: false
  },
  {
    id: 'marketing-materials',
    name: 'Marketing Materials',
    slug: 'marketing-materials',
    tagline: 'Promote Your Brand',
    description: 'Promotional products, marketing collateral, and advertising materials.',
    seoDescription: 'Marketing materials Harare - promotional products, branded merchandise, advertising materials. Boost your brand in Zimbabwe.',
    image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '📢',
    featured: false
  }
];

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find(cat => cat.slug === slug);
}

/**
 * Get featured categories
 */
export function getFeaturedCategories(): ProductCategory[] {
  return productCategories.filter(cat => cat.featured);
}