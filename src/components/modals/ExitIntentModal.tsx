import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function ExitIntentModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [email, setEmail] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger when mouse leaves the viewport at the top (indicating moving to tabs/address bar)
            // and only on desktop screens
            if (
                !hasTriggered &&
                e.clientY <= 0 &&
                window.innerWidth > 768
            ) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasTriggered]);

    const handleSave = () => {
        if (!email.includes('@')) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive"
            });
            return;
        }

        // In a real app, this would call an API
        toast({
            title: "Progress Saved",
            description: "We've sent a resume link to your email.",
        });
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsVisible(false)}
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-background border border-border rounded-xl shadow-2xl p-6 w-full max-w-md overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary" />

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6 pt-2">
                            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                <Save className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 tracking-tight">Wait! Don't lose your quote</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Need time to think? Enter your email and we'll save your current configuration so you can come back anytime.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Input
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11"
                                autoFocus
                            />
                            <Button onClick={handleSave} className="h-11 font-medium">
                                Save My Quote
                            </Button>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-xs text-muted-foreground hover:text-foreground underline decoration-dotted"
                            >
                                No thanks, I'll risk it
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
