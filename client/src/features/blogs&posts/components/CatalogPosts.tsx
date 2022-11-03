import { LargePost, SmallPost } from '../components';
import { Aside } from 'components/Layout';
import { PostData } from 'types';

type CatalogPostsProps = { posts: PostData[] };

export function CatalogPosts({ posts }: CatalogPostsProps) {
  if (posts.length < 10) {
    return (
      <div className="flex relative gap-10 my-12">
        <ul className="flex flex-col gap-6 w-full">
          {posts.map((post) => (
            <SmallPost
              key={post._id}
              className="hover:scale-103"
              postData={post}
            />
          ))}
        </ul>
        <Aside className="hidden lg:flex" />
      </div>
    );
  }

  return (
    <ul className="my-12">
      <div className="lg:mb-10 grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-8">
        <LargePost
          postData={posts[0]}
          className="shadow-lg hover:scale-103 row-start-1 lg:row-end-4 lg:h-auto"
          shouldAnimate={true}
        />
        {posts.slice(1, 4).map((post) => (
          <SmallPost
            key={post._id}
            postData={post}
            className="shadow-lg hover:scale-103"
          />
        ))}
      </div>

      <div className="flex relative gap-10 lg:mb-10">
        <div className="flex flex-col gap-6">
          <LargePost
            postData={posts[4]}
            className="shadow-lg hover:scale-103"
            shouldAnimate={true}
          />
          {posts.slice(5, 8).map((post) => (
            <SmallPost
              key={post._id}
              postData={post}
              className="shadow-lg hover:scale-103"
            />
          ))}
        </div>
        <Aside className="hidden lg:flex" />
      </div>

      <div className="gap-8 h-80 hidden lg:flex">
        {posts.slice(8, 10).map((post) => (
          <LargePost
            key={post._id}
            postData={post}
            className="h-full shadow-lg hover:scale-103 w-full"
            textBoxClass="w-5/6 h-56"
            shouldAnimate={true}
            size="none"
            textBoxPosition="fullBottomLeft"
          />
        ))}
      </div>
    </ul>
  );
}
