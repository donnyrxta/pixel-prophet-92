/**
 * Breadcrumbs Component - SEO-friendly navigation breadcrumbs
 * Implements structured data for search engines
 */
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Create breadcrumb items from URL path
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...pathnames.map((path, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { label, href };
    }),
  ];

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `https://sohoconnect.co.zw${item.href}`
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'breadcrumb-schema';

    // Remove existing breadcrumb schema if present
    const existingScript = document.getElementById('breadcrumb-schema');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('breadcrumb-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname]);

  // Don't show breadcrumbs on homepage
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-muted/30 py-3 px-4">
      <div className="container mx-auto max-w-7xl">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-foreground font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;