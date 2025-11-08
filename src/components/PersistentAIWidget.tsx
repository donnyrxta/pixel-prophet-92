/**
 * Persistent AI Widget - Always visible floating AI assistant button
 * Opens the full Ask Soho AI modal
 * Positioned separately from contact widget to avoid mobile overlap
 */
import { useState } from "react";
import { Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/gtm";
import AskSohoAI from "./AskSohoAI";

const PersistentAIWidget = () => {
  const [showAI, setShowAI] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    trackCTAClick('ai_assistant', 'persistent_widget');
    setShowAI(true);
  };

  return (
    <>
      {/* Floating AI Button - Always Visible */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          // Positioning - Left side, SAFE AREA (clear of carousel controls)
          "fixed left-6 z-50",
          "lg:left-8",
          // Mobile: 140px from bottom (clears carousel + safe area)
          // Desktop: Can be closer (100px from bottom)
          "bottom-[140px] lg:bottom-[100px]",

          // Base styles
          "flex items-center gap-3 px-4 py-3 rounded-full",
          "min-h-[56px] min-w-[56px] shadow-2xl",
          "transition-all duration-300 ease-in-out",

          // Gradient background (Von Restorff Effect - distinct from contact widget)
          "bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600",
          "bg-size-200 bg-pos-0 hover:bg-pos-100",
          "text-white",

          // Border & effects
          "border-2 border-white/30",
          "backdrop-blur-md",

          // Hover & animation
          "hover:shadow-purple-500/50 hover:scale-105",
          "hover:-translate-y-1",

          // Pulse animation
          "animate-pulse-glow",

          // Focus styles
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        )}
        style={{
          backgroundSize: '200%',
          backgroundPosition: isHovered ? '100%' : '0%',
        }}
        aria-label="Open AI Assistant"
      >
        {/* Icon with rotation */}
        <div className="relative w-6 h-6">
          <Sparkles
            className={cn(
              "absolute inset-0 w-6 h-6 transition-all duration-300",
              isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
            )}
          />
        </div>

        {/* Label - Show on desktop or expand on mobile hover */}
        <span
          className={cn(
            "font-bold text-sm whitespace-nowrap transition-all duration-300",
            "hidden lg:block",
            isHovered && "lg:tracking-wide"
          )}
        >
          Ask Soho AI
        </span>

        {/* Notification Badge */}
        <div
          className={cn(
            "absolute -top-1 -right-1",
            "w-4 h-4 bg-primary rounded-full",
            "border-2 border-white",
            "animate-ping"
          )}
          aria-hidden="true"
        />

        {/* Secondary icon for emphasis */}
        <MessageSquare
          className={cn(
            "w-5 h-5 absolute -bottom-1 -right-1",
            "bg-accent rounded-full p-1",
            "border-2 border-white",
            "transition-transform duration-300",
            isHovered && "scale-110"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Mobile Label Tooltip */}
      <div
        className={cn(
          "fixed bottom-24 left-6 z-40",
          "lg:hidden",
          "bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium",
          "shadow-xl transition-all duration-300",
          "pointer-events-none",
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        )}
        aria-hidden="true"
      >
        Ask Soho AI
        <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 rotate-45" />
      </div>

      {/* AI Assistant Modal */}
      {showAI && <AskSohoAI onClose={() => setShowAI(false)} />}
    </>
  );
};

export default PersistentAIWidget;
