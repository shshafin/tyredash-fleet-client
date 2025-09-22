"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  additionalServicesOptions,
  FleetRegistrationFormData,
  fleetRegistrationSchema,
} from "@/lib/validation";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Car, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const fleetProgramOptions = [
  "Fleet Sales Specialist",
  "Store",
  "Website",
  "Other",
] as const;

export default function FleetRegistrationForm() {
  const [registerFn, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FleetRegistrationFormData>({
    resolver: zodResolver(fleetRegistrationSchema),
    defaultValues: {
      moreLocation: false,
      centralLocation: false,
      preferredLocation: false,
      additionalServices: [],
      AdditionalComments: "",
    },
  });

  watch("additionalServices") || [];

  const onSubmit = async (data: FleetRegistrationFormData) => {
    try {
      const response = await registerFn(data).unwrap();

      if (response.success) {
        toast.success("Registration successful! Wait for admin approval.");
        reset();
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Fleet Registration
            </CardTitle>
            <CardDescription className="text-lg">
              Register your business for our fleet management services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8">
              {/* Business Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">
                    Business Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="buisnessName"
                      {...register("buisnessName")}
                      className={errors.buisnessName ? "border-red-500" : ""}
                    />
                    {errors.buisnessName && (
                      <p className="text-sm text-red-500">
                        {errors.buisnessName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfbuisnessYear">
                      Years in Business *
                    </Label>
                    <Input
                      id="numberOfbuisnessYear"
                      type="number"
                      {...register("numberOfbuisnessYear")}
                      className={
                        errors.numberOfbuisnessYear ? "border-red-500" : ""
                      }
                    />
                    {errors.numberOfbuisnessYear && (
                      <p className="text-sm text-red-500">
                        {errors.numberOfbuisnessYear.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      {...register("state")}
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && (
                      <p className="text-sm text-red-500">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register("city")}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Fleet Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">Fleet Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="numberOFvehicles">
                      Number of Vehicles *
                    </Label>
                    <Input
                      id="numberOFvehicles"
                      type="number"
                      min="5"
                      {...register("numberOFvehicles")}
                      className={
                        errors.numberOFvehicles ? "border-red-500" : ""
                      }
                    />
                    {errors.numberOFvehicles && (
                      <p className="text-sm text-red-500">
                        {errors.numberOFvehicles.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fleetProgram">Fleet Program *</Label>
                    <Controller
                      name="fleetProgram"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}>
                          <SelectTrigger
                            className={
                              errors.fleetProgram ? "border-red-500" : ""
                            }>
                            <SelectValue placeholder="Select fleet program" />
                          </SelectTrigger>
                          <SelectContent>
                            {fleetProgramOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.fleetProgram && (
                      <p className="text-sm text-red-500">
                        {errors.fleetProgram.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="moreLocation"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="moreLocation"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="moreLocation">Multiple Locations</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="centralLocation"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="centralLocation"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="centralLocation">Central Location</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="preferredLocation"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="preferredLocation"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="preferredLocation">
                      Preferred Location
                    </Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Additional Services (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {additionalServicesOptions.map((service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2">
                        <Controller
                          name="additionalServices"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              id={service}
                              checked={field.value?.includes(service) || false}
                              onCheckedChange={(checked) => {
                                const currentServices = field.value || [];
                                if (checked) {
                                  field.onChange([...currentServices, service]);
                                } else {
                                  field.onChange(
                                    currentServices.filter((s) => s !== service)
                                  );
                                }
                              }}
                            />
                          )}
                        />
                        <Label
                          htmlFor={service}
                          className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {/* <Input placeholder="Ext." {...register("phoneExtension")} className="w-20" /> */}
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Additional Comments */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">
                    Additional Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="AdditionalComments">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="AdditionalComments"
                    placeholder="Please share any additional information or special requirements..."
                    {...register("AdditionalComments")}
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-center ">
                <Button
                  type="submit"
                  size="lg"
                  className=" w-full"
                  disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register Fleet"}
                </Button>
              </div>
            </form>

            <div>
              <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 underline">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
