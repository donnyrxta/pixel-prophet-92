import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';

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
      {/* Wrap the entire layout with CartProvider so that both the Header
         and all pages can access cart state via useCart. */}
      <CartProvider>
        {/* The global header stays consistent across all pages and needs
            access to the cart context to display item counts. */}
        <Header />
        {/* Add top padding to account for the fixed header height */}
        <main className="pt-20">
          <Component {...pageProps} />
        </main>
      </CartProvider>
    </>
  );
}
