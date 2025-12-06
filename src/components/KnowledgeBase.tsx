import { useState } from "react";
import { X, Calendar, ArrowRight } from "lucide-react";
import SafeImage from "./SafeImage";
import { useQuoteCalculator } from "@/context/QuoteCalculatorContext";

/**
 * Knowledge Base component displaying articles, case studies, and research
 * Establishes authority and provides value to visitors
 */
const KnowledgeBase = ({ onClose }: { onClose: () => void }) => {
  const { openCalculator } = useQuoteCalculator();
  // Sample articles/case studies data
  const articles = [
    {
      id: 1,
      type: "Case Study",
      title: "How We Increased Brand Visibility for Harare Startup by 300%",
      excerpt: "A complete rebrand and digital marketing campaign transformed a local tech startup into a recognized brand across Zimbabwe.",
      date: "2025-09-15",
      readTime: "8 min read",
      image: "/unsplash/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      type: "Article",
      title: "The Ultimate Guide to Business Card Design in 2025",
      excerpt: "Discover the latest trends in business card design and how to make a lasting first impression with premium print quality.",
      date: "2025-08-22",
      readTime: "5 min read",
      image: "/unsplash/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      type: "Research",
      title: "Print Marketing ROI: 2025 Zimbabwe Business Survey",
      excerpt: "Our comprehensive research shows that 78% of SMEs in Harare still rely on print materials as their primary marketing tool.",
      date: "2025-08-10",
      readTime: "12 min read",
      image: "/unsplash/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      type: "Case Study",
      title: "Rebranding Success: From Local to National Recognition",
      excerpt: "See how our comprehensive branding package helped a family business expand from Harare to nationwide presence.",
      date: "2025-07-28",
      readTime: "10 min read",
      image: "/unsplash/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      type: "Article",
      title: "Digital vs Print: Finding the Right Marketing Mix",
      excerpt: "Learn how to balance digital and print marketing strategies for maximum impact in the Zimbabwean market.",
      date: "2025-07-14",
      readTime: "6 min read",
      image: "/unsplash/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      type: "Research",
      title: "Color Psychology in Branding: What Works in Zimbabwe",
      excerpt: "Our study reveals which color combinations drive the most engagement among Zimbabwean consumers.",
      date: "2025-06-30",
      readTime: "7 min read",
      image: "/unsplash/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 md:p-8 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Knowledge Base</h2>
            <p className="text-primary-foreground/80">
              Articles, case studies, and research on effective marketing
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close knowledge base"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group bg-muted rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <SafeImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fallbackSrc="https://sohoconnect.co.zw/public/placeholder.svg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                      {article.type}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="pt-2">
                    <button className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center bg-muted rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Want to be featured in our next case study?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Partner with us and let's create success stories together. Get in touch to discuss your project.
            </p>
            <button
              onClick={() => openCalculator({ trigger: 'button' })}
              className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-bold shadow-lg hover:scale-105 transition-all"
            >
              Get Instant Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
