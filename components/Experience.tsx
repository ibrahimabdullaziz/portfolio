"use client";

import { motion } from "framer-motion";

const timelineItems = [
  {
    year: "Now",
    title: "Building & Growing",
    description:
      "Actively building production-grade web applications and seeking new opportunities in software engineering.",
    active: true,
  },
  {
    year: "Summer 2025",
    title: "React Development Certification",
    description:
      "Completed an intensive 120-hour training at the Information Technology Institute (ITI). Mastered modern React, state management, and built full-stack real-time applications.",
    active: false,
  },
  {
    year: "2023 - Present",
    title: "B.Sc. Computers and Information",
    description:
      "Kafr Elsheikh University. Cultivating a strong foundation in C++, Data Structures, Algorithms, Mathematics, and System Analysis. Current GPA: 3.21.",
    active: false,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative w-full">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Experience & Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l border-border ml-3 md:ml-6 space-y-12 pb-12">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div
                className={`absolute w-6 h-6 rounded-full -left-[12.5px] top-1 border-4 border-surface ${
                  item.active
                    ? "bg-accent shadow-[0_0_10px_var(--color-accent)]"
                    : "bg-border"
                } transition-colors duration-300`}
              />

              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                <span
                  className={`font-mono text-sm px-3 py-1 rounded-full w-fit ${
                    item.active
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "bg-elevated text-text-muted border border-border"
                  }`}
                >
                  {item.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                  {item.title}
                </h3>
              </div>

              <p className="text-text-secondary text-base lg:text-lg leading-relaxed bg-surface border border-border p-6 rounded-2xl hover:border-accent/30 transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}

          <div className="absolute bottom-0 left-[-1px] w-[2px] h-24 bg-gradient-to-t from-bg-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
