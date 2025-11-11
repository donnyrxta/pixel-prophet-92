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
    page_path: window.location.pathname,
  });
};

/**
 * Track WhatsApp click-to-chat interactions
 * @param source - Where on the site the WhatsApp button was clicked
 * @param message - Optional pre-filled message
 */
export const trackWhatsAppClick = (source: string, message?: string) => {
  pushEvent({
    event: 'whatsapp_click',
    click_source: source,
    message_template: message || '',
    page_path: window.location.pathname,
  });
};

/**
 * Track service page views
 * @param serviceName - Name of the service viewed
 */
export const trackServiceView = (serviceName: string) => {
  pushEvent({
    event: 'service_view',
    service_name: serviceName,
    page_path: window.location.pathname,
  });
};

/**
 * Track quote calculator interactions
 * @param action - Action taken (e.g., "started", "completed", "abandoned")
 * @param quoteDetails - Details of the quote
 */
export const trackQuoteCalculator = (
  action: 'started' | 'completed' | 'abandoned',
  quoteDetails?: Record<string, unknown>
) => {
  pushEvent({
    event: 'quote_calculator',
    calculator_action: action,
    page_path: window.location.pathname,
    ...quoteDetails,
  });
};

/**
 * Track menu interactions (for floating contact widget)
 * @param action - Menu action (e.g., "expanded", "collapsed", "item_clicked")
 * @param menuType - Type of menu (e.g., "floating_contact")
 */
export const trackMenuInteraction = (
  action: string,
  menuType: string,
  additionalData?: Record<string, unknown>
) => {
  pushEvent({
    event: 'menu_interaction',
    menu_action: action,
    menu_type: menuType,
    page_path: window.location.pathname,
    ...additionalData,
  });
};

/**
 * Track page views (for SPA route changes)
 * @param pageTitle - Title of the page
 * @param pagePath - Path of the page
 */
export const trackPageView = (pageTitle: string, pagePath: string) => {
  pushEvent({
    event: 'page_view',
    page_title: pageTitle,
    page_path: pagePath,
    page_location: window.location.href,
  });
};

/**
 * Track custom events
 * @param eventName - Name of the custom event
 * @param eventData - Data associated with the event
 */
export const trackCustomEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  pushEvent({
    event: eventName,
    ...eventData,
  });
};

/**
 * E-COMMERCE TRACKING
 * Phase 3: Enhanced e-commerce events for GA4
 */

/**
 * Track product views
 * @param productId - ID of the product
 * @param productName - Name of the product
 * @param category - Product category
 * @param price - Product price
 */
export const trackProductView = (
  productId: string,
  productName: string,
  category: string,
  price: number
) => {
  pushEvent({
    event: 'view_item',
    ecommerce: {
      currency: 'USD',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        item_category: category,
        price: price,
        quantity: 1
      }] as EcommerceItem[]
    },
    page_path: window.location.pathname
  });
};

/**
 * Track add to cart
 * @param productId - ID of the product
 * @param productName - Name of the product
 * @param price - Product price
 * @param quantity - Quantity added
 */
export const trackAddToCart = (
  productId: string,
  productName: string,
  price: number,
  quantity: number
) => {
  pushEvent({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'USD',
      value: price * quantity,
      items: [{
        item_id: productId,
        item_name: productName,
        price: price,
        quantity: quantity
      }] as EcommerceItem[]
    },
    page_path: window.location.pathname
  });
};

/**
 * Track remove from cart
 * @param productId - ID of the product
 * @param productName - Name of the product
 * @param price - Product price
 * @param quantity - Quantity removed
 */
export const trackRemoveFromCart = (
  productId: string,
  productName: string,
  price: number,
  quantity: number
) => {
  pushEvent({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'USD',
      value: price * quantity,
      items: [{
        item_id: productId,
        item_name: productName,
        price: price,
        quantity: quantity
      }] as EcommerceItem[]
    },
    page_path: window.location.pathname
  });
};

/**
 * Track begin checkout
 * @param cartValue - Total cart value
 * @param items - Cart items
 */
export const trackBeginCheckout = (
  cartValue: number,
  items: EcommerceItem[]
) => {
  pushEvent({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'USD',
      value: cartValue,
      items: items
    },
    page_path: window.location.pathname
  });
};

/**
 * Track purchase/order completion
 * @param transactionId - Unique transaction ID
 * @param revenue - Total revenue
 * @param items - Purchased items
 * @param paymentMethod - Payment method used
 */
export const trackPurchase = (
  transactionId: string,
  revenue: number,
  items: EcommerceItem[],
  paymentMethod?: string
) => {
  pushEvent({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      currency: 'USD',
      value: revenue,
      items: items
    },
    payment_method: paymentMethod,
    page_path: window.location.pathname
  });
};
