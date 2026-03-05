"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend Stack",
    skills: [
      "React 19",
      "Next.js 14+",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
    ],
  },
  {
    title: "Core & Foundations",
    skills: [
      "C++",
      "C#",
      "Data Structures",
      "Algorithms",
      "OOP",
      "System Analysis & Design",
    ],
  },
  {
    title: "State & Testing",
    skills: ["Redux", "TanStack Query", "Jest", "React Testing Library"],
  },
  {
    title: "Backend & Ecosystem",
    skills: ["Convex", "SQL", "MongoDB", "Clerk (Auth)", "Stream Video SDK"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative w-full">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical Arsenal
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface border border-border p-6 rounded-2xl hover:border-accent/40 hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all group"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 group-hover:text-accent transition-colors">
                {category.title}
              </h3>
              <ul className="space-y-3 relative">
                <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-border to-transparent" />
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center text-text-secondary pl-4 relative"
                  >
                    <div className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
