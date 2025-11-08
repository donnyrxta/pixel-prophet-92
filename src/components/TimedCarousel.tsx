import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [detailsEven, setDetailsEven] = useState(true);
  
  const indicatorRef = useRef<HTMLDivElement>(null);
  const detailsEvenRef = useRef<HTMLDivElement>(null);
  const detailsOddRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[activeIndex];

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      navigateToSlide((activeIndex + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [activeIndex, isAutoPlaying, slides.length, autoPlayInterval]);

  // Animate indicator
  useEffect(() => {
    if (indicatorRef.current) {
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
  }, [activeIndex, autoPlayInterval]);

  const navigateToSlide = (index: number) => {
    setActiveIndex(index);
    setDetailsEven(!detailsEven);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    const newIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    navigateToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (activeIndex + 1) % slides.length;
    navigateToSlide(newIndex);
  };

  // Animate details entry
  useEffect(() => {
    const activeDetails = detailsEven ? detailsEvenRef.current : detailsOddRef.current;
    if (activeDetails) {
      gsap.fromTo(activeDetails,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [activeIndex, detailsEven]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-stone-900">
      
      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          ref={indicatorRef}
          className="h-full bg-primary origin-left"
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content - Even */}
      <div
        ref={detailsEvenRef}
        className={`absolute top-1/4 left-16 max-w-2xl z-20 transition-opacity duration-500 ${
          detailsEven ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="absolute -top-2 left-0 w-8 h-1 bg-primary rounded-full" />
            <div className="pt-4 text-xl text-white/90 tracking-wide">
              {currentSlide.category}
            </div>
          </div>
        </div>

        <h1 className="text-7xl font-bold text-white mb-2 tracking-tight leading-none">
          {currentSlide.title}
        </h1>
        <h2 className="text-7xl font-bold text-white mb-6 tracking-tight leading-none">
          {currentSlide.subtitle}
        </h2>

        <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
          {currentSlide.description}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={currentSlide.ctaAction}
            className="btn-brand text-white px-8 py-3 rounded-full font-medium hover:scale-105 shadow-xl"
          >
            {currentSlide.cta}
          </button>
        </div>
      </div>

      {/* Content - Odd */}
      <div
        ref={detailsOddRef}
        className={`absolute top-1/4 left-16 max-w-2xl z-20 transition-opacity duration-500 ${
          !detailsEven ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="absolute -top-2 left-0 w-8 h-1 bg-primary rounded-full" />
            <div className="pt-4 text-xl text-white/90 tracking-wide">
              {currentSlide.category}
            </div>
          </div>
        </div>

        <h1 className="text-7xl font-bold text-white mb-2 tracking-tight leading-none">
          {currentSlide.title}
        </h1>
        <h2 className="text-7xl font-bold text-white mb-6 tracking-tight leading-none">
          {currentSlide.subtitle}
        </h2>

        <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
          {currentSlide.description}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={currentSlide.ctaAction}
            className="btn-brand text-white px-8 py-3 rounded-full font-medium hover:scale-105 shadow-xl"
          >
            {currentSlide.cta}
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-16 flex items-center gap-6 z-30">
        {/* Arrows */}
        <button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white/70 group-hover:text-white" />
        </button>

        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white" />
        </button>

        {/* Progress Bar */}
        <div className="w-96 h-12 flex items-center">
          <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Slide Number */}
        <div className="w-12 h-12 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {activeIndex + 1}
          </span>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 right-16 flex items-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? 'w-12 h-3 bg-primary'
                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TimedCarousel;
