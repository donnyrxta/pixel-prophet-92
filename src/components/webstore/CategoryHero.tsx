/**
 * CategoryHero - Premium glassmorphic hero section for category pages
 * Features timed carousel with GSAP animations
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface CategoryHeroProps {
  tagline: string;
  slides: HeroSlide[];
  onCTAClick?: () => void;
}

export const CategoryHero = ({ tagline, slides, onCTAClick }: CategoryHeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  // Auto-advance carousel (disabled if user prefers reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [slides.length, prefersReducedMotion]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-[70vh] sm:h-[70vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden isolate">
      {/* Background Image with Parallax Effect (disabled if reduced motion) */}
      <div
        className={`absolute inset-0 bg-cover bg-center z-0 pointer-events-none ${
          prefersReducedMotion
            ? 'transform-none'
            : 'transition-all duration-1000 ease-in-out transform scale-105'
        }`}
        style={{ backgroundImage: `url('${currentSlideData.image}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

      {/* Glassmorphic Content Card */}
      <div className="relative z-10 w-full max-w-2xl mx-4 sm:mx-6 md:mx-auto text-center backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 animate-fade-in">
        <p className="text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest text-white/80 mb-2 sm:mb-3">
          {tagline}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2 font-['Oswald'] tracking-tight text-shadow-strong">
          {currentSlideData.title}
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-['Oswald'] text-blue-300 tracking-tight text-shadow-strong">
          {currentSlideData.subtitle}
        </h2>
        <p className="max-w-xl mx-auto mb-5 sm:mb-6 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed px-2">
          {currentSlideData.description}
        </p>

        {onCTAClick && (
          <button
            onClick={onCTAClick}
            className="inline-block bg-white text-blue-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg touch-target"
          >
            Browse Products
          </button>
        )}
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/50 backdrop-blur-sm bg-black/30 flex items-center justify-center hover:bg-black/50 transition-all touch-target"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/50 backdrop-blur-sm bg-black/30 flex items-center justify-center hover:bg-black/50 transition-all touch-target"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-4 safe-area-bottom">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative w-8 sm:w-10 md:w-12 h-1 bg-white/30 rounded-full overflow-hidden touch-target"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <div
                    className="absolute top-0 left-0 h-full bg-white rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {index < currentSlide && (
                  <div className="absolute top-0 left-0 h-full w-full bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
