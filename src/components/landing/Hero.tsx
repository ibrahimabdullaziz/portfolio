import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
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

  const renderDescription = () => {
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
  };

  return (
    <Container className="mx-auto max-w-5xl">
      {/* Image and Content Row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Image */}
        <Image
          src="/assets/logo.png"
          alt="hero"
          width={240}
          height={240}
          className="size-60 rounded-md border-2 border-secondary bg-blue-300 dark:bg-yellow-300 shrink-0 object-cover"
        />

        {/* Text Area */}
        <div className="flex flex-col gap-4 pt-4 md:pt-0">
          <h1 className="text-4xl font-bold">
            Hi, I&apos;m {name} —{' '}
            <span className="text-secondary">{title}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base whitespace-pre-wrap text-neutral-500 md:text-lg">
            {renderDescription()}
          </div>
          <p className="text-secondary text-base leading-relaxed mt-2 md:text-lg">
            I&apos;m a results-driven Software Engineer specialized in building
            high-performance, scalable web applications. Certified React
            Developer from ITI with deep expertise in Next.js 14, React 19, and
            real-time communication systems. Currently a third-year Computer
            Science student at Kafr Elsheikh University.
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
                    button.variant === 'outline' && 'inset-shadow-indigo-500',
                    button.variant === 'default' && 'inset-shadow-indigo-500',
                  )}
                >
                  {IconComponent && <IconComponent />}
                  <Link href={button.href}>{button.text}</Link>
                </Button>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="mt-8 flex gap-2">
            {socialLinks.map((link) => (
              <Tooltip key={link.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    key={link.name}
                    className="text-secondary flex items-center gap-2"
                  >
                    <span className="size-6">{link.icon}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
