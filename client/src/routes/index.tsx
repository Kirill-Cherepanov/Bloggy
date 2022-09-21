import { useRoutes } from 'react-router-dom';
import { lazily } from 'react-lazily';

import { useAppSelector } from 'stores/globalStore';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Spinner } from 'components/Elements';
import { AppLayout } from 'components/Layout';

const { PageNotFound, Landing } = lazily(() => import('features/misc'));
const { Catalog, Post, Blog } = lazily(() => import('features/blogs&posts'));

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);

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

  const routes = isLoggedIn ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  // if (isFetching) return <Spinner />;
  // if (isError && !('status' in error && error.status === 401)) throw error;

  return <>{element}</>;
};
