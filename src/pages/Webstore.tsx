/**
 * Webstore - Main webstore landing page
 * Features timed hero carousel, horizontal category scroll, trending products
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { CategoryHero } from '@/components/webstore/CategoryHero';
import { HorizontalScroll } from '@/components/webstore/HorizontalScroll';
import { WebstoreProductCard } from '@/components/webstore/WebstoreProductCard';
import { TestimonialsSection } from '@/components/webstore/TestimonialsSection';
import { FAQSection } from '@/components/webstore/FAQSection';
import {
  webstoreCategories,
  getTrendingProducts
} from '@/data/webstore-products';
import { generateOrganizationSchema, generateFAQSchema } from '@/lib/schema';

const Webstore = () => {
  const navigate = useNavigate();
  const trendingProducts = getTrendingProducts();

  const heroSlides = [
    {
      image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'ELEVATE YOUR',
      subtitle: 'BRAND',
      description: 'Professional design, print, and marketing solutions tailored to your business needs.'
    },
    {
      image: 'https://images.pexels.com/photos/7784241/pexels-photo-7784241.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'SECURE YOUR',
      subtitle: 'BUSINESS',
      description: 'Advanced CCTV and security systems for complete peace of mind.'
    },
    {
      image: 'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'PREMIUM',
      subtitle: 'PRINTING',
      description: 'High-quality print services with fast turnaround times and exceptional results.'
    }
  ];

  const testimonials = [
    {
      name: 'Tendai M.',
      rating: 5,
      text: 'Soho Connect designed our new brand identity and the results exceeded expectations. Their team is creative and professional.'
    },
    {
      name: 'Rudo K.',
      rating: 4,
      text: 'Great quality printing and quick turnaround times. The flyers and banners helped us attract more customers to our cafe.'
    },
    {
      name: 'Peter N.',
      rating: 5,
      text: 'We purchased the solar CCTV kit and it has been a game changer for our warehouse security. Highly recommend!'
    }
  ];

  const faqs = [
    {
      question: 'How long will my print order take?',
      answer: 'Most standard print jobs are completed within 3–5 business days. Large format and bulk orders may take a little longer. We also offer rush services for urgent projects.'
    },
    {
      question: 'Do you offer custom branding packages?',
      answer: 'Yes! Our design team can create bespoke packages that include logos, brand guides, stationery, apparel and marketing materials tailored specifically to your business.'
    },
    {
      question: 'Can you install CCTV systems?',
      answer: 'Absolutely. We not only supply CCTV equipment but also provide installation, training and ongoing maintenance services to ensure your premises remain secure.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept USD and ZWL payments via bank transfer, mobile money (EcoCash, OneMoney), and cash. Credit card payments are available for select services.'
    }
  ];

  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate Schema.org markup
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <SEOHead
        title="Soho Connect Webstore - Design, Print, CCTV & Marketing Solutions"
        description="Shop premium design services, print products, corporate wear, CCTV systems and marketing solutions. Trusted by 127+ businesses in Harare, Zimbabwe."
        keywords="webstore harare, online printing zimbabwe, CCTV systems harare, corporate wear zimbabwe, design services harare"
        canonical="https://sohoconnect.co.zw/webstore"
      />

      {/* Schema.org Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Hero Carousel */}
        <CategoryHero
          tagline="One-Stop Business Solutions"
          slides={heroSlides}
          onCTAClick={scrollToCategories}
        />

        {/* Categories Section */}
        <section id="categories" className="py-20 bg-gradient-to-b from-white to-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#4169e1] rounded-full animate-pulse" />
                <span className="text-sm tracking-[0.3em] uppercase text-stone-600">
                  Explore Our Range
                </span>
                <div className="w-2 h-2 bg-[#4169e1] rounded-full animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Browse our comprehensive selection of business solutions across 9 specialized categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {webstoreCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/webstore/category/${category.slug}`)}
                className="relative group block h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-transparent hover:border-[#4169e1]"
              >
                <div className="absolute inset-0 bg-stone-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-3xl font-bold text-white drop-shadow-2xl mb-2 group-hover:text-[#4169e1] transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/90 font-medium">{category.tagline}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-white group-hover:text-[#4169e1] transition-colors">
                    <span className="text-sm font-semibold">Shop Now</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-16 px-6 bg-white">
          <HorizontalScroll
            title="Trending Products"
            subtitle="Discover our most popular bundles and services currently in high demand."
          >
            {trendingProducts.map((product) => (
              <WebstoreProductCard
                key={product.id}
                product={product}
                onViewDetails={() => navigate(`/webstore/product/${product.slug}`)}
                compact
              />
            ))}
          </HorizontalScroll>
        </section>

        {/* Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        {/* Quote CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4169e1] to-[#3557c4] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let's discuss your project! Submit your details and our team will get back to you.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Request a Quote
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Webstore;
