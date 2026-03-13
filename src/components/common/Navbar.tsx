'use client';

import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '../ui/button';
import Container from './Container';
import MegatronChat from './MegatronChat';
import MobileNav from './MobileNav';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  const [isMegatronOpen, setIsMegatronOpen] = useState(false);

  return (
    <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-baseline gap-4">
          <MobileNav onOpenMegatron={() => setIsMegatronOpen(true)} />
          <div className="hidden md:flex items-center justify-center gap-6">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsMegatronOpen(true)}
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 rounded-full border-primary/20 bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm overflow-hidden group px-1 pr-3"
          >
            <div className="relative h-7 w-7 rounded-full border border-primary/30 group-hover:border-primary-foreground/30 transition-colors">
              <Image
                src="/assets/megatron.png"
                alt="Megatron"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <span className="font-bold tracking-tight text-xs uppercase">
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
