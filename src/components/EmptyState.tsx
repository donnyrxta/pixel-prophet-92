import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * EmptyState - Reusable component for displaying empty/no-results states
 * Provides consistent UX for edge cases across the application
 *
 * @example
 * <EmptyState
 *   icon={<Package className="w-12 h-12" />}
 *   title="No products found"
 *   description="Try adjusting your filters or search query"
 *   action={{ label: "Clear filters", onClick: handleClearFilters }}
 * />
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = ''
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <div className="mb-4 text-muted-foreground opacity-50">
          {icon}
        </div>
      )}

      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
        {title}
      </h3>

      {description && (
        <p className="text-muted-foreground max-w-md mb-6">
          {description}
        </p>
      )}

      {action && (
        <Button
          onClick={action.onClick}
          variant="default"
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
