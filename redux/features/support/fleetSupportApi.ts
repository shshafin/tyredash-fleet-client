import { baseApi } from "@/redux/baseApi";

const fleetSupportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create fleet support
    createFleetSupport: builder.mutation({
      query: (data) => ({
        url: "/fleet-supports/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FleetSupport"],
    }),

    // Get all fleet supports
    getAllFleetSupports: builder.query({
      query: (params) => ({
        url: "/fleet-supports",
        method: "GET",
        params,
      }),
      providesTags: ["FleetSupport"],
    }),

    // Get single fleet support
    getSingleFleetSupport: builder.query({
      query: (id) => ({
        url: `/fleet-supports/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "FleetSupport", id }],
    }),

    // Update fleet support
    updateFleetSupport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/fleet-supports/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FleetSupport"],
    }),

    // Delete fleet support
    deleteFleetSupport: builder.mutation({
      query: (id) => ({
        url: `/fleet-supports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FleetSupport"],
    }),

    // Get supports by user
    getSupportsByUser: builder.query({
      query: (userId) => ({
        url: `/fleet-supports/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["FleetSupport"],
    }),

    // Update status
    updateFleetSupportStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/fleet-supports/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["FleetSupport"],
    }),

    // Add response
    addFleetSupportResponse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/fleet-supports/${id}/response`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FleetSupport"],
    }),

    // Get statistics
    getFleetSupportStatistics: builder.query({
      query: () => ({
        url: "/fleet-supports/statistics",
        method: "GET",
      }),
      providesTags: ["FleetSupport"],
    }),
  }),
});

export const {
  useCreateFleetSupportMutation,
  useGetAllFleetSupportsQuery,
  useGetSingleFleetSupportQuery,
  useUpdateFleetSupportMutation,
  useDeleteFleetSupportMutation,
  useGetSupportsByUserQuery,
  useUpdateFleetSupportStatusMutation,
  useAddFleetSupportResponseMutation,
  useGetFleetSupportStatisticsQuery,
} = fleetSupportApi;

export default fleetSupportApi;
