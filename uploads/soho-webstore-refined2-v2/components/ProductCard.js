import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

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
  const { addToCart } = useCart();
  const handleAdd = (e) => {
    e.preventDefault();
    // Add minimal product data to the cart. Only include the
    // fields necessary for display and price calculations.
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };
  // Compute the average rating from the product reviews, if any.
  const avgRating =
    product.reviews && product.reviews.length
      ? product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / product.reviews.length
      : null;
  // Determine if the product is out of stock. When stock === 0 the
  // Add to Cart button will be disabled and a badge shown.
  const outOfStock = product.stock !== undefined && product.stock <= 0;
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
      {/* Bundle badge */}
      {product.isBundle && (
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
          Bundle
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-white text-xl font-semibold tracking-wide mb-1">
            {product.name}
          </h3>
          <p className="text-white text-sm line-clamp-3">
            {product.description}
          </p>
          {/* Star rating row */}
          {avgRating && (
            <div className="flex items-center mt-2 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill={i < Math.round(avgRating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                />
              ))}
              <span className="text-xs text-white/80 ml-1">({product.reviews.length})</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-lg font-bold text-blue-300">
            {typeof product.price === 'number' ? `USD $${product.price.toFixed(2)}` : product.price}
          </div>
          <div className="flex gap-2">
            <Link
              href={`/store/${product.slug}`}
              className="inline-block bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm hover:bg-white/30"
            >
              Details
            </Link>
            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                outOfStock
                  ? 'bg-gray-500 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {outOfStock ? 'Out of stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
      {/* Out of stock overlay badge if the product cannot be purchased */}
      {outOfStock && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <span className="text-white font-bold text-lg">Out of Stock</span>
        </div>
      )}
    </div>
  );
}
