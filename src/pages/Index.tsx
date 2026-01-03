import TimedCarousel from "@/components/TimedCarousel";
import StorySection from "@/components/StorySection";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBand from "@/components/TrustBand";
import SEOHead from "@/components/SEOHead";
import { useQuoteCalculator } from "@/context/QuoteCalculatorContext";

/**
 * Main landing page for Soho Connect
 * Features full-screen card slider with GSAP animations
 * Conversion-optimized for lead generation with empirical frameworks:
 * - Serial Position Effect (trust signals positioned early)
 * - Social Proof (statistics and client count)
 * - Proximity (contact info near conversion points)
 *
 * NOTE: FloatingContact and AI widgets are now global in App.tsx
 * NOTE: Quote Calculator is now managed globally via QuoteCalculatorContext
 */
const Index = () => {
  const { openCalculator } = useQuoteCalculator();

  const carouselSlides = [
    {
      id: 'branding',
      category: 'Brand Identity',
      title: 'PROFESSIONAL',
      subtitle: 'BRANDING',
      description: 'Build a strong brand identity that resonates with your audience. From logo design to complete visual systems.',
      image: '/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg',
      cta: 'Start Your Brand',
      ctaAction: () => openCalculator({ preselectedCategory: 'Branding', trigger: 'button' })
    },
    {
      id: 'printing',
      category: 'Print Services',
      title: 'PREMIUM',
      subtitle: 'PRINTING',
      description: 'High-quality print materials that make your business stand out. Business cards, brochures, banners, and more.',
      image: '/images/hero/kaffie-co-7hEZILVOcFU-unsplash.jpg',
      cta: 'Get Print Quote',
      ctaAction: () => openCalculator({ preselectedCategory: 'Printing', trigger: 'button' })
    },
    {
      id: 'digital',
      category: 'Digital Marketing',
      title: 'DIGITAL',
      subtitle: 'EXCELLENCE',
      description: 'Elevate your online presence with strategic digital marketing and engaging content.',
      image: '/images/hero/kaffie-co-DJb2MdMuzbU-unsplash.jpg',
      cta: 'Go Digital',
      ctaAction: () => openCalculator({ preselectedCategory: 'Digital', trigger: 'button' })
    },
    {
      id: 'signage',
      category: 'Signage Solutions',
      title: 'IMPACTFUL',
      subtitle: 'SIGNAGE',
      description: 'Professional signage that attracts attention and drives foot traffic to your business.',
      image: '/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg',
      cta: 'Explore Signage',
      ctaAction: () => openCalculator({ preselectedCategory: 'Signage', trigger: 'button' })
    },
    {
      id: 'wifi',
      category: 'WiFi Marketing',
      title: 'SMART',
      subtitle: 'CONNECTIVITY',
      description: 'Turn your guest WiFi into a powerful marketing engine. Capture data and drive repeat visits.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
      cta: 'WiFi Solutions',
      ctaAction: () => window.location.href = '/services/wifi-marketing'
    }
  ];

  return (
    <>
      <SEOHead
        title="Premium Printing & Marketing in Harare"
        description="Harare's trusted design, print & marketing partner. Premium printing, branding, and digital marketing services. Trusted by 127+ businesses. Located at 7 Luck Street, Harare CBD."
        keywords="printing harare, branding zimbabwe, digital marketing harare, business cards, brochure printing, banner printing, soho connect"
        canonical="https://sohoconnect.co.zw/"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <TimedCarousel slides={carouselSlides} />
        <StorySection />
        <TrustBand />
        <Footer />
      </div>
    </>
  );
};

export default Index;
