import { baseApi } from "@/redux/baseApi";

const newAndUpdateAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentUpdates: builder.query({
      query: (params = {}) => ({
        url: "/fleet-news/",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...params,
        },
      }),
    }),
  }),
});

export const { useGetRecentUpdatesQuery } = newAndUpdateAPi;
