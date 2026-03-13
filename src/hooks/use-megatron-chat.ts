'use client';

import { chatSuggestions } from '@/config/ChatPrompt';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isStreaming?: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Greetings. I am **Megatron**, Ibrahim's elite AI assistant. How may I assist your exploration of this portfolio today?",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
];

export function useMegatronChat(open: boolean) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { triggerHaptic, isMobile } = useHapticFeedback();

  // Auto-scroll logic
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: isLoading ? 'auto' : 'smooth',
          block: 'end',
        });
      }

      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector(
          '[data-slot="scroll-area-viewport"]',
        );
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timeoutId);
  }, [messages, open, isLoading]);

  const sendMessage = async (
    messageText: string,
    botMessageId: number,
    currentMessages: Message[],
  ) => {
    try {
      const rawHistory = currentMessages
        .filter((msg) => msg.id !== botMessageId)
        .slice(-11);

      let startIndex = 0;
      while (
        startIndex < rawHistory.length &&
        rawHistory[startIndex].sender !== 'user'
      ) {
        startIndex++;
      }

      const history = rawHistory.slice(startIndex).map((msg) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: msg.text }],
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, history }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader available');

      let accumulatedText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                accumulatedText += data.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText, isStreaming: true }
                      : msg,
                  ),
                );
              }
              if (data.done) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText, isStreaming: false }
                      : msg,
                  ),
                );
                break;
              }
            } catch {
              continue;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: `My communication arrays are experiencing interference: ${error instanceof Error ? error.message : 'Connection lost'}. Please try again shortly.`,
                isStreaming: false,
              }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = useCallback(
    async (textOverride?: string) => {
      const textToSend = textOverride || newMessage;
      if (!textToSend.trim() || isLoading) return;

      if (isMobile()) triggerHaptic('light');

      const messageText = textToSend.trim();
      const userMessage: Message = {
        id: Date.now(),
        text: messageText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      const botMessageId = Date.now() + 1;
      const botMessage: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isStreaming: true,
      };

      const updatedMessages = [...messages, userMessage, botMessage];
      setMessages(updatedMessages);
      setNewMessage('');
      setIsLoading(true);

      await sendMessage(messageText, botMessageId, updatedMessages);
    },
    [messages, newMessage, isLoading, isMobile, triggerHaptic],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSendMessage();
    },
    [handleSendMessage],
  );

  return {
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    scrollAreaRef,
    messagesEndRef,
    handleSendMessage,
    handleSubmit,
    chatSuggestions,
  };
}
