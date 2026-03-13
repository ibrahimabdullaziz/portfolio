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
      'Full-stack real-time interview platform featuring collaborative coding with Monaco Editor, HD video/audio conferencing via Stream SDK, and Convex serverless backend.',
    image: '/assets/projects/vsync.png',
    link: 'https://vedio-sync.netlify.app/',
    technologies: [
      { name: 'Next.js 14', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Clerk Auth', icon: <Clerk key="clerk" /> },
      { name: 'Stream Video SDK', icon: <Stream key="stream" /> },
      { name: 'Convex', icon: <Convex key="convex" /> },
      { name: 'Monaco Editor', icon: <Monaco key="monaco" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Radix UI (Shadcn)', icon: <Radix key="radix" /> },
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
      'Premium cinematography discovery app built with React 19, achieving 95+ Lighthouse score. Uses TanStack Query v5 for optimized data fetching and Framer Motion for production-grade animations.',
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
