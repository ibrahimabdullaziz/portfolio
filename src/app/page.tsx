import Container from '@/components/common/Container';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import Skills from '@/components/landing/Skills';
import dynamic from 'next/dynamic';
import React from 'react';

// Lazy-load below-the-fold sections to reduce LCP bundle size
const Achievements = dynamic(() => import('@/components/landing/Achievements'));
const Github = dynamic(() => import('@/components/landing/Github'));
const CTA = dynamic(() => import('@/components/landing/CTA'));

export default function Page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Skills />
      <Work />
      <Achievements />
      <Github />
      <CTA />
    </Container>
  );
}
