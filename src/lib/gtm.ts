/**
 * Google Tag Manager utilities for tracking user interactions
 * Implements analytics events as specified in the Excellence Rubric:
 * - form_submit
 * - cta_click
 * - portfolio_view
 * - whatsapp_click
 */

// Shared e-commerce types for GA4-compatible events
type EcommerceItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
};

interface EcommercePayload {
  currency: string;
  value?: number;
  items: EcommerceItem[];
  transaction_id?: string;
}

interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

/**
 * Initialize dataLayer if it doesn't exist
 */
const initDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
};

/**
 * Push an event to the GTM dataLayer
 */
const pushEvent = (event: DataLayerEvent) => {
  initDataLayer();
  window.dataLayer.push(event);
};

/**
 * Track form submissions
 * @param formName - Name/type of the form (e.g., "quote", "contact", "newsletter")
 * @param formData - Optional form data to include
 */
export const trackFormSubmit = (formName: string, formData?: Record<string, unknown>) => {
  pushEvent({
    event: 'form_submit',
    form_name: formName,
    form_location: window.location.pathname,
    ...formData,
  });
};

/**
 * Track CTA button clicks
 * @param ctaLabel - Label/text of the CTA button
 * @param ctaLocation - Where the CTA is located on the page
 * @param ctaDestination - Where the CTA leads to
 */
export const trackCTAClick = (
  ctaLabel: string,
  ctaLocation: string,
  ctaDestination?: string
) => {
  pushEvent({
    event: 'cta_click',
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    cta_destination: ctaDestination || '',
    page_path: window.location.pathname,
  });
};

/**
 * Track WhatsApp button clicks
 * @param location - Where the button was clicked
 * @param details - Optional details about the click (e.g. destination)
 */
export const trackWhatsAppClick = (location: string, details?: string) => {
  pushEvent({
    event: 'whatsapp_click',
    click_location: location,
    click_details: details,
    page_path: window.location.pathname,
  });
};

/**
 * Track Quote Calculator usage
 * @param action - Action performed (e.g., 'started', 'completed')
 * @param data - Data from the quote calculator
 */
export function trackQuoteCalculator(action: string, data?: Record<string, unknown>): void;
export function trackQuoteCalculator(data: Record<string, unknown>): void;
export function trackQuoteCalculator(actionOrData: string | Record<string, unknown>, data?: Record<string, unknown>) {
  if (typeof actionOrData === 'string') {
    pushEvent({
      event: 'quote_calculator_usage',
      action: actionOrData,
      ...data,
    });
  } else {
    pushEvent({
      event: 'quote_calculator_usage',
      ...actionOrData,
    });
  }
}

/**
 * Track product views
 */
export function trackProductView(product: EcommerceItem): void;
export function trackProductView(id: string, name: string, category: string, price: number): void;
export function trackProductView(productOrId: EcommerceItem | string, name?: string, category?: string, price?: number) {
  if (typeof productOrId === 'object') {
    pushEvent({
      event: 'view_item',
      ecommerce: { items: [productOrId] },
    });
  } else {
    pushEvent({
      event: 'view_item',
      ecommerce: {
        items: [{
          item_id: productOrId,
          item_name: name || '',
          item_category: category,
          price: price || 0,
          quantity: 1
        }]
      },
    });
  }
}

/**
 * Track add to cart
 */
export function trackAddToCart(product: EcommerceItem): void;
export function trackAddToCart(id: string, name: string, price: number, quantity: number): void;
export function trackAddToCart(productOrId: EcommerceItem | string, name?: string, price?: number, quantity?: number) {
  if (typeof productOrId === 'object') {
    pushEvent({
      event: 'add_to_cart',
      ecommerce: { items: [productOrId] },
    });
  } else {
    pushEvent({
      event: 'add_to_cart',
      ecommerce: {
        items: [{
          item_id: productOrId,
          item_name: name || '',
          price: price || 0,
          quantity: quantity || 1
        }]
      },
    });
  }
}

/**
 * Track remove from cart
 */
export const trackRemoveFromCart = (product: EcommerceItem) => {
  pushEvent({
    event: 'remove_from_cart',
    ecommerce: {
      items: [product],
    },
  });
};

/**
 * Track begin checkout
 */
export function trackBeginCheckout(items: EcommerceItem[], value: number, currency?: string): void;
export function trackBeginCheckout(value: number, items: EcommerceItem[], currency?: string): void; // Legacy
export function trackBeginCheckout(itemsOrValue: EcommerceItem[] | number, valueOrItems: number | EcommerceItem[], currency: string = 'USD') {
  let items: EcommerceItem[];
  let value: number;

  if (Array.isArray(itemsOrValue)) {
    items = itemsOrValue;
    value = valueOrItems as number;
  } else {
    items = valueOrItems as EcommerceItem[];
    value = itemsOrValue;
  }

  pushEvent({
    event: 'begin_checkout',
    ecommerce: {
      items,
      value,
      currency,
    },
  });
}

/**
 * Track purchase
 */
export const trackPurchase = (transactionId: string, items: EcommerceItem[], value: number, currency: string = 'USD') => {
  pushEvent({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value,
      currency,
      items,
    },
  });
};

/**
 * Track portfolio item views
 * @param projectId - ID of the portfolio project
 * @param projectTitle - Title of the project
 * @param projectCategory - Category of the project
 */
export const trackPortfolioView = (
  projectId: string,
  projectTitle: string,
  projectCategory: string
) => {
  pushEvent({
    event: 'portfolio_view',
    project_id: projectId,
    project_title: projectTitle,
    project_category: projectCategory,
  });
};

/**
 * Track page views
 * @param pageTitle - Title of the page
 * @param pagePath - Path of the page
 */
export const trackPageView = (pageTitle: string, pagePath: string) => {
  pushEvent({
    event: 'page_view',
    page_title: pageTitle,
    page_path: pagePath,
  });
};

/**
 * Track generic custom events
 * @param eventName - Name of the event
 * @param properties - Additional event properties
 */
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  pushEvent({
    event: eventName,
    ...properties,
  });
};

// Alias for backward compatibility
export const trackCustomEvent = trackEvent;

// ==========================================
// Lead Form Tracking (D2 Landing Page)
// ==========================================

/**
 * Track when a lead form is started
 * @param formType - Type of form (e.g., 'audit_request')
 * @param packageName - Optional selected package
 */
export const trackLeadFormStarted = (formType: string, packageName?: string) => {
  pushEvent({
    event: 'lead_form_started',
    form_type: formType,
    package: packageName || 'not_selected',
    page_path: window.location.pathname,
  });
};

/**
 * Track when a lead form is completed
 * @param formType - Type of form
 * @param bantScore - BANT qualification score
 * @param bantTier - Lead tier (Hot/Warm/Cold)
 */
export const trackLeadFormCompleted = (
  formType: string,
  bantScore: number,
  bantTier: string
) => {
  pushEvent({
    event: 'lead_form_completed',
    form_type: formType,
    bant_score: bantScore,
    bant_tier: bantTier,
    page_path: window.location.pathname,
  });
};

/**
 * Track when a lead is submitted
 * @param data - Lead submission data
 */
export const trackLeadSubmitted = (data: {
  bantScore: number;
  bantTier: string;
  packageName?: string;
}) => {
  pushEvent({
    event: 'lead_submitted',
    bant_score: data.bantScore,
    bant_tier: data.bantTier,
    package: data.packageName || 'not_selected',
    page_path: window.location.pathname,
  });
};
