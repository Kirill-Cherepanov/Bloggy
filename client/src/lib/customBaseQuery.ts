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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) return result;

  // Handle a 401 error
  const refreshResult = await baseQuery(
    { credentials: 'include', url: '/auth/token' },
    api,
    extraOptions
  );

  if ((refreshResult.data as any)?.isLoggedIn) {
    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logout());
    // Preferably open a login pop up
  }

  return result;
};
