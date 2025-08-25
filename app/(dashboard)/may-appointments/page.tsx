"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMyAppointmentsQuery } from "@/redux/features/appointment/fleetAppointmentsApi";
import { Calendar, Clock, Eye, MapPin, Wrench, Loader2 } from "lucide-react";
import { useState } from "react";

interface FleetVehicle {
  _id: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  licensePlate: string;
  tireSize: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface FleetRef {
  phone: string;
  email: string;
  note: string;
}

interface FleetAppointment {
  _id: string;
  fleetUser: string;
  fleetVehicle: FleetVehicle;
  fleetRef?: FleetRef;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  files: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number | null;
    total: number;
  };
  data: FleetAppointment[];
}

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "secondary";
    case "confirmed":
      return "default";
    case "completed":
      return "default";
    case "cancelled":
      return "destructive";
    case "in progress":
      return "default";
    default:
      return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "confirmed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "in progress":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function MyAppointmentsPage() {
  const { data: appointmentResponse, isLoading, error } = useMyAppointmentsQuery({});
  const [selectedFleetRef, setSelectedFleetRef] = useState<FleetRef | null>(null);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading appointments...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Error loading appointments. Please try again.</p>
      </div>
    );
  }

  // No data state
  if (!appointmentResponse?.data || appointmentResponse.data.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No appointments found.</p>
      </div>
    );
  }

  const appointments = appointmentResponse.data;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">Manage and view your fleet service appointments</p>
        </div>
        <Badge variant="outline">
          {appointmentResponse.meta.total} appointment{appointmentResponse.meta.total !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fleet Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment: FleetAppointment) => (
              <TableRow key={appointment._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    {appointment.serviceType}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">
                      {appointment.fleetVehicle.year} {appointment.fleetVehicle.make}
                    </div>
                    <div className="text-sm text-muted-foreground">{appointment.fleetVehicle.model}</div>
                    <div className="text-xs text-muted-foreground">{appointment.fleetVehicle.licensePlate}</div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-[150px]" title={appointment.address}>
                      {appointment.address}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant={getStatusVariant(appointment.status)} className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {appointment.fleetRef ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedFleetRef(appointment.fleetRef!)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Fleet Reference Details</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                              <div className="grid gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                  <p className="text-sm">{appointment.fleetRef.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                                  <p className="text-sm">{appointment.fleetRef.email}</p>
                                </div>
                                {appointment.fleetRef.note && (
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Reference Note</label>
                                    <p className="text-sm">{appointment.fleetRef.note}</p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <span className="text-sm text-muted-foreground">No reference</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
