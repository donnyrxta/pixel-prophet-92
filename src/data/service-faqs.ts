/**
 * Service FAQs for SEO Featured Snippets
 * Each service page has targeted Q&A for Google Answer Boxes
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceFAQs {
  [slug: string]: FAQ[];
}

export const serviceFAQs: ServiceFAQs = {
  printing: [
    {
      question: "How long does same-day printing take in Harare?",
      answer: "Same-day printing orders placed before 10 AM are typically ready by 5 PM the same day. Rush orders can be completed in as little as 4 hours for standard items like business cards and flyers. For large format printing, allow 6-8 hours for same-day service."
    },
    {
      question: "What file formats do you accept for printing?",
      answer: "We accept PDF (preferred), AI, EPS, PSD, JPEG, PNG, and TIFF files. For best results, submit print-ready PDFs with 300 DPI resolution and 3mm bleed. We also offer free file checking and can convert your files if needed."
    },
    {
      question: "What is the minimum order quantity for business cards?",
      answer: "Our minimum order is 100 business cards, with pricing starting at $20 for 500 cards on premium 350gsm stock. We offer bulk discounts: 1000+ cards get 10% off, 5000+ get 20% off. All orders include free delivery within Harare CBD."
    },
    {
      question: "Do you offer Pantone color matching?",
      answer: "Yes, we offer Pantone color matching for all print jobs at no extra cost. We use calibrated equipment and provide digital proofs before printing. For critical color jobs, we recommend ordering a printed proof sample first."
    },
    {
      question: "Can you print on recycled or eco-friendly paper?",
      answer: "Yes, we stock FSC-certified recycled paper, bamboo paper, and other eco-friendly options. These are available for business cards, brochures, and stationery at a small premium. Ask about our Green Printing Package for sustainable marketing materials."
    },
    {
      question: "What paper weights do you offer for brochures?",
      answer: "We offer brochure printing on 130gsm (standard), 170gsm (premium), and 250gsm (luxury) coated stock. Matte, gloss, and silk finishes are available. For high-end brochures, we recommend 170gsm with soft-touch lamination."
    }
  ],
  
  branding: [
    {
      question: "How long does logo design take?",
      answer: "Standard logo design takes 5-7 business days from briefing to final files. This includes 3 initial concepts, 2 rounds of revisions, and final file delivery. Rush logo design is available in 48-72 hours for an additional fee."
    },
    {
      question: "What files do I receive with a logo design?",
      answer: "You receive vector files (AI, EPS, SVG) for print and scaling, plus PNG and JPEG files for digital use. We also provide a mini style guide with color codes (CMYK, RGB, Hex) and usage guidelines. Full source files are included - you own everything."
    },
    {
      question: "Do you offer unlimited logo revisions?",
      answer: "Yes, our logo design packages include unlimited revisions until you're 100% satisfied. Most projects are completed within 2-3 revision rounds. We work collaboratively to ensure the final logo perfectly represents your brand vision."
    },
    {
      question: "What is included in a complete brand identity package?",
      answer: "Our complete brand identity includes: logo design (primary + variations), color palette, typography system, brand guidelines document, business card design, letterhead, email signature, and social media templates. Prices start at $500."
    },
    {
      question: "Can you rebrand an existing business?",
      answer: "Yes, we specialize in rebranding projects. We start with a brand audit to understand what's working and what needs updating. Rebranding packages include updated logo, refreshed color palette, and transitional guidelines for a smooth changeover."
    },
    {
      question: "Do you design packaging and labels?",
      answer: "Yes, we offer complete packaging design including boxes, labels, bottles, and product packaging. We work with your manufacturer to ensure print-ready files. Pricing starts at $300 per packaging design, with discounts for product ranges."
    }
  ],
  
  'digital-marketing': [
    {
      question: "How much does social media management cost in Zimbabwe?",
      answer: "Social media management starts at $200/month for 2 platforms with 12 posts per month. Our premium package at $400/month includes 4 platforms, 20 posts, paid ad management, and monthly analytics reports. All packages include content creation and community management."
    },
    {
      question: "How long does SEO take to show results?",
      answer: "SEO typically shows initial improvements in 3-4 months, with significant results in 6-12 months. For local Harare businesses, local SEO can show faster results (2-3 months). We provide monthly ranking reports so you can track progress from day one."
    },
    {
      question: "Do you manage Facebook and Google ads?",
      answer: "Yes, we manage advertising campaigns on Facebook, Instagram, Google, and LinkedIn. Our ad management includes strategy, creative design, targeting, optimization, and reporting. Management fees start at 15% of ad spend (minimum $150/month) plus the ad budget."
    },
    {
      question: "What reports do you provide for digital marketing?",
      answer: "We provide comprehensive monthly reports including: website traffic, social media growth, engagement rates, ad performance (ROAS, CPC, CTR), keyword rankings, lead generation stats, and actionable recommendations. All clients get access to a real-time dashboard."
    },
    {
      question: "Can you help with email marketing campaigns?",
      answer: "Yes, we offer email marketing services including list building, campaign design, automation setup, and performance tracking. Packages start at $150/month for up to 5,000 subscribers. We use industry-leading tools and ensure GDPR compliance."
    },
    {
      question: "Do you offer content creation services?",
      answer: "Yes, our content marketing services include blog writing, video production, social media graphics, infographics, and photography. Content packages start at $250/month for 4 blog posts and 20 social media graphics."
    }
  ],
  
  signage: [
    {
      question: "How much does vehicle branding cost in Harare?",
      answer: "Vehicle branding costs depend on coverage: partial wrap (doors/sides) starts at $400, half wrap at $600, and full vehicle wrap at $800-1500 depending on vehicle size. We use high-quality 3M and Avery vinyl with 5-7 year outdoor durability."
    },
    {
      question: "Do you install shop signs?",
      answer: "Yes, professional installation is included with all signage orders. We conduct a site survey, handle permits if required, and install during business hours or after hours as needed. Installation warranty covers 2 years on all mountings and electrical work."
    },
    {
      question: "What types of outdoor signs do you make?",
      answer: "We fabricate: illuminated channel letters, lightbox signs, 3D letters, PVC and acrylic signs, A-frames, pylon signs, and building wraps. All outdoor signs use UV-resistant materials rated for Zimbabwe's climate. Free design consultation included."
    },
    {
      question: "How long does vehicle wrap last?",
      answer: "Quality vehicle wraps last 5-7 years with proper care. We use premium 3M and Avery vinyl designed for African conditions. The wrap is removable without damaging original paintwork. We offer maintenance tips and can provide touch-up services."
    },
    {
      question: "Can you brand tents and gazebos?",
      answer: "Yes, we brand promotional tents, gazebos, and event structures. Options include full-color printed canopies, sidewalls, and banner flags. We stock 3x3m and 3x6m branded tents ready for customization. Turnaround is 5-7 business days."
    },
    {
      question: "Do you offer trade show displays?",
      answer: "Yes, we provide complete trade show solutions: roll-up banners ($80+), pop-up displays, exhibition stands, table covers, and backdrop walls. We offer package deals for trade shows including design, printing, and transport within Harare."
    }
  ],
  
  'payment-services': [
    {
      question: "What payment methods do you accept?",
      answer: "We accept: EcoCash, OneMoney, InnBucks, bank transfers (ZWL and USD), cash, Visa/Mastercard, and PayPal for international clients. We also offer credit terms for registered businesses with approved accounts."
    },
    {
      question: "Do you offer payment plans for large orders?",
      answer: "Yes, we offer 50/50 payment plans: 50% deposit to start, 50% on completion. For orders over $1000, we offer 30/30/40 terms (30% deposit, 30% at proof stage, 40% on delivery). Custom payment schedules available for bulk orders."
    },
    {
      question: "Can I pay in USD or ZWL?",
      answer: "Yes, we accept both USD and ZWL at competitive rates. Prices on our website are in USD but can be paid in ZWL equivalent at the daily rate. EcoCash payments are in ZWL, while bank transfers can be in either currency."
    },
    {
      question: "Do you provide invoices and receipts?",
      answer: "Yes, all orders include a formal invoice and receipt. We can provide proforma invoices for corporate procurement, tax invoices for VAT-registered businesses, and detailed quotes for tender submissions."
    },
    {
      question: "Is there a deposit required for custom orders?",
      answer: "Yes, custom orders require a 50% deposit to begin work. This covers materials and design time. Standard products like business cards can be ordered with full payment on collection. Corporate accounts may have different terms."
    },
    {
      question: "Do you offer corporate credit accounts?",
      answer: "Yes, registered companies can apply for 30-day credit accounts. Requirements include business registration (CR14), valid ID, and trade references. Approved accounts receive monthly invoicing and priority processing."
    }
  ],
  
  'wifi-marketing': [
    {
      question: "What is WiFi marketing and how does it work?",
      answer: "WiFi marketing uses your guest WiFi to collect customer data (email, phone, demographics) through a branded login portal. Customers connect to free WiFi by providing their details, which you can use for targeted marketing campaigns, loyalty programs, and analytics."
    },
    {
      question: "Is WiFi marketing legal in Zimbabwe?",
      answer: "Yes, WiFi marketing is legal when implemented correctly. We ensure compliance with data protection principles by including clear terms of service, opt-in consent for marketing, and secure data storage. Customers voluntarily provide information in exchange for WiFi access."
    },
    {
      question: "What data can I collect from WiFi marketing?",
      answer: "You can collect: email addresses, phone numbers, names, birthdays, gender, visit frequency, dwell time, and social media profiles (if using social login). This data enables personalized marketing, birthday offers, and customer behavior insights."
    },
    {
      question: "How much does a WiFi marketing system cost?",
      answer: "Basic WiFi marketing systems start at $50/month for single-location businesses with up to 500 monthly users. Enterprise solutions with multiple locations, advanced analytics, and CRM integration range from $200-500/month. Hardware (access points) is additional."
    },
    {
      question: "Can WiFi marketing integrate with my existing systems?",
      answer: "Yes, our WiFi marketing platforms integrate with popular CRMs (HubSpot, Salesforce), email tools (Mailchimp, Brevo), and POS systems. API access is available for custom integrations. We handle the technical setup as part of implementation."
    },
    {
      question: "What businesses benefit most from WiFi marketing?",
      answer: "WiFi marketing works best for: restaurants, hotels, cafes, shopping malls, gyms, salons, coworking spaces, and event venues - any business with guest WiFi and foot traffic. Typical ROI is 3-5x through repeat visits and targeted promotions."
    }
  ]
};

/**
 * General FAQs for the main services page
 */
export const generalServiceFAQs: FAQ[] = [
  {
    question: "Do you offer free delivery in Harare?",
    answer: "Yes, we offer free delivery within Harare CBD and surrounding suburbs for orders over $50. Same-day delivery is available for urgent orders at a small fee. We also ship nationwide via courier services."
  },
  {
    question: "Can I get a free quote before ordering?",
    answer: "Absolutely! We provide free, no-obligation quotes within 2 hours during business hours. Use our online quote calculator for instant estimates, or contact us via WhatsApp for personalized quotes on complex projects."
  },
  {
    question: "What is your turnaround time for most orders?",
    answer: "Standard turnaround is 2-3 business days for most printing orders. Same-day service is available for business cards, flyers, and small format items. Large format and custom signage typically takes 5-7 business days."
  },
  {
    question: "Do you have a physical location I can visit?",
    answer: "Yes, our office and showroom is located at 7 Luck Street, Harare CBD (near NetOne Building). We're open Monday-Friday 8AM-5PM and Saturday 9AM-1PM. Walk-ins welcome - see samples and discuss your project in person."
  },
  {
    question: "Can you help with design if I don't have artwork?",
    answer: "Yes! Our in-house design team can create professional designs for any project. Design services start at $30 for simple layouts and $150+ for custom designs. We also offer free minor adjustments to existing artwork."
  }
];
