import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Phone, Mail, Printer, Palette, TrendingUp, BookOpen } from "lucide-react";
import { useQuoteCalculator } from "@/context/QuoteCalculatorContext";
import KnowledgeBase from "./KnowledgeBase";
import { CONTACT_INFO, BUSINESS_INFO } from "@/lib/constants";

// Card data for each service section
// Use locally hosted, optimized hero images to ensure reliability
const cardData = [
  {
    id: 0,
    place: "Harare CBD",
    title: "HARARE'S",
    title2: "DESIGN & PRINT PARTNER",
    description: "Trusted by 127+ businesses. Your one-stop solution for premium printing, branding, and digital marketing services in Zimbabwe.",
    image: "/images/hero/kaffie-co-7hEZILVOcFU-unsplash.jpg",
    icon: Printer,
    ctaText: "Get Instant Quote",
    ctaAction: "calculator"
  },
  {
    id: 1,
    place: "Printing Services",
    title: "PREMIUM",
    title2: "PRINTING",
    description: "High-quality brochures, flyers, business cards, banners, and large format printing. Fast turnaround, professional finish.",
    image: "/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg",
    icon: Printer,
    ctaText: "Get Instant Quote",
    ctaAction: "calculator"
  },
  {
    id: 2,
    place: "Brand Identity",
    title: "BRANDING &",
    title2: "MARKETING",
    description: "Build a strong brand identity and effective marketing strategies. Logo design, brand guidelines, and complete visual systems.",
    image: "/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg",
    icon: Palette,
    ctaText: "Get Instant Quote",
    ctaAction: "calculator"
  },
  {
    id: 3,
    place: "Digital Growth",
    title: "DIGITAL",
    title2: "MARKETING",
    description: "Drive growth with targeted online campaigns. Social media management, SEO, content marketing, and analytics.",
    image: "/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg",
    icon: TrendingUp,
    ctaText: "Get Instant Quote",
    ctaAction: "calculator"
  },
  {
    id: 4,
    place: "Resources",
    title: "KNOWLEDGE",
    title2: "BASE",
    description: "Access our collection of articles, case studies, and research on effective marketing and printing strategies.",
    image: "/images/hero/kaffie-co-DJb2MdMuzbU-unsplash.jpg",
    icon: BookOpen,
    ctaText: "Explore Resources",
    ctaAction: "knowledge"
  }
];

const CardSlider = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const { openCalculator } = useQuoteCalculator();
  const [detailsEven, setDetailsEven] = useState(true);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const paginationRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const detailsEvenRef = useRef<HTMLDivElement>(null);
  const detailsOddRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations on mount
  useEffect(() => {
    const init = () => {
      const { innerHeight: height, innerWidth: width } = window;
      const isMobile = width < 768;

      // Set initial positions
      if (paginationRef.current && navRef.current) {
        gsap.set(paginationRef.current, {
          bottom: isMobile ? 30 : 50,
          left: isMobile ? "50%" : 60,
          x: isMobile ? "-50%" : 0,
          opacity: 0,
          y: 50
        });
        gsap.set(navRef.current, { y: -100, opacity: 0 });
      }

      // Set active card to full screen
      if (cardsRef.current[0]) {
        gsap.set(cardsRef.current[0], {
          width: "100%",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 20
        });
      }

      // Set initial details state
      const detailsActive = detailsEvenRef.current;
      if (detailsActive) {
        gsap.set(detailsActive, { opacity: 0, x: -200, zIndex: 22 });
      }

      // Set progress bar
      if (progressRef.current) {
        gsap.set(progressRef.current, {
          width: `${(1 / cardData.length) * 100}%`
        });
      }

      // Animate cover reveal
      if (coverRef.current) {
        gsap.to(coverRef.current, {
          x: width + 400,
          delay: 0.3,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            // Animate UI elements in
            gsap.to(paginationRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
            gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
            gsap.to(detailsActive, { opacity: 1, x: 0, duration: 0.6, delay: 0.4 });
          }
        });
      }
    };

    init();
  }, []);

  // Handle CTA button clicks
  const handleCTA = (action: string) => {
    if (action === "calculator") {
      openCalculator({ trigger: 'button' });
    } else if (action === "knowledge") {
      setShowKnowledge(true);
    }
  };

  // Navigate between cards
  const navigateCard = (direction: number) => {
    const newIndex = Math.max(0, Math.min(cardData.length - 1, activeCard + direction));
    if (newIndex !== activeCard) {
      setActiveCard(newIndex);

      // Update progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${((newIndex + 1) / cardData.length) * 100}%`,
          duration: 0.5,
          ease: "power2.inOut"
        });
      }

      // Toggle details panels
      setDetailsEven(!detailsEven);
    }
  };

  return (
    <>
      {/* Top progress indicator */}
      <div
        ref={indicatorRef}
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50"
        style={{ width: `${((activeCard + 1) / cardData.length) * 100}%`, transition: "width 0.5s ease" }}
      />

      {/* Navigation bar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 md:py-6"
      >
        <a href="/" aria-label="Soho Connect home" className="flex items-center gap-3">
          <img
            src="/images/brand/logo-color-icon.png"
            alt="Soho Connect logo"
            width={128}
            height={128}
            loading="eager"
            decoding="async"
            className="w-16 h-auto md:w-20 lg:w-24 xl:w-28 select-none will-change-transform animate-breathe"
          />
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/80 uppercase">
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-accent transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <a href={`tel:${CONTACT_INFO.phone}`} className="hidden md:flex items-center gap-2 text-white/80 hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{CONTACT_INFO.phone}</span>
          </a>
        </div>
      </nav>

      {/* Card container */}
      <div className="fixed inset-0 overflow-hidden bg-background">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute w-full h-screen bg-cover bg-center transition-all duration-700"
            style={{
              // Layer gradient + primary image + local fallback to prevent display issues
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${card.image}), url(/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg)`,
              opacity: index === activeCard ? 1 : 0,
              pointerEvents: index === activeCard ? 'auto' : 'none'
            }}
          />
        ))}
      </div>

      {/* Details panels (alternating for smooth transitions) */}
      <div
        ref={detailsEvenRef}
        className="fixed z-30 top-1/4 left-8 md:left-16 max-w-xl"
        style={{ opacity: detailsEven && activeCard >= 0 ? 1 : 0 }}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-accent rounded-full" />
            <span className="text-white/90 text-sm md:text-base">{cardData[activeCard]?.place}</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none text-shadow-strong">
              {cardData[activeCard]?.title}
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none text-shadow-strong">
              {cardData[activeCard]?.title2}
            </h1>
          </div>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md text-shadow-strong">
            {cardData[activeCard]?.description}
          </p>
          <button
            onClick={() => handleCTA(cardData[activeCard]?.ctaAction)}
            className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {cardData[activeCard]?.ctaText}
          </button>
        </div>
      </div>

      <div
        ref={detailsOddRef}
        className="fixed z-30 top-1/4 left-8 md:left-16 max-w-xl"
        style={{ opacity: !detailsEven && activeCard >= 0 ? 1 : 0 }}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-accent rounded-full" />
            <span className="text-white/90 text-sm md:text-base">{cardData[activeCard]?.place}</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none text-shadow-strong">
              {cardData[activeCard]?.title}
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none text-shadow-strong">
              {cardData[activeCard]?.title2}
            </h1>
          </div>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md text-shadow-strong">
            {cardData[activeCard]?.description}
          </p>
          <button
            onClick={() => handleCTA(cardData[activeCard]?.ctaAction)}
            className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {cardData[activeCard]?.ctaText}
          </button>
        </div>
      </div>

      {/* Navigation controls */}
      <div
        ref={paginationRef}
        className="fixed z-40 flex items-center gap-4"
      >
        <button
          onClick={() => navigateCard(-1)}
          disabled={activeCard === 0}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous card"
        >
          ‹
        </button>
        <button
          onClick={() => navigateCard(1)}
          disabled={activeCard === cardData.length - 1}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next card"
        >
          ›
        </button>
        <div className="hidden md:flex items-center ml-4">
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-accent transition-all duration-500"
            />
          </div>
        </div>
        <div className="ml-4 text-white text-2xl font-bold">
          {activeCard + 1}
        </div>
      </div>

      {/* Loading cover */}
      <div
        ref={coverRef}
        className="fixed inset-0 bg-primary z-50"
      />


      {/* Modals */}
      {showKnowledge && <KnowledgeBase onClose={() => setShowKnowledge(false)} />}

      {/* Floating Quote button */}
      <button
        onClick={() => openCalculator({ trigger: 'button' })}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        aria-label="Get instant quote"
      >
        <Mail className="w-6 h-6" />
      </button>
    </>
  );
};

export default CardSlider;