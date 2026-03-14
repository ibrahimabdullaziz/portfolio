import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { useIsMobile } from '@/hooks/use-mobile';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('hooks/use-haptic-feedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock navigator.vibrate
    Object.defineProperty(navigator, 'vibrate', {
      value: vi.fn(),
      configurable: true,
    });
  });

  it('triggers vibration on supported devices', () => {
    const { result } = renderHook(() => useHapticFeedback());

    act(() => {
      result.current.triggerHaptic('light');
    });
    expect(navigator.vibrate).toHaveBeenCalledWith(10);

    act(() => {
      result.current.triggerHaptic('heavy');
    });
    expect(navigator.vibrate).toHaveBeenCalledWith(40);
  });

  it('correctly identifies mobile via userAgent', () => {
    const { result } = renderHook(() => useHapticFeedback());

    // Mock userAgent
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'iPhone',
      configurable: true,
    });

    expect(result.current.isMobile()).toBe(true);

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });
});

describe('hooks/use-mobile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('returns true when window width is below breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 500,
      configurable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('returns false when window width is above breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      configurable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
