import HeroSection from '../../components/HeroSection/HeroSection';
// import ParallelogramCurtains from '../../components/ParallelogramCurtains/ParallelogramCurtains';
// import SmallPost from '../Posts/SmallPost';
// import LargePost from '../Posts/LargePost';
// import BlogSwiper from '../../components/BlogSwiper/BlogSwiper';
import Footer from '../../components/Footer/Footer';

// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router';
// import axios from 'axios';

import bgImage from '../../images/Background-image.webp';
// import mockImage from '../../images/mock-up-image.webp';

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
      <main className="bg-main h-[1200px]">
        <HeroSection bgImage={bgImage} />
        {/* <section className="OUR_POSTS px-10">
          <h2 className="font-space-mono text-3xl text-center my-8">
            Our posts
          </h2>
          <ParallelogramCurtains mockImage={mockImage} />
        </section>
        <section className="SPORT px-10">
          <h2 className="font-space-mono text-3xl text-center my-8">Sport</h2>
          <ul className="grid grid-rows-3 grid-cols-2 gap-10">
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <SmallPost key={i} mockImage={mockImage} />
              ))}
            <LargePost
              mockImage={mockImage}
              className="row-start-1 row-end-4"
              textBoxClass="top-1/3 h-64 w-5/6"
            />
          </ul>
        </section>
        <section className="SCIENCE px-10">
          <h2 className="font-space-mono text-3xl text-center my-8">Science</h2>
          <ul className="grid grid-rows-2 grid-cols-2 gap-10 before:content-[''] before:w-0 before:pb-[65%] before:row-start-1 before:row-end-1 before:col-start-1 before:col-end-1 [&>*:first-child]:row-start-1 [&>*:first-child]:row-end-1 [&>*:first-child]:col-start-1 [&>*:first-child]:col-end-1 ">
            {Array(4)
              .fill(0)
              .map((v, i) => (
                <LargePost
                  key={i}
                  mockImage={mockImage}
                  textBoxClass="bottom-0 w-5/6 h-full max-h-64"
                />
              ))}
          </ul>
        </section>
        <section className="MUSIC px-10">
          <h2 className="font-space-mono text-3xl text-center my-8">Music</h2>
          <ul className="grid grid-rows-3 grid-cols-2 gap-10">
            {Array(3)
              .fill(0)
              .map((v, i) => (
                <SmallPost key={i} mockImage={mockImage} />
              ))}
            <LargePost
              mockImage={mockImage}
              className="row-start-1 row-end-4 col-start-2"
              textBoxClass="top-1/3 h-64 w-5/6"
            />
          </ul>
        </section>
        <section className="BLOGS px-10">
          <h2 className="font-space-mono text-3xl text-center my-8">
            Popular blogs
          </h2>
          <BlogSwiper mockImage={mockImage} />
        </section>  */}
      </main>
      <Footer />
    </>
  );
}
