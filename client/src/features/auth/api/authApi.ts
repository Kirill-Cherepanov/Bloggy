import { RegistrationValues, LoginValues, ResetPasswordValues } from '../types';
import { generalApi } from 'lib/generalApi';

export const authApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelf: builder.query({
      query: (accessToken: string) => ({
        url: `/auth/self`,
        body: { accessToken },
      }),
    }),
    getAccessToken: builder.query<string, void>({
      query: () => '/auth/token',
    }),
    register: builder.mutation({
      query: (registrationData: RegistrationValues) => ({
        url: `/auth/registration`,
        method: `POST`,
        body: registrationData,
      }),
    }),
    login: builder.mutation({
      query: (loginData: LoginValues) => ({
        url: `/auth/login`,
        method: `POST`,
        body: loginData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: `DELETE`,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ accessToken, newPassword, message }: ResetPasswordValues) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { accessToken, newPassword, confirmationMessage: message },
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

// export const selectUsersResult = authSlice.endpoints.getUsers.select();
