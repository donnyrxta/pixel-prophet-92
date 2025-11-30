import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { PRODUCTS, useInventoryProducts } from '@/lib/shop/products';
import { useToast } from '@/hooks/use-toast';
import { trackPageView } from '@/lib/gtm';
import { CONTACT_INFO } from '@/lib/constants';

const Shop = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useInventoryProducts();
  const { toast } = useToast();

  useEffect(() => {
    trackPageView('Electronics Shop', '/shop');
  }, []);

  useEffect(() => {
    if (isError && error instanceof Error) {
      toast({ title: 'Inventory load failed', description: error.message, variant: 'destructive' });
    }
  }, [isError, error, toast]);

  // Structured Data - ElectronicsStore Schema
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "SohoConnect Electronics Division",
    "description": "Premium smartphones, professional CCTV systems, tech accessories and business consumables in Harare, Zimbabwe",
    "url": "https://sohoconnect.co.zw/shop",
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7 Luck Street, Avondale",
      "addressLocality": "Harare",
      "addressRegion": "Harare Province",
      "postalCode": "",
      "addressCountry": "ZW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-17.8216",
      "longitude": "31.0492"
    },
    "priceRange": "$$",
    "paymentAccepted": ["EcoCash", "Visa", "MasterCard", "Bank Transfer"],
    "currenciesAccepted": "USD",
    "openingHours": "Mo-Fr 08:00-17:00, Sa 09:00-13:00",
    "image": "https://sohoconnect.co.zw/images/brand/logo-color-icon.png",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electronics Products",
      "itemListElement": PRODUCTS.map(product => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "sku": product.sku,
          "image": product.image,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD",
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Electronics Shop - Smartphones, CCTV & Tech"
        description="Shop premium smartphones, CCTV systems, tech accessories and business consumables in Harare. Authorized dealer with warranty. Visit our store at 7 Luck Street."
        keywords="electronics harare, smartphones zimbabwe, cctv installation, tech accessories, business electronics, soho connect shop"
        canonical="https://sohoconnect.co.zw/shop"
      />

      {/* Structured Data - ElectronicsStore */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Electronics Division
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Premium smartphones, professional CCTV systems, and quality tech accessories.
              Authorized dealer • Warranty included • Expert installation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/cart')}
                className="bg-[#4169e1] hover:bg-[#4169e1]/90"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                View Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
              >
                Contact Sales
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Products Grid with Filtering */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <ProductGrid
              products={(data && data.length > 0) ? data : PRODUCTS}
              showCategoryFilter={true}
              showSearch={true}
              showLayoutToggle={true}
              initialLayout="grid"
            />
          )}

          {/* Trust Signals */}
          <section className="bg-muted/30 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">🚚</div>
                  <h3 className="font-semibold text-foreground mb-2">Free Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Within Harare CBD on orders over $100
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🛡️</div>
                  <h3 className="font-semibold text-foreground mb-2">Warranty Included</h3>
                  <p className="text-sm text-muted-foreground">
                    12-month manufacturer warranty on all devices
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🔧</div>
                  <h3 className="font-semibold text-foreground mb-2">Expert Installation</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional CCTV setup and configuration
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💳</div>
                  <h3 className="font-semibold text-foreground mb-2">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    EcoCash, Visa, Mastercard accepted
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
