/**
 * HorizontalScroll - Touch-friendly horizontal scrollable container
 * Optimized for tactile swiping experience
 */

import { ReactNode, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showArrows?: boolean;
}

export const HorizontalScroll = ({
  children,
  title,
  subtitle,
  className = '',
  showArrows = true
}: HorizontalScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const currentScroll = scrollContainerRef.current.scrollLeft;

    scrollContainerRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-blue-600 mb-2 font-['Oswald']">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-center max-w-2xl mx-auto text-gray-700">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Scroll Container */}
      <div className="relative">
        {showArrows && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide px-4 md:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex gap-6 pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
