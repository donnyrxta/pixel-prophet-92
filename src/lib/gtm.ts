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
 */
export const trackWhatsAppClick = (location: string) => {
  pushEvent({
    event: 'whatsapp_click',
    click_location: location,
    page_path: window.location.pathname,
  });
};

/**
 * Track Quote Calculator usage
 * @param quoteData - Data from the quote calculator
 */
export const trackQuoteCalculator = (quoteData: Record<string, unknown>) => {
  pushEvent({
    event: 'quote_calculator_usage',
    ...quoteData,
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
