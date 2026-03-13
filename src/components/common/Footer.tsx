'use client';

import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import { useLenis } from 'lenis/react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import React from 'react';

import Container from './Container';

export default function Footer() {
  const lenis = useLenis();
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element && lenis) {
        lenis.scrollTo(element, {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        window.history.pushState(null, '', href);
      }
    }
  };
  return (
    <Container className="py-12 mt-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright & Dev Info */}
        <div className="flex flex-col items-center md:items-start text-secondary text-sm">
          <p>
            {footerConfig.text}{' '}
            <b className="text-foreground">{footerConfig.developer}</b>
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()}. {footerConfig.copyright}
          </p>
        </div>

        {/* Mini Nav */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {navbarConfig.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="hover:text-primary transition-colors hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="hover:text-primary transition-colors hover:underline hover:underline-offset-4"
          >
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 text-secondary">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-label={link.name}
              className="hover:text-primary hover:scale-110 transition-all duration-200"
            >
              <div className="h-5 w-5">{link.icon}</div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
