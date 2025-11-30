/**
 * Shop Types - SohoConnect Electronics Division
 * Phase 3: E-commerce type definitions
 */

export type ProductCategory = 'smartphones' | 'laptops' | 'cctv' | 'accessories' | 'consumables' | 'tablets' | 'watches';

export type PaymentMethod = 'ecocash' | 'card' | 'bank_transfer' | 'cash';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Color", "Storage"
  options: string[]; // e.g., ["Red", "Blue"], ["64GB", "128GB"]
  selected?: string; // Currently selected option
}

export interface BulkPricingTier {
  minQuantity: number;
  price: number;
  discountPercentage?: number;
}

export interface ProductBundle {
  id: string;
  name: string;
  description?: string;
  bundledProducts: Product[];
  bundlePrice: number;
  savingsPercentage?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  currency: 'USD' | 'ZWL';
  image: string;
  images?: string[];
  description: string;
  shortDescription?: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  sku: string;

  // Technical details
  features?: string[];
  specifications?: Record<string, string>;

  // Business details
  warranty?: string;
  delivery?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // Metadata
  createdAt?: string;
  updatedAt?: string;

  // Extended product types
  variants?: ProductVariant[];
  bundles?: ProductBundle[];
  bulkPricing?: BulkPricingTier[];
  isVariant?: boolean; // True if this is a variant of another product
  parentProductId?: string; // ID of the parent product if this is a variant
  isBundle?: boolean; // True if this product is a bundle
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  govtLevy: number; // 2% Zimbabwe govt levy
  total: number;
  itemCount: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp?: string;

  // Shipping address
  address: string;
  city: string;
  province: string;
  postalCode?: string;

  // Business details (optional)
  company?: string;
  vatNumber?: string;

  // Preferences
  deliveryInstructions?: string;
  marketingConsent: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: CartItem[];

  // Pricing
  subtotal: number;
  govtLevy: number;
  deliveryFee: number;
  total: number;

  // Payment
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentReference?: string;

  // Fulfillment
  status: OrderStatus;
  deliveryMethod: 'pickup' | 'delivery';
  estimatedDelivery?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface EcoCashPayment {
  merchantCode: string;
  merchantRef: string;
  amount: number;
  currency: 'USD' | 'ZWL';
  customerPhone: string;
  description: string;
  callbackUrl: string;

  // Response
  transactionId?: string;
  status?: 'pending' | 'success' | 'failed';
  errorMessage?: string;
}

export interface LocationPage {
  city: string;
  slug: string;
  province: string;
  title: string;
  metaDescription: string;
  heroImage: string;

  // GBP data
  gbpUrl?: string;
  address?: string;
  phone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Content
  uniqueContent: string; // ≥30% unique copy
  servicesOffered: string[];
  testimonials?: string[];

  // SEO
  schema?: object;
}

export interface PricingRules {
  govtLevyRate: number; // 0.02 for 2%
  vatRate: number; // Zimbabwe VAT
  deliveryFeeFlat?: number;
  freeDeliveryThreshold?: number;

  // Forex
  usdToZwlRate?: number;
  rateSource?: string;
  rateUpdatedAt?: string;
}
