/**
 * Client Logos Component - Social proof carousel
 * Displays trusted client logos in an animated carousel
 */
import { useEffect, useRef } from "react";

interface ClientLogosProps {
  title?: string;
  subtitle?: string;
}

const ClientLogos = ({ title, subtitle }: ClientLogosProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sample client logos from public/images/clients
  const logos = [
    { name: "AirSwap", src: "/images/clients/AirSwapLogo.svg" },
    { name: "1st Company", src: "/images/clients/1st.svg" },
    { name: "2Key", src: "/images/clients/2key.svg" },
    { name: "0xBitcoin", src: "/images/clients/0xbitcoin.svg" },
    { name: "Bitcoin", src: "/images/clients/bitcoin-logo.svg" },
    { name: "Biohazard", src: "/images/clients/biohazard.svg" },
    { name: "Airbnb", src: "/images/clients/airbnb.svg" },
    { name: "Duck Co", src: "/images/clients/duck.svg" },
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when halfway through duplicated content
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Logos Container with Overflow Hidden */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling Logos */}
          <div
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
