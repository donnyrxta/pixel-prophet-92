import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import {
    X, CheckCircle, AlertCircle, Clock, Zap, ArrowRight, ArrowLeft,
    MessageCircle, Phone, Rocket, RefreshCw, Package, HelpCircle,
    Download, Sparkles, Brain, ListCheck, ChevronLeft, ChevronRight
} from 'lucide-react';
import { trackFormSubmit, trackQuoteCalculator, trackWhatsAppClick } from '@/lib/gtm';
import {
    SERVICE_CATEGORIES,
    GOAL_OPTIONS,
    calculateQuoteEstimate,
    calculateLeadScore,
    getLeadTier,
    getResponseTime,
    getServiceById,
    getServicesByCategory,
    type ServiceCategory,
} from '@/data/pricing';
import ConsultationEngine from './ConsultationEngine';

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

type Mode = 'select' | 'direct' | 'consult';
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
    // Mode Selection State
    const [mode, setMode] = useState<Mode>(preselectedService ? 'direct' : 'select');

    // Direct Mode Steps
    const [step, setStep] = useState<Step>(1);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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

    // quoteEstimate is calculated later after formData is tracked

    // Reset mode if opened fresh without preselection
    useEffect(() => {
        if (isOpen && !preselectedService && !preselectedCategory) {
            setMode('select');
        }
    }, [isOpen, preselectedService, preselectedCategory]);

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
            if (
                e.clientY <= 0 &&
                !isOpen &&
                !hasTriggeredExitIntent.current &&
                formData.services.length > 0
            ) {
                hasTriggeredExitIntent.current = true;
                trackQuoteCalculator('exit_intent_triggered', { services: formData.services });
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [isOpen, formData.services]);

    // Calculate quote - must be before generatePDF which uses it
    const quoteEstimate = calculateQuoteEstimate(formData.services);

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
                calculatorMode: mode // Track which mode produced the lead
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
    }, [formData, quoteEstimate, onComplete, mode]);

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

    // ============== Main Calculator Shell ==============
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
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-2xl font-bold">Smart Quote Calculator</h2>
                                <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">
                                    {mode === 'consult' ? 'AI Consultation Mode • Finding your perfect fit' : 'Direct Quote Mode • Instant pricing'}
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

                    {/* Progress Bar (Visible in Direct/Consult flow) */}
                    {mode !== 'select' && (
                        <div className="flex items-center gap-2 mt-2">
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
                    )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
                    <AnimatePresence mode="wait">

                        {/* MODE SELECTION SCREEN */}
                        {mode === 'select' && (
                            <motion.div
                                key="mode-select"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-8 py-4"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-2">How can we help you today?</h3>
                                    <p className="text-slate-400">Choose the option that fits you best</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                    <button
                                        onClick={() => {
                                            setMode('direct');
                                            setStep(1);
                                        }}
                                        className="group p-8 rounded-2xl bg-slate-800/50 border-2 border-slate-700/50 hover:bg-slate-800 hover:border-slate-500 transition-all text-left relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-50"><ListCheck className="w-24 h-24 text-slate-700 -rotate-12" /></div>
                                        <div className="relative z-10">
                                            <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                                <ListCheck className="w-8 h-8 text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-2">I know what I need</h4>
                                            <p className="text-slate-400 mb-6">Skip the questions. Pick your services directly from our catalog and get a price.</p>
                                            <span className="inline-flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                                                Start Selecting <ArrowRight className="w-4 h-4 ml-2" />
                                            </span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMode('consult');
                                            setStep(1); // Reusing Step 1/2 UI logic but wrapper handles logic
                                        }}
                                        className="group p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-2 border-blue-500/30 hover:border-blue-400 transition-all text-left relative overflow-hidden ring-1 ring-blue-500/20"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-50"><Brain className="w-24 h-24 text-blue-800/50 rotate-12" /></div>
                                        <div className="relative z-10">
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                RECOMMENDED
                                            </div>
                                            <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                                <Sparkles className="w-8 h-8 text-blue-300 group-hover:text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-2">Help me decide</h4>
                                            <p className="text-slate-300 mb-6">Not sure? Answer a few questions and our AI will recommend the perfect package.</p>
                                            <span className="inline-flex items-center text-blue-300 font-semibold group-hover:translate-x-2 transition-transform">
                                                Start Consultation <ArrowRight className="w-4 h-4 ml-2" />
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* ==========================================================
                            CONSULTATION MODE LOGIC
                           ========================================================== */}
                        {mode === 'consult' && (
                            <>
                                {/* Step 1: Select Category for Consultation */}
                                {step === 1 && (
                                    <motion.div
                                        key="consult-cat"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">What area do you need help with?</h3>
                                            <p className="text-slate-400">We'll tailor our questions to this topic.</p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {SERVICE_CATEGORIES.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => {
                                                        setActiveCategory(cat);
                                                        setStep(2); // Move to Engine
                                                    }}
                                                    className="p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-700 transition flex flex-col items-center text-center gap-2"
                                                >
                                                    <span className="text-white font-semibold">{cat}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => setMode('select')} className="text-slate-500 hover:text-white mt-4 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back</button>
                                    </motion.div>
                                )}

                                {/* Step 2: The Engine */}
                                {step === 2 && (
                                    <ConsultationEngine
                                        category={activeCategory}
                                        onBack={() => setStep(1)}
                                        onComplete={(recommended) => {
                                            // Auto-select recommendations and move to Contact
                                            setFormData(prev => ({ ...prev, services: [...new Set([...prev.services, ...recommended])] }));
                                            setStep(4); // Jump to Contact/Review phase logic (mapped to step 4 in direct mode flow roughly)
                                        }}
                                    />
                                )}
                            </>
                        )}


                        {/* ==========================================================
                            DIRECT MODE LOGIC (Original Flow) & SHARED STEPS (3 & 4)
                            Note: We map the engine completion to Step 4 logic
                           ========================================================== */}
                        {(mode === 'direct' || (mode === 'consult' && step >= 3)) && (
                            <>
                                {/* Step 1 (Direct): Goal Selection */}
                                {step === 1 && mode === 'direct' && (
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

                                        <div className="flex justify-between items-center">
                                            <button onClick={() => setMode('select')} className="text-slate-500 hover:text-white flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back</button>
                                            <button
                                                onClick={() => setStep(2)}
                                                disabled={!formData.goal}
                                                className="bg-white hover:bg-blue-50 text-slate-900 py-3 px-8 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors shadow-lg shadow-white/5"
                                            >
                                                Continue <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2 (Direct): Service Selection */}
                                {step === 2 && mode === 'direct' && (
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

                                {/* Step 3: Contact Info (Shared) */}
                                {/* For Consult mode, we skip straight here (Step 4 technically in our state map) */}
                                {(step === 3 || (mode === 'consult' && step === 4)) && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Where should we send your quote?</h3>
                                            <p className="text-slate-400">
                                                {mode === 'consult' ? 'We have compiled your recommended package.' : 'We respond within 2 hours on average'}
                                            </p>
                                        </div>

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
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => mode === 'consult' ? setStep(2) : setStep(2)}
                                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={() => setStep(mode === 'consult' ? 5 as any : 4)} // Hacky step increment for review
                                                disabled={!formData.name || !formData.email || !formData.phone}
                                                className="flex-1 bg-white hover:bg-blue-50 text-slate-900 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                                            >
                                                Continue to Review <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Review (Shared) */}
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
                                        </div>

                                        {/* Submit Block */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>Processing...</>
                                            ) : (
                                                <>Submit Request <Rocket className="w-6 h-6" /></>
                                            )}
                                        </button>

                                        <button onClick={() => setStep(mode === 'consult' ? 4 : 3)} className="w-full text-slate-500 text-sm hover:text-white">Back to Edit</button>
                                    </motion.div>
                                )}
                            </>
                        )}

                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default UnifiedQuoteCalculator;
