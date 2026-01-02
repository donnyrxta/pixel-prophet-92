/**
 * D2IntelligenceLoop - Capture → Analyze → Protect → Act
 * Core value proposition visualization
 */
import { INTELLIGENCE_LOOP } from "@/lib/constants";

export function D2IntelligenceLoop() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            The Soho Intelligence Loop™
          </h2>
          <p className="text-xl text-muted-foreground">
            Capture → Analyze → Protect → Act → Repeat
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {INTELLIGENCE_LOOP.map((item) => (
            <div
              key={item.step}
              className="feature-card bg-card p-8 rounded-2xl shadow-lg border hover:border-primary transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </span>
                <span className="text-3xl">{item.icon}</span>
              </div>
              
              <h3 className="text-xl font-display font-bold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-primary mb-3">
                {item.subtitle}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">Installed in ~48 hours.</span>{" "}
            Works with your existing WiFi/CCTV and POS.
          </p>
        </div>
      </div>
    </section>
  );
}
