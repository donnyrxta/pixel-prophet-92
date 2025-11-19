import Head from 'next/head';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

/**
 * Store index page lists all products available at Soho Connect. Users can
 * browse the catalogue, filter by category and navigate to individual
 * product pages. This page uses the ProductCard component to render a
 * uniform card layout for each item.
 */
export default function Store() {
  // Extract unique categories for future filtering (not yet implemented)
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return (
    <div>
      <Head>
        <title>Soho Connect Store</title>
        <meta
          name="description"
          content="Explore Soho Connect’s curated product bundles and services across CCTV, design, print and marketing."
        />
      </Head>
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-semibold text-primary mb-8 text-center">
          Our Products
        </h1>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-700">
          Browse a selection of high‑intent bundles and services carefully designed
          to meet the needs of Zimbabwean SMEs—from solar CCTV kits to
          restaurant launch packs. Click on any product to learn more.
        </p>
        {/* Product grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
