import { callOpenRouter, ChatMessage } from './openrouter';

const AI_MODEL_POOL = [
    'moonshotai/kimi-k2:free',           // Primary - strong reasoning
    'openai/gpt-oss-120b:free',          // Large context
    'openai/gpt-oss-20b:free',           // Faster fallback
    'mistralai/devstral-2512:free',      // Code/logic focused
    'z-ai/glm-4.5-air:free',             // Multilingual
    'amazon/nova-2-lite-v1:free',        // Fast responses
    'tngtech/tng-r1t-chimera:free',      // Reasoning
    'tngtech/deepseek-r1t2-chimera:free', // Deep reasoning
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free' // Uncensored
];

interface AIResponse {
    content: string;
    modelUsed: string;
    latencyMs: number;
}

export class AICalculatorService {
    private conversationHistory: ChatMessage[] = [];
    private currentModelIndex = 0;

    constructor(initialSystemPrompt?: string) {
        if (initialSystemPrompt) {
            this.conversationHistory.push({ role: 'system', content: initialSystemPrompt });
        }
    }

    private getNextModel(): string {
        const model = AI_MODEL_POOL[this.currentModelIndex];
        this.currentModelIndex = (this.currentModelIndex + 1) % AI_MODEL_POOL.length;
        return model;
    }

    private async tryGetCompletion(messages: ChatMessage[]): Promise<AIResponse> {
        const attempts = Math.min(3, AI_MODEL_POOL.length);
        let lastError: Error | null = null;

        // Try up to 3 different models
        for (let i = 0; i < attempts; i++) {
            const model = this.getNextModel();
            const start = Date.now();

            try {
                console.log(`Attempting AI generation with model: ${model}`);
                const content = await callOpenRouter(messages, {
                    model,
                    temperature: 0.7,
                    headers: {
                        'X-Title': 'SoHo Connect Calculator AI'
                    }
                });

                return {
                    content,
                    modelUsed: model,
                    latencyMs: Date.now() - start
                };
            } catch (error) {
                console.warn(`Model ${model} failed:`, error);
                lastError = error as Error;
                // Move to next model
                continue;
            }
        }

        throw lastError || new Error('All AI models failed');
    }

    public async sendMessage(userMessage: string): Promise<AIResponse> {
        this.conversationHistory.push({ role: 'user', content: userMessage });

        try {
            const response = await this.tryGetCompletion(this.conversationHistory);
            this.conversationHistory.push({ role: 'assistant', content: response.content });
            return response;
        } catch (error) {
            console.error('AI Service Fatal Error:', error);
            throw error;
        }
    }

    public getHistory(): ChatMessage[] {
        return [...this.conversationHistory];
    }

    public clearHistory(systemPrompt?: string) {
        this.conversationHistory = [];
        if (systemPrompt) {
            this.conversationHistory.push({ role: 'system', content: systemPrompt });
        }
    }
}

export const CALCULATOR_SYSTEM_PROMPT = `You are the SoHo Connect AI Assistant, an expert in WiFi marketing and monetization for hospitality and businesses. 
Your goal is to guide users through a quotation process by asking focused questions to understand their needs (BANT framework: Budget, Authority, Need, Timeline).

Guidelines:
1. Be helpful, professional, and concise. Avoid long paragraphs.
2. If the user mentions "Hospitality", ask about guest rooms and occupancy.
3. If "Retail", ask about foot traffic and dwell time.
4. Always frame value in terms of ROI (e.g., "Capturing guest data can increase direct bookings by 20%").
5. Do not make up pricing. If asked for a quote, say you are gathering details to generate an accurate estimate.
6. Use the following context about services:
   - Guest Data Capture: For building email lists (Mailchimp/Brevo integration).
   - Direct Booking Tool: For hotels to drive bookings via splash page.
   - Review Booster: Automated TripAdvisor/Google review requests.
   - Bandwidth Management: Limiting speeds per user.

When you have enough information (Venue Type, Estimated Guests, Goals), suggest a specific service package.`;
