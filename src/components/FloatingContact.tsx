/**
 * Enhanced Floating Contact Widget - Mobile Optimized
 * Features: Always visible, bottom sheet on mobile, glassmorphic design,
 * improved accessibility, GTM analytics tracking
 *
 * CHANGELOG:
 * - Removed auto-hide on scroll for better mobile UX
 * - Removed AI option (now separate persistent widget)
 * - Added bottom sheet modal for mobile
 * - Improved touch targets and spacing
 */
import { useState, useEffect } from "react";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackWhatsAppClick, trackCTAClick } from "@/lib/gtm";
import QuotationCalculator from "./QuotationCalculator";

interface ContactOption {
  id: string;
  label: string;
  description: string;
  icon: typeof MessageCircle | typeof Phone | typeof Mail;
  href: string;
  color: string;
  ariaLabel: string;
  target?: string;
  rel?: string;
}

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Contact options configuration (AI removed - now separate widget)
  const contactOptions: ContactOption[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp Chat',
      description: 'Instant response',
      icon: MessageCircle,
      href: `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hi%20SOHO%20CONNECT,%20I'd%20like%20to%20inquire%20about%20your%20services`,
      color: 'bg-[#25D366] hover:bg-[#20BD5A]',
      ariaLabel: 'Contact us on WhatsApp',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    {
      id: 'phone',
      label: 'Call Now',
      description: CONTACT_INFO.phone,
      icon: Phone,
      href: `tel:${CONTACT_INFO.phone}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      ariaLabel: 'Call us now'
    },
    {
      id: 'email',
      label: 'Email Us',
      description: CONTACT_INFO.email,
      icon: Mail,
      href: `mailto:${CONTACT_INFO.email}`,
      color: 'bg-purple-600 hover:bg-purple-700',
      ariaLabel: 'Send us an email'
    }
  ];

  // Handle keyboard navigation (accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Prevent body scroll when expanded on mobile
  useEffect(() => {
    if (isExpanded && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    trackCTAClick(isExpanded ? 'contact_close' : 'contact_open', 'floating_contact_widget');
  };

  const handleContactClick = (option: ContactOption, e: React.MouseEvent) => {
    // Track the click
    if (option.id === 'whatsapp') {
      trackWhatsAppClick('floating_contact_widget');
    } else {
      trackCTAClick(`contact_${option.id}`, 'floating_contact_widget');
    }

    // For phone/email/whatsapp, open directly
    if (option.target === '_blank' || option.href.startsWith('tel:') || option.href.startsWith('mailto:')) {
      window.open(option.href, option.target || '_self');
      e.preventDefault();
      setIsExpanded(false);
    } else {
      // For other options, could route through calculator
      e.preventDefault();
      trackCTAClick('quote_request', 'floating_contact_widget');
      setShowCalculator(true);
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile: Bottom Sheet Modal */}
      {isExpanded && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={handleToggle}
            aria-hidden="true"
          />

          {/* Bottom Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl animate-slide-up"
            role="dialog"
            aria-modal="true"
            aria-label="Contact options"
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Get In Touch
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Choose how you'd like to contact us
                  </p>
                </div>
                <button
                  onClick={handleToggle}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label="Close contact menu"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Contact Options */}
            <div className="p-6 space-y-3 pb-safe">
              {contactOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={(e) => handleContactClick(option, e)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl",
                      "transition-all duration-200",
                      option.color,
                      "text-white shadow-lg hover:shadow-xl",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "min-h-[72px]"
                    )}
                    aria-label={option.ariaLabel}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-lg">{option.label}</div>
                      <div className="text-sm opacity-90">{option.description}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-xl">→</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-t-3xl">
              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                📍 7 Luck Street, Harare CBD • 🕐 Mon-Fri 8AM-5PM
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop: Floating Menu + Mobile: Simple Button */}
      <div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 lg:gap-2"
        role="complementary"
        aria-label="Floating contact menu"
      >
        {/* Desktop: Expanded Options (always visible above 1024px) */}
        <div className="hidden lg:flex flex-col gap-2">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={(e) => handleContactClick(option, e)}
                className={cn(
                  "group flex items-center gap-3 px-5 py-3 rounded-full shadow-lg",
                  "transition-all duration-300 ease-in-out",
                  "min-h-[56px]",
                  "backdrop-blur-md",
                  option.color,
                  "text-white",
                  "hover:shadow-2xl hover:scale-105 hover:-translate-x-1",
                  "border-2 border-white/30"
                )}
                style={{
                  animationDelay: `${index * 75}ms`,
                }}
                aria-label={option.ariaLabel}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold whitespace-nowrap">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile: Toggle Button */}
        <button
          onClick={handleToggle}
          className={cn(
            "lg:hidden",
            "relative flex items-center justify-center rounded-full shadow-2xl",
            "min-h-[56px] min-w-[56px]",
            "transition-all duration-300 ease-in-out",
            "backdrop-blur-md bg-gradient-to-br from-primary via-primary to-primary/90",
            "border-2 border-white/30",
            "hover:shadow-2xl hover:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            isExpanded && "ring-2 ring-primary/50"
          )}
          aria-label={isExpanded ? 'Close contact menu' : 'Open contact menu'}
          aria-expanded={isExpanded}
        >
          <div className="relative w-6 h-6 text-white">
            <MessageCircle
              className={cn(
                "absolute inset-0 w-6 h-6 transition-all duration-300",
                isExpanded ? "rotate-90 opacity-0 scale-0" : "rotate-0 opacity-100 scale-100"
              )}
              aria-hidden="true"
            />
            <X
              className={cn(
                "absolute inset-0 w-6 h-6 transition-all duration-300",
                isExpanded ? "rotate-0 opacity-100 scale-100" : "rotate-90 opacity-0 scale-0"
              )}
              aria-hidden="true"
            />
          </div>

          {/* Notification Badge */}
          <div
            className={cn(
              "absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full",
              "border-2 border-white animate-pulse"
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Quotation Calculator Modal */}
      {showCalculator && <QuotationCalculator onClose={() => setShowCalculator(false)} />}
    </>
  );
};

export default FloatingContact;
