'use client';

import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import Github from '@/components/svgs/Github';
import CPlusPlus from '@/components/technologies/CPlusPlus';
import CSS3 from '@/components/technologies/CSS3';
import Convex from '@/components/technologies/Convex';
import FramerMotion from '@/components/technologies/FramerMotion';
import HTML5 from '@/components/technologies/HTML5';
import JavaScript from '@/components/technologies/JavaScript';
import Jest from '@/components/technologies/Jest';
import MongoDB from '@/components/technologies/MongoDB';
import Netlify from '@/components/technologies/Netlify';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import Radix from '@/components/technologies/Radix';
import ReactIcon from '@/components/technologies/ReactIcon';
import ReactQuery from '@/components/technologies/ReactQuery';
import Redux from '@/components/technologies/Redux';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { motion } from 'framer-motion';
import React from 'react';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  description: string;
  proof: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    description: 'React and Next.js interfaces built for speed, clarity, and accessibility.',
    proof: 'Used across V-Sync, UrMoviez, the portfolio, and ITI projects.',
    skills: [
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'React 19', icon: <ReactIcon key="react" /> },
      { name: 'Next.js 14', icon: <NextJs key="nextjs" /> },
      { name: 'Tailwind CSS v4', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Shadcn UI', icon: <Shadcn key="shadcn" /> },
      { name: 'Radix UI', icon: <Radix key="radix" /> },
    ],
  },
  {
    title: 'State, Data, and Realtime',
    description: 'Application state, async data, caching, and serverless sync.',
    proof: 'Redux Toolkit and TanStack Query at ITI; Convex realtime sync in V-Sync.',
    skills: [
      { name: 'Redux Toolkit', icon: <Redux key="redux" /> },
      { name: 'TanStack Query v5', icon: <ReactQuery key="reactquery" /> },
      { name: 'Convex', icon: <Convex key="convex" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
    ],
  },
  {
    title: 'Quality and Delivery',
    description: 'Testing, motion, tooling, and production-minded workflows.',
    proof: 'Web Vitals work, WCAG checks, Jest/RTL testing, GitHub-driven delivery.',
    skills: [
      { name: 'Framer Motion', icon: <FramerMotion key="framermotion" /> },
      { name: 'Jest', icon: <Jest key="jest" /> },
      { name: 'Git & GitHub', icon: <Github key="github" /> },
      { name: 'Postman', icon: <Postman key="postman" /> },
      { name: 'Netlify', icon: <Netlify key="netlify" /> },
      { name: 'HTML5', icon: <HTML5 key="html5" /> },
      { name: 'CSS3', icon: <CSS3 key="css3" /> },
    ],
  },
  {
    title: 'Backend and CS Growth',
    description: 'Current expansion path backed by CS fundamentals.',
    proof: 'Studying DSA, OOP, OS, networks, databases, and software engineering.',
    skills: [
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'C++', icon: <CPlusPlus key="cplusplus" /> },
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills);

function SkillGroup({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="rounded-lg border border-border/70 bg-card/60 p-5 transition-colors duration-200 hover:border-border"
    >
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">
          {category.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        <p className="mt-3 border-l border-border pl-3 text-xs leading-relaxed text-muted-foreground">
          {category.proof}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            role="img"
            aria-label={skill.name}
            className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background px-3 py-2 text-sm text-foreground/85 transition-colors duration-150 hover:border-foreground/20 hover:text-foreground"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
              {skill.icon}
            </span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Container id="skills" className="mt-20">
      <SectionHeading subHeading="Resume-aligned toolkit" heading="Skills" />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <SkillGroup key={category.title} category={category} index={index} />
        ))}
      </div>
    </Container>
  );
}
