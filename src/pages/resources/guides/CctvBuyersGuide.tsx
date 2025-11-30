import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Download, Eye, CheckCircle, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createBrevoContact, sendBrevoEmail } from '@/lib/brevo';

const CctvBuyersGuide = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create/update contact in Brevo
      await createBrevoContact({
        email: formData.email,
        attributes: {
          FIRSTNAME: formData.firstName,
          LASTNAME: formData.lastName,
          PHONE: formData.phone,
          COMPANY: formData.company,
          INTEREST: 'CCTV Buyer\'s Guide'
        },
        listIds: [1] // Replace with your Brevo list ID
      });

      // Send download link via email
      await sendBrevoEmail({
        toEmail: formData.email,
        toName: `${formData.firstName} ${formData.lastName}`,
        subject: 'Your CCTV Buyer\'s Guide Download Link',
        htmlContent: `
          <h2>Thank you for downloading our CCTV Buyer's Guide!</h2>
          <p>Dear ${formData.firstName},</p>
          <p>Thank you for your interest in our CCTV Buyer's Guide. Here's your download link:</p>
          <p><a href="https://sohoconnect.com/guides/cctv-buyers-guide.pdf" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download CCTV Buyer's Guide</a></p>
          <p>If you have any questions, feel free to contact us.</p>
          <p>Best regards,<br>SohoConnect Team</p>
        `
      });

      setIsFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFormSubmitted) {
    return (
      <>
        <SEOHead
          title="Download Complete - CCTV Buyer's Guide | SohoConnect"
          description="Your CCTV Buyer's Guide download is ready. Access expert surveillance system information."
        />
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center py-16">
            <div className="container mx-auto px-4 text-center max-w-2xl">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Thank You for Your Interest!</h1>
              <p className="text-xl text-gray-600 mb-6">
                Check your email for the download link to our comprehensive CCTV Buyer's Guide.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">What you'll learn in the guide:</h3>
                <ul className="text-left space-y-1">
                  <li>• Camera types and specifications</li>
                  <li>• Resolution and image quality</li>
                  <li>• Storage and recording options</li>
                  <li>• Installation and maintenance tips</li>
                  <li>• Cost analysis and ROI considerations</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cctv-installation-harare"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  CCTV Installation Services
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="CCTV Buyer's Guide - Free Download | SohoConnect"
        description="Download our comprehensive CCTV Buyer's Guide. Learn about surveillance systems, cameras, and installation. Free expert advice."
        keywords="cctv buyers guide, surveillance systems, security cameras, cctv installation"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 to-purple-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  CCTV Buyer's Guide
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Your complete guide to choosing the right CCTV surveillance system.
                  Expert insights on cameras, technology, and installation.
                </p>
                <div className="flex items-center justify-center gap-4 text-blue-100">
                  <Shield className="w-5 h-5" />
                  <span>Security technology guide</span>
                  <Download className="w-5 h-5 ml-4" />
                  <span>41 pages of expert content</span>
                </div>
              </div>
            </div>
          </section>

          {/* Guide Preview */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">CCTV Technology & Buying Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Camera Technology</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Resolution: HD, 4K, and beyond</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Night vision and low-light performance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>PTZ vs fixed cameras</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Indoor vs outdoor specifications</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">System Components</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>DVR/NVR recording systems</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Storage solutions and retention</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Remote viewing and mobile access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Motion detection and alerts</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Download Form */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="text-center mb-6">
                    <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Get Your Free Guide</h2>
                    <p className="text-gray-600">Enter your details to download instantly</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name (Optional)"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        'Processing...'
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Download Free Guide
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    We respect your privacy. Your information will not be shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Services */}
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Professional CCTV Installation</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Ready to install a CCTV system? Check out our professional installation services with expert consultation and support.
              </p>
              <Link
                to="/cctv-installation-harare"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                CCTV Installation Services
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CctvBuyersGuide;