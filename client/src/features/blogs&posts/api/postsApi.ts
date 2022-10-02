import { PostData } from 'types';
import { generalApi } from 'lib/generalApi';
import { CreatePostValues } from '../types';

type CreatePostReturnType =
  | {
      success: true;
      post: PostData;
    }
  | { success: false };

type CreatePostFullValues = { data: CreatePostValues; image?: File };

interface UpdatePostValues extends CreatePostFullValues {
  data: CreatePostFullValues['data'] & {
    _id: string;
  };
}

export const postsApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostReturnType, CreatePostFullValues>({
      query: ({ data: data_, image }) => {
        const data = new Blob([JSON.stringify(data_)], {
          type: 'application/json',
        });
        const body = new FormData();
        body.append('request-json', data);
        if (image) body.append('post-image', image);

        return {
          url: '/posts/',
          method: 'POST',
          credentials: 'include',
          body,
        };
      },
    }),
    editPost: builder.mutation<CreatePostReturnType, UpdatePostValues>({
      query: ({ data: data_, image }) => {
        const data = new Blob([JSON.stringify(data_)], {
          type: 'application/json',
        });
        const body = new FormData();
        body.append('request-json', data);
        if (image) body.append('post-image', image);

        return {
          url: `/posts/${data_._id}`,
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
    getPost: builder.query<PostData, string>({
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
