"use client";

import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard, Percent, Phone, Mail } from "lucide-react";

interface User {
  name: string;
  company: string;
  accountNumber: string;
  email: string;
  title: string;
  phone: string;
  phoneExtension: string;
  state: string;
  city: string;
  numberOfVehicles: string;
  fleetProgram: string;
  additionalServices: string[];
  isVerified: boolean;
}

interface FleetCardPDFProps {
  user: User;
}

export const FleetCardPDF: React.FC<FleetCardPDFProps> = ({ user }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;

      // Create a new window for printing
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Fleet Card - ${user.company}</title>
              <style>
                @page {
                  margin: 20mm;
                  size: A4;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  margin: 0;
                  padding: 0;
                  color: #374151;
                  background: white;
                  line-height: 1.5;
                }
                * {
                  box-sizing: border-box;
                }
                .card {
                  border: 2px solid #e5e7eb;
                  border-radius: 8px;
                  background: white;
                  margin-bottom: 20px;
                  page-break-inside: avoid;
                  overflow: hidden;
                }
                .card-header {
                  padding: 20px;
                  background: #f9fafb;
                  border-bottom: 1px solid #e5e7eb;
                }
                .card-title {
                  font-size: 18px;
                  font-weight: 600;
                  margin: 0;
                  display: flex;
                  align-items: center;
                  color: #1f2937;
                }
                .card-content {
                  padding: 20px;
                }
                .space-y-3 > * + * {
                  margin-top: 12px;
                }
                .space-y-2 > * + * {
                  margin-top: 8px;
                }
                .text-sm {
                  font-size: 14px;
                }
                .text-gray-600 {
                  color: #6b7280;
                }
                .font-semibold {
                  font-weight: 600;
                  color: #1f2937;
                }
                .badge {
                  display: inline-block;
                  border-radius: 4px;
                  padding: 6px 12px;
                  font-size: 12px;
                  font-weight: 500;
                  background: #f3f4f6;
                  color: #374151;
                  margin-bottom: 6px;
                  margin-right: 6px;
                  border: 1px solid #d1d5db;
                }
                .verification-warning {
                  background: #fef3c7;
                  border: 2px solid #f59e0b;
                  border-radius: 6px;
                  padding: 12px;
                  margin: 12px 0;
                }
                .verification-warning p {
                  margin: 0;
                  color: #92400e;
                  font-size: 14px;
                }
                .verification-warning strong {
                  font-weight: 600;
                }
                .grid {
                  display: grid;
                  gap: 16px;
                }
                .grid-cols-2 {
                  grid-template-columns: repeat(2, 1fr);
                }
                .contact-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 16px;
                  margin-top: 16px;
                }
                .icon {
                  width: 16px;
                  height: 16px;
                  margin-right: 8px;
                  vertical-align: middle;
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                  padding-bottom: 20px;
                  border-bottom: 3px solid #1f2937;
                }
                .company-logo {
                  font-size: 28px;
                  font-weight: bold;
                  color: #1f2937;
                  margin-bottom: 8px;
                  letter-spacing: -0.5px;
                }
                .fleet-card-title {
                  font-size: 18px;
                  color: #6b7280;
                  font-weight: 500;
                }
                .print-date {
                  text-align: right;
                  font-size: 12px;
                  color: #9ca3af;
                  margin-top: 20px;
                  font-style: italic;
                }
                @media print {
                  body { 
                    margin: 0; 
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                  }
                  .no-print { 
                    display: none !important; 
                  }
                  .card {
                    box-shadow: none;
                    border: 2px solid #000;
                  }
                  .card-header {
                    background: #f8f9fa !important;
                    -webkit-print-color-adjust: exact;
                  }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="company-logo">TiresDash</div>
                <div class="fleet-card-title">Fleet Service Card</div>
              </div>
              ${printContents}
              <div class="print-date">
                Generated on ${new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();

        // Wait a bit for styles to load, then print
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div ref={printRef} className="space-y-6">
        {/* Account Information */}
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
            <div>
              <p className="text-sm text-gray-600">Primary Contact</p>
              <p className="font-semibold">{user.name}</p>
              {user.title && <p className="text-sm text-gray-600">{user.title}</p>}
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
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold">{user.city && user.state ? `${user.city}, ${user.state}` : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fleet Size</p>
                <p className="font-semibold">{user.numberOfVehicles} vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="mr-2 h-5 w-5" />
              Services & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">Fleet Program</p>
              <p className="font-semibold">{user.fleetProgram}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Additional Services</p>
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Button */}
      <div className="flex justify-center gap-3 pt-4 no-print border-t">
        <Button onClick={handlePrint} className="flex-1 sm:flex-initial">
          <Download className="mr-2 h-4 w-4" />
          Download Fleet Card PDF
        </Button>
      </div>
    </div>
  );
};
