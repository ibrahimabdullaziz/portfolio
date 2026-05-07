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
import ReactIcon from '@/components/technologies/ReactIcon';
import ReactQuery from '@/components/technologies/ReactQuery';
import Redux from '@/components/technologies/Redux';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import React, { useCallback, useRef } from 'react';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
  accentClass: string;
  borderAccent: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core Stack',
    description: 'Technologies I build with daily',
    accentClass: 'from-blue-500/20 via-blue-400/5 to-transparent',
    borderAccent: 'hover:border-blue-400/40 dark:hover:border-blue-500/30',
    skills: [
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'React 19', icon: <ReactIcon key="react" /> },
      { name: 'Next.js 14', icon: <NextJs key="nextjs" /> },
      { name: 'Tailwind CSS v4', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Redux Toolkit', icon: <Redux key="redux" /> },
      { name: 'TanStack Query v5', icon: <ReactQuery key="reactquery" /> },
    ],
  },
  {
    title: 'Supporting Tools',
    description: 'Used in production projects',
    accentClass: 'from-violet-500/20 via-violet-400/5 to-transparent',
    borderAccent:
      'hover:border-violet-400/40 dark:hover:border-violet-500/30',
    skills: [
      { name: 'Framer Motion', icon: <FramerMotion key="framermotion" /> },
      { name: 'Shadcn UI', icon: <Shadcn key="shadcn" /> },
      { name: 'Convex', icon: <Convex key="convex" /> },
      { name: 'Jest', icon: <Jest key="jest" /> },
      { name: 'Git & GitHub', icon: <Github key="github" /> },
      { name: 'HTML5', icon: <HTML5 key="html5" /> },
      { name: 'CSS3', icon: <CSS3 key="css3" /> },
      { name: 'Netlify', icon: <Netlify key="netlify" /> },
      { name: 'Postman', icon: <Postman key="postman" /> },
    ],
  },
  {
    title: 'Currently Learning',
    description: 'Actively expanding into',
    accentClass: 'from-emerald-500/20 via-emerald-400/5 to-transparent',
    borderAccent:
      'hover:border-emerald-400/40 dark:hover:border-emerald-500/30',
    skills: [
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'C++', icon: <CPlusPlus key="cplusplus" /> },
    ],
  },
];

// Export flat list for backward compatibility
export const allSkills = skillCategories.flatMap((cat) => cat.skills);

function GlowCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background = `radial-gradient(250px circle at ${x}px ${y}px, var(--accent-blue-light) 0%, transparent 70%)`;
      glowRef.current.style.opacity = '0.12';
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = '0';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${category.borderAccent}`}
    >
      {/* Mouse-tracking radial glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />

      {/* Category Header */}
      <div className="relative mb-5">
        <h3 className="text-lg font-semibold text-foreground">
          {category.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {category.description}
        </p>
      </div>

      {/* Skills Grid */}
      <div className="relative flex flex-wrap gap-3">
        {category.skills.map((skill) => (
          <Tooltip key={skill.name}>
            <TooltipTrigger asChild>
              <div
                role="img"
                aria-label={skill.name}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-background/80 px-3 py-2 transition-all duration-200 hover:scale-[1.04] hover:border-primary/25 hover:bg-primary/5 hover:shadow-sm"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium text-foreground/80">
                  {skill.name}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{skill.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Container id="skills" className="mt-20">
      <SectionHeading subHeading="Technologies & Tools" heading="Skills" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {skillCategories.map((category, index) => (
          <GlowCard key={category.title} category={category} index={index} />
        ))}
      </div>
    </Container>
  );
}
