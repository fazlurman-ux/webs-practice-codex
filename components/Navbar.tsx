'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavbarProps {
  logoSlot?: React.ReactNode;
  navLinks?: Array<{ label: string; href: string }>;
  ctaButton?: React.ReactNode;
}

export function Navbar({
  logoSlot,
  navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ],
  ctaButton,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/80 backdrop-blur-md border-b border-dark-700'
          : 'bg-transparent border-b border-dark-900'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoSlot ? (
              logoSlot
            ) : (
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-gradient-neon-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">•</span>
                </div>
                <span className="hidden sm:inline font-bold text-lg neon-text-purple">
                  Brand
                </span>
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-dark-300 hover:text-neon-purple transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-dark-950 rounded px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            {ctaButton ? (
              ctaButton
            ) : (
              <button
                className="hidden sm:inline-flex px-6 py-2 bg-gradient-neon-purple text-white font-semibold rounded-lg hover:shadow-neon-purple transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-dark-950"
                aria-label="Get started with our product"
              >
                Get Started
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 text-dark-300 hover:text-neon-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-dark-950"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-t border-dark-700 bg-dark-900 py-4 space-y-2"
            role="region"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-dark-300 hover:text-neon-purple hover:bg-dark-800 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-purple"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {!ctaButton && (
              <button className="w-full m-2 px-4 py-2 bg-gradient-neon-purple text-white font-semibold rounded-lg hover:shadow-neon-purple transition-all duration-300">
                Get Started
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
