/**
 * Blog - SEO-optimized articles and guides
 */

import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { blogArticles } from '@/data/blog-articles';
import { CTAButton } from '@/components/ui/cta-button';

const Blog = () => {
  return (
    <>
      <SEOHead
        title="Business Guides & Articles"
        description="Expert guides on branding, printing, CCTV security, and marketing for Zimbabwe businesses. Learn from Harare's premier design and print partner."
        keywords="business guides zimbabwe, branding tips, printing advice, security guides, marketing articles harare"
        canonical="https://sohoconnect.co.zw/blog"
      />

      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-[#4169e1] to-[#3557c4] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Business Insights & Guides
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Expert advice on branding, printing, security, and marketing for Zimbabwe businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {blogArticles.filter(a => a.featured)[0] && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={blogArticles.filter(a => a.featured)[0].image}
                      alt={blogArticles.filter(a => a.featured)[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#4169e1] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-sm text-[#4169e1] font-semibold mb-2">
                      {blogArticles.filter(a => a.featured)[0].category}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                      {blogArticles.filter(a => a.featured)[0].title}
                    </h2>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                      {blogArticles.filter(a => a.featured)[0].excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-stone-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogArticles.filter(a => a.featured)[0].publishedDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {blogArticles.filter(a => a.featured)[0].readTime} min read
                      </div>
                    </div>
                    <Link to={`/blog/${blogArticles.filter(a => a.featured)[0].slug}`}>
                      <CTAButton variant="primary" icon>
                        Read Article
                      </CTAButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-stone-900 mb-12">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-[#4169e1] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-stone-600 mb-4 line-clamp-3 text-sm">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {article.readTime} min
                      </div>
                      <div className="flex items-center gap-1 text-[#4169e1] font-semibold group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#4169e1] to-[#3557c4] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Expert Help with Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get professional branding, printing, and marketing services from Harare's trusted partner.
            </p>
            <Link to="/contact">
              <CTAButton variant="secondary" size="lg" icon>
                Get Your Free Quote
              </CTAButton>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;