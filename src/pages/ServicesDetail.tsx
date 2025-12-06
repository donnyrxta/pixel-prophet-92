
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ServicePage from '../components/ServicePage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { serviceDetails } from '@/data/services';

const ServicesDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDetails[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ServicePage
      title={service.title}
      description={service.description}
      canonical={`https://sohoconnect.co.zw/services/${slug}`}
      keywords={[`${service.title}`, `${slug} harare`, `${slug} zimbabwe`, `professional ${slug} services`]}
      heroImage={service.heroImage}
      features={service.features.map((feature: any) => ({ ...feature, icon: <feature.icon className="w-10 h-10 text-blue-500" /> }))}
      sectors={service.services.map((item: any) => ({
        title: item.name,
        description: item.description,
        image: `/images/services/${slug}/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}.jpg`
      }))}
      faqs={[
        { question: `What is included in your ${service.title.toLowerCase()}?`, answer: service.description },
        { question: `How long does ${service.title.toLowerCase()} take?`, answer: 'Most projects are completed within 24-48 hours, with same-day service available for urgent requests.' },
        { question: 'Do you offer bulk discounts?', answer: 'Yes, we offer volume discounts for orders over 1000 pieces. Contact us for a custom quote.' },
        { question: 'Can you deliver to my location?', answer: 'We offer free delivery within Harare CBD and surrounding areas. Same-day delivery available for urgent orders.' }
      ]}
      startingPrices={service.services.reduce((acc: any, item: any) => {
        acc[item.name] = item.startingPrice;
        return acc;
      }, {})}
      serviceImages={service.services.reduce((acc: any, item: any) => {
        const safeName = item.name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        acc[item.name] = `/images/services/${slug}/${safeName}.jpg`;
        return acc;
      }, {})}
      testimonial={service.testimonial}
      timedCards={service.timedCards}
    >
      {slug === 'digital-marketing' && (
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
                  Proven Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Growth</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Our strategies don't just generate clicks; they generate customers. See how we transform digital presence into measurable revenue.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-green-500/10 rounded-xl mt-1 group-hover:bg-green-500/20 transition-colors duration-300">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-white">300% Engagement Uplift</h4>
                      <p className="text-slate-400 leading-relaxed">Average increase in social media engagement within the first 3 months.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-blue-500/10 rounded-xl mt-1 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-white">5x ROI on Ad Spend</h4>
                      <p className="text-slate-400 leading-relaxed">Optimized campaigns that deliver high-quality leads at lower costs.</p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="mt-10 bg-white text-slate-900 hover:bg-blue-50 font-bold px-8 h-12 shadow-lg shadow-white/5 transition-all duration-300 hover:scale-105">
                  See Case Studies <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

                <Card className="relative bg-slate-800/50 border-slate-700/50 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "150+", label: "Clients Managed", color: "text-blue-400" },
                      { value: "#1", label: "Google Rankings", color: "text-emerald-400" },
                      { value: "1M+", label: "Ad Impressions", color: "text-purple-400" },
                      { value: "24/7", label: "Monitoring", color: "text-amber-400" }
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
      )}
    </ServicePage>
  );
};

export default ServicesDetail;