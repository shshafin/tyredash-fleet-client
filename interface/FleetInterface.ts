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
