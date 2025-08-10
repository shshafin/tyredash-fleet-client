import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/fleet-users/login",
    //     method: "POST",
    //     body: credentials,
    //   }),
    // }),
    register: builder.mutation({
      query: (data) => ({
        url: "/fleet-users/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
