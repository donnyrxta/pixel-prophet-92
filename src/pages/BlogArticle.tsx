/**
 * BlogArticle - Individual article page with SEO optimization
 */

import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { ArticleSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/SchemaMarkup';
import { getArticleBySlug, getRecentArticles } from '@/data/blog-articles';
import { CTAButton } from '@/components/ui/cta-button';
import { Calculator, FileText, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const recentArticles = getRecentArticles(3);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Article Not Found</h1>
          <Link to="/blog">
            <CTAButton variant="primary">Back to Blog</CTAButton>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = `https://sohoconnect.co.zw/blog/${article.slug}`;

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        keywords={article.seoKeywords.join(', ')}
        canonical={shareUrl}
        ogImage={article.image}
        article={{
          publishedTime: article.publishedDate,
          modifiedTime: article.modifiedDate,
          author: article.author,
          section: article.category,
          tags: article.tags
        }}
      />

      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        image={article.image}
        datePublished={article.publishedDate}
        dateModified={article.modifiedDate}
        author={article.author}
      />

      {article.faq && <FAQPageSchema faqs={article.faq} />}

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` }
        ]}
      />

      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-8">
          <div className="container mx-auto px-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#4169e1] hover:text-[#3557c4] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="max-w-4xl">
              <div className="text-sm text-[#4169e1] font-semibold mb-4">
                {article.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-stone-600 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(article.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {article.readTime} min read
                </div>
                <div className="text-stone-600">
                  By {article.author}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="prose prose-lg prose-stone max-w-none">
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>

                {/* Lead Magnet / CTA Block */}
                {article.leadMagnet && (
                  <div className="my-12 p-8 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                      <div className="flex-shrink-0 w-16 h-16 bg-[#4169e1]/10 rounded-full flex items-center justify-center text-[#4169e1]">
                        {article.leadMagnet.type === 'calculator' ? (
                          <Calculator className="w-8 h-8" />
                        ) : article.leadMagnet.type === 'quote' ? (
                          <FileText className="w-8 h-8" />
                        ) : (
                          <CheckCircle className="w-8 h-8" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-stone-900 mb-2">
                          {article.leadMagnet.title}
                        </h3>
                        <p className="text-stone-600 mb-4 md:mb-0">
                          {article.leadMagnet.description}
                        </p>
                      </div>
                      <Link to={article.leadMagnet.link}>
                        <CTAButton variant="primary">
                          {article.leadMagnet.ctaText}
                        </CTAButton>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-stone-200">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-stone-900">Share this article</h3>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: article.title,
                            text: article.excerpt,
                            url: shareUrl
                          });
                        }
                      }}
                      className="flex items-center gap-2 text-[#4169e1] hover:text-[#3557c4] transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">More Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {recentArticles
                .filter(a => a.id !== article.id)
                .slice(0, 3)
                .map((recentArticle) => (
                  <Link
                    key={recentArticle.id}
                    to={`/blog/${recentArticle.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={recentArticle.image}
                        alt={recentArticle.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-[#4169e1] transition-colors line-clamp-2">
                        {recentArticle.title}
                      </h3>
                      <p className="text-stone-600 text-sm line-clamp-2">
                        {recentArticle.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#4169e1] to-[#3557c4] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get professional services from Harare's trusted design and print partner.
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

export default BlogArticle;