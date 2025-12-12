/**
 * Ask Soho Connect - AI Assistant
 * 
 * ARCHITECTURE: Retro newspaper advice column style chat interface
 * powered by Lovable AI Gateway via Supabase Edge Function.
 * 
 * FEATURES:
 * - Real-time streaming responses for dynamic UX
 * - Starter prompts for quick engagement
 * - Zimbabwe-focused branding/marketing expertise
 * - Conversion-optimized CTAs in every response
 * 
 * DATA FLOW:
 * 1. User sends message → Component updates state
 * 2. Calls ask-soho-ai edge function with message history
 * 3. Streams response chunks → Updates UI progressively
 * 4. Tracks events via GTM for analytics
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { X, MessageCircle, Send, Sparkles, Loader2 } from "lucide-react";
import { trackCustomEvent } from "@/lib/gtm";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface AskSohoAIProps {
  onClose: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const CHAT_URL = `${SUPABASE_URL}/functions/v1/ask-soho-ai`;

// Starter prompts for quick engagement - optimized for Zimbabwe market
const STARTER_PROMPTS = [
  "How do I make my brand stand out in Harare?",
  "What's the best way to combine print + digital?",
  "Why does consistent branding matter?",
  "How can I improve my business cards?",
  "What colors work best for Zimbabwean audiences?",
];

// ============================================================================
// STREAMING CHAT FUNCTION
// Handles SSE streaming from the edge function
// ============================================================================
async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Array<{ role: string; content: string }>;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    // Handle non-streaming error responses
    if (!resp.ok) {
      const contentType = resp.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const errorData = await resp.json();
        onError(errorData.error || "Failed to get response");
        return;
      }
      onError(`Request failed with status ${resp.status}`);
      return;
    }

    if (!resp.body) {
      onError("No response body received");
      return;
    }

    // Process SSE stream
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      // Process line-by-line as data arrives
      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        // Handle CRLF
        if (line.endsWith("\r")) line = line.slice(0, -1);
        
        // Skip SSE comments/keepalive and empty lines
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        
        // Check for stream end signal
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // Incomplete JSON - put back and wait for more data
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush for any remaining buffered content
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // Ignore partial leftovers
        }
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream error:", error);
    onError(
      error instanceof Error 
        ? error.message 
        : "Connection error. Please try again."
    );
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const AskSohoAI = ({ onClose }: AskSohoAIProps) => {
  // State management
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Welcome to **Ask Soho Connect** — your trusted advice column for branding, print, and marketing questions in Zimbabwe!\n\nChoose a question below or type your own:",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ============================================================================
  // MESSAGE HANDLING
  // ============================================================================
  const handleSend = useCallback(async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    // Track user question for analytics
    trackCustomEvent("ai_assistant_question", {
      question: textToSend,
      source: "ask_soho_ai",
    });

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare message history for API (exclude timestamps)
    const messageHistory = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Track assistant response progress
    let assistantContent = "";

    // Update or create assistant message
    const updateAssistantMessage = (newChunk: string) => {
      assistantContent += newChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === assistantContent.slice(0, -newChunk.length)) {
          // Update existing assistant message
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        // Check if we need to add a new assistant message
        if (last?.role === "user") {
          return [
            ...prev,
            { role: "assistant" as const, content: assistantContent, timestamp: new Date() },
          ];
        }
        // Update the last assistant message
        return prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, content: assistantContent } : m
        );
      });
    };

    // Stream the AI response
    await streamChat({
      messages: messageHistory,
      onDelta: (chunk) => updateAssistantMessage(chunk),
      onDone: () => {
        setIsLoading(false);
        // Track successful response
        trackCustomEvent("ai_assistant_response", {
          question: textToSend,
          response_length: assistantContent.length,
        });
      },
      onError: (error) => {
        setIsLoading(false);
        // Add error message to chat
        setMessages((prev) => {
          // Remove any incomplete assistant message
          const filtered = prev.filter(
            (m, i) => !(i === prev.length - 1 && m.role === "assistant" && m.content === "")
          );
          return [
            ...filtered,
            {
              role: "assistant" as const,
              content: `🔧 ${error}\n\n→ Contact Soho Connect directly at +263 71 457 0414 for immediate assistance.`,
              timestamp: new Date(),
            },
          ];
        });
      },
    });
  }, [input, isLoading, messages]);

  const handleStarterPrompt = useCallback((prompt: string) => {
    handleSend(prompt);
  }, [handleSend]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header - Retro Newspaper Style */}
        <div className="bg-primary text-primary-foreground p-6 border-b-4 border-accent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8" />
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  ASK SOHO CONNECT
                </h2>
                <p className="text-sm text-primary-foreground/80 italic">
                  Your Trusted Branding & Marketing Advice Column
                </p>
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
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Soho Connect AI
                    </span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none">
                  {message.content.split("\n").map((line, i) => {
                    // Highlight CTAs with arrow
                    if (line.startsWith("→")) {
                      return (
                        <p
                          key={i}
                          className="font-bold text-accent mt-3 mb-0 flex items-start gap-2"
                        >
                          <span>→</span>
                          <span>{line.substring(1).trim()}</span>
                        </p>
                      );
                    }
                    // Bold text
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p key={i} className="font-bold mb-2">
                          {line.replace(/\*\*/g, "")}
                        </p>
                      );
                    }
                    return (
                      <p key={i} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    );
                  })}
                </div>
                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-card border-2 border-accent/20 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
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
            <p className="text-sm font-semibold text-muted-foreground mb-3">
              Quick Start Questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt, index) => (
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
              onKeyDown={handleKeyPress}
              placeholder="Ask about branding, print, or marketing..."
              className="flex-1 px-4 py-3 rounded-full border-2 border-border focus:border-accent focus:outline-none bg-background"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
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
