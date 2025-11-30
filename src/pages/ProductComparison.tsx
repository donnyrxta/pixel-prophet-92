import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useComparison } from '@/context/ComparisonContext';
import { webstoreProducts } from '@/data/webstore-products';
import { Header } from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, ShoppingCart, Printer, Trash2, ArrowLeft, Share2, Info, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useWebstoreCart } from '@/context/WebstoreCartContext';
import { useToast } from '@/components/ui/use-toast';
import { trackEvent } from '@/lib/gtm';
import { normalizeProductSpecs, CATEGORY_ORDER, COMPARISON_CATEGORIES } from '@/lib/shop/comparison-utils';

const ProductComparison = () => {
  const { 
    selectedProducts, 
    removeFromCompare, 
    clearCompare, 
    showDifferences, 
    toggleShowDifferences, 
    specDictionary 
  } = useComparison();
  
  const { addToCart } = useWebstoreCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const [productSpecs, setProductSpecs] = useState<Record<string, Record<string, string>>>({});

  const products = useMemo(() => 
    webstoreProducts.filter(p => selectedProducts.includes(p.id)), 
  [selectedProducts]);

  useEffect(() => {
    if (products.length > 0) {
      trackEvent('view_comparison', {
        products: products.map(p => p.name),
        count: products.length
      });
      
      // Normalize specs
      const specs: Record<string, Record<string, string>> = {};
      products.forEach(p => {
        specs[p.id] = normalizeProductSpecs(p);
      });
      setProductSpecs(specs);
    }
  }, [products]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('products', selectedProducts.join(','));
    window.history.replaceState(null, '', url.toString());
    navigator.clipboard.writeText(url.toString());
    toast({
      title: "Link copied",
      description: "Shareable link copied to clipboard",
    });
    trackEvent('share_comparison', { count: products.length });
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    trackEvent('add_to_cart_comparison', { product: product.name });
  };

  // Identify Best Value (lowest price) and Bestseller (highest rating * reviews)
  const bestValueId = useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce((prev, curr) => prev.price < curr.price ? prev : curr).id;
  }, [products]);

  const bestsellerId = useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce((prev, curr) => {
      const prevScore = (prev.reviews?.length || 0) * (prev.reviews?.reduce((a, b) => a + b.rating, 0) || 0);
      const currScore = (curr.reviews?.length || 0) * (curr.reviews?.reduce((a, b) => a + b.rating, 0) || 0);
      return prevScore > currScore ? prev : curr;
    }).id;
  }, [products]);

  const hasDifference = (specKey: string) => {
    if (products.length < 2) return false;
    const firstVal = productSpecs[products[0].id]?.[specKey];
    return products.some(p => productSpecs[p.id]?.[specKey] !== firstVal);
  };

  if (products.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-stone-50 pt-32 px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Compare Products</h1>
          <p className="text-stone-600 mb-8 max-w-md">
            You haven't added any products to compare yet. Browse our store and add products to see them side-by-side.
          </p>
          <Button onClick={() => navigate('/webstore')} className="bg-[#4169e1]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Shop
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Compare Products | Soho Connect" 
        description="Compare features, prices, and specifications of your selected products side-by-side."
      />
      <Header />
      
      <main className="min-h-screen bg-stone-50 pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Controls Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <Link to="/webstore" className="text-sm text-stone-500 hover:text-[#4169e1] flex items-center mb-2">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Shop
              </Link>
              <h1 className="text-3xl font-bold text-stone-900">Product Comparison</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md border border-stone-200 mr-2 touch-target">
                <Switch 
                  id="diff-mode" 
                  checked={showDifferences} 
                  onCheckedChange={toggleShowDifferences}
                />
                <Label htmlFor="diff-mode" className="cursor-pointer text-sm font-medium">
                  Show differences only
                </Label>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 h-10 touch-target">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2 h-10 touch-target hidden md:flex">
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button variant="ghost" size="sm" onClick={clearCompare} className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2 h-10 touch-target">
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200" ref={printRef}>
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full min-w-[600px] md:min-w-[800px] border-collapse table-fixed">
                <colgroup>
                  <col className="w-32 md:w-48" />
                  {products.map(p => <col key={p.id} className={`w-[${100/products.length}%]`} />)}
                </colgroup>
                <thead>
                  <tr>
                    <th className="p-2 md:p-4 text-left bg-stone-50 border-b border-r border-stone-200 sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      <span className="font-bold text-stone-700 text-sm md:text-base">Product</span>
                    </th>
                    {products.map(product => (
                      <th key={product.id} className="p-2 md:p-4 pt-8 border-b border-stone-200 relative group align-top bg-white">
                        {/* Merchandising Badges */}
                        <div className="absolute top-3 left-0 w-full flex justify-center z-20 pointer-events-none">
                          {product.id === bestValueId && (
                            <span className="bg-green-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
                              Best Value
                            </span>
                          )}
                          {product.id === bestsellerId && (
                            <span className="bg-amber-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide ml-1 md:ml-2">
                              Bestseller
                            </span>
                          )}
                        </div>

                        <button 
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute top-2 right-2 text-stone-400 hover:text-red-500 p-2 md:p-1.5 rounded-full hover:bg-stone-100 transition-colors print:hidden z-30 touch-target"
                          title="Remove product"
                          aria-label="Remove product"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex flex-col items-center text-center gap-2 md:gap-3 pt-4">
                          <div className="relative">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-lg shadow-sm border border-stone-100"
                              loading="lazy"
                            />
                            {product.stock <= 0 && (
                              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                                <span className="bg-stone-800 text-white text-[10px] md:text-xs px-1 md:px-2 py-1 rounded font-bold">Out of Stock</span>
                              </div>
                            )}
                          </div>
                          
                          <Link to={`/webstore/product/${product.slug}`} className="font-bold text-xs md:text-base hover:text-[#4169e1] transition-colors line-clamp-2 h-8 md:h-12 flex items-center justify-center">
                            {product.name}
                          </Link>
                          
                          <div className="text-sm md:text-xl font-bold text-[#4169e1]">
                            {product.currency} {product.price.toFixed(2)}
                          </div>

                          {/* Stock / ETA Mock */}
                          <div className="text-[10px] md:text-xs text-stone-500 flex flex-col md:flex-row items-center gap-1">
                            {product.stock > 0 ? (
                              <span className="text-green-600 flex items-center">
                                <Check className="w-3 h-3 mr-1" /> <span className="hidden md:inline">In Stock</span><span className="md:hidden">Stock</span>
                              </span>
                            ) : (
                              <span className="text-red-500 flex items-center">
                                <X className="w-3 h-3 mr-1" /> Out
                              </span>
                            )}
                            <span className="text-stone-300 hidden md:inline">|</span>
                            <span className="hidden md:inline">Ships in 2-3 days</span>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="w-full mt-1 bg-[#4169e1] print:hidden h-8 md:h-9 text-xs md:text-sm"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock <= 0}
                          >
                            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                            {product.stock > 0 ? 'Add' : 'Notify'}
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {CATEGORY_ORDER.map(category => {
                    // Find all keys belonging to this category
                    const categoryKeys = Object.entries(specDictionary)
                      .filter(([_, val]) => val.category === category)
                      .map(([key]) => key);

                    // Filter keys based on "Show Differences"
                    const visibleKeys = showDifferences 
                      ? categoryKeys.filter(key => hasDifference(key))
                      : categoryKeys;

                    if (visibleKeys.length === 0) return null;

                    return (
                      <React.Fragment key={category}>
                        <tr className="bg-stone-100">
                          <th colSpan={products.length + 1} className="p-2 pl-4 text-left font-bold text-stone-800 text-sm uppercase tracking-wider border-y border-stone-200">
                            {category}
                          </th>
                        </tr>
                        {visibleKeys.map(key => {
                          const specInfo = specDictionary[key];
                          const isDiff = hasDifference(key);
                          
                          return (
                            <tr key={key} className={isDiff && showDifferences ? "bg-blue-50/30" : ""}>
                              <th className="p-4 text-left bg-stone-50 border-r border-stone-200 sticky left-0 font-medium text-stone-600 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-sm md:text-base group cursor-help w-48 min-w-[12rem]">
                                <div className="flex items-center justify-between">
                                  {specInfo.label}
                                  {/* Tooltip for jargon - mocking functionality */}
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-3 h-3 text-stone-300 group-hover:text-stone-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">Comparison details for {specInfo.label}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </th>
                              {products.map(product => (
                                <td key={product.id} className={`p-4 text-center text-sm text-stone-700 ${isDiff ? 'font-medium' : ''}`}>
                                  {productSpecs[product.id]?.[key] || '-'}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-amber-400 fill-current' : 'text-stone-300 fill-current'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default ProductComparison;
