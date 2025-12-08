import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, CheckCircle, Sparkles } from 'lucide-react';
import { CONSULTATION_FLOWS, QuestionType, Option } from '@/data/calculator-logic';
import { ServiceCategory } from '@/data/pricing';

interface ConsultationEngineProps {
    category: ServiceCategory;
    onComplete: (recommendedServices: string[]) => void;
    onBack: () => void;
}

const ConsultationEngine: React.FC<ConsultationEngineProps> = ({ category, onComplete, onBack }) => {
    // Determine which flow to use
    const flowKey = CONSULTATION_FLOWS[category] ? category : 'General';
    const flow = CONSULTATION_FLOWS[flowKey];

    const [currentQuestionId, setCurrentQuestionId] = useState(flow.startQuestionId);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [history, setHistory] = useState<string[]>([]);
    const [isThinking, setIsThinking] = useState(false);

    const currentQuestion = flow.questions[currentQuestionId];

    // Helper to handle answer selection
    const handleOptionSelect = (option: Option) => {
        // 1. Save answer
        const newAnswers = { ...answers, [currentQuestionId]: option.value };
        setAnswers(newAnswers);

        // 2. Simulate AI "Thinking"
        setIsThinking(true);

        setTimeout(() => {
            setIsThinking(false);

            // 3. Determine next step
            if (option.nextQuestionId && flow.questions[option.nextQuestionId]) {
                // Push current to history for "Back" button
                setHistory(prev => [...prev, currentQuestionId]);
                setCurrentQuestionId(option.nextQuestionId);
            } else {
                // End of flow: Compile recommendations
                const recommendations: string[] = [];

                // Collect recommendations from all selected options in the path
                Object.entries(newAnswers).forEach(([qId, val]) => {
                    const q = flow.questions[qId];
                    const selectedOption = q.options.find(opt => opt.value === val);
                    if (selectedOption?.recommendations) {
                        recommendations.push(...selectedOption.recommendations);
                    }
                });

                // De-duplicate
                const uniqueRecs = [...new Set(recommendations)];
                onComplete(uniqueRecs);
            }
        }, 800); // 800ms delay for effect
    };

    const handleBack = () => {
        if (history.length > 0) {
            const prevId = history[history.length - 1];
            setHistory(prev => prev.slice(0, -1));
            setCurrentQuestionId(prevId);
        } else {
            onBack();
        }
    };

    // Thinking State
    if (isThinking) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center animate-pulse">
                <Brain className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-white">Analyzing your needs...</h3>
                <p className="text-slate-400">Finding the perfect strategy for {category}...</p>
            </div>
        );
    }

    // Error State (shouldn't happen with correct logic data)
    if (!currentQuestion) {
        return (
            <div className="text-center p-8">
                <h3 className="text-red-400 font-bold">Concept Error</h3>
                <p className="text-slate-400 mb-4">We lost the thread of conversation.</p>
                <button onClick={onBack} className="text-blue-400 underline">Start Over</button>
            </div>
        );
    }

    return (
        <motion.div
            key={currentQuestionId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-2 text-blue-400 text-sm uppercase tracking-wider font-bold">
                    <Sparkles className="w-4 h-4" />
                    Soho Smart Assistant
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentQuestion.text}</h3>
                {currentQuestion.subtext && <p className="text-slate-400">{currentQuestion.subtext}</p>}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className="group relative flex items-center p-4 rounded-xl bg-slate-800/50 border-2 border-slate-700/50 hover:bg-slate-800 hover:border-blue-500/50 transition-all text-left"
                    >
                        {option.icon && <span className="text-2xl mr-4">{option.icon}</span>}
                        <div className="flex-1">
                            <div className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                                {option.label}
                            </div>
                            {option.description && (
                                <div className="text-xs text-slate-500 mt-1">{option.description}</div>
                            )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </button>
                ))}
            </div>

            {/* Navigation */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-sm text-slate-500">
                <button onClick={handleBack} className="flex items-center gap-1 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span>
                    Thinking about <strong>{category}</strong>
                </span>
            </div>
        </motion.div>
    );
};

export default ConsultationEngine;
