'use client';

import { navbarConfig } from '@/config/Navbar';
import { Menu, MessageSquareShare } from 'lucide-react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
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
        <div className="flex flex-col gap-4 mt-8">
          {navbarConfig.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOpenMegatron();
            }}
            className="px-4 py-3 text-lg font-bold transition-all border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl flex items-center justify-between group mt-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-full border border-primary/30 shadow-sm">
                <Image
                  src="/assets/megatron.png"
                  alt="Megatron"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span>Ask Megatron</span>
            </div>
            <MessageSquareShare className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
