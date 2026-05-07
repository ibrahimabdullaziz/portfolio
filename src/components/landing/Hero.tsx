import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
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
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Left Column: Image and Social Links */}
        <div className="flex flex-col gap-6 shrink-0 w-full md:w-1/3">
          <Image
            src="/assets/logo.png"
            alt="Ibrahim Abdullaziz, Software Engineer"
            width={400}
            height={400}
            priority
            className="w-full aspect-square rounded-md border-2 border-secondary bg-blue-300 dark:bg-yellow-300 object-cover"
          />
          {/* Social Links */}
          <div className="flex justify-center gap-2">
            {socialLinks.map((link) => (
              <Tooltip key={link.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    aria-label={link.name}
                    className="text-secondary flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-full hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  >
                    <span className="size-5">{link.icon}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Right Column: Text Area */}
        <div className="flex flex-col gap-4 pt-4 md:pt-0 md:w-2/3">
          {/* Open to Work Banner */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50/80 px-4 py-1.5 text-sm font-medium text-green-700 backdrop-blur-sm dark:border-green-800/50 dark:bg-green-950/30 dark:text-green-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for full-time roles · Egypt · Open to remote
          </div>
          <h1 className="text-4xl font-bold">
            Hi, I&apos;m {name} —{' '}
            <span className="bg-gradient-to-r from-neutral-600 to-neutral-400 dark:from-neutral-300 dark:to-neutral-500 bg-clip-text text-transparent inline-block min-h-[1.2em]">
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
          </h1>

          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base whitespace-pre-wrap text-neutral-500 md:text-lg">
            {descriptionContent}
          </div>
          <p className="text-secondary text-base leading-relaxed mt-2 max-w-xl md:text-lg">
            Certified React Developer from ITI, currently pursuing Computer
            Science at Kafr Elsheikh University. Focused on building
            high-performance applications with Next.js 14, React 19, and
            real-time communication systems.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
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
                      'shadow-md hover:shadow-lg hover:scale-[1.02]',
                    button.variant === 'outline' && 'hover:bg-muted',
                  )}
                >
                  {IconComponent && <IconComponent />}
                  <Link href={button.href}>{button.text}</Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
