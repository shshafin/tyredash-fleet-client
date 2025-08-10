"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Building2, Car, User, MessageSquare } from "lucide-react";
import { additionalServicesOptions, FleetRegistrationFormData, fleetRegistrationSchema } from "@/lib/validation";

const fleetProgramOptions = ["Fleet Sales Specialist", "Store", "Website", "Other"] as const;

export default function FleetRegistrationForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FleetRegistrationFormData>({
    resolver: zodResolver(fleetRegistrationSchema),
    defaultValues: {
      moreLocation: false,
      centralLocation: false,
      preferredLocation: false,
      additionalServices: [],
      phoneExtension: "",
      AdditionalComments: "",
    },
  });

  const watchedAdditionalServices = watch("additionalServices") || [];

  const onSubmit = async (data: FleetRegistrationFormData) => {
    try {
      console.log("Form submitted:", data);
      // Handle form submission here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Fleet Registration</CardTitle>
            <CardDescription className="text-lg">
              Register your business for our fleet management services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Business Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">Business Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      {...register("businessName")}
                      className={errors.businessName ? "border-red-500" : ""}
                    />
                    {errors.businessName && <p className="text-sm text-red-500">{errors.businessName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfBusinessYear">Years in Business *</Label>
                    <Input
                      id="numberOfBusinessYear"
                      type="number"
                      {...register("numberOfBusinessYear")}
                      className={errors.numberOfBusinessYear ? "border-red-500" : ""}
                    />
                    {errors.numberOfBusinessYear && (
                      <p className="text-sm text-red-500">{errors.numberOfBusinessYear.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" {...register("state")} className={errors.state ? "border-red-500" : ""} />
                    {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" {...register("city")} className={errors.city ? "border-red-500" : ""} />
                    {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
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
                    <Label htmlFor="numberOFvehicles">Number of Vehicles *</Label>
                    <Input
                      id="numberOFvehicles"
                      type="number"
                      min="5"
                      {...register("numberOFvehicles")}
                      className={errors.numberOFvehicles ? "border-red-500" : ""}
                    />
                    {errors.numberOFvehicles && (
                      <p className="text-sm text-red-500">{errors.numberOFvehicles.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fleetProgram">Fleet Program *</Label>
                    <Controller
                      name="fleetProgram"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={errors.fleetProgram ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select fleet program" />
                          </SelectTrigger>
                          <SelectContent>
                            {fleetProgramOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.fleetProgram && <p className="text-sm text-red-500">{errors.fleetProgram.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="moreLocation"
                      control={control}
                      render={({ field }) => (
                        <Checkbox id="moreLocation" checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                    <Label htmlFor="moreLocation">Multiple Locations</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="centralLocation"
                      control={control}
                      render={({ field }) => (
                        <Checkbox id="centralLocation" checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                    <Label htmlFor="centralLocation">Central Location</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="preferredLocation"
                      control={control}
                      render={({ field }) => (
                        <Checkbox id="preferredLocation" checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                    <Label htmlFor="preferredLocation">Preferred Location</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Additional Services (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {additionalServicesOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
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
                                  field.onChange(currentServices.filter((s) => s !== service));
                                }
                              }}
                            />
                          )}
                        />
                        <Label htmlFor={service} className="text-sm">
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
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input id="title" {...register("title")} className={errors.title ? "border-red-500" : ""} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
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
                      <Input placeholder="Ext." {...register("phoneExtension")} className="w-20" />
                    </div>
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Additional Comments */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">Additional Information</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="AdditionalComments">Additional Comments (Optional)</Label>
                  <Textarea
                    id="AdditionalComments"
                    placeholder="Please share any additional information or special requirements..."
                    {...register("AdditionalComments")}
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button type="submit" size="lg" className="px-12" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register Fleet"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
