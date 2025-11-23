/**
 * CTAButton - Royal Blue branded call-to-action button
 * Enforces Soho Connect brand colors (#4169e1)
 * NO ORANGE HUES ALLOWED
 */

import type { ReactNode } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export const CTAButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = false,
  loading = false,
  disabled = false,
  className,
  type = 'button'
}: CTAButtonProps) => {
  const variants = {
    primary: `bg-[#4169e1] text-white hover:bg-[#3557c4] hover:scale-105 hover:shadow-2xl`,
    secondary: `bg-stone-100 text-stone-900 border-2 border-stone-200 hover:bg-stone-200`,
    ghost: `bg-transparent text-[#4169e1] border-2 border-[#4169e1] hover:bg-[#4169e1] hover:text-white`
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={cn(
        'relative overflow-hidden font-semibold tracking-wide transition-all duration-300 rounded-lg group',
        variants[variant],
        sizes[size],
        (loading || disabled) && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {children}
            {icon && (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </>
        )}
      </span>
    </button>
  );
};