'use client';

import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { motion } from 'framer-motion';
import { Award, Code2, GraduationCap, MapPin } from 'lucide-react';
import React from 'react';

const highlights = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: 'CS Student',
    detail: 'Kafr Elsheikh University · CGPA 3.31/4.0',
    accent: 'from-blue-500/15 to-blue-600/5',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: 'ITI Certified',
    detail: '120-hour intensive React program',
    accent: 'from-amber-500/15 to-amber-600/5',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: '5 Shipped Projects',
    detail: 'Real-time · Automation · Open-source',
    accent: 'from-primary/15 to-primary/5',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Egypt',
    detail: 'Open to remote worldwide',
    accent: 'from-emerald-500/15 to-emerald-600/5',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
];

export default function About() {
  return (
    <Container id="about" className="mt-20">
      <SectionHeading subHeading="Who I Am" heading="About" />
      <div className="mt-8 grid gap-8 md:grid-cols-5 md:gap-12">
        {/* Left column — biography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-5 md:col-span-3"
        >
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
            I&apos;m Ibrahim, a frontend-focused full-stack developer from
            Egypt. I specialize in React and Next.js, building high-performance
            web applications that prioritize real users over
            impressive-sounding buzzwords. My work focuses on measurable
            outcomes — Core Web Vitals scores, bundle sizes, and actual user
            experience.
          </p>
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
            My CS foundation — data structures, algorithms, OOP, SOLID
            principles — directly informs how I architect frontend systems. I
            don&apos;t just use React; I understand <em>why</em> it works the
            way it does. I built a global state manager from scratch using the
            Observer Pattern to prove it.
          </p>
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
            I&apos;m looking for a team where I can contribute to challenging
            frontend problems — complex state management, performance
            optimization, real-time interfaces — and grow alongside senior
            engineers who value clean architecture and thoughtful code review.
          </p>
        </motion.div>

        {/* Right column — highlight cards */}
        <div className="flex flex-col gap-3 md:col-span-2">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/80 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
            >
              {/* Subtle gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
}
