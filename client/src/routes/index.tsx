import { useRoutes } from 'react-router-dom';
import { lazily } from 'react-lazily';

import { useAppSelector } from 'stores/rootStore';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { AppLayout } from 'components/Layout';
import { Spinner } from 'components/Elements';
import { useGetAccessTokenQuery } from 'features/auth';

const { PageNotFound, Landing } = lazily(() => import('features/misc'));
const { Catalog, Post, Blog } = lazily(() => import('features/blogs&posts'));

export const AppRoutes = () => {
  const commonRoutes = [
    {
      element: <AppLayout />,
      children: [
        { path: '/blog/:name', element: <Blog /> },
        { path: '/catalog', element: <Catalog /> },
        { path: '/post/:id', element: <Post /> },
        { path: '/', element: <Landing /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ];

  const { isLoading, isError, error } = useGetAccessTokenQuery();
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);

  const routes = isLoggedIn ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Spinner />
      </div>
    );
  }
  if (isError && !('status' in error && error.status !== 401)) throw error;

  return <>{element}</>;
};
