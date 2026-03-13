'use client';

import { Message } from '@/hooks/use-megatron-chat';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React, { AnchorHTMLAttributes, HTMLAttributes, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

interface MegatronMessageBubbleProps {
  message: Message;
}

export const MegatronMessageBubble: React.FC<MegatronMessageBubbleProps> = ({
  message,
}) => {
  const markdownComponents = useMemo(
    () => ({
      a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit underline underline-offset-2 hover:opacity-80 font-bold"
        />
      ),
      p: (props: HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className="m-0 leading-relaxed" />
      ),
    }),
    [],
  );

  return (
    <motion.div
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
            <ReactMarkdown components={markdownComponents}>
              {message.text}
            </ReactMarkdown>
          ) : (
            message.isStreaming && (
              <div className="flex gap-1 py-1">
                {[0, 0.1, 0.2].map((delay) => (
                  <motion.span
                    key={delay}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay,
                    }}
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      delay === 0
                        ? 'bg-primary/40'
                        : delay === 0.1
                          ? 'bg-primary/60'
                          : 'bg-primary/80',
                    )}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground font-medium px-1">
        {message.timestamp}
      </span>
    </motion.div>
  );
};
