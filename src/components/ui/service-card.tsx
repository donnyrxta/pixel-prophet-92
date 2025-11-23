/**
 * ServiceCard - Premium service card with Royal Blue accents
 * Modern 2025 design with hover effects
 */

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    priceRange: string;
    icon: string;
    image?: string;
  };
  onClick?: () => void;
  className?: string;
}

export const ServiceCard = ({ service, onClick, className }: ServiceCardProps) => {
  return (
    <div
      className={cn(
        'group relative bg-white rounded-xl overflow-hidden border-2 border-stone-200',
        'hover:border-[#4169e1] transition-all duration-500 cursor-pointer',
        'hover:shadow-2xl hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      {service.image && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent" />
          <div className="absolute top-4 left-4 w-16 h-16 bg-[#4169e1] rounded-full flex items-center justify-center text-4xl shadow-lg">
            {service.icon}
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-bold text-stone-900 mb-2 group-hover:text-[#4169e1] transition-colors">
          {service.title}
        </h3>
        <p className="text-stone-600 mb-4">{service.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#4169e1]">{service.priceRange}</span>
          <ArrowRight className="w-5 h-5 text-[#4169e1] transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
    </div>
  );
};