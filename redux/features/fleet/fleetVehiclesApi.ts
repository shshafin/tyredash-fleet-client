import { baseApi } from "@/redux/api/baseApi";

const fleetVehiclesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFleetVehicle: builder.mutation({
      query: (data: {
        year: string;
        make: string;
        model: string;
        vin: string;
        licensePlate: string;
        tireSize: string;
        note?: string;
      }) => ({
        url: "/fleet-vehicles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FleetVehicles"],
    }),

    updateFleetVehicle: builder.mutation({
      query: (data: {
        id: string;
        year?: string;
        make?: string;
        model?: string;
        vin?: string;
        licensePlate?: string;
        tireSize?: string;
        note?: string;
      }) => ({
        url: `/fleet-vehicles/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FleetVehicles"],
    }),

    getAllFleetVehicles: builder.query({
      query: () => ({
        url: "/fleet-vehicles",
        method: "GET",
      }),
      providesTags: ["FleetVehicles"],
    }),

    getFleetVehicleById: builder.query({
      query: (id: string) => ({
        url: `/fleet-vehicles/${id}`,
        method: "GET",
      }),
      providesTags: ["FleetVehicles"],
    }),

    deleteFleetVehicle: builder.mutation({
      query: (id: string) => ({
        url: `/fleet-vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FleetVehicles"],
    }),
  }),
});

export const {
  useCreateFleetVehicleMutation,
  useUpdateFleetVehicleMutation,
  useGetAllFleetVehiclesQuery,
  useGetFleetVehicleByIdQuery,
  useDeleteFleetVehicleMutation,
} = fleetVehiclesApi;
