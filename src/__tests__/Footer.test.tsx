import Footer from '@/components/common/Footer';
import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { fireEvent, render, screen } from '@testing-library/react';
import { useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('lenis/react', () => ({
  useLenis: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('@/config/Footer', () => ({
  footerConfig: {
    text: 'Developed by',
    developer: 'Ibrahim Abdullaziz',
    copyright: 'All rights reserved',
  },
}));

vi.mock('@/config/Hero', () => ({
  socialLinks: [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: 'github-icon', // Simplified from JSX
    },
  ],
}));

vi.mock('@/config/Navbar', () => ({
  navbarConfig: {
    navItems: [{ label: 'Home', href: '/#home' }],
  },
}));

describe('Footer Component', () => {
  const mockScrollTo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLenis as any).mockReturnValue({ scrollTo: mockScrollTo });
    (usePathname as any).mockReturnValue('/');

    // Mock getElementById for scroll testing
    document.getElementById = vi
      .fn()
      .mockReturnValue(document.createElement('div'));
  });

  it('renders correctly with footer configuration', () => {
    render(<Footer />);

    expect(screen.getByText(/Developed by/i)).toBeInTheDocument();
    expect(screen.getByText('Ibrahim Abdullaziz')).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`© ${new Date().getFullYear()}. All rights reserved`, 'i'),
      ),
    ).toBeInTheDocument();
  });

  it('renders navigation links from navbarConfig', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
  });

  it('handles anchor link click with lenis scroll when on home page', () => {
    render(<Footer />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    fireEvent.click(homeLink);

    expect(mockScrollTo).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        offset: -80,
        duration: 1.5,
      }),
    );
  });

  it('navigates normally when not an anchor link or not on home page', () => {
    (usePathname as any).mockReturnValue('/projects');
    render(<Footer />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    fireEvent.click(homeLink);

    // Should not call lenis.scrollTo if not on home page (pathname !== '/')
    expect(mockScrollTo).not.toHaveBeenCalled();
  });
});
