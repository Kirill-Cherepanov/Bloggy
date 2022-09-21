import { ProtectedData } from 'types';
import { RegistrationValues, LoginValues, ResetPasswordValues } from '../types';
import { logout, setUser } from '../stores/authSlice';
import { generalApi } from 'lib/generalApi';

type GetTokenReturnType =
  | (ProtectedData & {
      isLoggedIn: true;
    })
  | {
      isLoggedIn: false;
    };

type RegisterReturnType =
  | (ProtectedData & { success: true })
  | { messageSent: true };

export const authApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelf: builder.query<ProtectedData | undefined, void>({
      query: () => ({
        url: `/auth/self`,
        credentials: 'include',
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if (data) api.dispatch(setUser(data));
      },
    }),

    getAccessToken: builder.query<GetTokenReturnType, void>({
      query: () => ({
        url: '/auth/token',
        credentials: 'include',
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if (data.isLoggedIn) api.dispatch(setUser(data));
      },
    }),

    register: builder.mutation<RegisterReturnType, RegistrationValues>({
      query: (registrationData: RegistrationValues) => ({
        url: `/auth/registration`,
        method: `POST`,
        body: registrationData,
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if ('success' in data) api.dispatch(setUser(data));
      },
    }),

    login: builder.mutation<ProtectedData, LoginValues>({
      query: (loginData: LoginValues) => ({
        url: `/auth/login`,
        method: `POST`,
        body: loginData,
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if (data) api.dispatch(setUser(data));
      },
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: `/auth/logout`,
        method: `DELETE`,
      }),
      async onQueryStarted(args, api) {
        const { data } = await api.queryFulfilled;
        if (data) api.dispatch(logout());
      },
    }),

    resetPassword: builder.mutation<ProtectedData, ResetPasswordValues>({
      query: ({ newPassword, message }: ResetPasswordValues) => ({
        url: '/auth/reset-password',
        method: 'POST',
        credentials: 'include',
        body: { newPassword, confirmationMessage: message },
      }),
    }),
  }),
});

export const {
  useGetSelfQuery,
  useGetAccessTokenQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} = authApi;
