import Link from 'next/link';
import Image from 'next/image';

/**
 * ProductCard displays a hero-style card for a product. It uses a
 * background image and overlays product information along with a
 * call-to-action. The design draws inspiration from the travel card
 * concept found in the provided Timed Cards Opening example while
 * adapting to Soho Connect’s brand (blue accents, white text). A
 * Link directs users to the product detail page.
 *
 * @param {Object} props
 * @param {Object} props.product - The product to display.
 * @param {string} props.product.slug - Slug for the product URL.
 * @param {string} props.product.name - Display name of the product.
 * @param {string} props.product.description - Short description.
 * @param {string} props.product.image - URL for the background image.
 * @param {number|string} props.product.price - Price of the product.
 */
export default function ProductCard({ product }) {
  return (
    <div
      className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg group"
    >
      {/* Background image */}
      <Image
        src={product.image}
        alt={product.name}
        fill
        style={{ objectFit: 'cover' }}
        className="transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-white text-xl font-semibold tracking-wide mb-1">
            {product.name}
          </h3>
          <p className="text-white text-sm line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-300">
            {typeof product.price === 'number' ? `USD $${product.price.toFixed(2)}` : product.price}
          </div>
          <Link
            href={`/store/${product.slug}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
