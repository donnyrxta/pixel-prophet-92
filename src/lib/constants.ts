/**
 * Central constants for Soho Connect
 * Single source of truth for contact info, business details, and branding
 */

export const CONTACT_INFO = {
  phone: "+263714570414",
  whatsappNumber: "263714570414",
  email: "info@sohoconnect.co.zw",
  address: "7 Luck Street, Harare CBD",
  googleMapsUrl: "https://maps.google.com/?q=7+Luck+Street+Harare+CBD",
  businessHours: {
    weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
    saturday: "Saturday: 8:00 AM - 1:00 PM",
    sunday: "Sunday: Closed"
  }
} as const;

export const BUSINESS_INFO = {
  name: "Soho Connect",
  tagline: "Harare's Design & Print Partner",
  trustSignal: "Trusted by 127+ businesses",
  yearEstablished: "2018",
  servicesCount: "50+",
  responseTime: "We respond within 1 hour during business hours"
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/sohoconnect",
  instagram: "https://instagram.com/sohoconnect",
  linkedin: "https://linkedin.com/company/sohoconnect",
  twitter: "https://twitter.com/sohoconnect"
} as const;
