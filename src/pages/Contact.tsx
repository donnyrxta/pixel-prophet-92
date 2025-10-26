/**
 * Contact Page - Multi-channel contact form with location map
 * Conversion-optimized with trust signals and response time promise
 */
import { useState } from "react";
import { Header } from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { CONTACT_INFO, BUSINESS_INFO } from "@/lib/constants";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send via WhatsApp
    const whatsappMessage = `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

    toast({
      title: "Message Sent!",
      description: "We'll respond within 1 hour. You've been redirected to WhatsApp.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SEOHead 
        title="Contact Us - Get in Touch"
        description="Contact Soho Connect for printing, branding, and marketing services in Harare. Visit us at 7 Luck Street, Harare CBD or call +263 71 457 0414."
        keywords="contact soho connect, printing company harare address, marketing agency zimbabwe contact, 7 luck street harare"
        canonical="https://sohoconnect.co.zw/contact"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <FloatingContact />
        <Breadcrumbs />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {BUSINESS_INFO.responseTime}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-primary">Available Now</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+263 71 234 5678"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="w-full resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact Methods */}
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Contact Us Directly</h3>
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hi%20Soho%20Connect,%20I'd%20like%20to%20get%20a%20quote`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">WhatsApp (Fastest)</div>
                      <div className="text-sm opacity-90">{CONTACT_INFO.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Call Us</div>
                      <div className="text-sm opacity-90">{CONTACT_INFO.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-start gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <div className="text-sm opacity-90">{CONTACT_INFO.email}</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location & Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Visit Our Office</h4>
                    <p className="text-gray-600 mb-3">{CONTACT_INFO.address}</p>
                    <a
                      href={CONTACT_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{CONTACT_INFO.businessHours.weekdays}</p>
                        <p>{CONTACT_INFO.businessHours.saturday}</p>
                        <p>{CONTACT_INFO.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Signal */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <p className="text-center text-lg font-semibold text-gray-900">
                  {BUSINESS_INFO.trustSignal}
                </p>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Join Harare's leading businesses who trust us with their brand
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find Us</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.0!2d31.05!3d-17.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzQ2LjgiUyAzMcKwMDMnMDAuMCJF!5e0!3m2!1sen!2szw!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Soho Connect Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Contact;
