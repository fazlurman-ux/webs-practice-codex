import React from 'react';

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface LegalLink {
  label: string;
  href: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
  legalLinks?: LegalLink[];
  copyrightText?: string;
}

export function Footer({
  socialLinks = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20v-7.21H5.41V9.25h2.88V7.25c0-2.85 1.74-4.41 4.29-4.41 1.22 0 2.27.09 2.57.13v2.98h-1.76c-1.38 0-1.65.66-1.65 1.62v2.12h3.29l-.43 3.54h-2.86V20h-2.78z" />
        </svg>
      ),
      label: 'Facebook',
      href: '#',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 002.856-3.637A9.867 9.867 0 0121.95 6.32a4.920 4.920 0 01-1.604.684 9.82 9.82 0 01-2.993-.812 4.823 4.823 0 01.224-1.04 9.822 9.822 0 01-6.254-5.296c-.75 1.371-.236 3.026.344 4.661-.5-.098-2.9-.468-4.514-2.372-.165-.264-.27-.604-.3-.962a4.822 4.822 0 01-.666-9.375 9.821 9.821 0 015.064 1.539 9.82 9.82 0 01-1.14-9.06 4.844 4.844 0 018.312 4.515M6.142 10.55c.356.066.748.414 1.013 1.005.265.591.06 1.659-.327 2.052-.388.393-1.247.278-1.602-.088-.355-.366-.266-1.386.088-1.882.354-.496 1.146-.722 1.828-.087z" />
        </svg>
      ),
      label: 'Twitter',
      href: '#',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m4.441 16.892c-2.102.144-6.784.144-8.883 0C5.172 16.781 5.125 15.588 5.125 12s.047-4.781.533-5.892c2.1-.144 6.782-.144 8.883 0 .486 1.111.533 2.304.533 5.892s-.047 4.781-.533 5.892zM9.622 15.96V8.04L15.316 12l-5.694 3.96z" />
        </svg>
      ),
      label: 'YouTube',
      href: '#',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      href: '#',
    },
  ],
  legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
  copyrightText = '© 2024 Your Company. All rights reserved.',
}: FooterProps) {
  return (
    <footer className="bg-dark-950 border-t border-dark-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark-100 uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-dark-300 hover:text-neon-purple transition-all duration-200 p-2 rounded-lg hover:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-neon-purple"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark-100 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-dark-300 hover:text-neon-purple transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple rounded px-2 py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 pt-8">
          {/* Copyright */}
          <div className="text-center text-dark-400 text-sm">
            <p>{copyrightText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
