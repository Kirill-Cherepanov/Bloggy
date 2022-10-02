import { Link, useNavigate } from 'react-router-dom';
import marked from 'marked';

import { formatDate, getPostsData } from 'utility';
import { Icon } from 'components/Elements';
import { Aside } from 'components/Layout';
import { ParallelogramCurtains } from '../components';
import { PostDataProp } from '..';
import { useAppSelector } from 'stores/globalStore';

const markedOptions: marked.MarkedOptions = {
  breaks: true,
};

type PostProps = {
  postData?: PostDataProp;
};

export function Post({ postData: initialData }: PostProps) {
  const postData = initialData || getPostsData(1)[0];
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.authSlice.user);

  if (!user?.blog) {
    navigate('/');
    return <></>;
  }

  return (
    <main className="py-8 px-page">
      <div className="border-b pb-1 border-secondary-300 flex justify-between">
        <button onClick={() => initialData || navigate(-1)}>
          <Icon type="long-arrow" className="h-4 text-secondary-700" />
        </button>
        <div className=" font-extralight">
          By{' '}
          <Link
            to={'/blog/' + postData.authorName}
            onClick={(e) => initialData || e.preventDefault()}
            className="font-normal hover:underline"
          >
            {postData.authorName}
          </Link>
          <span className="">{' | ' + formatDate(postData.createdAt)}</span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center my-6">{postData.title}</h2>

      {postData.image && (
        <img
          src={postData.image}
          alt="post"
          className="mx-auto max-w-full mb-10"
        />
      )}

      <div className="flex relative gap-20">
        <div className="h-min">
          <p className="text-lg">{marked(postData.text, markedOptions)}</p>
          <div className="mt-10 w-full flex gap-8 bg-secondary-800 py-8 px-5 rounded-lg">
            <Link
              to={'/blog/' + user.username}
              className="h-36 w-36 shrink-0 my-auto"
            >
              <img
                src={user.profilePic}
                alt="blog"
                className="h-full w-full object-cover rounded-full"
              />
            </Link>
            <div>
              <Link
                to={'/blog/' + user.username}
                className="block w-min text-xl font-bold uppercase mb-3 text-accent-400 cursor-pointer hover:underline"
              >
                {user.username}
              </Link>
              <p className="text-main line-clamp-5 font-light">
                {user.blog.description}
              </p>
            </div>
          </div>
        </div>

        <Aside shouldRenderPopular={!initialData}>
          {postData.categories.length > 0 && (
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
          )}

          {postData.description && (
            <div className="px-2 my-5">
              <h3 className="mx-auto mb-3 w-max bg-accent-400 px-3 py-2 font-bold text-xl uppercase">
                Description
              </h3>
              <p className="text-main text-justify">{postData.description}</p>
            </div>
          )}
        </Aside>
      </div>

      {!initialData && (
        <div className="mt-24 bg-accent-50 py-6">
          <h3 className="text-2xl font-display font-bold text-center mb-4">
            More on this blog
          </h3>
          <ParallelogramCurtains postsData={getPostsData(4)} />
        </div>
      )}
    </main>
  );
}
