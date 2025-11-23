import Head from 'next/head';
import Link from 'next/link';
import LeadForm from '../components/LeadForm';
import TimedCarousel from '../components/TimedCarousel';
import HorizontalScroll from '../components/HorizontalScroll';
import ReviewList from '../components/ReviewList';
import FAQAccordion from '../components/FAQAccordion';
import { categories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

/**
 * Home page for the Soho Connect webstore. It introduces the company,
 * highlights core business divisions (design, print, marketing,
 * security) and invites visitors to explore the product catalogue or
 * request a custom quote. A hero section features a compelling
 * headline and call to action.
 */
export default function Home() {
  // Slides for the hero carousel. Each entry corresponds to a
  // business division offered by Soho Connect. The images are
  // pulled from the category definitions for consistency. The
  // subheadline mirrors the category tagline and the CTA links to
  // the relevant landing page. Adjust slide text to fit your
  // messaging needs.
  const slides = [
    {
      id: 'design',
      subheadline: categories[0].hero.tagline,
      headline: categories[0].name,
      description: categories[0].hero.description,
      image: categories[0].hero.image,
      ctaText: 'Explore Design',
      ctaHref: `/category/${categories[0].id}`,
    },
    {
      id: 'print',
      subheadline: categories[1].hero.tagline,
      headline: categories[1].name,
      description: categories[1].hero.description,
      image: categories[1].hero.image,
      ctaText: 'Browse Print',
      ctaHref: `/category/${categories[1].id}`,
    },
    {
      id: 'corporate',
      subheadline: categories[2].hero.tagline,
      headline: categories[2].name,
      description: categories[2].hero.description,
      image: categories[2].hero.image,
      ctaText: 'Corporate Wear',
      ctaHref: `/category/${categories[2].id}`,
    },
    {
      id: 'security',
      subheadline: categories[3].hero.tagline,
      headline: categories[3].name,
      description: categories[3].hero.description,
      image: categories[3].hero.image,
      ctaText: 'Secure Your Premises',
      ctaHref: `/category/${categories[3].id}`,
    },
  ];
  // Select a few products to highlight in the trending section. For
  // now we simply slice the first six entries but you could sort
  // based on popularity, release date or margin.
  const trending = products.slice(0, 6);
  // Testimonials for social proof. Replace these with real
  // customer reviews fetched from a CMS or third‑party service.
  const reviews = [
    {
      name: 'Tendai M.',
      stars: 5,
      text:
        'Soho Connect designed our new brand identity and the results exceeded expectations. Their team is creative and professional.',
    },
    {
      name: 'Rudo K.',
      stars: 4,
      text:
        'Great quality printing and quick turnaround times. The flyers and banners helped us attract more customers to our cafe.',
    },
    {
      name: 'Peter N.',
      stars: 5,
      text:
        'We purchased the solar CCTV kit and it has been a game changer for our warehouse security. Highly recommend!',
    },
  ];
  // Frequently asked questions to address common concerns and boost
  // conversion. Tailor these to your services and product lines.
  const faqItems = [
    {
      question: 'How long will my print order take?',
      answer:
        'Most standard print jobs are completed within 3–5 business days. Large format and bulk orders may take a little longer. We will always provide an expected turnaround time when you place your order.',
    },
    {
      question: 'Do you offer custom branding packages?',
      answer:
        'Yes! Our design team can create bespoke packages that include logos, brand guides, stationery, apparel and marketing materials tailored specifically to your business.',
    },
    {
      question: 'Can you install CCTV systems?',
      answer:
        'Absolutely. We not only supply CCTV equipment but also provide installation, training and ongoing maintenance services to ensure your premises remain secure.',
    },
  ];
  return (
    <div>
      <Head>
        <title>Soho Connect | Design, Print & Security Solutions</title>
        <meta
          name="description"
          content="Soho Connect offers professional design, printing, marketing and CCTV solutions in Zimbabwe. Explore our store or request a custom quote."
        />
      </Head>
      {/* Timed hero carousel. Slides auto‑advance every 8 seconds and
          feature a progress indicator. */}
      <TimedCarousel slides={slides} />
      {/* Category scroller */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-display font-semibold text-center mb-6 text-primary">
          Shop by Category
        </h2>
        <HorizontalScroll
          items={categories}
          renderItem={(cat) => (
            <Link
              href={`/category/${cat.id}`}
              className="group block relative w-64 h-48 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Background image with slight scale on hover for
                  tactile feel */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.hero.image})` }}
              />
              {/* Glassmorphic overlay containing the category name */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <h3 className="text-2xl font-display font-bold text-white drop-shadow-lg">
                  {cat.name}
                </h3>
              </div>
            </Link>
          )}
        />
      </section>
      {/* Trending products scroller */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-display font-semibold text-center mb-6 text-primary">
          Trending Products
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-6 text-gray-700">
          Discover our most popular bundles and services currently in
          high demand.
        </p>
        <HorizontalScroll
          items={trending}
          renderItem={(product) => (
            <div className="w-72">
              {/* Wrap the existing ProductCard inside a div to control width */}
              <ProductCard product={product} />
            </div>
          )}
        />
      </section>
      {/* Social proof via testimonials */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-display font-semibold text-center mb-6 text-primary">
          What Our Customers Say
        </h2>
        <ReviewList reviews={reviews} />
      </section>
      {/* Frequently asked questions */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-display font-semibold text-center mb-6 text-primary">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto">
          <FAQAccordion items={faqItems} />
        </div>
      </section>
      {/* Lead capture form */}
      <section id="quote" className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-display font-semibold text-center mb-6 text-primary">
          Request a Quote
        </h2>
        <p className="max-w-2xl mx-auto text-center mb-8 text-gray-700">
          Let’s discuss your project! Fill in the form below and our
          team will get back to you with tailored solutions.
        </p>
        <LeadForm />
      </section>
    </div>
  );
}
