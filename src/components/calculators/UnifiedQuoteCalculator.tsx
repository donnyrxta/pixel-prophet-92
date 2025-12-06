import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import {
    X, CheckCircle, AlertCircle, Clock, Zap, ArrowRight,
    MessageCircle, Phone, Rocket, RefreshCw, Package, HelpCircle,
    Download, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';
import { trackFormSubmit, trackQuoteCalculator, trackWhatsAppClick } from '@/lib/gtm';
import {
    SERVICE_CATALOG,
    SERVICE_CATEGORIES,
    BUDGET_RANGES,
    AUTHORITY_LEVELS,
    TIMELINES,
    GOAL_OPTIONS,
    calculateQuoteEstimate,
    calculateLeadScore,
    getLeadTier,
    getResponseTime,
    getServiceById,
    getServicesByCategory,
    type ServiceCategory,
    type LeadTier,
} from '@/data/pricing';

// ============== Types ==============

interface UnifiedQuoteCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedService?: string;
    preselectedCategory?: ServiceCategory;
    trigger?: 'button' | 'ai' | 'exit_intent' | 'time_based';
    onComplete?: (data: FormData) => void;
}

interface FormData {
    goal?: string;
    services: string[];
    budget?: string;
    authority?: string;
    timeline?: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    additionalNotes: string;
    pageViews: number;
    timeOnSite: number;
    trigger: string;
}

type Step = 1 | 2 | 3 | 4;

const STORAGE_KEY = 'soho_quote_draft';

// ============== Component ==============

const UnifiedQuoteCalculator: React.FC<UnifiedQuoteCalculatorProps> = ({
    isOpen,
    onClose,
    preselectedService,
    preselectedCategory,
    trigger = 'button',
    onComplete,
}) => {
    const [step, setStep] = useState<Step>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showGuideMe, setShowGuideMe] = useState(false);
    const [guideMeStep, setGuideMeStep] = useState(0);
    const [activeCategory, setActiveCategory] = useState<ServiceCategory>(
        preselectedCategory || 'Printing'
    );
    const hasTriggeredExitIntent = useRef(false);

    const [formData, setFormData] = useState<FormData>(() => {
        // Try to restore from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    return {
                        ...parsed,
                        services: preselectedService
                            ? [...new Set([...parsed.services, preselectedService])]
                            : parsed.services,
                        trigger,
                    };
                } catch {
                    // Ignore parse errors
                }
            }
        }
        return {
            services: preselectedService ? [preselectedService] : [],
            name: '',
            email: '',
            phone: '',
            company: '',
            additionalNotes: '',
            pageViews: 1,
            timeOnSite: 0,
            trigger,
        };
    });

    // Persist form data to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && !showSuccess) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }
    }, [formData, showSuccess]);

    // Track time on site
    useEffect(() => {
        const startTime = Date.now();
        return () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            setFormData(prev => ({ ...prev, timeOnSite: prev.timeOnSite + timeSpent }));
        };
    }, []);

    // Trigger confetti on success
    useEffect(() => {
        if (showSuccess) {
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

            const frame = () => {
                confetti({
                    particleCount: 4,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.8 },
                    colors,
                });
                confetti({
                    particleCount: 4,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.8 },
                    colors,
                });

                if (Date.now() < animationEnd) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [showSuccess]);

    // Exit-intent detection
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger if mouse leaves at top of page and calculator is not open
            if (
                e.clientY <= 0 &&
                !isOpen &&
                !hasTriggeredExitIntent.current &&
                formData.services.length > 0
            ) {
                hasTriggeredExitIntent.current = true;
                // Trigger the calculator to open (handled by parent context)
                trackQuoteCalculator('exit_intent_triggered', { services: formData.services });
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [isOpen, formData.services]);

    // Generate PDF quote
    const generatePDF = useCallback(() => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFillColor(30, 41, 59); // slate-800
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('SOHO CONNECT', 20, 25);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Quote Estimate', pageWidth - 20, 25, { align: 'right' });
        doc.text(new Date().toLocaleDateString(), pageWidth - 20, 32, { align: 'right' });

        // Client info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        let y = 55;
        doc.setFont('helvetica', 'bold');
        doc.text('Prepared For:', 20, y);
        doc.setFont('helvetica', 'normal');
        y += 8;
        doc.text(formData.name || 'N/A', 20, y);
        y += 6;
        doc.text(formData.email || 'N/A', 20, y);
        y += 6;
        doc.text(formData.phone || 'N/A', 20, y);
        if (formData.company) {
            y += 6;
            doc.text(formData.company, 20, y);
        }

        // Services
        y += 15;
        doc.setFont('helvetica', 'bold');
        doc.text('Selected Services:', 20, y);
        doc.setFont('helvetica', 'normal');
        formData.services.forEach(serviceId => {
            const service = getServiceById(serviceId);
            if (service) {
                y += 8;
                doc.text(`• ${service.name} ($${service.basePrice} - $${service.maxPrice})`, 25, y);
            }
        });

        // Quote summary
        y += 20;
        doc.setFillColor(241, 245, 249); // slate-100
        doc.rect(15, y - 5, pageWidth - 30, 35, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Estimated Investment:', 20, y + 8);
        doc.setFontSize(20);
        doc.setTextColor(59, 130, 246); // blue-500
        doc.text(`$${quoteEstimate.total.toLocaleString()}`, pageWidth - 20, y + 8, { align: 'right' });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text('Potential ROI:', 20, y + 22);
        doc.setTextColor(16, 185, 129); // emerald-500
        doc.text(`$${quoteEstimate.roiEstimate.toLocaleString()}`, pageWidth - 20, y + 22, { align: 'right' });

        // Footer
        doc.setTextColor(100, 116, 139); // slate-500
        doc.setFontSize(9);
        doc.text('This is an estimate only. Final pricing may vary based on project scope and requirements.', 20, 270);
        doc.text('Contact us: +263 71 457 0414 | info@sohoconnect.co.zw | 7 Luck Street, Harare CBD', 20, 278);

        doc.save(`SohoConnect-Quote-${Date.now()}.pdf`);
    }, [formData, quoteEstimate]);

    // Guide Me wizard content
    const guideMeSteps = [
        {
            title: "Welcome! 👋",
            content: "I'll guide you through getting your quote. It only takes 60 seconds!",
            tip: "Click 'Next' to continue or 'Skip' if you prefer to explore on your own."
        },
        {
            title: "Step 1: Your Goal",
            content: "First, tell us what you're trying to achieve. Are you launching something new, refreshing your brand, or need ongoing support?",
            tip: "Pick the option that best describes your situation—don't worry, you can always change it!"
        },
        {
            title: "Step 2: Pick Services",
            content: "Browse our service categories and select what you need. The more you add, the bigger your package discount!",
            tip: "Look for the 'Popular' badges for our most requested services."
        },
        {
            title: "Step 3: Contact Info",
            content: "Let us know how to reach you. We respond within 2 hours on average!",
            tip: "WhatsApp is our fastest channel—make sure to add your number."
        },
        {
            title: "You're Ready! 🎉",
            content: "That's all there is to it! Review your quote and submit when ready.",
            tip: "Hot leads get priority processing—the more info you provide, the faster we respond!"
        }
    ];

    // Calculate quote
    const quoteEstimate = calculateQuoteEstimate(formData.services);

    // Handle form submission
    const handleSubmit = useCallback(async () => {
        setIsSubmitting(true);
        try {
            const leadScore = calculateLeadScore({
                budget: formData.budget,
                authority: formData.authority,
                timeline: formData.timeline,
                quoteValue: quoteEstimate.total,
                pageViews: formData.pageViews,
                timeOnSite: formData.timeOnSite,
                trigger: formData.trigger,
            });
            const leadTier = getLeadTier(leadScore);

            const fullLeadData = {
                ...formData,
                leadScore,
                leadTier,
                timestamp: new Date().toISOString(),
                estimatedValue: quoteEstimate.total,
            };

            trackQuoteCalculator('completed', fullLeadData);
            trackFormSubmit('quote_calculator', fullLeadData);

            // Clear saved draft
            localStorage.removeItem(STORAGE_KEY);

            setShowSuccess(true);
            onComplete?.(formData);

            // Hot lead auto-WhatsApp
            if (leadTier === 'hot') {
                setTimeout(() => {
                    const message = encodeURIComponent(
                        `Hi Soho Connect! I just requested a quote for ${formData.services.length} service(s). My estimated project value is $${quoteEstimate.total}. Can we discuss this urgently?`
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
    }, [formData, quoteEstimate, onComplete]);

    // Get icon component for goal
    const getGoalIcon = (iconName: string) => {
        switch (iconName) {
            case '🚀': return <Rocket className="w-8 h-8" />;
            case '🔄': return <RefreshCw className="w-8 h-8" />;
            case '📦': return <Package className="w-8 h-8" />;
            default: return <HelpCircle className="w-8 h-8" />;
        }
    };

    if (!isOpen) return null;

    // ============== Success Screen ==============
    if (showSuccess) {
        const leadScore = calculateLeadScore({
            budget: formData.budget,
            authority: formData.authority,
            timeline: formData.timeline,
            quoteValue: quoteEstimate.total,
            pageViews: formData.pageViews,
            timeOnSite: formData.timeOnSite,
            trigger: formData.trigger,
        });
        const leadTier = getLeadTier(leadScore);
        const responseTime = getResponseTime(leadTier);

        return (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 my-4 overflow-hidden"
                >
                    {/* Ambient glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

                    <div className="relative text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-500/30"
                        >
                            <CheckCircle className="w-12 h-12 text-emerald-400" />
                        </motion.div>

                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
                            Quote Request Received! 🎉
                        </h2>

                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Estimated Investment</div>
                                    <div className="text-4xl font-bold text-white">${quoteEstimate.total.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Potential ROI</div>
                                    <div className="text-3xl font-bold text-emerald-400">${quoteEstimate.roiEstimate.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {formData.services.map(serviceId => {
                                    const service = getServiceById(serviceId);
                                    return (
                                        <span key={serviceId} className="bg-slate-700/50 px-3 py-1 rounded-full text-xs font-medium text-slate-300">
                                            {service?.icon} {service?.name}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg border mb-6 ${leadTier === 'hot' ? 'bg-blue-600/20 border-blue-500/50' :
                            leadTier === 'warm' ? 'bg-amber-500/20 border-amber-500/50' : 'bg-slate-800/50 border-slate-700/50'
                            }`}>
                            <div className="font-semibold text-white mb-1">
                                {leadTier === 'hot' && '🔥 Priority Processing'}
                                {leadTier === 'warm' && '⚡ Fast-Track Review'}
                                {leadTier === 'cold' && '✅ Standard Processing'}
                            </div>
                            <p className="text-sm text-slate-300">
                                We'll contact you within <strong>{responseTime}</strong>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={`https://wa.me/263714570414?text=${encodeURIComponent(`Hi! I just submitted quote #${Date.now()} for ${formData.services.length} services. Can we discuss?`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Chat on WhatsApp
                            </a>
                            <a
                                href="tel:+263714570414"
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-600"
                            >
                                <Phone className="w-5 h-5" />
                                Call Us Now
                            </a>
                        </div>

                        {/* PDF Download Button */}
                        <button
                            onClick={generatePDF}
                            className="w-full mt-3 bg-slate-800/50 hover:bg-slate-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-600/50"
                        >
                            <Download className="w-5 h-5" />
                            Download Quote as PDF
                        </button>

                        <button
                            onClick={onClose}
                            className="mt-4 text-sm text-slate-400 hover:text-white underline"
                        >
                            Continue Browsing
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ============== Main Calculator ==============
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full my-4 overflow-hidden max-h-[95vh] flex flex-col"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 sm:p-6 border-b border-slate-700 flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-2xl font-bold">Get Your Quote</h2>
                                <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">
                                    Takes 60 seconds • No hidden fees
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-700/50 rounded-full transition"
                            aria-label="Close calculator"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map(num => (
                            <div key={num} className="flex-1 flex items-center">
                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors ${step >= num ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                    {num}
                                </div>
                                {num < 4 && (
                                    <div className={`flex-1 h-1 mx-1 sm:mx-2 rounded transition-colors ${step > num ? 'bg-blue-500' : 'bg-slate-700'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Goal Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">What's your main goal?</h3>
                                    <p className="text-slate-400">Select one to get started</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {GOAL_OPTIONS.map(goal => (
                                        <motion.button
                                            key={goal.id}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            onClick={() => setFormData(prev => ({ ...prev, goal: goal.id }))}
                                            className={`relative p-6 rounded-xl text-left transition-all ${formData.goal === goal.id
                                                ? 'bg-blue-500/20 border-2 border-blue-500/50 ring-1 ring-blue-500/20'
                                                : 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-slate-600'
                                                }`}
                                        >
                                            <div className="text-4xl mb-3">{goal.icon}</div>
                                            <div className="font-semibold text-white mb-1">{goal.title}</div>
                                            <div className="text-sm text-slate-400">{goal.description}</div>
                                            {formData.goal === goal.id && (
                                                <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-blue-400" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="bg-slate-800/30 border border-slate-700/30 rounded-full px-4 py-2 flex items-center gap-2 text-sm text-slate-500">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    <span>Not sure? <button
                                        onClick={() => { setShowGuideMe(true); setGuideMeStep(0); }}
                                        className="text-blue-400 hover:underline font-medium"
                                    >Let us guide you</button></span>
                                </div>

                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <span>🔒 127+ businesses quoted this week</span>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!formData.goal}
                                    className="w-full bg-white hover:bg-blue-50 text-slate-900 py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors shadow-lg shadow-white/5"
                                >
                                    Continue <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2: Service Selection */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">What do you need?</h3>
                                    <p className="text-slate-400">Select all that apply • Package discounts available</p>
                                </div>

                                {/* Category tabs */}
                                <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-700">
                                    {SERVICE_CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Service grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {getServicesByCategory(activeCategory).map(service => (
                                        <motion.button
                                            key={service.id}
                                            whileHover={{ scale: 1.01 }}
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    services: prev.services.includes(service.id)
                                                        ? prev.services.filter(s => s !== service.id)
                                                        : [...prev.services, service.id],
                                                }));
                                            }}
                                            className={`relative p-4 rounded-xl text-left transition-all ${formData.services.includes(service.id)
                                                ? 'bg-blue-500/20 border-2 border-blue-500/50'
                                                : 'bg-slate-800/30 border-2 border-slate-700/50 hover:border-slate-600'
                                                }`}
                                        >
                                            {service.popular && (
                                                <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold">
                                                    Popular
                                                </span>
                                            )}
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">{service.icon}</span>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-white">{service.name}</div>
                                                    <div className="text-sm text-blue-300">${service.basePrice} - ${service.maxPrice}</div>
                                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                        <Clock className="w-3 h-3" /> {service.turnaround}
                                                    </div>
                                                </div>
                                                {formData.services.includes(service.id) && (
                                                    <CheckCircle className="w-5 h-5 text-blue-400" />
                                                )}
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Quote summary */}
                                {quoteEstimate.total > 0 && (
                                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-sm text-slate-400">Estimated Investment</div>
                                                <div className="text-3xl font-bold text-white">${quoteEstimate.total.toLocaleString()}</div>
                                                {quoteEstimate.discountPercent > 0 && (
                                                    <div className="text-xs text-emerald-400 font-medium">
                                                        ✨ {quoteEstimate.discountPercent}% package discount applied!
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-slate-400">Potential ROI</div>
                                                <div className="text-2xl font-bold text-emerald-400">${quoteEstimate.roiEstimate.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        disabled={formData.services.length === 0}
                                        className="flex-1 bg-white hover:bg-blue-50 text-slate-900 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Continue <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Contact Info */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Where should we send your quote?</h3>
                                    <p className="text-slate-400">We respond within 2 hours on average</p>
                                </div>

                                {/* Urgency banner */}
                                {formData.timeline === 'urgent' && (
                                    <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-amber-400">⚡ Only 3 rush slots available this week</div>
                                            <div className="text-sm text-amber-300/70">Complete this form to secure priority processing</div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="John Moyo"
                                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            placeholder="john@business.co.zw"
                                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone / WhatsApp *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            placeholder="+263 77 123 4567"
                                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Company (Optional)</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                            placeholder="Your Business Name"
                                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">🔒 Secure</span>
                                    <span className="flex items-center gap-1">⚡ Fast</span>
                                    <span className="flex items-center gap-1">✅ ${quoteEstimate.total.toLocaleString()} estimate</span>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(4)}
                                        disabled={!formData.name || !formData.email || !formData.phone}
                                        className="flex-1 bg-white hover:bg-blue-50 text-slate-900 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Continue to Review <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Review */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Review Your Quote Request</h3>
                                    <p className="text-slate-400">Make sure everything looks correct</p>
                                </div>

                                {/* Quote summary */}
                                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
                                    <div className="grid grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <div className="text-sm text-slate-400">Your Investment</div>
                                            <div className="text-4xl font-bold text-white">${quoteEstimate.total.toLocaleString()}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-slate-400">Expected ROI</div>
                                            <div className="text-3xl font-bold text-emerald-400">${quoteEstimate.roiEstimate.toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.services.map(serviceId => {
                                            const service = getServiceById(serviceId);
                                            return (
                                                <span key={serviceId} className="bg-slate-800/50 px-3 py-1 rounded-full text-xs font-medium text-slate-300">
                                                    {service?.icon} {service?.name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Contact details */}
                                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Name:</span>
                                        <span className="text-white font-medium">{formData.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Email:</span>
                                        <span className="text-white font-medium">{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Phone:</span>
                                        <span className="text-white font-medium">{formData.phone}</span>
                                    </div>
                                    {formData.company && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Company:</span>
                                            <span className="text-white font-medium">{formData.company}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Additional notes */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Any special requirements? (Optional)</label>
                                    <textarea
                                        value={formData.additionalNotes}
                                        onChange={e => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                                        placeholder="Tell us more about your project..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition"
                                    />
                                </div>

                                {/* What happens next */}
                                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                                    <div className="text-sm text-slate-300">
                                        <strong className="text-white">What happens next:</strong>
                                        <ul className="mt-2 space-y-1 text-slate-400">
                                            <li>✅ Instant confirmation to your email & WhatsApp</li>
                                            <li>✅ Detailed quote within 24 hours</li>
                                            <li>✅ Free consultation call</li>
                                            <li>✅ No obligation • No pressure</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                🚀 Submit & Get My Quote
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Guide Me Wizard Modal */}
            {showGuideMe && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowGuideMe(false)} />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-hidden"
                    >
                        {/* Ambient glow */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />

                        <div className="relative">
                            {/* Progress dots */}
                            <div className="flex justify-center gap-2 mb-6">
                                {guideMeSteps.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-2 h-2 rounded-full transition-colors ${idx === guideMeStep ? 'bg-amber-400' : idx < guideMeStep ? 'bg-blue-500' : 'bg-slate-600'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Icon */}
                            <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-amber-400" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white text-center mb-2">{guideMeSteps[guideMeStep].title}</h3>
                            <p className="text-slate-300 text-center mb-4">{guideMeSteps[guideMeStep].content}</p>

                            {/* Tip */}
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6">
                                <div className="flex items-start gap-2">
                                    <HelpCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-blue-300">{guideMeSteps[guideMeStep].tip}</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex gap-3">
                                {guideMeStep > 0 ? (
                                    <button
                                        onClick={() => setGuideMeStep(prev => prev - 1)}
                                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setShowGuideMe(false)}
                                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
                                    >
                                        Skip
                                    </button>
                                )}
                                {guideMeStep < guideMeSteps.length - 1 ? (
                                    <button
                                        onClick={() => setGuideMeStep(prev => prev + 1)}
                                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Next <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setShowGuideMe(false)}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <CheckCircle className="w-4 h-4" /> Got It!
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UnifiedQuoteCalculator;

