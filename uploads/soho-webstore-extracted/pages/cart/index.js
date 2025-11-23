import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

/**
 * Cart page displays all items currently in the shopping cart. It
 * allows users to update quantities, remove items, see a running
 * total and proceed to checkout. When the cart is empty the page
 * encourages visitors to continue shopping.
 */
export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const isEmpty = items.length === 0;
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <Head>
        <title>Your Cart | Soho Connect</title>
        <meta name="description" content="Review your cart items and proceed to checkout." />
      </Head>
      <h1 className="text-3xl font-display font-semibold text-primary mb-8 text-center">
        Your Cart
      </h1>
      {isEmpty ? (
        <div className="text-center text-gray-700">
          <p className="mb-4">Your cart is currently empty.</p>
          <Link href="/store" className="text-primary font-medium hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  USD ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.slug, e.target.value)}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                USD ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          {/* Order summary */}
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>USD ${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
              <span>Total</span>
              <span>USD ${totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/checkout"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}