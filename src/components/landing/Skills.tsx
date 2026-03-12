import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import Github from '@/components/svgs/Github';
import CSS3 from '@/components/technologies/CSS3';
import HTML5 from '@/components/technologies/HTML5';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
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
  { name: 'React', icon: <ReactIcon key="react" /> },
  { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
  { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
  { name: 'HTML5', icon: <HTML5 key="html5" /> },
  { name: 'CSS3', icon: <CSS3 key="css3" /> },
  { name: 'Git & GitHub', icon: <Github key="github" /> },
];

export default function Skills() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Technologies & Tools" heading="Skills" />
      <div className="mt-8 flex flex-wrap gap-4">
        {allSkills.map((skill) => (
          <Tooltip key={skill.name}>
            <TooltipTrigger asChild>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 p-2 hover:bg-neutral-200 hover:cursor-pointer dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors">
                {skill.icon}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{skill.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
}
