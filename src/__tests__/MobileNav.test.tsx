import MobileNav from '@/components/common/MobileNav';
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
    navItems: [{ label: 'Home', href: '/#home' }],
  },
}));

// Mocking Radix-based Sheet component because it's hard to trigger in JSDOM
vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children, open, onOpenChange }: any) => (
    <div data-testid="sheet-root" data-open={open}>
      {children}
    </div>
  ),
  SheetTrigger: ({ children }: any) => (
    <div data-testid="sheet-trigger">{children}</div>
  ),
  SheetContent: ({ children }: any) => (
    <div data-testid="sheet-content">{children}</div>
  ),
  SheetHeader: ({ children }: any) => <div>{children}</div>,
  SheetTitle: ({ children }: any) => <div>{children}</div>,
}));

describe('MobileNav Component', () => {
  const mockScrollTo = vi.fn();
  const mockOnOpenMegatron = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    (useLenis as any).mockReturnValue({ scrollTo: mockScrollTo });
    (usePathname as any).mockReturnValue('/');

    document.getElementById = vi.fn().mockImplementation((id) => {
      const el = document.createElement('div');
      el.id = id;
      return el;
    });
  });

  it('renders trigger button', () => {
    render(<MobileNav onOpenMegatron={mockOnOpenMegatron} />);
    expect(
      screen.getByRole('button', { name: /Toggle mobile menu/i }),
    ).toBeInTheDocument();
  });

  it('contains navigation links and Ask Megatron button', () => {
    render(<MobileNav onOpenMegatron={mockOnOpenMegatron} />);

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Ask Megatron/i }),
    ).toBeInTheDocument();
  });

  it('handles Megatron button click', () => {
    render(<MobileNav onOpenMegatron={mockOnOpenMegatron} />);

    const megatronButton = screen.getByRole('button', {
      name: /Ask Megatron/i,
    });
    fireEvent.click(megatronButton);

    expect(mockOnOpenMegatron).toHaveBeenCalled();
  });

  it('handles anchor link click with lenis scroll and timeout', () => {
    render(<MobileNav onOpenMegatron={mockOnOpenMegatron} />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    fireEvent.click(homeLink);

    // Should call scroll after timeout (150ms)
    vi.advanceTimersByTime(150);

    expect(mockScrollTo).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        offset: -80,
        duration: 1.2,
      }),
    );

    vi.useRealTimers();
  });
});
