import { PublicData } from 'types';
import { BlogSwiper } from '.';

type CatalogBlogsProps = { blogs: Required<PublicData>[] };

export function CatalogBlogs({ blogs }: CatalogBlogsProps) {
  return (
    <div className="my-12 flex justify-center gap-10">
      <BlogSwiper
        bloggers={blogs}
        sliderClassName={{
          wrapper: 'w-64 bg-accent-100',
          categories: 'border-secondary-400',
        }}
      />
    </div>
  );
}
