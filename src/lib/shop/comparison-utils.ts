
import { WebstoreProduct } from "@/data/webstore-products";

export const COMPARISON_CATEGORIES = {
  OVERVIEW: 'Overview',
  KEY_SPECS: 'Key Specs',
  DIMENSIONS: 'Dimensions/Materials',
  COMPATIBILITY: 'Compatibility',
  WARRANTY: 'Warranty/Returns',
};

// Map of internal spec keys to display labels and categories
// This simulates the "server-side" normalization
export const SPEC_DICTIONARY: Record<string, { label: string; category: string }> = {
  // Overview
  brand: { label: 'Brand', category: COMPARISON_CATEGORIES.OVERVIEW },
  model: { label: 'Model', category: COMPARISON_CATEGORIES.OVERVIEW },
  releaseYear: { label: 'Release Year', category: COMPARISON_CATEGORIES.OVERVIEW },
  
  // Key Specs
  processor: { label: 'Processor', category: COMPARISON_CATEGORIES.KEY_SPECS },
  ram: { label: 'RAM', category: COMPARISON_CATEGORIES.KEY_SPECS },
  storage: { label: 'Storage', category: COMPARISON_CATEGORIES.KEY_SPECS },
  display: { label: 'Display', category: COMPARISON_CATEGORIES.KEY_SPECS },
  battery: { label: 'Battery', category: COMPARISON_CATEGORIES.KEY_SPECS },
  camera: { label: 'Camera', category: COMPARISON_CATEGORIES.KEY_SPECS },
  
  // Dimensions/Materials
  weight: { label: 'Weight', category: COMPARISON_CATEGORIES.DIMENSIONS },
  dimensions: { label: 'Dimensions', category: COMPARISON_CATEGORIES.DIMENSIONS },
  material: { label: 'Material', category: COMPARISON_CATEGORIES.DIMENSIONS },
  color: { label: 'Color', category: COMPARISON_CATEGORIES.DIMENSIONS },
  
  // Compatibility
  os: { label: 'Operating System', category: COMPARISON_CATEGORIES.COMPATIBILITY },
  connectivity: { label: 'Connectivity', category: COMPARISON_CATEGORIES.COMPATIBILITY },
  ports: { label: 'Ports', category: COMPARISON_CATEGORIES.COMPATIBILITY },
  
  // Warranty/Returns
  warranty: { label: 'Warranty', category: COMPARISON_CATEGORIES.WARRANTY },
  returnPolicy: { label: 'Return Policy', category: COMPARISON_CATEGORIES.WARRANTY },
};

export const CATEGORY_ORDER = [
  COMPARISON_CATEGORIES.OVERVIEW,
  COMPARISON_CATEGORIES.KEY_SPECS,
  COMPARISON_CATEGORIES.DIMENSIONS,
  COMPARISON_CATEGORIES.COMPATIBILITY,
  COMPARISON_CATEGORIES.WARRANTY,
];

export const normalizeProductSpecs = (product: WebstoreProduct) => {
  // This function would extract and normalize specs from the product object
  // For now, since the product object doesn't have a 'specs' field, 
  // we'll infer some or use placeholders.
  
  const isElectronics = product.categorySlug === 'ict' || product.categorySlug === 'electronics';
  
  // Mock data generation for demonstration
  const specs: Record<string, string> = {
    // Overview
    brand: product.brand || 'Generic',
    model: product.name,
    releaseYear: '2024',
    
    // Key Specs
    processor: product.description.includes('processor') ? 'Octa-Core High Performance' : 'Standard',
    ram: product.description.match(/(\d+GB)\s*RAM/i)?.[1] || (isElectronics ? '8GB' : 'N/A'),
    storage: product.name.match(/(\d+GB|\d+TB)/)?.[0] || (isElectronics ? '256GB' : 'N/A'),
    display: product.description.match(/(\d+(\.\d+)?)"/)?.[0] ? `${product.description.match(/(\d+(\.\d+)?)"/)?.[0]} Display` : (isElectronics ? '6.1" OLED' : 'N/A'),
    battery: isElectronics ? '5000mAh' : 'N/A',
    camera: isElectronics ? '48MP Main, 12MP Ultra-wide' : 'N/A',
    
    // Dimensions/Materials
    weight: isElectronics ? '180g' : 'N/A',
    dimensions: isElectronics ? '146 x 70 x 7.6 mm' : 'N/A',
    material: 'Aluminum & Glass',
    color: 'Black / Silver / Blue', // In a real app, this would list available variants
    
    // Compatibility
    os: isElectronics ? 'Android 14 / iOS 17' : 'N/A',
    connectivity: isElectronics ? '5G, Wi-Fi 6E, Bluetooth 5.3' : 'N/A',
    ports: isElectronics ? 'USB-C 3.2' : 'N/A',
    
    // Warranty
    warranty: '1 Year Manufacturer Warranty',
    returnPolicy: '30-Day Return Policy',
  };

  return specs;
};
