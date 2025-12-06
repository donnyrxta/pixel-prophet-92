import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useQuoteCalculator } from "@/context/QuoteCalculatorContext";

const ContactSection = () => {
  const { toast } = useToast();
  const { openCalculator } = useQuoteCalculator();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Quote Request Received!",
      description: "We'll contact you within 1 hour via WhatsApp or phone.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact-form" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Get Your Free Quote in 2 Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 1 hour
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border-2 shadow-xl">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+263 77 123 4567"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Project Details *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your printing needs: type of materials, quantity, timeline, etc."
                  className="min-h-32"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? "Sending..." : "Get Free Quote Now"}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                By submitting, you agree to receive a response via WhatsApp or phone within 1 hour
              </p>
            </form>
          </div>

          {/* Contact Info & Alternative Methods */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Or Contact Us Directly
              </h3>

              {/* Instant Quote */}
              <button
                onClick={() => openCalculator({ trigger: 'button' })}
                className="block w-full p-6 bg-[#25D366]/10 border-2 border-[#25D366]/20 rounded-xl hover:border-[#25D366] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg text-foreground">Get Instant Quote</p>
                    <p className="text-muted-foreground">Calculate & send via WhatsApp</p>
                    <p className="text-sm text-[#25D366]">Fastest response time →</p>
                  </div>
                </div>
              </button>

              {/* Phone */}
              <button
                onClick={() => openCalculator({ trigger: 'button' })}
                className="block w-full p-6 bg-primary/10 border-2 border-primary/20 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg text-foreground">Request Quote & Call</p>
                    <p className="text-muted-foreground">+263 77 123 4567</p>
                    <p className="text-sm text-primary">Mon-Fri 8AM-6PM →</p>
                  </div>
                </div>
              </button>

              {/* Email */}
              <a
                href="mailto:info@sohoconnect.co.zw"
                className="block p-6 bg-accent/10 border-2 border-accent/20 rounded-xl hover:border-accent hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-foreground">Email</p>
                    <p className="text-muted-foreground">info@sohoconnect.co.zw</p>
                    <p className="text-sm text-accent">Response within 2 hours →</p>
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="p-6 bg-card border-2 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-foreground">Visit Our Office</p>
                    <p className="text-muted-foreground">
                      123 Samora Machel Avenue<br />
                      Harare, Zimbabwe
                    </p>
                    <p className="text-sm text-primary mt-2">Mon-Fri 8AM-6PM, Sat 9AM-1PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-dashed border-primary/20">
              <h4 className="font-bold text-lg text-foreground mb-4">Why Choose SOHO CONNECT?</h4>
              <div className="space-y-3">
                {[
                  "24-48 hour turnaround on most projects",
                  "Free design consultation included",
                  "Quality guarantee - reprint if not satisfied",
                  "127+ happy business clients",
                  "Competitive pricing with bulk discounts",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
