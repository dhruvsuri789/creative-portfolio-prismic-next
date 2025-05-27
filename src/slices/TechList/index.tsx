import Heading from '@/components/Heading';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import React, { FC } from 'react';
import { MdCircle } from 'react-icons/md';
import AnimatedContent from './AnimatedContent';

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList: FC<TechListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14 lg:py-16">
        <Heading as="h2" size="xl" className="mb-8">
          {slice.primary.heading}
        </Heading>
      </div>
      <AnimatedContent>
        {slice.primary.tech_stack.map(({ tech_name, tech_color }, index) => (
          // Render the item
          <div
            key={`${index}-${tech_name}`}
            className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
            aria-label={tech_name || undefined}
          >
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <span
                  className="tech-item text-8xl font-extrabold tracking-tighter uppercase"
                  style={{ color: i === 7 && tech_color ? tech_color : 'inherit' }}
                >
                  {tech_name}
                </span>
                <span className="text-3xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </AnimatedContent>
    </section>
  );
};

export default TechList;
