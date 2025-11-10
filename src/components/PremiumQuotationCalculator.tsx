import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';
import { trackFormSubmit, trackQuoteCalculator } from '@/lib/gtm';

interface Service {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  maxPrice: number;
  turnaround: string;
  description: string;
}

interface PremiumQuotationCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const PremiumQuotationCalculator: React.FC<PremiumQuotationCalculatorProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [selectedServices, setSelectedServices] = useState<string[]>(preselectedService ? [preselectedService] : []);
  const [budget, setBudget] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');
  const [authority, setAuthority] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  
  const [estimatedQuote, setEstimatedQuote] = useState(0);
  const [roiEstimate, setRoiEstimate] = useState(0);

  const services: Service[] = [
    // Branding
    { id: 'logo-design', name: 'Logo Design', category: 'Branding', basePrice: 200, maxPrice: 1000, turnaround: '5-7 days', description: 'Professional logo that defines your brand' },
    { id: 'brand-identity', name: 'Brand Identity', category: 'Branding', basePrice: 1000, maxPrice: 5000, turnaround: '2-4 weeks', description: 'Complete visual system with guidelines' },
    { id: 'brand-guidelines', name: 'Brand Guidelines', category: 'Branding', basePrice: 500, maxPrice: 2500, turnaround: '1-2 weeks', description: 'Comprehensive brand standards document' },
    
    // Print
    { id: 'business-cards', name: 'Business Cards', category: 'Print', basePrice: 50, maxPrice: 200, turnaround: '2-3 days', description: 'Premium cards for lasting impressions' },
    { id: 'brochures', name: 'Brochures & Flyers', category: 'Print', basePrice: 100, maxPrice: 500, turnaround: '3-5 days', description: 'Print materials that communicate clearly' },
    { id: 'banners', name: 'Banners & Posters', category: 'Print', basePrice: 150, maxPrice: 800, turnaround: '3-5 days', description: 'Large format printing for visibility' },
    { id: 'packaging', name: 'Custom Packaging', category: 'Print', basePrice: 300, maxPrice: 2000, turnaround: '1-2 weeks', description: 'Packaging that stands out on shelves' },
    
    // Signage
    { id: 'shop-signage', name: 'Shop Signage', category: 'Signage', basePrice: 500, maxPrice: 3000, turnaround: '1-2 weeks', description: 'Professional storefront displays' },
    { id: 'vehicle-branding', name: 'Vehicle Branding', category: 'Signage', basePrice: 800, maxPrice: 4000, turnaround: '1-2 weeks', description: 'Mobile marketing for your fleet' },
    { id: 'exhibition-stands', name: 'Exhibition Stands', category: 'Signage', basePrice: 1000, maxPrice: 5000, turnaround: '2-3 weeks', description: 'Trade show displays that attract' },
    
    // Digital
    { id: 'social-media', name: 'Social Media Design', category: 'Digital', basePrice: 150, maxPrice: 600, turnaround: '3-5 days', description: 'Content that stops the scroll' },
    { id: 'website', name: 'Website Design', category: 'Digital', basePrice: 800, maxPrice: 5000, turnaround: '2-4 weeks', description: 'Digital experiences that convert' },
    { id: 'email-campaigns', name: 'Email Campaign Design', category: 'Digital', basePrice: 200, maxPrice: 800, turnaround: '5-7 days', description: 'Email templates that engage' },
  ];

  const budgetRanges = [
    { value: 'under-500', label: 'Under $500', min: 0, max: 500 },
    { value: '500-1500', label: '$500 - $1,500', min: 500, max: 1500 },
    { value: '1500-3000', label: '$1,500 - $3,000', min: 1500, max: 3000 },
    { value: '3000-5000', label: '$3,000 - $5,000', min: 3000, max: 5000 },
    { value: 'over-5000', label: '$5,000+', min: 5000, max: 10000 }
  ];

  const timelines = [
    { value: 'urgent', label: 'Urgent', sublabel: 'Within 1 week' },
    { value: 'soon', label: 'Soon', sublabel: '1-2 weeks' },
    { value: 'month', label: 'This Month', sublabel: '2-4 weeks' },
    { value: 'flexible', label: 'Flexible', sublabel: 'No rush' }
  ];

  const authorityLevels = [
    { value: 'decision-maker', label: 'Business Owner / Decision Maker' },
    { value: 'manager', label: 'Manager / Team Lead' },
    { value: 'employee', label: 'Employee / Staff Member' }
  ];

  // Calculate quote based on selected services
  useEffect(() => {
    if (selectedServices.length > 0) {
      const selected = services.filter(s => selectedServices.includes(s.id));
      const total = selected.reduce((sum, s) => sum + s.basePrice, 0);
      
      // Apply package discount
      const discount = selectedServices.length >= 3 ? 0.85 : selectedServices.length >= 2 ? 0.90 : 1;
      const finalQuote = total * discount;
      
      setEstimatedQuote(finalQuote);
      setRoiEstimate(Math.floor(finalQuote * (3 + Math.random() * 2)));
    }
  }, [selectedServices]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const leadData = {
        services: selectedServices,
        budget,
        timeline,
        authority,
        contact: { name, email, phone, company },
        notes,
        estimatedValue: estimatedQuote,
        timestamp: new Date().toISOString()
      };

      // Track in GTM
      trackQuoteCalculator('completed', leadData);
      trackFormSubmit('quote_request', leadData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Quote submission error:', error);
      alert('There was an error submitting your request. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  if (!isOpen) return null;

  // Success screen
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 md:p-12 animate-scale-in">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-stone-900 mb-4">
              Quote Request Received
            </h2>

            <div className="bg-stone-50 rounded-lg p-6 mb-6">
              <div className="text-sm text-stone-600 mb-2">Estimated Investment</div>
              <div className="text-5xl font-light text-stone-900 mb-2">
                ${estimatedQuote.toLocaleString()}
              </div>
              <div className="text-sm text-stone-600 mb-4">
                Potential ROI: <span className="font-medium text-primary">${roiEstimate.toLocaleString()}</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {selectedServices.map(serviceId => {
                  const service = services.find(s => s.id === serviceId);
                  return (
                    <span key={serviceId} className="bg-white px-3 py-1 rounded-full text-xs text-stone-700 border border-stone-200">
                      {service?.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-left">
              <div className="text-sm text-stone-700">
                <strong className="text-stone-900">What happens next:</strong>
                <ul className="mt-2 space-y-1 text-stone-600">
                  <li>Instant confirmation to your email and WhatsApp</li>
                  <li>Detailed quote within 24 hours</li>
                  <li>Free consultation call to discuss your needs</li>
                  <li>No obligation, no pressure, no hidden fees</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/263771234567?text=${encodeURIComponent(`Hi! I just submitted a quote request. Can we discuss?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition"
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+263771234567"
                className="flex-1 bg-stone-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-stone-800 transition"
              >
                Call Us Now
              </a>
            </div>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-stone-500 hover:text-stone-700 underline"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl my-4 sm:my-8 animate-scale-in max-h-[95vh] overflow-y-auto">{/* Added max-height and overflow for long content */}
        
          {/* Header */}
          <div className="sticky top-0 bg-stone-900 text-white p-4 sm:p-6 md:p-8 rounded-t-lg z-10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex-1 pr-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight mb-1 sm:mb-2">Request Your Quote</h2>
                <p className="text-stone-300 text-xs sm:text-sm">Transparent pricing · Same-day response · No hidden fees</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex-1 flex items-center">
                  <div className={`w-full flex items-center ${num < 4 ? 'mr-1 sm:mr-2' : ''}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-medium text-xs sm:text-sm ${
                      step >= num ? 'bg-white text-stone-900' : 'bg-white/20 text-white'
                    }`}>
                      {num}
                    </div>
                    {num < 4 && (
                      <div className={`flex-1 h-px mx-1 sm:mx-2 ${
                        step > num ? 'bg-white' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">{/* Added overflow for scrollable content */}
          
          {/* STEP 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-stone-900 mb-2">
                  What services do you need?
                </h3>
                <p className="text-sm sm:text-base text-stone-600">Select all that apply. Package discounts available.</p>
              </div>

              {['Branding', 'Print', 'Signage', 'Digital'].map(category => {
                const categoryServices = services.filter(s => s.category === category);
                return (
                  <div key={category}>
                    <h4 className="font-medium text-stone-900 mb-2 sm:mb-3 text-xs sm:text-sm tracking-wide uppercase">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {categoryServices.map(service => (
                        <button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-3 sm:p-4 border rounded-lg text-left transition-all min-h-[72px] ${
                            selectedServices.includes(service.id)
                              ? 'border-stone-900 bg-stone-50'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm sm:text-base text-stone-900 mb-1 truncate">{service.name}</div>
                              <div className="text-xs sm:text-sm text-stone-600 mb-1 sm:mb-2 line-clamp-2">{service.description}</div>
                              <div className="flex flex-wrap items-center gap-1 sm:gap-3 text-[10px] sm:text-xs text-stone-500">
                                <span className="whitespace-nowrap">${service.basePrice} - ${service.maxPrice}</span>
                                <span className="hidden sm:inline">·</span>
                                <span className="whitespace-nowrap">{service.turnaround}</span>
                              </div>
                            </div>
                            {selectedServices.includes(service.id) && (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-stone-900 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {estimatedQuote > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs sm:text-sm text-stone-600 mb-1">Estimated Investment</div>
                      <div className="text-2xl sm:text-3xl font-light text-stone-900">${estimatedQuote.toLocaleString()}</div>
                      {selectedServices.length >= 2 && (
                        <div className="text-[10px] sm:text-xs text-primary mt-1 font-medium">Package discount applied</div>
                      )}
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs sm:text-sm text-stone-600 mb-1">Potential ROI</div>
                      <div className="text-xl sm:text-2xl font-light text-primary">${roiEstimate.toLocaleString()}</div>
                      <div className="text-[10px] sm:text-xs text-stone-500">3-5x average return</div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={selectedServices.length === 0}
                className="w-full bg-stone-900 text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-stone-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
              >
                Continue to Budget
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: Budget & Timeline */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-stone-900 mb-2">
                  Budget and Timeline
                </h3>
                <p className="text-sm sm:text-base text-stone-600">Help us provide the most accurate quote</p>
              </div>

              <div>
                <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2 sm:mb-3">Budget Range</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {budgetRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => setBudget(range.value)}
                      className={`p-3 sm:p-4 border rounded-lg text-left transition-all min-h-[52px] ${
                        budget === range.value
                          ? 'border-stone-900 bg-stone-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm sm:text-base text-stone-900">{range.label}</div>
                        {budget === range.value && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-stone-900" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2 sm:mb-3">Timeline</label>
                <div className="space-y-2 sm:space-y-3">
                  {timelines.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setTimeline(t.value)}
                      className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-all min-h-[60px] ${
                        timeline === t.value
                          ? 'border-stone-900 bg-stone-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm sm:text-base text-stone-900">{t.label}</div>
                          <div className="text-xs sm:text-sm text-stone-600">{t.sublabel}</div>
                        </div>
                        {timeline === t.value && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-stone-900" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2 sm:mb-3">Your Role</label>
                <div className="space-y-2 sm:space-y-3">
                  {authorityLevels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => setAuthority(level.value)}
                      className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-all min-h-[52px] ${
                        authority === level.value
                          ? 'border-stone-900 bg-stone-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm sm:text-base text-stone-900">{level.label}</div>
                        {authority === level.value && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-stone-900" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-stone-100 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-200 transition min-h-[48px] text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!budget || !timeline || !authority}
                  className="flex-1 bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
                >
                  Continue to Contact Info
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-stone-900 mb-2">
                  Contact Information
                </h3>
                <p className="text-sm sm:text-base text-stone-600">Where should we send your quote?</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Moyo"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 transition min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@business.co.zw"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 transition min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+263 77 123 4567"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 transition min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2">Company / Business Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your Business Name (optional)"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 transition min-h-[44px]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-stone-100 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-200 transition min-h-[48px] text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!name || !email || !phone}
                  className="flex-1 bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
                >
                  Review & Submit
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-stone-900 mb-2">
                  Review Your Request
                </h3>
                <p className="text-sm sm:text-base text-stone-600">Please confirm everything looks correct</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-stone-600 mb-1">Your Investment</div>
                    <div className="text-4xl font-light text-stone-900">${estimatedQuote.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-stone-600 mb-1">Expected ROI</div>
                    <div className="text-3xl font-light text-primary">${roiEstimate.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return (
                      <span key={serviceId} className="bg-white px-3 py-1 rounded-full text-xs text-stone-700 border border-stone-200">
                        {service?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-600">Name:</span>
                  <span className="font-medium text-stone-900">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Email:</span>
                  <span className="font-medium text-stone-900">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Phone:</span>
                  <span className="font-medium text-stone-900">{phone}</span>
                </div>
                {company && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Company:</span>
                    <span className="font-medium text-stone-900">{company}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm sm:text-base text-stone-900 mb-2">Additional Details (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us more about your project..."
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 transition resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-stone-100 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-200 transition min-h-[48px] text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm sm:text-base">Submitting...</span>
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumQuotationCalculator;
