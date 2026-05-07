import Clerk from '@/components/technologies/Clerk';
import Convex from '@/components/technologies/Convex';
import JavaScript from '@/components/technologies/JavaScript';
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
      'Remote technical interview platform that eliminates tool context-switching. Interviewers and candidates co-write code in real time via Monaco Editor, connect over HD video through Stream SDK (WebRTC), and sync state instantly with Convex serverless backend. Built a WCAG-compliant, dark-mode interface with Shadcn/Radix achieving Core Web Vitals scores of LCP < 2.5s and FID < 100ms.',
    image: '/assets/projects/vsync.png',
    link: 'https://vedio-sync.netlify.app/',
    technologies: [
      { name: 'Next.js 14 (App Router)', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Clerk Auth', icon: <Clerk key="clerk" /> },
      { name: 'Stream Video SDK', icon: <Stream key="stream" /> },
      { name: 'Convex Serverless', icon: <Convex key="convex" /> },
      { name: 'Monaco Editor', icon: <Monaco key="monaco" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Shadcn/UI', icon: <Radix key="radix" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz/V-Sync',
    linkedin:
      'https://www.linkedin.com/posts/ibrahim-abdullaziz-894035339_%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B9%D9%84%D9%8A%D9%83%D9%85-%D9%88%D8%B1%D8%AD%D9%85%D8%A9-%D8%A7%D9%84%D9%84%D9%87-%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87-here-we-activity-7429453207480733696-Cr4K?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFTmabAB8v-vqHJqaHWgsdJ4uLiLcLYSuEE',
    live: 'https://vedio-sync.netlify.app/',
    details: true,
    projectDetailsPageSlug: '/projects/vsync',
    isWorking: true,
  },
  {
    title: 'CV Suite',
    description:
      'High-performance image processing lab providing a browser-based environment for classical Computer Vision algorithms. Implemented complex linear/non-linear filters, edge detection (Canny, Sobel), segmentation (Otsu, K-Means), and compression analysis (Huffman, LZW) with real-time millisecond execution tracking.',
    image: '/assets/projects/cv-suite.png',
    link: 'https://cv-suite.netlify.app/',
    technologies: [
      { name: 'Next.js 15', icon: <NextJs key="nextjs" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz/CV-Suite',
    live: 'https://cv-suite.netlify.app/',
    details: true,
    projectDetailsPageSlug: '/projects/cv-suite',
    isWorking: true,
  },
  {
    title: 'UrMoviez',
    description:
      'Cinema discovery platform built with React 19 Concurrent Features (Suspense, deferred rendering) serving a catalog of 10,000+ titles. TanStack Query v5 handles pagination, infinite scroll, and request deduplication — cutting redundant API calls. Multi-parameter search and genre-based filtering via TMDB API, with Framer Motion page transitions in a responsive Tailwind CSS v4 grid.',
    image: '/assets/projects/urmoviez.png',
    link: 'https://urmoviez.netlify.app/',
    technologies: [
      { name: 'React 19', icon: <ReactIcon key="react" /> },
      { name: 'TanStack Query v5', icon: <ReactQuery key="reactquery" /> },
      { name: 'TMDB API', icon: <TMDB key="tmdb" /> },
      { name: 'Framer Motion', icon: <Motion key="motion" /> },
      { name: 'Tailwind CSS v4', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz/Ur-Movies',
    linkedin:
      'https://www.linkedin.com/posts/ibrahim-abdullaziz-894035339_%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B9%D9%84%D9%8A%D9%83%D9%85-here-we-go-with-new-project-activity-7425659508607275008-k_1k?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFTmabAB8v-vqHJqaHWgsdJ4uLiLcLYSuEE',
    live: 'https://urmoviez.netlify.app/',
    details: true,
    projectDetailsPageSlug: '/projects/urmoviez',
    isWorking: true,
  },
  {
    title: 'React Custom Hooks Store',
    description:
      'Open-source global state manager built from scratch using the Observer Pattern with Redux-style slices — zero external dependencies. Components that only dispatch actions skip re-renders via shouldListen:false, demonstrating deep understanding of React rendering internals and subscription-based reactivity.',
    image: '/assets/projects/hooks-store.png',
    link: 'https://github.com/ibrahimabdullaziz/react-custom-hooks-store',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz/react-custom-hooks-store',
    live: 'https://github.com/ibrahimabdullaziz/react-custom-hooks-store',
    details: true,
    projectDetailsPageSlug: '/projects/react-hooks-store',
    isWorking: true,
  },
  {
    title: 'LinkedIn Job Bot',
    description:
      'Production automation tool scraping 8+ job boards (LinkedIn, Wuzzuf, Bayt, GulfTalent, Remotive, Himalayas) and broadcasting results to a Telegram channel with 1,400+ subscribers. Uses asyncio.gather for concurrent scraping, SQLite for deduplication, and runs 24/7 via Docker on Railway — no browser automation needed.',
    image: '/assets/projects/job-bot.png',
    link: 'https://github.com/ibrahimabdullaziz/job-scraping',
    technologies: [
      { name: 'Python', icon: <TypeScript key="python" /> },
      { name: 'asyncio', icon: <NextJs key="asyncio" /> },
      { name: 'Telegram Bot API', icon: <ReactIcon key="telegram" /> },
    ],
    github: 'https://github.com/ibrahimabdullaziz/job-scraping',
    live: 'https://github.com/ibrahimabdullaziz/job-scraping',
    details: true,
    projectDetailsPageSlug: '/projects/job-bot',
    isWorking: true,
  },
];
