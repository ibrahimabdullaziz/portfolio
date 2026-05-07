import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import React from 'react';

export default function About() {
  return (
    <Container id="about" className="mt-20">
      <SectionHeading subHeading="Who I Am" heading="About" />
      <div className="mt-8 mx-auto max-w-3xl space-y-5">
        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
          I&apos;m Ibrahim, a frontend-focused full-stack developer from Egypt.
          I specialize in React and Next.js, building high-performance web
          applications that prioritize real users over impressive-sounding
          buzzwords. My work focuses on measurable outcomes — Core Web Vitals
          scores, bundle sizes, and actual user experience.
        </p>
        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
          I&apos;m currently a third-year Computer Science student at Kafr
          Elsheikh University (CGPA 3.31/4.0), and a certified React Developer
          from ITI&apos;s intensive 120-hour program. My CS foundation — data
          structures, algorithms, OOP, SOLID principles — directly informs how I
          architect frontend systems. I don&apos;t just use React; I understand{' '}
          <em>why</em> it works the way it does. I built a global state manager
          from scratch using the Observer Pattern to prove it.
        </p>
        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
          Beyond coursework, I&apos;ve shipped real-time collaborative tools
          (V-Sync — a remote interview platform with live code editing and HD
          video), automation bots serving 1,400+ subscribers, and open-source
          libraries with zero dependencies. I care about shipping things that
          work, not just things that look good in a demo.
        </p>
        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
          I&apos;m looking for a team where I can contribute to challenging
          frontend problems — complex state management, performance
          optimization, real-time interfaces — and grow alongside senior
          engineers who value clean architecture and thoughtful code review.
        </p>
      </div>
    </Container>
  );
}
