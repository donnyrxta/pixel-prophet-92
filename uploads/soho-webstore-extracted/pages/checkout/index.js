import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

/**
 * CheckoutPage renders a form for collecting customer information and
 * displays a summary of the items in the cart. Upon submission it
 * posts the data to our internal API route (/api/order) which
 * registers the customer in Brevo and sends order confirmation
 * emails. A successful response clears the cart and redirects
 * visitors to a thank‑you page.
 */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  // Form state for customer details
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the order to our API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        items: items.map((item) => ({
          slug: item.slug,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Order failed');
      }
      // Clear the cart and navigate to confirmation page
      clearCart();
      router.push('/order-confirmation');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If cart is empty, there's no reason to be on checkout page
  if (items.length === 0) {
    return (
      <div className="px-6 py-12 max-w-5xl mx-auto text-center">
        <Head>
          <title>Checkout | Soho Connect</title>
        </Head>
        <h1 className="text-3xl font-display font-semibold text-primary mb-4">
          Checkout
        </h1>
        <p>Your cart is empty. Please add some products before checking out.</p>
        <Link href="/store" className="text-primary hover:underline mt-4 inline-block">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <Head>
        <title>Checkout | Soho Connect</title>
        <meta name="description" content="Complete your purchase at Soho Connect." />
      </Head>
      <h1 className="text-3xl font-display font-semibold text-primary mb-8 text-center">
        Checkout
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Customer details form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
            />
          </div>
          <h2 className="text-xl font-semibold mt-6 mb-4">Shipping Address</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address *</label>
            <input
              type="text"
              name="address"
              required
              value={form.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State/Province</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                required
                value={form.postalCode}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <input
                type="text"
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-primary text-white py-3 rounded-full font-medium hover:bg-blue-700"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
        {/* Order summary */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-300">
            {items.map((item) => (
              <li key={item.slug} className="py-2 flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-4 mt-4">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}