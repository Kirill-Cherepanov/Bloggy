import { lazily } from 'react-lazily';

const { Create } = lazily(() => import('features/blogs&posts'));
const { Settings } = lazily(() => import('features/settings'));

export const protectedRoutes = [
  { path: '/create', element: <Create /> },
  { path: '/settings', element: <Settings /> },
];
