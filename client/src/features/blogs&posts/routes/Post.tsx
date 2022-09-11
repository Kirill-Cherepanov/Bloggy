import { Link, useNavigate } from 'react-router-dom';

import { getPostsData, blogInfo } from 'utility/mockData';
import formatDate from 'utility/formatDate';
import { Icon } from 'components/Elements';
import { Aside } from 'components/Layout';
import { ParallelogramCurtains } from '../components';

export function Post() {
  const postData = getPostsData(1)[0];
  const navigate = useNavigate();

  return (
    <main className="py-8 px-page">
      <div className="border-b pb-1 border-secondary-300 flex justify-between">
        <button onClick={() => navigate(-1)}>
          <Icon type="long-arrow" className="h-4 text-secondary-700" />
        </button>
        <div className=" font-extralight">
          By{' '}
          <Link
            to={'/blog/' + postData.authorName}
            className="font-normal hover:underline"
          >
            {postData.authorName}
          </Link>
          <span className="">{' | ' + formatDate(postData.createdAt)}</span>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center my-5">{postData.title}</h2>
      <img
        src={postData.image}
        alt="post"
        className="mx-auto max-w-full mb-10"
      />
      <div className="flex relative gap-20">
        <div className="h-min">
          <p className="text-lg">{postData.text}</p>
          <div className="mt-10 w-full flex gap-8 bg-secondary-800 py-8 px-5 rounded-lg">
            <Link
              to={'/blog/' + blogInfo.username}
              className="h-36 w-36 shrink-0 my-auto"
            >
              <img
                src={blogInfo.profilePic}
                alt="blog"
                className="h-full w-full object-cover rounded-full"
              />
            </Link>
            <div>
              <Link
                to={'/blog/' + blogInfo.username}
                className="block w-min text-xl font-bold uppercase mb-3 text-accent-400 cursor-pointer hover:underline"
              >
                {blogInfo.username}
              </Link>
              <p className="text-main line-clamp-5 font-light">
                {blogInfo.description}
              </p>
            </div>
          </div>
        </div>
        <Aside>
          <div className="px-2 my-5">
            <h3 className="mx-auto mb-3 w-max bg-accent-400 px-3 py-2 font-bold text-xl uppercase">
              Categories
            </h3>
            <div className="flex flex-wrap justify-evenly gap-y-2 gap-x-2">
              {postData.categories.map((category) => (
                <span
                  key={category}
                  className="text-lg border text-main border-secondary-400 rounded-sm px-1 cursor-pointer hover:bg-main hover:text-accent-900 hover:border-accent-400 transition-colors"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Aside>
      </div>
      <div className="mt-24 bg-accent-50 py-6">
        <h3 className="text-2xl font-display font-bold text-center mb-4">
          More on this blog
        </h3>
        <ParallelogramCurtains postsData={getPostsData(4)} />
      </div>
    </main>
  );
}
