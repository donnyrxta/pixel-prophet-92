/**
 * SEO Head Component - Dynamic meta tags and structured data
 * Use this component to override default SEO settings per page
 */
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg',
  schema
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Soho Connect`;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Add custom schema if provided
    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.id = 'custom-schema';

      const existingScript = document.getElementById('custom-schema');
      if (existingScript) {
        existingScript.remove();
      }

      document.head.appendChild(script);

      return () => {
        const scriptToRemove = document.getElementById('custom-schema');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [title, description, keywords, canonical, ogImage, schema]);

  return null;
};

export default SEOHead;