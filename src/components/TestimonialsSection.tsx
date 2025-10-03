import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Tendai Moyo",
    company: "TechStart Zimbabwe",
    role: "Founder",
    rating: 5,
    text: "SOHO CONNECT transformed our brand identity. The business cards are exceptional quality and we got them in 24 hours. Highly recommend!",
    image: "T",
  },
  {
    name: "Chipo Ndlovu",
    company: "Green Valley Farms",
    role: "Marketing Manager",
    rating: 5,
    text: "Best printing service in Harare. Their attention to detail and customer service is unmatched. Our brochures helped us win 3 major contracts.",
    image: "C",
  },
  {
    name: "James Mutasa",
    company: "Elite Properties",
    role: "CEO",
    rating: 5,
    text: "Fast, professional, and affordable. SOHO CONNECT has been our go-to printer for 2 years. The large format banners always look stunning.",
    image: "J",
  },
  {
    name: "Rudo Macheka",
    company: "Fashionista Boutique",
    role: "Owner",
    rating: 5,
    text: "The packaging design service is incredible. They understood our brand vision perfectly and delivered beyond expectations. Sales increased by 40%!",
    image: "R",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted to-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            127+ Happy Businesses Can't Be Wrong
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about working with SOHO CONNECT
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
          <Card className="relative p-8 md:p-12 bg-card border-2 shadow-xl">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary opacity-20" />
            
            <div className="relative space-y-6">
              {/* Stars */}
              <div className="flex gap-1 justify-center">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-center text-foreground leading-relaxed">
                "{testimonials[activeIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                  {testimonials[activeIndex].image}
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg text-foreground">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-muted-foreground">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? "w-12 h-3 bg-primary"
                  : "w-3 h-3 bg-border hover:bg-primary/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`p-6 cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                index === activeIndex ? "border-2 border-primary" : "border"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground line-clamp-3">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
