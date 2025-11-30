import SEOHead from '../components/SEOHead';
import { LeadForm } from '../components/LeadForm';

export default function ContactPage() {
  // Contact page dedicated to lead capture; wires to Brevo + Strapi via /api/lead.
  return (
    <>
      <SEOHead
        title="Contact | Soho Connect"
        description="Reach Soho Connect for product support, demos, and partnerships."
        canonical="https://sohoconnect.co.zw/contact"
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Let’s talk</h1>
        <p className="text-gray-700 mb-8">
          Share what you need—support, demo, pricing, or partnerships. We route every request to the right team and
          start with an immediate confirmation email.
        </p>
        <LeadForm />
      </main>
    </>
  );
}
