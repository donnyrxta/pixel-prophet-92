/**
 * WebstoreCategory - Category landing page template
 * Features category-specific hero, product grid, and testimonials
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Grid3X3, List, Filter, SortAsc, SortDesc, GitCompare, X, Check } from 'lucide-react';
import { getCategoryBySlug, getProductsByCategory } from '@/data/webstore-products';
import { WebstoreProductCard } from '@/components/webstore/WebstoreProductCard';
import { CategoryHero } from '@/components/webstore/CategoryHero';
import { HorizontalScroll } from '@/components/webstore/HorizontalScroll';
import { WebstoreProduct } from '@/data/webstore-products';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { FAQSection } from '@/components/webstore/FAQSection';
import { TestimonialsSection } from '@/components/webstore/TestimonialsSection';
import { recordEvent } from '@/lib/strapi-client';

interface WebstoreCategoryProps {}

const WebstoreCategory: React.FC<WebstoreCategoryProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // State management
  const [filteredProducts, setFilteredProducts] = useState<WebstoreProduct[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [compareProducts, setCompareProducts] = useState<WebstoreProduct[]>([]);

  // Brand and price range options
  const brands = ['HiLook', 'Russell', 'Soho Connect'];
  const priceRanges = [
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $2500', min: 1000, max: 2500 },
    { label: '$2500+', min: 2500, max: Infinity }
  ];

  const category = useMemo(() => getCategoryBySlug(slug || ''), [slug]);
  const products = useMemo(() => getProductsByCategory(category?.slug || ''), [category?.slug]);

  const categoryTestimonials: Record<string, { name: string; rating: number; text: string }[]> = {
    design: [
      { name: 'Tendai M.', rating: 5, text: 'Our new brand identity elevated our presence.' },
      { name: 'Rudo K.', rating: 4, text: 'Consistent visual system across all materials.' }
    ],
    print: [
      { name: 'Peter N.', rating: 5, text: 'High-quality printing with fast turnaround.' }
    ],
    'corporate-wear': [
      { name: 'Nyasha D.', rating: 5, text: 'Premium uniforms that reinforce our brand.' }
    ],
    cctv: [
      { name: 'Farai S.', rating: 5, text: 'Professional installation and excellent support.' }
    ],
    marketing: [
      { name: 'Tatenda B.', rating: 4, text: 'Campaigns drove measurable engagement and leads.' }
    ],
    'office-supplies': [
      { name: 'Caroline P.', rating: 4, text: 'Reliable consumables delivered on time.' }
    ],
    ict: [
      { name: 'Kuda M.', rating: 5, text: 'Great smartphones and accessories at fair prices.' }
    ],
    workwear: [
      { name: 'Blessing T.', rating: 5, text: 'Durable PPE with branding options.' }
    ],
    'fleet-branding': [
      { name: 'Chenai G.', rating: 5, text: 'Vehicle wraps turned heads and boosted awareness.' }
    ],
  };

  const categoryFAQs: Record<string, { question: string; answer: string }[]> = {
    design: [
      { question: 'How long does a logo project take?', answer: 'Typically 1–2 weeks including revisions.' },
    ],
    print: [
      { question: 'Do you offer rush printing?', answer: 'Yes, rush services are available for select products.' },
    ],
    'corporate-wear': [
      { question: 'Can you brand uniforms?', answer: 'We offer embroidery and printing for apparel.' },
    ],
    cctv: [
      { question: 'Do you install CCTV?', answer: 'Yes, we provide full installation and training.' },
    ],
    marketing: [
      { question: 'Do you manage social media?', answer: 'We provide content and campaign management.' },
    ],
    'office-supplies': [
      { question: 'Do you deliver supplies?', answer: 'Yes, we deliver within Harare and nationwide by courier.' },
    ],
    ict: [
      { question: 'Are devices under warranty?', answer: 'All devices include manufacturer warranty.' },
    ],
    workwear: [
      { question: 'What sizes are available?', answer: 'Full range of sizes with safety compliance.' },
    ],
    'fleet-branding': [
      { question: 'How long does a vehicle wrap take?', answer: 'Design and installation typically within 3–5 days.' },
    ],
  };

  const testimonials = categoryTestimonials[category?.id || ''] || [];
  const faqs = categoryFAQs[category?.id || ''] || [];

  // Filter and sorting logic
  useEffect(() => {
    let filtered = [...products];

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => product.brand && selectedBrands.includes(product.brand));
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return selectedPriceRanges.some(rangeLabel => {
          const range = priceRanges.find(r => r.label === rangeLabel);
          return range && product.price >= range.min && product.price <= range.max;
        });
      });
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'brand':
          aValue = (a.brand || '').toLowerCase();
          bValue = (b.brand || '').toLowerCase();
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedBrands, selectedPriceRanges, searchQuery, sortBy, sortOrder]);

  // Product comparison functions
  const addToCompare = (product: WebstoreProduct) => {
    if (compareProducts.length < 3 && !compareProducts.find(p => p.id === product.id)) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareProducts([]);
  };

  // Filter functions
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const togglePriceRange = (rangeLabel: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(rangeLabel)
        ? prev.filter(r => r !== rangeLabel)
        : [...prev, rangeLabel]
    );
  };

  useEffect(() => {
    if (!category && slug) {
      try {
        recordEvent({ type: 'category_not_found', slug, route: `/webstore/category/${slug}`, ts: new Date().toISOString() }).catch(() => {});
      } catch {}
    }
  }, [category, slug]);

  if (!category) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <button
              onClick={() => navigate('/webstore')}
              className="text-blue-600 hover:underline"
            >
              Back to Webstore
            </button>
          </div>
        </div>
      );
    }

  return (
    <>
      <SEOHead
        title={`${category.name} - Soho Connect Webstore`}
        description={category.description}
        keywords={`${category.name.toLowerCase()}, ${category.slug}, harare, zimbabwe`}
        canonical={`https://sohoconnect.co.zw/webstore/${category.slug}`}
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        {/* Category Hero */}
        <CategoryHero
          tagline={category.tagline}
          slides={category.heroImages}
          onCTAClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Enhanced Product Grid with Filters */}
        <section id="products" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#4169e1] rounded-full animate-pulse" />
                <span className="text-sm tracking-[0.3em] uppercase text-stone-600">
                  {category?.tagline}
                </span>
                <div className="w-2 h-2 bg-[#4169e1] rounded-full animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                {category?.name} Products
              </h2>
              <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                {category?.description}
              </p>
            </div>

            {/* Compare Bar */}
            {compareProducts.length > 0 && (
              <div className="mb-6 bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <GitCompare className="w-5 h-5" />
                  <span className="font-medium">Compare ({compareProducts.length}/3)</span>
                  <div className="flex gap-2">
                    {compareProducts.map(product => (
                      <div key={product.id} className="flex items-center gap-2 bg-white rounded px-3 py-1">
                        <span className="text-sm">{product.name}</span>
                        <button onClick={() => removeFromCompare(product.id)} className="text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Compare Now</Button>
                    </DialogTrigger>
                  <DialogContent className="max-w-4xl" aria-describedby="compare-description">
                      <DialogHeader>
                        <DialogTitle>Product Comparison</DialogTitle>
                      </DialogHeader>
                      <p id="compare-description" className="sr-only">Comparison of selected products across key features and pricing.</p>
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="font-semibold">Feature</div>
                        {compareProducts.map(product => (
                          <div key={product.id} className="font-semibold">{product.name}</div>
                        ))}
                        <div className="font-medium">Price</div>
                        {compareProducts.map(product => (
                          <div>${product.price}</div>
                        ))}
                        <div className="font-medium">Features</div>
                        {compareProducts.map(product => (
                          <div className="text-sm">{product.description.substring(0, 100)}...</div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={clearCompare}>Clear</Button>
                </div>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:w-1/4 space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </h3>

                    {/* Brand Filter */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Brand</h4>
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2 mb-1">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Price Range</h4>
                      {priceRanges.map(range => (
                        <label key={range.label} className="flex items-center space-x-2 mb-1">
                          <input
                            type="checkbox"
                            checked={selectedPriceRanges.includes(range.label)}
                            onChange={() => togglePriceRange(range.label)}
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </aside>

              {/* Products Grid/List */}
              <main className="lg:w-3/4">
                {/* Search and Controls */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                    {/* Sort Controls */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="brand">Brand</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="flex items-center gap-2"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                      {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                    </Button>

                    {/* View Mode Toggle */}
                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

                {/* Products Display */}
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredProducts.map(product => (
                    <div key={product.id} className="relative">
                      <WebstoreProductCard
                        product={product}
                        onViewDetails={() => navigate(`/webstore/product/${product.slug}`)}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => addToCompare(product)}
                        disabled={compareProducts.find(p => p.id === product.id) !== undefined}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No products found matching your criteria.</p>
                  </div>
                )}
              </main>
            </div>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No products available in this category yet.</p>
              <button
                onClick={() => navigate('/contact')}
                className="mt-4 text-blue-600 hover:underline"
              >
                Contact us for custom solutions
              </button>
            </div>
          )}
        </section>

        {/* Popular Products Horizontal Scroll */}
        {products.length > 3 && (
          <section className="py-16 px-6 bg-white">
            <HorizontalScroll
              title={`Popular in ${category.name}`}
              subtitle="Our most requested products and packages"
            >
              {products.slice(0, 5).map((product) => (
                <WebstoreProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => navigate(`/webstore/product/${product.slug}`)}
                  compact
                />
              ))}
            </HorizontalScroll>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <FAQSection
            faqs={faqs}
            title={`FAQs about ${category.name}`}
          />
        )}

        {/* Quote CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4169e1] to-[#3557c4] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Interested in {category.name}?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Fill in your details and we'll help you choose the perfect solution.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 bg-white text-[#4169e1] font-bold px-10 py-5 rounded-full hover:bg-stone-100 transition-all duration-300 hover:scale-105 shadow-2xl text-lg"
            >
              Request a Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default WebstoreCategory;
