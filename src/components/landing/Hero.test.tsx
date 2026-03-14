import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Hero from './Hero';

// Mock dependencies
vi.mock('@/config/Hero', () => ({
  heroConfig: {
    name: 'Ibrahim',
    title: 'Software Engineer',
    skills: [
      { name: 'TypeScript', href: 'https://ts.com', component: 'TypeScript' },
    ],
    description: {
      template: 'I build stuff with {skills:0}.',
    },
    buttons: [
      { variant: 'default', text: 'Contact', href: '/contact', icon: 'Chat' },
    ],
  },
  skillComponents: {
    TypeScript: () => <div data-testid="ts-icon" />,
  },
  socialLinks: [
    { name: 'Github', href: 'https://github.com', icon: 'github-icon' },
  ],
}));

vi.mock('@/lib/hero', () => ({
  parseTemplate: vi.fn((template, skills) => [
    { type: 'text', text: 'I build stuff with ', key: '1' },
    { type: 'skill', skill: skills[0], key: '2' },
    { type: 'text', text: '.', key: '3' },
  ]),
}));

vi.mock('../common/Typewriter', () => ({
  default: ({ strings }: { strings: string[] }) => <span>{strings[0]}</span>,
}));

vi.mock('../ui/tooltip', () => ({
  Tooltip: ({ children }: any) => <div>{children}</div>,
  TooltipTrigger: ({ children }: any) => <div>{children}</div>,
  TooltipContent: ({ children }: any) => <div>{children}</div>,
  TooltipProvider: ({ children }: any) => <div>{children}</div>,
}));

describe('Hero Component', () => {
  it('renders correctly with names and titles', () => {
    render(<Hero />);

    expect(screen.getByText(/Hi, I'm Ibrahim/i)).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders the mocked typewriter text', () => {
    render(<Hero />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders description with parsed skills', () => {
    render(<Hero />);
    expect(screen.getByText('I build stuff with')).toBeInTheDocument();
    expect(screen.getByTestId('ts-icon')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Hero />);
    const githubLink = screen.getByRole('link', { name: /Github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
  });

  it('renders action buttons', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });
});
