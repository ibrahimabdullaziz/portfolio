import { ThemeToggleButton } from '@/components/common/ThemeSwitch';
import { fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

vi.mock('@/components/svgs/Moon', () => ({
  default: () => <div data-testid="moon-icon" />,
}));

vi.mock('@/components/svgs/Sun', () => ({
  default: () => <div data-testid="sun-icon" />,
}));

describe('ThemeToggleButton Component', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock startViewTransition
    if (!document.startViewTransition) {
      document.startViewTransition = (cb: any) => {
        cb();
        return {
          finished: Promise.resolve(),
          ready: Promise.resolve(),
          updateCallbackDone: Promise.resolve(),
        };
      };
    }
  });

  it('renders Sun icon when theme is light', () => {
    (useTheme as any).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    });

    render(<ThemeToggleButton />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('renders Moon icon when theme is dark', () => {
    (useTheme as any).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    });

    render(<ThemeToggleButton />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('calls setTheme when clicked', () => {
    (useTheme as any).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    });

    render(<ThemeToggleButton />);
    const button = screen.getByLabelText(/Toggle theme/i);
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles theme correctly', () => {
    (useTheme as any).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    });

    const { rerender } = render(<ThemeToggleButton />);
    const button = screen.getByLabelText(/Toggle theme/i);

    // Currently light -> click becomes dark
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');

    // Mock change to dark
    (useTheme as any).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    });
    rerender(<ThemeToggleButton />);

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenLastCalledWith('light');
  });
});
