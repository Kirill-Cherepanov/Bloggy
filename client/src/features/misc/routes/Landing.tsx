import { useEffect, useState } from 'react';

import { getPostsData, blogInfo } from 'utility/mockData';
import { BgTransition } from 'components/Layout';
import { HeroSection } from '../components';
import {
  ParallelogramCurtains,
  SmallPost,
  LargePost,
  BlogSwiper,
  PostSwiper,
} from 'features/blogs&posts';

export function Landing() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const updateIsLargeScreen = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    window
      .matchMedia('(max-width: 1024px)')
      .addEventListener('change', updateIsLargeScreen);

    return () => {
      window
        .matchMedia('(max-width: 1024px)')
        .removeEventListener('change', updateIsLargeScreen);
    };
  }, []);

  return (
    <>
      <main className="bg-main">
        <HeroSection />
        <section className="SPORT px-page mt-6 mb-8">
          <h2 className="font-display font-bold text-3xl text-center mb-10">
            Sport
          </h2>
          <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
            <LargePost
              {...getPostsData(1)[0]}
              color="#f97316"
              className="shadow-lg transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
            />
            {getPostsData(3).map((postData) => (
              <SmallPost
                key={postData._id}
                {...postData}
                color="#f97316"
                bgColor="#fef0e6"
                className="lg:shadow-lg hover:scale-105"
              />
            ))}
          </ul>
        </section>
        <BgTransition type="sport" />
        <section className="OUR_POSTS xs:pb-4 sm:pb-8 bg-accent-500">
          <div className="lg:px-20 max-w-7xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-center mb-8">
              Our posts
            </h2>
            {isLargeScreen ? (
              <PostSwiper postsData={getPostsData(5)} className="lg:hidden" />
            ) : (
              <ParallelogramCurtains
                postsData={getPostsData(5)}
                className="hidden lg:flex"
              />
            )}
          </div>
        </section>
        <BgTransition type="our-posts" />
        <section className="SCIENCE px-page my-8">
          <h2 className="font-display font-bold text-3xl text-center my-8">
            Science
          </h2>
          <ul className="grid lg:grid-rows-2 lg:grid-cols-2 gap-4 lg:gap-10 lg:grid-squared">
            {getPostsData(4).map((postData) => (
              <LargePost
                key={postData._id}
                {...postData}
                color="#10b981"
                className="shadow-lg transition-transform hover:scale-105 hidden lg:block"
                textBoxClass="bottom-0 w-5/6 h-full h-64"
              />
            ))}
            <LargePost
              {...getPostsData(1)[0]}
              color="#10b981"
              className="shadow-lg transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:hidden"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48"
            />
            {getPostsData(3).map((postData) => (
              <SmallPost
                key={postData._id}
                {...postData}
                color="#047857"
                bgColor="#e5fff5"
                className="block lg:hidden lg:shadow-lg hover:scale-105"
              />
            ))}
          </ul>
        </section>
        <BgTransition type="science" />
        <section className="BLOGS bg-accent-500 pb-6">
          <div className="px-page">
            <h2 className="font-display font-bold text-3xl text-center mb-4">
              Popular blogs
            </h2>
            <BlogSwiper blogsInfo={Array(10).fill(blogInfo)} />
          </div>
        </section>
        <BgTransition type="popular-blogs" />
        <section className="MUSIC px-page my-6 lg:my-12">
          <h2 className="font-display font-bold text-3xl text-center my-8">
            Music
          </h2>
          <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
            <LargePost
              {...getPostsData(1)[0]}
              color="#F50B94"
              className="shadow-lg transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto lg:col-start-2"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
            />
            {getPostsData(3).map((postData) => (
              <SmallPost
                key={postData._id}
                {...postData}
                bgColor="#fee7f4"
                color="#F50B94"
                className="lg:shadow-lg hover:scale-105"
              />
            ))}
          </ul>
        </section>
        <BgTransition type="music" />
      </main>
    </>
  );
}
