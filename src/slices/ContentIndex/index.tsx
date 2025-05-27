import Bounded from '@/components/Bounded';
import Heading from '@/components/Heading';
import { createClient } from '@/prismicio';
import { Content, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';
import ContentList from './ContentList';

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex: FC<ContentIndexProps> = async ({ slice }) => {
  const client = createClient();
  const [blogPosts, projects] = await Promise.all([
    client.getAllByType('blog_post', { pageSize: 10 }),
    client.getAllByType('project', { pageSize: 10 }),
  ]);
  const contentType = slice.primary.content_type || 'Blog';
  const items = contentType === 'Blog' ? blogPosts : projects;

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Heading as="h1" size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-slate prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      <ContentList
        items={items}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ContentIndex;
