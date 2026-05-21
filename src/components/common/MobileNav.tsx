'use client';

import { navbarConfig } from '@/config/Navbar';
import { useLenis } from 'lenis/react';
import { Menu, MessageSquareShare } from 'lucide-react';
import { Link } from 'next-view-transitions';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

interface MobileNavProps {
  onOpenMegatron: () => void;
}

export default function MobileNav({ onOpenMegatron }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // If it's an anchor link on the current page
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);

      if (element) {
        setOpen(false);
        // Delay to allow sheet closing animation and scroll-lock release
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(element, {
              offset: -80,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              immediate: false,
            });
          } else {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }

          // Update URL without refresh
          window.history.pushState(null, '', href);
        }, 150);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Navigation</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          {navbarConfig.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleLinkClick(e, item.href)
              }
              className="hover:text-primary hover:bg-muted rounded-md px-4 py-2 text-lg font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOpenMegatron();
            }}
            className="border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground group mt-4 flex items-center justify-between rounded-xl border-2 px-4 py-3 text-lg font-bold transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="border-primary/30 relative h-8 w-8 rounded-full border shadow-sm">
                <NextImage
                  src="/assets/megatron.png"
                  alt="Megatron"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span>Ask Megatron</span>
            </div>
            <MessageSquareShare className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
