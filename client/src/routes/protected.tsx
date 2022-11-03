import { lazily } from 'react-lazily';

const { Create, Edit } = lazily(() => import('features/blogs&posts'));
const { Settings } = lazily(() => import('features/settings'));

export const protectedRoutes = [
  { path: '/edit/:id', element: <Edit /> },
  { path: '/create', element: <Create /> },
  { path: '/settings', element: <Settings /> },
  { path: '/settings/:tab', element: <Settings /> },
];
