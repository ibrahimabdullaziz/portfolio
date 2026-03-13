import Container from '@/components/common/Container';
import InfiniteSlider from '@/components/common/InfiniteSlider';
import SectionHeading from '@/components/common/SectionHeading';
import Github from '@/components/svgs/Github';
import CPlusPlus from '@/components/technologies/CPlusPlus';
import CSS3 from '@/components/technologies/CSS3';
import Convex from '@/components/technologies/Convex';
import FramerMotion from '@/components/technologies/FramerMotion';
import HTML5 from '@/components/technologies/HTML5';
import JavaScript from '@/components/technologies/JavaScript';
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

export const allSkills = [
  { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
  { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  { name: 'C++', icon: <CPlusPlus key="cplusplus" /> },
  { name: 'React', icon: <ReactIcon key="react" /> },
  { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  { name: 'Redux Toolkit', icon: <Redux key="redux" /> },
  { name: 'TanStack Query', icon: <ReactQuery key="reactquery" /> },
  { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
  { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  { name: 'Shadcn UI', icon: <Shadcn key="shadcn" /> },
  { name: 'Framer Motion', icon: <FramerMotion key="framermotion" /> },
  { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
  { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
  { name: 'Convex', icon: <Convex key="convex" /> },
  { name: 'HTML5', icon: <HTML5 key="html5" /> },
  { name: 'CSS3', icon: <CSS3 key="css3" /> },
  { name: 'Git & GitHub', icon: <Github key="github" /> },
  { name: 'Netlify', icon: <Netlify key="netlify" /> },
  { name: 'Postman', icon: <Postman key="postman" /> },
];

export default function Skills() {
  const midpoint = Math.ceil(allSkills.length / 2);
  const topRowSkills = allSkills.slice(0, midpoint);
  const bottomRowSkills = allSkills.slice(midpoint);

  return (
    <Container id="skills" className="mt-20 overflow-hidden">
      <SectionHeading subHeading="Technologies & Tools" heading="Skills" />
      <div className="mt-8 flex flex-col gap-4">
        <InfiniteSlider direction="left" speed="normal">
          {topRowSkills.map((skill) => (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <div
                  role="img"
                  aria-label={skill.name}
                  className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-neutral-100/50 p-4 min-w-[100px] backdrop-blur-sm transition-all hover:scale-105 hover:bg-neutral-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-800 dark:hover:shadow-neutral-900/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform group-hover:scale-110">
                    {skill.icon}
                  </div>
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {skill.name}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{skill.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </InfiniteSlider>

        <InfiniteSlider direction="right" speed="normal">
          {bottomRowSkills.map((skill) => (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <div
                  role="img"
                  aria-label={skill.name}
                  className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-neutral-100/50 p-4 min-w-[100px] backdrop-blur-sm transition-all hover:scale-105 hover:bg-neutral-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-800 dark:hover:shadow-neutral-900/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform group-hover:scale-110">
                    {skill.icon}
                  </div>
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {skill.name}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{skill.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </InfiniteSlider>
      </div>
    </Container>
  );
}
