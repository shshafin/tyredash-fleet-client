import { z } from "zod";

const additionalServicesOptions = [
  "Coast Fuel Savings",
  "Discount Tire Telematics by Motorq",
  "Revvo Smart Tire",
  "Roadside Assistance by NSD",
  "Spiffy Mobile Oil Change Service",
] as const;

export const createFleetUserZodSchema = z.object({
  body: z.object({
    businessName: z
      .string({
        required_error: "Business name is required",
      })
      .min(1, "Business name is required"),
    state: z
      .string({
        required_error: "State is required",
      })
      .min(1, "State is required"),
    city: z
      .string({
        required_error: "City is required",
      })
      .min(1, "City is required"),
    numberOfBusinessYear: z
      .string({
        required_error: "Number of business years is required",
      })
      .min(1, "Number of business years is required"),
    numberOFvehicles: z.string().refine((val) => Number.parseInt(val) >= 5, {
      message: "Number of vehicles must be at least 5",
    }),
    moreLocation: z.boolean({
      required_error: "More location status is required",
    }),
    centralLocation: z.boolean({
      required_error: "Central location status is required",
    }),
    fleetProgram: z.enum(["Fleet Sales Specialist", "Store", "Website", "Other"], {
      required_error: "Fleet program is required",
    }),
    preferredLocation: z.boolean({
      required_error: "Preferred location status is required",
    }),
    additionalServices: z.array(z.enum(additionalServicesOptions)).optional(),
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .min(1, "First name is required"),
    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .min(1, "Last name is required"),
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, "Title is required"),
    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .min(1, "Phone number is required"),
    phoneExtension: z.string().optional(),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Please enter a valid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    AdditionalComments: z.string().optional(),
  }),
});

// Extract the form schema from the nested structure
export const fleetRegistrationSchema = createFleetUserZodSchema.shape.body;

export type FleetRegistrationFormData = z.infer<typeof fleetRegistrationSchema>;

export { additionalServicesOptions };
