/**
 * About Page - Company story, team, values, and location
 * Builds trust and credibility with potential clients
 */
import { useState } from "react";
import { Header } from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Target, Users, Award, TrendingUp, MapPin, Phone } from "lucide-react";
import { CONTACT_INFO, BUSINESS_INFO } from "@/lib/constants";
import QuotationCalculator from "@/components/QuotationCalculator";

const About = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We deliver exceptional quality in every project, no matter the size."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Your success is our success. We work as an extension of your team."
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We stay ahead of trends to provide cutting-edge solutions."
    },
    {
      icon: TrendingUp,
      title: "Results-Driven",
      description: "We measure success by the tangible impact we create for your business."
    }
  ];

  const milestones = [
    { year: "2018", event: "Soho Connect Founded", description: "Started with a vision to transform Harare businesses" },
    { year: "2020", event: "50+ Clients", description: "Reached milestone of serving 50 businesses" },
    { year: "2022", event: "Digital Expansion", description: "Launched full digital marketing services" },
    { year: "2024", event: "127+ Businesses", description: "Trusted partner for Harare's leading companies" }
  ];

  const team = [
    { name: "Tatenda Moyo", role: "Creative Director", bio: "15+ years in brand design and strategy" },
    { name: "Chipo Ndlovu", role: "Print Production Manager", bio: "Expert in large-format and commercial printing" },
    { name: "Tinashe Mukanya", role: "Digital Marketing Lead", bio: "Specialist in social media and paid advertising" }
  ];

  return (
    <>
      <SEOHead 
        title="About Us - Zimbabwe's Trusted Creative Partner"
        description="Learn about Soho Connect, Harare's premier printing and marketing company. Established in 2018, trusted by 127+ businesses for quality printing, branding, and digital marketing."
        keywords="about soho connect, printing company harare, marketing agency zimbabwe, harare cbd business, established 2018"
        canonical="https://sohoconnect.co.zw/about"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <FloatingContact />
        <Breadcrumbs />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Est. {BUSINESS_INFO.yearEstablished}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              We Are Soho Connect
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harare's premier design, print, and digital marketing partner, helping businesses 
              grow through strategic branding and measurable marketing since {BUSINESS_INFO.yearEstablished}.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Soho Connect was born from a simple observation: Harare businesses needed a 
                reliable partner who could handle everything from design to print to digital 
                marketing—all under one roof.
              </p>
              <p className="text-gray-700 leading-relaxed">
                What started as a small printing shop has evolved into a full-service creative 
                agency. Today, we're proud to serve {BUSINESS_INFO.trustSignal.split(' ')[2]} 
                across Harare, from SMEs to corporates, helping them build strong brands and 
                reach their customers effectively.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team combines local market knowledge with international design standards, 
                ensuring every project not only looks great but delivers real business results.
              </p>
              <Link to="/contact">
                <Button size="lg" className="mt-4">Get to Know Us Better</Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/images/hero/kaffie-co-7hEZILVOcFU-unsplash.jpg"
                alt="Soho Connect Office"
                className="rounded-2xl shadow-2xl w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20 bg-white rounded-2xl shadow-xl p-8 md:p-12 border">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="hidden md:block w-px h-16 bg-gray-200 absolute left-10 mt-20" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-xl shadow-lg p-6 border text-center hover:shadow-xl transition-shadow">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location Section */}
          <div className="grid lg:grid-cols-2 gap-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 text-white">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Address</p>
                    <p className="opacity-90">{CONTACT_INFO.address}</p>
                    <p className="text-sm opacity-75 mt-1">Near NetOne Building</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="opacity-90 hover:underline">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/contact">
                <Button variant="secondary" size="lg" className="mt-8">
                  Get Directions
                </Button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.0!2d31.05!3d-17.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ5JzQ2LjgiUyAzMcKwMDMnMDAuMCJF!5e0!3m2!1sen!2szw!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Soho Connect Office Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how we can help grow your business
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services">
              <Button size="lg" variant="outline">View Our Services</Button>
            </Link>
            <Button size="lg" onClick={() => setShowCalculator(true)}>Get Instant Quote</Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quotation Calculator Modal */}
      {showCalculator && <QuotationCalculator onClose={() => setShowCalculator(false)} />}
    </div>
    </>
  );
};

export default About;
