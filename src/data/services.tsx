import { Clock, Star, DollarSign, CheckCircle2 } from 'lucide-react';

export interface ServiceDetail {
    title: string;
    tagline?: string;
    description: string;
    heroImage: string;
    features: { title: string; description: string; icon: any }[];
    services: { name: string; description: string; startingPrice: string; turnaround: string; popular: boolean }[];
    benefits: string[];
    testimonial: { text: string; author: string; company: string };
    timedCards: any[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
    printing: {
        title: 'Printing Services',
        description: 'High-quality printing solutions for all your business needs. From business cards to large format banners, we deliver excellence on every page.',
        heroImage: '/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg',
        features: [
            { title: 'Same-Day Service', description: 'Rush orders completed within 24 hours', icon: Clock },
            { title: 'Premium Quality', description: 'Latest printing technology for perfect results', icon: Star },
            { title: 'Competitive Pricing', description: 'Best value with bulk discounts', icon: DollarSign }
        ],
        services: [
            { name: 'Business Cards', description: 'Premium business cards on quality stock', startingPrice: '$20/500 cards', turnaround: '24-48 hours', popular: true },
            { name: 'Brochures & Flyers', description: 'Full-color marketing materials', startingPrice: '$50/1000 pieces', turnaround: '2-3 days', popular: true },
            { name: 'Posters & Banners', description: 'Large format printing up to 5m wide', startingPrice: '$30/sqm', turnaround: '1-2 days', popular: false },
            { name: 'Stationery', description: 'Letterheads, envelopes, folders', startingPrice: '$40/500 pieces', turnaround: '3-5 days', popular: false }
        ],
        benefits: [
            'High-resolution printing up to 1440dpi',
            'Wide range of paper stocks and finishes',
            'Color matching and proofing available',
            'Delivery across Harare',
            'Volume discounts for bulk orders',
            'Professional finishing options'
        ],
        testimonial: { text: "Soho Connect delivered 1000 brochures in 48 hours. The quality exceeded our expectations!", author: "Sarah M.", company: "Tech Startup, Harare" },
        timedCards: [
            { place: 'Premium Quality', title: 'SHARP', title2: 'PRINTS', description: 'Crisp 1440dpi resolution printing that makes every detail pop. Your designs deserve the best quality output.' },
            { place: 'Fast Turnaround', title: 'SAME', title2: 'DAY', description: 'Rush orders completed in 24 hours. We understand deadlines and deliver on time, every time.' },
            { place: 'Business Cards', title: 'FIRST', title2: 'IMPRESSIONS', description: 'Premium business cards on quality stock that leave a lasting impression on every handshake.' },
            { place: 'Large Format', title: 'GO', title2: 'BIG', description: 'Banners, posters, and displays up to 5 meters wide. Make a statement that can\'t be ignored.' },
            { place: 'Bulk Orders', title: 'VOLUME', title2: 'DISCOUNTS', description: 'The more you print, the more you save. Special pricing for orders over 1000 pieces.' }
        ]
    },
    branding: {
        title: 'Branding & Design',
        tagline: 'Build a brand that customers remember and trust',
        description: 'Strategic brand identity design that captures your vision and resonates with your target audience. Complete branding solutions from concept to execution.',
        heroImage: '/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg',
        features: [
            { title: 'Custom Design', description: 'Unique concepts tailored to your business', icon: Star },
            { title: 'Full Ownership', description: 'All source files and rights included', icon: CheckCircle2 },
            { title: 'Unlimited Revisions', description: 'Perfect your brand identity', icon: Clock }
        ],
        services: [
            { name: 'Logo Design', description: 'Professional logo with 3 concepts', startingPrice: '$150', turnaround: '5-7 days', popular: true },
            { name: 'Complete Brand Identity', description: 'Logo, colors, fonts, guidelines', startingPrice: '$500', turnaround: '2-3 weeks', popular: true },
            { name: 'Marketing Materials', description: 'Business cards, letterheads, brochures', startingPrice: '$200', turnaround: '1-2 weeks', popular: false },
            { name: 'Packaging Design', description: 'Product packaging and labels', startingPrice: '$300', turnaround: '2-3 weeks', popular: false }
        ],
        benefits: [
            'Strategic brand positioning',
            'Multiple design concepts',
            'Unlimited revision rounds',
            'Print-ready file formats',
            'Brand guidelines document',
            'Ongoing design support'
        ],
        testimonial: { text: "The branding transformed our business. Sales increased 40% after the rebrand!", author: "James K.", company: "Retail Business, Harare" },
        timedCards: [
            { place: 'Visual Identity', title: 'LOGO', title2: 'DESIGN', description: 'Your logo is the face of your brand. We craft memorable symbols that capture your essence in a glance.' },
            { place: 'Color Psychology', title: 'BRAND', title2: 'COLORS', description: 'Strategic color palettes that evoke the right emotions and create instant brand recognition.' },
            { place: 'Typography', title: 'FONT', title2: 'STYLES', description: 'Custom typeface selections that speak your brand\'s language and enhance readability.' },
            { place: 'Guidelines', title: 'BRAND', title2: 'BOOK', description: 'Comprehensive style guides that ensure consistency across all your marketing materials.' },
            { place: 'Applications', title: 'COMPLETE', title2: 'IDENTITY', description: 'From business cards to billboards, we apply your new identity across every touchpoint.' }
        ]
    },
    'digital-marketing': {
        title: 'Digital Marketing',
        tagline: 'Grow your business with data-driven online strategies',
        description: 'Comprehensive digital marketing services that drive traffic, generate leads, and increase sales. From social media to SEO, we handle your online presence.',
        heroImage: '/images/hero/kaffie-co-7hEZILVOcFU-unsplash.jpg',
        features: [
            { title: 'Results-Driven', description: 'Measurable ROI on every campaign', icon: Star },
            { title: 'Local Expertise', description: 'Deep understanding of Zimbabwe market', icon: CheckCircle2 },
            { title: 'Full Management', description: 'We handle everything end-to-end', icon: Clock }
        ],
        services: [
            { name: 'Social Media Management', description: 'Facebook, Instagram, LinkedIn', startingPrice: '$200/month', turnaround: 'Ongoing', popular: true },
            { name: 'SEO Services', description: 'Rank higher on Google', startingPrice: '$300/month', turnaround: '3-6 months', popular: true },
            { name: 'Content Marketing', description: 'Blogs, videos, graphics', startingPrice: '$250/month', turnaround: 'Ongoing', popular: false },
            { name: 'Email Campaigns', description: 'Targeted email marketing', startingPrice: '$150/month', turnaround: 'Ongoing', popular: false }
        ],
        benefits: [
            'Monthly performance reports',
            'Dedicated account manager',
            'Custom content creation',
            'Ad campaign management',
            'Analytics and optimization',
            'Competitor analysis'
        ],
        testimonial: { text: "Our online sales tripled in 3 months. Soho Connect knows digital marketing!", author: "Patricia N.", company: "E-commerce Store, Harare" },
        timedCards: [
            { place: 'Strategic Planning', title: 'DIGITAL', title2: 'STRATEGY', description: 'We build comprehensive digital roadmaps that align with your business goals and audience insights.' },
            { place: 'Community Growth', title: 'SOCIAL', title2: 'MEDIA', description: 'Ignite conversations and build lasting relationships through vibrant, engaging content.' },
            { place: 'Performance Marketing', title: 'RAPID', title2: 'GROWTH', description: 'Scale your business with high-performance campaigns and advanced analytics.' },
            { place: 'Search Dominance', title: 'SEO', title2: 'MASTERY', description: 'Claim the top spot on search results. Be found exactly when customers need you.' },
            { place: 'Content Creation', title: 'VIRAL', title2: 'CONTENT', description: 'Compelling blogs, videos, and graphics that resonate with your target audience.' }
        ]
    },
    signage: {
        title: 'Signage & Displays',
        tagline: 'Make your presence known with professional signage',
        description: 'Custom signage and display solutions for businesses. From shop signs to vehicle wraps, we create eye-catching displays that attract customers.',
        heroImage: '/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg',
        features: [
            { title: 'Custom Fabrication', description: 'Made to your exact specifications', icon: Star },
            { title: 'Installation Included', description: 'Professional setup service', icon: CheckCircle2 },
            { title: 'Durable Materials', description: 'Weather-resistant options', icon: Clock }
        ],
        services: [
            { name: 'Shop Signs', description: 'Illuminated and non-lit options', startingPrice: '$200', turnaround: '1-2 weeks', popular: true },
            { name: 'Vehicle Wraps', description: 'Full or partial vehicle branding', startingPrice: '$400', turnaround: '3-5 days', popular: true },
            { name: 'Banners & Flags', description: 'Indoor and outdoor banners', startingPrice: '$50', turnaround: '1-2 days', popular: false },
            { name: 'Display Stands', description: 'Pop-up and roll-up banners', startingPrice: '$80', turnaround: '2-3 days', popular: false }
        ],
        benefits: [
            'Professional design included',
            'Site survey before installation',
            'Quality vinyl and materials',
            'Warranty on installations',
            'Maintenance services available',
            'Fast turnaround times'
        ],
        testimonial: { text: "Our new shop sign increased foot traffic by 60%. Worth every dollar!", author: "Michael T.", company: "Restaurant, Harare CBD" },
        timedCards: [
            { place: 'Storefront', title: 'SHOP', title2: 'SIGNS', description: 'Illuminated and non-lit signage that makes your business visible day and night.' },
            { place: 'Mobile Advertising', title: 'VEHICLE', title2: 'WRAPS', description: 'Turn your fleet into moving billboards. Full and partial vehicle branding solutions.' },
            { place: 'Events', title: 'BANNER', title2: 'DISPLAYS', description: 'Eye-catching banners, flags, and pop-up displays for trade shows and events.' },
            { place: 'Wayfinding', title: 'INDOOR', title2: 'SIGNAGE', description: 'Professional interior signs that guide customers and reinforce your brand.' },
            { place: 'Installation', title: 'PRO', title2: 'SETUP', description: 'Expert installation included with every order. We handle everything from design to delivery.' }
        ]
    },
    'payment-services': {
        title: 'Payment Services',
        tagline: 'Flexible payment options for your convenience',
        description: 'Multiple payment methods including EcoCash, mobile money, bank transfers, and flexible payment plans to make our services accessible to all businesses.',
        heroImage: '/images/hero/kaffie-co-DJb2MdMuzbU-unsplash.jpg',
        features: [
            { title: 'Multiple Options', description: 'Pay however you prefer', icon: CheckCircle2 },
            { title: 'Secure Transactions', description: 'Safe and encrypted payments', icon: Star },
            { title: 'Payment Plans', description: 'Installments for large orders', icon: DollarSign }
        ],
        services: [
            { name: 'EcoCash', description: 'Instant mobile money payments', startingPrice: 'No fees', turnaround: 'Instant', popular: true },
            { name: 'Bank Transfer', description: 'Direct bank deposits', startingPrice: 'No fees', turnaround: '24 hours', popular: true },
            { name: 'Payment Plans', description: 'Split payments over 3 months', startingPrice: 'Orders $500+', turnaround: 'Flexible', popular: false },
            { name: 'Cash on Delivery', description: 'Pay when you receive', startingPrice: 'Harare only', turnaround: 'Instant', popular: false }
        ],
        benefits: [
            'No hidden charges',
            'Instant payment confirmation',
            'Secure payment processing',
            'Invoice management',
            'Flexible terms for bulk orders',
            'Multiple currency options'
        ],
        testimonial: { text: "Payment plans made it easy to afford quality branding. Great service!", author: "Grace M.", company: "Beauty Salon, Harare" },
        timedCards: [
            { place: 'Mobile Money', title: 'ECO', title2: 'CASH', description: 'Instant mobile money payments accepted. Quick, convenient, and secure transactions.' },
            { place: 'Bank Transfers', title: 'DIRECT', title2: 'DEPOSIT', description: 'Traditional bank transfers with no hidden fees. Safe and reliable for all order sizes.' },
            { place: 'Flexible Terms', title: 'PAYMENT', title2: 'PLANS', description: 'Split large orders into manageable installments. Available for orders over $500.' },
            { place: 'On Delivery', title: 'PAY', title2: 'COD', description: 'Pay when you receive your order. Available for Harare deliveries only.' },
            { place: 'Multi-Currency', title: 'USD', title2: 'ZWL', description: 'Accept payments in multiple currencies. We make business easy for everyone.' }
        ]
    }
};
