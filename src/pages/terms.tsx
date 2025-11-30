import SEOHead from '../components/SEOHead';

export default function Terms() {
  // Terms of Service shell with version stamp.
  const lastUpdated = '2025-11-25';
  return (
    <>
      <SEOHead
        title="Terms of Service | Soho Connect"
        description="Terms that govern use of Soho Connect services."
        canonical="https://sohoconnect.co.zw/terms"
      />
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-sm text-gray-600">Last updated: {lastUpdated}</p>
        <p className="text-gray-800">
          By using our site and services you agree to these terms. For questions, contact info@sohoconnect.co.zw.
        </p>
      </main>
    </>
  );
}
