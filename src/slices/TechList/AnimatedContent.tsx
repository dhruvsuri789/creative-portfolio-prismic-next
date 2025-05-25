'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedContentProps {
  children: React.ReactNode;
}

export default function AnimatedContent({ children }: AnimatedContentProps) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!container.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 4,
          markers: false,
        },
      });

      tl.fromTo(
        '.tech-row',
        {
          x: (index) => {
            return index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400);
          },
          ease: 'power1.inOut',
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
