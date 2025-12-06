export type ProjectCategory = "All" | "Printing" | "Branding" | "Digital" | "Signage";

/**
 * Represents a single portfolio project case study.
 * This interface maps directly to the display cards on the portfolio page.
 */
export interface Project {
    id: number;           // Unique ID (auto-incremented by sync script)
    title: string;        // Display title (e.g. "Corporate Gazebo")
    client: string;       // Client name (e.g. "Econet")
    category: ProjectCategory; // Must match one of the valid categories
    image: string;        // Absolute path to image in public folder
    description: string;  // Short description shown on the card
    results: string[];    // Bullet points of success metrics
    testimonial?: string; // Optional client quote
}

export const portfolioProjects: Project[] = [
    {
        id: 1,
        title: "Corporate Gazebo Branding",
        client: "EcoCash / Econet",
        category: "Signage",
        image: "/images/portfolio/signage/advertising-gazebo.jpg",
        description: "High-visibility branded gazebo for outdoor events and corporate activations. Durable, weather-resistant material with vibrant full-color printing.",
        results: [
            "Increased event visibility",
            "Weather-resistant durability",
            "Easy setup and transport"
        ]
    },
    {
        id: 2,
        title: "Corporate Diaries 2024",
        client: "Multiple Corporate Clients",
        category: "Printing",
        image: "/images/portfolio/printing/diaries-stack.jpg",
        description: "Premium leather-bound corporate diaries with custom embossing and gold-leaf details. Bulk production for year-end gifting.",
        results: [
            "Over 5,000 units delivered",
            "Custom page inserts",
            "Gold foil logo embossing"
        ]
    },
    {
        id: 3,
        title: "Vehicle Fleet Branding",
        client: "Logistics Company",
        category: "Signage",
        image: "/images/portfolio/signage/car-branding-full.jpg",
        description: "Full vehicle wrap transformation. High-quality vinyl application ensuring brand consistency across the entire delivery fleet.",
        results: [
            "Mobile billboard advertising",
            "5-year vinyl guarantee",
            "Fleet-wide consistency"
        ]
    },
    {
        id: 4,
        title: "Custom Embroidered Apparel",
        client: "Fashion & Retail",
        category: "Branding",
        image: "/images/portfolio/branding/bucket-hat-embroidery.jpg",
        description: "Precision embroidery on branded merchandise. High-stitch count logos for premium look and feel on bucket hats and uniforms.",
        results: [
            "Premium merchandise quality",
            "Long-lasting embroidery",
            "Brand identity reinforcement"
        ]
    },
    {
        id: 5,
        title: "Event Branding Kit",
        client: "ZEC / Public Sector",
        category: "Signage",
        image: "/images/portfolio/signage/zec-tent-branding.jpg",
        description: "Complete event setup including branded tents and banners. cohesive visual identity for public engagements.",
        results: [
            "Professional event presence",
            "Unified brand visual",
            "Rapid deployment system"
        ]
    },
    {
        id: 6,
        title: "Corporate Merchandise",
        client: "Zitoga",
        category: "Branding",
        image: "/images/portfolio/branding/zitoga-caps.jpg",
        description: "Branded caps and corporate wear. Perfect for team building, staff uniforms, and promotional giveaways.",
        results: [
            "Staff uniformity",
            "Promotional impact",
            "High-quality fabric"
        ]
    },
    {
        id: 7,
        title: "Branded Umbrellas",
        client: "Various Clients",
        category: "Branding",
        image: "/images/portfolio/branding/corporate-umbrella.jpg",
        description: "Custom printed umbrellas for corporate gifts. Functional branding that travels with your clients.",
        results: [
            "Practical brand exposure",
            "High perceived value",
            "Durable mechanism"
        ]
    },
    {
        id: 8,
        title: "DTF Printed T-Shirts",
        client: "Zitoga",
        category: "Branding",
        image: "/images/portfolio/branding/dtf-printed-tshirts.jpg",
        description: "Full-color Direct-to-Film (DTF) printing on high-quality cotton t-shirts. Vibrant, long-lasting prints perfect for complex logos and designs.",
        results: [
            "Vibrant full-color detail",
            "Durable wash-fast print",
            "Premium cotton comfort"
        ]
    },
    {
        id: 9,
        title: "Screen Printed Event Shirts",
        client: "Methodist Church",
        category: "Printing",
        image: "/images/portfolio/printing/screen-printed-shirts.jpg",
        description: "Bulk screen printing for large events. Cost-effective solution for mass branding without compromising on visibility.",
        results: [
            "Cost-effective for bulk",
            "Bold, clear visibility",
            "Ideal for large gatherings"
        ]
    },
    {
        id: 10,
        title: "Corporate Caps",
        client: "Sinet",
        category: "Branding",
        image: "/images/portfolio/branding/corporate-caps-sinet.jpg",
        description: "Embroidered 6-panel caps. Structural fit with high-quality thread embroidery for a professional team look.",
        results: [
            "Professional uniform addition",
            "Sun protection for outdoor teams",
            "High-density embroidery"
        ]
    },
    {
        id: 11,
        title: "Executive Notebooks",
        client: "Zimnat",
        category: "Branding",
        image: "/images/portfolio/branding/zimnat-branded-notebooks.jpg",
        description: "Sleek black executive notebooks with subtle branding. The perfect corporate gift for stakeholders and partners.",
        results: [
            "Executive appeal",
            "Subtle, classy branding",
            "Functional corporate gift"
        ]
    },
    {
        id: 12,
        title: "Customised School Diaries",
        client: "Ferodah",
        category: "Printing",
        image: "/images/portfolio/printing/ferodah-diaries.jpg",
        description: "Customized school diaries with specialized layouts and inserts. Durable binding to last the entire academic year.",
        results: [
            "Custom academic layouts",
            "Durable binding",
            "School identity integration"
        ]
    },
    {
        id: 13,
        title: "Domed Stickers",
        client: "Corporate Branding",
        category: "Printing",
        image: "/images/portfolio/printing/domed-stickers-placeholder.jpg",
        description: "Premium 3D polyurethane resin coated stickers. Durable, scratch-resistant, and high-gloss finish adding a professional touch to products and equipment.",
        results: [
            "Premium 3D effect",
            "Weather & scratch resistant",
            "Ideal for equipment branding"
        ]
    }
    ,
    {
        id: 14,
        title: "Calendar 2024",
        client: "Valued Client",
        category: "Printing",
        image: "/images/portfolio/printing/calendar-2024.jpg",
        description: "High-quality Calendar 2024 project delivered to client specifications.",
        results: [
            "Professional finish",
            "Client satisfaction",
            "On-time delivery"
        ]
    },
    {
        id: 15,
        title: "Diaries Bulk",
        client: "Valued Client",
        category: "Printing",
        image: "/images/portfolio/printing/diaries-bulk.jpg",
        description: "High-quality Diaries Bulk project delivered to client specifications.",
        results: [
            "Professional finish",
            "Client satisfaction",
            "On-time delivery"
        ]
    },
    {
        id: 16,
        title: "Poly Masvingo Design",
        client: "Valued Client",
        category: "Printing",
        image: "/images/portfolio/printing/poly-masvingo-design.jpg",
        description: "High-quality Poly Masvingo Design project delivered to client specifications.",
        results: [
            "Professional finish",
            "Client satisfaction",
            "On-time delivery"
        ]
    },

    {
        id: 18,
        title: "Africa Umbrella",
        client: "Valued Client",
        category: "Branding",
        image: "/images/portfolio/branding/africa-umbrella.jpg",
        description: "High-quality Africa Umbrella project delivered to client specifications.",
        results: [
            "Professional finish",
            "Client satisfaction",
            "On-time delivery"
        ]
    }

];
