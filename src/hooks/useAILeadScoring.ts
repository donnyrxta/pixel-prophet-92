/**
 * AI Lead Scoring Hook
 * 
 * ARCHITECTURE: Provides React integration for the AI-powered lead scoring
 * edge function. Combines rule-based BANT scoring with AI enhancement for
 * intelligent lead qualification and routing.
 * 
 * USAGE:
 * const { scoreLeadWithAI, isScoring, error } = useAILeadScoring();
 * const result = await scoreLeadWithAI(formData);
 * 
 * FEATURES:
 * - Async scoring with loading states
 * - Fallback to basic BANT if AI unavailable
 * - Type-safe result handling
 * - Error recovery with graceful degradation
 */

import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { calculateBANT, type BANTScore, type QuoteFormData } from "@/lib/bantScoring";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
export interface AIEnhancement {
  urgencySignals: string[];
  painPoints: string[];
  buyingSignals: string[];
  riskFactors: string[];
  recommendedApproach: string;
  confidenceScore: number;
}

export interface LeadRouting {
  channel: "whatsapp" | "email" | "phone";
  priority: "immediate" | "high" | "normal" | "low";
  assignTo: string;
  followUpDelay: string;
}

export interface AILeadScoringResult {
  baseScore: BANTScore;
  aiEnhancement: AIEnhancement;
  finalScore: number;
  finalTier: "hot" | "warm" | "cold";
  routing: LeadRouting;
  brefoTags: string[];
  timestamp: string;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================
export function useAILeadScoring() {
  const [isScoring, setIsScoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Score a lead using AI-enhanced BANT analysis
   * Falls back to basic BANT scoring if AI is unavailable
   */
  const scoreLeadWithAI = useCallback(async (
    formData: Partial<QuoteFormData> & { 
      projectDescription?: string;
      source?: string;
    }
  ): Promise<AILeadScoringResult> => {
    setIsScoring(true);
    setError(null);

    try {
      // Call the AI lead scoring edge function
      const { data, error: invokeError } = await supabase.functions.invoke(
        "ai-lead-scoring",
        {
          body: formData,
        }
      );

      if (invokeError) {
        throw new Error(invokeError.message);
      }

      console.log("AI Lead Scoring Result:", data);
      return data as AILeadScoringResult;

    } catch (err) {
      console.warn("AI scoring failed, falling back to basic BANT:", err);
      setError(err instanceof Error ? err.message : "Scoring failed");

      // Fallback to basic BANT scoring
      const baseScore = calculateBANT(formData);
      
      const fallbackResult: AILeadScoringResult = {
        baseScore,
        aiEnhancement: {
          urgencySignals: [],
          painPoints: [],
          buyingSignals: [],
          riskFactors: [],
          recommendedApproach: "Standard follow-up based on BANT score",
          confidenceScore: 0.5,
        },
        finalScore: baseScore.total,
        finalTier: baseScore.tier,
        routing: {
          channel: baseScore.tier === "hot" ? "whatsapp" : "email",
          priority: baseScore.tier === "hot" ? "immediate" : 
                   baseScore.tier === "warm" ? "normal" : "low",
          assignTo: baseScore.tier === "hot" ? "sales_lead" : "nurture_sequence",
          followUpDelay: baseScore.tier === "hot" ? "2 hours" : 
                        baseScore.tier === "warm" ? "24 hours" : "48 hours",
        },
        brefoTags: [`lead_tier_${baseScore.tier}`],
        timestamp: new Date().toISOString(),
      };

      return fallbackResult;

    } finally {
      setIsScoring(false);
    }
  }, []);

  /**
   * Quick score without AI (uses basic BANT only)
   * Useful for real-time form validation feedback
   */
  const quickScore = useCallback((formData: Partial<QuoteFormData>): BANTScore => {
    return calculateBANT(formData);
  }, []);

  /**
   * Get routing recommendation based on score
   */
  const getRoutingForScore = useCallback((score: number, tier: "hot" | "warm" | "cold"): LeadRouting => {
    if (tier === "hot") {
      return {
        channel: "whatsapp",
        priority: "immediate",
        assignTo: "sales_lead",
        followUpDelay: "2 hours",
      };
    }
    
    if (tier === "warm") {
      return {
        channel: "email",
        priority: "normal",
        assignTo: "sales_team",
        followUpDelay: "24 hours",
      };
    }

    return {
      channel: "email",
      priority: "low",
      assignTo: "nurture_sequence",
      followUpDelay: "48 hours",
    };
  }, []);

  return {
    scoreLeadWithAI,
    quickScore,
    getRoutingForScore,
    isScoring,
    error,
  };
}

export default useAILeadScoring;
