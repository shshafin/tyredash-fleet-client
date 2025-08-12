"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteFleetVehicleMutation, useGetAllFleetVehiclesQuery } from "@/redux/features/vehicles/fleetVehiclesApi";
import { Edit, Plus, Search, Trash2, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import AddVehicleForm from "./AddVehicleForm";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import EditVehicleForm from "./EditVehicleForm";
import CustomLoader from "@/components/CustomLoader";

interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  licensePlate: string;
  tireSize: string;
  note: string;
}

export default function FleetPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Partial<Vehicle>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  // Api calls
  const { data: vehiclesData, isLoading: isLoadingVehicles } = useGetAllFleetVehiclesQuery(undefined);
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteFleetVehicleMutation();

  const vehicles: Vehicle[] = vehiclesData?.data || [];

  // filter vehicles
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  // Reset to first page when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  // Handle delete confirmation
  const handleDeleteClick = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setDeleteConfirmOpen(true);
  };

  // Handle edit click
  const handleEditClick = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsEditDialogOpen(true);
  };

  // delete vehicle
  const handleDeleteVehicle = async () => {
    if (!vehicleToDelete) return;

    try {
      const res = await deleteVehicle(vehicleToDelete.id).unwrap();

      if (res.success) {
        toast.success("Vehicle deleted successfully!");
        setDeleteConfirmOpen(false);
        setVehicleToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete vehicle. Please try again.");
    }
  };

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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <AddVehicleForm setIsAddDialogOpen={setIsDialogOpen} />
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
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      {isLoadingVehicles ? (
        <div className="flex items-center justify-center py-8 min-h-[50vh]">
          <CustomLoader />
        </div>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fleet Vehicles ({filteredVehicles.length})</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No vehicles found</p>
              </div>
            ) : (
              <div className="space-y-4">
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
                      {paginatedVehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell>
                            <div>
                              <p className="font-semibold">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </p>
                              {vehicle.note && <p className="text-sm text-gray-500">{vehicle.note}</p>}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{vehicle.vin}</TableCell>
                          <TableCell>{vehicle.licensePlate}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {vehicle.tireSize && (
                                <Badge variant="outline" className="text-xs">
                                  Tire Size: {vehicle.tireSize}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditClick(vehicle)}>
                                <Edit className="h-4 w-4" />
                              </Button>

                              <Button
                                onClick={() => handleDeleteClick(vehicle)}
                                variant="outline"
                                size="sm"
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="text-sm text-gray-500">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredVehicles.length)} of{" "}
                      {filteredVehicles.length} results
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <div className="flex gap-1">
                        {pageNumbers.map((page, index) => (
                          <Button
                            key={index}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => typeof page === "number" && handlePageChange(page)}
                            disabled={page === "..."}
                            className={page === "..." ? "cursor-default" : ""}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Vehicle Dialog - Moved outside table structure */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center underline mb-5">Edit Vehicle</DialogTitle>
          </DialogHeader>

          {editingVehicle && (
            <EditVehicleForm
              setIsEditDialogOpen={setIsEditDialogOpen}
              id={editingVehicle.id as string}
              vehicleData={editingVehicle}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </p>
            {vehicleToDelete && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold text-sm">
                  {vehicleToDelete.year} {vehicleToDelete.make} {vehicleToDelete.model}
                </p>
                <p className="text-xs text-gray-500">License Plate: {vehicleToDelete.licensePlate}</p>
                <p className="text-xs text-gray-500">VIN: {vehicleToDelete.vin}</p>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setVehicleToDelete(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteVehicle} disabled={isDeleting}>
                {isDeleting ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Vehicle"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
