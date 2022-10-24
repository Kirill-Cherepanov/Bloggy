import { PostData, PublicData } from 'types';
import { rootApi } from 'lib/rootApi';
import { CreatePostValues, UpdatePostValues } from '../types';
import { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { usersApi } from './usersApi';
import { searchApi, SearchReturnType } from './searchApi';

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

export const postsApi = rootApi.injectEndpoints({
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
          body,
          credentials: 'include',
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
          body,
          credentials: 'include',
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

    likePost: builder.mutation<{ success: boolean }, PostData>({
      query: ({ _id }) => ({
        url: `/posts/like/${_id}`,
        method: 'PUT',
        credentials: 'include',
      }),
      onQueryStarted: async ({ _id, authorName, isLiked }, api) => {
        const patchedGetPost = api.dispatch(
          postsApi.util.updateQueryData('getPost', _id, (getPostData) => {
            getPostData.post.likes += isLiked ? -1 : 1;
            getPostData.post.isLiked = !isLiked;
          })
        );

        const patchedGetUser = api.dispatch(
          usersApi.util.updateQueryData(
            'getUser',
            authorName,
            (getUserData) => {
              const post = getUserData.posts.find((post) => post._id === _id);
              if (!post) return;
              post.likes += isLiked ? -1 : 1;
              post.isLiked = !isLiked;
              getUserData.user.blog!.likes += isLiked ? -1 : 1;
            }
          )
        );

        // Not having normalized cache is stupid. Here is proof
        const queries = Object.values(api.getState().rootApi.queries)
          .filter((query) => {
            if (query?.endpointName !== 'search') return false;

            const data = query?.data as SearchReturnType | undefined;

            if (data?.type === 'posts') {
              return !!data.values.find((post) => post._id === _id);
            } else if (data?.type === 'blogs') {
              return !!data.values.find((user) => user.username === authorName);
            }
            return false;
          })
          .map((query) => query?.originalArgs as string);

        const patchedQueries = queries.map((query) =>
          api.dispatch(
            searchApi.util.updateQueryData('search', query, (searchData) => {
              if (searchData.type === 'posts') {
                const post = searchData.values.find((post) => post._id === _id);
                if (!post) return;
                post.likes += isLiked ? -1 : 1;
                post.isLiked = !isLiked;
              } else {
                const author = searchData.values.find(
                  (blog) => blog.username === authorName
                );
                if (!author) return;
                author.blog.likes += isLiked ? -1 : 1;
              }
            })
          )
        );

        try {
          const { data } = await api.queryFulfilled;
          if (data.success) return;
          patchedGetPost.undo();
          patchedGetUser.undo();
          patchedQueries.forEach((query) => query.undo());
        } catch {
          patchedGetPost.undo();
          patchedGetUser.undo();
          patchedQueries.forEach((query) => query.undo());
        }
      },
    }),

    getPost: builder.query<GetPostReturnType, string>({
      providesTags: provideGetPostTags,
      query: (id) => ({
        url: `/posts/${id}`,
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
