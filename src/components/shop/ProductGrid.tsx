/**
 * ProductGrid - Product listing with filters and sorting
 * Phase 3: Complete catalog browsing experience
 */

import { useState, useMemo } from 'react';
import { Search, Filter, LayoutGrid, LayoutList } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/shop';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  defaultCategory?: string;
  showCategoryFilter?: boolean;
  showSearch?: boolean;
  showLayoutToggle?: boolean;
  initialLayout?: 'grid' | 'list';
  pageSize?: number;
}

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'cctv', label: 'CCTV Systems' },
  { value: 'accessories', label: 'Tech Accessories' },
  { value: 'consumables', label: 'Business Consumables' }
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' }
];

export function ProductGrid({
  products,
  title,
  subtitle,
  defaultCategory = 'all',
  showCategoryFilter = true,
  showSearch = true,
  showLayoutToggle = true,
  initialLayout = 'grid',
  pageSize = 16
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [layout, setLayout] = useState<'grid' | 'list'>(initialLayout);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        // Featured: show featured first, then by price descending
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.price - a.price;
        });
    }
  }, [filteredProducts, sortBy]);

  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  return (
    <div className="w-full">
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filters & Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          {showSearch && (
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
          )}

          {/* Category Filter & Sort */}
          <div className="flex gap-3 w-full md:w-auto">
            {showCategoryFilter && (
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
            )}

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Layout Toggle */}
            {showLayoutToggle && (
              <div className="hidden md:flex gap-1 border rounded-lg p-1">
                <Button
                  size="sm"
                  variant={layout === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setLayout('grid')}
                  className="px-3"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={layout === 'list' ? 'default' : 'ghost'}
                  onClick={() => setLayout('list')}
                  className="px-3"
                >
                  <LayoutList className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {sortedProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Grid/List */}
      {visibleProducts.length > 0 ? (
        <div className={
          layout === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              layout={layout}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search query
          </p>
          <Button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {visibleCount < sortedProducts.length && (
        <div className="mt-8 text-center">
          <Button onClick={() => setVisibleCount(c => c + pageSize)}>Load More</Button>
        </div>
      )}
    </div>
  );
}
