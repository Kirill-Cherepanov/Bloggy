import { HeroSection, QuerySection } from '../components';
import {
  ParallelogramCurtains,
  SmallPost,
  LargePost,
  BlogSwiper,
  PostSwiper,
} from 'features/blogs&posts';

export function Landing() {
  return (
    <main className="bg-main">
      <HeroSection />

      <QuerySection
        query="q=sport&search=categories&sort=popular"
        bgTransitionType="sport"
        className="px-page mt-6 mb-8"
        minLength={4}
      >
        {(posts) => (
          <>
            <h2 className="font-display font-bold text-3xl text-center mb-8">
              Sport
            </h2>
            <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
              <LargePost
                postData={posts[0]}
                color="#f97316"
                className="shadow-lg transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto"
                textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
              />
              {posts.slice(1, 4).map((post) => (
                <SmallPost
                  key={post._id}
                  postData={post}
                  color="#f97316"
                  bgColor="#fef0e6"
                  className="lg:shadow-lg hover:scale-105"
                />
              ))}
            </ul>
          </>
        )}
      </QuerySection>

      <QuerySection
        query=""
        bgTransitionType="our-posts"
        className="xs:pb-4 sm:pb-8 bg-accent-500"
        minLength={5}
      >
        {(posts) => (
          <>
            <div className="lg:px-20 max-w-7xl mx-auto">
              <h2 className="font-display font-bold text-3xl text-center mb-8">
                Our posts
              </h2>
              <PostSwiper postsData={posts.slice(0, 5)} className="lg:hidden" />
              <ParallelogramCurtains
                postsData={posts.slice(0, 5)}
                className="hidden lg:flex"
              />
            </div>
          </>
        )}
      </QuerySection>

      <QuerySection
        query="q=science&search=categories&sort=popular"
        bgTransitionType="science"
        className="px-page my-8"
        minLength={4}
      >
        {(posts) => (
          <>
            <h2 className="font-display font-bold text-3xl text-center my-8">
              Science
            </h2>
            <ul className="grid lg:grid-rows-2 lg:grid-cols-2 gap-4 lg:gap-10 lg:grid-squared">
              {posts.slice(0, 4).map((post) => (
                <LargePost
                  key={post._id}
                  postData={post}
                  color="#10b981"
                  className="shadow-lg transition-transform hover:scale-105 hidden lg:block"
                  textBoxClass="bottom-0 w-5/6 h-full h-64"
                />
              ))}

              <LargePost
                postData={posts[0]}
                color="#10b981"
                className="shadow-lg transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:hidden"
                textBoxClass="bottom-8 w-5/6 h-40 sm:h-48"
              />
              {posts.slice(1, 4).map((post) => (
                <SmallPost
                  key={post._id}
                  postData={post}
                  color="#047857"
                  bgColor="#e5fff5"
                  className="block lg:hidden lg:shadow-lg hover:scale-105"
                />
              ))}
            </ul>
          </>
        )}
      </QuerySection>

      {/* IMPLEMENT BLOG SEARCH */}
      {/* <QuerySection
          query=""
          bgTransitionType="popular-blogs"
          className="bg-accent-500 pb-6"
          minLength={3}
        >
          {(posts) => (
            <>
              <div className="px-page">
                <h2 className="font-display font-bold text-3xl text-center mb-4">
                  Popular blogs
                </h2>
                <BlogSwiper blogsInfo={Array(10).fill(blogInfo)} />
              </div>
            </>
          )}
        </QuerySection> */}

      <QuerySection
        query="q=music&search=categories&sort=popular"
        bgTransitionType="music"
        className="px-page my-6 lg:my-12"
        minLength={4}
      >
        {(posts) => (
          <>
            <h2 className="font-display font-bold text-3xl text-center my-8">
              Music
            </h2>
            <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
              <LargePost
                postData={posts[0]}
                color="#F50B94"
                className="h-80 sm:h-100 md:h-[440px] lg:h-auto shadow-lg transition-transform hover:scale-105 row-start-1 lg:row-end-4 lg:col-start-2"
                textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:h-64"
              />
              {posts.slice(1, 4).map((post) => (
                <SmallPost
                  key={post._id}
                  postData={post}
                  bgColor="#fee7f4"
                  color="#F50B94"
                  className="lg:shadow-lg hover:scale-105"
                />
              ))}
            </ul>
          </>
        )}
      </QuerySection>
    </main>
  );
}
