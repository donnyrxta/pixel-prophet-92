/**
 * Gweru Location Page - Local SEO optimized
 * Central Zimbabwe's commercial and mining hub
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShoppingCart, Zap, Truck, Users } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';
import { trackPageView, trackWhatsAppClick } from '@/lib/gtm';
import { useQuoteCalculator } from '@/context/QuoteCalculatorContext';

const GweruPage = () => {
  const navigate = useNavigate();
  const { openCalculator } = useQuoteCalculator();

  useEffect(() => {
    trackPageView('Gweru Location', '/locations/gweru');
  }, []);

  // Structured Data - LocalBusiness Schema for Gweru
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "SohoConnect Electronics - Gweru Service Area",
    "description": "Premium electronics serving Gweru and Midlands Province. Smartphones, CCTV systems, and business technology for mining, agriculture, and commercial sectors in central Zimbabwe.",
    "url": "https://sohoconnect.co.zw/locations/gweru",
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gweru",
      "addressRegion": "Midlands Province",
      "addressCountry": "ZW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-19.4534",
      "longitude": "29.8154"
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
      "name": "Gweru"
    }
  };

  return (
    <>
      <SEOHead
        title="Electronics Store in Gweru, Zimbabwe | SohoConnect"
        description="SohoConnect delivers premium electronics to Gweru and Midlands Province. Smartphones, CCTV, and business tech for mining companies, agricultural businesses, and Gweru enterprises. Free delivery available."
        keywords="electronics gweru, smartphones gweru zimbabwe, cctv gweru midlands, tech store gweru, mining electronics zimbabwe, agricultural tech gweru"
        canonical="https://sohoconnect.co.zw/locations/gweru"
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
                <span className="text-lg font-semibold text-[#4169e1]">Gweru, Midlands Province</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Technology Solutions for Central Zimbabwe
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Serving Gweru's mining operations, agricultural enterprises, and commercial businesses with reliable electronics, professional CCTV systems, and power-resilient technology designed for Zimbabwe's heartland.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/shop')}
                  className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop Electronics
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </section>

        <main className="flex-1">
          {/* Why Gweru Businesses Choose SohoConnect */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Trusted by Gweru's Business Community
                </h2>

                <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
                  <p className="text-lg leading-relaxed mb-6">
                    Positioned at the geographic heart of Zimbabwe, Gweru serves as a vital commercial nexus for the Midlands Province, connecting mining operations in the north with agricultural zones to the south. SohoConnect recognizes the distinct technology needs of this strategic location, supplying electronics that perform reliably despite Gweru's infrastructure challenges—from fluctuating power supply to varying connectivity quality along the Harare-Bulawayo corridor.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Our Gweru clients span diverse sectors: ferrochrome mining companies requiring durable communication devices for site supervisors, commercial farmers implementing security systems for valuable agricultural equipment, and retail businesses along Main Street seeking point-of-sale solutions and inventory management technology. Each sector demands electronics that withstand local conditions while delivering enterprise-grade performance.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    For businesses in Gweru's Torwood, Ivene, and Mkoba residential areas, as well as industrial operations in the Light Industrial Site, we provide comprehensive CCTV installations optimized for Zimbabwe's security requirements. Our surveillance systems integrate seamlessly with backup power solutions—critical for maintaining 24/7 monitoring during load-shedding periods common in the Midlands region.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Whether you're managing a mining operation in Shurugwi, running an agricultural business near Gweru, or operating a commercial enterprise in the city center, SohoConnect delivers your technology requirements across the Midlands. We understand that Gweru businesses need equipment that arrives promptly and functions flawlessly—which is why we offer reliable delivery and post-installation support throughout central Zimbabwe.
                  </p>
                </div>

                {/* Key Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <Zap className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Power-Resilient Technology
                    </h3>
                    <p className="text-muted-foreground">
                      Electronics designed for Gweru's power environment. Our CCTV systems and business devices include backup power integration for uninterrupted operation.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Truck className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Midlands-Wide Delivery
                    </h3>
                    <p className="text-muted-foreground">
                      Reliable delivery across Gweru and surrounding Midlands areas. Free delivery on bulk orders for mining and agricultural operations.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Users className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Sector-Specific Solutions
                    </h3>
                    <p className="text-muted-foreground">
                      Tailored electronics for mining sites, agricultural operations, and commercial businesses. Rugged devices for harsh environments.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Clock className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Responsive Support
                    </h3>
                    <p className="text-muted-foreground">
                      Quick response times for Gweru businesses. Technical support via phone and WhatsApp. Installation services coordinated for Midlands region.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gweru & Midlands Service Areas */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Serving Gweru & Midlands Province
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Gweru Areas</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• CBD & Main Street</li>
                      <li>• Mkoba</li>
                      <li>• Ivene</li>
                      <li>• Torwood</li>
                      <li>• Light Industrial Site</li>
                    </ul>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Mining Areas</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Shurugwi</li>
                      <li>• Zvishavane</li>
                      <li>• Redcliff</li>
                      <li>• Kwekwe</li>
                      <li>• Mining Operations</li>
                    </ul>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Surrounding Towns</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Lalapanzi</li>
                      <li>• Mvuma</li>
                      <li>• Gokwe</li>
                      <li>• Chivhu</li>
                      <li>• Midlands Corridor</li>
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
                  Contact Us - Gweru Service
                </h2>

                <div className="bg-card border rounded-lg p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-[#4169e1]" />
                        Get in Touch
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
                              trackWhatsAppClick('location_gweru_contact', '/locations/gweru');
                              openCalculator({
                                trigger: 'whatsapp_interest',
                                onComplete: (formData) => {
                                  const message = encodeURIComponent(
                                    `Hi! I'm interested in your services in Gweru. I just requested a quote for: ${formData.services.join(', ')}`
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
                        <p>Saturday: Contact for deliveries</p>
                        <p>Sunday: Closed</p>
                        <p className="text-xs mt-4 pt-4 border-t">
                          * Gweru and Midlands deliveries coordinated from Harare
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Ready to Upgrade Your Technology?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Premium electronics for Gweru's mining, agriculture, and commercial sectors
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => navigate('/shop')}
                      className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                    >
                      View Products
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/contact')}
                    >
                      Request Consultation
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

export default GweruPage;
