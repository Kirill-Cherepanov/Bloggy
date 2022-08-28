import ExtensiveSearchBar from 'components/ExtensiveSearchBar/ExtensiveSearchBar';
import Aside from 'components/Aside/Aside';
import LargePost from 'components/Posts/LargePost';
import SmallPost from 'components/Posts/SmallPost';
import { getPostsData } from 'utility/mockData';
import Icon from 'components/Icon/Icon';

export default function Catalog() {
  const posts = getPostsData(10);

  return (
    <main className="pt-8 px-page">
      <ExtensiveSearchBar />
      <ul>
        {posts.length < 10 ? (
          <div className="flex relative gap-10">
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <SmallPost
                  key={post._id}
                  className="hover:scale-103"
                  {...post}
                />
              ))}
            </div>
            <Aside />
          </div>
        ) : (
          <>
            <div className="mb-10 grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-8">
              <LargePost
                {...posts[0]}
                className="shadow-lg transition-transform hover:scale-103 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto"
                textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
              />
              {posts.slice(1, 4).map((postData) => (
                <SmallPost
                  key={postData._id}
                  {...postData}
                  className="shadow-lg hover:scale-103"
                />
              ))}
            </div>

            <div className="flex relative gap-10 mb-10">
              <div className="flex flex-col gap-6">
                {posts.slice(4, 7).map((post) => (
                  <SmallPost {...post} className="shadow-lg hover:scale-103" />
                ))}
                <LargePost
                  className="max-h-100 shadow-lg transition-transform hover:scale-103"
                  textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
                  {...posts[7]}
                />
              </div>
              <Aside />
            </div>

            <div className="flex gap-8 h-80">
              {posts.slice(8, 10).map((post) => (
                <LargePost
                  {...post}
                  className="h-full shadow-lg transition-transform hover:scale-103 hidden lg:block"
                  textBoxClass="bottom-0 w-5/6 h-full h-64"
                />
              ))}
            </div>
          </>
        )}
      </ul>

      <div className="flex justify-center mt-12 gap-6">
        <button className="uppercase h-14 w-40 flex gap-1 items-center justify-center bg-secondary-800 text-main text-lg font-medium hover:tracking-widest transition-all">
          <Icon type="angle" className="h-5 -translate-y-[1px]" />
          Previous
        </button>
        <button className="uppercase h-14 w-40 flex gap-1 items-center justify-center bg-secondary-800 text-main text-lg font-medium hover:tracking-widest transition-all">
          Next
          <Icon type="angle" className="rotate-180 h-5 -translate-y-[1px]" />
        </button>
      </div>
    </main>
  );
}
