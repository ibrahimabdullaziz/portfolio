"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, PlayCircle } from "lucide-react";

const projects = [
  {
    title: "V-sync Platform",
    featured: true,
    description:
      "A full-stack remote interview platform featuring real-time collaborative coding, HD video conferencing, and audio streaming. Built with a premium UI supporting dark mode and responsive design.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Clerk",
      "Stream Video SDK",
      "Convex",
      "Monaco Editor",
      "Tailwind CSS",
    ],
    demo: "#",
    github: "https://github.com/ibrahimabdullaziz",
    image: "/api/placeholder/800/400", // using placeholder, user can replace later
  },
  {
    title: "UrMoviez",
    featured: false,
    description:
      "A high-performance cinematography exploration app. Integrated highly-optimized data fetching and caching from TMDB API, with smooth, production-grade animations.",
    tech: [
      "React 19",
      "TanStack Query v5",
      "Framer Motion",
      "Tailwind CSS v4",
      "Vite",
    ],
    demo: "#",
    github: "https://github.com/ibrahimabdullaziz",
    image: "/api/placeholder/600/400",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative w-full bg-surface/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
        </motion.div>

        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col gap-8 group ${
                project.featured
                  ? "lg:flex-row"
                  : "lg:flex-row-reverse w-full max-w-5xl mx-auto"
              }`}
            >
              {/* Image Container */}
              <div
                className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${
                  project.featured
                    ? "lg:w-7/12 aspect-video"
                    : "lg:w-1/2 aspect-video"
                }`}
              >
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div
                className={`flex flex-col justify-center ${
                  project.featured ? "lg:w-5/12 lg:pl-8" : "lg:w-1/2 lg:pr-8"
                }`}
              >
                {project.featured && (
                  <span className="text-accent font-mono text-sm tracking-wider uppercase mb-2">
                    ★ Featured Project
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <div className="bg-surface border border-border p-6 rounded-2xl shadow-lg relative z-20 mb-6 text-text-secondary">
                  <p>{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-elevated border border-border rounded-full text-xs font-mono text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors font-medium"
                  >
                    <ExternalLink size={20} /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors font-medium"
                  >
                    <Github size={20} /> Repository
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
