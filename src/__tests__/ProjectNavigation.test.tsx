import { ProjectNavigation } from '@/components/projects/ProjectNavigation';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// Mock components
vi.mock('next-view-transitions', () => ({
  Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: () => <hr data-testid="separator" />,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

// Mock svgs
vi.mock('../svgs/ArrowLeft', () => ({
  default: () => <div data-testid="arrow-left" />,
}));
vi.mock('../svgs/ArrowUUpRight', () => ({
  default: () => <div data-testid="arrow-up-right" />,
}));

describe('ProjectNavigation Component', () => {
  const previous = { title: 'Previous Title', slug: 'prev-slug' };
  const next = { title: 'Next Title', slug: 'next-slug' };

  it('renders nothing when no navigation is provided', () => {
    const { container } = render(
      <ProjectNavigation previous={null} next={null} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders both previous and next links when provided', () => {
    render(<ProjectNavigation previous={previous} next={next} />);

    expect(screen.getByText('Previous Title')).toBeInTheDocument();
    expect(screen.getByText('Next Title')).toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(2);
  });

  it('renders only previous link when next is null', () => {
    const prevOnly = { title: 'Only Previous', slug: 'prev-only' };
    render(<ProjectNavigation previous={prevOnly} next={null} />);

    expect(screen.getByText('Only Previous')).toBeInTheDocument();
    expect(screen.queryByText('Next Project')).not.toBeInTheDocument();
  });

  it('renders only next link when previous is null', () => {
    const nextOnly = { title: 'Only Next', slug: 'next-only' };
    render(<ProjectNavigation previous={null} next={nextOnly} />);

    expect(screen.queryByText('Previous Project')).not.toBeInTheDocument();
    expect(screen.getByText('Only Next')).toBeInTheDocument();
  });
});
