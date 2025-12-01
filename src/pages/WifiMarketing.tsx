import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Wifi, Users, BarChart3, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TrustBand from '@/components/TrustBand';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const WifiMarketing = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Wifi className="w-10 h-10 text-primary" />,
      title: "Captive Portals",
      description: "Branded login pages that capture customer data while offering seamless connectivity."
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Customer Profiles",
      description: "Build a consented database of customer profiles for targeted marketing campaigns."
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-primary" />,
      title: "Analytics Dashboard",
      description: "Real-time insights into footfall, dwell time, and repeat visit frequency."
    },
    {
      icon: <Lock className="w-10 h-10 text-primary" />,
      title: "Compliance & Security",
      description: "Fully compliant with local data privacy regulations (ZIMRA/POTRAZ) and secure."
    }
  ];

  const sectors = [
    {
      title: "Cafés & Restaurants",
      description: "Turn free WiFi into a loyalty engine. Capture emails for menu updates and special offers.",
      image: "/images/business/coffee-shop-wifi.jpg" // Placeholder path
    },
    {
      title: "Retail Stores",
      description: "Analyze shopper behavior and send real-time coupons to customers in-store.",
      image: "/images/business/retail-wifi.jpg" // Placeholder path
    },
    {
      title: "Hospitality",
      description: "Enhance guest experience with seamless connectivity and concierge services.",
      image: "/images/business/hotel-wifi.jpg" // Placeholder path
    },
    {
      title: "Co-working Spaces",
      description: "Manage member access and monetize guest usage with tiered bandwidth plans.",
      image: "/images/business/coworking-wifi.jpg" // Placeholder path
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <SEOHead
        title="WiFi Marketing Services in Zimbabwe | Soho Connect"
        description="Transform your free WiFi into a powerful marketing tool. Capture customer data, increase footfall, and drive loyalty with Soho Connect's WiFi marketing solutions in Harare & Zimbabwe."
        canonicalUrl="https://www.sohoconnect.co.zw/services/wifi-marketing"
        keywords={[
          "WiFi marketing Zimbabwe",
          "WiFi advertising Harare",
          "Guest WiFi for business",
          "Captive portal Zimbabwe",
          "Retail WiFi analytics",
          "Restaurant WiFi marketing"
        ]}
      />
      
      {/* Structured Data Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "WiFi Marketing Services",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Soho Connect",
              "image": "https://www.sohoconnect.co.zw/images/brand/logo-color.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Eastgate Mall",
                "addressLocality": "Harare",
                "addressRegion": "Harare",
                "postalCode": "00263",
                "addressCountry": "ZW"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -17.831773,
                "longitude": 31.053028
              },
              "url": "https://www.sohoconnect.co.zw",
              "telephone": "+263777000000",
              "priceRange": "$$"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Zimbabwe"
            },
            "description": "Comprehensive WiFi marketing solutions for Zimbabwean businesses including captive portals, customer data capture, and automated marketing campaigns.",
            "serviceType": "Digital Marketing",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Request a quote for tailored WiFi marketing solutions"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "WiFi Marketing Packages",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Café & Restaurant WiFi"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Retail Analytics WiFi"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Corporate Guest WiFi"
                  }
                }
              ]
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.sohoconnect.co.zw/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://www.sohoconnect.co.zw/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "WiFi Marketing",
                "item": "https://www.sohoconnect.co.zw/services/wifi-marketing"
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-primary/20 text-primary-foreground hover:bg-primary/30 px-4 py-1 text-sm border-primary/50 backdrop-blur-sm">
                WiFi Marketing Solutions
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                Turn Free WiFi Into <br className="hidden md:block" />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Measurable Growth</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                The bridge between offline footfall and digital retention. Capture customer data, 
                automate marketing, and drive repeat visits for your Zimbabwean business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="btn-hero bg-primary hover:bg-primary/90 text-white w-full sm:w-auto px-8 h-12 text-base shadow-lg shadow-primary/20">
                  Request a Demo
                </Button>
                <Button size="lg" variant="outline" className="btn-glass border-white/20 text-white hover:bg-white/10 w-full sm:w-auto px-8 h-12 text-base backdrop-blur-sm">
                  View Pricing
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why WiFi Marketing?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Move beyond simple connectivity. Transform your guest network into a robust customer relationship engine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                      <div className="mb-6 p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sector Solutions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tailored for Every Sector</h2>
                <p className="text-slate-600 text-lg">
                  Whether you run a bustling café in Harare or a retail chain across Zimbabwe, we have a solution that fits.
                </p>
              </div>
              <Button variant="link" className="text-primary hidden md:flex items-center gap-2 text-lg font-medium hover:no-underline group">
                See all industries <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sectors.map((sector, index) => (
                <div key={index} className="relative group overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[2/1] shadow-lg">
                  {/* Fallback color if image fails to load, normally use proper Next/Image or optimized img */}
                  <div className="absolute inset-0 bg-slate-800 transition-transform duration-700 group-hover:scale-105" />
                  {/* <img src={sector.image} alt={sector.title} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40" /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{sector.title}</h3>
                    <p className="text-slate-200 text-lg mb-4 max-w-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {sector.description}
                    </p>
                    <span className="text-primary font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button variant="link" className="text-primary text-lg font-medium">
                See all industries <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Trust & Metrics */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                  <BarChart3 className="w-4 h-4" />
                  <span>Real Impact</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Proven Results in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Harare</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Our clients don't just offer free internet; they build assets. See how local businesses are transforming guest connectivity into a sustainable revenue engine.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-green-500/10 rounded-xl mt-1 group-hover:bg-green-500/20 transition-colors duration-300">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-white">300% Database Growth</h4>
                      <p className="text-slate-400 leading-relaxed">Average capture rate for emails and phone numbers compared to traditional sign-up methods.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-blue-500/10 rounded-xl mt-1 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-white">25% Return Customer Uplift</h4>
                      <p className="text-slate-400 leading-relaxed">Driven by automated birthday vouchers, "we miss you" campaigns, and personalized offers.</p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="mt-10 bg-white text-slate-900 hover:bg-blue-50 font-bold px-8 h-12 shadow-lg shadow-white/5 transition-all duration-300 hover:scale-105">
                  Download Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              <div className="relative">
                {/* Animated background blur */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                
                <Card className="relative bg-slate-800/50 border-slate-700/50 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "15k+", label: "Daily Users", color: "text-blue-400" },
                      { value: "99.9%", label: "Uptime SLA", color: "text-emerald-400" },
                      { value: "2.5M", label: "Data Points", color: "text-purple-400" },
                      { value: "120+", label: "Venues Live", color: "text-amber-400" }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="bg-slate-900/60 p-6 rounded-2xl text-center border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 hover:-translate-y-1 group"
                      >
                        <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold group-hover:text-slate-300 transition-colors">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <TrustBand />

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Everything you need to know about implementing WiFi marketing in Zimbabwe.</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium text-slate-900">Is this compliant with Zimbabwean data laws?</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Yes, our system is designed with POTRAZ and ZIMRA regulations in mind. We implement strict double opt-in processes and provide clear terms of service to ensure all customer data is collected consensually and stored securely.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium text-slate-900">Does it work with my existing internet connection?</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  In most cases, yes. Our hardware sits between your modem and your access points. We work with all major Zimbabwean ISPs including Liquid, TelOne, and ZOL.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium text-slate-900">Can I customize the login page?</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Absolutely. The splash page (captive portal) is fully customizable with your logo, brand colors, and specific marketing messages or promotions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium text-slate-900">How do I see the data?</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  You get access to a secure, cloud-based dashboard where you can view real-time analytics, export customer lists, and manage your marketing automation settings from anywhere.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Capture More Value?</h2>
              <p className="text-xl text-slate-600 mb-10">
                Stop giving away free internet. Start building a valuable customer database today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-hero bg-primary hover:bg-primary/90 text-white px-10 h-14 text-lg shadow-xl">
                  Get Started Now
                </Button>
                <Button size="lg" variant="outline" className="btn-glass border-slate-200 hover:bg-slate-50 text-slate-900 px-10 h-14 text-lg">
                  Schedule a Demo
                </Button>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                No credit card required. Free consultation for Harare businesses.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WifiMarketing;
