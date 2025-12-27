/**
 * SEO Head Component - Dynamic meta tags and structured data
 * Optimized for Google search and AEO (Answer Engine Optimization)
 * Use this component to override default SEO settings per page
 */
import { useEffect } from 'react';
import { OrganizationSchema, WebSiteSchema } from './SchemaMarkup';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonical?: string;
  ogImage?: string;
  schema?: object;
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://sohoconnect.co.zw/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg',
  schema,
  noIndex = false,
  article
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Soho Connect - Harare's Premier Design & Print Partner`;

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

    // Basic SEO
    updateMetaTag('description', description);
    if (keywords) {
      const keywordsStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      updateMetaTag('keywords', keywordsStr);
    }
    
    // Robots meta
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }
    
    // Open Graph
    updateMetaTag('og:type', article ? 'article' : 'website', true);
    updateMetaTag('og:site_name', 'Soho Connect', true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:url', canonical || window.location.href, true);
    updateMetaTag('og:locale', 'en_ZW', true);
    
    // Article-specific Open Graph
    if (article) {
      if (article.publishedTime) updateMetaTag('article:published_time', article.publishedTime, true);
      if (article.modifiedTime) updateMetaTag('article:modified_time', article.modifiedTime, true);
      if (article.author) updateMetaTag('article:author', article.author, true);
      if (article.section) updateMetaTag('article:section', article.section, true);
      if (article.tags) {
        article.tags.forEach(tag => {
          updateMetaTag('article:tag', tag, true);
        });
      }
    }
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@sohoconnect');
    updateMetaTag('twitter:creator', '@sohoconnect');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Additional SEO
    updateMetaTag('author', 'Soho Connect');
    updateMetaTag('geo.region', 'ZW-HA');
    updateMetaTag('geo.placename', 'Harare');
    updateMetaTag('geo.position', '-17.8252;31.0335');
    updateMetaTag('ICBM', '-17.8252, 31.0335');

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
  }, [title, description, keywords, canonical, ogImage, schema, noIndex, article]);

  return (
    <>
      {/* Organization Schema - Always include */}
      <OrganizationSchema />
      {/* WebSite Schema - For sitelinks search box */}
      <WebSiteSchema />
    </>
  );
};

export default SEOHead;