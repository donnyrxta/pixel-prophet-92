/**
 * D2CTASection - Final call to action with WhatsApp and audit options
 */
import { CONTACT_INFO, FOUNDER } from "@/lib/constants";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/gtm";

interface D2CTASectionProps {
  onOpenLeadModal: () => void;
}

export function D2CTASection({ onOpenLeadModal }: D2CTASectionProps) {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick("cta_section");
    window.open(
      `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent("AUDIT " + CONTACT_INFO.whatsappMessage)}`,
      "_blank"
    );
  };

  const handleAuditClick = () => {
    trackCTAClick("Book Free Audit", "cta_section", "lead_modal");
    onOpenLeadModal();
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to Stop Losing Revenue?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8">
            Make a micro-yes decision. Book your free audit today.
          </p>
          
          {/* CTA Options */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-foreground mb-2">Free Audit</h3>
              <p className="text-sm text-muted-foreground mb-4">
                30-minute on-site assessment + actionable report
              </p>
              <button
                onClick={handleAuditClick}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-all"
              >
                Book Now
              </button>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-foreground mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send "AUDIT [BUSINESS NAME]" for quick response
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
              >
                {CONTACT_INFO.phone}
              </button>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-12">
            <span>📧 {CONTACT_INFO.email}</span>
            <span>📍 {CONTACT_INFO.address}</span>
            <span>🌐 sohoconnect.co.zw</span>
          </div>
          
          {/* Founder Quote */}
          <div className="bg-muted rounded-2xl p-8 max-w-2xl mx-auto">
            <blockquote className="text-lg italic text-foreground mb-4">
              "{FOUNDER.quote}"
            </blockquote>
            <cite className="text-muted-foreground not-italic">
              — <span className="font-semibold">{FOUNDER.name}</span>, {FOUNDER.title}
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
