import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from './customBaseQuery';

export const generalApi = createApi({
  reducerPath: 'general',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getImage: builder.query<File, string>({
      query: (image) => `/images/${image}`,
    }),
  }),
});

export const { useGetImageQuery } = generalApi;
