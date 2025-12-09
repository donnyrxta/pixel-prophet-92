/**
 * Wi-Fi Calculator Suite Page
 *
 * Comprehensive Wi-Fi marketing calculators:
 * 1. Token Revenue Calculator - For reselling Wi-Fi tokens (buildings, mining camps, farms)
 * 2. Marketing ROI Calculator - For hospitality (hotels, lodges) guest data capture
 * 3. Location Intelligence Calculator - For retail (malls, shops) foot traffic analysis
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Wifi, Sun, TrendingUp, CheckCircle, ArrowRight,
  Building2, Users, Truck, TreePine, GraduationCap,
  MapPin, Hotel, Calculator
} from 'lucide-react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WifiTokenRevenueCalculator from '@/components/calculators/WifiTokenRevenueCalculator';
import WifiMarketingROICalculator from '@/components/calculators/WifiMarketingROICalculator';
import LocationIntelligenceCalculator from '@/components/calculators/LocationIntelligenceCalculator';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type CalculatorType = 'token' | 'hospitality' | 'location';

const calculatorTabs = [
  {
    id: 'token' as CalculatorType,
    name: 'Token Reselling',
    icon: Wifi,
    description: 'Buildings, dorms, mining camps, farms',
    color: 'primary'
  },
  {
    id: 'hospitality' as CalculatorType,
    name: 'Hospitality ROI',
    icon: Hotel,
    description: 'Hotels, lodges, guest houses',
    color: 'blue'
  },
  {
    id: 'location' as CalculatorType,
    name: 'Location Intelligence',
    icon: MapPin,
    description: 'Retail, malls, restaurants',
    color: 'purple'
  }
];

const WifiTokenCalculatorPage: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('token');

  const industries = [
    { icon: Building2, name: 'Buildings & Apartments', desc: 'Landlords, property managers' },
    { icon: Users, name: 'Dormitories & Hostels', desc: 'Student housing operators' },
    { icon: Truck, name: 'Mining Operations', desc: 'Remote camps with solar' },
    { icon: TreePine, name: 'Farms & Agriculture', desc: 'Worker compounds' },
    { icon: GraduationCap, name: 'Schools & Universities', desc: 'Educational institutions' },
  ];

  const benefits = [
    'Turn existing internet connection into a revenue stream',
    'Zero technical expertise required – turnkey deployment',
    'Solar bundles available for off-grid locations',
    'Offer free Wi-Fi to customers while monetizing visitors',
    'Real-time dashboard for sales and analytics',
    'Compliant with Zimbabwean data regulations'
  ];

  return (
    <>
      <Helmet>
        <title>Free Wi-Fi Token Revenue Calculator | Monetize Your Internet | SoHo Connect</title>
        <meta name="description" content="Calculate how much you can earn from reselling Wi-Fi tokens. Perfect for building owners, dormitories, mining camps, farms, schools & businesses. Includes off-grid solar bundles." />
        <meta name="keywords" content="WiFi reselling calculator, monetize WiFi, paid WiFi revenue, WiFi hotspot business, WiFi token system, internet reselling Zimbabwe, dormitory WiFi, mining camp WiFi, farm WiFi, school WiFi monetization, off-grid WiFi solar" />
        <link rel="canonical" href="https://sohoconnect.co.zw/tools/wifi-token-calculator" />

        <meta property="og:title" content="Wi-Fi Token Revenue Calculator | Turn Your Internet Into Income" />
        <meta property="og:description" content="Calculate potential earnings from Wi-Fi reselling. For buildings, dorms, mines, farms, schools. Includes solar bundle options for off-grid locations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sohoconnect.co.zw/tools/wifi-token-calculator" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Wi-Fi Token Revenue Calculator",
            "description": "Free calculator to estimate revenue potential from reselling Wi-Fi access tokens.",
            "url": "https://sohoconnect.co.zw/tools/wifi-token-calculator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "SoHo Connect",
              "url": "https://sohoconnect.co.zw"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does Wi-Fi token reselling work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We install a captive portal system on your existing internet connection. Users purchase tokens (via EcoCash, cash, or prepaid cards) to access the internet. You keep a percentage of every sale while we handle the technology."
                }
              },
              {
                "@type": "Question",
                "name": "What equipment is needed for off-grid locations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For remote locations without reliable power, we offer solar bundle packages ranging from $650 to $3,200 depending on user capacity. These include panels, batteries, inverters, and the Wi-Fi equipment."
                }
              },
              {
                "@type": "Question",
                "name": "Can I offer free Wi-Fi to some users?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our system supports tiered access. You can provide free Wi-Fi to your customers or tenants while selling tokens to visitors and non-customers, maximizing both engagement and revenue."
                }
              },
              {
                "@type": "Question",
                "name": "What is the typical payback period?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most deployments achieve payback within 3-8 months depending on location, user density, and pricing. Mining camps and dormitories often see the fastest returns due to high user concentration."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-amber-500/5" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Wifi className="w-4 h-4" />
                Free Revenue Calculator
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Turn Your Internet Into a
                <span className="text-primary block">Revenue Stream</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Calculate how much you can earn by reselling Wi-Fi access tokens.
                Perfect for buildings, dormitories, mining camps, farms, and schools.
              </p>

              {/* Industry Icons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {industries.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-primary mb-1" />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculator Type Selector */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold text-center text-foreground mb-6">
                Choose Your Calculator
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {calculatorTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCalculator === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCalculator(tab.id)}
                      className={cn(
                        "flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all text-left",
                        isActive
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-semibold",
                          isActive ? "text-primary" : "text-foreground"
                        )}>{tab.name}</h3>
                        <p className="text-xs text-muted-foreground">{tab.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              key={activeCalculator}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCalculator === 'token' && <WifiTokenRevenueCalculator />}
              {activeCalculator === 'hospitality' && <WifiMarketingROICalculator />}
              {activeCalculator === 'location' && <LocationIntelligenceCalculator />}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Why Monetize Your Wi-Fi Connection?
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solar Bundles Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sun className="w-4 h-4" />
                Off-Grid Solutions
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-6">
                Solar-Powered Wi-Fi for Remote Locations
              </h2>

              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                No grid power? No problem. Our integrated solar bundles ensure reliable Wi-Fi service
                for mining camps, farms, and remote communities across Zimbabwe.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Starter', price: '$650', capacity: '2.5 kWh', users: '5-15' },
                  { name: 'Standard', price: '$1,150', capacity: '5 kWh', users: '15-50' },
                  { name: 'Professional', price: '$1,850', capacity: '5.12 kWh', users: '50-150' },
                  { name: 'Enterprise', price: '$3,200', capacity: '10.24 kWh', users: '150+' }
                ].map((bundle, index) => (
                  <Card key={index} className="border-amber-200 dark:border-amber-800">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-bold text-foreground">{bundle.name}</h3>
                      <p className="text-2xl font-bold text-amber-600 my-2">{bundle.price}</p>
                      <p className="text-sm text-muted-foreground">{bundle.capacity}</p>
                      <p className="text-xs text-muted-foreground">{bundle.users} users</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">How does Wi-Fi token reselling work?</h3>
                  <p className="text-muted-foreground">
                    We install a captive portal system on your existing internet connection. Users purchase tokens
                    (via EcoCash, cash, or prepaid cards) to access the internet. You keep a percentage of every
                    sale while we handle the technology.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">What equipment is needed for off-grid locations?</h3>
                  <p className="text-muted-foreground">
                    For remote locations without reliable power, we offer solar bundle packages ranging from $650 to
                    $3,200 depending on user capacity. These include panels, batteries, inverters, and the Wi-Fi equipment.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Can I offer free Wi-Fi to some users?</h3>
                  <p className="text-muted-foreground">
                    Yes! Our system supports tiered access. You can provide free Wi-Fi to your customers or tenants
                    while selling tokens to visitors and non-customers, maximizing both engagement and revenue.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">What is the typical payback period?</h3>
                  <p className="text-muted-foreground">
                    Most deployments achieve payback within 3-8 months depending on location, user density, and pricing.
                    Mining camps and dormitories often see the fastest returns due to high user concentration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Start Earning?
              </h2>
              <p className="text-muted-foreground mb-8">
                Get a personalized deployment plan and quote for your specific location and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request a Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services/wifi-marketing">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WifiTokenCalculatorPage;
