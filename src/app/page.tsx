import Container from '@/components/common/Container';
import Achievements from '@/components/landing/Achievements';
import CTA from '@/components/landing/CTA';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import Skills from '@/components/landing/Skills';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Work />
      <Skills />
      <Achievements />
      <Github />
      <CTA />
    </Container>
  );
}
