import { useGithubContributions } from '@/hooks/use-github-contributions';
import { useMegatronChat } from '@/hooks/use-megatron-chat';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

describe('hooks/use-github-contributions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and processes contributions correctly', async () => {
    const currentYear = new Date().getFullYear();
    const testDate = `${currentYear}-01-01`;
    const mockData = {
      contributions: [
        [
          {
            date: testDate,
            contributionCount: 5,
            contributionLevel: 'THIRD_QUARTILE',
          },
        ],
      ],
    };

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useGithubContributions());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: 2000,
    });

    expect(result.current.hasError).toBe(false);
    expect(result.current.totalContributions).toBe(5);

    // Test date should be in the list
    const jan1st = result.current.contributions.find(
      (c) => c.date === testDate,
    );
    expect(jan1st).toBeDefined();
    expect(jan1st?.count).toBe(5);
    expect(jan1st?.level).toBe(3);
  });

  it('handles fetch errors', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Fetch failed'));

    const { result } = renderHook(() => useGithubContributions());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.hasError).toBe(true);
  });
});

describe('hooks/use-megatron-chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // IntersectionObserver mock for scrollIntoView if needed,
    // but we use refs mainly.
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('initializes with a greeting', () => {
    const { result } = renderHook(() => useMegatronChat(true));
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].text).toContain('Megatron');
  });

  it('updates newMessage state', () => {
    const { result } = renderHook(() => useMegatronChat(true));
    act(() => {
      result.current.setNewMessage('Hello');
    });
    expect(result.current.newMessage).toBe('Hello');
  });

  it('handles sending a message and streaming response', async () => {
    const mockStream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode('data: {"text": "I am "}\n'));
        controller.enqueue(encoder.encode('data: {"text": "Megatron."}\n'));
        controller.enqueue(encoder.encode('data: {"done": true}\n'));
        controller.close();
      },
    });

    (global.fetch as any).mockResolvedValue({
      ok: true,
      body: mockStream,
    });

    const { result } = renderHook(() => useMegatronChat(true));

    act(() => {
      result.current.setNewMessage('Who are you?');
    });

    await act(async () => {
      await result.current.handleSendMessage();
    });

    // Check user message
    expect(result.current.messages[1].text).toBe('Who are you?');
    expect(result.current.messages[1].sender).toBe('user');

    // Check bot message accumulated text
    await waitFor(() => {
      expect(result.current.messages[2].text).toBe('I am Megatron.');
      expect(result.current.messages[2].isStreaming).toBe(false);
    });
  });
});
