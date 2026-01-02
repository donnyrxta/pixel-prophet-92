/**
 * D2HeroSection - Main hero for Soho Connect D2 landing page
 * Features: Animated counters, social proof, Royal Blue branding
 */
import { useState, useEffect } from "react";
import { BUSINESS_INFO, CONTACT_INFO } from "@/lib/constants";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/gtm";

interface D2HeroSectionProps {
  onOpenLeadModal: () => void;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count}{suffix}</span>;
}

export function D2HeroSection({ onOpenLeadModal }: D2HeroSectionProps) {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick("hero");
    window.open(
      `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`,
      "_blank"
    );
  };

  const handleAuditClick = () => {
    trackCTAClick("Book Free Audit", "hero", "lead_modal");
    onOpenLeadModal();
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted" />
      <div className="absolute w-[600px] h-[600px] rounded-full -top-52 -right-24 bg-primary/10 blur-3xl animate-float" />
      <div className="absolute w-[400px] h-[400px] rounded-full -bottom-24 -left-12 bg-amber-500/5 blur-3xl animate-float-reverse" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              🇿🇼 Built for Zimbabwe's Reality
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            {BUSINESS_INFO.hero.headline.split("—")[0]}—
            <br />
            <span className="text-primary">
              {BUSINESS_INFO.hero.headline.split("—")[1]}
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            {BUSINESS_INFO.hero.subheadline}
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            {BUSINESS_INFO.hero.tagline}
          </p>
          
          {/* Social Proof Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <div className="flex items-center bg-card px-4 py-2 rounded-lg shadow-sm border">
              <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-foreground font-medium">
                <AnimatedCounter target={BUSINESS_INFO.stats.businesses} suffix="+" /> Businesses Trust Us
              </span>
            </div>
            
            <div className="flex items-center bg-card px-4 py-2 rounded-lg shadow-sm border">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-foreground font-medium">{BUSINESS_INFO.stats.roiRange} ROI in {BUSINESS_INFO.stats.roiDays} Days</span>
            </div>
            
            <div className="flex items-center bg-card px-4 py-2 rounded-lg shadow-sm border">
              <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-foreground font-medium">{BUSINESS_INFO.stats.installHours}-Hour Install</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={handleAuditClick}
              className="cta-pulse bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              📋 Book Free 30-Min Audit
            </button>
            
            <button
              onClick={handleWhatsAppClick}
              className="bg-card hover:bg-muted text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-bold transition-all"
            >
              💬 WhatsApp: {CONTACT_INFO.phone}
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            No obligation. Actionable report delivered immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
