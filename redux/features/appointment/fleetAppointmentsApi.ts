import { baseApi } from "@/redux/baseApi";

// "/fleet-appointments"

const fleetAppointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // crate appointment
    createFleetAppointment: builder.mutation({
      query: (data) => ({
        url: "/fleet-appointments/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FleetAppointments"],
    }),

    // get appointments
    getFleetAppointments: builder.query({
      query: () => ({
        url: "/fleet-appointments",
        method: "GET",
      }),
      providesTags: ["FleetAppointments"],
    }),

    // get appointment by id
    getFleetAppointmentById: builder.query({
      query: (id: string) => ({
        url: `/fleet-appointments/${id}`,
        method: "GET",
      }),
      providesTags: ["FleetAppointments"],
    }),

    // update appointment
    updateFleetAppointment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/fleet-appointments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FleetAppointments"],
    }),

    // delete appointment
    deleteFleetAppointment: builder.mutation({
      query: (id: string) => ({
        url: `/fleet-appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FleetAppointments"],
    }),
  }),
});

export const {
  useCreateFleetAppointmentMutation,
  useGetFleetAppointmentsQuery,
  useGetFleetAppointmentByIdQuery,
  useUpdateFleetAppointmentMutation,
  useDeleteFleetAppointmentMutation,
} = fleetAppointmentsApi;
