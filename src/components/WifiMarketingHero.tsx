import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    badge: "WiFi Marketing Solutions",
    title: <>Turn Free WiFi Into <br className="hidden md:block" /><span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Measurable Growth</span></>,
    description: "The bridge between offline footfall and digital retention. Capture customer data, automate marketing, and drive repeat visits for your Zimbabwean business.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    badge: "Data Capture",
    title: <>Build a Verified <br className="hidden md:block" /><span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">Customer Database</span></>,
    description: "Stop guessing who your customers are. Collect verified emails and phone numbers from every guest login, compliant with POTRAZ regulations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 3,
    badge: "Automated Loyalty",
    title: <>Bring Customers Back <br className="hidden md:block" /><span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">On Autopilot</span></>,
    description: "Set and forget. Automatically send birthday vouchers, 'we miss you' offers, and review requests based on visit behavior.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 4,
    badge: "Real-Time Insights",
    title: <>Know Your Audience <br className="hidden md:block" /><span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">Inside Out</span></>,
    description: "Track dwell time, visit frequency, and peak hours. Make data-driven decisions to optimize staffing and operations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
  }
];

const WifiMarketingHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white min-h-[800px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-1000 transform scale-105"
            style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
        </motion.div>
      </AnimatePresence>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/20 text-primary-foreground hover:bg-primary/30 px-4 py-1 text-sm border-primary/50 backdrop-blur-sm">
              {slides[currentSlide].badge}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white min-h-[3em] md:min-h-[2.5em] flex flex-col justify-center">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed min-h-[4em]">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-hero bg-primary hover:bg-primary/90 text-white w-full sm:w-auto px-8 h-12 text-base shadow-lg shadow-primary/20">
                Request a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-glass border-white/20 text-[#4169e1] hover:bg-white/10 w-full sm:w-auto px-8 h-12 text-base backdrop-blur-sm font-bold"
                onClick={scrollToPricing}
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-20">
          <button 
            onClick={handlePrev}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WifiMarketingHero;
