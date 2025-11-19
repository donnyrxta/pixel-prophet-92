import Head from 'next/head';

/**
 * SEOHead is a reusable head component for Next.js pages. It sets
 * the document title, description meta tag and optional JSON-LD
 * structured data. Providing descriptive titles and metadata helps
 * search engines understand each page’s context and improves
 * discoverability. Schema objects are stringified and injected
 * using the `dangerouslySetInnerHTML` API.
 *
 * @param {Object} props
 * @param {string} props.title - The page title displayed in the browser tab.
 * @param {string} props.description - A brief meta description for search engines.
 * @param {Object} [props.schema] - Optional JSON-LD structured data to
 *   embed in the head. For example, product or collection schemas.
 */
export default function SEOHead({ title, description, schema }) {
  return (
    <Head>
      {/* Title appears in the browser tab and search results */}
      <title>{title}</title>
      {/* Description informs search engines and social platforms */}
      {description && <meta name="description" content={description} />}
      {/* Inject JSON-LD structured data when provided */}
      {schema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
}