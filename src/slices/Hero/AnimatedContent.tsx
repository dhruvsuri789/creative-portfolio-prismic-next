'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface AnimatedContentProps {
  children: React.ReactNode;
}

export default function AnimatedContent({ children }: AnimatedContentProps) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.name-animation',
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: 'elastic.out(1,0.3)',
          duration: 1,
          transformOrigin: 'left top',
          delay: 0.5,
          stagger: {
            each: 0.1,
            from: 'random',
          },
        },
      );

      tl.fromTo(
        '.job-title',
        { y: 20, opacity: 0, scale: 1.2 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1,0.3)' },
        '-=0.8',
      );
    },
    { scope: container },
  );
  return <div ref={container}>{children}</div>;
}
