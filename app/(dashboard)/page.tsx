"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Phone, Mail, CreditCard, Percent, Settings, Truck, HeadphonesIcon } from "lucide-react";
import { Calendar } from "lucide-react";

export default function DashboardPage() {
  const user = {
    name: "John Doe",
    company: "TiresDash",
    accountNumber: "123456",
    fleetRep: { name: "Sarah Johnson", phone: "555-1234" },
    email: "john.doe@tiresdash.com",
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
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Generate Fleet Card PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Rep */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Fleet Rep</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold">{user.fleetRep.name}</p>
              <p className="text-sm text-gray-600">Fleet Service Representative</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="mr-2 h-4 w-4" />
              {user.fleetRep.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="mr-2 h-4 w-4" />
              sarah.johnson@tiresdash.com
            </div>
          </CardContent>
        </Card>

        {/* Product Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="mr-2 h-5 w-5" />
              Product Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-full justify-start">
                5% off better and best tires
              </Badge>
              <Badge variant="secondary" className="w-full justify-start">
                Retail price on labor
              </Badge>
              <Badge variant="secondary" className="w-full justify-start">
                Uses Cash or Credit Card
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Settings className="mr-2 h-4 w-4" />
              Request a Change
            </Button>
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
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">(555) 987-6543</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p className="font-semibold">{user.company}</p>
            </div>
          </div>
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
