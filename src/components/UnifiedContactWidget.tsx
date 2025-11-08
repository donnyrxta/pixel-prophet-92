/**
 * Unified Contact Widget
 * Solves the "button overload" problem by consolidating multiple CTAs
 * Applies Hick's Law (reducing choice paralysis) and Fitts's Law (optimal target sizing)
 */
import { useState } from 'react';
import { Phone, MessageCircle, Mail, X } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { trackCTAClick } from '@/lib/gtm';
import QuotationCalculator from './QuotationCalculator';

const UnifiedContactWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const contactOptions = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp Chat',
      sublabel: 'Quick response',
      action: () => {
        trackCTAClick('whatsapp_unified_widget', 'unified_contact_widget');
        window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=Hi%20Soho%20Connect!%20I%27d%20like%20to%20inquire%20about...`, '_blank');
      },
      color: 'from-primary to-blue-600',
      hoverColor: 'hover:from-primary hover:to-blue-700'
    },
    {
      id: 'call',
      icon: Phone,
      label: 'Call Us Now',
      sublabel: 'Mon-Sat 8AM-5PM',
      action: () => {
        trackCTAClick('call_unified_widget', 'unified_contact_widget');
        window.location.href = `tel:${CONTACT_INFO.phone}`;
      },
      color: 'from-primary to-blue-600',
      hoverColor: 'hover:from-primary hover:to-blue-700'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email Us',
      sublabel: '24hr response',
      action: () => {
        trackCTAClick('email_unified_widget', 'unified_contact_widget');
        window.location.href = `mailto:${CONTACT_INFO.email}`;
      },
      color: 'from-primary to-blue-600',
      hoverColor: 'hover:from-primary hover:to-blue-700'
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-contact-widget flex flex-col items-end gap-3">
        
        {/* Expanded Options */}
        {isExpanded && (
          <div className="flex flex-col gap-3 animate-slideUp">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={option.action}
                  className={`flex items-center gap-3 bg-gradient-to-r ${option.color} ${option.hoverColor} text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 group touch-target`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className="text-xs opacity-90">{option.sublabel}</div>
                  </div>
                </button>
              );
            })}
            
            {/* Get Quote option */}
            <button
              onClick={() => {
                setShowCalculator(true);
                setIsExpanded(false);
                trackCTAClick('quote_unified_widget', 'unified_contact_widget');
              }}
              className="flex items-center gap-3 btn-brand text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 group touch-target"
            >
              <Mail className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold text-sm">Get Quote</div>
                <div className="text-xs opacity-90">Instant estimate</div>
              </div>
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-brand text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group relative touch-target"
          aria-label={isExpanded ? 'Close contact menu' : 'Open contact menu'}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-primary w-3 h-3 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 bg-primary w-3 h-3 rounded-full" />
            </>
          )}
        </button>

        {/* Helper Tooltip */}
        {!isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Need help? Click here! 👆
          </div>
        )}
      </div>

      {/* Quotation Calculator Modal */}
      {showCalculator && <QuotationCalculator onClose={() => setShowCalculator(false)} />}
    </>
  );
};

export default UnifiedContactWidget;
