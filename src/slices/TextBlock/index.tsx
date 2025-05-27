import Bounded from '@/components/Bounded';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="prose prose-invert prose-lg prose-slate">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Bounded>
  );
};

export default TextBlock;
