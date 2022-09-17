import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const generalApi = createApi({
  reducerPath: 'general',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getImage: builder.query({
      query: (image) => `/images/${image}`,
    }),
  }),
});

export const { useGetImageQuery } = generalApi;
