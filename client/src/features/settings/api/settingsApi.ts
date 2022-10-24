import { logout, setUser } from 'features/auth';
import { rootApi } from 'lib/rootApi';
import { ProtectedData } from 'types';
import { UpdateUserValues, ConfirmPasswordValues } from '../types';

type UpdateUserReturnValues = {
  status: 'success' | 'failure';
  user: ProtectedData;
};

export const settingsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<
      UpdateUserReturnValues,
      Omit<UpdateUserValues, 'profile-picture'>
    >({
      invalidatesTags: (result) =>
        result ? [{ type: 'User', id: result.user.username }] : [],
      query: (updatedData) => ({
        url: '/settings/data',
        method: 'PATCH',
        credentials: 'include',
        body: updatedData,
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          if (data) api.dispatch(setUser(data));
        } catch {}
      },
    }),

    updateProfilePic: builder.mutation<UpdateUserReturnValues, FormData>({
      invalidatesTags: (result) =>
        result ? [{ type: 'User', id: result.user.username }] : [],
      query: (profilePicture) => ({
        url: '/settings/profile-picture',
        method: 'PUT',
        credentials: 'include',
        body: profilePicture,
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          if (data) api.dispatch(setUser(data));
        } catch {}
      },
    }),

    deleteUser: builder.mutation<{ success: boolean }, ConfirmPasswordValues>({
      invalidatesTags: (result) =>
        // That's a bit lazy
        // But otherwise I'd need to retrieve all of the posts of the user from cache,
        // which is too much of a bother
        result?.success ? ['Post', 'User'] : [],
      query: (values) => ({
        url: `/settings/`,
        method: 'DELETE',
        credentials: 'include',
        body: values,
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if (data?.success) {
          api.dispatch(logout());
          window.location.replace('/');
        }
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdateProfilePicMutation,
  useDeleteUserMutation,
} = settingsApi;
