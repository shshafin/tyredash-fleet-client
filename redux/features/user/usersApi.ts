import { baseApi } from "@/redux/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myProfile: builder.query({
      query: () => ({
        url: `/fleet-users/profile/me`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/fleet-users/profile/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useMyProfileQuery, useUpdateProfileMutation } = usersApi;
