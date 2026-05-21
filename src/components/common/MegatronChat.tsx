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
import { useMegatronChat } from '@/hooks/use-megatron-chat';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { MegatronMessageBubble } from '../chat/MegatronMessageBubble';
import SendIcon from '../svgs/SendIcon';

interface MegatronChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MegatronChat: React.FC<MegatronChatProps> = ({ open, onOpenChange }) => {
  const {
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    scrollAreaRef,
    messagesEndRef,
    handleSendMessage,
    handleSubmit,
    chatSuggestions,
  } = useMegatronChat(open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-primary/20 shadow-primary/10 flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden border-2 p-0 shadow-2xl sm:h-[70vh]">
        <DialogHeader className="bg-muted/30 border-b p-4">
          <div className="flex items-center space-x-3">
            <div className="group relative">
              <div className="bg-primary/20 absolute -inset-1 animate-pulse rounded-full opacity-0 blur transition duration-500 group-hover:opacity-100" />
              <Avatar className="border-primary bg-primary/10 shadow-primary/20 relative z-10 h-10 w-10 border-2 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <AvatarImage src="/assets/megatron.png" alt="Megatron" />
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                  MT
                </AvatarFallback>
              </Avatar>
              <div className="border-background absolute -right-0.5 -bottom-0.5 z-20 h-3 w-3 animate-pulse rounded-full border-2 bg-green-500 shadow-sm" />
            </div>
            <div className="text-left">
              <DialogTitle className="text-lg font-bold tracking-tight">
                Megatron
              </DialogTitle>
              <p className="text-muted-foreground text-xs font-medium">
                Ibrahim&apos;s AI Assistant • Online
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea
          ref={scrollAreaRef}
          data-lenis-prevent
          className="to-primary/5 relative min-h-0 flex-1 bg-linear-to-b from-transparent p-4 md:p-6"
        >
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(var(--primary) 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MegatronMessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {messages.length === 1 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 pt-4"
              >
                <p className="text-muted-foreground px-1 text-xs font-semibold tracking-wider uppercase">
                  Suggested Inquiries
                </p>
                <div className="flex flex-wrap gap-2">
                  {chatSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion)}
                      className="bg-background/50 hover:bg-primary hover:text-primary-foreground border-primary/20 hover:shadow-primary/20 h-auto rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
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

        <div className="bg-muted/30 border-t p-4 backdrop-blur-sm md:p-6">
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
                className="bg-background/50 border-primary/20 focus-visible:ring-primary/30 focus:bg-background h-12 rounded-2xl pr-12 shadow-inner backdrop-blur-sm transition-all duration-300"
              />
              <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
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
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 h-8 w-8 rounded-xl shadow-lg"
                      >
                        <SendIcon className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {isLoading && (
                  <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                )}
              </div>
            </div>
            {!newMessage.trim() && !isLoading && (
              <Button
                type="submit"
                size="icon"
                disabled
                className="bg-muted text-muted-foreground h-12 w-12 rounded-2xl transition-all duration-300"
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
