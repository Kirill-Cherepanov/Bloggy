import { logout, setUser } from 'features/auth';
import { generalApi } from 'lib/generalApi';
import { ProtectedData } from 'types';
import { UpdateUserValues } from '../types';

export const settingsApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<
      ProtectedData,
      Omit<UpdateUserValues, 'profile-picture'>
    >({
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

    updateProfilePic: builder.mutation<ProtectedData, File>({
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

    deleteUser: builder.mutation<{ success: true }, void>({
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
