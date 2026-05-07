'use client';

import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import Typewriter from '../common/Typewriter';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const { name, title, skills, description, buttons } = heroConfig;

  const descriptionContent = React.useMemo(() => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  }, [description.template, skills]);

  return (
    <Container id="home" className="mx-auto max-w-5xl">
      {/* Image and Content Row */}
      <motion.div
        className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Image and Social Links */}
        <motion.div
          className="flex flex-col gap-6 shrink-0 w-full md:w-1/3"
          variants={scaleIn}
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/30 via-primary/10 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              src="/assets/logo.png"
              alt="Ibrahim Abdullaziz, Software Engineer"
              width={400}
              height={400}
              priority
              className="relative w-full aspect-square rounded-md border-2 border-primary/20 bg-blue-300 dark:bg-yellow-300 object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
          {/* Social Links */}
          <motion.div className="flex justify-center gap-2" variants={fadeUp}>
            {socialLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
              >
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      aria-label={link.name}
                      className="text-muted-foreground flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-full hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      <span className="size-5">{link.icon}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Text Area */}
        <div className="flex flex-col gap-4 pt-4 md:pt-0 md:w-2/3">
          {/* Open to Work Banner */}
          <motion.div
            variants={slideInLeft}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50/80 px-4 py-1.5 text-sm font-medium text-green-700 backdrop-blur-sm dark:border-green-800/50 dark:bg-green-950/30 dark:text-green-400"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for full-time roles · Egypt · Open to remote
          </motion.div>
          <motion.h1 className="text-4xl font-bold" variants={fadeUp}>
            Hi, I&apos;m {name} —{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent inline-block min-h-[1.2em]">
              <Typewriter
                strings={[
                  title,
                  'A Real-Time Systems Specialist.',
                  'A Frontend Developer.',
                ]}
                delay={2000}
                typeSpeed={80}
                deleteSpeed={40}
              />
            </span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base whitespace-pre-wrap text-neutral-500 md:text-lg"
          >
            {descriptionContent}
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-base leading-relaxed mt-2 max-w-xl md:text-lg"
          >
            Certified React Developer from ITI, currently pursuing Computer
            Science at Kafr Elsheikh University. Focused on building
            high-performance applications with Next.js 14, React 19, and
            real-time communication systems.
          </motion.p>

          {/* Buttons */}
          <motion.div className="mt-8 flex gap-4" variants={fadeUp}>
            {buttons.map((button, index) => {
              const IconComponent =
                buttonIcons[button.icon as keyof typeof buttonIcons];
              return (
                <Button
                  key={index}
                  variant={button.variant as 'outline' | 'default'}
                  className={cn(
                    'transition-all duration-300',
                    button.variant === 'default' &&
                      'shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]',
                    button.variant === 'outline' && 'hover:bg-muted',
                  )}
                >
                  {IconComponent && <IconComponent />}
                  <Link href={button.href}>{button.text}</Link>
                </Button>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
}
