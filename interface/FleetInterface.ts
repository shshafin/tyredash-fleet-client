export enum FleetAppointmentsServiceType {
  TIRE_REPLACEMENT = "Tire Replacement",
  FLAT_REPAIR = "Flat Repair",
  BALANCE = "Balance",
  ROTATION = "Rotation",
  OTHER = "Other",
}

export enum FleetAppointmentsStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface IFleetAppointments {
  fleetVehicle: string;
  serviceType: FleetAppointmentsServiceType;
  date: string;
  time: string;
  address: string;
  notes?: string;
  //   file type
  files?: any;
  status?: FleetAppointmentsStatus;
  assignedTo?: string;
  estimatedDuration?: number;
  costEstimate?: number;
}

// issueType:
//   | "Billing Question"
//   | " Service Issue"
//   | "  Account Access"
//   | " Technical Problem"
//   | " Appointment Scheduling"
//   | " Fleet Management"
//   | "Other";

export enum FleetSupportIssueType {
  BILLING_QUESTION = "Billing Question",
  SERVICE_ISSUE = "Service Issue",
  ACCOUNT_ACCESS = "Account Access",
  TECHNICAL_PROBLEM = "Technical Problem",
  APPOINTMENT_SCHEDULING = "Appointment Scheduling",
  FLEET_MANAGEMENT = "Fleet Management",
  OTHER = "Other",
}

export enum FleetSupportPriority {
  LOW_GENERAL_INQUIRY = "Low-General inquiry",
  MEDIUM_SERVICE_NEEDED = "Medium-Service needed",
  HIGH_URGENT_ISSUE = "High-Urgent issue",
  CRITICAL_EMERGENCY = "Critical-Emergency",
}
