import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["FleetVehicles", "FleetAppointments", "FleetSupport", "FleetUser"],
});
