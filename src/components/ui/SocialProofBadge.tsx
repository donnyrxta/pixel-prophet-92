import React from 'react';
import { Users } from 'lucide-react';

interface SocialProofBadgeProps {
    className?: string;
    businessType?: string;
}

export function SocialProofBadge({ className }: SocialProofBadgeProps) {
    return (
        <div className={`flex items-center justify-center p-2 ${className}`}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/50">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Trusted by 127+ Harare businesses</span>
            </div>
        </div>
    );
}
