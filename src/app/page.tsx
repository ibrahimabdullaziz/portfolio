import Container from '@/components/common/Container';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import About from '@/components/landing/About';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import Skills from '@/components/landing/Skills';
import dynamic from 'next/dynamic';
import React from 'react';

// Lazy-load below-the-fold sections to reduce LCP bundle size
const StatsBar = dynamic(() => import('@/components/landing/StatsBar'));
const Experience = dynamic(() => import('@/components/landing/Experience'));
const Achievements = dynamic(() => import('@/components/landing/Achievements'));
const Github = dynamic(() => import('@/components/landing/Github'));
const CTA = dynamic(() => import('@/components/landing/CTA'));

function SectionDivider() {
  return (
    <div className="mx-auto my-4 flex max-w-xs items-center justify-center">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}

export default function Page() {
  return (
    <Container className="min-h-screen py-16">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <StatsBar />
      </ErrorBoundary>
      <SectionDivider />
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      <SectionDivider />
      <ErrorBoundary>
        <Skills />
      </ErrorBoundary>
      <SectionDivider />
      <ErrorBoundary>
        <Work />
      </ErrorBoundary>
      <SectionDivider />
      <ErrorBoundary>
        <Experience />
      </ErrorBoundary>
      <SectionDivider />
      <ErrorBoundary>
        <Achievements />
      </ErrorBoundary>
      <ErrorBoundary>
        <Github />
      </ErrorBoundary>
      <ErrorBoundary>
        <CTA />
      </ErrorBoundary>
    </Container>
  );
}
