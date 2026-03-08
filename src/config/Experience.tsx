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
    position: 'React Developer Trainee',
    location: 'Tanta Branch, Egypt',
    image: '/assets/logo.png',
    description: [
      'Completed an intensive 120-hour React Development Summer Training program.',
      'Built production-grade React applications using modern patterns including hooks, context, and custom hooks.',
      'Developed deep expertise in React 19, component architecture, state management with Redux Toolkit, and data fetching with TanStack Query.',
      'Collaborated with fellow trainees on team projects following Agile/Scrum methodologies.',
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
    position: 'Computer Science Student (Level 3)',
    location: 'Kafr Elsheikh, Egypt',
    image: '/assets/logo.png',
    description: [
      'Pursuing a Bachelor of Computers and Information with a 3.21 GPA.',
      'Studied core CS fundamentals: Data Structures, Algorithms, OOP, SOLID Principles, and Software Development Life Cycle.',
      'Built multiple self-driven projects applying classroom knowledge to real-world problems.',
      'Actively participated in technical communities and open-source contributions.',
    ],
    startDate: '2023',
    endDate: 'Present',
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
