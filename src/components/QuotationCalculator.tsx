import React, { useState, useEffect } from 'react';
import { 
  Calculator, X, CheckCircle, AlertCircle, 
  Clock, Zap, ArrowRight, MessageCircle, Phone
} from 'lucide-react';
import { trackFormSubmit, trackQuoteCalculator, trackWhatsAppClick } from '@/lib/gtm';

interface QuotationCalculatorProps {
  onClose: () => void;
  preselectedService?: string;
  trigger?: 'button' | 'ai' | 'exit_intent' | 'time_based';
  onComplete?: (data: Partial<LeadData>) => void;
}

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  maxPrice: number;
  turnaround: string;
  icon: string;
  popular?: boolean;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  authority: string;
  timeline: string;
  services: string[];
  additionalNotes: string;
  pageViews: number;
  timeOnSite: number;
  trigger: string;
  leadScore: number;
  leadTier: 'hot' | 'warm' | 'cold';
}

const QuotationCalculator: React.FC<QuotationCalculatorProps> = ({ 
  onClose, 
  preselectedService,
  trigger = 'button',
  onComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [calculatedQuote, setCalculatedQuote] = useState<number>(0);
  const [roiMultiplier, setRoiMultiplier] = useState<number>(0);

  const [formData, setFormData] = useState<Partial<LeadData>>({
    services: preselectedService ? [preselectedService] : [],
    pageViews: 1,
    timeOnSite: 0,
    trigger: trigger
  });

  const services: ServiceOption[] = [
    { id: 'business-cards', name: 'Business Cards', category: 'Printing', basePrice: 50, maxPrice: 200, turnaround: '2-3 days', icon: '💼', popular: true },
    { id: 'flyers-brochures', name: 'Flyers & Brochures', category: 'Printing', basePrice: 100, maxPrice: 500, turnaround: '3-5 days', icon: '📄' },
    { id: 'banners-posters', name: 'Banners & Posters', category: 'Printing', basePrice: 150, maxPrice: 800, turnaround: '3-5 days', icon: '🎯' },
    { id: 'packaging', name: 'Custom Packaging', category: 'Printing', basePrice: 300, maxPrice: 2000, turnaround: '1-2 weeks', icon: '📦' },
    { id: 'logo-design', name: 'Logo Design', category: 'Branding', basePrice: 200, maxPrice: 1000, turnaround: '5-7 days', icon: '🎨', popular: true },
    { id: 'brand-guidelines', name: 'Brand Guidelines', category: 'Branding', basePrice: 500, maxPrice: 2500, turnaround: '1-2 weeks', icon: '📋' },
    { id: 'visual-identity', name: 'Complete Visual Identity', category: 'Branding', basePrice: 1000, maxPrice: 5000, turnaround: '2-4 weeks', icon: '✨' },
    { id: 'social-media', name: 'Social Media Graphics', category: 'Digital', basePrice: 150, maxPrice: 600, turnaround: '3-5 days', icon: '📱', popular: true },
    { id: 'email-campaigns', name: 'Email Campaign Design', category: 'Digital', basePrice: 200, maxPrice: 800, turnaround: '5-7 days', icon: '📧' },
    { id: 'digital-ads', name: 'Digital Ad Creatives', category: 'Digital', basePrice: 250, maxPrice: 1000, turnaround: '3-5 days', icon: '🎬' },
    { id: 'shop-signage', name: 'Shop Signage', category: 'Signage', basePrice: 500, maxPrice: 3000, turnaround: '1-2 weeks', icon: '🏪' },
    { id: 'vehicle-branding', name: 'Vehicle Branding', category: 'Signage', basePrice: 800, maxPrice: 4000, turnaround: '1-2 weeks', icon: '🚗' },
    { id: 'exhibition-stands', name: 'Exhibition Stands', category: 'Signage', basePrice: 1000, maxPrice: 5000, turnaround: '2-3 weeks', icon: '🎪' },
    { id: 'website-design', name: 'Website Design', category: 'Web', basePrice: 800, maxPrice: 5000, turnaround: '2-4 weeks', icon: '💻' },
    { id: 'landing-page', name: 'Landing Page', category: 'Web', basePrice: 300, maxPrice: 1500, turnaround: '1 week', icon: '🌐' }
  ];

  const budgetRanges = [
    { value: 'under-500', label: 'Under $500', points: 3 },
    { value: '500-1000', label: '$500 - $1,000', points: 5 },
    { value: '1000-2500', label: '$1,000 - $2,500', points: 7 },
    { value: '2500-5000', label: '$2,500 - $5,000', points: 9 },
    { value: 'over-5000', label: 'Over $5,000', points: 10 }
  ];

  const authorityLevels = [
    { value: 'decision-maker', label: 'Business Owner / Decision Maker', points: 10 },
    { value: 'influencer', label: 'Manager / Influencer', points: 7 },
    { value: 'researcher', label: 'Employee / Researcher', points: 3 }
  ];

  const timelines = [
    { value: 'urgent', label: 'Urgent (Within 1 week)', points: 10 },
    { value: 'soon', label: 'Soon (1-2 weeks)', points: 8 },
    { value: 'month', label: 'Within a month', points: 5 },
    { value: 'planning', label: 'Just planning ahead', points: 2 }
  ];

  useEffect(() => {
    if (formData.services && formData.services.length > 0) {
      const selectedServices = services.filter(s => formData.services?.includes(s.id));
      const total = selectedServices.reduce((sum, s) => sum + s.basePrice, 0);
      const discount = formData.services.length >= 3 ? 0.85 : formData.services.length >= 2 ? 0.90 : 1;
      const finalQuote = total * discount;
      setCalculatedQuote(finalQuote);
      setRoiMultiplier(Math.floor(finalQuote * (3 + Math.random() * 2)));
    }
  }, [formData.services]);

  const calculateLeadScore = (): number => {
    let score = 0;
    const budgetOption = budgetRanges.find(b => b.value === formData.budget);
    score += budgetOption?.points || 0;
    const authorityOption = authorityLevels.find(a => a.value === formData.authority);
    score += authorityOption?.points || 0;
    const timelineOption = timelines.find(t => t.value === formData.timeline);
    score += timelineOption?.points || 0;
    if (calculatedQuote > 2500) score += 10;
    else if (calculatedQuote > 1000) score += 7;
    else if (calculatedQuote > 500) score += 5;
    else score += 3;
    const pageViews = formData.pageViews || 1;
    const timeOnSite = formData.timeOnSite || 0;
    if (pageViews >= 5) score += 5;
    else if (pageViews >= 3) score += 3;
    else score += 1;
    if (timeOnSite > 300) score += 5;
    else if (timeOnSite > 120) score += 3;
    else score += 1;
    if (trigger === 'button') score += 8;
    else if (trigger === 'ai') score += 6;
    else score += 4;
    return Math.min(score, 100);
  };

  const getLeadTier = (score: number): 'hot' | 'warm' | 'cold' => {
    if (score >= 70) return 'hot';
    if (score >= 40) return 'warm';
    return 'cold';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const leadScore = calculateLeadScore();
      const leadTier = getLeadTier(leadScore);
      const fullLeadData = {
        ...formData,
        leadScore,
        leadTier,
        timestamp: new Date().toISOString(),
        estimatedValue: calculatedQuote
      };
      trackQuoteCalculator('completed', fullLeadData);
      trackFormSubmit('quote_calculator', fullLeadData);
      setShowSuccess(true);
      // Notify consumer with collected form data
      try {
        onComplete?.(formData);
      } catch (e) {
        console.error('onComplete handler error:', e);
      }
      if (leadTier === 'hot') {
        setTimeout(() => {
          const message = encodeURIComponent(
            `Hi Soho Connect! I just requested a quote for ${formData.services?.length} service(s). My estimated project value is $${calculatedQuote}. Can we discuss this urgently?`
          );
          window.open(`https://wa.me/263714570414?text=${message}`, '_blank');
          trackWhatsAppClick('quote_calculator_hot_lead', message);
        }, 3000);
      }
    } catch (error) {
      console.error('Quote submission error:', error);
      alert('Sorry, there was an error. Please contact us directly at +263 71 457 0414');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setFormData(prev => ({ ...prev, timeOnSite: timeSpent }));
    };
  }, []);

  if (showSuccess) {
    const leadScore = calculateLeadScore();
    const leadTier = getLeadTier(leadScore);
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 md:p-8 my-4 animate-slideUp max-h-[95vh] overflow-y-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Received! 🎉</h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
              <div className="text-sm text-gray-600 mb-2">Your Estimated Investment</div>
              <div className="text-5xl font-bold text-primary mb-2">${calculatedQuote.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mb-4">
                Potential ROI: <span className="font-bold text-primary">${roiMultiplier.toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {formData.services?.map(serviceId => {
                  const service = services.find(s => s.id === serviceId);
                  return (
                    <span key={serviceId} className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {service?.icon} {service?.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className={`p-4 rounded-lg border-2 ${
                leadTier === 'hot' ? 'bg-blue-100 border-brand' :
                leadTier === 'warm' ? 'bg-blue-50 border-blue-300' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="font-semibold text-gray-900 mb-2">
                  {leadTier === 'hot' && '🔥 Priority Processing'}
                  {leadTier === 'warm' && '⚡ Fast-Track Review'}
                  {leadTier === 'cold' && '✅ Standard Processing'}
                </div>
                <p className="text-sm text-gray-700">
                  {leadTier === 'hot' && 'We\'ll contact you within the next 2 hours via WhatsApp and email!'}
                  {leadTier === 'warm' && 'Expect a detailed quote within 24 hours.'}
                  {leadTier === 'cold' && 'We\'ll send your quote within 48 hours.'}
                </p>
              </div>
              <div className="text-sm text-gray-600">
                ✅ Quote sent to: <strong>{formData.email}</strong><br />
                ✅ Copy sent to your WhatsApp: <strong>{formData.phone}</strong>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/263714570414?text=${encodeURIComponent(`Hi! I just submitted quote #${Date.now()} for ${formData.services?.length} services. Can we discuss?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-brand text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+263714570414"
                className="flex-1 btn-brand text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline min-h-[44px]"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full my-4 sm:my-8 animate-slideUp max-h-[95vh] overflow-y-auto">
        <div className="bg-brand-cta text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-2xl font-bold truncate">Get Your Instant Quote</h2>
                <p className="text-white/80 text-xs sm:text-sm hidden sm:block">Transparent pricing • No hidden fees • Same-day response</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0 ml-2"
              aria-label="Close calculator"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex-1 flex items-center">
                <div className={`w-full flex items-center ${num < 4 ? 'mr-1 sm:mr-2' : ''}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                    step >= num ? 'bg-white text-primary' : 'bg-white/30 text-white'
                  }`}>{num}</div>
                  {num < 4 && <div className={`flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 rounded ${step > num ? 'bg-white' : 'bg-white/30'}`} />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">What services do you need?</h3>
                <p className="text-gray-600">Select all that apply. We offer package discounts!</p>
              </div>
              {['Printing', 'Branding', 'Digital', 'Signage', 'Web'].map(category => {
                const categoryServices = services.filter(s => s.category === category);
                return (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />{category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryServices.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              services: prev.services?.includes(service.id)
                                ? prev.services.filter(s => s !== service.id)
                                : [...(prev.services || []), service.id]
                            }));
                          }}
                          className={`relative p-4 border-2 rounded-lg text-left transition-all ${
                            formData.services?.includes(service.id) ? 'selection-brand' : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          {service.popular && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-bold">Popular</span>
                          )}
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{service.icon}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 mb-1">{service.name}</div>
                              <div className="text-sm text-gray-600 mb-2">${service.basePrice} - ${service.maxPrice}</div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />{service.turnaround}
                              </div>
                            </div>
                            {formData.services?.includes(service.id) && <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              {calculatedQuote > 0 && (
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Estimated Investment</div>
                      <div className="text-3xl font-bold text-primary">${calculatedQuote.toLocaleString()}</div>
                      {formData.services && formData.services.length >= 2 && (
                        <div className="text-xs text-primary font-semibold mt-1">✨ Package discount applied!</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Potential ROI</div>
                      <div className="text-2xl font-bold text-primary">${roiMultiplier.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">3-5x average return</div>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => setStep(2)}
                disabled={!formData.services || formData.services.length === 0}
                className="w-full btn-brand py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue to Budget <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Let's understand your needs</h3>
                <p className="text-gray-600">This helps us provide the most accurate quote</p>
              </div>
              <div>
                <label className="block font-semibold text-gray-900 mb-3">What's your estimated budget? *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {budgetRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => setFormData(prev => ({ ...prev, budget: range.value }))}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.budget === range.value ? 'selection-brand' : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-900">{range.label}</div>
                        {formData.budget === range.value && <CheckCircle className="w-5 h-5 text-primary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-900 mb-3">What's your role? *</label>
                <div className="space-y-3">
                  {authorityLevels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => setFormData(prev => ({ ...prev, authority: level.value }))}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        formData.authority === level.value ? 'selection-brand' : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-900">{level.label}</div>
                        {formData.authority === level.value && <CheckCircle className="w-5 h-5 text-primary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-900 mb-3">When do you need this? *</label>
                <div className="space-y-3">
                  {timelines.map(timeline => (
                    <button
                      key={timeline.value}
                      onClick={() => setFormData(prev => ({ ...prev, timeline: timeline.value }))}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        formData.timeline === timeline.value ? 'selection-brand' : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{timeline.label}</div>
                          {timeline.value === 'urgent' && <div className="text-xs text-primary mt-1">🔥 Rush orders may incur additional fees</div>}
                        </div>
                        {formData.timeline === timeline.value && <CheckCircle className="w-5 h-5 text-primary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.budget || !formData.authority || !formData.timeline}
                  className="flex-1 btn-brand text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue to Contact Info <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Where should we send your quote?</h3>
                <p className="text-gray-600">We'll respond within 2-24 hours depending on urgency</p>
              </div>
              {formData.timeline === 'urgent' && (
                <div className="bg-blue-50 border-2 border-brand rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary mb-1">🔥 Only 3 urgent slots available this week</div>
                    <div className="text-sm text-primary">Complete this form to secure priority processing</div>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-900 mb-2">Full Name *</label>
                  <input type="text" value={formData.name || ''} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="John Moyo" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-ring transition" required />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2">Email Address *</label>
                  <input type="email" value={formData.email || ''} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="john@business.co.zw" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-ring transition" required />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2">Phone / WhatsApp *</label>
                  <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="+263 77 123 4567" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-ring transition" required />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2">Company / Business Name (Optional)</label>
                  <input type="text" value={formData.company || ''} onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))} placeholder="Your Business Name" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-ring transition" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="flex-1 btn-brand text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue to Review <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Review your quote request</h3>
                <p className="text-gray-600">Make sure everything looks correct</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Your Investment</div>
                    <div className="text-4xl font-bold text-primary">${calculatedQuote.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Expected ROI</div>
                    <div className="text-3xl font-bold text-primary">${roiMultiplier.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.services?.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return (
                      <span key={serviceId} className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                        {service?.icon} {service?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-900">{formData.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{formData.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-900">{formData.phone}</span>
                </div>
                {formData.company && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-semibold text-gray-900">{formData.company}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-semibold text-gray-900">{timelines.find(t => t.value === formData.timeline)?.label}</span>
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-900 mb-2">Any additional details? (Optional)</label>
                <textarea
                  value={formData.additionalNotes || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="Tell us more about your project, specific requirements, or questions..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-ring transition"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <strong>What happens next:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>✅ Instant confirmation to your email & WhatsApp</li>
                      <li>✅ Detailed quote within 2-24 hours</li>
                      <li>✅ Free consultation call to discuss your needs</li>
                      <li>✅ No obligation • No pressure • No hidden fees</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 btn-brand text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Quote <Zap className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationCalculator;
