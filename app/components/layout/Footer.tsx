'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Products': [
      { label: 'Prescription Glasses', href: '/glasses' },
      { label: 'Sunglasses', href: '/sunglasses' },
      { label: 'Contact Lenses', href: '/contacts' },
      { label: 'Accessories', href: '/accessories' },
    ],
    'Services': [
      { label: 'Eye Test', href: '/services/eye-test' },
      { label: 'Frame Fitting', href: '/services/fitting' },
      { label: 'Lens Replacement', href: '/services/lens-replacement' },
      { label: 'Repairs', href: '/services/repairs' },
    ],
    'Company': [
      { label: 'About Us', href: '/about' },
      { label: 'Our Stores', href: '/stores' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    'Support': [
      { label: 'Help Center', href: '/help' },
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Contact Us', href: '/contact' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.148-1.19C4.598 15.098 4.29 13.951 4.29 12.654c0-1.297.308-2.444 1.011-3.148.7-.7 1.851-1.19 3.148-1.19 1.297 0 2.448.49 3.148 1.19.704.704 1.012 1.851 1.012 3.148 0 1.297-.308 2.444-1.012 3.148-.7.7-1.851 1.19-3.148 1.19zm7.718-6.209c-.26 0-.464-.043-.612-.043-.148 0-.352.043-.612.043-.26 0-.464-.203-.464-.464 0-.26.204-.464.464-.464.26 0 .464.043.612.043.148 0 .352-.043.612-.043.26 0 .464.204.464.464 0 .261-.204.464-.464.464z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold font-serif mb-4">
              Stay in the Loop
            </h3>
            <p className="text-primary-200 mb-6">
              Get the latest updates on new collections, exclusive offers, and eyecare tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-accent-500 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-accent px-8 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold font-serif mb-4">
              Fielmann
            </div>
            <p className="text-primary-200 mb-6">
              Premium eyewear with exceptional quality and unmatched style. 
              Serving customers across Europe since 1972.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-primary-300 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-primary-200 text-sm">
              © {currentYear} Fielmann. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-primary-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-primary-200 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>

            {/* Country/Shop Selection */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary-200">Available in:</span>
              <select className="bg-primary-800 text-white border border-primary-700 rounded px-2 py-1 text-sm">
                <option value="DE">🇩🇪 Germany</option>
                <option value="AT">🇦🇹 Austria</option>
                <option value="PL">🇵🇱 Poland</option>
                <option value="CZ">🇨🇿 Czech Republic</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;