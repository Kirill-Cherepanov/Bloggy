import { LargePost, SmallPost } from '../components';
import { Aside } from 'components/Layout';
import { PostData } from 'types';

type CatalogPostsProps = { posts: PostData[] };

export function CatalogPosts({ posts }: CatalogPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center sm:text-2xl md:text-3xl lg:text-4xl">
        It looks like your query did not match anything
      </div>
    );
  }

  if (posts.length < 10) {
    return (
      <div className="flex relative gap-10 my-12">
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <SmallPost
              key={post._id}
              className="hover:scale-103"
              postData={post}
            />
          ))}
        </ul>
        <Aside />
      </div>
    );
  }

  return (
    <ul className="mb-12">
      <div className="mb-10 grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-8">
        <LargePost
          postData={posts[0]}
          className="shadow-lg transition-transform hover:scale-103 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto"
          textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
        />
        {posts.slice(1, 4).map((post) => (
          <SmallPost
            key={post._id}
            postData={post}
            className="shadow-lg hover:scale-103"
          />
        ))}
      </div>

      <div className="flex relative gap-10 mb-10">
        <div className="flex flex-col gap-6">
          {posts.slice(4, 7).map((post) => (
            <SmallPost postData={post} className="shadow-lg hover:scale-103" />
          ))}
          <LargePost
            className="max-h-100 shadow-lg transition-transform hover:scale-103"
            textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
            postData={posts[7]}
          />
        </div>
        <Aside />
      </div>

      <div className="flex gap-8 h-80">
        {posts.slice(8, 10).map((post) => (
          <LargePost
            postData={post}
            className="h-full shadow-lg transition-transform hover:scale-103 hidden lg:block"
            textBoxClass="bottom-0 w-5/6 h-full h-64"
          />
        ))}
      </div>
    </ul>
  );
}
