import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'ITI (Information Technology Institute)',
    position: 'React Development Intern',
    location: 'Tanta Branch, Egypt',
    image: '/assets/logo.png',
    description: [
      'Completed Egypt\'s national 120-hour intensive React program; selected for the advanced project track.',
      'Built React apps using Hooks, Context API, and Redux Toolkit to manage state across multi-page component trees.',
      'Applied TanStack Query v5 caching, background re-fetching, and optimistic updates to reduce redundant API calls.',
      'Built a shared component system following Atomic Design principles, improving consistency across 3+ projects.',
      'Used code splitting, lazy loading, and Web Vitals monitoring to achieve Core Web Vitals scores (LCP < 2.5s, FID < 100ms).',
    ],
    startDate: 'Summer 2025',
    endDate: 'Summer 2025',
    technologies: [
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },
    ],
    website: 'https://iti.gov.eg',
  },
  {
    isCurrent: false,
    company: 'Kafr Elsheikh University',
    position: 'B.Sc. Computer Science (CGPA 3.31/4.0)',
    location: 'Kafr Elsheikh, Egypt',
    image: '/assets/logo.png',
    description: [
      'Pursuing a Bachelor of Computers & Information Science — consistently ranking among top students in the CS department.',
      'Core coursework: Data Structures & Algorithms, OOP, Operating Systems, Computer Architecture, Computer Networks, Database Systems, Software Engineering.',
      'Built multiple self-driven projects applying classroom knowledge to real-world problems (V-Sync, UrMoviez, React Custom Hooks Store).',
      'Actively participated in technical communities and open-source contributions.',
    ],
    startDate: '2023',
    endDate: 'Present (Expected June 2027)',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'MongoDB',
        href: 'https://mongodb.com/',
        icon: <MongoDB />,
      },
    ],
    website: 'https://kfs.edu.eg',
  },
];
