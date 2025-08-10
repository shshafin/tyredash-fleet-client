"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Upload, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Vehicle {
  id: string
  year: string
  make: string
  model: string
  licensePlate: string
}

export default function SchedulePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([])
  const [serviceTypes, setServiceTypes] = useState<string[]>([])
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [serviceAddress, setServiceAddress] = useState("")
  const [notes, setNotes] = useState("")
  const { toast } = useToast()

  const serviceOptions = [
    { id: "tire-replacement", label: "Tire Replacement" },
    { id: "flat-repair", label: "Flat Repair" },
    { id: "balance", label: "Balance" },
    { id: "rotation", label: "Rotation" },
  ]

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ]

  useEffect(() => {
    const savedVehicles = localStorage.getItem("tiresdash_vehicles")
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles))
    }
  }, [])

  const handleVehicleSelection = (vehicleId: string, checked: boolean) => {
    if (checked) {
      setSelectedVehicles([...selectedVehicles, vehicleId])
    } else {
      setSelectedVehicles(selectedVehicles.filter((id) => id !== vehicleId))
    }
  }

  const handleServiceTypeChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setServiceTypes([...serviceTypes, serviceId])
    } else {
      setServiceTypes(serviceTypes.filter((id) => id !== serviceId))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedVehicles.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one vehicle",
        variant: "destructive",
      })
      return
    }

    if (serviceTypes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one service type",
        variant: "destructive",
      })
      return
    }

    if (!appointmentDate || !appointmentTime || !serviceAddress) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Save appointment to localStorage
    const appointments = JSON.parse(localStorage.getItem("tiresdash_appointments") || "[]")
    const newAppointment = {
      id: Date.now().toString(),
      vehicles: selectedVehicles,
      serviceTypes,
      date: appointmentDate,
      time: appointmentTime,
      address: serviceAddress,
      notes,
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    }

    appointments.push(newAppointment)
    localStorage.setItem("tiresdash_appointments", JSON.stringify(appointments))

    // Reset form
    setSelectedVehicles([])
    setServiceTypes([])
    setAppointmentDate("")
    setAppointmentTime("")
    setServiceAddress("")
    setNotes("")

    toast({
      title: "Success",
      description: "Appointment scheduled successfully!",
      action: (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
          <span>Scheduled</span>
        </div>
      ),
    })
  }

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Schedule Appointment</h1>
        <p className="text-gray-600">Book tire services for your fleet vehicles</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vehicle Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Select Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {vehicles.length === 0 ? (
              <p className="text-gray-500">No vehicles found. Please add vehicles to your fleet first.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={vehicle.id}
                      checked={selectedVehicles.includes(vehicle.id)}
                      onCheckedChange={(checked) => handleVehicleSelection(vehicle.id, checked as boolean)}
                    />
                    <Label htmlFor={vehicle.id} className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-semibold">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </p>
                        <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Service Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceOptions.map((service) => (
                <div key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={service.id}
                    checked={serviceTypes.includes(service.id)}
                    onCheckedChange={(checked) => handleServiceTypeChange(service.id, checked as boolean)}
                  />
                  <Label htmlFor={service.id} className="cursor-pointer">
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Date and Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Preferred Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Preferred Time *</Label>
                <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Service Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="address">Service Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter the address where service should be performed"
                value={serviceAddress}
                onChange={(e) => setServiceAddress(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="notes">Special Instructions or Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions for the service technician"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="po-upload">Upload PO or Documentation</Label>
              <div className="mt-2">
                <Button type="button" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                <p className="text-sm text-gray-500 mt-1">
                  Upload purchase orders, work orders, or other relevant documents
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Schedule Appointment
          </Button>
        </div>
      </form>
    </div>
  )
}
