/**
 * Centralized Pricing & Service Catalog
 * This is the single source of truth for all quote calculator data.
 */

// ============== Types ==============

export interface ServiceOption {
    id: string;
    name: string;
    category: ServiceCategory;
    basePrice: number;
    maxPrice: number;
    turnaround: string;
    icon: string;
    popular?: boolean;
    description?: string;
}

export type ServiceCategory = 'Printing' | 'Branding' | 'Digital' | 'Signage' | 'Web';

export interface BudgetRange {
    value: string;
    label: string;
    points: number;
}

export interface AuthorityLevel {
    value: string;
    label: string;
    points: number;
}

export interface Timeline {
    value: string;
    label: string;
    points: number;
}

// ============== Service Catalog ==============

export const SERVICE_CATALOG: ServiceOption[] = [
    // Printing
    { id: 'business-cards', name: 'Business Cards', category: 'Printing', basePrice: 50, maxPrice: 200, turnaround: '2-3 days', icon: '💼', popular: true },
    { id: 'flyers-brochures', name: 'Flyers & Brochures', category: 'Printing', basePrice: 100, maxPrice: 500, turnaround: '3-5 days', icon: '📄' },
    { id: 'banners-posters', name: 'Banners & Posters', category: 'Printing', basePrice: 150, maxPrice: 800, turnaround: '3-5 days', icon: '🎯' },
    { id: 'packaging', name: 'Custom Packaging', category: 'Printing', basePrice: 300, maxPrice: 2000, turnaround: '1-2 weeks', icon: '📦' },

    // Branding
    { id: 'logo-design', name: 'Logo Design', category: 'Branding', basePrice: 200, maxPrice: 1000, turnaround: '5-7 days', icon: '🎨', popular: true },
    { id: 'brand-guidelines', name: 'Brand Guidelines', category: 'Branding', basePrice: 500, maxPrice: 2500, turnaround: '1-2 weeks', icon: '📋' },
    { id: 'visual-identity', name: 'Complete Visual Identity', category: 'Branding', basePrice: 1000, maxPrice: 5000, turnaround: '2-4 weeks', icon: '✨' },

    // Digital
    { id: 'social-media', name: 'Social Media Graphics', category: 'Digital', basePrice: 150, maxPrice: 600, turnaround: '3-5 days', icon: '📱', popular: true },
    { id: 'email-campaigns', name: 'Email Campaign Design', category: 'Digital', basePrice: 200, maxPrice: 800, turnaround: '5-7 days', icon: '📧' },
    { id: 'digital-ads', name: 'Digital Ad Creatives', category: 'Digital', basePrice: 250, maxPrice: 1000, turnaround: '3-5 days', icon: '🎬' },

    // Signage
    { id: 'shop-signage', name: 'Shop Signage', category: 'Signage', basePrice: 500, maxPrice: 3000, turnaround: '1-2 weeks', icon: '🏪' },
    { id: 'vehicle-branding', name: 'Vehicle Branding', category: 'Signage', basePrice: 800, maxPrice: 4000, turnaround: '1-2 weeks', icon: '🚗' },
    { id: 'exhibition-stands', name: 'Exhibition Stands', category: 'Signage', basePrice: 1000, maxPrice: 5000, turnaround: '2-3 weeks', icon: '🎪' },

    // Web
    { id: 'website-design', name: 'Website Design', category: 'Web', basePrice: 800, maxPrice: 5000, turnaround: '2-4 weeks', icon: '💻' },
    { id: 'landing-page', name: 'Landing Page', category: 'Web', basePrice: 300, maxPrice: 1500, turnaround: '1 week', icon: '🌐' },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = ['Printing', 'Branding', 'Digital', 'Signage', 'Web'];

// ============== Budget Ranges ==============

export const BUDGET_RANGES: BudgetRange[] = [
    { value: 'under-500', label: 'Under $500', points: 3 },
    { value: '500-1000', label: '$500 - $1,000', points: 5 },
    { value: '1000-2500', label: '$1,000 - $2,500', points: 7 },
    { value: '2500-5000', label: '$2,500 - $5,000', points: 9 },
    { value: 'over-5000', label: 'Over $5,000', points: 10 },
];

// ============== Authority Levels ==============

export const AUTHORITY_LEVELS: AuthorityLevel[] = [
    { value: 'decision-maker', label: 'Business Owner / Decision Maker', points: 10 },
    { value: 'influencer', label: 'Manager / Influencer', points: 7 },
    { value: 'researcher', label: 'Employee / Researcher', points: 3 },
];

// ============== Timelines ==============

export const TIMELINES: Timeline[] = [
    { value: 'urgent', label: 'Urgent (Within 1 week)', points: 10 },
    { value: 'soon', label: 'Soon (1-2 weeks)', points: 8 },
    { value: 'month', label: 'Within a month', points: 5 },
    { value: 'planning', label: 'Just planning ahead', points: 2 },
];

// ============== Goal Options (New Step 1) ==============

export interface GoalOption {
    id: string;
    title: string;
    description: string;
    icon: string;
    recommendedCategories: ServiceCategory[];
}

export const GOAL_OPTIONS: GoalOption[] = [
    {
        id: 'launch-new',
        title: 'Launch Something New',
        description: 'New business, product, or campaign',
        icon: '🚀',
        recommendedCategories: ['Branding', 'Printing', 'Digital'],
    },
    {
        id: 'refresh-brand',
        title: 'Refresh My Brand',
        description: 'Update or modernize existing materials',
        icon: '🔄',
        recommendedCategories: ['Branding', 'Printing'],
    },
    {
        id: 'reorder',
        title: 'Reorder / Stock Up',
        description: 'Same as before, just more copies',
        icon: '📦',
        recommendedCategories: ['Printing', 'Signage'],
    },
];

// ============== Calculation Utilities ==============

/**
 * Calculate quote estimate based on selected services.
 * Applies package discounts: 10% for 2 services, 15% for 3+.
 */
export function calculateQuoteEstimate(selectedServiceIds: string[]): {
    subtotal: number;
    discount: number;
    discountPercent: number;
    total: number;
    roiEstimate: number;
} {
    const selectedServices = SERVICE_CATALOG.filter(s => selectedServiceIds.includes(s.id));
    const subtotal = selectedServices.reduce((sum, s) => sum + s.basePrice, 0);

    let discountPercent = 0;
    if (selectedServiceIds.length >= 3) {
        discountPercent = 15;
    } else if (selectedServiceIds.length >= 2) {
        discountPercent = 10;
    }

    const discount = subtotal * (discountPercent / 100);
    const total = subtotal - discount;

    // Conservative ROI estimate: 3-5x baseline
    const roiMultiplier = 3.5;
    const roiEstimate = Math.round(total * roiMultiplier);

    return { subtotal, discount, discountPercent, total, roiEstimate };
}

/**
 * Calculate lead score based on form data.
 * Returns a score from 0-100.
 */
export interface LeadScoreInput {
    budget?: string;
    authority?: string;
    timeline?: string;
    quoteValue: number;
    pageViews?: number;
    timeOnSite?: number;
    trigger?: string;
}

export function calculateLeadScore(input: LeadScoreInput): number {
    let score = 0;

    // Budget points
    const budgetOption = BUDGET_RANGES.find(b => b.value === input.budget);
    score += budgetOption?.points || 0;

    // Authority points
    const authorityOption = AUTHORITY_LEVELS.find(a => a.value === input.authority);
    score += authorityOption?.points || 0;

    // Timeline points
    const timelineOption = TIMELINES.find(t => t.value === input.timeline);
    score += timelineOption?.points || 0;

    // Quote value points
    if (input.quoteValue > 2500) score += 10;
    else if (input.quoteValue > 1000) score += 7;
    else if (input.quoteValue > 500) score += 5;
    else score += 3;

    // Engagement points
    const pageViews = input.pageViews || 1;
    const timeOnSite = input.timeOnSite || 0;

    if (pageViews >= 5) score += 5;
    else if (pageViews >= 3) score += 3;
    else score += 1;

    if (timeOnSite > 300) score += 5;
    else if (timeOnSite > 120) score += 3;
    else score += 1;

    // Trigger points
    if (input.trigger === 'button') score += 8;
    else if (input.trigger === 'ai') score += 6;
    else score += 4;

    return Math.min(score, 100);
}

/**
 * Get lead tier based on score.
 */
export type LeadTier = 'hot' | 'warm' | 'cold';

export function getLeadTier(score: number): LeadTier {
    if (score >= 70) return 'hot';
    if (score >= 40) return 'warm';
    return 'cold';
}

/**
 * Get response time based on lead tier.
 */
export function getResponseTime(tier: LeadTier): string {
    switch (tier) {
        case 'hot': return '2 hours';
        case 'warm': return '24 hours';
        case 'cold': return '48 hours';
    }
}

/**
 * Get service by ID.
 */
export function getServiceById(id: string): ServiceOption | undefined {
    return SERVICE_CATALOG.find(s => s.id === id);
}

/**
 * Get services by category.
 */
export function getServicesByCategory(category: ServiceCategory): ServiceOption[] {
    return SERVICE_CATALOG.filter(s => s.category === category);
}
