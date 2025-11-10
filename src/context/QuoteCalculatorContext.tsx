import React, { createContext, useContext, useState, ReactNode } from 'react';
import QuotationCalculator from '@/components/QuotationCalculator';

type QuoteFormData = Partial<{
  services: string[];
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  authority: string;
  timeline: string;
  additionalNotes: string;
}>;

type TriggerType = 'button' | 'ai' | 'exit_intent' | 'time_based' | string;

interface OpenOptions {
  preselectedService?: string;
  trigger?: TriggerType;
  onComplete?: (data: QuoteFormData) => void;
}

interface QuoteCalculatorContextValue {
  openCalculator: (options?: OpenOptions) => void;
  closeCalculator: () => void;
}

const QuoteCalculatorContext = createContext<QuoteCalculatorContextValue | null>(null);

export function QuoteCalculatorProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OpenOptions | undefined>(undefined);

  const openCalculator = (opts?: OpenOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const closeCalculator = () => {
    setIsOpen(false);
    setOptions(undefined);
  };

  // Helper to safely map trigger to supported values
  const normalizeTrigger = (t?: TriggerType): 'button' | 'ai' | 'exit_intent' | 'time_based' => {
    if (t === 'ai' || t === 'exit_intent' || t === 'time_based' || t === 'button') return t;
    // For custom triggers like 'whatsapp_interest' or 'contact_form', fall back to 'time_based'
    return 'time_based';
  };

  return (
    <QuoteCalculatorContext.Provider value={{ openCalculator, closeCalculator }}>
      {children}
      {isOpen && (
        <QuotationCalculator
          onClose={closeCalculator}
          preselectedService={options?.preselectedService}
          trigger={normalizeTrigger(options?.trigger)}
          // Note: QuotationCalculator will call onComplete when the user submits
          onComplete={(data) => {
            try {
              options?.onComplete?.(data ?? { services: [] });
            } finally {
              // Do not auto-close; let user choose to continue browsing
            }
          }}
        />
      )}
    </QuoteCalculatorContext.Provider>
  );
}

export function useQuoteCalculator() {
  const ctx = useContext(QuoteCalculatorContext);
  if (!ctx) {
    throw new Error('useQuoteCalculator must be used within QuoteCalculatorProvider');
  }
  return ctx;
}

