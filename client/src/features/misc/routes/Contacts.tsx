import { Navigate } from 'react-router';

import { CONTACTS_PAGE_POST_URL } from 'config';

export const Contacts = () => <Navigate to={CONTACTS_PAGE_POST_URL} replace />;
