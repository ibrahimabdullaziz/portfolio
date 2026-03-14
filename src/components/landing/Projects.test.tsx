import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import Projects from './Projects';

// Mock dependencies
vi.mock('@/config/Projects', () => ({
  projects: [
    { name: 'Project 1', description: 'Desc 1', slug: 'p1' },
    { name: 'Project 2', description: 'Desc 2', slug: 'p2' },
  ],
}));

vi.mock('../projects/ProjectList', () => ({
  ProjectList: ({ projects }: any) => (
    <div data-testid="project-list">
      {projects.map((p: any) => (
        <div key={p.slug}>{p.name}</div>
      ))}
    </div>
  ),
}));

describe('Projects Component', () => {
  it('renders section heading', () => {
    render(<Projects />);
    expect(screen.getByText(/Featured/i)).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders the ProjectList with sliced projects', () => {
    render(<Projects />);
    expect(screen.getByTestId('project-list')).toBeInTheDocument();
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('renders "Show all projects" button', () => {
    render(<Projects />);
    const link = screen.getByRole('link', { name: /Show all projects/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/projects');
  });
});
