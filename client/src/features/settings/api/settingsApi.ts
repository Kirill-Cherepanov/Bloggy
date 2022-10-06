import { logout, setUser } from 'features/auth';
import { generalApi } from 'lib/generalApi';
import { ProtectedData } from 'types';
import { UpdateUserValues, ConfirmPasswordValues } from '../types';

export const settingsApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<
      ProtectedData,
      Omit<UpdateUserValues, 'profile-picture'>
    >({
      invalidatesTags: (result) =>
        result ? [{ type: 'User', id: result.username }] : [],
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

    updateProfilePic: builder.mutation<ProtectedData, FormData>({
      invalidatesTags: (result) =>
        result ? [{ type: 'User', id: result.username }] : [],
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

    deleteUser: builder.mutation<{ success: true }, ConfirmPasswordValues>({
      invalidatesTags: (result, error) =>
        // That's a bit lazy
        // But otherwise I'd need to retrieve all of the posts of the user from cache,
        // which is too much of a bother
        result?.success ? ['Post', 'User'] : [],
      query: () => ({
        url: `/settings/`,
        method: 'DELETE',
        credentials: 'include',
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if (data?.success) api.dispatch(logout());
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdateProfilePicMutation,
  useDeleteUserMutation,
} = settingsApi;
