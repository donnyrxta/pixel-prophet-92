/**
 * Bulawayo Location Page - Local SEO optimized
 * Zimbabwe's second-largest city and industrial capital
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShoppingCart, Store, Truck, Shield } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';
import { trackPageView } from '@/lib/gtm';

const BulawayoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('Bulawayo Location', '/locations/bulawayo');
  }, []);

  // Structured Data - LocalBusiness Schema for Bulawayo
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "SohoConnect Electronics - Bulawayo Service Area",
    "description": "Premium electronics supplier serving Bulawayo and Zimbabwe's industrial heartland. Smartphones, CCTV systems, and business electronics with delivery across Bulawayo's industrial and residential areas.",
    "url": "https://sohoconnect.co.zw/locations/bulawayo",
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bulawayo",
      "addressRegion": "Matabeleland North Province",
      "addressCountry": "ZW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-20.1481",
      "longitude": "28.5800"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["EcoCash", "Visa", "MasterCard", "Bank Transfer"],
    "currenciesAccepted": "USD",
    "areaServed": {
      "@type": "City",
      "name": "Bulawayo"
    }
  };

  return (
    <>
      <SEOHead
        title="Electronics Supplier in Bulawayo, Zimbabwe | SohoConnect"
        description="SohoConnect serves Bulawayo with premium smartphones, industrial CCTV systems, and business electronics. Free delivery across Bulawayo's industrial sites and suburbs. Contact us for bulk orders and installations."
        keywords="electronics bulawayo, smartphones bulawayo zimbabwe, cctv bulawayo, industrial electronics zimbabwe, tech supplier bulawayo, business electronics matabeleland"
        canonical="https://sohoconnect.co.zw/locations/bulawayo"
      />

      {/* Structured Data - LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#4169e1]/10 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-[#4169e1]" />
                <span className="text-lg font-semibold text-[#4169e1]">Bulawayo, Zimbabwe</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Electronics Solutions for Bulawayo's Industrial Sector
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Serving Zimbabwe's second-largest city and industrial capital with enterprise-grade electronics, professional CCTV installations, and reliable business technology solutions. Trusted by Bulawayo's manufacturing, mining, and commercial sectors.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/shop')}
                  className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  View Products
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        <main className="flex-1">
          {/* Why Bulawayo Businesses Choose SohoConnect */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Supporting Bulawayo's Industrial Growth
                </h2>

                <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
                  <p className="text-lg leading-relaxed mb-6">
                    As Zimbabwe's industrial heartland, Bulawayo presents unique technology requirements that demand robust, reliable solutions. SohoConnect understands the operational needs of Belmont Industrial Area, Donnington, and Kelvin Industrial Sites, providing electronics designed to withstand the demands of manufacturing environments while maintaining optimal performance despite power fluctuations common in the region.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Our Bulawayo service extends beyond simple product supply. We specialize in industrial-grade CCTV installations for warehouses, manufacturing plants, and commercial premises across the city. Our surveillance systems feature backup power integration and remote monitoring capabilities optimized for Bulawayo's infrastructure, ensuring continuous security coverage for your business assets whether you're in the city center or the industrial suburbs.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    From Nkulumane to Burnside, Newton West to Hillside, Bulawayo's businesses rely on SohoConnect for smartphone provisioning, office electronics, and tech infrastructure. We stock rugged business-grade devices suitable for industrial supervisors, warehouse managers, and field technicians—equipment that performs reliably in Bulawayo's varied commercial environments from dusty manufacturing floors to climate-controlled offices.
                  </p>

                  <p className="text-lg leading-relaxed">
                    For Bulawayo's mining support companies, agricultural processors, and manufacturing operations, we offer bulk procurement options with competitive pricing and flexible payment terms including EcoCash for convenience. Our delivery network covers all major industrial areas, residential suburbs, and the CBD, ensuring your business technology arrives when you need it, where you need it.
                  </p>
                </div>

                {/* Key Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <Store className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Industrial-Grade Solutions
                    </h3>
                    <p className="text-muted-foreground">
                      Electronics designed for Bulawayo's industrial environment. Robust CCTV systems, rugged smartphones, and power-resilient business equipment.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Truck className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      City-Wide Delivery
                    </h3>
                    <p className="text-muted-foreground">
                      Free delivery for bulk orders across Bulawayo's industrial sites, residential areas, and CBD. Same-day delivery available for urgent business needs.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Shield className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Enterprise Support
                    </h3>
                    <p className="text-muted-foreground">
                      Dedicated support for Bulawayo's businesses. Bulk procurement assistance, installation services, and ongoing technical support for industrial clients.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Clock className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Flexible Payment Options
                    </h3>
                    <p className="text-muted-foreground">
                      EcoCash, Visa, MasterCard, and bank transfer accepted. Credit terms available for established Bulawayo businesses and industrial clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bulawayo Service Areas */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Serving All Bulawayo Areas
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Industrial Areas</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Belmont Industrial</li>
                      <li>• Donnington</li>
                      <li>• Kelvin Industrial</li>
                      <li>• Willsgrove</li>
                      <li>• Southwold</li>
                    </ul>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Residential Suburbs</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Hillside</li>
                      <li>• Burnside</li>
                      <li>• Suburbs</li>
                      <li>• Newton West</li>
                      <li>• Nkulumane</li>
                    </ul>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Commercial Areas</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• CBD</li>
                      <li>• Ascot</li>
                      <li>• Famona</li>
                      <li>• North End</li>
                      <li>• Lobengula Street</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Get in Touch - Bulawayo
                </h2>

                <div className="bg-card border rounded-lg p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-[#4169e1]" />
                        Contact Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-foreground mb-1">Phone</p>
                          <a
                            href={`tel:${CONTACT_INFO.phone}`}
                            className="text-muted-foreground hover:text-[#4169e1] transition-colors"
                          >
                            {CONTACT_INFO.phone}
                          </a>
                        </div>

                        <div>
                          <p className="font-semibold text-foreground mb-1">WhatsApp</p>
                          <a
                            href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-[#4169e1] transition-colors"
                          >
                            {CONTACT_INFO.phone} (WhatsApp)
                          </a>
                        </div>

                        <div>
                          <p className="font-semibold text-foreground mb-1">Email</p>
                          <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="text-muted-foreground hover:text-[#4169e1] transition-colors"
                          >
                            {CONTACT_INFO.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#4169e1]" />
                        Business Hours
                      </h3>
                      <div className="space-y-2 text-muted-foreground text-sm">
                        <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                        <p>Saturday: Contact for appointments</p>
                        <p>Sunday: Closed</p>
                        <p className="text-xs mt-4 pt-4 border-t">
                          * Bulawayo deliveries processed from Harare office
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Equip Your Bulawayo Business
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Premium electronics delivered across Zimbabwe's industrial capital
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => navigate('/shop')}
                      className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                    >
                      Browse Products
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/contact')}
                    >
                      Request Bulk Quote
                    </Button>
                  </div>
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

export default BulawayoPage;
