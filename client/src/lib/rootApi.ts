import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from './customBaseQuery';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({}),
});
