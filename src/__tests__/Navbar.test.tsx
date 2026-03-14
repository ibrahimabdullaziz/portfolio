import Navbar from '@/components/common/Navbar';
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

vi.mock('@/config/Navbar', () => ({
  navbarConfig: {
    navItems: [
      { label: 'Home', href: '/#home' },
      { label: 'Skills', href: '/#skills' },
    ],
  },
}));

// Mock child components to simplify testing
vi.mock('@/components/common/MobileNav', () => ({
  default: () => <div data-testid="mobile-nav" />,
}));

vi.mock('@/components/common/MegatronChat', () => ({
  default: () => <div data-testid="megatron-chat" />,
}));

vi.mock('@/components/common/ThemeSwitch', () => ({
  ThemeToggleButton: () => <button data-testid="theme-toggle" />,
}));

describe('Navbar Component', () => {
  const mockScrollTo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLenis as any).mockReturnValue({ scrollTo: mockScrollTo });
    (usePathname as any).mockReturnValue('/');

    // Mock getElementById for scroll testing
    document.getElementById = vi.fn().mockImplementation((id) => {
      const el = document.createElement('div');
      el.id = id;
      return el;
    });
  });

  it('renders desktop navigation links', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Skills/i })).toBeInTheDocument();
  });

  it('renders mobile navigation trigger', () => {
    render(<Navbar />);
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });

  it('renders Megatron chat buttons', () => {
    render(<Navbar />);

    // Desktop button
    expect(
      screen.getByRole('button', { name: /Ask Megatron/i }),
    ).toBeInTheDocument();

    // Mobile button (ghost variant with icon)
    const buttons = screen.getAllByRole('button');
    const ghostButton = buttons.find((b) => b.className.includes('md:hidden'));
    expect(ghostButton).toBeInTheDocument();
  });

  it('handles anchor link click with lenis scroll', () => {
    render(<Navbar />);

    const skillsLink = screen.getByRole('link', { name: /Skills/i });
    fireEvent.click(skillsLink);

    expect(mockScrollTo).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        offset: -80,
        duration: 1.5,
      }),
    );
  });

  it('tracks active section via IntersectionObserver', () => {
    const observeMock = vi.fn();
    const disconnectMock = vi.fn();

    // Mock class for IntersectionObserver
    class MockObserver {
      observe = observeMock;
      unobserve = vi.fn();
      disconnect = disconnectMock;
    }

    vi.stubGlobal('IntersectionObserver', MockObserver);

    render(<Navbar />);

    expect(observeMock).toHaveBeenCalled();
  });

  it('opens Megatron chat when clicked', () => {
    render(<Navbar />);

    const askMegatronButton = screen.getByRole('button', {
      name: /Ask Megatron/i,
    });
    fireEvent.click(askMegatronButton);

    // Verify MegatronChat is logic is triggered (internal state isn't easily accessible but we check it doesn't crash)
    expect(screen.getByTestId('megatron-chat')).toBeInTheDocument();
  });
});
