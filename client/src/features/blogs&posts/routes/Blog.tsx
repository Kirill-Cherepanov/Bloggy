import { useParams } from 'react-router-dom';

import { useGetUserQuery } from '../api/usersApi';
import { BlogCard } from '../components';
import { usePost } from '../hooks';
import { PageNotFound } from 'features/misc';
import { Spinner } from 'components/Elements';
import { PublicData } from 'types';

export function Blog() {
  const { name } = useParams();
  const { data, isLoading, isError, error } = useGetUserQuery(name!, {
    skip: !name,
  });
  const { renderPost } = usePost();

  if (isLoading) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!name || !data?.user?.blog) return <PageNotFound />;

  if (isError) {
    console.error(error);
    return <PageNotFound />;
  }

  return (
    <main className="py-8 px-page">
      <div className="flex flex-row-reverse gap-4 xs:gap-8">
        <BlogCard {...(data.user as Required<PublicData>)} />
        <div className="grow">
          {data.user.blog.description && (
            <div className="w-full p-4 bg-accent-200 mb-6 rounded-md">
              <h3 className="font-display font-semibold text-2xl mb-2">
                Description
              </h3>
              <p>
                {data.user.blog.description || 'This blog has no description'}
              </p>
            </div>
          )}
          <ul className="[&>*]:mb-6 [&>*]:rounded-md [&>*:last-child]:mb-0">
            {data.posts.map((post) => renderPost(post))}
          </ul>
        </div>
      </div>
    </main>
  );
}
