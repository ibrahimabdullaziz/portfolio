'use client';

import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { motion } from 'framer-motion';
import React from 'react';

export default function About() {
  return (
    <Container id="about" className="mt-20">
      <SectionHeading subHeading="Background" heading="About Me" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="border-primary/25 mt-8 max-w-3xl space-y-5 border-l-2 pl-6"
      >
        <p className="text-[15px] leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
          I&apos;m Ibrahim — a developer from Egypt who builds fast, accessible
          web applications with React and Next.js. I care about what users
          actually experience: load times, interaction quality, and interfaces
          that work on every device.
        </p>
        <p className="text-[15px] leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
          My CS background — data structures, algorithms, design patterns —
          shapes how I think about architecture. I built a global state manager
          from scratch using the Observer Pattern, not because I had to, but
          because I wanted to understand the machinery underneath.
        </p>
        <p className="text-[15px] leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
          I&apos;m looking for a team that values clean code and honest
          engineering — complex problems, thoughtful code review, and room to
          grow alongside senior engineers who care about craft.
        </p>
      </motion.div>
    </Container>
  );
}
