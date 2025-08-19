"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMyProfileQuery } from "@/redux/features/user/usersApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// User profile interface based on the API response
interface UserProfile {
  _id: string;
  buisnessName: string;
  state: string;
  city: string;
  numberOfbuisnessYear: string;
  numberOFvehicles: string;
  moreLocation: boolean;
  centralLocation: boolean;
  fleetProgram: string;
  preferredLocation: boolean;
  additionalServices: string[];
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  phoneExtension: string;
  email: string;
  AdditionalComments: string;
  isVerified: boolean;
  role: string;
  needsPasswordChange: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

// Company information form schema
const companyInfoSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  fleetContact: z.string().min(1, "Fleet contact is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  billingAddress: z.string().min(1, "Billing address is required"),
  servicePreferences: z.string().optional(),
  // Additional fields from API
  state: z.string().optional(),
  city: z.string().optional(),
  numberOfBusinessYear: z.string().optional(),
  numberOfVehicles: z.string().optional(),
  title: z.string().optional(),
  phoneExtension: z.string().optional(),
});

type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

export default function AccountPage() {
  const { data: userProfile, isLoading, error } = useMyProfileQuery({});
  const { toast } = useToast();

  const form = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      businessName: "",
      fleetContact: "",
      phone: "",
      email: "",
      billingAddress: "",
      servicePreferences: "",
      state: "",
      city: "",
      numberOfBusinessYear: "",
      numberOfVehicles: "",
      title: "",
      phoneExtension: "",
    },
  });

  // Populate form when API data is loaded
  useEffect(() => {
    if (userProfile?.data) {
      const userData = userProfile.data as UserProfile;

      form.reset({
        businessName: userData.buisnessName || "",
        fleetContact: `${userData.firstName || ""} ${userData.lastName || ""}`.trim(),
        phone: userData.phone || "",
        email: userData.email || "",
        billingAddress: userData.city && userData.state ? `${userData.city}, ${userData.state}` : "",
        servicePreferences: userData.additionalServices?.join(", ") || "",
        state: userData.state || "",
        city: userData.city || "",
        numberOfBusinessYear: userData.numberOfbuisnessYear || "",
        numberOfVehicles: userData.numberOFvehicles || "",
        title: userData.title || "",
        phoneExtension: userData.phoneExtension || "",
      });
    }
  }, [userProfile, form]);

  const onSubmit = (data: CompanyInfoFormData) => {
    // Here you would typically make an API call to update the company information
    console.log("Submitting company info:", data);

    // For now, just save to localStorage as a fallback
    localStorage.setItem("tiresdash_company_info", JSON.stringify(data));

    toast({
      title: "Success",
      description: "Company information updated successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Account</h1>
          <p className="text-gray-600">Loading company information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Account</h1>
          <p className="text-red-600">Error loading company information. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Account</h1>
        <p className="text-gray-600">Manage your company information and user access</p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fleetContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fleet Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Primary Contact Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="California" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Los Angeles" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="numberOfBusinessYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years in Business</FormLabel>
                      <FormControl>
                        <Input placeholder="8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfVehicles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Vehicles</FormLabel>
                      <FormControl>
                        <Input placeholder="12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Fleet Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneExtension"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Extension</FormLabel>
                      <FormControl>
                        <Input placeholder="101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="billingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your billing address" rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="servicePreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your preferred service options and requirements"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
                  <Save className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
