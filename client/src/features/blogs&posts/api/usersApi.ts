import { PublicData, PostData } from 'types';
import { generalApi } from 'lib/generalApi';
import { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

type GetUserReturnType = { user: PublicData; posts: PostData[] };

export const usersApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserReturnType, string>({
      providesTags: provideGetUserTags,
      query: (username) => ({
        url: `/users/${username}`,
      }),
    }),
  }),
});

export const { useGetUserQuery } = usersApi;

function provideGetUserTags(
  result?: GetUserReturnType
): TagDescription<'Post' | 'User'>[] {
  if (!result) return ['Post', 'User'];

  const postsTags = result.posts.map(({ _id }) => ({
    type: 'Post' as const,
    id: _id,
  }));

  return [
    ...postsTags,
    { type: 'User', id: result.user.username },
    'User',
    'Post',
  ];
}
