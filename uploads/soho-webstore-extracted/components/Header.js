import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

/**
 * Global header component used across the Soho Connect webstore. It
 * renders the company logo, primary navigation links and a mobile
 * menu. The header sticks to the top of the viewport and uses the
 * Royal Blue colour palette defined in Tailwind. On small screens
 * the menu toggles between open and closed states. Additional links
 * can be added by editing the `links` array.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/store', label: 'Store' },
    { href: '/category/design-services', label: 'Design' },
    { href: '/category/print-products', label: 'Print' },
    { href: '/category/corporate-wear', label: 'Corporate Wear' },
    { href: '/category/cctv-security', label: 'CCTV' },
    { href: '/category/marketing', label: 'Marketing' },
  ];
  return (
    <header className="backdrop-blur bg-white/70 border-b border-white/20 shadow-md fixed top-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* The logo asset lives in the public folder. */}
          <Image src="/logo-icon.png" width={40} height={40} alt="Soho Connect logo" />
          <span className="font-display text-xl text-primary hidden sm:block">
            Soho Connect
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* Cart link: shows total item count. The link goes to the cart page. */}
          <Link href="/cart" className="relative text-gray-700 hover:text-primary">
            {/* Simple cart icon using SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7H19M7 13l-2 9h12M9 21a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {/* Simple hamburger/cross icon using CSS */}
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </div>
      {open && (
        <div className="md:hidden backdrop-blur-lg bg-white/80 border-t border-white/20">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 border-b border-white/20 text-gray-700 hover:bg-primary/10 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Cart link for mobile */}
          <Link
            href="/cart"
            className="block px-4 py-3 border-b border-white/20 text-gray-700 hover:bg-primary/10 hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Cart
            {totalItems > 0 && (
              <span className="ml-2 inline-block bg-red-500 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}