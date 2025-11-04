import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send, Sparkles } from "lucide-react";
import { trackCustomEvent } from "@/lib/gtm";

/**
 * Ask Soho Connect - AI Assistant
 * Retro newspaper advice column style with ApiFreeLLM integration
 */

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

const AskSohoAI = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Welcome to **Ask Soho Connect** — your trusted advice column for branding, print, and marketing questions in Zimbabwe!\n\nChoose a question below or type your own:",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Starter prompts for quick engagement
  const starterPrompts = [
    "How do I make my brand stand out in Harare?",
    "What's the best way to combine print + digital?",
    "Why does consistent branding matter?",
    "How can I improve my business cards?",
    "What colors work best for Zimbabwean audiences?",
  ];

  const systemPrompt = `# IDENTITY & CONSTRAINTS
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

## RESPONSE STRUCTURE (ALWAYS FOLLOW):
1. Acknowledge their question with empathy
2. Provide specific, actionable advice (2-3 sentences)
3. Connect advice to a Soho Connect service
4. End with a clear next step that includes "→" followed by a specific Soho Connect service CTA

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

## CONVERSION PSYCHOLOGY:
- Use urgency sparingly but effectively ("Limited consultation slots this week")
- Emphasize transformation ("From invisible to unmissable")
- Social proof when relevant ("Join 200+ Zim businesses")
- Remove risk ("Free initial consultation")

Remember: You're building trust for Soho Connect while providing genuine value and always guiding users toward the right Soho Connect service.`;

  const callAPI = async (userMessage: string): Promise<string> => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    // Enforce 5-second rate limit
    if (timeSinceLastRequest < 5000) {
      const waitTime = Math.ceil((5000 - timeSinceLastRequest) / 1000);
      return `⏱️ Please wait ${waitTime} more second${waitTime > 1 ? 's' : ''} before asking another question (free API rate limit).`;
    }

    try {
      // Load the ApiFreeLLM script dynamically
      if (!(window as any).apifree) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://apifreellm.com/apifree.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      setLastRequestTime(Date.now());
      
      const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}`;
      const response = await (window as any).apifree.chat(fullPrompt);
      
      return response;
    } catch (error) {
      console.error("API Error:", error);
      return "🔧 I'm having trouble connecting right now. Please try again in a moment, or contact Soho Connect directly at +263 71 457 0414.";
    }
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    // Track the question
    trackCustomEvent("ai_assistant_question", {
      question: textToSend,
      source: "ask_soho_ai",
    });

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Get AI response
    const aiResponse = await callAPI(textToSend);

    // Add assistant message
    const assistantMessage: Message = {
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);

    // Track the response
    trackCustomEvent("ai_assistant_response", {
      question: textToSend,
      response_length: aiResponse.length,
    });
  };

  const handleStarterPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header - Retro Newspaper Style */}
        <div className="bg-primary text-primary-foreground p-6 border-b-4 border-accent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  ASK SOHO CONNECT
                </h2>
                <p className="text-sm text-primary-foreground/80 italic">Your Trusted Branding & Marketing Advice Column</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close AI assistant"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-2 border-accent/20"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Soho Connect AI</span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none">
                  {message.content.split('\n').map((line, i) => {
                    // Highlight CTAs with arrow
                    if (line.startsWith('→')) {
                      return (
                        <p key={i} className="font-bold text-accent mt-3 mb-0 flex items-start gap-2">
                          <span>→</span>
                          <span>{line.substring(1).trim()}</span>
                        </p>
                      );
                    }
                    // Bold text
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={i} className="font-bold mb-2">{line.replace(/\*\*/g, '')}</p>;
                    }
                    return <p key={i} className="mb-2 last:mb-0">{line}</p>;
                  })}
                </div>
                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border-2 border-accent/20 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompts (show only at start) */}
        {messages.length === 1 && (
          <div className="p-4 bg-card border-t border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3">Quick Start Questions:</p>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleStarterPrompt(prompt)}
                  className="px-4 py-2 bg-muted hover:bg-accent hover:text-accent-foreground rounded-full text-sm transition-all hover:scale-105"
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-card border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about branding, print, or marketing..."
              className="flex-1 px-4 py-3 rounded-full border-2 border-border focus:border-accent focus:outline-none bg-background"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            💡 AI insights by Soho Connect — for guidance, not a substitute for consulting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AskSohoAI;
