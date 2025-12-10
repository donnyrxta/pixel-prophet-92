import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuoteCalculator } from '@/context/QuoteCalculatorContext';

interface Promo {
  id: string;
  headline: string;
  subtext: string;
  cta: string;
  discount?: string;
  bgGradient: string;
  icon: 'sparkles' | 'percent';
}

const promos: Promo[] = [
  {
    id: 'bulk-print',
    headline: '20% Off Bulk Printing',
    subtext: 'Order 1000+ flyers, brochures, or business cards',
    cta: 'Claim Discount',
    discount: '20%',
    bgGradient: 'from-primary via-primary/90 to-primary/80',
    icon: 'percent',
  },
  {
    id: 'branding',
    headline: 'Complete Branding Package',
    subtext: 'Logo + Business Cards + Letterhead from $299',
    cta: 'Get Started',
    bgGradient: 'from-accent via-accent/90 to-accent/80',
    icon: 'sparkles',
  },
  {
    id: 'signage',
    headline: 'Free Installation',
    subtext: 'On all signage orders over $500 this month',
    cta: 'Learn More',
    bgGradient: 'from-green-600 via-green-500 to-emerald-500',
    icon: 'sparkles',
  },
];

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<Promo>(promos[0]);
  const [promoIndex, setPromoIndex] = useState(0);
  const { openCalculator } = useQuoteCalculator();

  useEffect(() => {
    // Show banner after 10 seconds
    const showTimer = setTimeout(() => {
      if (sessionStorage.getItem('promoBannerDismissed') !== 'true') {
        setIsVisible(true);
      }
    }, 10000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Rotate promos every 8 seconds
    const rotateTimer = setInterval(() => {
      setPromoIndex((prev) => {
        const next = (prev + 1) % promos.length;
        setCurrentPromo(promos[next]);
        return next;
      });
    }, 8000);

    return () => clearInterval(rotateTimer);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promoBannerDismissed', 'true');
  };

  const handleCTA = () => {
    openCalculator({ trigger: 'promo_banner' });
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-0 left-0 right-0 z-[60]"
        >
          <div className={`bg-gradient-to-r ${currentPromo.bgGradient} text-white`}>
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Promo content */}
                <div className="flex items-center gap-4 flex-1">
                  <motion.div
                    key={currentPromo.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full"
                  >
                    {currentPromo.icon === 'percent' ? (
                      <Percent className="w-5 h-5" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </motion.div>

                  <motion.div
                    key={`text-${currentPromo.id}`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex-1"
                  >
                    <p className="font-bold text-sm sm:text-base">
                      {currentPromo.discount && (
                        <span className="inline-block bg-white/20 px-2 py-0.5 rounded mr-2 text-xs">
                          {currentPromo.discount} OFF
                        </span>
                      )}
                      {currentPromo.headline}
                    </p>
                    <p className="text-xs sm:text-sm text-white/90 hidden sm:block">
                      {currentPromo.subtext}
                    </p>
                  </motion.div>
                </div>

                {/* CTA & Close */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleCTA}
                    size="sm"
                    variant="secondary"
                    className="bg-white text-foreground hover:bg-white/90 font-semibold text-xs sm:text-sm"
                  >
                    {currentPromo.cta}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>

                  <button
                    onClick={handleDismiss}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close banner"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress indicators */}
              <div className="flex justify-center gap-1 mt-2">
                {promos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === promoIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
