import HeroSection from '../../components/HeroSection/HeroSection';
import ParallelogramCurtains from '../../components/ParallelogramCurtains/ParallelogramCurtains';
import SmallPost from '../Posts/SmallPost';
import LargePost from '../Posts/LargePost';
import BlogSwiper from '../../components/BlogSwiper/BlogSwiper';
import PostSwiper from '../../components/PostSwiper/PostSwiper';
import BgTransition from '../../components/BgTransition/BgTransition';

import mockImage from '../../images/mock-up-image.webp';
import { useEffect, useState } from 'react';

// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
// import axios from 'axios';

export default function Home() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const updateIsLargeScreen = () =>
      setIsLargeScreen(window.innerWidth < 1024);

    window.addEventListener('resize', updateIsLargeScreen);

    return () => {
      window.removeEventListener('resize', updateIsLargeScreen);
    };
  }, []);

  // const [posts, setPosts] = useState<Post[]>([]);
  // const { search } = useLocation();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get('/posts' + search);
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, [search]);

  return (
    <>
      <main className="bg-main">
        <HeroSection />
        <section className="SPORT pt-6 pb-12 px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-center mb-10">
            Sport
          </h2>
          <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
            <LargePost
              mockImage={mockImage}
              className="transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:max-h-64"
            />
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <SmallPost key={i} mockImage={mockImage} />
              ))}
          </ul>
        </section>
        <BgTransition type="sport" />
        <section className="OUR_POSTS pb-5 bg-accent-500">
          <div className="lg:px-20 max-w-7xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-center mb-8">
              Our posts
            </h2>
            {isLargeScreen ? (
              <PostSwiper mockImage={mockImage} className="lg:hidden" />
            ) : (
              <ParallelogramCurtains
                mockImage={mockImage}
                className="hidden lg:flex"
              />
            )}
          </div>
        </section>
        <BgTransition type="our-posts" />
        <section className="SCIENCE px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-center my-8">
            Science
          </h2>
          <ul className="grid lg:grid-rows-2 lg:grid-cols-2 gap-4 lg:gap-10 lg:grid-squared">
            {Array(4)
              .fill(0)
              .map((v, i) => (
                <LargePost
                  key={i}
                  mockImage={mockImage}
                  className="transition-transform hover:scale-105 hidden lg:block"
                  textBoxClass="bottom-0 w-5/6 h-full max-h-64"
                />
              ))}
            <LargePost
              mockImage={mockImage}
              className="transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:hidden"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48"
            />
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <SmallPost
                  key={i}
                  mockImage={mockImage}
                  className="block lg:hidden"
                />
              ))}
          </ul>
        </section>
        <BgTransition type="science" />
        <section className="BLOGS bg-accent-500">
          <div className="px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-center pt-8 pb-4">
              Popular blogs
            </h2>
            <BlogSwiper mockImage={mockImage} />
          </div>
        </section>
        <BgTransition type="popular-blogs" />
        <section className="MUSIC px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto py-16">
          <h2 className="font-display font-bold text-3xl text-center my-8">
            Music
          </h2>
          <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
            <LargePost
              mockImage={mockImage}
              className="transition-transform hover:scale-105 row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto lg:col-start-2"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:max-h-64"
            />
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <SmallPost key={i} mockImage={mockImage} />
              ))}
          </ul>
        </section>
        <BgTransition type="music" />
      </main>
    </>
  );
}
