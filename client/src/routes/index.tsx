import { useRoutes } from 'react-router-dom';
import { lazily } from 'react-lazily/core/lazily';

import { useAuth } from 'lib/auth';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

const { PageNotFound, Landing } = lazily(() => import('features/misc'));

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '*', element: <PageNotFound /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  return <>{element}</>;
};
