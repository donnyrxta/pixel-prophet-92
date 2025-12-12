import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Info, Check, Sparkles } from 'lucide-react';
import { calculateQuoteEstimate } from '@/data/pricing';

interface GlassSummaryPanelProps {
    selectedServices: string[];
    onWhyPriceClick?: () => void;
    className?: string;
}

export function GlassSummaryPanel({ selectedServices, onWhyPriceClick, className }: GlassSummaryPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { total, subtotal, discount, roiEstimate } = calculateQuoteEstimate(selectedServices);

    // One-time setup fee estimation (simplified logic for demo)
    const setupFee = Math.round(total * 0.5);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
                bg-slate-900/85 backdrop-blur-xl border border-white/20 
                rounded-2xl shadow-2xl overflow-hidden
                flex flex-col text-white
                ${className}
            `}
        >
            {/* Header / ROI Highlight */}
            <div className="p-5 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-24 h-24" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Projected ROI</span>
                        <span className="text-xs text-emerald-400 font-bold px-2 py-0.5 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                            ~3.5x ROI
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-white tracking-tight">
                        ${roiEstimate.toLocaleString()}
                        <span className="text-sm font-normal text-white/70 ml-1">potential monthly value</span>
                    </div>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-5 space-y-4">
                <div className="flex justify-between items-baseline">
                    <span className="text-sm text-white/80 font-medium">Estimated monthly investment</span>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">${total.toLocaleString()}</div>
                        {discount > 0 && (
                            <div className="text-xs text-emerald-400 line-through opacity-80">${subtotal.toLocaleString()}</div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs text-white/40 pt-2 border-t border-white/5">
                    <span>One-time setup fee</span>
                    <span>${setupFee.toLocaleString()}</span>
                </div>
            </div>

            {/* Expandable Details */}
            <div className="mt-auto bg-black/20">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-3 px-5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                    <span>{isExpanded ? 'Hide Details' : 'Included Services'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-5 pt-0 space-y-4 text-sm pb-6">
                                <div className="space-y-2">
                                    {selectedServices.length === 0 ? (
                                        <div className="text-white/30 italic text-center py-2">Select services to see breakdown</div>
                                    ) : (
                                        <ul className="space-y-2">
                                            {selectedServices.map(id => (
                                                <li key={id} className="flex items-start gap-2.5 text-white/80">
                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                                    <span className="capitalize leading-tight">{id.replace(/-/g, ' ')}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {onWhyPriceClick && (
                                    <button
                                        onClick={onWhyPriceClick}
                                        className="flex items-center gap-1.5 text-xs text-blue-300 hover:text-blue-200 transition-colors opacity-80 hover:opacity-100"
                                    >
                                        <Info className="w-3.5 h-3.5" />
                                        How is this calculated?
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
