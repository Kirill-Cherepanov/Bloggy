import { Link, useNavigate, useParams } from 'react-router-dom';
import Markdown from 'marked-react';

import { formatDate } from 'utility';
import { Icon, ProfilePicture, Spinner } from 'components/Elements';
import { Aside } from 'components/Layout';
import { ParallelogramCurtains } from '../components';
import { useGetPostQuery } from '../api/postsApi';
import { PageNotFound } from 'features/misc';
import { PostData, PublicData } from 'types';
import { useAppSelector } from 'stores/globalStore';

type PostProps = {
  initialData?: {
    post: PostData;
    author: PublicData;
  };
};

export function Post({ initialData }: PostProps) {
  const user = useAppSelector((state) => state.authSlice.user);
  const { id } = useParams();
  const navigate = useNavigate();

  let author = initialData?.author;
  let post = initialData?.post;
  const { data, isFetching, isError, error } = useGetPostQuery(id!, {
    skip: !id || !!initialData,
  });

  if (!post) {
    if (isFetching) {
      return (
        <div className="w-full h-100 flex items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if (isError) {
      console.error(error);
      return <PageNotFound />;
    }
    if (!id || !data) return <PageNotFound />;

    post = data.post;
    author = data.author;
  }

  console.log(post);

  return (
    <main className="py-8 px-page">
      <div className="border-b pb-1 border-secondary-300 flex justify-between group">
        <button onClick={() => initialData || navigate(-1)}>
          <Icon type="long-arrow" className="h-4 text-secondary-700" />
        </button>

        {user?.username === post.authorName ? (
          <>
            <div className="font-extralight group-hover:hidden">
              <span>By </span>
              <Link
                to={'/blog/' + post.authorName}
                onClick={(e) => initialData && e.preventDefault()}
                className="font-normal hover:underline"
              >
                {post.authorName}
              </Link>
              <span>{' | ' + formatDate(post.createdAt)}</span>
            </div>
            <Link
              to={`/edit/${post._id}`}
              onClick={(e) => initialData && e.preventDefault()}
              className="hidden group-hover:inline hover:underline"
            >
              Edit post
            </Link>
          </>
        ) : (
          <div className="font-extralight">
            <span>By </span>
            <Link
              to={'/blog/' + post.authorName}
              onClick={(e) => initialData && e.preventDefault()}
              className="font-normal hover:underline"
            >
              {post.authorName}
            </Link>
            <span>{' | ' + formatDate(post.createdAt)}</span>
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold text-center my-6">{post.title}</h2>

      {post.image && (
        <img
          src={`/api/images/postImgs/${post.image}`}
          alt="post"
          className="mx-auto max-w-full mb-10"
        />
      )}

      <div className="flex relative gap-20">
        <div className="h-min w-full">
          <div className="text-lg custom-markdown">
            {post.text ? (
              <Markdown breaks={true}>{post.text}</Markdown>
            ) : (
              'This post has no text'
            )}
          </div>

          {author?.blog && (
            <div className="mt-10 w-full flex gap-8 bg-secondary-800 py-8 px-5 rounded-lg">
              <Link
                to={'/blog/' + author.username}
                onClick={(e) => initialData && e.preventDefault()}
                className="h-36 w-36 shrink-0 my-auto"
              >
                <ProfilePicture className="h-full w-full" />
              </Link>
              <div>
                <Link
                  to={'/blog/' + author.username}
                  onClick={(e) => initialData && e.preventDefault()}
                  className="block w-min text-xl font-bold uppercase mb-3 text-accent-400 cursor-pointer hover:underline"
                >
                  {author.username}
                </Link>
                <p className="text-main line-clamp-5 font-light">
                  {author.blog.description || 'This blog has no description'}
                </p>
              </div>
            </div>
          )}
        </div>

        {(!initialData || post.categories.length > 0 || post.description) && (
          <Aside shouldRenderPopular={!initialData}>
            {post.categories.length > 0 && (
              <div className="px-2 my-5">
                <h3 className="mx-auto mb-3 w-max bg-accent-400 px-3 py-2 font-bold text-xl uppercase">
                  Categories
                </h3>
                <div className="flex flex-wrap justify-evenly gap-y-2 gap-x-2">
                  {post.categories.map((category) => (
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

            {post.description && (
              <div className="px-2 my-5">
                <h3 className="mx-auto mb-3 w-max bg-accent-400 px-3 py-2 font-bold text-xl uppercase">
                  Description
                </h3>
                <p className="text-main text-justify">{post.description}</p>
              </div>
            )}
          </Aside>
        )}
      </div>

      {!initialData && data?.otherPosts && data.otherPosts.length >= 4 && (
        <div className="mt-24 bg-accent-50 py-6">
          <h3 className="text-2xl font-display font-bold text-center mb-4">
            More on this blog
          </h3>
          <ParallelogramCurtains postsData={data.otherPosts} />
        </div>
      )}
    </main>
  );
}
