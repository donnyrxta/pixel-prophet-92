import Head from 'next/head';
import Link from 'next/link';

/**
 * OrderConfirmation displays a friendly thank you message after the
 * customer completes checkout. It's a standalone page to which
 * users are redirected following a successful order submission. It
 * reassures them that the order was received and provides next
 * steps such as browsing the store again or contacting support.
 */
export default function OrderConfirmation() {
  return (
    <div className="px-6 py-12 max-w-3xl mx-auto text-center">
      <Head>
        <title>Thank You | Soho Connect</title>
        <meta name="description" content="Order confirmation page for Soho Connect." />
      </Head>
      <h1 className="text-3xl font-display font-semibold text-primary mb-6">
        Thank You for Your Order!
      </h1>
      <p className="mb-4 text-gray-700">
        Your order has been received and is being processed. You will receive
        an email confirmation shortly with the details of your purchase.
      </p>
      <p className="mb-8 text-gray-700">
        If you have any questions in the meantime, feel free to reply to the
        confirmation email or contact our support team.
      </p>
      <Link href="/store" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700">
        Continue Shopping
      </Link>
    </div>
  );
}