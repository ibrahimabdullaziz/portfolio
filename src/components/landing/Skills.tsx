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

type ThemeColor = 'blue' | 'emerald' | 'amber' | 'purple';

interface SkillCategory {
  title: string;
  description: string;
  proof: string;
  color: ThemeColor;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    description:
      'React and Next.js interfaces built for speed, clarity, and accessibility.',
    proof: 'Used across V-Sync, UrMoviez, the portfolio, and ITI projects.',
    color: 'blue',
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
    proof:
      'Redux Toolkit and TanStack Query at ITI; Convex realtime sync in V-Sync.',
    color: 'emerald',
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
    proof:
      'Web Vitals work, WCAG checks, Jest/RTL testing, GitHub-driven delivery.',
    color: 'amber',
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
    proof:
      'Studying DSA, OOP, OS, networks, databases, and software engineering.',
    color: 'purple',
    skills: [
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'C++', icon: <CPlusPlus key="cplusplus" /> },
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills);

const colorThemes = {
  emerald: {
    bg: 'bg-emerald-500/[0.03] dark:bg-emerald-500/[0.08]',
    border: 'border-emerald-500/30 dark:border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/50 dark:hover:border-emerald-500/50',
    hoverShadow: 'hover:shadow-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    proofBorder: 'border-emerald-500/30',
    pillHoverBorder: 'hover:border-emerald-500/40',
    pillHoverBg: 'hover:bg-emerald-500/10',
    pillHoverText: 'hover:text-emerald-700 dark:hover:text-emerald-300',
  },
  amber: {
    bg: 'bg-amber-500/[0.03] dark:bg-amber-500/[0.08]',
    border: 'border-amber-500/30 dark:border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50 dark:hover:border-amber-500/50',
    hoverShadow: 'hover:shadow-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    proofBorder: 'border-amber-500/30',
    pillHoverBorder: 'hover:border-amber-500/40',
    pillHoverBg: 'hover:bg-amber-500/10',
    pillHoverText: 'hover:text-amber-700 dark:hover:text-amber-300',
  },
  blue: {
    bg: 'bg-blue-500/[0.03] dark:bg-blue-500/[0.08]',
    border: 'border-blue-500/30 dark:border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/50 dark:hover:border-blue-500/50',
    hoverShadow: 'hover:shadow-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    proofBorder: 'border-blue-500/30',
    pillHoverBorder: 'hover:border-blue-500/40',
    pillHoverBg: 'hover:bg-blue-500/10',
    pillHoverText: 'hover:text-blue-700 dark:hover:text-blue-300',
  },
  purple: {
    bg: 'bg-purple-500/[0.03] dark:bg-purple-500/[0.08]',
    border: 'border-purple-500/30 dark:border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/50 dark:hover:border-purple-500/50',
    hoverShadow: 'hover:shadow-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    proofBorder: 'border-purple-500/30',
    pillHoverBorder: 'hover:border-purple-500/40',
    pillHoverBg: 'hover:bg-purple-500/10',
    pillHoverText: 'hover:text-purple-700 dark:hover:text-purple-300',
  },
};

function SkillGroup({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const theme = colorThemes[category.color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', y: 10 }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className={`rounded-lg border p-5 transition-all duration-300 hover:shadow-lg ${theme.bg} ${theme.border} ${theme.hoverBorder} ${theme.hoverShadow}`}
    >
      <div className="mb-5">
        <h3 className={`text-base font-semibold ${theme.text}`}>
          {category.title}
        </h3>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          {category.description}
        </p>
        <p
          className={`text-muted-foreground mt-3 border-l-2 pl-3 text-xs leading-relaxed ${theme.proofBorder}`}
        >
          {category.proof}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            role="img"
            aria-label={skill.name}
            className={`bg-background text-foreground/85 border-border/70 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all duration-300 hover:-translate-y-px hover:shadow-sm ${theme.pillHoverBorder} ${theme.pillHoverBg} ${theme.pillHoverText}`}
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
