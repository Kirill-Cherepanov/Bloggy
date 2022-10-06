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
      providesTags: (result, error, args) =>
        result ? [{ type: 'Post', id: result.post._id }, 'Post'] : ['Post'],
      query: (id) => ({
        url: `/posts/${id}`,
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
  }),
});

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useLikePostMutation,
} = postsApi;
