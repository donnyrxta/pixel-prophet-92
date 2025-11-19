/**
 * FAQSection - Accessible accordion for frequently asked questions
 * Uses native HTML details/summary for progressive enhancement
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export const FAQSection = ({
  faqs,
  title = "Frequently Asked Questions"
}: FAQSectionProps) => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-600 font-['Oswald']">
        {title}
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white/70 backdrop-blur-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <summary className="px-6 py-4 cursor-pointer font-medium text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <span className="pr-4">{faq.question}</span>
              <svg
                className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-100">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
