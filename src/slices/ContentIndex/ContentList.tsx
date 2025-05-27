'use client';

import { asImageSrc, Content, ImageField, isFilled, KeyTextField } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { MdArrowOutward } from 'react-icons/md';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ContentListProps {
  items: Content.BlogPostDocument<string>[] | Content.ProjectDocument<string>[];
  viewMoreText: KeyTextField;
  fallbackItemImage: ImageField;
}

export default function ContentList({
  items,
  viewMoreText = 'Read More',
  fallbackItemImage,
}: ContentListProps) {
  const container = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const [currentItem, setCurrentItem] = useState<null | number>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'elastic.out(1,0.3)',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100px',
              end: 'bottom center',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    },
    { scope: container },
  );

  useGSAP(
    () => {
      if (!container.current) return;

      const handleMouseMove = (e: MouseEvent) => {
        const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
        // Calculate speed and direction
        const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            // Apply rotation based on speed and direction
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: 'back.out(2)',
            duration: 1.3,
            opacity: 1,
          });
        }
        lastMousePos.current = mousePos;
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    },
    { dependencies: [currentItem], scope: container },
  );

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;
    return asImageSrc(image, {
      fit: 'crop',
      w: 220,
      h: 320,
      exp: -10,
    });
  });

  // Calling images before hover: Preloading images
  /* useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]); */

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
  };

  const onMouseLeave = () => {
    setCurrentItem(null);
  };

  return (
    <div ref={container}>
      <ul className="grid border-b border-b-slate-100" onMouseLeave={onMouseLeave}>
        {items.map(
          (item, index) =>
            isFilled.keyText(item.data.title) && (
              <li
                key={`${index}-${item.id}`}
                className="list-item opacity-0"
                onMouseEnter={() => onMouseEnter(index)}
                ref={(el) => {
                  if (!el) return;
                  itemsRef.current[index] = el;
                }}
              >
                <PrismicNextLink
                  className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
                  aria-label={item.data.title}
                  document={item}
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl font-bold">{item.data.title}</span>
                    <div className="flex gap-3 text-lg font-bold text-yellow-400">
                      {item.tags.map((tag, index) => (
                        <span key={`${index}-${tag}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                    {viewMoreText} <MdArrowOutward />
                  </span>
                </PrismicNextLink>
              </li>
            ),
        )}
      </ul>
      {/* Hover Element */}
      <div
        ref={revealRef}
        className="hover-reveal pointer-events-none absolute top-0 left-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})` : '',
        }}
      />
    </div>
  );
}
