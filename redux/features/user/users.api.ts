import { baseApi } from "@/redux/baseApi";

// fleet-users
const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/fleet-users/profile",
    }),
  }),
});

export const { useGetProfileQuery } = usersApi;
