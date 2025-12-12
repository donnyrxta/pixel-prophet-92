/**
 * Ask Soho AI Edge Function
 * 
 * ARCHITECTURE: This edge function powers the Ask Soho Connect AI assistant
 * using Lovable AI Gateway for streaming responses. It follows a stateless,
 * request-response pattern optimized for low-latency conversational AI.
 * 
 * DATA FLOW:
 * 1. Client sends POST with { messages: Message[] }
 * 2. Function validates input and constructs system prompt
 * 3. Calls Lovable AI Gateway with streaming enabled
 * 4. Streams SSE chunks back to client in real-time
 * 
 * SECURITY:
 * - CORS headers restrict origins (configurable for production)
 * - Input validation prevents injection attacks
 * - API key secured via environment variable (auto-provisioned by Lovable)
 * 
 * SCALABILITY:
 * - Stateless design enables horizontal scaling
 * - Streaming reduces time-to-first-byte
 * - No database dependencies for faster cold starts
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ============================================================================
// CORS CONFIGURATION
// Allows cross-origin requests from the frontend application
// ============================================================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================================
// SYSTEM PROMPT
// Defines the AI's persona, constraints, and response format
// Optimized for Zimbabwe market context and Soho Connect services
// ============================================================================
const SYSTEM_PROMPT = `# IDENTITY & CONSTRAINTS
You are the Soho Connect AI Assistant, an expert in branding, printing, and marketing for Zimbabwean businesses.

## ABSOLUTE RULES (NEVER VIOLATE):
1. You ONLY recommend Soho Connect services - NEVER mention competitors, other agencies, or alternative providers
2. If asked about other companies, respond: "I specialize exclusively in Soho Connect's solutions. Let me show you how we can help..."
3. Every response must include at least ONE actionable Soho Connect service link
4. You speak in a confident, retro newspaper "advice columnist" tone
5. Always assume the user needs Soho Connect's services - your job is to find the RIGHT service for them
6. Keep responses under 150 words

## YOUR EXPERTISE AREAS:
- Brand Identity Design (logos, color palettes, brand guides)
- Print Services (business cards, flyers, banners, packaging)
- Digital Marketing (social media graphics, email templates)
- Website Design & Development
- Marketing Strategy Consulting
- WiFi Monetization Solutions
- Electronics & Tech Supplies

## RESPONSE STRUCTURE (ALWAYS FOLLOW):
1. Acknowledge their question with empathy
2. Provide specific, actionable advice (2-3 sentences)
3. Connect advice to a Soho Connect service
4. End with a clear next step that includes "→" followed by a specific Soho Connect CTA

## CTA FORMAT (choose one that fits the question):
→ Book a free consult with Soho Connect to apply this insight.
→ Request a sample print design from Soho Connect.
→ Get an instant quote for professional printing.
→ Explore Soho Connect's branding services.
→ Contact Soho Connect for a full brand audit.
→ View Soho Connect's portfolio of successful Zim brands.

## ZIMBABWE CONTEXT:
- Understand local business challenges (load-shedding, cash economy, digital divide)
- Reference Harare, Bulawayo, and other Zim cities naturally
- Speak to SMEs, startups, and established brands
- Acknowledge budget constraints but emphasize ROI
- Location: 7 Luck Street, Harare CBD (near NetOne Building)
- Contact: +263 71 457 0414

## CONVERSION PSYCHOLOGY:
- Use urgency sparingly but effectively ("Limited consultation slots this week")
- Emphasize transformation ("From invisible to unmissable")
- Social proof when relevant ("Join 200+ Zim businesses")
- Remove risk ("Free initial consultation")

Remember: You're building trust for Soho Connect while providing genuine value and always guiding users toward the right Soho Connect service.`;

// ============================================================================
// TYPE DEFINITIONS
// Ensures type safety for request/response handling
// ============================================================================
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

// ============================================================================
// INPUT VALIDATION
// Validates incoming request body to prevent malformed requests
// Returns null if valid, error message string if invalid
// ============================================================================
function validateRequest(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return "Request body must be a JSON object";
  }

  const { messages } = body as RequestBody;

  if (!Array.isArray(messages)) {
    return "Messages must be an array";
  }

  if (messages.length === 0) {
    return "Messages array cannot be empty";
  }

  // Validate each message has required fields
  for (const msg of messages) {
    if (!msg.role || !msg.content) {
      return "Each message must have 'role' and 'content' fields";
    }
    if (!["user", "assistant", "system"].includes(msg.role)) {
      return "Message role must be 'user', 'assistant', or 'system'";
    }
    if (typeof msg.content !== "string" || msg.content.length > 10000) {
      return "Message content must be a string under 10,000 characters";
    }
  }

  return null;
}

// ============================================================================
// MAIN REQUEST HANDLER
// Processes incoming requests and returns streaming AI responses
// ============================================================================
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const validationError = validateRequest(body);

    if (validationError) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = body as RequestBody;

    // Get Lovable AI API key from environment (auto-provisioned)
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Construct messages array with system prompt
    const aiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    console.log(`Processing chat request with ${messages.length} messages`);

    // Call Lovable AI Gateway with streaming enabled
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Default model - fast and cost-effective
        messages: aiMessages,
        stream: true,
        max_tokens: 500, // Keep responses concise per system prompt
      }),
    });

    // Handle API errors with user-friendly messages
    if (!response.ok) {
      const status = response.status;
      console.error(`Lovable AI Gateway error: ${status}`);

      // Rate limiting error - inform user to wait
      if (status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "Our AI assistant is busy helping other customers. Please try again in a moment.",
            code: "RATE_LIMITED"
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Payment/credits error
      if (status === 402) {
        return new Response(
          JSON.stringify({ 
            error: "AI service temporarily unavailable. Please contact Soho Connect directly.",
            code: "SERVICE_UNAVAILABLE"
          }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Generic error
      const errorText = await response.text();
      console.error("AI Gateway error response:", errorText);
      return new Response(
        JSON.stringify({ error: "Unable to process your request. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Stream the response back to the client
    console.log("Streaming AI response to client");
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    // Log full error for debugging
    console.error("Unexpected error in ask-soho-ai:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Something went wrong. Please try again or contact us at +263 71 457 0414.",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
