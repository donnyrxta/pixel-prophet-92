import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CarouselSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaAction: () => void;
}

interface TimedCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

const TimedCarousel: React.FC<TimedCarouselProps> = ({
  slides,
  autoPlayInterval = 5000
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [detailsEven, setDetailsEven] = useState(true);
  
  // Separate state for the content of the two alternating divs to prevent double-rendering
  const [evenSlide, setEvenSlide] = useState(slides[0]);
  const [oddSlide, setOddSlide] = useState(slides[0]);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const detailsEvenRef = useRef<HTMLDivElement>(null);
  const detailsOddRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[activeIndex];

  // Auto-advance (disabled if user prefers reduced motion)
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      navigateToSlide((activeIndex + 1) % slides.length, false);
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [activeIndex, isAutoPlaying, prefersReducedMotion, slides.length, autoPlayInterval]);

  // Animate indicator (instant if reduced motion preferred)
  useEffect(() => {
    if (indicatorRef.current) {
      if (prefersReducedMotion) {
        // Instant transition for reduced motion
        gsap.set(indicatorRef.current, { scaleX: 1 });
      } else {
        gsap.to(indicatorRef.current, {
          scaleX: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(indicatorRef.current, {
              scaleX: 1,
              duration: autoPlayInterval / 1000,
              ease: 'none'
            });
          }
        });
      }
    }
  }, [activeIndex, autoPlayInterval, prefersReducedMotion]);

  const navigateToSlide = (index: number, stopAutoPlay = true) => {
    const nextSlide = slides[index];
    
    // Update the content of the *next* div (the one we are switching TO)
    if (detailsEven) {
      // Currently showing Even, switching to Odd
      setOddSlide(nextSlide);
      setDetailsEven(false);
    } else {
      // Currently showing Odd, switching to Even
      setEvenSlide(nextSlide);
      setDetailsEven(true);
    }

    setActiveIndex(index);
    
    if (stopAutoPlay) {
      setIsAutoPlaying(false);
    }
  };

  const goToPrevious = () => {
    const newIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    navigateToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (activeIndex + 1) % slides.length;
    navigateToSlide(newIndex);
  };

  // Animate details entry/exit
  useEffect(() => {
    const activeDetails = detailsEven ? detailsEvenRef.current : detailsOddRef.current;
    const inactiveDetails = detailsEven ? detailsOddRef.current : detailsEvenRef.current;

    if (prefersReducedMotion) {
      // Instant appearance for reduced motion
      if (activeDetails) gsap.set(activeDetails, { opacity: 1, x: 0 });
      if (inactiveDetails) gsap.set(inactiveDetails, { opacity: 0 });
    } else {
      // Standard animation
      if (activeDetails) {
        gsap.fromTo(activeDetails,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
      if (inactiveDetails) {
        gsap.to(inactiveDetails, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        });
      }
    }
  }, [detailsEven, prefersReducedMotion]);

  return (
    <section className="relative min-h-[100vh] sm:min-h-[100vh] md:min-h-screen overflow-hidden bg-stone-900">

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          ref={indicatorRef}
          className="h-full bg-primary origin-left"
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Background Image - Optimized for mobile */}
      <div className="absolute inset-0 bg-stone-900">
        <img
          src={currentSlide.image}
          alt={`${currentSlide.title} ${currentSlide.subtitle}`}
          className="w-full h-full object-cover transition-opacity duration-700"
          decoding="async"
          loading={activeIndex === 0 ? "eager" : "lazy"}
          fetchPriority={activeIndex === 0 ? "high" : "low"}
          width="1920"
          height="1080"
          style={{
            objectPosition: 'center',
            willChange: activeIndex === 0 ? 'opacity' : 'auto'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content - Even */}
      <div
        ref={detailsEvenRef}
        className="absolute inset-0 flex items-center z-20 opacity-100"
        style={{ opacity: detailsEven ? 1 : 0 }}
      >
        <div className="w-full px-4 sm:px-8 md:px-16 py-safe max-w-4xl">
          <div className="mb-4 sm:mb-6">
            <div className="relative inline-block">
              <div className="absolute -top-2 left-0 w-6 sm:w-8 h-0.5 sm:h-1 bg-primary rounded-full" />
              <div className="pt-3 sm:pt-4 text-base sm:text-xl text-white/90 tracking-wide">
                {evenSlide.category}
              </div>
            </div>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-1 sm:mb-2 tracking-tight leading-tight sm:leading-none text-shadow-strong">
            {evenSlide.title}
          </h1>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight sm:leading-none text-shadow-strong">
            {evenSlide.subtitle}
          </h2>

          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-xl leading-relaxed">
            {evenSlide.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-8 relative z-30">
            <button
              onClick={evenSlide.ctaAction}
              className="btn-hero text-white text-sm sm:text-base font-medium shadow-xl"
              aria-label={evenSlide.cta}
            >
              {evenSlide.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Content - Odd */}
      <div
        ref={detailsOddRef}
        className="absolute inset-0 flex items-center z-20 opacity-0"
        style={{ opacity: !detailsEven ? 1 : 0 }}
      >
        <div className="w-full px-4 sm:px-8 md:px-16 py-safe max-w-4xl">
          <div className="mb-4 sm:mb-6">
            <div className="relative inline-block">
              <div className="absolute -top-2 left-0 w-6 sm:w-8 h-0.5 sm:h-1 bg-primary rounded-full" />
              <div className="pt-3 sm:pt-4 text-base sm:text-xl text-white/90 tracking-wide">
                {oddSlide.category}
              </div>
            </div>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-1 sm:mb-2 tracking-tight leading-tight sm:leading-none text-shadow-strong">
            {oddSlide.title}
          </h1>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight sm:leading-none text-shadow-strong">
            {oddSlide.subtitle}
          </h2>

          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-xl leading-relaxed">
            {oddSlide.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-8 relative z-30">
            <button
              onClick={oddSlide.ctaAction}
              className="btn-hero text-white text-sm sm:text-base font-medium shadow-xl"
              aria-label={oddSlide.cta}
            >
              {oddSlide.cta}
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-4 sm:px-8 md:px-16">
        <div className="max-w-4xl flex items-center gap-4">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          {/* Dots */}
          <div className="flex gap-2 ml-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-primary w-6 sm:w-8' : 'bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default TimedCarousel;
