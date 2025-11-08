import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Filter } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'smartphones',
    price: 1299,
    currency: 'USD',
    image: '/images/products/iphone-15-pro.jpg',
    description: 'Latest flagship with titanium design and A17 Pro chip',
    inStock: true,
    featured: true
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphones',
    price: 1199,
    currency: 'USD',
    image: '/images/products/samsung-s24.jpg',
    description: 'Premium Android with S Pen and 200MP camera',
    inStock: true,
    featured: true
  },
  {
    id: 'hikvision-4ch',
    name: 'Hikvision 4-Channel CCTV Kit',
    category: 'cctv',
    price: 450,
    currency: 'USD',
    image: '/images/products/hikvision-kit.jpg',
    description: 'Complete 1080p surveillance system with 4 cameras',
    inStock: true
  },
  {
    id: 'dahua-8ch',
    name: 'Dahua 8-Channel CCTV System',
    category: 'cctv',
    price: 850,
    currency: 'USD',
    image: '/images/products/dahua-system.jpg',
    description: 'Professional 4K CCTV with night vision',
    inStock: true
  },
  {
    id: 'anker-powerbank',
    name: 'Anker PowerCore 20000mAh',
    category: 'accessories',
    price: 45,
    currency: 'USD',
    image: '/images/products/anker-powerbank.jpg',
    description: 'High-capacity portable charger with fast charging',
    inStock: true
  },
  {
    id: 'hp-printer',
    name: 'HP LaserJet Pro M404dn',
    category: 'consumables',
    price: 320,
    currency: 'USD',
    image: '/images/products/hp-printer.jpg',
    description: 'Business laser printer with duplex printing',
    inStock: true
  }
];

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'cctv', label: 'CCTV Systems' },
  { value: 'accessories', label: 'Tech Accessories' },
  { value: 'consumables', label: 'Business Consumables' }
];

const Shop = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <>
      <SEOHead
        title="Electronics Shop - Smartphones, CCTV & Tech"
        description="Shop premium smartphones, CCTV systems, tech accessories and business consumables in Harare. Authorized dealer with warranty. Visit our store at 7 Luck Street."
        keywords="electronics harare, smartphones zimbabwe, cctv installation, tech accessories, business electronics, soho connect shop"
        canonical="https://sohoconnect.co.zw/shop"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Banner */}
          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Electronics Division
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Premium smartphones, professional CCTV systems, and quality tech accessories. 
                  Authorized dealer • Warranty included • Expert installation
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    View Cart (0)
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Filters & Search */}
          <section className="border-b bg-card">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full md:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                Showing {sortedProducts.length} of {PRODUCTS.length} products
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/shop/product/${product.id}`)}
                  className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold z-10">
                        Featured
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg';
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      {CATEGORIES.find(c => c.value === product.category)?.label}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          ${product.price}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          + 2% govt levy
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        View Details
                      </Button>
                    </div>

                    {product.inStock ? (
                      <div className="mt-3 text-xs text-green-600 dark:text-green-400">
                        ✓ In Stock
                      </div>
                    ) : (
                      <div className="mt-3 text-xs text-destructive">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </section>

          {/* Trust Signals */}
          <section className="bg-muted/30 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">🚚</div>
                  <h3 className="font-semibold text-foreground mb-2">Free Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Within Harare CBD on orders over $100
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🛡️</div>
                  <h3 className="font-semibold text-foreground mb-2">Warranty Included</h3>
                  <p className="text-sm text-muted-foreground">
                    12-month manufacturer warranty on all devices
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🔧</div>
                  <h3 className="font-semibold text-foreground mb-2">Expert Installation</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional CCTV setup and configuration
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💳</div>
                  <h3 className="font-semibold text-foreground mb-2">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    EcoCash, Visa, Mastercard accepted
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
