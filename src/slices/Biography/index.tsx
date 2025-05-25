import Bounded from '@/components/Bounded';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';
import Avatar from './Avatar';

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-[2fr_1fr]">
        <div className="order-1 space-y-8 lg:-order-1">
          <Heading as="h1" size="xl">
            {slice.primary.heading}
          </Heading>
          <div className="prose prose-xl prose-slate prose-invert">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <Button linkField={slice.primary.button_link} label={slice.primary.button_text} />
        </div>
        <Avatar image={slice.primary.avatar} className="max-w-sm" />
      </div>
    </Bounded>
  );
};

export default Biography;
