/**
 * Category configuration for the Soho Connect webstore. Each entry
 * defines the slug identifier, display name and hero content for
 * dedicated landing pages. The hero includes a tagline, title,
 * description, background image and an array of feature cards. These
 * cards will cycle automatically on the page to showcase different
 * benefits or sub‑services offered under the category. Feel free to
 * customise the images and copy to better suit your business focus.
 */
export const categories = [
  {
    id: 'design-services',
    name: 'Design Services',
    hero: {
      tagline: 'Elevate Your Brand',
      title: 'Design Services',
      description:
        'Professional logo design, brand kits and marketing materials tailored to your business.',
      image:
        'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1600',
      features: [
        {
          title: 'Custom Logo Design',
          description: 'Memorable logos that reflect your unique identity.',
        },
        {
          title: 'Brand Style Guides',
          description: 'Comprehensive brand books and guidelines.',
        },
        {
          title: 'Marketing Collateral',
          description: 'Flyers, brochures and digital assets for every campaign.',
        },
      ],
    },
  },
  {
    id: 'print-products',
    name: 'Print Products',
    hero: {
      tagline: 'Print Excellence',
      title: 'Print Products',
      description:
        'High‑quality printing solutions for flyers, brochures, banners and more.',
      image:
        'https://images.pexels.com/photos/5720564/pexels-photo-5720564.jpeg?auto=compress&cs=tinysrgb&w=1600',
      features: [
        {
          title: 'Offset & Digital Printing',
          description: 'Professional printing with vibrant colours and crisp detail.',
        },
        {
          title: 'Eco Friendly Options',
          description: 'Sustainable materials and inks for a greener planet.',
        },
        {
          title: 'Large Format',
          description: 'Banners, posters and signage for events and launches.',
        },
      ],
    },
  },
  {
    id: 'corporate-wear',
    name: 'Corporate Wear',
    hero: {
      tagline: 'Dress Your Brand',
      title: 'Corporate Wear',
      description:
        'Quality apparel and uniforms branded with your logo. Make your team look and feel professional.',
      image:
        'https://images.pexels.com/photos/6140207/pexels-photo-6140207.jpeg?auto=compress&cs=tinysrgb&w=1600',
      features: [
        {
          title: 'Branded Apparel',
          description: 'T‑shirts, polos, caps and jackets customised with your brand.',
        },
        {
          title: 'Workwear',
          description: 'Durable uniforms designed for various industries and environments.',
        },
        {
          title: 'Custom Embroidery',
          description: 'High‑quality stitching for logos and names on any garment.',
        },
      ],
    },
  },
  {
    id: 'cctv-security',
    name: 'CCTV & Security',
    hero: {
      tagline: 'Secure Your Premises',
      title: 'CCTV & Security',
      description:
        'Reliable surveillance systems, access control and visitor management solutions for peace of mind.',
      image:
        'https://images.pexels.com/photos/7784241/pexels-photo-7784241.jpeg?auto=compress&cs=tinysrgb&w=1600',
      features: [
        {
          title: 'Solar CCTV Kits',
          description: 'Off‑grid surveillance with solar power and UPS backup.',
        },
        {
          title: 'Retail Shrinkage Solutions',
          description: 'Reduce losses with smart monitoring and compliance signage.',
        },
        {
          title: 'Visitor Management',
          description: 'Efficient sign‑in, ID printing and access control systems.',
        },
      ],
    },
  },
  {
    id: 'marketing',
    name: 'Marketing Products',
    hero: {
      tagline: 'Engage Your Audience',
      title: 'Marketing Products',
      description:
        'Innovative marketing tools to connect with your customers and drive engagement.',
      image:
        'https://images.pexels.com/photos/3952237/pexels-photo-3952237.jpeg?auto=compress&cs=tinysrgb&w=1600',
      features: [
        {
          title: 'Smart Business Cards',
          description: 'NFC‑enabled cards to share your details with a single tap.',
        },
        {
          title: 'Pop‑Up Kits',
          description: 'Everything you need for markets and events, from banners to counter mats.',
        },
        {
          title: 'Social Media Packs',
          description: 'Ready‑to‑use templates for digital marketing and campaigns.',
        },
      ],
    },
  },
];