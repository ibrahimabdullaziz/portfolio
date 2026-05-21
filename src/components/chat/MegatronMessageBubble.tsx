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
          className="font-bold text-inherit underline underline-offset-2 hover:opacity-80"
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
            ? 'rounded-tr-none bg-neutral-800 text-white shadow-neutral-500/20 dark:bg-neutral-200 dark:text-neutral-900'
            : 'bg-background/40 border-primary/10 rounded-tl-none border shadow-black/5 backdrop-blur-md dark:shadow-white/5',
        )}
        aria-live={message.isStreaming ? 'polite' : 'off'}
        aria-atomic="true"
      >
        <div
          className={cn(
            'prose prose-sm max-w-none',
            message.sender === 'bot'
              ? 'dark:prose-invert'
              : 'prose-p:text-current prose-a:text-current prose-strong:text-current text-current',
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
      <span className="text-muted-foreground px-1 text-[10px] font-medium">
        {message.timestamp}
      </span>
    </motion.div>
  );
};
