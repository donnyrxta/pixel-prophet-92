/**
 * BANT Lead Scoring System
 * 
 * ARCHITECTURE: Rule-based lead qualification using the BANT framework
 * (Budget, Authority, Need, Timeline). This module provides fast, deterministic
 * scoring for structured form data. For AI-enhanced scoring with NLP analysis
 * of free-text fields, use the useAILeadScoring hook.
 * 
 * SCORING BREAKDOWN (100 points total):
 * - Budget (0-30): Explicit budget selection
 * - Authority (0-25): Decision-maker status
 * - Need (0-25): Service count + multi-service bonus
 * - Timeline (0-20): Urgency level
 * 
 * LEAD TIERS:
 * - Hot (70+): High intent, immediate follow-up
 * - Warm (40-69): Qualified, standard follow-up
 * - Cold (<40): Nurture sequence
 * 
 * INTEGRATION:
 * - Used by SmartQuoteCalculator for real-time scoring
 * - Used by ai-lead-scoring edge function as base score
 * - Used by Brevo integration for lead segmentation
 */

export interface BANTScore {
  budget: number; // 0-30 points
  authority: number; // 0-25 points
  need: number; // 0-25 points
  timeline: number; // 0-20 points
  total: number;
  tier: 'hot' | 'warm' | 'cold';
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  services: string[];
  budget: string;
  authority: string;
  timeline: string;
  additionalNotes?: string;
  projectDescription?: string;
  source?: string;
}

/**
 * Calculate BANT score from form data
 * Returns a score object with individual component scores and final tier
 */
export function calculateBANT(formData: Partial<QuoteFormData>): BANTScore {
  let budget = 0;
  let authority = 0;
  let need = 0;
  let timeline = 0;

  // BUDGET SCORING (0-30 points)
  // Higher budgets indicate stronger buying intent
  const budgetRanges: Record<string, number> = {
    'under-500': 5,
    '500-1000': 10,
    '1000-2500': 18,
    '2500-5000': 25,
    'over-5000': 30,
    // Alternative formats for flexibility
    'low': 5,
    'medium': 15,
    'high': 25,
    'enterprise': 30,
  };
  budget = budgetRanges[formData.budget?.toLowerCase() || ''] || 0;

  // AUTHORITY SCORING (0-25 points)
  // Decision-makers score highest
  const authorityLevels: Record<string, number> = {
    'owner': 25,
    'ceo': 25,
    'founder': 25,
    'director': 22,
    'manager': 18,
    'decision-maker': 25,
    'influencer': 15,
    'staff': 10,
    'researcher': 5,
    'other': 8
  };
  
  // Check explicit authority field
  if (formData.authority) {
    authority = authorityLevels[formData.authority.toLowerCase()] || 0;
  }
  
  // Enhance with job title if provided
  if (formData.jobTitle) {
    const titleLower = formData.jobTitle.toLowerCase();
    if (titleLower.includes('ceo') || titleLower.includes('owner') || titleLower.includes('founder')) {
      authority = Math.max(authority, 25);
    } else if (titleLower.includes('director') || titleLower.includes('head')) {
      authority = Math.max(authority, 22);
    } else if (titleLower.includes('manager')) {
      authority = Math.max(authority, 18);
    }
  }

  // NEED SCORING (0-25 points)
  // More services = higher need, with bonus for comprehensive projects
  const serviceCount = formData.services?.length || 0;
  need = 10 + (serviceCount * 3);
  if (serviceCount >= 3) need += 5; // Multi-service bonus
  need = Math.min(need, 25);

  // TIMELINE SCORING (0-20 points)
  // Urgent timelines score highest
  const timelineUrgency: Record<string, number> = {
    'urgent': 20,
    'asap': 20,
    'this-week': 20,
    'soon': 15,
    'this-month': 15,
    'month': 10,
    'next-month': 10,
    'planning': 5,
    'exploring': 3
  };
  timeline = timelineUrgency[formData.timeline?.toLowerCase() || ''] || 0;

  const total = budget + authority + need + timeline;

  // Determine tier based on total score
  let tier: 'hot' | 'warm' | 'cold' = 'cold';
  if (total >= 70) tier = 'hot';
  else if (total >= 40) tier = 'warm';

  return {
    budget,
    authority,
    need,
    timeline,
    total,
    tier
  };
}

/**
 * Get CSS classes for lead tier badge styling
 */
export function getLeadTierColor(tier: 'hot' | 'warm' | 'cold'): string {
  switch (tier) {
    case 'hot':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'warm':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'cold':
      return 'text-blue-600 bg-blue-50 border-blue-200';
  }
}

/**
 * Get human-readable label for lead tier
 */
export function getLeadTierLabel(tier: 'hot' | 'warm' | 'cold'): string {
  switch (tier) {
    case 'hot':
      return 'High Priority Lead';
    case 'warm':
      return 'Qualified Lead';
    case 'cold':
      return 'Nurture Lead';
  }
}

/**
 * Get priority level for lead routing
 */
export function getLeadPriority(tier: 'hot' | 'warm' | 'cold'): 'immediate' | 'high' | 'normal' | 'low' {
  switch (tier) {
    case 'hot':
      return 'immediate';
    case 'warm':
      return 'normal';
    case 'cold':
      return 'low';
  }
}

/**
 * Get recommended follow-up delay based on tier
 */
export function getFollowUpDelay(tier: 'hot' | 'warm' | 'cold'): string {
  switch (tier) {
    case 'hot':
      return '2 hours';
    case 'warm':
      return '24 hours';
    case 'cold':
      return '48 hours';
  }
}

/**
 * Get recommended contact channel based on tier
 */
export function getContactChannel(tier: 'hot' | 'warm' | 'cold'): 'whatsapp' | 'email' | 'phone' {
  switch (tier) {
    case 'hot':
      return 'whatsapp';
    case 'warm':
      return 'email';
    case 'cold':
      return 'email';
  }
}