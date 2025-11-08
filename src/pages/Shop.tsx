import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { PRODUCTS } from '@/lib/shop/products';
import { trackPageView } from '@/lib/gtm';

const Shop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('Electronics Shop', '/shop');
  }, []);

  return (
    <>
      <SEOHead
        title="Electronics Shop - Smartphones, CCTV & Tech"
        description="Shop premium smartphones, CCTV systems, tech accessories and business consumables in Harare. Authorized dealer with warranty. Visit our store at 7 Luck Street."
        keywords="electronics harare, smartphones zimbabwe, cctv installation, tech accessories, business electronics, soho connect shop"
        canonical="https://sohoconnect.co.zw/shop"
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
          <ProductGrid
            products={PRODUCTS}
            showCategoryFilter={true}
            showSearch={true}
            showLayoutToggle={true}
            initialLayout="grid"
          />

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
