import CardSlider from "@/components/CardSlider";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBand from "@/components/TrustBand";
import SEOHead from "@/components/SEOHead";

/**
 * Main landing page for Soho Connect
 * Features full-screen card slider with GSAP animations
 * Conversion-optimized for lead generation with empirical frameworks:
 * - Serial Position Effect (trust signals positioned early)
 * - Social Proof (statistics and client count)
 * - Proximity (contact info near conversion points)
 *
 * NOTE: FloatingContact and AI widgets are now global in App.tsx
 */
const Index = () => {
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
        <CardSlider />
        {/* Trust Band - Positioned after hero for Serial Position Effect */}
        <TrustBand />
        <Footer />
      </div>
    </>
  );
};

export default Index;
