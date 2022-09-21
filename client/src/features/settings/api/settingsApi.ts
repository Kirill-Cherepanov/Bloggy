import { logout, setUser } from 'features/auth';
import { generalApi } from 'lib/generalApi';
import { ProtectedData } from 'types';
import { UpdateUserValues } from '../types';

export const settingsApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<ProtectedData, UpdateUserValues>({
      query: (updateData) => ({
        url: '/settings/',
        method: 'PATCH',
        credentials: 'include',
        body: updateData,
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if (data) api.dispatch(setUser(data));
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

export const { useUpdateUserMutation, useDeleteUserMutation } = settingsApi;
