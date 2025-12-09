/**
 * Schema.org Structured Data Components
 * Improves SEO and search engine discoverability
 */

import { BUSINESS_INFO, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

/**
 * Organization Schema - Main business information
 */
export const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.tagline,
    url: 'https://sohoconnect.co.zw',
    logo: 'https://sohoconnect.co.zw/images/brand/logo-color-icon.png',
    image: 'https://sohoconnect.co.zw/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg',
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7 Luck Street',
      addressLocality: 'Harare',
      addressRegion: 'Harare',
      postalCode: '',
      addressCountry: 'ZW'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-17.8252',
      longitude: '31.0335'
    },
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
        opens: '08:00',
        closes: '13:00'
      }
    ],
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.twitter
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Product Schema - For individual products
 */
interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  sku: string;
  category: string;
}

export const ProductSchema = ({
  name,
  description,
  image,
  price,
  currency,
  sku,
  category
}: ProductSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    category,
    brand: {
      '@type': 'Brand',
      name: BUSINESS_INFO.name
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: BUSINESS_INFO.name
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Service Schema - For service pages
 */
interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType: string;
  areaServed: string;
}

export const ServiceSchema = ({
  name,
  description,
  serviceType,
  areaServed
}: ServiceSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_INFO.name,
      telephone: CONTACT_INFO.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7 Luck Street',
        addressLocality: 'Harare',
        addressCountry: 'ZW'
      }
    },
    areaServed: {
      '@type': 'City',
      name: areaServed
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Breadcrumb Schema - For navigation
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://sohoconnect.co.zw${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Article Schema - For blog posts
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}

export const ArticleSchema = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author
}: ArticleSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: 'https://sohoconnect.co.zw/images/brand/logo-color-icon.png'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * FAQ Page Schema
 */
interface FAQPageSchemaProps {
  faqs: { question: string; answer: string }[];
}

export const FAQPageSchema = ({ faqs }: FAQPageSchemaProps) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};