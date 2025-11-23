import { useRouter } from 'next/router';
import Head from 'next/head';
import CategoryHero from '../../components/CategoryHero';
import ProductCard from '../../components/ProductCard';
import HorizontalScroll from '../../components/HorizontalScroll';
import ReviewList from '../../components/ReviewList';
import FAQAccordion from '../../components/FAQAccordion';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

/**
 * Dynamic category page. When a visitor navigates to
 * `/category/[id]` the router provides the id parameter which is
 * matched against our static category list. If found we render a
 * custom hero followed by all products belonging to that category.
 * If the category does not exist we show a simple not found
 * message. Metadata is set via the Head component to improve SEO.
 */
export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const category = categories.find((c) => c.id === id);
  // Filter products by matching category slug; fallback to category name for older entries
  const categoryProducts = products.filter(
    (p) => p.categorySlug === id || p.category.toLowerCase().replace(/\s+/g, '-') === id
  );
  if (!category) {
    return (
      <div className="pt-32 px-6 text-center">
        <Head>
          <title>Category not found | Soho Connect</title>
        </Head>
        <h1 className="text-3xl font-semibold mb-4">Category not found</h1>
        <p className="mb-8">The category you are looking for does not exist.</p>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>{category.name} | Soho Connect</title>
        <meta name="description" content={category.hero.description} />
      </Head>
      {/* Timed hero for the category. Renders tagline, title and a
          rotating feature card over the hero image. */}
      <CategoryHero category={category} />
      {/* Product grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-semibold text-primary mb-6 text-center">
          {category.name} Products
        </h2>
        {categoryProducts.length === 0 ? (
          <p className="text-center text-gray-700">
            No products found in this category yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
      {/* Horizontal scroll of top products. Use the first few items to
          create a dynamic “Popular in {category}” rail. */}
      {categoryProducts.length > 1 && (
        <section className="py-12 px-6 bg-gray-50">
          <h3 className="text-2xl font-display font-semibold text-primary mb-4 text-center">
            Popular in {category.name}
          </h3>
          <HorizontalScroll
            items={categoryProducts.slice(0, 6)}
            renderItem={(product) => (
              <div className="w-72">
                <ProductCard product={product} />
              </div>
            )}
          />
        </section>
      )}
      {/* Testimonials specific to the category. Here we reuse a few
          generic reviews but you could vary them by category. */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-display font-semibold text-primary mb-4 text-center">
          Customer Reviews
        </h3>
        <ReviewList
          reviews={[
            {
              name: 'Satisfied Client',
              stars: 5,
              text: `I love the ${category.name.toLowerCase()} services from Soho Connect – the quality and service are unmatched!`,
            },
            {
              name: 'Happy Customer',
              stars: 4,
              text: `Great experience with Soho Connect. Their ${category.name.toLowerCase()} products helped our business stand out.`,
            },
          ]}
        />
      </section>
      {/* Category FAQ. Provide helpful answers related to the
          division. */}
      <section className="py-12 px-6 bg-gray-100">
        <h3 className="text-2xl font-display font-semibold text-primary mb-4 text-center">
          FAQs about {category.name}
        </h3>
        <div className="max-w-4xl mx-auto">
          <FAQAccordion
            items={[
              {
                question: `What is included in your ${category.name.toLowerCase()} offerings?`,
                answer: `Our ${category.name.toLowerCase()} range covers everything you need – from consultation and design to production and delivery. Get in touch for a custom solution.`,
              },
              {
                question: `How do I get started with ${category.name.toLowerCase()}?`,
                answer: `Simply browse our products above or request a quote. Our team will guide you through the process from idea to finished product.`,
              },
              {
                question: 'Do you offer bulk discounts?',
                answer: 'Yes, we offer competitive pricing for bulk orders and ongoing contracts. Contact us for a personalised quote.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}