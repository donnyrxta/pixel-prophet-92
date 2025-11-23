import { useState } from 'react';
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
  // Extract unique categories for filtering. We expose the
  // human‑readable category names as options. A synthetic "All"
  // category allows visitors to view everything.
  const categoryOptions = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Filter products based on search text and selected category.
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
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
        <h1 className="text-3xl font-display font-semibold text-primary mb-6 text-center">
          Our Products
        </h1>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-700">
          Browse a selection of high‑intent bundles and services carefully designed
          to meet the needs of Zimbabwean SMEs—from solar CCTV kits to
          restaurant launch packs. Use the search and filter options to refine
          your results.
        </p>
        {/* Search and category filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products found. Try adjusting your search or filters.</p>
        )}
      </section>
    </div>
  );
}
