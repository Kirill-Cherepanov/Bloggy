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
      <div className="HOMEPAGE">
        <header
          className="min-h-[100vh] text-main bg-center bg-no-repeat bg-cover flex flex-col items-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="w-full px-20 mt-40 flex justify-between">
            <div>
              <button className="uppercase hover:border-b hover:-mb-1">
                About us
              </button>
              <h1 className="text-5xl font-semibold mt-3 mb-9 min-w-max font-headers">
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
            <p className="max-w-xs text-justify mt-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
              maxime quos culpa itaque adipisci minus quibusdam perspiciatis
              aliquid accusamus eius!
            </p>
          </div>
          <div>
            <button className="flex justify-center items-center mt-8 p-4 rounded-full border-none text-lg pointer">
              <Icon
                type="angle"
                className="text-inherit h-14 -rotate-90 animate-slide"
              />
            </button>
          </div>
        </header>
        <ul>
          <li>
            <h2>Find your audience</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusantium vitae adipisci delectus cum. Unde amet aspernatur
              eveniet qui inventore nemo delectus dolore quasi obcaecati maiores
              cupiditate placeat voluptatem ipsa numquam, sint enim blanditiis?
              Delectus iste laudantium ut tempora veniam totam dignissimos
              nostrum sed laboriosam rem autem placeat, vero explicabo omnis!
            </p>
          </li>
          <li>
            <h2>Share your knowledge</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusantium vitae adipisci delectus cum. Unde amet aspernatur
              eveniet qui inventore nemo delectus dolore quasi obcaecati maiores
              cupiditate placeat voluptatem ipsa numquam, sint enim blanditiis?
              Delectus iste laudantium ut tempora veniam totam dignissimos
              nostrum sed laboriosam rem autem placeat, vero explicabo omnis!
            </p>
          </li>
          <li>
            <h2>Turn your thoughts into posts</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusantium vitae adipisci delectus cum. Unde amet aspernatur
              eveniet qui inventore nemo delectus dolore quasi obcaecati maiores
              cupiditate placeat voluptatem ipsa numquam, sint enim blanditiis?
              Delectus iste laudantium ut tempora veniam totam dignissimos
              nostrum sed laboriosam rem autem placeat, vero explicabo omnis!
            </p>
          </li>
        </ul>
        <Posts posts={posts} />
      </div>
    </>
  );
}
