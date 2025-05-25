'use client';

import { cn } from '@/lib/utils';
import { ImageField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

type AvatarProps = {
  image: ImageField;
  className?: string;
};

function Avatar({ image, className }: AvatarProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.avatar',
        { opacity: 0, scale: 1.4 },
        { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.inOut' },
      );

      window.onmousemove = (e: MouseEvent) => {
        if (!componentRef.current) return;

        const componenentRect = (componentRef.current as HTMLDivElement).getBoundingClientRect();
        const componentCenterX = componenentRect.left + componenentRect.width / 2;

        const componentPercentage = {
          x: (e.clientX - componentCenterX) / componenentRect.width / 2,
        };

        const distFromCenter = 1 - Math.abs(componentPercentage.x);

        const tl = gsap.timeline({
          defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.Out' },
        });

        tl.to(
          '.avatar',
          {
            rotation: gsap.utils.clamp(-2, 2, componentPercentage.x * 5),
            duration: 0.5,
          },
          0,
        ).to(
          '.highlight',
          {
            opacity: distFromCenter - 0.7,
            x: -10 + 20 * componentPercentage.x,
            duration: 0.5,
          },
          0,
        );
      };
    },
    { scope: componentRef },
  );

  return (
    <div ref={componentRef} className={cn('relative h-full w-full', className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage field={image} imgixParams={{ q: 90 }} />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}

export default Avatar;
