"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Upload, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VehicleForm from "./AddVehicleForm";

interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  licensePlate: string;
  tireSizeFront: string;
  tireSizeRear: string;
  notes: string;
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Partial<Vehicle>>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedVehicles = localStorage.getItem("tiresdash_vehicles");
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles));
    }
  }, []);

  const saveVehicles = (updatedVehicles: Vehicle[]) => {
    setVehicles(updatedVehicles);
    localStorage.setItem("tiresdash_vehicles", JSON.stringify(updatedVehicles));
  };

  const handleEditVehicle = () => {
    if (!editingVehicle || !formData.year || !formData.make || !formData.model || !formData.vin) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedVehicles = vehicles.map((v) => (v.id === editingVehicle.id ? { ...editingVehicle, ...formData } : v));
    saveVehicles(updatedVehicles);
    setEditingVehicle(null);
    setFormData({});

    toast({
      title: "Success",
      description: "Vehicle updated successfully",
    });
  };

  const handleDeleteVehicle = (id: string) => {
    const updatedVehicles = vehicles.filter((v) => v.id !== id);
    saveVehicles(updatedVehicles);

    toast({
      title: "Success",
      description: "Vehicle deleted successfully",
    });
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Fleet</h1>
          <p className="text-gray-600">Manage your fleet vehicles and tire preferences</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
              </DialogHeader>
              {/* vehicle form */}
              <VehicleForm setIsAddDialogOpen={setIsAddDialogOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search vehicles by make, model, license plate, or VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Vehicles ({filteredVehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No vehicles found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>VIN</TableHead>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Tire Sizes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </p>
                          {vehicle.notes && <p className="text-sm text-gray-500">{vehicle.notes}</p>}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{vehicle.vin}</TableCell>
                      <TableCell>{vehicle.licensePlate}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {vehicle.tireSizeFront && (
                            <Badge variant="outline" className="text-xs">
                              F: {vehicle.tireSizeFront}
                            </Badge>
                          )}
                          {vehicle.tireSizeRear && (
                            <Badge variant="outline" className="text-xs">
                              R: {vehicle.tireSizeRear}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingVehicle(vehicle);
                                  setFormData(vehicle);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Vehicle</DialogTitle>
                              </DialogHeader>
                              {/* <VehicleForm /> */}
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setEditingVehicle(null);
                                    setFormData({});
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleEditVehicle}>Save Changes</Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
