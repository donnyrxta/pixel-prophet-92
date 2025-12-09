import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useHotjar } from "@/hooks/useHotjar";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServicesDetail from "./pages/ServicesDetail";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HararePage from "./pages/locations/Harare";
import BulawayoPage from "./pages/locations/Bulawayo";
import GweruPage from "./pages/locations/Gweru";
import MutarePage from "./pages/locations/Mutare";
import SmartphonesHarare from "./pages/SmartphonesHarare";
import LaptopsZimbabwe from "./pages/LaptopsZimbabwe";
import CctvInstallationHarare from "./pages/CctvInstallationHarare";
import VehicleBrandingHarare from "./pages/VehicleBrandingHarare";
import BusinessCardsHarare from "./pages/BusinessCardsHarare";
import Webstore from "./pages/Webstore";
import WebstoreCategory from "./pages/WebstoreCategory";
import WebstoreProductDetail from "./pages/WebstoreProductDetail";
import WebstoreCart from "./pages/WebstoreCart";
import WebstoreCheckout from "./pages/WebstoreCheckout";
import WebstoreOrderConfirmation from "./pages/WebstoreOrderConfirmation";
import WifiMarketing from "./pages/WifiMarketing";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import DemoCards from "./pages/DemoCards";
import LaptopGuide2026 from "./pages/resources/guides/LaptopGuide2026";
import SmartphoneGuide from "./pages/resources/guides/SmartphoneGuide";
import PrintFinishesGuide from "./pages/resources/guides/PrintFinishesGuide";
import CctvBuyersGuide from "./pages/resources/guides/CctvBuyersGuide";
import FleetBrandingGuide from "./pages/resources/guides/FleetBrandingGuide";
import WifiTokenCalculatorPage from "./pages/resources/tools/WifiTokenCalculatorPage";
import MiningCampWifiGuide from "./pages/resources/blog/MiningCampWifiGuide";
import SolarWifiOffGridGuide from "./pages/resources/blog/SolarWifiOffGridGuide";
import NotFound from "./pages/NotFound";
// Internal Tools
import InternalLayout from "./components/internal/InternalLayout";
import InternalDashboard from "./pages/internal/InternalDashboard";
import NewCampaign from "./pages/internal/NewCampaign";
import CampaignLogs from "./pages/internal/CampaignLogs";
import InternalSettings from "./pages/internal/InternalSettings";
// Global Widgets - Present on all pages
import UnifiedContactWidget from "./components/UnifiedContactWidget";
import PersistentAIWidget from "./components/PersistentAIWidget";
import { CompareFloatingBar } from "./components/webstore/CompareFloatingBar";
// E-commerce Context
import { WebstoreCartProvider } from "./context/WebstoreCartContext";
import { QuoteCalculatorProvider } from "./context/QuoteCalculatorContext";
import { AdPlannerProvider } from "./context/AdPlannerContext";
import { ComparisonProvider } from "./context/ComparisonContext";
import AdPlannerPage from "./pages/AdPlanner";
import ProductComparison from "./pages/ProductComparison";
import ErrorBoundary from "./components/ErrorBoundary";
import { recordEvent } from "./lib/strapi-client";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracking();
  // TODO: Replace with actual Hotjar ID (HJID) and Snippet Version (HJSV)
  useHotjar(1234567, 6);

  return (
    <>
      <main id="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/wifi-marketing" element={<WifiMarketing />} />
            <Route path="/services/:slug" element={<ServicesDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Redirect old routes to webstore */}
            <Route path="/electronics" element={<Webstore />} />
            <Route path="/shop" element={<Webstore />} />
            <Route path="/shop/product/:productId" element={<Webstore />} />
            <Route path="/cart" element={<WebstoreCart />} />
            <Route path="/checkout" element={<WebstoreCheckout />} />
            <Route path="/order-success" element={<WebstoreOrderConfirmation />} />
            <Route path="/webstore" element={<Webstore />} />
            <Route path="/webstore/category/:slug" element={<WebstoreCategory />} />
            <Route path="/webstore/product/:slug" element={<WebstoreProductDetail />} />
            <Route path="/webstore/cart" element={<WebstoreCart />} />
            <Route path="/webstore/checkout" element={<WebstoreCheckout />} />
            <Route path="/webstore/order-confirmation" element={<WebstoreOrderConfirmation />} />
            <Route path="/compare" element={<ProductComparison />} />
            <Route path="/locations/harare" element={<HararePage />} />
            <Route path="/locations/bulawayo" element={<BulawayoPage />} />
            <Route path="/locations/gweru" element={<GweruPage />} />
            <Route path="/locations/mutare" element={<MutarePage />} />
            <Route path="/smartphones-harare" element={<SmartphonesHarare />} />
            <Route path="/laptops-zimbabwe" element={<LaptopsZimbabwe />} />
            <Route path="/cctv-installation-harare" element={<CctvInstallationHarare />} />
            <Route path="/vehicle-branding-harare" element={<VehicleBrandingHarare />} />
            <Route path="/business-cards-harare" element={<BusinessCardsHarare />} />
            <Route path="/ad-planner" element={<AdPlannerPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/mining-camp-wifi-guide" element={<MiningCampWifiGuide />} />
            <Route path="/blog/solar-wifi-off-grid-guide" element={<SolarWifiOffGridGuide />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/tools/wifi-token-calculator" element={<WifiTokenCalculatorPage />} />
            <Route path="/demo-cards" element={<DemoCards />} />
            {/* Internal Tools - Protected Dashboard */}
            <Route path="/internal" element={<InternalLayout />}>
              <Route index element={<InternalDashboard />} />
              <Route path="campaign/new" element={<NewCampaign />} />
              <Route path="logs" element={<CampaignLogs />} />
              <Route path="settings" element={<InternalSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>

      {/* Global Widgets - Always visible across all pages */}
      <PersistentAIWidget />
      <UnifiedContactWidget />
      <CompareFloatingBar />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <WebstoreCartProvider>
          <QuoteCalculatorProvider>
            <AdPlannerProvider>
              <ComparisonProvider>
                <AppRoutes />
              </ComparisonProvider>
            </AdPlannerProvider>
          </QuoteCalculatorProvider>
        </WebstoreCartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Global runtime error monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error || event.message);
    try {
      const payload = {
        type: 'global_error',
        message: String(event.error?.message || event.message || ''),
        stack: String(event.error?.stack || ''),
        route: window.location.pathname,
        userAgent: navigator.userAgent,
        ts: new Date().toISOString()
      };
      recordEvent(payload).catch(() => { });
    } catch { }
  });
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    console.error('Unhandled rejection:', event.reason);
    try {
      const payload = {
        type: 'unhandled_rejection',
        message: String(event.reason?.message || event.reason || ''),
        stack: String(event.reason?.stack || ''),
        route: window.location.pathname,
        userAgent: navigator.userAgent,
        ts: new Date().toISOString()
      };
      recordEvent(payload).catch(() => { });
    } catch { }
  });
}

export default App;
