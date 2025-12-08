/**
 * Smart Quote Calculator - Unified Adaptive Calculator
 * 
 * Features:
 * - Context-aware questions based on service category
 * - Goal-oriented flow with booking CTA for high-value leads
 * - Mobile-first responsive design (360px+)
 * - BANT scoring integration
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowRight, ArrowLeft, CheckCircle, Clock, 
  Zap, Sparkles, Calendar, MessageCircle, Phone,
  Printer, Palette, Monitor, Image, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useBrevoLead } from '@/hooks/useBrevoLead';
import { 
  SERVICE_CATALOG, 
  SERVICE_CATEGORIES,
  BUDGET_RANGES,
  TIMELINES,
  calculateQuoteEstimate,
  calculateLeadScore,
  getLeadTier,
  getResponseTime,
  type ServiceCategory,
  type ServiceOption
} from '@/data/pricing';
import { trackQuoteCalculator, trackFormSubmit } from '@/lib/gtm';
import { CONTACT_INFO } from '@/lib/constants';

// ============== Types ==============

interface SmartQuoteCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: ServiceCategory;
  preselectedService?: string;
  trigger?: 'button' | 'ai' | 'exit_intent' | 'time_based';
  onComplete?: (data: FormData) => void;
}

interface FormData {
  goal: string;
  category: ServiceCategory | '';
  services: string[];
  // Printing-specific
  printQuantity?: string;
  printMaterial?: string;
  // Branding-specific
  brandScope?: string;
  hasExistingBrand?: string;
  // Digital-specific
  platforms?: string[];
  campaignGoal?: string;
  // Common
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  additionalNotes: string;
}

type Step = 'goal' | 'category' | 'services' | 'details' | 'contact' | 'summary';

// ============== Category Config ==============

const CATEGORY_CONFIG: Record<ServiceCategory, {
  icon: React.ReactNode;
  color: string;
  tagline: string;
  detailQuestions: React.FC<{ formData: FormData; updateFormData: (updates: Partial<FormData>) => void }>;
}> = {
  Printing: {
    icon: <Printer className="w-6 h-6" />,
    color: 'hsl(var(--primary))',
    tagline: 'Fast turnaround, premium quality',
    detailQuestions: PrintingDetails,
  },
  Branding: {
    icon: <Palette className="w-6 h-6" />,
    color: 'hsl(265, 70%, 55%)',
    tagline: 'Build a memorable brand identity',
    detailQuestions: BrandingDetails,
  },
  Digital: {
    icon: <Monitor className="w-6 h-6" />,
    color: 'hsl(200, 80%, 50%)',
    tagline: 'Grow your online presence',
    detailQuestions: DigitalDetails,
  },
  Signage: {
    icon: <Image className="w-6 h-6" />,
    color: 'hsl(30, 80%, 50%)',
    tagline: 'Stand out in the real world',
    detailQuestions: SignageDetails,
  },
  Web: {
    icon: <Globe className="w-6 h-6" />,
    color: 'hsl(160, 70%, 45%)',
    tagline: 'Professional web solutions',
    detailQuestions: WebDetails,
  },
};

const GOALS = [
  { id: 'launch', label: 'Launch Something New', description: 'New business, product, or campaign', icon: '🚀' },
  { id: 'refresh', label: 'Refresh My Brand', description: 'Update or modernize existing materials', icon: '🔄' },
  { id: 'reorder', label: 'Reorder / Stock Up', description: 'Same as before, just more copies', icon: '📦' },
  { id: 'explore', label: 'Just Exploring', description: 'Looking for options and pricing', icon: '🔍' },
];

// ============== Detail Components ==============

function PrintingDetails({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Quantity Needed</Label>
        <RadioGroup
          value={formData.printQuantity || ''}
          onValueChange={(v) => updateFormData({ printQuantity: v })}
          className="grid grid-cols-2 gap-2"
        >
          {['100-250', '250-500', '500-1000', '1000+'].map((qty) => (
            <Label
              key={qty}
              className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all text-sm
                ${formData.printQuantity === qty 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'}`}
            >
              <RadioGroupItem value={qty} className="sr-only" />
              {qty}
            </Label>
          ))}
        </RadioGroup>
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Material Preference</Label>
        <RadioGroup
          value={formData.printMaterial || ''}
          onValueChange={(v) => updateFormData({ printMaterial: v })}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { value: 'standard', label: 'Standard' },
            { value: 'premium', label: 'Premium' },
            { value: 'glossy', label: 'Glossy' },
            { value: 'matte', label: 'Matte' },
          ].map((opt) => (
            <Label
              key={opt.value}
              className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all text-sm
                ${formData.printMaterial === opt.value 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'}`}
            >
              <RadioGroupItem value={opt.value} className="sr-only" />
              {opt.label}
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

function BrandingDetails({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Project Scope</Label>
        <RadioGroup
          value={formData.brandScope || ''}
          onValueChange={(v) => updateFormData({ brandScope: v })}
          className="space-y-2"
        >
          {[
            { value: 'logo-only', label: 'Logo Design Only', desc: 'Just the logo' },
            { value: 'logo-plus', label: 'Logo + Essentials', desc: 'Logo, business cards, letterhead' },
            { value: 'full-identity', label: 'Complete Brand Identity', desc: 'Full visual system with guidelines' },
          ].map((opt) => (
            <Label
              key={opt.value}
              className={`flex flex-col p-3 border-2 rounded-lg cursor-pointer transition-all
                ${formData.brandScope === opt.value 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'}`}
            >
              <RadioGroupItem value={opt.value} className="sr-only" />
              <span className="font-medium text-foreground">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.desc}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Do you have existing branding?</Label>
        <RadioGroup
          value={formData.hasExistingBrand || ''}
          onValueChange={(v) => updateFormData({ hasExistingBrand: v })}
          className="grid grid-cols-2 gap-2"
        >
          <Label
            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all
              ${formData.hasExistingBrand === 'yes' 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border hover:border-primary/50'}`}
          >
            <RadioGroupItem value="yes" className="sr-only" />
            Yes, need refresh
          </Label>
          <Label
            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all
              ${formData.hasExistingBrand === 'no' 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border hover:border-primary/50'}`}
          >
            <RadioGroupItem value="no" className="sr-only" />
            Starting fresh
          </Label>
        </RadioGroup>
      </div>
    </div>
  );
}

function DigitalDetails({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  const platforms = ['Facebook', 'Instagram', 'LinkedIn', 'Google Ads', 'TikTok'];
  
  const togglePlatform = (platform: string) => {
    const current = formData.platforms || [];
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform];
    updateFormData({ platforms: updated });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Target Platforms</Label>
        <div className="grid grid-cols-2 gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => togglePlatform(platform)}
              className={`p-3 border-2 rounded-lg text-sm transition-all
                ${formData.platforms?.includes(platform) 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'}`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Campaign Goal</Label>
        <RadioGroup
          value={formData.campaignGoal || ''}
          onValueChange={(v) => updateFormData({ campaignGoal: v })}
          className="grid grid-cols-1 gap-2"
        >
          {[
            { value: 'awareness', label: 'Brand Awareness' },
            { value: 'leads', label: 'Lead Generation' },
            { value: 'sales', label: 'Sales & Conversions' },
          ].map((opt) => (
            <Label
              key={opt.value}
              className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all
                ${formData.campaignGoal === opt.value 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'}`}
            >
              <RadioGroupItem value={opt.value} className="sr-only" />
              {opt.label}
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

function SignageDetails({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Installation Location</Label>
        <RadioGroup
          value={formData.printMaterial || ''}
          onValueChange={(v) => updateFormData({ printMaterial: v })}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { value: 'indoor', label: 'Indoor' },
            { value: 'outdoor', label: 'Outdoor' },
            { value: 'vehicle', label: 'Vehicle' },
            { value: 'event', label: 'Event/Portable' },
          ].map((opt) => (
            <Label
              key={opt.value}
              className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all text-sm
                ${formData.printMaterial === opt.value 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'}`}
            >
              <RadioGroupItem value={opt.value} className="sr-only" />
              {opt.label}
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

function WebDetails({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Website Type</Label>
        <RadioGroup
          value={formData.brandScope || ''}
          onValueChange={(v) => updateFormData({ brandScope: v })}
          className="space-y-2"
        >
          {[
            { value: 'landing', label: 'Landing Page', desc: 'Single page for campaigns' },
            { value: 'business', label: 'Business Website', desc: '5-10 pages, contact forms' },
            { value: 'ecommerce', label: 'E-commerce', desc: 'Online store with payments' },
          ].map((opt) => (
            <Label
              key={opt.value}
              className={`flex flex-col p-3 border-2 rounded-lg cursor-pointer transition-all
                ${formData.brandScope === opt.value 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'}`}
            >
              <RadioGroupItem value={opt.value} className="sr-only" />
              <span className="font-medium text-foreground">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.desc}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

// ============== Main Component ==============

const SmartQuoteCalculator: React.FC<SmartQuoteCalculatorProps> = ({
  isOpen,
  onClose,
  preselectedCategory,
  preselectedService,
  trigger = 'button',
  onComplete,
}) => {
  const [step, setStep] = useState<Step>('goal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    goal: '',
    category: preselectedCategory || '',
    services: preselectedService ? [preselectedService] : [],
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    additionalNotes: '',
  });

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  // Calculate quote estimate
  const quoteEstimate = calculateQuoteEstimate(formData.services);

  // Determine step order based on flow
  const getSteps = (): Step[] => {
    if (formData.goal === 'reorder') {
      // Fast path for reorders
      return ['goal', 'category', 'services', 'contact', 'summary'];
    }
    return ['goal', 'category', 'services', 'details', 'contact', 'summary'];
  };

  const steps = getSteps();
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1]);
      trackQuoteCalculator('step_complete', { step, formData });
    }
  };

  const prevStep = () => {
    const idx = steps.indexOf(step);
    if (idx > 0) {
      setStep(steps[idx - 1]);
    }
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 'goal': return !!formData.goal;
      case 'category': return !!formData.category;
      case 'services': return formData.services.length > 0;
      case 'details': return true; // Optional details
      case 'contact': return !!(formData.name && formData.email && formData.phone);
      default: return true;
    }
  };

  const { toast } = useToast();
  const { captureLead } = useBrevoLead();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const leadScore = calculateLeadScore({
        budget: formData.budget,
        timeline: formData.timeline,
        quoteValue: quoteEstimate.total,
        trigger,
      });
      const leadTier = getLeadTier(leadScore);

      // Capture lead in Brevo CRM
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const brevoResult = await captureLead({
        email: formData.email,
        firstName,
        lastName,
        phone: formData.phone,
        company: formData.company,
        message: formData.additionalNotes,
        services: formData.services,
        budget: formData.budget,
        timeline: formData.timeline,
        sourceForm: 'smart_quote_calculator',
        bantScore: leadScore,
        leadTier,
      });

      if (!brevoResult.success) {
        console.error('Brevo capture failed:', brevoResult.error);
        // Show toast but don't block success - we still want to show the quote
        toast({
          title: "Note",
          description: "Quote saved. We'll reach out soon!",
          variant: "default",
        });
      }

      trackFormSubmit('smart_quote_calculator', {
        ...formData,
        leadScore,
        leadTier,
        estimatedValue: quoteEstimate.total,
      });

      setShowSuccess(true);
      onComplete?.(formData);

      // Hot lead auto-WhatsApp after delay
      if (leadTier === 'hot') {
        setTimeout(() => {
          const message = encodeURIComponent(
            `Hi Soho Connect! I just requested a quote for ${formData.services.length} service(s). Estimated value: $${quoteEstimate.total}.`
          );
          window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${message}`, '_blank');
        }, 2000);
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Success Screen
  if (showSuccess) {
    const leadScore = calculateLeadScore({
      budget: formData.budget,
      timeline: formData.timeline,
      quoteValue: quoteEstimate.total,
      trigger,
    });
    const leadTier = getLeadTier(leadScore);
    const responseTime = getResponseTime(leadTier);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 text-center"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">Quote Request Sent!</h2>
          
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="text-3xl font-bold text-primary">${quoteEstimate.total.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Estimated Investment</div>
          </div>

          <p className="text-muted-foreground mb-4">
            We'll contact you within <strong className="text-foreground">{responseTime}</strong>
          </p>

          <div className="flex flex-col gap-2">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <Button variant="outline" onClick={onClose}>
              Continue Browsing
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Get services for selected category
  const categoryServices = formData.category 
    ? SERVICE_CATALOG.filter(s => s.category === formData.category)
    : [];

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg my-4 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Get Your Quote</span>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-right">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {/* Goal Step */}
            {step === 'goal' && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">What's your goal?</h3>
                  <p className="text-sm text-muted-foreground">This helps us tailor your quote</p>
                </div>
                
                <div className="space-y-2">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => updateFormData({ goal: goal.id })}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all
                        ${formData.goal === goal.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <div>
                          <div className="font-medium text-foreground">{goal.label}</div>
                          <div className="text-sm text-muted-foreground">{goal.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Category Step */}
            {step === 'category' && (
              <motion.div
                key="category"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">What do you need?</h3>
                  <p className="text-sm text-muted-foreground">Select a service category</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_CATEGORIES.map((category) => {
                    const config = CATEGORY_CONFIG[category];
                    return (
                      <button
                        key={category}
                        onClick={() => updateFormData({ category, services: [] })}
                        className={`p-4 border-2 rounded-xl text-center transition-all
                          ${formData.category === category 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'}`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {config.icon}
                          </div>
                          <div className="font-medium text-foreground text-sm">{category}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Services Step */}
            {step === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Select {formData.category} Services
                  </h3>
                  <p className="text-sm text-muted-foreground">Choose one or more</p>
                </div>
                
                <div className="space-y-2">
                  {categoryServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`w-full p-3 border-2 rounded-lg text-left transition-all
                        ${formData.services.includes(service.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{service.icon}</span>
                          <div>
                            <div className="font-medium text-foreground text-sm">{service.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ${service.basePrice} - ${service.maxPrice}
                            </div>
                          </div>
                        </div>
                        {service.popular && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {formData.services.length > 0 && (
                  <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formData.services.length} service(s) selected
                    </span>
                    <span className="font-semibold text-primary">
                      ~${quoteEstimate.total.toLocaleString()}
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Details Step - Category Specific */}
            {step === 'details' && formData.category && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">A few more details</h3>
                  <p className="text-sm text-muted-foreground">Help us provide an accurate quote</p>
                </div>
                
                {React.createElement(CATEGORY_CONFIG[formData.category].detailQuestions, {
                  formData,
                  updateFormData,
                })}

                <div className="pt-2">
                  <Label className="text-sm font-medium text-foreground mb-2 block">Timeline</Label>
                  <RadioGroup
                    value={formData.timeline}
                    onValueChange={(v) => updateFormData({ timeline: v })}
                    className="grid grid-cols-2 gap-2"
                  >
                    {TIMELINES.map((t) => (
                      <Label
                        key={t.value}
                        className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all text-xs
                          ${formData.timeline === t.value 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-border hover:border-primary/50'}`}
                      >
                        <RadioGroupItem value={t.value} className="sr-only" />
                        {t.label}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </motion.div>
            )}

            {/* Contact Step */}
            {step === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Your Contact Details</h3>
                  <p className="text-sm text-muted-foreground">We'll send your quote here</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-sm">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData({ name: e.target.value })}
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      placeholder="john@company.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">WhatsApp Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData({ phone: e.target.value })}
                      placeholder="+263 71 234 5678"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-sm">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => updateFormData({ company: e.target.value })}
                      placeholder="Your Company"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-sm">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.additionalNotes}
                      onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
                      placeholder="Any specific requirements..."
                      className="mt-1 min-h-[80px]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Summary Step */}
            {step === 'summary' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Review Your Quote</h3>
                  <p className="text-sm text-muted-foreground">Make sure everything looks right</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">{formData.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Services</span>
                    <span className="font-medium text-foreground">{formData.services.length} selected</span>
                  </div>
                  {formData.timeline && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Timeline</span>
                      <span className="font-medium text-foreground">
                        {TIMELINES.find(t => t.value === formData.timeline)?.label}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="font-semibold text-foreground">Estimated Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${quoteEstimate.total.toLocaleString()}
                    </span>
                  </div>
                  {quoteEstimate.discountPercent > 0 && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Zap className="w-4 h-4" />
                      {quoteEstimate.discountPercent}% package discount applied!
                    </div>
                  )}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">
                    We typically respond within <strong>2 hours</strong> during business hours
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex gap-2">
            {currentStepIndex > 0 && (
              <Button variant="outline" onClick={prevStep} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            
            {step === 'summary' ? (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button 
                onClick={nextStep} 
                disabled={!canProceed()}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SmartQuoteCalculator;
