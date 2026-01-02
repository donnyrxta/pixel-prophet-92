/**
 * Soho Connect D2 - Business Constants
 * Single source of truth for contact info, business details, and branding
 * Updated for 2026 Intelligence Hub positioning
 */

export const CONTACT_INFO = {
  phone: "+263 714 570 414",
  phoneRaw: "263714570414",
  whatsappNumber: "263714570414",
  email: "info@sohoconnect.co.zw",
  address: "7 Luck St, Harare CBD",
  city: "Harare",
  country: "Zimbabwe",
  googleMapsUrl: "https://maps.google.com/?q=7+Luck+Street+Harare+CBD",
  businessHours: {
    weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
    saturday: "Saturday: 8:00 AM - 1:00 PM",
    sunday: "Sunday: Closed"
  },
  whatsappMessage: "Hi, I want to learn more about Soho Connect D2",
} as const;

export const BUSINESS_INFO = {
  name: "Soho Connect",
  tagline: "D2 — Harare",
  fullName: "Soho Connect D2",
  description: "Harare's premier Full-Stack Business Identity & Intelligence Hub",
  positioning: "Physical-to-Digital Intelligence System for Zimbabwean SMEs",
  trustSignal: "Trusted by 200+ businesses",
  socialProofCount: 200,
  yearEstablished: "2018",
  servicesCount: "50+",
  responseTime: "We respond within 2 hours",
  hero: {
    headline: "Stop Losing Customers, Stop Losing Stock—Start Measuring Growth",
    subheadline: "Physical-to-Digital Intelligence System for Zimbabwean SMEs",
    tagline: "Installed once. Monetizes forever. Even during load shedding.",
  },
  stats: {
    businesses: 200,
    roiRange: "2-5x",
    roiDays: 90,
    installHours: 48,
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/sohoconnect",
  instagram: "https://instagram.com/sohoconnect",
  linkedin: "https://linkedin.com/company/sohoconnect",
  twitter: "https://twitter.com/sohoconnect"
} as const;

export const PRICING = {
  starter: {
    name: "Starter",
    price: 99,
    currency: "USD",
    period: "month",
    target: "Micro business (1–5 staff)",
    features: [
      "WiFi Lead Capture (up to 500/mo)",
      "Basic Analytics Dashboard",
      "WhatsApp Notifications",
      "Email Support",
    ],
  },
  professional: {
    name: "Professional",
    price: 299,
    currency: "USD",
    period: "month",
    target: "Growing SME (6–25 staff)",
    features: [
      "Unlimited WiFi Lead Capture",
      "Location Heatmapping",
      "AI CCTV Integration",
      "WhatsApp Automation",
      "Priority Support",
      "Monthly Strategy Call",
    ],
    featured: true,
  },
  enterprise: {
    name: "Enterprise",
    price: 599,
    currency: "USD",
    period: "month",
    target: "Multi-location & chains",
    features: [
      "Everything in Professional",
      "Multi-Location Dashboard",
      "Custom Integrations",
      "Dedicated Account Manager",
      "On-site Training",
      "SLA Guarantee",
    ],
  },
} as const;

export const GUARANTEES = [
  {
    icon: "📊",
    title: "Performance Clause",
    description: "Target 2–5x ROI in 90 days",
    detail: "Or receive a pro-rata refund*",
  },
  {
    icon: "⚡",
    title: "Speed Clause",
    description: "Install within 48 hours",
    detail: "If later, first month is FREE",
  },
  {
    icon: "🎓",
    title: "Training Clause",
    description: "Staff operational after one session",
    detail: "If not, $299 training fee refunded",
  },
] as const;

export const INTELLIGENCE_LOOP = [
  {
    step: 1,
    icon: "📡",
    title: "Capture",
    subtitle: "Smart WiFi Marketing",
    description: "Capture WhatsApp, SMS or email leads on login. Offline capture during power cuts.",
  },
  {
    step: 2,
    icon: "📊",
    title: "Analyze",
    subtitle: "Location Intelligence",
    description: "Heatmaps, dwell time and conversion patterns to optimize layout & staffing.",
  },
  {
    step: 3,
    icon: "🛡️",
    title: "Protect",
    subtitle: "AI Security Integration",
    description: "CCTV analytics + mobile alerts that reduce theft and improve productivity.",
  },
  {
    step: 4,
    icon: "🚀",
    title: "Act",
    subtitle: "Automation & Payments",
    description: "WhatsApp automation + EcoCash/OneMoney integration for seamless transactions.",
  },
] as const;

export const PROBLEMS = [
  {
    icon: "📉",
    title: "Lost Customers",
    description: "Walk-ins leave without a trace. You can't retarget them.",
  },
  {
    icon: "🔓",
    title: "Theft & Leakage",
    description: "Stock disappears. Manual tracking fails. Margins bleed quietly.",
  },
  {
    icon: "🎲",
    title: "Guesswork Operations",
    description: "Floor plans, staffing, marketing—all based on intuition, not data.",
  },
] as const;

export const RESULTS = [
  {
    value: "2-5x",
    label: "ROI (Repeatable)",
    description: "Within 90 days post-install",
  },
  {
    value: "200+",
    label: "Local Installs",
    description: "Harare, Bulawayo, Mutare",
  },
  {
    value: "100%",
    label: "Satisfaction",
    description: "Money-back guarantee",
  },
] as const;

export const CASE_STUDIES = [
  {
    type: "Retail",
    result: "Customer counts up, theft down — CCTV + WiFi capture paid for itself in weeks.",
  },
  {
    type: "Restaurant",
    result: "Automation lifted repeat bookings and cut no-show rates.",
  },
  {
    type: "Multi-site Trader",
    result: "Inventory allocation improved with location data; margins rose.",
  },
] as const;

export const FOUNDER = {
  name: "Tatenda Chanakira",
  title: "Founder",
  quote: "I built Soho Connect because Zimbabwean businesses deserve tools that work in our reality — not a patched foreign product. We measure, we verify, we deliver.",
} as const;
