/**
 * CategoryHero - Premium glassmorphic hero section for category pages
 * Features timed carousel with GSAP animations
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  useEffect(() => {
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
  }, [slides.length]);

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
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
        style={{ backgroundImage: `url('${currentSlideData.image}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glassmorphic Content Card */}
      <div className="relative z-10 max-w-2xl mx-auto text-center backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in">
        <p className="text-sm uppercase tracking-widest text-white/80 mb-2">
          {tagline}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-2 font-['Oswald'] tracking-tight">
          {currentSlideData.title}
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Oswald'] text-blue-300 tracking-tight">
          {currentSlideData.subtitle}
        </h2>
        <p className="max-w-xl mx-auto mb-6 text-white/90 text-base md:text-lg leading-relaxed">
          {currentSlideData.description}
        </p>

        {onCTAClick && (
          <button
            onClick={onCTAClick}
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-white/50 backdrop-blur-sm bg-black/20 flex items-center justify-center hover:bg-black/40 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-white/50 backdrop-blur-sm bg-black/20 flex items-center justify-center hover:bg-black/40 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative w-12 h-1 bg-white/30 rounded-full overflow-hidden"
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
