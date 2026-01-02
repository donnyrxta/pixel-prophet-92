/**
 * D2GuaranteeSection - Risk reversal with 3 guarantee clauses
 */
import { GUARANTEES } from "@/lib/constants";

export function D2GuaranteeSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Our Precision Guarantee
          </h2>
          <p className="text-xl opacity-90">
            Risk-Reversal & Performance Commitment
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {GUARANTEES.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20"
            >
              <div className="text-5xl mb-4">{guarantee.icon}</div>
              <h3 className="text-2xl font-display font-bold mb-3">
                {guarantee.title}
              </h3>
              <p className="opacity-90 mb-4">{guarantee.description}</p>
              <p className="text-sm opacity-75">{guarantee.detail}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm opacity-75 max-w-2xl mx-auto">
            *Guarantee conditions are defined in the measurement protocol (baseline period, seasonal exclusions, stockouts, promotional distortions).
          </p>
        </div>
      </div>
    </section>
  );
}
