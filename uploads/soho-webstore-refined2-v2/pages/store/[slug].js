import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { products } from '../../data/products';
import LeadForm from '../../components/LeadForm';
import { useCart } from '../../context/CartContext';
import ReviewList from '../../components/ReviewList';

/**
 * Product detail page. Displays comprehensive information about a single
 * product including image, description, pricing and a call‑to‑action.
 * It also provides a quote form for bespoke enquiries, integrating
 * directly with Brevo via the LeadForm component. If the product is
 * not found, a friendly message is shown with a link back to the
 * store.
 */
export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  // Local state for selected image index in the gallery (default first).
  const [imageIndex, setImageIndex] = useState(0);
  // Local state for reviews; start with product.reviews or empty array.
  const [reviews, setReviews] = useState(product?.reviews || []);
  // New review form fields
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  if (!product) {
    return (
      <div className="py-16 px-6 text-center">
        <Head>
          <title>Product not found | Soho Connect</title>
        </Head>
        <h1 className="text-3xl font-semibold mb-4">Product not found</h1>
        <p className="mb-8">The product you are looking for does not exist.</p>
        <Link href="/store" className="text-primary font-medium">
          Back to store
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>{product.name} | Soho Connect</title>
        <meta name="description" content={product.description} />
      </Head>
      {/* Product details section with gallery and information */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Image gallery */}
        <div>
          <div className="relative w-full h-96 rounded overflow-hidden shadow-md">
            <Image
              src={product.images ? product.images[imageIndex] : product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex mt-4 gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border ${
                    imageIndex === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Product information */}
        <div>
          <h1 className="text-3xl font-display font-semibold text-primary mb-2">
            {product.name}
          </h1>
          <p className="text-gray-700 mb-2">Category: {product.category}</p>
          <p className="text-gray-800 mb-4 leading-relaxed">
            {product.description}
          </p>
          {/* Price and stock */}
          <div className="mb-4">
            <div className="text-2xl font-bold text-primary mb-2">
              {typeof product.price === 'number'
                ? `USD $${product.price.toFixed(2)}`
                : product.price}
            </div>
            {product.stock !== undefined && (
              <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            )}
          </div>
          {/* Star rating summary */}
          {reviews.length > 0 && (
            <div className="flex items-center mb-4 gap-1">
              {(() => {
                const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
                return Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(avg) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i < Math.round(avg) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  />
                ));
              })()}
              <span className="text-sm text-gray-600 ml-2">({reviews.length} reviews)</span>
            </div>
          )}
          {/* Add to cart button */}
          <button
            onClick={() =>
              addToCart({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            disabled={product.stock !== undefined && product.stock <= 0}
            className={`px-6 py-3 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-primary ${
              product.stock !== undefined && product.stock <= 0
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-primary text-white hover:bg-blue-700'
            }`}
          >
            {product.stock !== undefined && product.stock <= 0 ? 'Out of stock' : 'Add to Cart'}
          </button>
          {/* Quote form */}
          <div className="mt-8">
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              Request a custom quote
            </h2>
            <p className="text-gray-700 mb-4">
              Looking for something more tailored? Fill in your details below and
              our team will assist you with a bespoke solution.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>
      {/* Reviews section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-display font-semibold text-primary mb-4">
          Customer Reviews
        </h2>
        {/* Existing reviews list */}
        <ReviewList
          reviews={reviews.map((r) => ({ name: r.name, stars: r.rating, text: r.comment }))}
        />
        {/* Review submission form */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReviews((prev) => [
                ...prev,
                {
                  name: reviewForm.name || 'Anonymous',
                  rating: reviewForm.rating,
                  comment: reviewForm.comment,
                },
              ]);
              setReviewForm({ name: '', rating: 5, comment: '' });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={reviewForm.name}
                onChange={(e) => setReviewForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full p-2 border rounded"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm((p) => ({ ...p, rating: parseInt(e.target.value, 10) }))}
                className="w-full p-2 border rounded"
              >
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>
                    {val} Star{val > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comment</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Share your experience..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
