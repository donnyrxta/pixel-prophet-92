import { useComparison } from '@/context/ComparisonContext';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompareButtonProps {
  productId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'icon';
}

export const CompareButton = ({ productId, className, variant = 'icon' }: CompareButtonProps) => {
  const { addToCompare, isInCompare, removeFromCompare } = useComparison();
  const isSelected = isInCompare(productId);

  const toggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeFromCompare(productId);
    } else {
      addToCompare(productId);
    }
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCompare}
        className={cn(
          "h-10 w-10 rounded-full transition-colors touch-target shadow-sm",
          isSelected 
            ? "bg-[#4169e1] text-white hover:bg-[#3151b5] hover:text-white" 
            : "bg-white/90 text-stone-600 hover:bg-[#4169e1] hover:text-white backdrop-blur-sm",
          className
        )}
        title={isSelected ? "Remove from comparison" : "Add to comparison"}
      >
        {isSelected ? <Check className="w-5 h-5" /> : <ArrowRightLeft className="w-5 h-5" />}
      </Button>
    );
  }

  return (
    <Button
      variant={isSelected ? "secondary" : "outline"}
      size="sm"
      onClick={toggleCompare}
      className={cn("gap-2", className)}
    >
      {isSelected ? <Check className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
      {isSelected ? "Added" : "Compare"}
    </Button>
  );
};
