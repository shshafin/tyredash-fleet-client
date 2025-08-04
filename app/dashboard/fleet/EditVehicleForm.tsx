"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateFleetVehicleMutation } from "@/redux/features/fleet/fleetVehiclesApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

interface Vehicle {
  year: string;
  make: string;
  model: string;
  vin: string;
  licensePlate: string;
  tireSize: string;
  note: string;
}

interface VehicleFormPropsTypes {
  setIsEditDialogOpen: (open: boolean) => void;
  id: string;
  vehicleData: Vehicle;
}

const EditVehicleForm = ({ setIsEditDialogOpen, id, vehicleData }: VehicleFormPropsTypes) => {
  // mutation hook for creating a new fleet vehicle
  const [updateFleetVehicle, { isLoading }] = useUpdateFleetVehicleMutation();

  console.log(vehicleData);

  // form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },

    reset,
  } = useForm<Vehicle>({
    defaultValues: {
      year: "",
      make: "",
      model: "",
      vin: "",
      licensePlate: "",
      tireSize: "",
      note: "",
    },
  });

  useEffect(() => {
    reset({
      year: vehicleData.year,
      make: vehicleData.make,
      model: vehicleData.model,
      vin: vehicleData.vin,
      licensePlate: vehicleData.licensePlate,
      tireSize: vehicleData.tireSize,
      note: vehicleData.note,
    });
  }, [vehicleData, reset]);

  const onSubmit = async (data: Vehicle) => {
    try {
      // Simulate API call
      console.log("Vehicle data:", data);
      // You can add your API call here
      // alert("Vehicle saved successfully!");
      const response = await updateFleetVehicle({ id, data }).unwrap();

      if (response.success) {
        toast.success("Vehicle updated successfully!");
        reset();
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
      // toast.error("Error saving vehicle. Please try again.");
      toast.error("Failed to add vehicle. Please check your input and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              {...register("year", {
                required: "Year is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Year must be a 4-digit number",
                },
                min: {
                  value: 1600,
                  message: "Year must be 1600 or later",
                },
                max: {
                  value: new Date().getFullYear() + 1,
                  message: `Year cannot be later than ${new Date().getFullYear() + 1}`,
                },
              })}
              placeholder="2024"
              className={errors.year ? "border-red-500" : ""}
            />
            {errors.year && <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>}
          </div>
          <div>
            <Label htmlFor="make">Make *</Label>
            <Input
              id="make"
              {...register("make", {
                required: "Make is required",
                minLength: {
                  value: 2,
                  message: "Make must be at least 2 characters",
                },
              })}
              placeholder="Ford"
              className={errors.make ? "border-red-500" : ""}
            />
            {errors.make && <p className="text-sm text-red-500 mt-1">{errors.make.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            {...register("model", {
              required: "Model is required",
              minLength: {
                value: 1,
                message: "Model is required",
              },
            })}
            placeholder="Model"
            className={errors.model ? "border-red-500" : ""}
          />
          {errors.model && <p className="text-sm text-red-500 mt-1">{errors.model.message}</p>}
        </div>

        <div>
          <Label htmlFor="vin">VIN *</Label>
          <Input
            id="vin"
            {...register("vin", {
              required: "VIN is required",
            })}
            placeholder="1FTBW2CM6NKA12345"
            className={errors.vin ? "border-red-500" : ""}
            maxLength={17}
          />
          {errors.vin && <p className="text-sm text-red-500 mt-1">{errors.vin.message}</p>}
        </div>

        <div>
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input
            id="licensePlate"
            {...register("licensePlate", {
              required: "License plate is required",
            })}
            placeholder="ABC-1234"
            className={errors.licensePlate ? "border-red-500" : ""}
          />
          {errors.licensePlate && <p className="text-sm text-red-500 mt-1">{errors.licensePlate.message}</p>}
        </div>

        <div>
          <Label htmlFor="tireSize">Tire Size</Label>
          <Input
            id="tireSize"
            {...register("tireSize", {
              required: "Tire size is required",
            })}
            placeholder="225/75R16"
            className={errors.tireSize ? "border-red-500" : ""}
          />
          {errors.tireSize && <p className="text-sm text-red-500 mt-1">{errors.tireSize.message}</p>}
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register("note")}
            placeholder="Additional notes about this vehicle"
            className={errors.note ? "border-red-500" : ""}
            rows={4}
          />
          {/* {errors.notes && <p className="text-sm text-red-500 mt-1">{errors.notes.message}</p>} */}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              setIsEditDialogOpen(false);
              console.log("Cancel button clicked");
            }}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button disabled={!isDirty || isLoading} type="submit">
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Save Vehicle"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditVehicleForm;
