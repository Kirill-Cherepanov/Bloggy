import { AppLayout } from 'components/Layout';
import { lazily } from 'react-lazily';

const { Catalog, Post, Create, Blog } = lazily(
  () => import('features/blogs&posts')
);
const { Settings } = lazily(() => import('features/settings'));

export const protectedRoutes = [
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { path: '/blog/:name', element: <Blog /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/post/:id', element: <Post /> },
      { path: '/create', element: <Create /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
];
