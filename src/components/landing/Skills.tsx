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
import React from 'react';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core Stack',
    description: 'Technologies I build with daily',
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

export default function Skills() {
  return (
    <Container id="skills" className="mt-20">
      <SectionHeading subHeading="Technologies & Tools" heading="Skills" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="group rounded-xl border border-neutral-200 bg-neutral-50/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/30 dark:hover:shadow-neutral-900/50"
          >
            {/* Category Header */}
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {category.description}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <div
                      role="img"
                      aria-label={skill.name}
                      className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 transition-all duration-200 hover:scale-[1.03] hover:bg-neutral-100 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-800/60 dark:hover:bg-neutral-700/80"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        {skill.icon}
                      </div>
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
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
          </div>
        ))}
      </div>
    </Container>
  );
}
