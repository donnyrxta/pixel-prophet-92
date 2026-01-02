/**
 * D2PricingSection - 3-tier Goldilocks pricing with featured Professional tier
 */
import { PRICING } from "@/lib/constants";
import { trackCTAClick } from "@/lib/gtm";

interface D2PricingSectionProps {
  onOpenLeadModal: (packageName?: string) => void;
}

export function D2PricingSection({ onOpenLeadModal }: D2PricingSectionProps) {
  const packages = [PRICING.starter, PRICING.professional, PRICING.enterprise];

  const handleSelectPackage = (packageName: string) => {
    trackCTAClick(`Select ${packageName}`, "pricing", "lead_modal");
    onOpenLeadModal(packageName);
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that fits your business size
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {packages.map((pkg) => {
            const isFeatured = "featured" in pkg && pkg.featured;
            return (
            <div
              key={pkg.name}
              className={`bg-card p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                isFeatured
                  ? "border-primary shadow-2xl relative md:scale-105"
                  : "border-border hover:border-primary"
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {pkg.name}
              </h3>
              
              <div className="mb-4">
                <span className={`text-4xl font-bold ${isFeatured ? "text-primary" : "text-foreground"}`}>
                  ${pkg.price}
                </span>
                <span className="text-muted-foreground">/{pkg.period}</span>
              </div>
              
              <p className="text-muted-foreground mb-6">{pkg.target}</p>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSelectPackage(pkg.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  isFeatured
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-foreground hover:bg-foreground/90 text-background"
                }`}
              >
                Get Started
              </button>
            </div>
          );
          })}
        </div>
        
        {/* Payment Options */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-muted rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-2">Payment Options</h4>
            <p className="text-muted-foreground text-sm mb-3">
              USD, ZWL (RBZ mid-market rate), or 50/50 split
            </p>
            <p className="text-primary font-semibold">
              Annual: Pay 10 months, get 12 ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
