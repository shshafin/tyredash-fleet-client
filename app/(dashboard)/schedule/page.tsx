"use client";

import type React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IVehicle, ServiceType } from "@/constants/fleet.types";

import { useGetAllFleetVehiclesQuery } from "@/redux/features/vehicles/fleetVehiclesApi";
import { Calendar, CheckCircle, Clock, MapPin, Upload, X } from "lucide-react";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { useCreateFleetAppointmentMutation } from "@/redux/features/appointment/fleetAppointmentsApi";
import { toast } from "sonner";

// Validation schema
const appointmentSchema = z.object({
  selectedVehicle: z.string().min(1, "Please select a vehicle"),
  serviceType: z.string().min(1, "Please select a service type"),
  appointmentDate: z.string().min(1, "Please select a date"),
  appointmentTime: z.string().min(1, "Please select a time"),
  serviceAddress: z.string().min(1, "Please enter a service address"),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function SchedulePage() {
  const { data: fleetVehicles, isLoading: fleetDataLoading } = useGetAllFleetVehiclesQuery({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createFleetAppointmentFn, { isLoading: fleetLoading }] = useCreateFleetAppointmentMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      selectedVehicle: "",
      serviceType: "",
      appointmentDate: "",
      appointmentTime: "",
      serviceAddress: "",
      notes: "",
    },
  });

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: z.infer<typeof appointmentSchema>) => {
    // Create FormData object
    const formData = new FormData();

    const dataToSubmit = {
      fleetVehicle: data.selectedVehicle,
      serviceType: data.serviceType,
      date: data.appointmentDate,
      time: data.appointmentTime,
      address: data.serviceAddress,
      notes: data.notes,
    };

    formData.append("data", JSON.stringify(dataToSubmit));

    console.log(selectedFile);

    // Append file if selected
    if (selectedFile) {
      formData.append("files", selectedFile);
    }

    try {
      const res = await createFleetAppointmentFn(formData).unwrap();

      if (res.success) {
        toast.success("Appointment created successfully");
        reset();
        setSelectedFile(null);
      }
    } catch (error) {
      toast.error("Failed to create appointment");
    }

    // You can now send formData to your API
    // Example: await fetch('/api/appointments', { method: 'POST', body: formData });
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Schedule Appointment</h1>
        <p className="text-gray-600">Book tire services for your fleet vehicles</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Vehicle Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Select Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fleetDataLoading ? (
              "Loading..."
            ) : fleetVehicles?.data?.length === 0 ? (
              <p className="text-gray-500">No vehicles found. Please add vehicles to your fleet first.</p>
            ) : (
              <div className="space-y-2">
                <Controller
                  name="selectedVehicle"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Vehicles</SelectLabel>
                          {fleetVehicles?.data?.map((vehicle: IVehicle) => (
                            <SelectItem key={vehicle._id} value={vehicle._id}>
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedVehicle && <p className="text-sm text-red-500">{errors.selectedVehicle.message}</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Service Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Controller
                name="serviceType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Service Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Service Types</SelectLabel>
                        {Object.values(ServiceType).map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.serviceType && <p className="text-sm text-red-500">{errors.serviceType.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Date and Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date *</Label>
                <Controller
                  name="appointmentDate"
                  control={control}
                  render={({ field }) => (
                    <Input id="date" type="date" min={new Date().toISOString().split("T")[0]} {...field} />
                  )}
                />
                {errors.appointmentDate && <p className="text-sm text-red-500">{errors.appointmentDate.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time *</Label>
                <Controller
                  name="appointmentTime"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.appointmentTime && <p className="text-sm text-red-500">{errors.appointmentTime.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Service Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="address">Service Address *</Label>
              <Controller
                name="serviceAddress"
                control={control}
                render={({ field }) => (
                  <Textarea id="address" placeholder="Enter the address where service should be performed" {...field} />
                )}
              />
              {errors.serviceAddress && <p className="text-sm text-red-500">{errors.serviceAddress.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="notes">Special Instructions or Notes</Label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea id="notes" placeholder="Any special instructions for the service technician" {...field} />
                )}
              />
            </div>

            <div>
              <Label htmlFor="po-upload">Upload PO or Documentation</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Input id="file-upload" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                </div>

                {selectedFile && (
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-700">{selectedFile.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={removeFile} className="h-6 w-6 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <p className="text-sm text-gray-500">Only CSV files are allowed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Schedule Appointment
          </Button>
        </div>
      </form>
    </div>
  );
}
