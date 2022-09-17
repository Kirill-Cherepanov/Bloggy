import { useRoutes } from 'react-router-dom';
import { lazily } from 'react-lazily';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useGetAccessTokenQuery } from 'features/auth';
import { Spinner } from 'components/Elements';
import { AppLayout } from 'components/Layout';

const { PageNotFound, Landing } = lazily(() => import('features/misc'));

export const AppRoutes = () => {
  const { data: token, isFetching, isError, error } = useGetAccessTokenQuery();

  const commonRoutes = [
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <Landing /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ];

  const routes = token ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  if (isFetching) return <Spinner />;
  if (isError && !('status' in error && error.status === 401)) throw error;

  return <>{element}</>;
};
