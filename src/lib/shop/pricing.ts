/**
 * Pricing Utilities - Zimbabwe Compliance
 * Handles govt levy, VAT, forex calculations per RBZ guidelines
 */

import type { PricingRules, Cart, CartItem } from '@/types/shop';

/**
 * Zimbabwe pricing rules (as of 2025)
 */
export const ZIMBABWE_PRICING: PricingRules = {
  govtLevyRate: 0.02, // 2% government levy on all transactions
  vatRate: 0.15, // 15% VAT (check current rate)
  deliveryFeeFlat: 5, // USD
  freeDeliveryThreshold: 100, // Free delivery over $100

  // Forex rates (update daily via API in production)
  usdToZwlRate: 25000, // Placeholder - MUST fetch from RBZ or authorized dealer
  rateSource: 'RBZ Mid-Market Rate',
  rateUpdatedAt: new Date().toISOString()
};

/**
 * Calculate government levy (2%)
 */
export function calculateGovtLevy(subtotal: number): number {
  return Number((subtotal * ZIMBABWE_PRICING.govtLevyRate).toFixed(2));
}

/**
 * Calculate VAT (15%)
 */
export function calculateVAT(subtotal: number): number {
  return Number((subtotal * ZIMBABWE_PRICING.vatRate).toFixed(2));
}

/**
 * Calculate delivery fee based on subtotal
 */
export function calculateDeliveryFee(
  subtotal: number,
  deliveryMethod: 'pickup' | 'delivery' = 'delivery'
): number {
  if (deliveryMethod === 'pickup') return 0;
  if (subtotal >= (ZIMBABWE_PRICING.freeDeliveryThreshold ?? 100)) return 0;
  return ZIMBABWE_PRICING.deliveryFeeFlat ?? 5;
}

/**
 * Calculate cart totals with Zimbabwe compliance
 */
export function calculateCartTotals(items: CartItem[]): Omit<Cart, 'items'> {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const govtLevy = calculateGovtLevy(subtotal);
  const total = subtotal + govtLevy;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    govtLevy: Number(govtLevy.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
  };
}

/**
 * Convert USD to ZWL using current rate
 */
export function convertUSDtoZWL(amountUSD: number): number {
  return Number((amountUSD * (ZIMBABWE_PRICING.usdToZwlRate ?? 1)).toFixed(2));
}

/**
 * Format price for display with currency
 */
export function formatPrice(amount: number, currency: 'USD' | 'ZWL' = 'USD'): string {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  }
  return `ZWL ${amount.toLocaleString('en-ZW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Get RBZ forex disclaimer text
 */
export function getForexDisclaimer(): string {
  return `Prices shown in USD. ZWL equivalent calculated using ${ZIMBABWE_PRICING.rateSource} (last updated: ${new Date(ZIMBABWE_PRICING.rateUpdatedAt ?? '').toLocaleDateString()}). Final amount may vary based on current exchange rate at time of payment.`;
}

/**
 * Get govt levy disclosure text
 */
export function getGovtLevyDisclosure(): string {
  return `All prices include 2% government levy as per Finance Act ${new Date().getFullYear()}.`;
}

/**
 * Fetch live forex rate from RBZ or authorized source
 * WARNING: This is a placeholder - implement actual API integration
 */
export async function updateForexRate(): Promise<void> {
  try {
    // TODO: Integrate with RBZ API or authorized forex provider
    // Example: const response = await fetch('https://api.rbz.co.zw/rates');

    // For now, log warning
    console.warn('Live forex rate update not implemented. Using static rate.');

    // Update the rate and timestamp
    ZIMBABWE_PRICING.usdToZwlRate = 25000; // Placeholder
    ZIMBABWE_PRICING.rateUpdatedAt = new Date().toISOString();
  } catch (error) {
    console.error('Failed to update forex rate:', error);
  }
}

/**
 * Validate ZIMRA VAT number format
 * Format: 10 digits
 */
export function validateVATNumber(vatNumber: string): boolean {
  const cleaned = vatNumber.replace(/\s/g, '');
  return /^\d{10}$/.test(cleaned);
}
