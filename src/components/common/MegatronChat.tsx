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
import { AnimatePresence, motion } from 'motion/react';
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
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

    // Correctly update state once with both messages
    const updatedMessages: Message[] = [...messages, userMessage, botMessage];
    setMessages(updatedMessages);
    setNewMessage('');
    setIsLoading(true);

    await sendMessage(messageText, botMessageId, updatedMessages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const sendMessage = async (
    messageText: string,
    botMessageId: number,
    currentMessages: Message[],
  ) => {
    try {
      // Filter and ensure history starts with 'user'
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          history,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
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
    } catch (error: any) {
      console.error('Error sending message:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: `My communication arrays are experiencing interference: ${error.message || 'Connection lost'}. Please try again shortly.`,
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
            <div className="relative group">
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <Avatar className="h-10 w-10 border-2 border-primary bg-primary/10 shadow-lg shadow-primary/20 relative z-10 transition-transform duration-300 group-hover:scale-110">
                <AvatarImage src="/assets/megatron.png" alt="Megatron" />
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                  MT
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500 shadow-sm animate-pulse z-20" />
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
          data-lenis-prevent
          className="flex-1 min-h-0 p-4 md:p-6 bg-linear-to-b from-transparent to-primary/5 relative"
        >
          {/* Subtle Background Pattern */}
          <div
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(var(--primary) 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="space-y-6 relative z-10">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={cn(
                    'flex w-full flex-col gap-1',
                    message.sender === 'user' ? 'items-end' : 'items-start',
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-300',
                      message.sender === 'user'
                        ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900 rounded-tr-none shadow-neutral-500/20'
                        : 'bg-background/40 backdrop-blur-md border border-primary/10 rounded-tl-none shadow-black/5 dark:shadow-white/5',
                    )}
                    aria-live={message.isStreaming ? 'polite' : 'off'}
                    aria-atomic="true"
                  >
                    <div
                      className={cn(
                        'prose prose-sm max-w-none',
                        message.sender === 'bot'
                          ? 'dark:prose-invert'
                          : 'text-current prose-p:text-current prose-a:text-current prose-strong:text-current',
                      )}
                    >
                      {message.text ? (
                        <ReactMarkdown
                          components={{
                            a: (props) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-inherit underline underline-offset-2 hover:opacity-80 font-bold"
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
                            <motion.span
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: 0,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-primary/40"
                            />
                            <motion.span
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: 0.1,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-primary/60"
                            />
                            <motion.span
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: 0.2,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-primary/80"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium px-1">
                    {message.timestamp}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {messages.length === 1 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 pt-4"
              >
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
                      className="bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground border-primary/20 h-auto py-2 px-4 text-xs font-semibold transition-all duration-300 rounded-full active:scale-95 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </ScrollArea>

        <div className="border-t bg-muted/30 backdrop-blur-sm p-4 md:p-6">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center gap-3"
          >
            <div className="relative flex-1">
              <Input
                placeholder="Query Megatron..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={isLoading}
                className="pr-12 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30 h-12 rounded-2xl shadow-inner transition-all duration-300 focus:bg-background"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <AnimatePresence>
                  {newMessage.trim() && !isLoading && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Button
                        type="submit"
                        size="icon"
                        className="h-8 w-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                      >
                        <SendIcon className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {isLoading && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                )}
              </div>
            </div>
            {!newMessage.trim() && !isLoading && (
              <Button
                type="submit"
                size="icon"
                disabled
                className="h-12 w-12 rounded-2xl bg-muted text-muted-foreground transition-all duration-300"
              >
                <SendIcon className="h-5 w-5" />
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MegatronChat;
