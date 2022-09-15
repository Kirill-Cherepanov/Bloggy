import { lazily } from 'react-lazily';

const { Registration } = lazily(() => import('features/auth'));

export const publicRoutes = [
  {
    path: '/registration',
    element: <Registration />,
  },
];
