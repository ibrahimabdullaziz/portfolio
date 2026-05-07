'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  hideOnPaths: string[];
}

export default function ConditionalLayout({
  children,
  hideOnPaths,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const shouldHide = hideOnPaths.includes(pathname);

  if (shouldHide) {
    return null;
  }

  return <>{children}</>;
}
