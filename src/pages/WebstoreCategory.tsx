/**
 * WebstoreCategory - Category landing page template
 * Features category-specific hero, product grid, and testimonials
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { CategoryHero } from '@/components/webstore/CategoryHero';
import { HorizontalScroll } from '@/components/webstore/HorizontalScroll';
import { WebstoreProductCard } from '@/components/webstore/WebstoreProductCard';
import { TestimonialsSection } from '@/components/webstore/TestimonialsSection';
import { FAQSection } from '@/components/webstore/FAQSection';
import {
  getCategoryBySlug,
  getProductsByCategory
} from '@/data/webstore-products';

// Category-specific testimonials and FAQs
const categoryTestimonials: Record<string, any[]> = {
  'cctv': [
    {
      name: 'Blessing S.',
      rating: 5,
      text: 'Our retail shrinkage pack from Soho Connect has reduced losses significantly. The installation was quick and professional.'
    },
    {
      name: 'Farai D.',
      rating: 5,
      text: 'We use the visitor management bundle at our head office. It streamlines check-ins and looks very professional.'
    }
  ],
  'design': [
    {
      name: 'Tendai M.',
      rating: 5,
      text: 'Soho Connect designed our new brand identity and the results exceeded expectations. Their team is creative and professional.'
    },
    {
      name: 'Grace P.',
      rating: 5,
      text: 'The social media pack has transformed our online presence. Professional graphics and consistent branding across all platforms.'
    }
  ],
  'print': [
    {
      name: 'Rudo K.',
      rating: 4,
      text: 'Great quality printing and quick turnaround times. The flyers and banners helped us attract more customers to our cafe.'
    },
    {
      name: 'Michael T.',
      rating: 5,
      text: 'Premium business cards with spot UV finish look amazing. They make a lasting impression at networking events.'
    }
  ],
  'corporate-wear': [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'The NFC business cards are a game-changer at conferences. Just a tap and clients have all my contact info.'
    },
    {
      name: 'David K.',
      rating: 5,
      text: 'Corporate gift sets are perfect for client appreciation. High quality items that represent our brand well.'
    }
  ],
  'marketing': [
    {
      name: 'Linda N.',
      rating: 5,
      text: 'The restaurant launch kit had everything we needed. Menu design, signage, and promotional materials all perfectly coordinated.'
    },
    {
      name: 'James R.',
      rating: 5,
      text: 'Pop-up shop kit made our retail event a huge success. Professional setup in minutes with all branded materials.'
    }
  ]
};

const categoryFAQs: Record<string, any[]> = {
  'cctv': [
    {
      question: 'What does your CCTV installation service include?',
      answer: 'Our team handles everything from site survey and equipment selection to installation, network configuration and user training. We also provide ongoing support and maintenance.'
    },
    {
      question: 'Can I monitor my cameras remotely?',
      answer: 'Yes, our systems allow you to view live and recorded footage from anywhere via mobile or web apps, provided you have an internet connection.'
    },
    {
      question: 'Do you offer maintenance plans?',
      answer: 'We offer affordable maintenance plans including regular system health checks, firmware updates and on-site support to ensure your security system runs optimally.'
    }
  ],
  'design': [
    {
      question: 'How long does the brand identity process take?',
      answer: 'A complete brand identity package typically takes 2-3 weeks from initial consultation to final delivery, including revisions and refinements.'
    },
    {
      question: 'Do you provide source files?',
      answer: 'Yes, you receive all source files (AI, PSD, etc.) along with various formats optimized for print and digital use.'
    },
    {
      question: 'Can you refresh an existing brand?',
      answer: 'Absolutely! We specialize in brand refreshes and modernization while maintaining your established brand equity.'
    }
  ],
  'print': [
    {
      question: 'What print finishes do you offer?',
      answer: 'We offer spot UV, foiling, embossing, debossing, and various paper stocks. Premium finishes add a tactile quality that makes your materials stand out.'
    },
    {
      question: 'Do you handle large format printing?',
      answer: 'Yes, we print banners, posters, vehicle wraps, and building signage up to billboard size with weather-resistant materials.'
    },
    {
      question: 'What is your minimum order quantity?',
      answer: 'We accommodate orders of all sizes, from single business cards to bulk orders of thousands. Small batch printing is available for most products.'
    }
  ],
  'corporate-wear': [
    {
      question: 'How do NFC business cards work?',
      answer: 'NFC cards contain a chip that transmits your contact information when tapped against a smartphone. No app required – it works with built-in NFC readers.'
    },
    {
      question: 'Can we customize corporate gift sets?',
      answer: 'Yes! We can create fully customized gift sets with your choice of items, all branded with your logo and presented in premium packaging.'
    },
    {
      question: 'What apparel sizes do you offer?',
      answer: 'We stock a full range of sizes from XS to 5XL. Custom sizing is available for special requirements.'
    }
  ],
  'marketing': [
    {
      question: 'What is included in the restaurant launch kit?',
      answer: 'The kit includes custom menu design and printing, table talkers, delivery stickers, staff caps, and social media graphics – everything needed for a cohesive brand launch.'
    },
    {
      question: 'Can you customize the launch kits?',
      answer: 'Yes! All kits can be tailored to your specific needs. We can add or remove items to match your budget and requirements.'
    },
    {
      question: 'Do you offer installation for events?',
      answer: 'Yes, we provide on-site setup and installation services for pop-up shops, events, and activations to ensure everything looks perfect.'
    }
  ]
};

const WebstoreCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const category = getCategoryBySlug(slug || '');
  const products = getProductsByCategory(category?.id || '');
  const testimonials = categoryTestimonials[category?.id || ''] || [];
  const faqs = categoryFAQs[category?.id || ''] || [];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate('/webstore')}
            className="text-blue-600 hover:underline"
          >
            Back to Webstore
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${category.name} - Soho Connect Webstore`}
        description={category.description}
        keywords={`${category.name.toLowerCase()}, ${slug}, harare, zimbabwe`}
        canonical={`https://sohoconnect.co.zw/webstore/${slug}`}
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Category Hero */}
        <CategoryHero
          tagline={category.tagline}
          slides={category.heroImages}
          onCTAClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Product Grid */}
        <section id="products" className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-600 font-['Oswald']">
            {category.name} Products
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <WebstoreProductCard
                key={product.id}
                product={product}
                onViewDetails={(id) => navigate(`/webstore/product/${id}`)}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No products available in this category yet.</p>
              <button
                onClick={() => navigate('/contact')}
                className="mt-4 text-blue-600 hover:underline"
              >
                Contact us for custom solutions
              </button>
            </div>
          )}
        </section>

        {/* Popular Products Horizontal Scroll */}
        {products.length > 3 && (
          <section className="py-16 px-6 bg-white">
            <HorizontalScroll
              title={`Popular in ${category.name}`}
              subtitle="Our most requested products and packages"
            >
              {products.slice(0, 5).map((product) => (
                <WebstoreProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(id) => navigate(`/webstore/product/${id}`)}
                  compact
                />
              ))}
            </HorizontalScroll>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <FAQSection
            faqs={faqs}
            title={`FAQs about ${category.name}`}
          />
        )}

        {/* Quote CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Oswald']">
              Interested in {category.name}?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Fill in your details and we'll help you choose the perfect solution.
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

export default WebstoreCategory;
