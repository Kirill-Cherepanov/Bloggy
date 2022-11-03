import { Navigate } from 'react-router';

import { ABOUT_PAGE_POST_URL } from 'config';

export const About = () => <Navigate to={ABOUT_PAGE_POST_URL} replace />;
