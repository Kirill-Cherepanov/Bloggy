import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { logout } from 'features/auth';

const baseUrl = `/api/`;
const baseQuery = fetchBaseQuery({
  baseUrl,
});

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (!response.error || response.error.status !== 401) return response;

  // Handle a 401 error
  const refreshResult = await baseQuery(
    { credentials: 'include', url: '/auth/token' },
    api,
    extraOptions
  );

  if ((refreshResult.data as any)?.isLoggedIn) {
    response = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logout());
    // Preferably open a login pop up
  }

  return response;
};
