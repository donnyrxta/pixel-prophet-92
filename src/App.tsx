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
import HararePage from "./pages/locations/Harare";
import BulawayoPage from "./pages/locations/Bulawayo";
import GweruPage from "./pages/locations/Gweru";
import MutarePage from "./pages/locations/Mutare";
import Webstore from "./pages/Webstore";
import WebstoreCategory from "./pages/WebstoreCategory";
import WebstoreProductDetail from "./pages/WebstoreProductDetail";
import WebstoreCart from "./pages/WebstoreCart";
import WebstoreCheckout from "./pages/WebstoreCheckout";
import WebstoreOrderConfirmation from "./pages/WebstoreOrderConfirmation";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";
// Global Widgets - Present on all pages
import UnifiedContactWidget from "./components/UnifiedContactWidget";
import PersistentAIWidget from "./components/PersistentAIWidget";
// E-commerce Context
import { WebstoreCartProvider } from "./context/WebstoreCartContext";
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
        <Route path="/locations/harare" element={<HararePage />} />
        <Route path="/locations/bulawayo" element={<BulawayoPage />} />
        <Route path="/locations/gweru" element={<GweruPage />} />
        <Route path="/locations/mutare" element={<MutarePage />} />
        <Route path="/ad-planner" element={<AdPlannerPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
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
        <WebstoreCartProvider>
          <QuoteCalculatorProvider>
            <AdPlannerProvider>
              <AppRoutes />
            </AdPlannerProvider>
          </QuoteCalculatorProvider>
        </WebstoreCartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
