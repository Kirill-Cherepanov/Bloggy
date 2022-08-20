import HeroSection from '../../components/HeroSection/HeroSection';
import ParallelogramCurtains from '../../components/ParallelogramCurtains/ParallelogramCurtains';
import SmallPost from '../Posts/SmallPost';
import LargePost from '../Posts/LargePost';
import BlogSwiper from '../../components/BlogSwiper/BlogSwiper';
import PostSwiper from '../../components/PostSwiper/PostSwiper';
import Wave from '../../components/Wave/Wave';
import Icon from '../../components/Icon/Icon';

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
        <div className="h-44 w-full flex items-end relative pointer-events-none">
          <Icon
            type="basketball"
            className="absolute top-0 left-1/2 -translate-x-1/2 fill-accent-500 h-12"
          />
          <Wave
            type="double"
            className="w-full h-[calc(100%-48px)] bg-accent-500 fill-main"
          />
        </div>
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
        <Wave type="layered" className="w-full h-52 pointer-events-none" />

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
        <div className="h-44 w-full flex items-end relative pointer-events-none">
          <Icon
            type="flask"
            className="absolute top-0 left-1/2 -translate-x-1/2 fill-accent-500 text-secondary-900 h-14"
          />
          <Wave
            type="double"
            className="w-full h-[calc(100%-56px)] bg-accent-500 fill-main"
          />
        </div>
        <section className="BLOGS bg-accent-500">
          <div className="px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-center pt-8 pb-4">
              Popular blogs
            </h2>
            <BlogSwiper mockImage={mockImage} />
          </div>
        </section>
        <Wave
          type="two-layered"
          className="w-full h-20 pointer-events-none rotate-180"
        />
        <section className="MUSIC px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto">
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
        <div className="w-full pointer-events-none mt-20 relative">
          <div className="w-full max-w-7xl mx-auto px-20">
            <Icon
              type="musical-key"
              className="absolute z-20 top-0 h-24 fill-secondary-800"
            />
          </div>
          {(() => {
            const notesPositions = [
              ['7%', '74%'],
              ['56%', '18%'],
              ['32%', '95%'],
              ['78%', '62%'],
              ['22%', '41%'],
              ['88%', '11%']
            ];
            return Array(6)
              .fill(0)
              .map((v, i) => (
                <div
                  key={i}
                  className="relative w-full h-5 border-b-2 last:border-b-0 group border-accent-500"
                >
                  <div className="relative w-[calc(100%-160px)] flex items-end h-full max-w-[1120px] mx-auto">
                    <Icon
                      type="note-1"
                      className="h-10 relative fill-secondary-800"
                      style={{ left: notesPositions[i][0] }}
                    ></Icon>
                    <Icon
                      type="note-2"
                      className="h-10 relative fill-secondary-800"
                      style={{ left: notesPositions[i][1] }}
                    ></Icon>
                  </div>
                </div>
              ));
          })()}
        </div>
      </main>
    </>
  );
}
