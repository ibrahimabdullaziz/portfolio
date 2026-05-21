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

type ThemeColor = 'blue' | 'emerald' | 'lime' | 'purple';

interface SkillCategory {
  title: string;
  color: ThemeColor;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    color: 'blue',
    skills: [
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'React 19', icon: <ReactIcon key="react" /> },
      { name: 'Next.js 14', icon: <NextJs key="nextjs" /> },
      { name: 'Tailwind CSS v4', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Shadcn UI', icon: <Shadcn key="shadcn" /> },
      { name: 'Radix UI', icon: <Radix key="radix" /> },
      { name: 'HTML5', icon: <HTML5 key="html5" /> },
      { name: 'CSS3', icon: <CSS3 key="css3" /> },
    ],
  },
  {
    title: 'State, Data & Realtime',
    color: 'emerald',
    skills: [
      { name: 'Redux Toolkit', icon: <Redux key="redux" /> },
      { name: 'TanStack Query v5', icon: <ReactQuery key="reactquery" /> },
      { name: 'Convex', icon: <Convex key="convex" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
    ],
  },
  {
    title: 'Tooling & Delivery',
    color: 'lime',
    skills: [
      { name: 'Framer Motion', icon: <FramerMotion key="framermotion" /> },
      { name: 'Jest', icon: <Jest key="jest" /> },
      { name: 'Git & GitHub', icon: <Github key="github" /> },
      { name: 'Postman', icon: <Postman key="postman" /> },
      { name: 'Netlify', icon: <Netlify key="netlify" /> },
    ],
  },
  {
    title: 'Growing Into',
    color: 'purple',
    skills: [{ name: 'C++', icon: <CPlusPlus key="cplusplus" /> }],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills);

const titleColors: Record<ThemeColor, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  lime: 'text-lime-600 dark:text-lime-400',
  purple: 'text-purple-600 dark:text-purple-400',
};

const pillHoverStyles: Record<ThemeColor, string> = {
  blue: 'hover:border-blue-400/50 hover:bg-blue-500/8 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-blue-500/10',
  emerald:
    'hover:border-emerald-400/50 hover:bg-emerald-500/8 hover:text-emerald-700 dark:hover:text-emerald-300 hover:shadow-emerald-500/10',
  lime:
    'hover:border-lime-400/50 hover:bg-lime-500/8 hover:text-lime-700 dark:hover:text-lime-300 hover:shadow-lime-500/10',
  purple:
    'hover:border-purple-400/50 hover:bg-purple-500/8 hover:text-purple-700 dark:hover:text-purple-300 hover:shadow-purple-500/10',
};

function SkillGroup({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.1,
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Category label */}
      <p
        className={`mb-3 text-xs font-semibold tracking-widest uppercase ${titleColors[category.color]}`}
      >
        {category.title}
      </p>

      {/* Skills flow */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            role="img"
            aria-label={skill.name}
            className={`group border-border/60 bg-card text-foreground/80 inline-flex cursor-default items-center gap-2.5 rounded-lg border px-3.5 py-2 text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${pillHoverStyles[category.color]}`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {skill.icon}
            </span>
            <span className="font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Container id="skills" className="mt-20">
      <SectionHeading subHeading="What I Work With" heading="Tech Stack" />
      <div className="mt-10 space-y-8">
        {skillCategories.map((category, index) => (
          <SkillGroup key={category.title} category={category} index={index} />
        ))}
      </div>
    </Container>
  );
}
