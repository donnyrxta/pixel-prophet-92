/**
 * Brevo Tracker Client-Side Utilities
 * 
 * Provides helper functions for interacting with the Brevo Tracker SDK
 * that's loaded in index.html. Use these to identify users and track
 * custom events for email campaign attribution.
 */

declare global {
  interface Window {
    sib?: {
      equeue: any[];
      client_key: string;
      email_id?: string;
    };
    sendinblue?: {
      identify?: (email: string, attributes?: Record<string, any>) => void;
      track?: (event: string, data?: Record<string, any>) => void;
      page?: (pageName: string, data?: Record<string, any>) => void;
    };
  }
}

/**
 * Check if Brevo Tracker is loaded and available
 */
export function isBrevoTrackerReady(): boolean {
  return !!(window.sib && window.sendinblue);
}

/**
 * Wait for Brevo Tracker to load
 */
export function waitForBrevoTracker(timeout = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isBrevoTrackerReady()) {
      resolve(true);
      return;
    }

    const checkInterval = setInterval(() => {
      if (isBrevoTrackerReady()) {
        clearInterval(checkInterval);
        resolve(true);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkInterval);
      resolve(false);
    }, timeout);
  });
}

/**
 * Identify a user to Brevo for personalized tracking
 * Call this after form submission or login
 * 
 * @param email - User's email address
 * @param attributes - Optional additional attributes (name, phone, etc.)
 */
export async function identifyUser(
  email: string,
  attributes?: Record<string, any>
): Promise<void> {
  try {
    const ready = await waitForBrevoTracker();
    if (!ready) {
      console.warn('[Brevo] Tracker not loaded, skipping identify');
      return;
    }

    // Set email for tracking
    if (window.sib) {
      window.sib.email_id = email;
    }

    // Call identify if available
    if (window.sendinblue?.identify) {
      window.sendinblue.identify(email, {
        ...attributes,
        identified_at: new Date().toISOString(),
      });
      console.log('[Brevo] User identified:', email);
    }
  } catch (error) {
    console.error('[Brevo] Failed to identify user:', error);
  }
}

/**
 * Track a custom event in Brevo
 * Use for conversion tracking, engagement metrics, etc.
 * 
 * @param eventName - Name of the event (e.g., 'quote_request', 'newsletter_signup')
 * @param data - Optional event data
 */
export async function trackBrevoClientEvent(
  eventName: string,
  data?: Record<string, any>
): Promise<void> {
  try {
    const ready = await waitForBrevoTracker();
    if (!ready) {
      console.warn('[Brevo] Tracker not loaded, skipping event:', eventName);
      return;
    }

    if (window.sendinblue?.track) {
      window.sendinblue.track(eventName, {
        ...data,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        referrer: document.referrer || 'direct',
      });
      console.log('[Brevo] Event tracked:', eventName, data);
    }
  } catch (error) {
    console.error('[Brevo] Failed to track event:', error);
  }
}

/**
 * Track a page view in Brevo
 * Call on route changes in SPA applications
 * 
 * @param pageName - Name of the page (e.g., 'Home', 'Services', 'Contact')
 * @param data - Optional page data
 */
export async function trackBrevoPageView(
  pageName: string,
  data?: Record<string, any>
): Promise<void> {
  try {
    const ready = await waitForBrevoTracker();
    if (!ready) {
      console.warn('[Brevo] Tracker not loaded, skipping page view:', pageName);
      return;
    }

    if (window.sendinblue?.page) {
      window.sendinblue.page(pageName, {
        ...data,
        url: window.location.href,
        path: window.location.pathname,
        title: document.title,
        referrer: document.referrer || 'direct',
      });
      console.log('[Brevo] Page view tracked:', pageName);
    }
  } catch (error) {
    console.error('[Brevo] Failed to track page view:', error);
  }
}

/**
 * Pre-defined event names for consistency
 */
export const BREVO_EVENTS = {
  // Lead capture events
  QUOTE_REQUEST: 'quote_request',
  CONTACT_FORM: 'contact_form_submit',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  
  // Engagement events
  CTA_CLICK: 'cta_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  PHONE_CLICK: 'phone_click',
  
  // E-commerce events
  PRODUCT_VIEW: 'product_view',
  ADD_TO_CART: 'add_to_cart',
  PURCHASE: 'purchase',
  
  // Content events
  SERVICE_VIEW: 'service_view',
  PORTFOLIO_VIEW: 'portfolio_view',
  CALCULATOR_COMPLETE: 'calculator_complete',
} as const;

export type BrevoEventName = typeof BREVO_EVENTS[keyof typeof BREVO_EVENTS];
