import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * FAQAccordion renders a list of frequently asked questions. Each
 * item can be expanded to reveal its answer. Use this component to
 * provide quick answers to common queries on product or category
 * pages, improving user confidence and reducing support overhead.
 *
 * @param {Object} props
 * @param {Array} props.items - Array of { question, answer } objects.
 */
export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = idx === openIndex;
        return (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-4 py-3 bg-white/70 backdrop-blur-lg text-left"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-4 py-3 bg-gray-50 text-gray-700 text-sm">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}