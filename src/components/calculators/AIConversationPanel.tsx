import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AICalculatorService, CALCULATOR_SYSTEM_PROMPT } from '@/lib/ai-calculator-service';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AIConversationPanelProps {
    onServiceRecommendation?: (serviceId: string) => void;
    onDataExtracted?: (data: any) => void;
    className?: string;
}

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    isError?: boolean;
}

export function AIConversationPanel({ onServiceRecommendation, onDataExtracted, className }: AIConversationPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm your SoHo Connect AI guide. Tell me valid details about your venue (e.g., 'I run a 50-room hotel' or 'I own a coffee shop'), and I'll help you find the perfect WiFi marketing solution." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize service ref to persist across renders
    const aiService = useRef(new AICalculatorService(CALCULATOR_SYSTEM_PROMPT));
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom on new message
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await aiService.current.sendMessage(userMsg);
            setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);

            // Simple keyword matching for demo purposes - in a real app, AI should output structured data
            // or we use a separate extraction call.
            if (onServiceRecommendation) {
                if (response.content.toLowerCase().includes('guest data capture')) onServiceRecommendation('guest-data-capture');
                if (response.content.toLowerCase().includes('direct booking')) onServiceRecommendation('direct-booking-tool');
            }

        } catch (err) {
            console.error(err);
            setError('I had trouble connecting. You can try again or use the standard form.');
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again or use the standard form to get your quote.", isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`flex flex-col h-full border rounded-lg bg-background shadow-sm ${className}`}>
            <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-sm">AI Quote Assistant</h3>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4 h-[400px]">
                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                  ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                            >
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div
                                className={`rounded-lg p-3 text-sm max-w-[80%] 
                  ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : msg.isError
                                            ? 'bg-destructive/10 text-destructive border border-destructive/20'
                                            : 'bg-muted/50 border'}`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-muted/50 border rounded-lg p-3 flex items-center">
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                <span className="text-xs text-muted-foreground">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t space-y-3">
                {error && (
                    <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">{error}</AlertDescription>
                    </Alert>
                )}
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                    AI can make mistakes. Review generated quotes carefully.
                </p>
            </div>
        </div>
    );
}
