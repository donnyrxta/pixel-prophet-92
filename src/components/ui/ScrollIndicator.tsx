import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ScrollIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    showButtons?: boolean;
}

export const ScrollIndicator = ({
    children,
    className,
    showButtons = false,
    ...props
}: ScrollIndicatorProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            // Use a small tolerance (1px) for cross-browser consistency
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            checkScroll();
            el.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            return () => {
                el.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [children]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = scrollRef.current.clientWidth * 0.75;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={cn("relative group/scroll", className)} {...props}>
            {/* Left Fade */}
            <div
                className={cn(
                    "absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
                    canScrollLeft ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Right Fade */}
            <div
                className={cn(
                    "absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
                    canScrollRight ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Navigation Buttons (Optional) */}
            {showButtons && (
                <>
                    <button
                        onClick={() => scroll('left')}
                        className={cn(
                            "absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm flex items-center justify-center transition-opacity opacity-0 group-hover/scroll:opacity-100 disabled:opacity-0",
                            !canScrollLeft && "hidden"
                        )}
                        disabled={!canScrollLeft}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className={cn(
                            "absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm flex items-center justify-center transition-opacity opacity-0 group-hover/scroll:opacity-100 disabled:opacity-0",
                            !canScrollRight && "hidden"
                        )}
                        disabled={!canScrollRight}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </>
            )}

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide"
            >
                {children}
            </div>
        </div>
    );
};
