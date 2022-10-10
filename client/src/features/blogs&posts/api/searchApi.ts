import { PostData, PublicData } from 'types';
import { rootApi } from 'lib/rootApi';
import { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export type SearchPostsReturnType = {
  total: number;
  values: PostData[];
  type: 'posts';
};

export type SearchBlogsReturnType = {
  total: number;
  values: Required<PublicData>[];
  type: 'blogs';
};

export type SearchReturnType = SearchBlogsReturnType | SearchPostsReturnType;

export const searchApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SearchReturnType, string>({
      providesTags: provideSearchTags,
      query: (query) => ({
        url: `/search?${query}`,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApi;

function provideSearchTags(
  result?: SearchReturnType
): TagDescription<'Post' | 'User'>[] {
  if (!result) {
    return [
      { type: 'Post', id: 'PARTIAL-LIST' },
      { type: 'User', id: 'PARTIAL-LIST' },
    ];
  }

  if (result.type === 'posts') {
    return [
      ...result.values.map(({ _id }) => ({
        type: 'Post' as const,
        id: _id,
      })),
      { type: 'Post', id: 'PARTIAL-LIST' },
    ];
  }

  return [
    ...result.values.map(({ username }) => ({
      type: 'User' as const,
      id: username,
    })),
    { type: 'User', id: 'PARTIAL-LIST' },
  ];
}
