import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Check, CreditCard, Palette, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const BusinessCardsHarare = () => {
  const services = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Business Card Printing",
      description: "Professional business card printing in various sizes, papers, and finishes."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Design",
      description: "Expert graphic design services to create stunning business card designs."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Bulk Orders",
      description: "Competitive pricing for bulk business card orders with fast turnaround."
    }
  ];

  const features = [
    "Premium cardstock options",
    "Full color printing on both sides",
    "Spot UV and foil stamping",
    "Rounded corners available",
    "Fast turnaround (3-5 business days)",
    "Free design consultation",
    "Quality guarantee",
    "Free delivery in Harare"
  ];

  const packages = [
    {
      name: "Standard",
      quantity: "500 cards",
      price: "$45",
      features: ["Single sided", "Standard cardstock", "Basic finish"]
    },
    {
      name: "Premium",
      quantity: "500 cards",
      price: "$75",
      features: ["Double sided", "Premium cardstock", "Spot UV finish"]
    },
    {
      name: "Deluxe",
      quantity: "500 cards",
      price: "$120",
      features: ["Double sided", "Premium cardstock", "Foil stamping + Spot UV"]
    }
  ];

  return (
    <>
      <SEOHead
        title="Business Cards Harare - Professional Printing Services | SohoConnect"
        description="Premium business card printing in Harare. Custom designs, bulk orders, fast turnaround. Free delivery in Harare."
        keywords="business cards harare, printing services zimbabwe, custom business cards, bulk business cards"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 to-purple-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Business Cards Harare
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Professional business card printing with premium finishes and fast turnaround.
                  Make a lasting impression with quality business cards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/263771234567?text=Hi%20SohoConnect!%20I%20need%20business%20card%20printing%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Inquiry
                  </a>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Business Card Services</h2>
                <p className="text-xl text-gray-600">Professional printing solutions for your business needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {services.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Packages Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Popular Packages</h2>
                <p className="text-xl text-gray-600">Choose the perfect package for your business needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {packages.map((pkg, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.quantity}</p>
                    <div className="text-3xl font-bold text-blue-600 mb-6">{pkg.price}</div>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors block"
                    >
                      Order Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Business Cards?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Order Business Cards?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get a free design consultation and detailed quote for your business card project.
                Quality printing with fast delivery in Harare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+263771234567"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/263771234567?text=Hi%20SohoConnect!%20I%20need%20business%20cards%20printed."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Quote
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BusinessCardsHarare;