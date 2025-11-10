/**
 * Harare Location Page - Local SEO optimized
 * Phase 4B Task 6: Location page with 30%+ unique content
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShoppingCart, Store, Truck, BadgeCheck } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';
import { trackPageView, trackWhatsAppClick } from '@/lib/gtm';
import { useQuoteCalculator } from '@/context/QuoteCalculatorContext';

const HararePage = () => {
  const navigate = useNavigate();
  const { openCalculator } = useQuoteCalculator();

  useEffect(() => {
    trackPageView('Harare Location', '/locations/harare');
  }, []);

  // Structured Data - LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "SohoConnect Electronics - Harare",
    "description": "Premium electronics store in Harare CBD, Zimbabwe. Smartphones, CCTV systems, tech accessories, and business consumables. Authorized dealer with warranty and expert installation.",
    "url": "https://sohoconnect.co.zw/locations/harare",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["EcoCash", "Visa", "MasterCard", "Bank Transfer"],
    "currenciesAccepted": "USD",
    "image": "https://sohoconnect.co.zw/images/brand/logo-color-icon.png",
    "areaServed": {
      "@type": "City",
      "name": "Harare"
    }
  };

  return (
    <>
      <SEOHead
        title="Electronics Store in Harare, Zimbabwe | SohoConnect"
        description="Visit SohoConnect Electronics in Harare CBD for smartphones, CCTV systems, and tech accessories. Located at 7 Luck Street, Avondale. Free delivery in Harare on orders over $100. Expert installation available."
        keywords="electronics harare, smartphones harare zimbabwe, cctv installation harare, tech store avondale, electronics shop cbd harare, buy smartphones harare, sohoconnect harare"
        canonical="https://sohoconnect.co.zw/locations/harare"
      />

      {/* Structured Data - LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        {/* Hero Section with Local Context */}
        <section className="relative bg-gradient-to-br from-[#4169e1]/10 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-[#4169e1]" />
                <span className="text-lg font-semibold text-[#4169e1]">Harare, Zimbabwe</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Your Trusted Electronics Store in Harare
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Located in the heart of Harare's Avondale district, SohoConnect Electronics serves businesses and individuals across Zimbabwe's capital with premium smartphones, professional CCTV installations, and cutting-edge tech accessories.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/shop')}
                  className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Browse Products
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        <main className="flex-1">
          {/* Why Choose Our Harare Store */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Why Harare Businesses Choose SohoConnect
                </h2>

                <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
                  <p className="text-lg leading-relaxed mb-6">
                    Since establishing our presence in Harare's business district, SohoConnect has become the go-to electronics destination for small and medium enterprises (SMEs), corporate offices, and tech-savvy individuals across the capital. Our 7 Luck Street location in Avondale offers a carefully curated selection of premium electronics backed by genuine manufacturer warranties and expert technical support.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    As an authorized dealer for leading global brands, we stock the latest smartphones from Apple and Samsung, professional-grade CCTV systems from Hikvision and Dahua, and essential business consumables including high-performance printers and power solutions. Every product is sourced through official channels, ensuring authenticity and full warranty coverage—critical considerations in Zimbabwe's electronics market.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    What sets our Harare store apart is our commitment to post-sale service. Our technical team provides professional CCTV installation across Harare's commercial and residential areas, with projects completed in Borrowdale, Mount Pleasant, and the CBD. We understand the security concerns of Harare businesses, which is why our surveillance solutions are designed for Zimbabwe's power infrastructure, featuring backup capabilities and remote monitoring optimized for local internet connectivity.
                  </p>

                  <p className="text-lg leading-relaxed">
                    For businesses in Harare's industrial areas—from Msasa to Workington—we offer flexible payment options including EcoCash for instant transactions, as well as Visa and MasterCard. Orders over $100 qualify for free delivery within Harare's CBD and selected suburbs, ensuring you can equip your office or business without logistical hassles.
                  </p>
                </div>

                {/* Key Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-card border rounded-lg p-6">
                    <Store className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Convenient Avondale Location
                    </h3>
                    <p className="text-muted-foreground">
                      Easy access from Harare CBD, Mount Pleasant, and Borrowdale. Ample parking available. Visit us at 7 Luck Street for hands-on product demonstrations.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Truck className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Harare-Wide Delivery
                    </h3>
                    <p className="text-muted-foreground">
                      Free delivery in Harare CBD on orders over $100. Same-day delivery available for urgent business needs within the city limits.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <BadgeCheck className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Authorized Dealer Status
                    </h3>
                    <p className="text-muted-foreground">
                      Official partnerships with Apple, Samsung, Hikvision, and Dahua. Genuine products with full manufacturer warranties honored in Zimbabwe.
                    </p>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <Clock className="w-8 h-8 text-[#4169e1] mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Extended Business Hours
                    </h3>
                    <p className="text-muted-foreground">
                      Open Monday-Friday 8:00 AM - 5:00 PM, Saturday 9:00 AM - 1:00 PM. After-hours consultations available for enterprise clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Visit Our Harare Store
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Address & Hours */}
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#4169e1]" />
                      Location & Hours
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-foreground mb-1">Address</p>
                        <p className="text-muted-foreground">
                          7 Luck Street, Avondale<br />
                          Harare, Zimbabwe
                        </p>
                        <a
                          href={CONTACT_INFO.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4169e1] hover:underline text-sm mt-2 inline-block"
                        >
                          Get Directions →
                        </a>
                      </div>

                      <div>
                        <p className="font-semibold text-foreground mb-1">Business Hours</p>
                        <div className="text-muted-foreground text-sm space-y-1">
                          <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                          <p>Saturday: 9:00 AM - 1:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#4169e1]" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
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
                            trackWhatsAppClick('location_harare_contact', '/locations/harare');
                            openCalculator({
                              trigger: 'whatsapp_interest',
                              onComplete: (formData) => {
                                const message = encodeURIComponent(
                                  `Hi! I'm interested in your services in Harare. I just requested a quote for: ${formData.services.join(', ')}`
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
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 bg-muted rounded-lg h-96 flex items-center justify-center border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-[#4169e1]" />
                    <p className="text-lg">
                      <a
                        href={CONTACT_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4169e1] hover:underline"
                      >
                        Open in Google Maps
                      </a>
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Ready to Upgrade Your Tech?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Visit our Harare showroom or shop online with free delivery in the CBD
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => navigate('/shop')}
                      className="bg-[#4169e1] hover:bg-[#4169e1]/90"
                    >
                      Shop Electronics
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/contact')}
                    >
                      Schedule a Visit
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

export default HararePage;
