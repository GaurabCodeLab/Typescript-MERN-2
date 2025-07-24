import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, UserResponse, LoggeedInUser } from "../../types/user";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<User, User>({
      query: (newUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["auth"],
      transformResponse: (response: UserResponse) => response.data,
    }),
    login: builder.mutation<User, LoggeedInUser>({
      query: (loginDetails) => ({
        url: "/auth/login",
        method: "POST",
        body: loginDetails,
      }),
      invalidatesTags: ["auth"],
      transformResponse: (response: UserResponse) => response.data,
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["auth"],
    }),
    resetPassword: builder.mutation<
      { message: string },
      { token: string; newPassword: string }
    >({
      query: ({ token, newPassword }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: { newPassword },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
