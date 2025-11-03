import { useState } from "react";
import { Printer, Palette, FileText, Layout, Package, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import QuotationCalculator from "./QuotationCalculator";

const services = [
  {
    icon: Printer,
    title: "Business Cards",
    description: "Premium cards that make lasting first impressions",
    benefits: ["High-quality paper", "Multiple finishes", "Fast 24h turnaround"],
    color: "from-primary to-primary-hover",
  },
  {
    icon: FileText,
    title: "Brochures & Flyers",
    description: "Marketing materials that drive results",
    benefits: ["Eye-catching designs", "Various sizes", "Bulk discounts"],
    color: "from-secondary to-accent",
  },
  {
    icon: Layout,
    title: "Large Format Printing",
    description: "Banners and posters that get noticed",
    benefits: ["Weather-resistant", "Indoor/outdoor", "Custom sizes"],
    color: "from-accent to-vivid-sky-blue",
  },
  {
    icon: Palette,
    title: "Branding Packages",
    description: "Complete visual identity for your business",
    benefits: ["Logo design", "Brand guidelines", "Full stationery"],
    color: "from-vivid-sky-blue to-non-photo-blue",
  },
  {
    icon: Package,
    title: "Packaging Design",
    description: "Product packaging that sells",
    benefits: ["Custom shapes", "Premium finishes", "Die-cutting"],
    color: "from-non-photo-blue to-pacific-cyan",
  },
  {
    icon: Sparkles,
    title: "Custom Projects",
    description: "Specialized printing solutions",
    benefits: ["Unique materials", "Special finishes", "Expert consultation"],
    color: "from-pacific-cyan to-blue-green",
  },
];

const ServicesSection = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Services That Drive Business Growth
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to delivery, we handle everything so you can focus on your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative p-8 space-y-4">
                  {/* Icon */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  {/* Benefits - Show on hover */}
                  <div
                    className={`space-y-2 transition-all duration-500 ${
                      hoveredIndex === index
                        ? "opacity-100 max-h-40"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="pt-4">
                    <button className="text-primary font-semibold group-hover:gap-2 flex items-center transition-all duration-300">
                      Learn More
                      <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-lg text-muted-foreground mb-4">
            Need something custom? We love a challenge.
          </p>
          <button
            onClick={() => setShowCalculator(true)}
            className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get Instant Quote
          </button>
        </div>
      </div>

      {/* Quotation Calculator Modal */}
      {showCalculator && <QuotationCalculator onClose={() => setShowCalculator(false)} />}
    </section>
  );
};

export default ServicesSection;
