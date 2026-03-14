import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import Skills, { allSkills } from './Skills';

// Mock dependencies
vi.mock('@/components/common/InfiniteSlider', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/components/common/SectionHeading', () => ({
  default: ({ subHeading, heading }: any) => (
    <div>
      <span>{subHeading}</span>
      <h2>{heading}</h2>
    </div>
  ),
}));

vi.mock('@/components/ui/tooltip', () => ({
  Tooltip: ({ children }: any) => <div>{children}</div>,
  TooltipTrigger: ({ children }: any) => <div>{children}</div>,
  TooltipContent: ({ children }: any) => <div>{children}</div>,
  TooltipProvider: ({ children }: any) => <div>{children}</div>,
}));

describe('Skills Component', () => {
  it('renders section heading', () => {
    render(<Skills />);
    expect(screen.getByText(/Technologies & Tools/i)).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders all skills from allSkills array', () => {
    render(<Skills />);

    allSkills.forEach((skill) => {
      // Every skill should be rendered with an aria-label
      const skillElements = screen.getAllByLabelText(skill.name);
      expect(skillElements.length).toBeGreaterThan(0);
    });
  });

  it('correctly renders all skills as images', () => {
    render(<Skills />);
    // Only count items with role="img" that have an aria-label matching a skill name
    const skillNames = allSkills.map((s) => s.name);
    const renderedSkills = screen
      .getAllByRole('img')
      .filter((el) => skillNames.includes(el.getAttribute('aria-label') || ''));
    expect(renderedSkills.length).toBe(allSkills.length);
  });
});
