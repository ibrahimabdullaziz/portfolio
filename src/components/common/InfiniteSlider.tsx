'use client';

import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface InfiniteSliderProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}

export default function InfiniteSlider({
  children,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: InfiniteSliderProps) {
  return (
    <div
      className={cn(
        'relative flex w-full overflow-hidden',
        // Fade out edges
        '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around gap-4 py-4',
          direction === 'left'
            ? 'animate-marquee-left'
            : 'animate-marquee-right',
          pauseOnHover && 'hover-pause',
          speed === 'fast' && '[animation-duration:20s]',
          speed === 'normal' && '[animation-duration:40s]',
          speed === 'slow' && '[animation-duration:60s]',
        )}
      >
        {children}
        {/* Duplicate content for seamless scrolling */}
        {children}
      </div>
    </div>
  );
}
