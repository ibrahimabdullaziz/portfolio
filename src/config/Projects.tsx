import Motion from '@/components/technologies/Motion';
import NextJs from '@/components/technologies/NextJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'V-Sync',
    description:
      'Full-stack real-time interview platform featuring collaborative coding with Monaco Editor, HD video/audio conferencing via Stream SDK, and Convex serverless backend.',
    image: '/project/vsync.png',
    link: '#',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz',
    live: '#',
    details: false,
    projectDetailsPageSlug: '/projects/vsync',
    isWorking: true,
  },
  {
    title: 'UrMoviez',
    description:
      'Premium cinematography discovery app built with React 19, achieving 95+ Lighthouse score. Uses TanStack Query v5 for optimized data fetching and Framer Motion for production-grade animations.',
    image: '/project/urmoviez.png',
    link: '#',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Motion', icon: <Motion key="motion" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz',
    live: '#',
    details: false,
    projectDetailsPageSlug: '/projects/urmoviez',
    isWorking: true,
  },
];
