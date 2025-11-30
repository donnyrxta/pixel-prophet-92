import { useComparison } from '@/context/ComparisonContext';
import { Button } from '@/components/ui/button';
import { X, ArrowRightLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { webstoreProducts } from '@/data/webstore-products';

export const CompareFloatingBar = () => {
  const { selectedProducts, removeFromCompare, clearCompare } = useComparison();
  const navigate = useNavigate();
  const location = useLocation();

  if (selectedProducts.length === 0 || location.pathname === '/compare') return null;

  const products = webstoreProducts.filter(p => selectedProducts.includes(p.id));

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-1/2 md:transform md:-translate-x-1/2 z-40 w-full md:w-[95%] md:max-w-3xl bg-white dark:bg-stone-900 md:rounded-xl rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-2xl border-t md:border border-stone-200 dark:border-stone-800 p-3 md:p-4 animate-in slide-in-from-bottom-10 fade-in duration-300 pr-24 md:pr-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <span className="font-semibold text-xs md:text-sm whitespace-nowrap mr-1 md:mr-2">
            Compare ({products.length}):
          </span>
          
          <div className="flex items-center gap-3">
            {products.map(product => (
              <div key={product.id} className="relative group flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-12 h-12 rounded-md object-cover border border-stone-200"
                />
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  aria-label="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCompare}
            className="flex text-red-600 px-2 md:px-4"
          >
            <span className="hidden md:inline">Clear</span>
            <span className="md:hidden text-xs">Clear</span>
          </Button>
          <Button 
            onClick={() => navigate('/compare')}
            className="bg-[#4169e1] hover:bg-[#3151b5] text-white gap-1 md:gap-2 shadow-lg shadow-blue-500/20 h-9 md:h-10 text-xs md:text-sm px-3 md:px-4"
          >
            <span className="hidden md:inline">Compare Now</span>
            <span className="md:hidden">Compare</span>
            <ArrowRightLeft className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
