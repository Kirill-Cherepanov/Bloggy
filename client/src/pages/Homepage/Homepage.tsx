import Posts from '../../components/Posts/Posts';
// import Sidebar from '../../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import bgImage from '../../images/Background-image.png';
import Icon from '../../components/Icon';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <main className="HOMEPAGE">
        <header
          className="min-h-[720px] px-20 text-main bg-center bg-no-repeat bg-cover flex flex-col items-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="flex w-full justify-between gap-20">
            <div className="w-full mt-32 flex justify-between">
              <div>
                <button className="uppercase hover:border-b hover:-mb-1">
                  About us
                </button>
                <h1 className="text-5xl font-semibold mt-3 mb-9 min-w-max font-space-mono">
                  Open yourself
                  <br />
                  to the world
                </h1>
                <button className="group flex font-semibold items-center justify-center transition-all ease-out duration-300 hover:tracking-wide">
                  Check our Community{' '}
                  <Icon
                    type="return"
                    className="text-inherit ml-1 rotate-180 inline h-5 transition-all ease-out duration-300 group-hover:ml-4"
                  />
                </button>
              </div>
            </div>
            <ul className="flex flex-col mt-20 max-w-sm">
              <li className="mb-6">
                <h3 className="font-space-mono text-xl font-bold">
                  Find your audience
                </h3>
                <p className="text-justify">
                  This is a place where like-minded people can find each other.
                </p>
              </li>
              <li className="mb-6">
                <h3 className="font-space-mono text-xl font-bold">
                  Share your knowledge
                </h3>
                <p className="text-justify">
                  Tell your life stories, share your experience and learn what
                  people think about them.
                </p>
              </li>
              <li className="">
                <h3 className="font-space-mono text-xl font-bold">
                  Turn your thoughts into posts
                </h3>
                <p className="text-justify">
                  Just came up with a good joke? Realized something important
                  for everyone to know? Or are you just in the mood for someone
                  to hear you out? Don't be shy, bring your thoughts into the
                  world!
                </p>
              </li>
            </ul>
          </div>
          <div>
            <button className="flex justify-center items-center mt-14 p-4 rounded-full border-none text-lg pointer">
              <Icon
                type="angle"
                className="text-inherit h-14 -rotate-90 animate-slide"
              />
            </button>
          </div>
        </header>
        <section>
          <h2>Our posts</h2>
          <Posts posts={posts} />
        </section>
        <section>
          <h2>Trending posts</h2>
          <div>
            <h3>Sport</h3>
            <Posts posts={posts} />
          </div>
          <div>
            <h3>Music</h3>
            <Posts posts={posts} />
          </div>
          <div>
            <h3>Science</h3>
            <Posts posts={posts} />
          </div>
        </section>
        <section>
          <h2>Popular blogs</h2>
          <ul>
            <li>Cool Popular Blog</li>
            <li>Cool Popular Blog</li>
            <li>Cool Popular Blog</li>
            <li>Cool Popular Blog</li>
            <li>Cool Popular Blog</li>
          </ul>
        </section>
        <section>
          <button>Login</button>
          <button>Sign up</button>
        </section>
      </main>
    </>
  );
}
