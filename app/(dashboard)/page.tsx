"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, FileText, Phone, Mail, CreditCard, Percent, Settings, Truck, HeadphonesIcon } from "lucide-react";
import { Calendar } from "lucide-react";
import { useMyProfileQuery } from "@/redux/features/user/usersApi";
import { FleetCardPDF } from "@/components/FleetCardPDF";
import { useMyAppointmentsQuery } from "@/redux/features/appointment/fleetAppointmentsApi";

export default function DashboardPage() {
  const { data: userProfile, isLoading: profileDataLoading, error } = useMyProfileQuery(undefined);
  const [isFleetCardModalOpen, setIsFleetCardModalOpen] = useState(false);
  const { data: myAppointments, isLoading: myAppointmentsLoading } = useMyAppointmentsQuery(null);

  // Find the latest appointment with a fleetRef
  const fleetRef = myAppointments?.data?.find((appointment: any) => appointment.fleetRef)?.fleetRef;

  // console.log("profileData:", userProfile?.data);

  // If loading, show loading state
  if (profileDataLoading || myAppointmentsLoading) {
    return (
      <div className="p-4 lg:p-8 space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="p-4 lg:p-8">
        <Card className="border-red-200">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Failed to load profile data. Please refresh the page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userData = userProfile?.data;

  // Construct user object from API data
  const user = {
    name: userData ? `${userData.firstName} ${userData.lastName}` : "User",
    company: userData?.buisnessName || "TiresDash",
    accountNumber: userData?.id || userData?._id || "N/A",
    // fleetRep: { name: "Sarah Johnson", phone: "555-1234" }, // This might come from a different API
    email: userData?.email || "user@tiresdash.com",
    title: userData?.title || "Fleet Manager",
    phone: userData?.phone || "N/A",
    phoneExtension: userData?.phoneExtension || "",
    state: userData?.state || "",
    city: userData?.city || "",
    numberOfVehicles: userData?.numberOFvehicles || "0",
    fleetProgram: userData?.fleetProgram || "Fleet Sales Specialist",
    additionalServices: userData?.additionalServices || [],
    isVerified: userData?.isVerified || false,
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Manage your fleet services and account from your dashboard.</p>
      </div>

      {/* Account Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Account Name</p>
              <p className="font-semibold">{user.company}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Number</p>
              <p className="font-semibold">{user.accountNumber}</p>
            </div>
            {!user.isVerified && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Account Status:</strong> Pending verification
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Your account is under review. You'll receive an email once verified.
                </p>
              </div>
            )}
            <div className="pt-2">
              <Dialog open={isFleetCardModalOpen} onOpenChange={setIsFleetCardModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Fleet Card PDF
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto w-[95vw] sm:w-full">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Fleet Service Card</DialogTitle>
                  </DialogHeader>
                  <FleetCardPDF user={user} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Rep */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Fleet Rep</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myAppointmentsLoading ? (
              <>
                <Skeleton className="h-4 w-40" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </>
            ) : fleetRef ? (
              <>
                <div>
                  <p className="text-sm text-gray-600">Fleet Service Representative</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {fleetRef.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {fleetRef.email}
                </div>
                {fleetRef.note && (
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">Note</p>
                    <p className="text-sm text-gray-800">{fleetRef.note}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No fleet representative assigned yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  A representative will be assigned when you schedule your first service
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {/* <Percent className="mr-2 h-5 w-5" /> */}
              Services & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {user.additionalServices.length > 0 ? (
                user.additionalServices.map((service: string, index: number) => (
                  <Badge key={index} variant="secondary" className="w-full justify-start">
                    {service}
                  </Badge>
                ))
              ) : (
                <>
                  <Badge variant="secondary" className="w-full justify-start">
                    5% off better and best tires
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start">
                    Retail price on labor
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-start">
                    Uses Cash or Credit Card
                  </Badge>
                </>
              )}
            </div>
            {/* <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Settings className="mr-2 h-4 w-4" />
              Request a Change
            </Button> */}
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Primary Contact</p>
              <p className="font-semibold">{user.name}</p>
              {user.title && <p className="text-sm text-gray-500">{user.title}</p>}
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">
                {user.phone}
                {user.phoneExtension && ` ext. ${user.phoneExtension}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p className="font-semibold">{user.company}</p>
              {user.city && user.state && (
                <p className="text-sm text-gray-500">
                  {user.city}, {user.state}
                </p>
              )}
            </div>
          </div>
          {user.numberOfVehicles && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fleet Size</p>
                  <p className="font-semibold">{user.numberOfVehicles} vehicles</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fleet Program</p>
                  <p className="font-semibold">{user.fleetProgram}</p>
                </div>
                {!user.isVerified && (
                  <Badge variant="destructive" className="ml-auto">
                    Pending Verification
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-1">Schedule Service</h3>
            <p className="text-sm text-gray-600">Book your next appointment</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Truck className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold mb-1">Manage Fleet</h3>
            <p className="text-sm text-gray-600">Add or edit vehicles</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <FileText className="mx-auto h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold mb-1">View Invoices</h3>
            <p className="text-sm text-gray-600">Check payment status</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <HeadphonesIcon className="mx-auto h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-semibold mb-1">Get Support</h3>
            <p className="text-sm text-gray-600">Contact our team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
