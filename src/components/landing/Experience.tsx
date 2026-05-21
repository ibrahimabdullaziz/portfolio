'use client';

import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { experiences } from '@/config/Experience';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function Experience() {
  return (
    <Container id="experience" className="mt-20">
      <SectionHeading subHeading="Where I've Been" heading="Experience" />
      <div className="relative mt-8">
        {/* Timeline line */}
        <div className="from-primary/40 via-border to-border absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b md:left-1/2 md:-translate-x-px" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -40 : 40,
                filter: 'blur(8px)',
              }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-6 md:gap-12`}
            >
              {/* Timeline dot */}
              <div className="absolute top-6 left-4 z-10 md:left-1/2 md:-translate-x-1/2">
                <div
                  className={`h-3 w-3 rounded-full border-2 ${
                    exp.isCurrent
                      ? 'border-primary bg-primary shadow-[0_0_8px_var(--accent-glow)]'
                      : 'border-neutral-400 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800'
                  }`}
                />
              </div>

              {/* Content card */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}
              >
                <div className="border-border bg-card/80 hover:border-primary/20 rounded-xl border p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  {/* Header */}
                  <div
                    className={`flex items-center gap-3 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <Image
                        src={exp.image}
                        alt={exp.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div
                    className={`mt-3 flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <ul
                    className={`mt-3 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400 ${
                      index % 2 === 0 ? 'md:text-right' : ''
                    }`}
                  >
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="bg-primary/50 mt-2 block h-1.5 w-1.5 shrink-0 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div
                    className={`mt-4 flex flex-wrap gap-2 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    {exp.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="border-border/70 bg-muted/60 flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
                      >
                        <span className="h-3.5 w-3.5">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Current indicator */}
                  {exp.isCurrent && (
                    <div
                      className={`mt-3 flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                      Current
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
}
