import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  TailwindCss: TailwindCss,
  NodeJs: NodeJs,
  MongoDB: MongoDB,
  JavaScript: JavaScript,
};

export const heroConfig = {
  name: 'Ibrahim',
  title: 'A Full Stack Software Engineer.',
  avatar: '/assets/avatar.jpg',

  skills: [
    {
      name: 'TypeScript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
    {
      name: 'Tailwind CSS',
      href: 'https://tailwindcss.com/',
      component: 'TailwindCss',
    },
    {
      name: 'Node.js',
      href: 'https://nodejs.org/',
      component: 'NodeJs',
    },
  ],

  description: {
    template:
      'I build high-performance, scalable web apps using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. Specialized in <b>component architecture</b>, <b>state management</b>, and <b>UI performance optimization</b>.',
  },

  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/Eng_Ibrahim00',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ibrahim-abdullaziz-894035339',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/ibrahimabdullaziz',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:ibrahimabdullaziz55@gmail.com',
    icon: <Mail />,
  },
];
