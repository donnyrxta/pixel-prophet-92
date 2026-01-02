/**
 * D2LandingPage - Complete D2 landing page combining all sections
 */
import { useState } from "react";
import { D2Header } from "./D2Header";
import { D2HeroSection } from "./D2HeroSection";
import { D2ProblemSection } from "./D2ProblemSection";
import { D2IntelligenceLoop } from "./D2IntelligenceLoop";
import { D2ResultsSection } from "./D2ResultsSection";
import { D2PricingSection } from "./D2PricingSection";
import { D2GuaranteeSection } from "./D2GuaranteeSection";
import { D2CTASection } from "./D2CTASection";
import { D2Footer } from "./D2Footer";
import { D2LeadModal } from "./D2LeadModal";
import { trackLeadFormStarted } from "@/lib/gtm";

export function D2LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>();

  const openLeadModal = (packageName?: string) => {
    setSelectedPackage(packageName);
    setModalOpen(true);
    trackLeadFormStarted("audit_request", packageName);
  };

  return (
    <div className="min-h-screen bg-background">
      <D2Header onOpenLeadModal={() => openLeadModal()} />
      <D2HeroSection onOpenLeadModal={() => openLeadModal()} />
      <D2ProblemSection />
      <D2IntelligenceLoop />
      <D2ResultsSection />
      <D2PricingSection onOpenLeadModal={openLeadModal} />
      <D2GuaranteeSection />
      <D2CTASection onOpenLeadModal={() => openLeadModal()} />
      <D2Footer />
      
      <D2LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}
