import { baseApi } from "@/redux/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myProfile: builder.query({
      query: () => ({
        url: "/fleet-users/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useMyProfileQuery } = usersApi;
