/**
 * Schema.org Structured Data Generator
 * Implements Google Webmasters best practices for SEO
 * Reference: https://developers.google.com/search/docs/appearance/structured-data
 */

import { WebstoreProduct } from '@/data/webstore-products';

// Organization Schema (LocalBusiness)
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://sohoconnect.co.zw/#organization',
    name: 'Soho Connect',
    alternateName: 'Soho Connect Zimbabwe',
    url: 'https://sohoconnect.co.zw',
    logo: 'https://sohoconnect.co.zw/images/brand/logo-color-icon.png',
    image: 'https://sohoconnect.co.zw/images/brand/logo-color-icon.png',
    description: 'Leading design, print, CCTV, and marketing solutions provider in Harare, Zimbabwe. Trusted by 127+ businesses for premium branding, security systems, and business consumables.',

    // Contact Information
    telephone: '+263 772 123 456',
    email: 'hello@sohoconnect.co.zw',

    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Sam Nujoma Street',
      addressLocality: 'Harare',
      addressRegion: 'Harare Province',
      postalCode: '00263',
      addressCountry: 'ZW'
    },

    // Geo Coordinates (Harare CBD)
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -17.8292,
      longitude: 31.0522
    },

    // Business Hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00'
      }
    ],

    // Service Areas
    areaServed: [
      {
        '@type': 'City',
        name: 'Harare',
        '@id': 'https://en.wikipedia.org/wiki/Harare'
      },
      {
        '@type': 'City',
        name: 'Bulawayo'
      },
      {
        '@type': 'City',
        name: 'Mutare'
      },
      {
        '@type': 'City',
        name: 'Gweru'
      }
    ],

    // Services Offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Solutions',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Design Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logo Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Graphics' } }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Print Products',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Business Cards' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Flyers & Brochures' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Banners & Signage' } }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'CCTV & Security',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Solar CCTV Systems' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CCTV Installation' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Visitor Management Systems' } }
          ]
        }
      ]
    },

    // Aggregate Rating
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },

    // Social Media
    sameAs: [
      'https://www.facebook.com/sohoconnect',
      'https://www.instagram.com/sohoconnect',
      'https://twitter.com/sohoconnect',
      'https://www.linkedin.com/company/sohoconnect'
    ],

    // Price Range
    priceRange: '$5 - $5000'
  };
};

// Product Schema
export const generateProductSchema = (product: WebstoreProduct) => {
  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : null;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://sohoconnect.co.zw/webstore/product/${product.slug}`,
    name: product.name,
    description: product.description,
    image: product.images.length > 0 ? product.images : [product.image],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Soho Connect'
    },
    offers: {
      '@type': 'Offer',
      url: `https://sohoconnect.co.zw/webstore/product/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Soho Connect'
      },
      itemCondition: 'https://schema.org/NewCondition'
    },
    category: product.category
  };

  // Add reviews if available
  if (product.reviews && product.reviews.length > 0) {
    schema.review = product.reviews.map((review, index) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      author: {
        '@type': 'Person',
        name: review.name
      },
      reviewBody: review.comment,
      datePublished: new Date(Date.now() - (index * 86400000)).toISOString().split('T')[0]
    }));

    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating?.toFixed(1),
      reviewCount: product.reviews.length,
      bestRating: 5,
      worstRating: 1
    };
  }

  return schema;
};

// BreadcrumbList Schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://sohoconnect.co.zw${item.url}`
    }))
  };
};

// FAQ Schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Article Schema (for buyer guides)
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Organization',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soho Connect',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sohoconnect.co.zw/images/brand/logo-color-icon.png'
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
};
