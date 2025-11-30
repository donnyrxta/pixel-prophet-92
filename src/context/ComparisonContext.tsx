import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { SPEC_DICTIONARY } from '@/lib/shop/comparison-utils';

interface ComparisonContextType {
  selectedProducts: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  showDifferences: boolean;
  toggleShowDifferences: () => void;
  specDictionary: Record<string, { label: string; category: string }>;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDifferences, setShowDifferences] = useState(false);
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Load from local storage or URL on mount
  useEffect(() => {
    const urlProducts = searchParams.get('products');
    
    if (urlProducts) {
      // URL takes precedence for sharing
      const products = urlProducts.split(',').filter(Boolean);
      // Validate limit (max 4)
      setSelectedProducts(products.slice(0, 4));
    } else {
      // Fallback to local storage
      const saved = localStorage.getItem('comparison_products');
      if (saved) {
        try {
          setSelectedProducts(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse comparison data', e);
        }
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('comparison_products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const addToCompare = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      toast({
        title: "Already added",
        description: "This product is already in your comparison list.",
      });
      return;
    }

    if (selectedProducts.length >= 4) {
      toast({
        title: "Limit reached",
        description: "You can compare up to 4 products at a time.",
        variant: "destructive"
      });
      return;
    }

    setSelectedProducts(prev => [...prev, productId]);
    toast({
      title: "Added to compare",
      description: "Product added to comparison list.",
    });
  };

  const removeFromCompare = (productId: string) => {
    setSelectedProducts(prev => prev.filter(id => id !== productId));
  };

  const clearCompare = () => {
    setSelectedProducts([]);
  };

  const isInCompare = (productId: string) => {
    return selectedProducts.includes(productId);
  };

  const toggleShowDifferences = () => {
    setShowDifferences(prev => !prev);
  };

  return (
    <ComparisonContext.Provider value={{ 
      selectedProducts, 
      addToCompare, 
      removeFromCompare, 
      clearCompare, 
      isInCompare,
      showDifferences,
      toggleShowDifferences,
      specDictionary: SPEC_DICTIONARY
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
