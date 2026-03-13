'use client';

import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  strings: string[];
  delay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
}

export default function Typewriter({
  strings,
  delay = 2000,
  typeSpeed = 80,
  deleteSpeed = 40,
}: TypewriterProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Respect prefers-reduced-motion
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mql.matches);

    const handler = (e: MediaQueryListEvent) => setShouldAnimate(!e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    const timeout = setTimeout(
      () => {
        const fullText = strings[currentStringIndex];

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));

          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));

          if (currentText === '') {
            setIsDeleting(false);
            setCurrentStringIndex((prev) => (prev + 1) % strings.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentStringIndex,
    strings,
    delay,
    typeSpeed,
    deleteSpeed,
    shouldAnimate,
  ]);

  if (!shouldAnimate) {
    return <span>{strings[0]}</span>;
  }

  return (
    <span className="inline-flex items-center">
      {currentText}
      <span className="animate-pulse border-r-2 border-foreground h-[1em] ml-[2px]"></span>
    </span>
  );
}
