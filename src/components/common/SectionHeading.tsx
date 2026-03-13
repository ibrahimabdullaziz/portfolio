'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1"
    >
      <p className="text-secondary text-sm font-medium uppercase tracking-wider">
        {subHeading}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {heading}
      </h2>
    </motion.div>
  );
}
