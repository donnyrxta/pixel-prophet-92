/**
 * D2Header - Navigation header for D2 landing page
 */
import { useState } from "react";
import { BUSINESS_INFO } from "@/lib/constants";
import { trackCTAClick } from "@/lib/gtm";

interface D2HeaderProps {
  onOpenLeadModal: () => void;
}

export function D2Header({ onOpenLeadModal }: D2HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuditClick = () => {
    trackCTAClick("Free Audit", "header", "lead_modal");
    onOpenLeadModal();
  };

  return (
    <nav className="bg-card/90 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-display font-bold text-primary">
              {BUSINESS_INFO.name}
            </a>
            <span className="ml-2 text-sm bg-muted px-2 py-1 rounded font-medium text-muted-foreground">
              {BUSINESS_INFO.tagline}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-foreground hover:text-primary font-medium transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary font-medium transition-colors">
              Pricing
            </a>
            <a href="#results" className="text-foreground hover:text-primary font-medium transition-colors">
              Results
            </a>
            <button
              onClick={handleAuditClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Free Audit
            </button>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="#how-it-works" className="text-foreground hover:text-primary font-medium">
                How It Works
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary font-medium">
                Pricing
              </a>
              <a href="#results" className="text-foreground hover:text-primary font-medium">
                Results
              </a>
              <button
                onClick={handleAuditClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold"
              >
                Free Audit
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
