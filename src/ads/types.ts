export type Channel = 'web' | 'email' | 'social';

export interface Holiday {
  date: string; // ISO YYYY-MM-DD
  localName: string;
  name: string;
  countryCode: string;
}

export type AdTemplateId = 'black_friday_title' | 'generic_banner';

export interface AdVariant {
  id: string; // variant id within a campaign
  templateId: AdTemplateId;
  props?: Record<string, unknown>; // template-specific props
  weight?: number; // optional weight for random assignment
}

export type CampaignStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'scheduled'
  | 'deployed'
  | 'completed';

export interface Campaign {
  id: string;
  holiday?: Holiday; // optional; can be manual campaigns
  title: string;
  description?: string;
  countryCode?: string;
  channels: Channel[];
  variants: AdVariant[];
  status: CampaignStatus;
  scheduledAt?: string; // ISO datetime for initial deployment
  scheduleWindows?: string[]; // additional times before holiday
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  metrics?: PerformanceMetrics;
}

export interface PerformanceMetrics {
  impressions: number;
  clicks: number;
  conversions?: number;
}

export interface ABTestAssignment {
  visitorId: string;
  variantId: string;
}

export interface PlannerConfig {
  defaultCountries: string[]; // ISO country codes
  monthsAhead: number;
  timezone: string; // IANA TZ, e.g. 'Africa/Harare'
}

export const DEFAULT_PLANNER_CONFIG: PlannerConfig = {
  defaultCountries: ['ZW'],
  monthsAhead: 6,
  timezone: 'Africa/Harare',
};

