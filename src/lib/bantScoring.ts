/**
 * BANT Lead Scoring System
 * Scores leads from 0-100 based on Budget, Authority, Need, Timeline
 * Implements the Soho Connect Revenue Machine qualification framework
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
  services: string[];
  budget: string;
  authority: string;
  timeline: string;
  additionalNotes?: string;
}

export function calculateBANT(formData: Partial<QuoteFormData>): BANTScore {
  let budget = 0;
  let authority = 0;
  let need = 0;
  let timeline = 0;

  // BUDGET SCORING (0-30 points)
  const budgetRanges: Record<string, number> = {
    'under-500': 5,
    '500-1000': 10,
    '1000-2500': 18,
    '2500-5000': 25,
    'over-5000': 30
  };
  budget = budgetRanges[formData.budget || ''] || 0;

  // AUTHORITY SCORING (0-25 points)
  const authorityLevels: Record<string, number> = {
    'owner': 25,
    'director': 22,
    'manager': 18,
    'decision-maker': 25,
    'influencer': 18,
    'staff': 12,
    'researcher': 8,
    'other': 8
  };
  authority = authorityLevels[formData.authority || ''] || 0;

  // NEED SCORING (0-25 points)
  const serviceCount = formData.services?.length || 0;
  need = 10 + (serviceCount * 3);
  if (serviceCount >= 3) need += 5;
  need = Math.min(need, 25);

  // TIMELINE SCORING (0-20 points)
  const timelineUrgency: Record<string, number> = {
    'urgent': 20, // This week
    'soon': 15, // This month
    'month': 10, // Next 1-3 months
    'planning': 5 // Just looking
  };
  timeline = timelineUrgency[formData.timeline || ''] || 0;

  const total = budget + authority + need + timeline;

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
 * Get lead tier color for UI display
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
 * Get lead tier label for display
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