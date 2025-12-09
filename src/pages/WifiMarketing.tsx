import React, { useEffect } from 'react';
import ServicePage from '@/components/ServicePage';
import { Wifi, Users, BarChart3, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Retail Stores",
      description: "Analyze shopper behavior and send real-time coupons to customers in-store.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Hospitality",
      description: "Enhance guest experience with seamless connectivity and concierge services.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Co-working Spaces",
      description: "Manage member access and monetize guest usage with tiered bandwidth plans.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const faqs = [
    {
      question: "Is this compliant with Zimbabwean data laws?",
      answer: "Yes, our system is designed with POTRAZ and ZIMRA regulations in mind. We implement strict double opt-in processes and provide clear terms of service to ensure all customer data is collected consensually and stored securely."
    },
    {
      question: "Does it work with my existing internet connection?",
      answer: "In most cases, yes. Our hardware sits between your modem and your access points. We work with all major Zimbabwean ISPs including Liquid, TelOne, and ZOL."
    },
    {
      question: "Can I customize the login page?",
      answer: "Absolutely. The splash page (captive portal) is fully customizable with your logo, brand colors, and specific marketing messages or promotions."
    },
    {
      question: "How do I see the data?",
      answer: "You get access to a secure, cloud-based dashboard where you can view real-time analytics, export customer lists, and manage your marketing automation settings from anywhere."
    }
  ];

  return (
    <ServicePage
      title="WiFi Marketing Services"
      description="Transform your free WiFi into a powerful marketing tool. Capture customer data, increase footfall, and drive loyalty with Soho Connect's WiFi marketing solutions in Harare & Zimbabwe."
      canonical="https://www.sohoconnect.co.zw/services/wifi-marketing"
      keywords={[
        "WiFi marketing Zimbabwe",
        "WiFi advertising Harare",
        "Guest WiFi for business",
        "Captive portal Zimbabwe",
        "Retail WiFi analytics",
        "Restaurant WiFi marketing"
      ]}
      heroImage="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop"
      features={features}
      sectors={sectors}
      faqs={faqs}
      startingPrices={{
        "Basic Package": "$49/mo",
        "Standard Package": "$99/mo",
        "Enterprise": "Custom Quote"
      }}
    >
      {/* Trust & Metrics Section (Migrated functionality) */}
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

      {/* Calculator CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <BarChart3 className="w-4 h-4" />
                <span>ROI Estimator</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculate Your Potential <span className="text-primary">Revenue</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Wondering how much you could earn by monetizing your Wi-Fi?
                Use our free calculator to estimate daily, monthly, and annual revenue suitable for
                hotels, mining camps, salons, schools, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="/tools/wifi-token-calculator" className="flex items-center justify-center">
                    Launch Calculator<ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact" className="flex items-center justify-center">Talk to an Expert</a>
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white border-0 shadow-xl p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-semibold text-gray-700">Estimated Monthly Profit</span>
                    <span className="text-2xl font-bold text-green-600">$1,250.00</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Daily Active Users</span>
                      <span className="font-medium">150</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Daily Spend</span>
                      <span className="font-medium">$0.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Solar Bundle</span>
                      <span className="font-medium text-amber-600">Standard (5kWh)</span>
                    </div>
                  </div>
                  <div className="pt-4 mt-2 bg-gray-50 rounded-lg p-4 text-xs text-gray-500 text-center">
                    * Example calculation for a standardized mining camp setup
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </ServicePage>
  );
};

export default WifiMarketing;
