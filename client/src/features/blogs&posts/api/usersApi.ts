import { PublicData, PostData } from 'types';
import { generalApi } from 'lib/generalApi';

export const usersApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ user: PublicData; posts: PostData[] }, string>({
      query: (username) => ({
        url: `/users/${username}`,
      }),
    }),
  }),
});

export const { useGetUserQuery } = usersApi;
