import { ServiceCategory } from './pricing';

export type QuestionType = 'single' | 'multiple';

export interface Option {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    value: any;
    nextQuestionId?: string; // If null, end of flow
    recommendations?: string[]; // Service IDs to recommend if selected
}

export interface Question {
    id: string;
    text: string;
    subtext?: string;
    type: QuestionType;
    options: Option[];
}

export interface LogicFlow {
    startQuestionId: string;
    questions: Record<string, Question>;
}

// Map categories to their specific consultation flows
export const CONSULTATION_FLOWS: Record<ServiceCategory | 'General', LogicFlow> = {
    'General': {
        startQuestionId: 'goal',
        questions: {
            'goal': {
                id: 'goal',
                text: "What is your primary goal right now?",
                subtext: "This helps us recommend the right strategy.",
                type: 'single',
                options: [
                    {
                        id: 'launch',
                        label: 'Launch a New Business',
                        icon: '🚀',
                        value: 'launch',
                        nextQuestionId: 'budget_tier',
                        recommendations: ['brand-identity-pack', 'business-cards-500']
                    },
                    {
                        id: 'grow',
                        label: 'Grow Existing Business',
                        icon: '📈',
                        value: 'grow',
                        nextQuestionId: 'growth_focus',
                        recommendations: []
                    },
                    {
                        id: 'event',
                        label: 'Prepare for an Event',
                        icon: '🎉',
                        value: 'event',
                        nextQuestionId: 'event_type',
                        recommendations: ['flyers-a5', 'banners-pvc']
                    }
                ]
            },
            'budget_tier': {
                id: 'budget_tier',
                text: "What is your approximate budget range?",
                subtext: "We have options for every stage.",
                type: 'single',
                options: [
                    { id: 'starter', label: 'Starter ($100 - $300)', value: 'low', description: 'Essential basics' },
                    { id: 'standard', label: 'Standard ($300 - $1k)', value: 'medium', description: 'Professional kit' },
                    { id: 'pro', label: 'Premium ($1k+)', value: 'high', description: 'Full scale' }
                ]
            }
        }
    },
    'Branding': {
        startQuestionId: 'brand_stage',
        questions: {
            'brand_stage': {
                id: 'brand_stage',
                text: "Where is your brand currently?",
                type: 'single',
                options: [
                    {
                        id: 'new',
                        label: 'Brand New (Starting from Scratch)',
                        icon: '✨',
                        value: 'new',
                        nextQuestionId: 'brand_needs_new',
                        recommendations: ['logo-design']
                    },
                    {
                        id: 'existing',
                        label: 'Established (Need a Refresh)',
                        icon: '🔄',
                        value: 'refresh',
                        nextQuestionId: 'brand_needs_refresh',
                        recommendations: ['brand-style-guide']
                    }
                ]
            },
            'brand_needs_new': {
                id: 'brand_needs_new',
                text: "What are your immediate priorities?",
                type: 'multiple',
                options: [
                    { id: 'logo', label: 'Logo Only', value: 'logo', recommendations: ['logo-design'] },
                    { id: 'full_identity', label: 'Full Identity (Logo, Colors, Fonts)', value: 'identity', recommendations: ['brand-identity-pack'] },
                    { id: 'stationery', label: 'Stationery (Cards, Letterheads)', value: 'stationery', recommendations: ['business-cards-500', 'flyers-a5'] }
                ]
            },
            'brand_needs_refresh': {
                id: 'brand_needs_refresh',
                text: "What needs updating?",
                type: 'multiple',
                options: [
                    { id: 'modernize', label: 'Modernize Logo', value: 'modernize', recommendations: ['logo-design'] },
                    { id: 'consistency', label: 'Fix Inconsistency', value: 'consistency', recommendations: ['brand-style-guide'] },
                    { id: 'expansion', label: 'New Assets for Campaign', value: 'expansion', recommendations: ['flyers-a5', 'vehicle-branding-full'] }
                ]
            }
        }
    },
    // Default fallbacks for other categories to prevent errors
    'Printing': { startQuestionId: 'goal', questions: {} },
    'Digital': { startQuestionId: 'goal', questions: {} },
    'Signage': { startQuestionId: 'goal', questions: {} },
    'Designing': { startQuestionId: 'goal', questions: {} },
    'Webstore': { startQuestionId: 'goal', questions: {} },
    'Installation': { startQuestionId: 'goal', questions: {} }
};

// Merge general questions into specific flows if needed
Object.keys(CONSULTATION_FLOWS).forEach(key => {
    if (key !== 'General') {
        const flow = CONSULTATION_FLOWS[key as ServiceCategory];
        // If a category has no questions defined (placeholder), point it to General flow
        if (Object.keys(flow.questions).length === 0) {
            flow.startQuestionId = CONSULTATION_FLOWS['General'].startQuestionId;
            flow.questions = CONSULTATION_FLOWS['General'].questions;
        }
    }
});
