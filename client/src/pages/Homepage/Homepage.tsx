import HeroSection from '../../components/HeroSection/HeroSection';
import ParallelogramCurtains from '../../components/ParallelogramCurtains/ParallelogramCurtains';
import SmallPost from '../Posts/SmallPost';
import LargePost from '../Posts/LargePost';
import BlogSwiper from '../../components/BlogSwiper/BlogSwiper';

// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
// import axios from 'axios';

import bgImage from '../../images/Background-image.webp';
import mockImage from '../../images/mock-up-image.webp';

export default function Home() {
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
        <HeroSection bgImage={bgImage} />
        {/* <section className="SPORT px-4 xs:px-8 sm:px-12 md:px-20">
          <h2 className="font-display text-3xl text-center my-8">Sport</h2>
          <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
            <LargePost
              mockImage={mockImage}
              className="row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:max-h-64"
            />
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <SmallPost key={i} mockImage={mockImage} />
              ))}
          </ul>
        </section> */}
        <section className="OUR_POSTS px-4 xs:px-8 sm:px-12 md:px-20">
          <h2 className="font-display text-3xl text-center my-8">Our posts</h2>
          <ParallelogramCurtains mockImage={mockImage} />
        </section>
        {/* <section className="MUSIC px-4 xs:px-8 sm:px-12 md:px-20">
          <h2 className="font-display text-3xl text-center my-8">Music</h2>
          <ul className="grid gap-4 grid-flow-row lg:grid-rows-3 lg:grid-cols-2 lg:gap-10">
            <LargePost
              mockImage={mockImage}
              className="row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:h-auto lg:col-start-2"
              textBoxClass="bottom-8 w-5/6 h-40 sm:h-48 xl:max-h-64"
            />
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <SmallPost key={i} mockImage={mockImage} />
              ))}
          </ul>
        </section> */}
        {/* <section className="BLOGS px-4 xs:px-8 sm:px-12 md:px-20">
          <h2 className="font-display text-3xl text-center my-8">
            Popular blogs
          </h2>
          <BlogSwiper mockImage={mockImage} />
        </section> */}
        {/* <section className="SCIENCE px-4 xs:px-8 sm:px-12 md:px-20">
          <h2 className="font-display text-3xl text-center my-8">Science</h2>
          <ul className="grid lg:grid-rows-2 lg:grid-cols-2 gap-4 lg:gap-10 lg:grid-squared">
            {Array(4)
              .fill(0)
              .map((v, i) => (
                <LargePost
                  key={i}
                  mockImage={mockImage}
                  className="hidden lg:block"
                  textBoxClass="bottom-0 w-5/6 h-full max-h-64"
                />
              ))}
            <LargePost
              mockImage={mockImage}
              className="row-start-1 lg:row-end-4 h-80 sm:h-100 md:h-[440px] lg:hidden"
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
        </section> */}
      </main>
    </>
  );
}
