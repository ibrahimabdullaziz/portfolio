'use client';

import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { motion } from 'framer-motion';
import React from 'react';

export default function About() {
  return (
    <Container id="about" className="mt-20">
      <SectionHeading subHeading="Who I Am" heading="About" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="mt-8 max-w-3xl space-y-5"
      >
        <p className="text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
          I&apos;m Ibrahim, a frontend-focused full-stack developer from Egypt.
          I specialize in React and Next.js, building high-performance web
          applications that prioritize real users over impressive-sounding
          buzzwords. My work focuses on measurable outcomes — Core Web Vitals
          scores, bundle sizes, and actual user experience.
        </p>
        <p className="text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
          My CS foundation — data structures, algorithms, OOP, SOLID principles
          — directly informs how I architect frontend systems. I don&apos;t just
          use React; I understand <em>why</em> it works the way it does. I built
          a global state manager from scratch using the Observer Pattern to
          prove it.
        </p>
        <p className="text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
          I&apos;m looking for a team where I can contribute to challenging
          frontend problems — complex state management, performance
          optimization, real-time interfaces — and grow alongside senior
          engineers who value clean architecture and thoughtful code review.
        </p>
      </motion.div>
    </Container>
  );
}
