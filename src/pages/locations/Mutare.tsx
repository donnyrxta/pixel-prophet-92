/**
 * Mutare Location Page - Local SEO optimized
 * Eastern Zimbabwe's commercial gateway and manufacturing hub
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShoppingCart, Globe, Truck, Building2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';
import { trackPageView, trackWhatsAppClick } from '@/lib/gtm';
import { useQuoteCalculator } from '@/context/QuoteCalculatorContext';

const MutarePage = () => {
  const navigate = useNavigate();
  const { openCalculator } = useQuoteCalculator();

  useEffect(() => {
    trackPageView('Mutare Location', '/locations/mutare');
  }, []);

  // Structured Data - LocalBusiness Schema for Mutare
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "SohoConnect Electronics - Mutare Service Area",
    "description": "Premium electronics supplier for Mutare and Manicaland Province. Smartphones, CCTV systems, and business technology serving eastern Zimbabwe's manufacturing, border trade, and commercial sectors.",
    "url": "https://sohoconnect.co.zw/locations/mutare",
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mutare",
      "addressRegion": "Manicaland Province",
      "addressCountry": "ZW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-18.9707",
      "longitude": "32.6700"
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
      "name": "Mutare"
    }
  };

  return (
    <>
      <SEOHead
        title="Electronics Supplier in Mutare, Zimbabwe | SohoConnect"
        description="SohoConnect provides premium electronics to Mutare and Manicaland Province. Smartphones, CCTV security systems, and business technology for manufacturing, border trade, and commercial enterprises. Delivery across eastern Zimbabwe."
        keywords="electronics mutare, smartphones mutare zimbabwe, cctv mutare manicaland, tech store mutare, border trade electronics, manufacturing tech mutare"
        canonical="https://sohoconnect.co.zw/locations/mutare"
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
                <span className="text-lg font-semibold text-[#4169e1]">Mutare, Manicaland Province</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Electronics for Eastern Zimbabwe's Business Gateway
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Serving Mutare's manufacturing sector, border trade businesses, and commercial enterprises with premium smartphones, professional CCTV installations, and reliable technology solutions along the Beira corridor.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/shop')}
                  className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Browse Catalog
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        <main className="flex-1">
          {/* Why Mutare Businesses Choose SohoConnect */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Technology Partner for Manicaland
                </h2>

                <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
                  <p className="text-lg leading-relaxed mb-6">
                    Strategically positioned as Zimbabwe's eastern gateway, Mutare connects domestic commerce with international markets via the Forbes Border Post and Beira Corridor. This unique position creates specific technology demands for businesses managing cross-border operations, import-export documentation, and security requirements for valuable inventory in transit. SohoConnect addresses these needs with electronics suited for Mutare's dynamic business environment.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Manicaland's diverse economic landscape—from timber processing in the Eastern Highlands to fruit cultivation around Nyanga, manufacturing in Mutare's industrial zones, and border trade operations—requires versatile technology solutions. Our product range serves this spectrum: rugged smartphones for field supervisors managing forestry operations, sophisticated CCTV systems for warehouses storing cross-border goods, and reliable business devices for freight forwarding companies coordinating shipments along the Harare-Beira route.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    For Mutare's manufacturing sector concentrated in Sakubva and Dangamvura industrial areas, we supply enterprise-grade technology that supports production oversight, quality control documentation, and supply chain coordination. Our CCTV installations protect valuable manufacturing equipment and finished goods, with systems designed to maintain functionality during Mutare's frequent power interruptions—a critical consideration for businesses operating along Zimbabwe's eastern border.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Whether your business operates from Mutare CBD, manages border clearance operations at Forbes, or runs agricultural processing near Penhalonga, SohoConnect delivers reliable technology across Manicaland Province. We understand that eastern Zimbabwe's businesses require both quality equipment and dependable delivery—which is why we coordinate shipments to reach Mutare and surrounding areas with the same care we apply to our Harare operations.
                  </p>
                </div>

                {/* Key Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <Globe className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Border Trade Ready
                    </h3>
                    <p className="text-muted-foreground">
                      Technology solutions for businesses engaged in cross-border commerce. Reliable devices for documentation, communication, and security along the Beira corridor.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Building2 className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Manufacturing Support
                    </h3>
                    <p className="text-muted-foreground">
                      Electronics for Mutare's industrial zones. CCTV systems, enterprise smartphones, and technology infrastructure for production facilities.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Truck className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Eastern Zimbabwe Delivery
                    </h3>
                    <p className="text-muted-foreground">
                      Coordinated delivery across Manicaland Province. Reliable shipping to Mutare, Rusape, Chipinge, and surrounding areas.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Clock className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Responsive Service
                    </h3>
                    <p className="text-muted-foreground">
                      Technical support for Mutare businesses. Quick response via phone and WhatsApp. Installation coordination for eastern region.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mutare & Manicaland Service Areas */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Service Coverage - Manicaland Province
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Mutare Areas</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• CBD & Main Street</li>
                      <li>• Sakubva</li>
                      <li>• Dangamvura</li>
                      <li>• Greenside</li>
                      <li>• Industrial Areas</li>
                    </ul>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Border & Trade</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Forbes Border Post</li>
                      <li>• Beira Corridor</li>
                      <li>• Freight Operations</li>
                      <li>• Customs Clearance</li>
                      <li>• Import/Export</li>
                    </ul>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Manicaland Towns</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Rusape</li>
                      <li>• Chipinge</li>
                      <li>• Nyanga</li>
                      <li>• Penhalonga</li>
                      <li>• Eastern Highlands</li>
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
                  Reach Us - Mutare Service
                </h2>

                <div className="bg-card border rounded-lg p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-[#4169e1]" />
                        Contact Information
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
                          <button
                            onClick={() => {
                              trackWhatsAppClick('location_mutare_contact', '/locations/mutare');
                              openCalculator({
                                trigger: 'whatsapp_interest',
                                onComplete: (formData) => {
                                  const message = encodeURIComponent(
                                    `Hi! I'm interested in your services in Mutare. I just requested a quote for: ${formData.services.join(', ')}`
                                  );
                                  window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${message}`, '_blank');
                                }
                              });
                            }}
                            className="text-muted-foreground hover:text-[#4169e1] transition-colors text-left"
                          >
                            {CONTACT_INFO.phone} (WhatsApp)
                          </button>
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
                        Service Hours
                      </h3>
                      <div className="space-y-2 text-muted-foreground text-sm">
                        <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                        <p>Saturday: Available for deliveries</p>
                        <p>Sunday: Closed</p>
                        <p className="text-xs mt-4 pt-4 border-t">
                          * Mutare and Manicaland deliveries coordinated from Harare
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Equip Your Mutare Business
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Reliable electronics for eastern Zimbabwe's manufacturing and trade sectors
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => navigate('/shop')}
                      className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                    >
                      Shop Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/contact')}
                    >
                      Discuss Requirements
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

export default MutarePage;
