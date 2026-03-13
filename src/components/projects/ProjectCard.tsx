'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type Project } from '@/types/project';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Magnetic Cursor Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full w-full"
    >
      <Card className="group relative h-full w-full overflow-hidden border border-neutral-200 dark:border-neutral-800 p-0 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300">
        {/* Stretched Link to cover the entire card */}
        <Link
          href={project.projectDetailsPageSlug}
          className="absolute inset-0 z-0"
          aria-label={`View details for ${project.title}`}
        />

        <CardHeader className="p-0 relative z-10 pointer-events-none">
          <div className="group relative aspect-video overflow-hidden">
            <Image
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={project.image}
              alt={project.title}
              width={1920}
              height={1080}
            />
            {project.video && (
              <div className="pointer-events-auto">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:backdrop-blur-xs">
                      <button className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/30">
                        <PlayCircle />
                      </button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-4xl border-0 p-0">
                    <div className="aspect-video w-full">
                      <video
                        className="h-full w-full rounded-lg object-cover"
                        src={project.video}
                        autoPlay
                        loop
                        controls
                      />
                    </div>
                    <DialogTitle className="sr-only">
                      {project.title}
                    </DialogTitle>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-6 relative z-10 flex flex-col pointer-events-none">
          <div className="space-y-4 flex-1">
            {/* Project Header - Title and Icons */}
            <div className="flex items-center justify-between gap-4 mt-6">
              <h3 className="group-hover:text-primary transition-colors text-xl leading-tight font-semibold">
                {project.title}
              </h3>

              <div className="flex items-center gap-2 pointer-events-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors relative z-20"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Website />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Website</p>
                  </TooltipContent>
                </Tooltip>

                {project.github && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors relative z-20"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {project.linkedin && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors relative z-20"
                        href={project.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedIn />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View LinkedIn Post</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-secondary line-clamp-3">{project.description}</p>

            {/* Technologies */}
            <div className="mt-auto pt-4 pointer-events-auto">
              <h4 className="text-secondary mb-2 text-sm font-medium">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="size-6 transition-transform duration-300 hover:scale-110 relative z-20">
                        {technology.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{technology.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        {project.details && (
          <CardFooter className="flex justify-between p-6 pt-0 mt-4 relative z-10 pointer-events-none">
            <div
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
                project.isWorking
                  ? 'border-green-300 bg-green-500/10'
                  : 'border-red-300 bg-red-500/10'
              }`}
            >
              {project.isWorking ? (
                <>
                  <div className="size-2 animate-pulse rounded-full bg-green-500" />
                  All Systems Operational
                </>
              ) : (
                <>
                  <div className="size-2 animate-pulse rounded-full bg-red-500" />
                  Building
                </>
              )}
            </div>
            <div className="text-secondary group-hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors group-hover:underline">
              View Details <ArrowRight className="size-4" />
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
