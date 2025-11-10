import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServicesDetail from "./pages/ServicesDetail";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import ElectronicsHome from "./pages/ElectronicsHome";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import HararePage from "./pages/locations/Harare";
import BulawayoPage from "./pages/locations/Bulawayo";
import GweruPage from "./pages/locations/Gweru";
import MutarePage from "./pages/locations/Mutare";
import NotFound from "./pages/NotFound";
// Global Widgets - Present on all pages
import UnifiedContactWidget from "./components/UnifiedContactWidget";
import PersistentAIWidget from "./components/PersistentAIWidget";
// E-commerce Context
import { CartProvider } from "./context/CartContext";
import { QuoteCalculatorProvider } from "./context/QuoteCalculatorContext";
import { AdPlannerProvider } from "./context/AdPlannerContext";
import AdPlannerPage from "./pages/AdPlanner";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracking();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServicesDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/electronics" element={<ElectronicsHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/locations/harare" element={<HararePage />} />
        <Route path="/locations/bulawayo" element={<BulawayoPage />} />
        <Route path="/locations/gweru" element={<GweruPage />} />
        <Route path="/locations/mutare" element={<MutarePage />} />
        <Route path="/ad-planner" element={<AdPlannerPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global Widgets - Always visible across all pages */}
      <PersistentAIWidget />
      <UnifiedContactWidget />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <QuoteCalculatorProvider>
            <AdPlannerProvider>
              <AppRoutes />
            </AdPlannerProvider>
          </QuoteCalculatorProvider>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
