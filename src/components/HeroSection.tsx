import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuoteCalculator } from "@/context/QuoteCalculatorContext";

const HeroSection = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const { openCalculator } = useQuoteCalculator();

  useEffect(() => {
    setIsPrinting(true);
  }, []);

  return (
    <section className="relative min-h-[100svh] md:min-h-[90vh] pb-safe flex items-center justify-center overflow-hidden isolate bg-gradient-to-br from-background via-muted to-background">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-accent rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mobile-safe mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in">
          {/* Printing Press Effect Headline */}
          <div className="overflow-hidden">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              <span className="block text-foreground mb-2">
                Print Materials That
              </span>
              <span className={`block gradient-text ${isPrinting ? 'printing-effect' : ''}`}>
                Win Contracts
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Professional printing and design services that make your business stand out in Zimbabwe.
            Fast turnaround. Guaranteed quality.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground animate-slide-up">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-primary border-2 border-background"
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">127+ Zimbabwe businesses</span>
            <span>trust us</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-scale-in">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => openCalculator({ trigger: 'button' })}
            >
              Get Instant Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm opacity-70">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>24-48h Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Free Design Consultation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

