import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * TimedCarousel displays a sequence of hero slides with automatic
 * transitions and a visual progress bar. Each slide contains a
 * background image, headline, subheading and call‑to‑action. The
 * carousel uses a simple timer to advance slides and track progress.
 * Horizontal transitions are achieved using CSS transforms. This
 * component draws inspiration from the Codepen “Timed Cards
 * Opening” example while adhering to Soho Connect’s brand aesthetic.
 *
 * @param {Object} props
 * @param {Array} props.slides - Array of slide objects with keys:
 *   id, headline, subheadline, description, image, ctaText, ctaHref.
 */
export default function TimedCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Update progress bar and auto‑advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        // When progress reaches 100, advance to next slide
        if (p >= 100) {
          setActiveIndex((idx) => (idx + 1) % slides.length);
          return 0;
        }
        return p + 1;
      });
    }, 80); // 80ms * 100 = 8 seconds per slide
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden h-[75vh]">
      {/* Slide container: translates horizontally based on activeIndex */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative flex items-center justify-center"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden="true"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Content wrapper with glassmorphic effect */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl shadow-xl p-8">
              <p className="text-sm uppercase tracking-widest text-white/80 mb-2">
                {slide.subheadline}
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                {slide.headline}
              </h2>
              <p className="max-w-xl mx-auto mb-6 text-white/90 text-lg">
                {slide.description}
              </p>
              {slide.ctaText && slide.ctaHref && (
                <Link
                  href={slide.ctaHref}
                  className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition"
                >
                  {slide.ctaText}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
        <div
          className="h-full bg-primary transition-all duration-80"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border border-white transition-colors ${
              idx === activeIndex ? 'bg-primary' : 'bg-white/20'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => {
              setActiveIndex(idx);
              setProgress(0);
            }}
          />
        ))}
      </div>
    </div>
  );
}