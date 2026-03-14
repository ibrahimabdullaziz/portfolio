import { ProjectCard } from '@/components/projects/ProjectCard';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// Minimal stable mocks
vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => (
      <article {...props}>{children}</article>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useMotionValue: () => ({ set: vi.fn() }),
  useSpring: () => ({}),
  useTransform: () => ({}),
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
  CardHeader: ({ children }: any) => <header>{children}</header>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardFooter: ({ children, className }: any) => (
    <footer className={className}>{children}</footer>
  ),
}));

vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: any) => <div>{children}</div>,
  DialogTrigger: ({ children }: any) => <div>{children}</div>,
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('../ui/tooltip', () => ({
  Tooltip: ({ children }: any) => <div>{children}</div>,
  TooltipTrigger: ({ children }: any) => <div>{children}</div>,
  TooltipContent: ({ children }: any) => <div>{children}</div>,
  TooltipProvider: ({ children }: any) => <div>{children}</div>,
}));

describe('ProjectCard Component', () => {
  const mockProject: any = {
    title: 'Test Project',
    description: 'Test description',
    projectDetailsPageSlug: '/projects/test',
    image: '/test.png',
    link: 'https://test.com',
    details: true,
    isWorking: true,
    technologies: [{ name: 'React', icon: <div data-testid="tech-icon" /> }],
    video: '/test.mp4',
  };

  it('renders basic project information', () => {
    render(<ProjectCard project={mockProject} />);
    expect(
      screen.getByRole('heading', { name: 'Test Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('All Systems Operational')).toBeInTheDocument();
  });

  it('renders technology icons', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByTestId('tech-icon')).toBeInTheDocument();
  });

  it('renders play button when video is provided', () => {
    render(<ProjectCard project={mockProject} />);
    // The play button is inside the DialogTrigger
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
