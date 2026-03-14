import CTA from '@/components/landing/CTA';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('@/hooks/use-haptic-feedback', () => ({
  useHapticFeedback: vi.fn(),
}));

vi.mock('@calcom/embed-react', () => ({
  default: () => <div data-testid="cal-embed" />,
  getCalApi: vi.fn(),
}));

vi.mock('@/components/common/Container', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
  DialogDescription: ({ children }: any) => <div>{children}</div>,
}));

describe('CTA Component', () => {
  const mockTriggerHaptic = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useHapticFeedback as any).mockReturnValue({
      triggerHaptic: mockTriggerHaptic,
      isMobile: () => false,
    });
  });

  it('renders with default config content', () => {
    render(<CTA />);
    expect(screen.getByText(/Hey, you scrolled this far/i)).toBeInTheDocument();
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(<CTA linkText="Custom Button" preText="Custom Pretext" />);
    expect(screen.getByText('Custom Button')).toBeInTheDocument();
    expect(screen.getByText('Custom Pretext')).toBeInTheDocument();
  });

  it('opens Cal.com dialog when clicked if calLink is provided', async () => {
    render(<CTA calLink="test-link" linkText="Book Meeting" />);
    const button = screen.getByText(/Book Meeting/i);
    fireEvent.click(button.closest('.group')!);

    expect(await screen.findByTestId('dialog')).toBeInTheDocument();
  });

  it('redirects to /contact if no calLink is provided', () => {
    const mockLocation = { href: 'http://localhost/' };
    vi.stubGlobal('location', mockLocation);

    render(<CTA calLink="" linkText="Click Me" />);
    const button = screen.getByText(/Click Me/i);
    fireEvent.click(button.closest('.group')!);

    expect(mockLocation.href).toBe('/contact');

    vi.unstubAllGlobals();
  });
});
