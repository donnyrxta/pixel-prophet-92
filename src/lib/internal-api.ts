/**
 * Internal API Service
 * Client-side functions to interact with internal API endpoints
 */

const API_BASE = '/api/internal';

interface InternalApiOptions {
    password: string;
}

class InternalApiService {
    private password: string = '';

    setPassword(password: string) {
        this.password = password;
    }

    private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        if (!this.password) {
            throw new Error('API password not set. Call setPassword() first.');
        }

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.password}`,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(error.error || `HTTP ${response.status}`);
        }

        return response.json();
    }

    // Upload and parse leads from CSV
    async uploadLeads(csvContent: string) {
        return this.fetch<{
            success: boolean;
            leads: Lead[];
            totalParsed: number;
            validLeads: number;
        }>('/upload-leads', {
            method: 'POST',
            body: JSON.stringify({ csvContent }),
        });
    }

    // Generate AI emails for leads
    async generateEmails(leads: Lead[]) {
        return this.fetch<{
            success: boolean;
            results: GeneratedEmailResult[];
            processed: number;
            successful: number;
            failed: number;
        }>('/generate-email', {
            method: 'POST',
            body: JSON.stringify({ leads }),
        });
    }

    // Send campaign emails
    async sendCampaign(emails: EmailToSend[], campaignId?: string, dryRun = false) {
        return this.fetch<{
            success: boolean;
            results: SendResult[];
            summary: {
                total: number;
                sent: number;
                skipped: number;
                failed: number;
            };
        }>('/send-campaign', {
            method: 'POST',
            body: JSON.stringify({ emails, campaignId, dryRun }),
        });
    }

    // Create a new campaign
    async createCampaign(name: string, totalLeads: number = 0) {
        return this.fetch<{ campaign: Campaign }>('/campaign-logs?action=campaign', {
            method: 'POST',
            body: JSON.stringify({ name, totalLeads }),
        });
    }

    // Get all campaigns
    async getCampaigns() {
        return this.fetch<{ campaigns: Campaign[] }>('/campaign-logs?action=campaigns');
    }

    // Get outreach logs
    async getLogs(campaignId?: string, status?: string, limit = 50) {
        const params = new URLSearchParams({ action: 'logs', limit: String(limit) });
        if (campaignId) params.set('campaignId', campaignId);
        if (status) params.set('status', status);
        return this.fetch<{ logs: OutreachLog[] }>(`/campaign-logs?${params}`);
    }

    // Save outreach logs
    async saveLogs(logs: Partial<OutreachLog>[]) {
        return this.fetch<{ logs: OutreachLog[]; count: number }>('/campaign-logs?action=logs', {
            method: 'POST',
            body: JSON.stringify({ logs }),
        });
    }

    // Update campaign status
    async updateCampaign(id: string, updates: Partial<Campaign>) {
        return this.fetch<{ campaign: Campaign }>(`/campaign-logs?action=campaign&id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }
}

// Types
export interface Lead {
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

export interface GeneratedEmailResult {
    lead: Lead;
    email?: GeneratedEmail;
    error?: string;
}

export interface EmailToSend {
    toEmail: string;
    toName?: string;
    subject: string;
    body: string;
    leadScore?: number;
    propertyName?: string;
}

export interface SendResult {
    email: string;
    success: boolean;
    messageId?: string;
    error?: string;
    skipped?: boolean;
    skipReason?: string;
}

export interface Campaign {
    id: string;
    name: string;
    status: 'draft' | 'pending' | 'active' | 'completed' | 'paused';
    created_at: string;
    updated_at: string;
    total_leads: number;
    sent_count: number;
    follow_up_count: number;
}

export interface OutreachLog {
    id: string;
    campaign_id?: string;
    property_name?: string;
    contact_name?: string;
    email: string;
    website?: string;
    description?: string;
    rating?: number;
    review_count?: number;
    email_subject?: string;
    email_body?: string;
    follow_up_subject?: string;
    follow_up_body?: string;
    lead_score?: number;
    personalization_hook?: string;
    offer_asset?: string;
    status: string;
    requires_manual_review: boolean;
    sent_at?: string;
    follow_up_scheduled_at?: string;
    follow_up_sent_at?: string;
    created_at: string;
}

export const internalApi = new InternalApiService();
export default internalApi;
