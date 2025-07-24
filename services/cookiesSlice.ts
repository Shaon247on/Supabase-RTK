// src/redux/api/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cookieAuth = createApi({
  reducerPath: 'cookieAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
  }),
  endpoints: (builder) => ({
    setCookie: builder.mutation<void, { access_token: string }>({
      query: ({ access_token }) => ({
        url: '/set-cookie',
        method: 'POST',
        body: { access_token },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useSetCookieMutation, useLogoutMutation } = cookieAuth;
