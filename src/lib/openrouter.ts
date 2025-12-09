/**
 * OpenRouter AI Service
 * Generates personalized cold emails using Grok 4.1 via OpenRouter
 */

// Helper to get env vars safely in both Vite and Node
const getEnv = (key: string): string | undefined => {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
        return process.env[key];
    }
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
        return (import.meta as any).env[key];
    }
    return undefined;
};

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'x-ai/grok-4.1-free';

export interface LeadData {
    name: string;
    email: string;
    contactPerson?: string;
    website?: string;
    description?: string;
    rating?: number;
    numberOfReviews?: number;
    category?: string;
    address?: string;
}

export interface GeneratedEmail {
    initial_email: {
        subject: string;
        body: string;
        personalization_hook: string;
        lead_score: number;
    };
    follow_up_email: {
        subject: string;
        body: string;
        send_delay_hours: number;
    };
    offer_asset: {
        type: 'calculator' | 'audit' | 'both';
        reasoning: string;
    };
    automation_flags: {
        send_immediately: boolean;
        requires_manual_review: boolean;
    };
}

const SYSTEM_PROMPT = `You are SoHo Connect's AI Email Strategist. Your mission is to create hyper-personalized cold emails that convert hospitality decision-makers into discovery call bookings.

CORE PRINCIPLES:
- Use ONLY the provided company data—NO external web browsing
- Reference specific details from the property description, rating, or review count
- Every email must incorporate SoHo Connect's value prop: turning free Wi-Fi into a 23% repeat booking increase
- Subject lines must feel like a peer-to-peer question, not a sales pitch
- Body must use the '3 Questions' framework: reveal data blindness → quantify loss → offer audit/calculator
- Keep total length < 140 words for initial email, < 80 for follow-up
- Write at a 6th-grade reading level
- Never use 'excited,' 'thrilled,' or generic flattery
- Always end with a micro-commitment CTA ('Want me to send the breakdown?')

FORBIDDEN PHRASES:
- 'I saw that...'
- 'Congratulations on...'
- 'We help companies like yours...'
- 'Just following up...'

OUTPUT FORMAT (Strict JSON):
{
  "initial_email": {
    "subject": "String (max 50 chars)",
    "body": "String (max 140 words)",
    "personalization_hook": "String",
    "lead_score": "Number (1-100)"
  },
  "follow_up_email": {
    "subject": "String",
    "body": "String",
    "send_delay_hours": "Number"
  },
  "offer_asset": {
    "type": "calculator|audit|both",
    "reasoning": "String"
  },
  "automation_flags": {
    "send_immediately": "Boolean",
    "requires_manual_review": "Boolean"
  }
}`;

export async function generateColdEmail(lead: LeadData): Promise<GeneratedEmail> {
    const apiKey = getEnv('OPENROUTER_API_KEY');

    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const userContent = JSON.stringify({
        property_name: lead.name,
        contact_email: lead.email,
        contact_name: lead.contactPerson || 'there',
        website: lead.website,
        description: lead.description,
        tripadvisor_rating: lead.rating,
        review_count: lead.numberOfReviews,
        category: lead.category,
        location: lead.address,
        confidence_score: lead.rating ? 'high' : 'medium',
    });

    const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://sohoconnect.com',
        },
        body: JSON.stringify({
            model: MODEL,
            temperature: 0.35,
            max_tokens: 800,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userContent },
            ],
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} ${text}`);
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content;

    if (!aiContent) {
        throw new Error('Empty response from OpenRouter');
    }

    // Parse JSON, handling markdown code blocks
    const cleanJson = aiContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

    try {
        return JSON.parse(cleanJson) as GeneratedEmail;
    } catch (parseError) {
        throw new Error(`Failed to parse AI response: ${cleanJson}`);
    }
}

export async function generateBatchEmails(
    leads: LeadData[],
    rateLimitMs: number = 3000
): Promise<{ lead: LeadData; email?: GeneratedEmail; error?: string }[]> {
    const results: { lead: LeadData; email?: GeneratedEmail; error?: string }[] = [];

    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];

        try {
            const email = await generateColdEmail(lead);
            results.push({ lead, email });
        } catch (error) {
            results.push({ lead, error: error instanceof Error ? error.message : 'Unknown error' });
        }

        // Rate limiting between requests
        if (i < leads.length - 1) {
            await new Promise(resolve => setTimeout(resolve, rateLimitMs));
        }
    }

    return results;
}

export { SYSTEM_PROMPT };
