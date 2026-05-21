'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group border-border bg-card/90 shadow-primary/5 hover:border-primary/30 hover:bg-primary/10 hover:shadow-primary/10 fixed right-6 bottom-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-sm transition-all duration-300"
        >
          <ArrowUp className="text-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
