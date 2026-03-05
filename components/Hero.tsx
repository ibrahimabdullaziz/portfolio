"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden w-full pt-20"
    >
      {/* Background Particles Placeholder */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-accent rounded-full filter blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-80 h-80 bg-accent-hover rounded-full filter blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-text-secondary">
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Ibrahim <span className="text-gradient">Abdullaziz</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-3xl font-semibold text-text-secondary mb-8"
        >
          Software Engineer <span className="text-accent">·</span> Frontend
          Specialist
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-lg text-text-muted mb-10"
        >
          Engineer with a solid foundation in C++, Data Structures, OOP &
          problem solving — channeling that rigor into building production-grade
          web apps with React & Next.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="/CV - v1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-full transition-all shadow-[0_0_20px_var(--color-accent-glow)] text-lg"
          >
            Download CV
          </a>
          <a
            href="#projects"
            className="px-8 py-4 bg-surface border border-border hover:border-accent/50 text-text-primary font-medium rounded-full transition-all text-lg"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
      >
        <span className="text-xs text-text-muted uppercase tracking-widest mb-2 font-mono">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
