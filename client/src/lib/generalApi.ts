import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from './customBaseQuery';

export const generalApi = createApi({
  reducerPath: 'general',
  baseQuery: customBaseQuery,
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({}),
});
