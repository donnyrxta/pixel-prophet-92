/**
 * AI-Powered Lead Scoring Edge Function
 * 
 * ARCHITECTURE: Enhances basic BANT scoring with Lovable AI for intelligent
 * lead qualification. Uses NLP to analyze free-text fields (company description,
 * project notes, urgency signals) for more accurate scoring.
 * 
 * DATA FLOW:
 * 1. Receive quote request data from client/Brevo webhook
 * 2. Calculate base BANT score using rule-based system
 * 3. Enhance with AI analysis of qualitative data
 * 4. Return comprehensive lead score with routing recommendation
 * 
 * SCORING FRAMEWORK (BANT - 100 points total):
 * - Budget (0-30): Explicit budget range + inferred buying power
 * - Authority (0-25): Job title analysis + decision-maker signals
 * - Need (0-25): Service count + urgency language + pain points
 * - Timeline (0-20): Explicit timeline + urgency indicators
 * 
 * LEAD TIERS:
 * - Hot (70+): Immediate WhatsApp + Slack alert
 * - Warm (40-69): 24h email follow-up
 * - Cold (<40): Nurture sequence
 * 
 * SECURITY:
 * - Input validation and sanitization
 * - No PII stored in logs
 * - POPIA/GDPR compliant data handling
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ============================================================================
// CORS CONFIGURATION
// ============================================================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface QuoteFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  services: string[];
  budget: string;
  authority?: string;
  timeline: string;
  additionalNotes?: string;
  projectDescription?: string;
  source?: string; // e.g., "website", "whatsapp", "referral"
}

interface BANTScore {
  budget: number;
  authority: number;
  need: number;
  timeline: number;
  total: number;
  tier: "hot" | "warm" | "cold";
}

interface AIEnhancement {
  urgencySignals: string[];
  painPoints: string[];
  buyingSignals: string[];
  riskFactors: string[];
  recommendedApproach: string;
  confidenceScore: number;
}

interface LeadScoringResult {
  baseScore: BANTScore;
  aiEnhancement: AIEnhancement;
  finalScore: number;
  finalTier: "hot" | "warm" | "cold";
  routing: {
    channel: "whatsapp" | "email" | "phone";
    priority: "immediate" | "high" | "normal" | "low";
    assignTo: string;
    followUpDelay: string;
  };
  brefoTags: string[];
  timestamp: string;
}

// ============================================================================
// RULE-BASED BANT SCORING
// Deterministic scoring for structured form fields
// ============================================================================
function calculateBaseBantScore(data: QuoteFormData): BANTScore {
  let budget = 0;
  let authority = 0;
  let need = 0;
  let timeline = 0;

  // BUDGET SCORING (0-30 points)
  const budgetRanges: Record<string, number> = {
    "under-500": 5,
    "500-1000": 10,
    "1000-2500": 18,
    "2500-5000": 25,
    "over-5000": 30,
    // Alternative formats
    "low": 5,
    "medium": 15,
    "high": 25,
    "enterprise": 30,
  };
  budget = budgetRanges[data.budget?.toLowerCase()] || 0;

  // AUTHORITY SCORING (0-25 points)
  const authorityLevels: Record<string, number> = {
    "owner": 25,
    "ceo": 25,
    "director": 22,
    "manager": 18,
    "decision-maker": 25,
    "influencer": 15,
    "staff": 10,
    "researcher": 5,
    "other": 8,
  };
  
  // Check explicit authority field first
  if (data.authority) {
    authority = authorityLevels[data.authority.toLowerCase()] || 0;
  }
  
  // Enhance with job title analysis if provided
  if (data.jobTitle) {
    const titleLower = data.jobTitle.toLowerCase();
    if (titleLower.includes("ceo") || titleLower.includes("owner") || titleLower.includes("founder")) {
      authority = Math.max(authority, 25);
    } else if (titleLower.includes("director") || titleLower.includes("head")) {
      authority = Math.max(authority, 22);
    } else if (titleLower.includes("manager")) {
      authority = Math.max(authority, 18);
    }
  }

  // NEED SCORING (0-25 points)
  const serviceCount = data.services?.length || 0;
  need = 10 + (serviceCount * 3);
  if (serviceCount >= 3) need += 5; // Multi-service bonus
  need = Math.min(need, 25);

  // TIMELINE SCORING (0-20 points)
  const timelineUrgency: Record<string, number> = {
    "urgent": 20,
    "asap": 20,
    "this-week": 20,
    "soon": 15,
    "this-month": 15,
    "month": 10,
    "next-month": 10,
    "planning": 5,
    "exploring": 3,
  };
  timeline = timelineUrgency[data.timeline?.toLowerCase()] || 0;

  const total = budget + authority + need + timeline;

  let tier: "hot" | "warm" | "cold" = "cold";
  if (total >= 70) tier = "hot";
  else if (total >= 40) tier = "warm";

  return { budget, authority, need, timeline, total, tier };
}

// ============================================================================
// AI ENHANCEMENT PROMPT
// Uses structured output for reliable parsing
// ============================================================================
const AI_SCORING_PROMPT = `You are an expert B2B sales qualification analyst specializing in the Zimbabwe market. 
Analyze the following lead data and extract sales intelligence.

CONTEXT: Soho Connect is a design, print, and marketing agency in Harare, Zimbabwe.
Target clients: SMEs, startups, corporates needing branding, printing, digital marketing.

TASK: Analyze the provided lead information and identify:
1. Urgency signals (words/phrases indicating time pressure)
2. Pain points (business challenges they're facing)
3. Buying signals (indicators of purchase intent)
4. Risk factors (red flags that might indicate low conversion potential)
5. Recommended sales approach based on the lead profile

Be specific to the Zimbabwe business context. Consider:
- Load-shedding impacts on business urgency
- Cash economy constraints
- Local market references (Harare, Bulawayo, etc.)
- Common SME challenges

Respond with a JSON object in this exact format:
{
  "urgencySignals": ["signal1", "signal2"],
  "painPoints": ["pain1", "pain2"],
  "buyingSignals": ["signal1", "signal2"],
  "riskFactors": ["risk1", "risk2"],
  "recommendedApproach": "Brief recommendation for sales team",
  "confidenceScore": 0.85
}`;

// ============================================================================
// AI ENHANCEMENT FUNCTION
// Calls Lovable AI to analyze qualitative lead data
// ============================================================================
async function getAIEnhancement(data: QuoteFormData): Promise<AIEnhancement> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  
  // Default enhancement if AI is unavailable
  const defaultEnhancement: AIEnhancement = {
    urgencySignals: [],
    painPoints: [],
    buyingSignals: [],
    riskFactors: [],
    recommendedApproach: "Standard follow-up based on BANT score",
    confidenceScore: 0.5,
  };

  if (!LOVABLE_API_KEY) {
    console.warn("LOVABLE_API_KEY not configured, using base scoring only");
    return defaultEnhancement;
  }

  // Skip AI analysis if no qualitative data to analyze
  const hasQualitativeData = data.additionalNotes || data.projectDescription || data.company;
  if (!hasQualitativeData) {
    return defaultEnhancement;
  }

  try {
    // Construct lead summary for AI analysis (no PII)
    const leadSummary = {
      services: data.services,
      budget: data.budget,
      timeline: data.timeline,
      companyType: data.company ? "provided" : "not provided",
      notes: data.additionalNotes?.slice(0, 500), // Limit length
      projectDescription: data.projectDescription?.slice(0, 500),
      source: data.source,
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: AI_SCORING_PROMPT },
          { role: "user", content: `Analyze this lead:\n${JSON.stringify(leadSummary, null, 2)}` },
        ],
        max_tokens: 500,
        temperature: 0.3, // Low temperature for consistent analysis
      }),
    });

    if (!response.ok) {
      console.error(`AI enhancement failed: ${response.status}`);
      return defaultEnhancement;
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      return defaultEnhancement;
    }

    // Parse JSON from AI response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("Could not parse AI response as JSON");
      return defaultEnhancement;
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      urgencySignals: parsed.urgencySignals || [],
      painPoints: parsed.painPoints || [],
      buyingSignals: parsed.buyingSignals || [],
      riskFactors: parsed.riskFactors || [],
      recommendedApproach: parsed.recommendedApproach || defaultEnhancement.recommendedApproach,
      confidenceScore: Math.min(1, Math.max(0, parsed.confidenceScore || 0.5)),
    };

  } catch (error) {
    console.error("AI enhancement error:", error);
    return defaultEnhancement;
  }
}

// ============================================================================
// LEAD ROUTING LOGIC
// Determines follow-up channel and priority based on score
// ============================================================================
function determineRouting(finalScore: number, tier: "hot" | "warm" | "cold", aiEnhancement: AIEnhancement) {
  const hasUrgency = aiEnhancement.urgencySignals.length > 0;
  const hasBuyingSignals = aiEnhancement.buyingSignals.length >= 2;
  const hasRisks = aiEnhancement.riskFactors.length >= 2;

  if (tier === "hot") {
    return {
      channel: "whatsapp" as const,
      priority: "immediate" as const,
      assignTo: "sales_lead",
      followUpDelay: "2 hours",
    };
  }

  if (tier === "warm") {
    // Upgrade warm leads with strong buying signals
    if (hasBuyingSignals && !hasRisks) {
      return {
        channel: "whatsapp" as const,
        priority: "high" as const,
        assignTo: "sales_team",
        followUpDelay: "4 hours",
      };
    }
    return {
      channel: "email" as const,
      priority: "normal" as const,
      assignTo: "sales_team",
      followUpDelay: "24 hours",
    };
  }

  // Cold leads
  if (hasUrgency) {
    // Cold but urgent - worth a quick check
    return {
      channel: "email" as const,
      priority: "normal" as const,
      assignTo: "nurture_sequence",
      followUpDelay: "24 hours",
    };
  }

  return {
    channel: "email" as const,
    priority: "low" as const,
    assignTo: "nurture_sequence",
    followUpDelay: "48 hours",
  };
}

// ============================================================================
// BREVO TAG GENERATION
// Creates tags for CRM segmentation
// ============================================================================
function generateBrevoTags(data: QuoteFormData, tier: string, aiEnhancement: AIEnhancement): string[] {
  const tags: string[] = [];

  // Lead tier tag
  tags.push(`lead_tier_${tier}`);

  // Service tags
  data.services?.forEach((service) => {
    tags.push(`service_${service.toLowerCase().replace(/\s+/g, "_")}`);
  });

  // Budget tag
  if (data.budget) {
    tags.push(`budget_${data.budget.toLowerCase().replace(/\s+/g, "_")}`);
  }

  // Timeline tag
  if (data.timeline) {
    tags.push(`timeline_${data.timeline.toLowerCase()}`);
  }

  // Source tag
  if (data.source) {
    tags.push(`source_${data.source.toLowerCase()}`);
  }

  // AI-derived tags
  if (aiEnhancement.urgencySignals.length > 0) {
    tags.push("signal_urgent");
  }
  if (aiEnhancement.buyingSignals.length >= 2) {
    tags.push("signal_high_intent");
  }
  if (aiEnhancement.riskFactors.length >= 2) {
    tags.push("risk_flagged");
  }

  return tags;
}

// ============================================================================
// INPUT VALIDATION
// ============================================================================
function validateInput(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return "Request body must be a JSON object";
  }

  const data = body as QuoteFormData;

  if (!data.email || typeof data.email !== "string") {
    return "Email is required";
  }

  if (!Array.isArray(data.services)) {
    return "Services must be an array";
  }

  return null;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const validationError = validateInput(body);

    if (validationError) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = body as QuoteFormData;

    console.log(`Processing lead scoring for: ${data.email.split("@")[0]}***`);

    // Step 1: Calculate base BANT score
    const baseScore = calculateBaseBantScore(data);
    console.log(`Base BANT score: ${baseScore.total} (${baseScore.tier})`);

    // Step 2: Get AI enhancement
    const aiEnhancement = await getAIEnhancement(data);
    console.log(`AI confidence: ${aiEnhancement.confidenceScore}`);

    // Step 3: Calculate final score with AI adjustments
    let scoreAdjustment = 0;

    // Boost for buying signals
    scoreAdjustment += aiEnhancement.buyingSignals.length * 3;

    // Boost for urgency
    scoreAdjustment += aiEnhancement.urgencySignals.length * 2;

    // Penalty for risk factors
    scoreAdjustment -= aiEnhancement.riskFactors.length * 2;

    // Apply confidence weighting
    scoreAdjustment = Math.round(scoreAdjustment * aiEnhancement.confidenceScore);

    const finalScore = Math.max(0, Math.min(100, baseScore.total + scoreAdjustment));

    // Determine final tier
    let finalTier: "hot" | "warm" | "cold" = "cold";
    if (finalScore >= 70) finalTier = "hot";
    else if (finalScore >= 40) finalTier = "warm";

    // Step 4: Determine routing
    const routing = determineRouting(finalScore, finalTier, aiEnhancement);

    // Step 5: Generate Brevo tags
    const brefoTags = generateBrevoTags(data, finalTier, aiEnhancement);

    const result: LeadScoringResult = {
      baseScore,
      aiEnhancement,
      finalScore,
      finalTier,
      routing,
      brefoTags,
      timestamp: new Date().toISOString(),
    };

    console.log(`Final score: ${finalScore} (${finalTier}) - Route via ${routing.channel}`);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Lead scoring error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to score lead",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
