'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="from-primary via-primary/80 to-primary/50 fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r"
      style={{ scaleX }}
    />
  );
}
