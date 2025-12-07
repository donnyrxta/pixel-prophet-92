
import React from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Star, Phone, MessageCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TrustBand from '@/components/TrustBand';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useQuoteCalculator } from '@/context/QuoteCalculatorContext';
import { trackCTAClick } from '@/lib/gtm';
import { CONTACT_INFO } from '@/lib/constants';
import TimedCardsOpening, { TimedCardItem } from '@/components/TimedCardsOpening';
import './ServicePage.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Sector {
  title: string;
  description: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageProps {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  heroImage: string;
  features: Feature[];
  sectors: Sector[];
  faqs: FAQ[];
  startingPrices?: { [key: string]: string };
  serviceImages?: { [key: string]: string };
  testimonial?: {
    text: string;
    author: string;
    company: string;
  };
  timedCards?: TimedCardItem[];
  children?: React.ReactNode;
}

const ServicePage: React.FC<ServicePageProps> = ({
  title,
  description,
  canonical,
  keywords,
  heroImage,
  features,
  sectors,
  faqs,
  startingPrices = {},
  serviceImages = {},
  testimonial,
  timedCards,
  children,
}) => {
  const { openCalculator } = useQuoteCalculator();

  const handleGetQuote = (serviceName?: string) => {
    trackCTAClick('Get Free Quote', 'hero', window.location.pathname);
    openCalculator({
      trigger: 'button',
      preselectedService: serviceName || undefined
    });
  };
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <SEOHead
        title={`${title} in Harare | Professional Printing Services | Soho Printing`}
        description={`${description} Same-day turnaround, premium quality, and free delivery in Harare. Get a free quote today!`}
        canonical={canonical}
        keywords={[...keywords, 'Harare printing services', 'professional printing Harare', 'same day printing Zimbabwe', 'business printing services', 'printing company Harare']}
        ogImage="https://sohoprinting.co.zw/og-image.jpg"
      />
      <Helmet>
        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Soho Printing Services",
            "description": "Professional printing services in Harare with same-day turnaround and free delivery",
            "url": "https://sohoprinting.co.zw",
            "telephone": CONTACT_INFO.phone,
            "email": CONTACT_INFO.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "7 Luck Street",
              "addressLocality": "Harare",
              "addressRegion": "Harare Province",
              "postalCode": "00000",
              "addressCountry": "ZW"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -17.8292,
              "longitude": 31.0523
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
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            },
            "areaServed": {
              "@type": "City",
              "name": "Harare"
            }
          })}
        </script>

        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": title,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Soho Printing Services"
            },
            "description": description,
            "areaServed": "Harare, Zimbabwe",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>

        {/* FAQ Schema - Enhanced */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Soho Printing Services",
            "url": "https://sohoprinting.co.zw",
            "logo": "https://sohoprinting.co.zw/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": CONTACT_INFO.phone,
              "contactType": "customer service",
              "areaServed": "ZW",
              "availableLanguage": ["English", "Shona", "Ndebele"]
            },
            "sameAs": [
              "https://facebook.com/sohoprinting",
              "https://twitter.com/sohoprinting",
              "https://instagram.com/sohoprinting"
            ]
          })}
        </script>
      </Helmet>

      <Header />

      {/* Sticky Header CTA - Appears on scroll */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">
              <span className="font-semibold text-[#4169e1]">{title}</span>
              <span className="mx-2">•</span>
              <span>Professional services in Harare</span>
            </div>
          </div>
          <Button
            onClick={() => {
              trackCTAClick('Sticky Header - Get Free Quote', 'sticky-header', window.location.pathname);
              handleGetQuote();
            }}
            className="bg-[#4169e1] hover:bg-[#3557c5] text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-glass-glow hover:shadow-glass-glow-lg transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            Get Free Quote
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      <main>
        {/* Timed Cards Animation - Shown if timedCards data is provided */}
        {timedCards && timedCards.length >= 3 ? (
          <TimedCardsOpening
            items={timedCards}
            brandName="SOHO CONNECT"
            onDiscoverClick={() => handleGetQuote()}
          />
        ) : (
          /* Hero Section - Redesigned based on audit recommendations */
          <section
            className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-[#e8edfa] via-white to-[#f0f4ff]"
            itemScope
            itemType="https://schema.org/Service"
          >
            {/* Floating Decorative Elements */}
            <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#4169e1]/10 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-[#4169e1]/5 blur-2xl" />

            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroImage})`,
                filter: 'brightness(0.7) contrast(1.1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />

            {/* New Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="relative container mx-auto px-4 h-full flex items-center pt-20">
              <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                {/* Left Column: Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white space-y-8"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4169e1]/20 border border-[#4169e1]/30 text-[#4169e1] text-sm font-medium backdrop-blur-sm">
                    <Star className="w-4 h-4 fill-current" />
                    Rated #1 Printing Service in Harare
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                      {title}
                    </span>
                    <br />
                    <span className="text-white">Done Right.</span>
                  </h1>

                  <p className="text-xl text-slate-200 leading-relaxed max-w-lg">
                    {description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      onClick={() => handleGetQuote()}
                      className="bg-[#4169e1] hover:bg-[#3557c5] text-white px-8 py-6 text-lg rounded-xl shadow-glass-glow hover:shadow-glass-glow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Get Instant Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                      onClick={() => window.open(`https://wa.me/${CONTACT_INFO.phone.replace('+', '')}?text=Hi%2C%20I%27m%20interested%20in%20${title}`, '_blank')}
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      WhatsApp Us
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-slate-300">Same-Day Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-slate-300">Best Price Guarantee</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Dynamic Visuals */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden md:block relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="mb-3 text-[#4169e1]">
                          {feature.icon}
                        </div>
                        <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                        <p className="text-xs text-slate-400">{feature.description}</p>
                      </div>
                    ))}
                    {/* Add a generic "Trusted By" card */}
                    <div className="bg-gradient-to-br from-[#4169e1]/20 to-purple-500/20 p-4 rounded-xl border border-white/10 col-span-2 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white">500+</div>
                        <div className="text-xs text-slate-300">Happy Clients</div>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section - Enhanced with tactile interactions and glassmorphic effects */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Our <span className="text-[#4169e1]">{title}</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Professional printing solutions with transparent pricing and fast turnaround times.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#e8edfa] group-hover:bg-[#4169e1] flex items-center justify-center mb-6 transition-colors duration-300">
                    <div className="text-[#4169e1] group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid - Showcasing specific offerings */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our <span className="text-[#4169e1]">{title}</span> Options
              </h2>
              <p className="text-lg text-slate-600">Choose the perfect solution for your business needs</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => handleGetQuote(sector.title)}
                >
                  <div className="aspect-[4/5] relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${sector.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white mb-2">{sector.title}</h3>
                      <p className="text-slate-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {sector.description}
                      </p>
                      <div className="flex items-center text-[#4169e1] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        Get Quote <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing/Starting At Section - New Addition */}
        {Object.keys(startingPrices).length > 0 && (
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparent Starting Prices</h2>
                <p className="text-slate-600">No hidden fees. Get a clear idea of your investment.</p>
              </motion.div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(startingPrices).map(([service, price], idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <h3 className="font-bold text-slate-800 mb-2">{service}</h3>
                    <div className="text-[#4169e1] font-bold text-xl">{price}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Custom Children Content (e.g. Trust Metrics) */}
        {children}

        {/* FAQ Section - SEO Optimized */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600">Get answers to common questions about our {title.toLowerCase()} in Harare</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="group">
                  <AccordionTrigger className="text-left text-lg font-medium text-slate-800 group-hover:text-[#4169e1] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section - Final Conversion Push */}
        <section className="py-20 bg-[#4169e1]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Get in touch with us today for a free quote. We're ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => handleGetQuote()}
                className="bg-white text-[#4169e1] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                onClick={() => window.location.href = `tel:${CONTACT_INFO.phone}`}
              >
                <Phone className="mr-2 w-5 h-5" />
                {CONTACT_INFO.phone}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <TrustBand />
      <Footer />
    </div>
  );
}

export default ServicePage;
