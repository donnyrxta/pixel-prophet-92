import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Check, Shield, Camera, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const CctvInstallationHarare = () => {
  const services = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "CCTV System Installation",
      description: "Professional installation of CCTV cameras, DVR/NVR systems, and monitoring solutions."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Consulting",
      description: "Expert advice on camera placement, system design, and security best practices."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Maintenance & Support",
      description: "Ongoing maintenance, system upgrades, and 24/7 technical support services."
    }
  ];

  const features = [
    "Free site survey and consultation",
    "Licensed and insured technicians",
    "All major CCTV brands supported",
    "Custom system design",
    "Remote viewing setup",
    "Motion detection alerts",
    "Night vision capabilities",
    "Weatherproof installations"
  ];

  return (
    <>
      <SEOHead
        title="CCTV Installation Harare - Professional Security Systems | SohoConnect"
        description="Professional CCTV installation in Harare. Security camera systems, monitoring solutions, and maintenance services. Free consultation and site survey."
        keywords="cctv installation harare, security cameras harare, cctv systems zimbabwe, surveillance installation"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 to-purple-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  CCTV Installation Harare
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Professional CCTV security systems installation and maintenance.
                  Protect your business and property with cutting-edge surveillance technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/263771234567?text=Hi%20SohoConnect!%20I%20need%20CCTV%20installation%20services."
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
                <h2 className="text-3xl font-bold mb-4">Our CCTV Services</h2>
                <p className="text-xl text-gray-600">Comprehensive security solutions for businesses and homes</p>
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

          {/* Features Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our CCTV Services?</h2>
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
                Ready to Secure Your Property?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get a free site survey and detailed quote for your CCTV installation needs.
                Contact us today to discuss your security requirements.
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
                  href="https://wa.me/263771234567?text=Hi%20SohoConnect!%20I%20need%20a%20CCTV%20installation%20quote."
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

export default CctvInstallationHarare;