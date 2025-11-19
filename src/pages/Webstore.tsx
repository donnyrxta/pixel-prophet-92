/**
 * Webstore - Main webstore landing page
 * Features timed hero carousel, horizontal category scroll, trending products
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <>
      <SEOHead
        title="Soho Connect Webstore - Design, Print, CCTV & Marketing Solutions"
        description="Shop premium design services, print products, corporate wear, CCTV systems and marketing solutions. Trusted by 127+ businesses in Harare, Zimbabwe."
        keywords="webstore harare, online printing zimbabwe, CCTV systems harare, corporate wear zimbabwe, design services harare"
        canonical="https://sohoconnect.co.zw/webstore"
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Hero Carousel */}
        <CategoryHero
          tagline="One-Stop Business Solutions"
          slides={heroSlides}
          onCTAClick={scrollToCategories}
        />

        {/* Categories Section */}
        <section id="categories" className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-600 font-['Oswald']">
            Shop by Category
          </h2>

          <HorizontalScroll showArrows={false}>
            {webstoreCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/webstore/${category.slug}`)}
                className="relative group block w-64 h-48 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 transition-transform hover:scale-105"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg font-['Oswald']">
                    {category.name}
                  </h3>
                </div>
              </button>
            ))}
          </HorizontalScroll>
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
                onViewDetails={(id) => navigate(`/webstore/product/${id}`)}
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
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Oswald']">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
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
