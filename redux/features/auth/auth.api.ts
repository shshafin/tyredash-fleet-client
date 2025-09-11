import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/fleet-auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/fleet-users/register",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/fleet-auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    // reset-password
    resetPassword: builder.mutation({
      query: ({ data, token }: { data: { newPassword: string }; token: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
