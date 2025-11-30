import SEOHead from '../components/SEOHead';

export default function Privacy() {
  // Privacy notice with version stamp; update content via CMS later.
  const lastUpdated = '2025-11-25';
  return (
    <>
      <SEOHead
        title="Privacy Policy | Soho Connect"
        description="Privacy commitments and data handling practices."
        canonical="https://sohoconnect.co.zw/privacy"
      />
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-gray-600">Last updated: {lastUpdated}</p>
        <p className="text-gray-800">
          We use your data to deliver services, improve experience, and—with consent—send marketing. You can request
          access, correction, or deletion at any time by emailing info@sohoconnect.co.zw.
        </p>
      </main>
    </>
  );
}
