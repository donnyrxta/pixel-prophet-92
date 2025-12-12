/**
 * Smart Quote Calculator - Premium 4-Screen Flow
 * Optimized for Zimbabwe Market (Harare)
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowRight, ArrowLeft, CheckCircle,
  Sparkles, MessageCircle, Mail, Phone,
  Bot, List, User, Building2, ChevronDown, Check, Download,
  // Business type icons
  Utensils, Building, TreeDeciduous, Pickaxe, ShoppingBag, Scissors, Dumbbell, Mic, HelpCircle,
  type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useBrevoLead } from '@/hooks/useBrevoLead';
import { AIConversationPanel } from './AIConversationPanel';
import { GlassSummaryPanel } from './GlassSummaryPanel';
import { SocialProofBadge } from '@/components/ui/SocialProofBadge';
import { ExitIntentModal } from '@/components/modals/ExitIntentModal';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import {
  SERVICE_CATALOG,
  SERVICE_CATEGORIES,
  BUSINESS_TYPES,
  FOOTFALL_PRESETS,
  calculateQuoteEstimate,
  calculateLeadScore,
  getLeadTier,
  getResponseTime,
  type ServiceCategory,
  type BusinessType
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
  // Screen 1: Segment
  businessType: string;
  customBusinessType?: string;

  // Screen 2: Configure
  footfall: number;
  category: ServiceCategory | '';
  services: string[];

  // Screen 3: Contact
  name: string;
  email: string; // Required for B2B
  phone: string; // WhatsApp
  company: string;
  additionalNotes: string;
}

type Step = 'segment' | 'configure' | 'quote' | 'confirm';

const BUSINESS_ICON_MAP: Record<string, LucideIcon> = {
  Utensils,
  Building,
  TreeDeciduous,
  Pickaxe,
  ShoppingBag,
  Scissors,
  Dumbbell,
  Mic,
  Building2,
  HelpCircle,
};

// ============== Main Component ==============

const SmartQuoteCalculator: React.FC<SmartQuoteCalculatorProps> = ({
  isOpen,
  onClose,
  preselectedCategory,
  preselectedService,
  trigger = 'button',
  onComplete,
}) => {
  const [step, setStep] = useState<Step>('segment');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  // Animation direction state
  const [direction, setDirection] = useState(0);

  // Auto-enable AI mode if triggered by AI
  useEffect(() => {
    if (trigger === 'ai') setAiMode(true);
  }, [trigger]);

  const [formData, setFormData] = useState<FormData>(() => {
    // Determine initial state based on props
    let initialCategory = preselectedCategory || '';
    if (!initialCategory && preselectedService) {
      const service = SERVICE_CATALOG.find(s => s.id === preselectedService);
      if (service) initialCategory = service.category;
    }

    return {
      businessType: '',
      footfall: 125, // Default medium
      category: initialCategory,
      services: preselectedService ? [preselectedService] : [],
      name: '',
      email: '',
      phone: '',
      company: '',
      additionalNotes: '',
    };
  });

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  // Handle Business Type Selection (Screen 1 -> Screen 2)
  const handleBusinessTypeSelect = (typeId: string) => {
    const business = BUSINESS_TYPES.find(b => b.id === typeId);

    // Auto-select recommended modules
    let newServices = [...formData.services];
    if (business && business.recommendedModules) {
      // Only add if not already present
      business.recommendedModules.forEach(modId => {
        if (!newServices.includes(modId)) newServices.push(modId);
      });
    }

    // Default category to first primaryCategory of business type
    let newCategory = formData.category;
    if (!newCategory && business?.primaryCategories?.length) {
      newCategory = business.primaryCategories[0];
    }

    updateFormData({
      businessType: typeId,
      services: newServices,
      category: newCategory
    });

    // Delayed auto-advance for better UX
    setTimeout(() => {
      handleNext();
    }, 400); // 400ms delay to see selection state
  };

  const handleAIRecommendation = useCallback((serviceId: string) => {
    const service = SERVICE_CATALOG.find(s => s.id === serviceId);
    if (!service) return;

    setFormData(prev => {
      const services = prev.services.includes(serviceId) ? prev.services : [...prev.services, serviceId];
      return {
        ...prev,
        category: service.category,
        services
      };
    });

    setStep('configure');
    setAiMode(false);
  }, []);

  const handleNext = () => {
    const steps: Step[] = ['segment', 'configure', 'quote', 'confirm'];
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) {
      setDirection(1);
      setStep(steps[idx + 1]);
      trackQuoteCalculator('step_complete', { step, formData });
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['segment', 'configure', 'quote', 'confirm'];
    const idx = steps.indexOf(step);
    if (idx > 0) {
      setDirection(-1);
      setStep(steps[idx - 1]);
    }
  };

  const { toast } = useToast();
  const { captureLead } = useBrevoLead();
  const quoteEstimate = calculateQuoteEstimate(formData.services);

  const handleSubmit = async (method: 'whatsapp' | 'email') => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Phone).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const leadScore = calculateLeadScore({
        quoteValue: quoteEstimate.total,
        trigger,
      });
      const leadTier = getLeadTier(leadScore);

      // Capture in Brevo
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await captureLead({
        email: formData.email,
        firstName,
        lastName,
        phone: formData.phone,
        company: formData.company,
        message: formData.additionalNotes,
        services: formData.services,
        budget: quoteEstimate.total.toString(),
        timeline: 'soon', // Default
        sourceForm: 'smart_quote_calculator',
        bantScore: leadScore,
        leadTier,
      });

      trackFormSubmit('smart_quote_calculator', {
        ...formData,
        method,
        leadScore,
        leadTier,
        estimatedValue: quoteEstimate.total,
      });

      // Handle WhatsApp Redirect
      if (method === 'whatsapp') {
        const message = encodeURIComponent(
          `Hi Soho Connect! I'd like to discuss my quote for ${formData.services.length} services (Est: $${quoteEstimate.total}).\n\nRef: ${formData.company || formData.name}`
        );
        window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${message}`, '_blank');
      }

      setDirection(1);
      setStep('confirm');

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

  // Helper to get Business Label
  const getBusinessLabel = () => {
    return BUSINESS_TYPES.find(b => b.id === formData.businessType)?.label || 'Business';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Exit Intent Modal */}
      <ExitIntentModal />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-background sm:rounded-2xl shadow-2xl w-full max-w-5xl h-[100dvh] sm:h-[85vh] flex flex-col sm:flex-row">

        {/* Left Side: Summary Panel (Desktop Only) - Shows on Configure & Quote steps */}
        <div className={`hidden lg:flex w-80 bg-slate-900 border-r border-border/50 relative flex-shrink-0 transition-all duration-500
            ${(step === 'configure' || step === 'quote') ? 'translate-x-0' : '-translate-x-full absolute'}
        `}>
          {(step === 'configure' || step === 'quote') && (
            <div className="p-6 w-full h-full flex flex-col">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <List className="w-4 h-4 text-primary" />
                Quote Summary
              </h3>
              <GlassSummaryPanel
                selectedServices={formData.services}
                className="flex-1 shadow-none border-none bg-slate-800/50"
              />
              <div className="mt-4">
                <SocialProofBadge businessType={formData.businessType} />
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col bg-background relative transition-all duration-500`}>

          {/* Header */}
          <div className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step !== 'segment' && step !== 'confirm' && (
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div>
                  <h2 className="font-semibold text-lg leading-tight">
                    {step === 'segment' && "Get your quote"}
                    {step === 'configure' && "Configure solution"}
                    {step === 'quote' && "Review estimate"}
                    {step === 'confirm' && "Quote sent"}
                  </h2>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block font-medium mt-1">
                    {step === 'segment' && "Step 1 of 4 • Business Type"}
                    {step === 'configure' && "Step 2 of 4 • Configuration"}
                    {step === 'quote' && "Step 3 of 4 • Contact Details"}
                    {step === 'confirm' && "Step 4 of 4 • Confirmed"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 h-9 px-4 rounded-full border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all
                    ${aiMode ? 'bg-primary/10 text-primary border-primary/20' : 'text-muted-foreground'}
                  `}
                  onClick={() => setAiMode(!aiMode)}
                >
                  {aiMode ? <List className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  <span className="text-xs font-medium tracking-wide">{aiMode ? 'Standard Mode' : 'Ask AI'}</span>
                </Button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground"
                  aria-label="Close calculator"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-muted">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{
                  width: step === 'segment' ? '33%' :
                    step === 'configure' ? '66%' :
                      step === 'quote' ? '90%' : '100%'
                }}
              />
            </div>

            {/* Step Progress Dots (Mobile) */}
            <div className="flex justify-center gap-1.5 absolute bottom-0 left-0 w-full pb-1 sm:hidden z-20">
              {['segment', 'configure', 'quote', 'confirm'].map((s, i) => {
                const stepIndex = ['segment', 'configure', 'quote', 'confirm'].indexOf(step);
                return (
                  <div
                    key={s}
                    className={`h-1 rounded-full transition-all duration-300 ${i === stepIndex ? 'bg-primary w-8' :
                        i < stepIndex ? 'bg-primary/40 w-1.5' : 'bg-muted w-1.5'
                      }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-24 sm:pb-8 sm:p-8 bg-slate-50/50 dark:bg-black/20">
            {aiMode ? (
              <AIConversationPanel
                onServiceRecommendation={handleAIRecommendation}
                className="h-full border-none shadow-none max-w-2xl mx-auto"
              />
            ) : (
              <div className="max-w-2xl mx-auto min-h-full">
                <AnimatePresence mode="wait" custom={direction}>
                  {/* Screen 1: Segment */}
                  {step === 'segment' && (
                    <motion.div
                      key="segment"
                      custom={direction}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2 mb-8">
                        <h3 className="text-2xl font-bold tracking-tight">Get your personalized SohoConnect quote</h3>
                        <p className="text-muted-foreground">Answer three quick questions to receive a tailored recommendation. No signup required.</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {BUSINESS_TYPES.map((b) => {
                          const IconComponent = BUSINESS_ICON_MAP[b.icon] || Building2;
                          return (
                            <button
                              key={b.id}
                              onClick={() => handleBusinessTypeSelect(b.id)}
                              className={`
                                relative p-4 rounded-xl border-2 text-left transition-all duration-200 group
                                hover:border-primary/50 hover:shadow-lg
                                ${formData.businessType === b.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card'}
                              `}
                            >
                              <div className="mb-3 text-muted-foreground group-hover:text-primary transition-colors">
                                <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                              </div>
                              <div className="font-semibold text-sm leading-tight tracking-tight text-foreground/90">{b.label}</div>
                              {formData.businessType === b.id && (
                                <div className="absolute top-2 right-2 text-primary">
                                  <CheckCircle className="w-4 h-4" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Screen 2: Configure */}
                  {step === 'configure' && (
                    <motion.div
                      key="configure"
                      custom={direction}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Daily footfall</h3>
                        <p className="text-sm text-muted-foreground mb-4">Select the range that best matches your typical daily visitors.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {FOOTFALL_PRESETS.map((preset) => (
                            <button
                              key={preset.id}
                              onClick={() => updateFormData({ footfall: preset.value })}
                              className={`
                                                        p-3 rounded-lg border text-sm font-medium transition-all
                                                        ${formData.footfall === preset.value
                                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                  : 'bg-card hover:border-primary/50 text-muted-foreground'}
                                                    `}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Select your services</h3>
                        <p className="text-sm text-muted-foreground mb-4">Browse by category or select from our recommendations.</p>

                        {/* Category Tabs */}
                        {(() => {
                          const selectedBusiness = BUSINESS_TYPES.find(b => b.id === formData.businessType);
                          const categories = selectedBusiness?.primaryCategories || SERVICE_CATEGORIES;
                          return (
                            <ScrollIndicator className="mb-4 -mx-1 px-1">
                              <div className="flex gap-2 pb-3">
                                {categories.map((cat) => (
                                  <button
                                    key={cat}
                                    onClick={() => updateFormData({ category: cat })}
                                    className={`
                                      px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                                      ${formData.category === cat
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'}
                                    `}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                            </ScrollIndicator>
                          );
                        })()}

                        <div className="space-y-3">
                          {SERVICE_CATALOG.filter(s =>
                            // Show services from current category OR recommended for business type
                            s.category === formData.category ||
                            BUSINESS_TYPES.find(b => b.id === formData.businessType)?.recommendedModules.includes(s.id)
                          ).map((service) => {
                            const isSelected = formData.services.includes(service.id);
                            return (
                              <div
                                key={service.id}
                                onClick={() => {
                                  const newServices = isSelected
                                    ? formData.services.filter(id => id !== service.id)
                                    : [...formData.services, service.id];
                                  updateFormData({ services: newServices });
                                }}
                                className={`
                                  flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                                  ${isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30'}
                                `}
                              >
                                <div className={`
                                  w-5 h-5 rounded border mr-4 flex items-center justify-center transition-colors
                                  ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}
                                `}>
                                  {isSelected && <Check className="w-3.5 h-3.5" />}
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium">{service.name}</span>
                                  {service.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                                  )}
                                </div>
                                <div className="text-sm font-semibold">
                                  ${service.basePrice}+
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile Summary Panel (Collapsible) */}
                      <div className="lg:hidden mt-8">
                        <GlassSummaryPanel selectedServices={formData.services} />
                      </div>

                      <Button onClick={handleNext} className="w-full py-6 text-lg shadow-lg">
                        View My Quote <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Screen 3: Quote & Contact */}
                  {step === 'quote' && (
                    <motion.div
                      key="quote"
                      custom={direction}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm text-center lg:hidden">
                        <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-1">Projected ROI</div>
                        <div className="text-3xl font-bold text-primary mb-1">${quoteEstimate.roiEstimate.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Potential monthly value</div>
                      </div>

                      <div className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-sm">
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-2">Your personalized quote is ready</h3>
                          <p className="text-sm text-muted-foreground">
                            This recommendation is based on your business profile. Where should we send the detailed breakdown?
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>Full Name *</Label>
                              <div className="relative mt-1.5">
                                <User className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="John Doe"
                                  className="pl-9"
                                  value={formData.name}
                                  onChange={e => updateFormData({ name: e.target.value })}
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Company Name</Label>
                              <div className="relative mt-1.5">
                                <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="Soho Hotel"
                                  className="pl-9"
                                  value={formData.company}
                                  onChange={e => updateFormData({ company: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>Email (Required for Proposal) *</Label>
                              <div className="relative mt-1.5">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="john@example.com"
                                  type="email"
                                  className="pl-9"
                                  value={formData.email}
                                  onChange={e => updateFormData({ email: e.target.value })}
                                />
                              </div>
                            </div>
                            <div>
                              <Label>WhatsApp Number *</Label>
                              <div className="relative mt-1.5">
                                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="+263 7..."
                                  className="pl-9"
                                  value={formData.phone}
                                  onChange={e => updateFormData({ phone: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label>Additional Notes (Optional)</Label>
                            <Textarea
                              placeholder="Any specific requirements?"
                              className="mt-1.5"
                              value={formData.additionalNotes}
                              onChange={e => updateFormData({ additionalNotes: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-3">
                          <Button
                            onClick={() => handleSubmit('whatsapp')}
                            className="w-full py-6 text-lg bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Sending...' : (
                              <span className="flex items-center gap-2">
                                <MessageCircle className="w-5 h-5" />
                                Send to WhatsApp
                              </span>
                            )}
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => handleSubmit('email')}
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            Email me this quote
                          </Button>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="flex justify-center">
                            <SocialProofBadge businessType={formData.businessType} />
                          </div>
                          <div className="text-xs text-center text-muted-foreground space-y-1">
                            <div>Quote valid for 14 days</div>
                            <div>Typical deployment: 7–10 business days</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Screen 4: Confirmation */}
                  {step === 'confirm' && (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center h-full py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-in zoom-in duration-500">
                        <CheckCircle className="w-10 h-10" />
                      </div>

                      <h2 className="text-2xl font-semibold mb-2">Your quote has been sent</h2>
                      <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        You'll receive a detailed breakdown shortly. Our team is available if you'd like help refining your setup.
                      </p>

                      <div className="grid gap-4 w-full max-w-sm">
                        <Button className="w-full gap-2" onClick={onClose}>
                          Book a 10-minute strategy call
                        </Button>

                        <Button className="w-full gap-2" variant="outline" onClick={onClose}>
                          Return to website
                        </Button>

                        <Button
                          variant="ghost"
                          className="w-full gap-2"
                          onClick={() => {
                            if (formData.email) {
                              // Trigger download
                              toast({ description: "Download starting..." });
                            } else {
                              setStep('quote'); // Should not happen given validation
                            }
                          }}
                        >
                          <Download className="w-4 h-4" />
                          Download PDF version
                        </Button>
                      </div>

                      <div className="mt-12 p-4 bg-muted/50 rounded-lg w-full max-w-md">
                        <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">What happens next?</div>
                        <div className="flex items-start gap-3 text-left text-sm">
                          <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">1</div>
                          <div>
                            <div className="font-medium">Review & Strategy</div>
                            <div className="text-muted-foreground text-xs">We analyze your location type and footfall.</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div >
    </div >
  );
};

export default SmartQuoteCalculator;
