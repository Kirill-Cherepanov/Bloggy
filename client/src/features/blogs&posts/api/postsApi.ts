import { PostData, PublicData } from 'types';
import { generalApi } from 'lib/generalApi';
import { CreatePostValues, UpdatePostValues } from '../types';

type CreatePostReturnType =
  | {
      success: true;
      post: PostData;
    }
  | { success: false };

export const postsApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostReturnType, CreatePostValues>({
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
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    getPost: builder.query<
      { post: PostData; author: PublicData; otherPosts: PostData[] },
      string
    >({
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
  useGetPostQuery,
} = postsApi;
