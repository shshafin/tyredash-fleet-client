export interface IVehicle {
  _id: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  licensePlate: string;
  tireSize: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export enum ServiceType {
  TIRE_REPLACEMENT = "Tire Replacement",
  FLAT_REPAIR = "Flat Repair",
  BALANCE = "Balance",
  ROTATION = "Rotation",
  OTHER = "Other",
}
