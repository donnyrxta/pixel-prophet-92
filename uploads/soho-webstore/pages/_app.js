import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Soho Connect</title>
        {/* Import Google fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* The global header stays consistent across all pages. */}
      <Header />
      {/* Add top padding to account for the fixed header height */}
      <main className="pt-20">
        <Component {...pageProps} />
      </main>
    </>
  );
}
