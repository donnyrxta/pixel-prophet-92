import CardSlider from "@/components/CardSlider";
import { Header } from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";

/**
 * Main landing page for Soho Connect
 * Features full-screen card slider with GSAP animations
 * Conversion-optimized for lead generation
 * Full navigation integration
 */
const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CardSlider />
      <FloatingContact />
    </div>
  );
};

export default Index;
