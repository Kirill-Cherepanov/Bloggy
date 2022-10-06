import { PostData, PublicData } from 'types';
import { generalApi } from 'lib/generalApi';
import { CreatePostValues, UpdatePostValues } from '../types';
import { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

type CreatePostReturnType =
  | {
      success: true;
      post: PostData;
    }
  | { success: false };

type GetPostReturnType = {
  post: PostData;
  author: PublicData;
  otherPosts: PostData[];
};

type SearchPostsReturnType = { posts: PostData[]; total: number };

export const postsApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostReturnType, CreatePostValues>({
      invalidatesTags: invalidateCreatePostTags,
      query: (values) => {
        const data = new Blob([JSON.stringify(values.data)], {
          type: 'application/json',
        });
        const body = new FormData();
        body.append('request-json', data);
        if (values.image) body.append('post-image', values.image);

        return {
          url: '/posts/',
          method: 'POST',
          credentials: 'include',
          body,
        };
      },
    }),

    editPost: builder.mutation<CreatePostReturnType, UpdatePostValues>({
      invalidatesTags: invalidateEditPostTags,
      query: (values) => {
        const data = new Blob([JSON.stringify(values.data)], {
          type: 'application/json',
        });
        const body = new FormData();
        body.append('request-json', data);
        if (values.image) body.append('post-image', values.image);

        return {
          url: `/posts/${values.data._id}`,
          method: 'PATCH',
          credentials: 'include',
          body,
        };
      },
    }),

    deletePost: builder.mutation<{ success: boolean }, string>({
      invalidatesTags: invalidateDeletePostTags,
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),

    likePost: builder.mutation<{ success: boolean }, string>({
      invalidatesTags: (result, error, id) =>
        result?.success ? [{ type: 'Post', id }] : [],
      query: (id) => ({
        url: `/posts/like/${id}`,
        method: 'PUT',
        credentials: 'include',
      }),
      // TODO: OPTIMISTIC UPDATES
      // onQueryStarted: async (id, api) => {
      //   const patchedGetPost = api.dispatch(
      //     postsApi.util.updateQueryData('getPost', id, (getPostData) => {
      //       getPostData.post.likes += getPostData.post.isLiked ? -1 : 1;
      //       getPostData.post.isLiked = !getPostData.post.isLiked;
      //     })
      //   );
      //   const username = [];
      //   const patchedGetUser = api.dispatch(
      //     usersApi.util.updateQueryData('getUser', username, (getUserData) => {
      //       const post = getUserData.posts.find(post => post._id === id);
      //       if (!post) return;
      //       post.likes += post.isLiked ? -1 : 1;
      //       post.isLiked = !post.isLiked;
      //     })
      //   )
      //   try {
      //     const { data } = await api.queryFulfilled;
      //     if (data.success) return;
      //      patchedGetPost.undo();
      //      patchedGetUser.undo();
      //     } catch {
      //       patchedGetPost.undo();
      //       patchedGetUser.undo();
      //   }
      // },
    }),

    getPost: builder.query<GetPostReturnType, string>({
      providesTags: provideGetPostTags,
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),

    searchPosts: builder.query<SearchPostsReturnType, string>({
      providesTags: provideSearchPostsTags,
      query: (query) => ({
        url: `/posts?${query}`,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useGetPostQuery,
  useSearchPostsQuery,
} = postsApi;

function invalidateCreatePostTags(
  result?: CreatePostReturnType
): TagDescription<'Post' | 'User'>[] {
  if (!result?.success) return [];

  return [
    { type: 'Post', id: 'PARTIAL-LIST' },
    { type: 'User', id: result.post.authorName },
  ];
}

function invalidateEditPostTags(
  result?: CreatePostReturnType
): TagDescription<'Post' | 'User'>[] {
  if (!result?.success) return [];

  return [
    { type: 'Post', id: 'PARTIAL-LIST' },
    { type: 'Post', id: result.post._id },
  ];
}

function invalidateDeletePostTags(
  result?: { success: boolean },
  error?: unknown,
  id?: string
): TagDescription<'Post' | 'User'>[] {
  if (!result?.success) return [];

  return [
    { type: 'Post', id },
    { type: 'Post', id: 'PARTIAL-LIST' },
  ];
}

function provideGetPostTags(
  result?: GetPostReturnType
): TagDescription<'Post' | 'User'>[] {
  if (!result) return ['Post', 'User'];

  const postTag = { type: 'Post' as const, id: result.post._id };
  const userTag = { type: 'User' as const, id: result.author.username };

  const otherPostsTags = result.otherPosts.map(({ _id }) => ({
    type: 'Post' as const,
    id: _id,
  }));

  return [...otherPostsTags, postTag, userTag];
}

function provideSearchPostsTags(
  result?: SearchPostsReturnType
): TagDescription<'Post' | 'User'>[] {
  if (!result) return [{ type: 'Post', id: 'PARTIAL-LIST' }];

  console.log(result);

  const postsTags = result.posts.map(({ _id }) => ({
    type: 'Post' as const,
    id: _id,
  }));

  return [...postsTags, { type: 'Post', id: 'PARTIAL-LIST' }];
}
