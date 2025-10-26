import CardSlider from "@/components/CardSlider";
import { Header } from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

/**
 * Main landing page for Soho Connect
 * Features full-screen card slider with GSAP animations
 * Conversion-optimized for lead generation
 * Full navigation integration
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
      <div className="min-h-screen">
        <Header />
        <CardSlider />
        <FloatingContact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
