'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSuggestions } from '@/config/ChatPrompt';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import SendIcon from '../svgs/SendIcon';

interface Message {
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

interface MegatronChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MegatronChat: React.FC<MegatronChatProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { triggerHaptic, isMobile } = useHapticFeedback();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || newMessage;
    if (!textToSend.trim() || isLoading) return;

    if (isMobile()) {
      triggerHaptic('light');
    }

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

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

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

    setMessages((prev) => [...prev, botMessage]);
    await sendMessage(messageText, botMessageId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sendMessage = async (messageText: string, botMessageId: number) => {
    try {
      const history = messages.slice(-10).map((msg) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: msg.text }],
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

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
                text: 'My communication arrays are experiencing interference. Please try again shortly.',
                isStreaming: false,
              }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] w-full max-w-2xl flex-col p-0 overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10 sm:h-[70vh]">
        <DialogHeader className="border-b bg-muted/30 p-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary bg-primary/10 shadow-lg shadow-primary/20">
                <AvatarImage src="/assets/megatron.png" alt="Megatron" />
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                  MT
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500 shadow-sm animate-pulse" />
            </div>
            <div className="text-left">
              <DialogTitle className="text-lg font-bold tracking-tight">
                Megatron
              </DialogTitle>
              <p className="text-muted-foreground text-xs font-medium">
                Ibrahim&apos;s AI Entity • Online
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 p-4 md:p-6 bg-linear-to-b from-transparent to-primary/5"
        >
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex w-full flex-col gap-1',
                  message.sender === 'user' ? 'items-end' : 'items-start',
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-300',
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted/80 backdrop-blur-sm border border-primary/10 rounded-tl-none',
                  )}
                  aria-live={message.isStreaming ? 'polite' : 'off'}
                  aria-atomic="true"
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {message.text ? (
                      <ReactMarkdown
                        components={{
                          a: (props) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-foreground underline underline-offset-2 hover:opacity-80 font-bold"
                            />
                          ),
                          p: (props) => (
                            <p {...props} className="m-0 leading-relaxed" />
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    ) : (
                      message.isStreaming && (
                        <div className="flex gap-1 py-1">
                          <span
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40"
                            style={{ animationDelay: '0ms' }}
                          />
                          <span
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60"
                            style={{ animationDelay: '150ms' }}
                          />
                          <span
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/80"
                            style={{ animationDelay: '300ms' }}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium px-1">
                  {message.timestamp}
                </span>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="space-y-3 pt-4">
                <p className="text-muted-foreground px-1 text-xs font-semibold uppercase tracking-wider">
                  Suggested Inquiries
                </p>
                <div className="flex flex-wrap gap-2">
                  {chatSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion)}
                      className="bg-background/50 hover:bg-primary hover:text-primary-foreground border-primary/20 h-auto py-2 px-3 text-xs font-medium transition-all duration-300 rounded-full"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-muted/20 p-4 md:p-6">
          <div className="relative flex items-center gap-2">
            <Input
              placeholder="Query Megatron..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="pr-12 bg-background border-primary/20 focus-visible:ring-primary/30 h-11 rounded-full shadow-inner"
            />
            <Button
              size="icon"
              onClick={() => handleSendMessage()}
              disabled={!newMessage.trim() || isLoading}
              className="absolute right-1 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300 active:scale-95"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <SendIcon className="h-4 w-4 text-primary-foreground" />
              )}
            </Button>
          </div>
          <p className="mt-3 text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold opacity-60">
            Powered by Gemini AI • Encrypted Connection
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MegatronChat;
