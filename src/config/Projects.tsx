import Clerk from '@/components/technologies/Clerk';
import Convex from '@/components/technologies/Convex';
import Monaco from '@/components/technologies/Monaco';
import Motion from '@/components/technologies/Motion';
import NextJs from '@/components/technologies/NextJs';
import Radix from '@/components/technologies/Radix';
import ReactIcon from '@/components/technologies/ReactIcon';
import ReactQuery from '@/components/technologies/ReactQuery';
import Stream from '@/components/technologies/Stream';
import TMDB from '@/components/technologies/TMDB';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'V-Sync',
    description:
      'An enterprise-grade remote technical interview platform. Engineered to transform the hiring experience by bridging the gap between interviewers and candidates with seamless HD video interaction, real-time code synchronization via Monaco Editor, and a serverless backend powered by Convex and Stream SDK. Features resizable layouts, pre-flight device testing, and integrated assessment loops to eliminate tool context-switching.',
    image: '/assets/projects/vsync.png',
    link: 'https://vedio-sync.netlify.app/',
    technologies: [
      { name: 'Next.js 15 (App Router)', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Clerk Auth', icon: <Clerk key="clerk" /> },
      { name: 'Stream Video SDK', icon: <Stream key="stream" /> },
      { name: 'Convex Serverless', icon: <Convex key="convex" /> },
      { name: 'Monaco Editor', icon: <Monaco key="monaco" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Shadcn/UI', icon: <Radix key="radix" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz/remote-interview-platform',
    linkedin:
      'https://www.linkedin.com/posts/ibrahim-abdullaziz-894035339_%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B9%D9%84%D9%8A%D9%83%D9%85-%D9%88%D8%B1%D8%AD%D9%85%D8%A9-%D8%A7%D9%84%D9%84%D9%87-%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87-here-we-activity-7429453207480733696-Cr4K?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFTmabAB8v-vqHJqaHWgsdJ4uLiLcLYSuEE',
    live: 'https://vedio-sync.netlify.app/',
    details: false,
    projectDetailsPageSlug: '/projects/vsync',
    isWorking: true,
  },
  {
    title: 'UrMoviez',
    description:
      'A high-performance cinematic discovery platform built with a Performance-First Mindset.optimizing the Critical Rendering Path (CRP) and implementing aggressive lazy loading strategies. Powered by React 19 and TanStack Query v5 for sophisticated data fetching, with pixel-perfect animations via Framer Motion.',
    image: '/assets/projects/urmoviez.png',
    link: 'https://urmoviez.netlify.app/',
    technologies: [
      { name: 'React 19', icon: <ReactIcon key="react" /> },
      { name: 'TanStack Query v5', icon: <ReactQuery key="reactquery" /> },
      { name: 'TMDB API', icon: <TMDB key="tmdb" /> },
      { name: 'Framer Motion', icon: <Motion key="motion" /> },
      { name: 'Tailwind CSS v4', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz/movies',
    linkedin:
      'https://www.linkedin.com/posts/ibrahim-abdullaziz-894035339_%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B9%D9%84%D9%8A%D9%83%D9%85-here-we-go-with-new-project-activity-7425659508607275008-k_1k?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFTmabAB8v-vqHJqaHWgsdJ4uLiLcLYSuEE',
    live: 'https://urmoviez.netlify.app/',
    details: false,
    projectDetailsPageSlug: '/projects/urmoviez',
    isWorking: true,
  },
];
