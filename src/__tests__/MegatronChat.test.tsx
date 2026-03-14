import MegatronChat from '@/components/common/MegatronChat';
import { useMegatronChat } from '@/hooks/use-megatron-chat';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('@/hooks/use-megatron-chat', () => ({
  useMegatronChat: vi.fn(),
}));

// Mock Dialog components from Radix/UI
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children }: any) => (
    <div data-testid="scroll-area">{children}</div>
  ),
}));

vi.mock('@/components/chat/MegatronMessageBubble', () => ({
  MegatronMessageBubble: ({ message }: any) => (
    <div data-testid="message-bubble">{message.text}</div>
  ),
}));

describe('MegatronChat Component', () => {
  const mockOnOpenChange = vi.fn();
  const mockSetNewMessage = vi.fn();
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleSendMessage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useMegatronChat as any).mockReturnValue({
      messages: [{ id: 1, text: 'Hello', sender: 'bot' }],
      newMessage: '',
      setNewMessage: mockSetNewMessage,
      isLoading: false,
      scrollAreaRef: { current: null },
      messagesEndRef: { current: null },
      handleSendMessage: mockHandleSendMessage,
      handleSubmit: mockHandleSubmit,
      chatSuggestions: ['Who are you?', 'Projects?'],
    });
  });

  it('renders when open', () => {
    render(<MegatronChat open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByText('Megatron')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Query Megatron...'),
    ).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const { queryByText } = render(
      <MegatronChat open={false} onOpenChange={mockOnOpenChange} />,
    );
    expect(queryByText('Megatron')).not.toBeInTheDocument();
  });

  it('displays messages', () => {
    render(<MegatronChat open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByTestId('message-bubble')).toHaveTextContent('Hello');
  });

  it('displays chat suggestions when only one message exists', () => {
    render(<MegatronChat open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByText('Who are you?')).toBeInTheDocument();
    expect(screen.getByText('Projects?')).toBeInTheDocument();
  });

  it('calls handleSendMessage when a suggestion is clicked', () => {
    render(<MegatronChat open={true} onOpenChange={mockOnOpenChange} />);
    fireEvent.click(screen.getByText('Who are you?'));
    expect(mockHandleSendMessage).toHaveBeenCalledWith('Who are you?');
  });

  it('updates newMessage on input change', () => {
    render(<MegatronChat open={true} onOpenChange={mockOnOpenChange} />);
    const input = screen.getByPlaceholderText('Query Megatron...');
    fireEvent.change(input, { target: { value: 'New Query' } });
    expect(mockSetNewMessage).toHaveBeenCalledWith('New Query');
  });

  it('calls handleSubmit on form submission', () => {
    (useMegatronChat as any).mockReturnValue({
      messages: [{ id: 1, text: 'Hello', sender: 'bot' }],
      newMessage: 'Hello Megatron',
      setNewMessage: mockSetNewMessage,
      isLoading: false,
      scrollAreaRef: { current: null },
      messagesEndRef: { current: null },
      handleSendMessage: mockHandleSendMessage,
      handleSubmit: mockHandleSubmit,
      chatSuggestions: ['Who are you?', 'Projects?'],
    });

    render(<MegatronChat open={true} onOpenChange={mockOnOpenChange} />);
    const form = screen
      .getByPlaceholderText('Query Megatron...')
      .closest('form');
    if (form) fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
