import Bounded from '@/components/Bounded';
import { Content, KeyTextField } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';
import AnimatedContent from './AnimatedContent';
import AnimatedShapes from './AnimatedShapes';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;

    return name.split('').map((letter, index) => (
      <span
        key={`${key}-${index}`}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
        <AnimatedContent>
          <div className="col-start-1 md:row-start-1">
            <h1
              className="mb-8 text-[clamp(3rem,20vmin,20rem)] leading-none font-extrabold tracking-tighter"
              aria-label={slice.primary.first_name + ' ' + slice.primary.last_name}
            >
              <span className="block text-slate-300">
                {renderLetters(slice.primary.first_name, 'first')}
              </span>
              <span className="-mt-[0.15em] block text-slate-500">
                {renderLetters(slice.primary.last_name, 'last')}
              </span>
            </h1>
            <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold tracking-[.2em] text-transparent uppercase opacity-0 md:text-4xl">
              {slice.primary.tag_line}
            </span>
          </div>
        </AnimatedContent>
        <AnimatedShapes />
      </div>
    </Bounded>
  );
};

export default Hero;
