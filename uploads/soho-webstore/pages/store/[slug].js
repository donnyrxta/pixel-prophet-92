import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../data/products';
import LeadForm from '../../components/LeadForm';

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
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="relative w-full h-96 rounded overflow-hidden shadow-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="text-3xl font-display font-semibold text-primary mb-4">
            {product.name}
          </h1>
          <p className="text-gray-700 mb-4">Category: {product.category}</p>
          <p className="text-gray-800 mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="text-2xl font-bold text-primary mb-6">
            {typeof product.price === 'number'
              ? `USD $${product.price.toFixed(2)}`
              : product.price}
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary">
            Add to Cart
          </button>
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
    </div>
  );
}
