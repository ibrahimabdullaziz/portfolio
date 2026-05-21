'use client';

import { navbarConfig } from '@/config/Navbar';
import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import Container from './Container';
import MegatronChat from './MegatronChat';
import MobileNav from './MobileNav';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  const [isMegatronOpen, setIsMegatronOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const lenis = useLenis();

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

  // Track active section using IntersectionObserver
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = navbarConfig.navItems
      .map((item) => item.href.replace('/#', ''))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <Container className="bg-background/70 border-border/50 sticky top-0 z-20 border-b py-3 shadow-sm shadow-black/[0.03] backdrop-blur-xl dark:shadow-black/20">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <MobileNav onOpenMegatron={() => setIsMegatronOpen(true)} />

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-6">
              {navbarConfig.navItems.map((item) => {
                const sectionId = item.href.replace('/#', '');
                const isActive =
                  pathname === '/' && activeSection === sectionId;
                return (
                  <Link
                    className={cn(
                      'transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4',
                      isActive &&
                        'text-primary font-medium underline decoration-2 underline-offset-4',
                    )}
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsMegatronOpen(true)}
            variant="ghost"
            size="icon"
            className="border-primary/20 bg-primary/5 relative h-9 w-9 rounded-full border md:hidden"
          >
            <Image
              src="/assets/megatron.png"
              alt="Megatron"
              fill
              className="rounded-full object-cover p-1"
            />
          </Button>
          <Button
            onClick={() => setIsMegatronOpen(true)}
            variant="outline"
            size="sm"
            className="border-primary/20 bg-primary/5 hover:bg-primary/20 group hidden items-center gap-2 overflow-hidden rounded-full px-1 pr-3 shadow-sm transition-all duration-300 md:flex"
          >
            <div className="border-primary/30 group-hover:border-primary/50 relative h-7 w-7 rounded-full border transition-colors">
              <Image
                src="/assets/megatron.png"
                alt="Megatron"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-foreground text-xs font-bold tracking-tight uppercase">
              Ask Megatron
            </span>
          </Button>
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
      <MegatronChat open={isMegatronOpen} onOpenChange={setIsMegatronOpen} />
    </Container>
  );
}
