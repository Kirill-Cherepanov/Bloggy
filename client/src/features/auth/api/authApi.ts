import { ProtectedData } from 'types';
import { RegistrationValues, LoginValues, ResetPasswordValues } from '../types';
import { logout, setUser } from '../stores/authSlice';
import { generalApi } from 'lib/generalApi';

type GetTokenReturnType =
  | { isLoggedIn: true; user: ProtectedData }
  | { isLoggedIn: false };

type RegisterReturnType =
  | { status: 'message sent' }
  | { status: 'success'; user: ProtectedData };

type ResetPasswordReturnType = RegisterReturnType;

// I don't need tags here because all of the data is accessed through authSlice
// Cache is just not used here

export const authApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelf: builder.query<{ user: ProtectedData }, void>({
      query: () => ({
        url: `/auth/self`,
        credentials: 'include',
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setUser(data.user));
        } catch {}
      },
    }),

    getAccessToken: builder.query<GetTokenReturnType, void>({
      query: () => ({
        url: '/auth/token',
        credentials: 'include',
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          if (data.isLoggedIn) api.dispatch(setUser(data.user));
          else api.dispatch(logout());
        } catch {}
      },
    }),

    register: builder.mutation<RegisterReturnType, RegistrationValues>({
      query: (registrationData: RegistrationValues) => ({
        url: `/auth/registration`,
        method: `POST`,
        body: registrationData,
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          if (data.status === 'success') api.dispatch(setUser(data.user));
        } catch {}
      },
    }),

    login: builder.mutation<{ user: ProtectedData }, LoginValues>({
      query: (loginData: LoginValues) => ({
        url: `/auth/login`,
        method: `POST`,
        body: loginData,
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setUser(data.user));
        } catch {}
      },
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: `/auth/logout`,
        method: `DELETE`,
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          if (data.success) api.dispatch(logout());
        } catch {}
      },
    }),

    resetPassword: builder.mutation<
      ResetPasswordReturnType,
      ResetPasswordValues
    >({
      query: (values: ResetPasswordValues) => ({
        url: '/auth/reset-password',
        method: 'POST',
        credentials: 'include',
        body:
          'confirm-email' in values
            ? {
                ...values,
                newPassword: values['new-password'],
                confirmationMessage: values['confirm-email'],
              }
            : values,
      }),
      async onQueryStarted(args, api) {
        try {
          const { data } = await api.queryFulfilled;
          if (data.status === 'success') api.dispatch(setUser(data.user));
        } catch {}
      },
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
