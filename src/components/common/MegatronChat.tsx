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
                Ibrahim&apos;s AI Assistant • Online
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea
          ref={scrollAreaRef}
          data-lenis-prevent
          className="flex-1 min-h-0 p-4 md:p-6 bg-linear-to-b from-transparent to-primary/5 relative"
        >
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
