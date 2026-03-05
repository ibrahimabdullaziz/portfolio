"use client";

import { motion } from "framer-motion";
import { Code2, Award, Terminal } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 relative w-full">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-lg text-text-secondary"
          >
            <p>
              I am a third-year Computer Science student at Kafr Elsheikh
              University, specializing in software engineering. I have
              cultivated a strong foundation in{" "}
              <strong className="text-text-primary font-medium">
                C++, Data Structures, Algorithms, and OOP
              </strong>
              .
            </p>
            <p>
              Rather than just learning frameworks, I focus on the principles
              that make them work. That fundamental knowledge empowers me to
              build high-performance web applications using the modern frontend
              stack, specifically{" "}
              <strong className="text-text-primary font-medium">
                React 19 and Next.js 14+
              </strong>
              .
            </p>
            <p>
              Recently, I completed a rigorous{" "}
              <strong className="text-text-primary font-medium">
                120-hour React Development Summer Training
              </strong>{" "}
              at the Information Technology Institute (ITI), refining my skills
              and applying them to production-grade projects featuring real-time
              collaborative environments and cinema-quality UI.
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors group">
              <Terminal className="text-accent mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold text-text-primary mb-1">
                3.21
              </h3>
              <p className="text-text-muted text-sm uppercase tracking-wide">
                University GPA
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors group">
              <Award className="text-accent mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold text-text-primary mb-1">
                120h
              </h3>
              <p className="text-text-muted text-sm uppercase tracking-wide">
                ITI Certification
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors group sm:col-span-2 flex items-center justify-between">
              <div>
                <Code2 className="text-accent mb-2 w-8 h-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  Full-Stack Capable
                </h3>
                <p className="text-text-muted text-sm">
                  Real-time Video, DB Sync, Auth
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
