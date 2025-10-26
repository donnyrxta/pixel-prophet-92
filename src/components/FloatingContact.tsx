/**
 * Enhanced Floating Contact Widget
 * Features: Collapsible menu, responsive behavior, glassmorphic design,
 * scroll-triggered animations, full accessibility, analytics-ready
 */
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Phone, Mail, ChevronUp, ChevronDown, X } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ContactOption {
  id: string;
  label: string;
  icon: typeof MessageCircle;
  href: string;
  color: string;
  ariaLabel: string;
  target?: string;
  rel?: string;
}

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Contact options configuration
  const contactOptions: ContactOption[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
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
      icon: Phone,
      href: `tel:${CONTACT_INFO.phone}`,
      color: 'bg-primary hover:bg-primary/90',
      ariaLabel: 'Call us now'
    },
    {
      id: 'email',
      label: 'Email Us',
      icon: Mail,
      href: `mailto:${CONTACT_INFO.email}`,
      color: 'bg-secondary hover:bg-secondary/90',
      ariaLabel: 'Send us an email'
    }
  ];

  // Responsive behavior: Auto-expand on desktop (≥1024px)
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && !isExpanded) {
        setIsExpanded(true);
      } else if (!isDesktop && isExpanded) {
        setIsExpanded(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  // Scroll direction detection with IntersectionObserver for performance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide widget when scrolling down beyond threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setScrollDirection('down');
        if (window.innerWidth < 1024) {
          setIsVisible(false);
        }
      } else {
        setScrollDirection('up');
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  // Handle keyboard navigation (accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        // Return focus to toggle button
        const toggleBtn = document.querySelector('[data-contact-toggle]') as HTMLElement;
        toggleBtn?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Analytics event tracking (ready for Phase 3)
  const trackInteraction = (action: string, label: string) => {
    // Analytics implementation placeholder
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: 'Contact Widget',
        event_label: label
      });
    }
    console.log('Analytics:', { action, label }); // Debug log
  };

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    trackInteraction('toggle_contact_menu', newState ? 'expanded' : 'collapsed');
  };

  const handleContactClick = (option: ContactOption) => {
    trackInteraction('contact_click', option.id);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
        "transition-all duration-300 ease-in-out",
        !isVisible && "translate-y-24 opacity-0 pointer-events-none"
      )}
      role="complementary"
      aria-label="Floating contact menu"
    >
      {/* Expanded Contact Options */}
      <div
        className={cn(
          "flex flex-col gap-2 transition-all duration-300 ease-in-out origin-bottom-right",
          isExpanded 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-75 translate-y-4 pointer-events-none"
        )}
        aria-hidden={!isExpanded}
      >
        {contactOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <a
              key={option.id}
              href={option.href}
              target={option.target}
              rel={option.rel}
              onClick={() => handleContactClick(option)}
              className={cn(
                // Base styles
                "group flex items-center gap-3 px-4 py-3 rounded-full shadow-lg",
                "transition-all duration-300 ease-in-out",
                "min-h-[48px] min-w-[48px]", // Accessibility: 48px touch targets
                
                // Glassmorphic effect
                "backdrop-blur-md bg-white/90 dark:bg-gray-900/90",
                "border border-white/20",
                
                // Hover effects
                "hover:shadow-2xl hover:scale-105 hover:-translate-y-1",
                
                // Color styles
                option.color,
                "text-white",
                
                // Animation delay for stagger effect
                "animate-scale-in",
              )}
              style={{ 
                animationDelay: `${index * 50}ms`,
                backdropFilter: 'blur(16px)',
              }}
              aria-label={option.ariaLabel}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              
              {/* Label - visible on desktop or when expanded */}
              <span 
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  "lg:opacity-100 transition-opacity duration-300",
                  isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}
              >
                {option.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Toggle Button with Scroll Direction Indicator */}
      <button
        data-contact-toggle
        onClick={handleToggle}
        className={cn(
          // Base styles
          "relative flex items-center justify-center rounded-full shadow-lg",
          "min-h-[56px] min-w-[56px]", // Larger touch target for toggle
          "transition-all duration-300 ease-in-out",
          
          // Glassmorphic effect
          "backdrop-blur-md bg-gradient-to-br from-primary to-primary/80",
          "border-2 border-white/20",
          
          // Hover effects
          "hover:shadow-2xl hover:scale-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          
          // Active state
          isExpanded && "ring-2 ring-primary/50"
        )}
        style={{ backdropFilter: 'blur(16px)' }}
        aria-label={isExpanded ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={isExpanded}
        aria-controls="floating-contact-menu"
      >
        {/* Icon with rotation animation */}
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

        {/* Scroll Direction Indicator */}
        <div
          className={cn(
            "absolute -top-2 -right-2 w-6 h-6 rounded-full",
            "bg-accent text-accent-foreground",
            "flex items-center justify-center",
            "transition-all duration-300",
            "animate-pulse",
            scrollDirection === 'down' && !isExpanded && "opacity-0"
          )}
          aria-hidden="true"
        >
          {scrollDirection === 'up' ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Screen Reader Announcement */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {isExpanded ? 'Contact menu expanded' : 'Contact menu collapsed'}
      </div>
    </div>
  );
};

export default FloatingContact;