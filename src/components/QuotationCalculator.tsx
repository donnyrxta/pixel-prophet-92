import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";

/**
 * Interactive quotation calculator for printing services
 * Provides real-time cost estimation with bulk discounts
 */
const QuotationCalculator = ({ onClose }: { onClose: () => void }) => {
  // Form state management
  const [formData, setFormData] = useState({
    serviceType: "business-cards",
    quantity: 100,
    size: "standard",
    material: "standard",
    name: "",
    email: "",
    phone: ""
  });

  // Pricing structure (in USD)
  const pricing = {
    "business-cards": { base: 0.25, name: "Business Cards" },
    "flyers": { base: 0.50, name: "Flyers" },
    "brochures": { base: 1.20, name: "Brochures" },
    "posters": { base: 3.50, name: "Posters" },
    "banners": { base: 15.00, name: "Banners" }
  };

  const materialMultiplier = {
    "standard": 1.0,
    "premium": 1.5,
    "glossy": 1.3,
    "matte": 1.2,
    "vinyl": 2.0
  };

  const sizeMultiplier = {
    "standard": 1.0,
    "a6": 0.8,
    "a5": 1.2,
    "a4": 1.5,
    "custom": 2.0
  };

  // Calculate total with bulk discounts
  const calculateTotal = () => {
    const basePrice = pricing[formData.serviceType as keyof typeof pricing].base;
    const material = materialMultiplier[formData.material as keyof typeof materialMultiplier];
    const size = sizeMultiplier[formData.size as keyof typeof sizeMultiplier];
    
    let subtotal = basePrice * formData.quantity * material * size;
    
    // Bulk discount tiers
    if (formData.quantity >= 1000) subtotal *= 0.8; // 20% off
    else if (formData.quantity >= 500) subtotal *= 0.85; // 15% off
    else if (formData.quantity >= 250) subtotal *= 0.9; // 10% off
    
    return subtotal.toFixed(2);
  };

  // Handle quantity increment/decrement
  const adjustQuantity = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  // Submit quote request via WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Quote Request:\n
Service: ${pricing[formData.serviceType as keyof typeof pricing].name}
Quantity: ${formData.quantity}
Size: ${formData.size}
Material: ${formData.material}
Estimated Total: $${calculateTotal()}

Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}`;
    
    const whatsappUrl = `https://wa.me/263714570414?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">Get Instant Quote</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Close calculator"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Service Type
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            >
              {Object.entries(pricing).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => adjustQuantity(-10)}
                className="w-12 h-12 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                min="1"
              />
              <button
                type="button"
                onClick={() => adjustQuantity(10)}
                className="w-12 h-12 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.quantity >= 250 && (
              <p className="text-sm text-accent mt-2">
                🎉 Bulk discount applied: {formData.quantity >= 1000 ? "20%" : formData.quantity >= 500 ? "15%" : "10%"} off
              </p>
            )}
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Size
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {["standard", "a6", "a5", "a4", "custom"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFormData({ ...formData, size })}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    formData.size === size
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Material
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {["standard", "premium", "glossy", "matte", "vinyl"].map((material) => (
                <button
                  key={material}
                  type="button"
                  onClick={() => setFormData({ ...formData, material })}
                  className={`px-4 py-3 rounded-lg font-semibold capitalize transition-all ${
                    formData.material === material
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Total */}
          <div className="bg-muted rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Estimated Total</p>
            <p className="text-4xl font-bold text-accent">${calculateTotal()}</p>
            <p className="text-xs text-muted-foreground mt-2">Final price may vary based on specifications</p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Details</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all"
          >
            Send Quote via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuotationCalculator;
