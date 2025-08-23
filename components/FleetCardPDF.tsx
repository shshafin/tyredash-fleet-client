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
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  margin: 0;
                  padding: 0;
                  color: hsl(222.2 84% 4.9%);
                  background: white;
                  line-height: 1.5;
                  font-size: 14px;
                }
                * {
                  box-sizing: border-box;
                }
                
                /* Card component styles matching shadcn/ui */
                .rounded-lg {
                  border-radius: calc(0.5rem - 2px);
                }
                .border {
                  border: 1px solid hsl(214.3 31.8% 91.4%);
                }
                .bg-card {
                  background-color: hsl(0 0% 100%);
                }
                .text-card-foreground {
                  color: hsl(222.2 84% 4.9%);
                }
                .shadow-sm {
                  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                }
                
                /* Card header */
                .flex {
                  display: flex;
                }
                .flex-col {
                  flex-direction: column;
                }
                .space-y-1\.5 > * + * {
                  margin-top: 0.375rem;
                }
                .p-6 {
                  padding: 1.5rem;
                }
                .pb-2 {
                  padding-bottom: 0.5rem;
                }
                
                /* Card title */
                .text-2xl {
                  font-size: 1.5rem;
                  line-height: 2rem;
                }
                .font-semibold {
                  font-weight: 600;
                }
                .leading-none {
                  line-height: 1;
                }
                .tracking-tight {
                  letter-spacing: -0.025em;
                }
                .flex.items-center {
                  align-items: center;
                }
                
                /* Card content */
                .pt-0 {
                  padding-top: 0;
                }
                .space-y-3 > * + * {
                  margin-top: 0.75rem;
                }
                
                /* Text styles */
                .text-sm {
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                }
                .text-muted-foreground {
                  color: hsl(215.4 16.3% 46.9%);
                }
                .font-semibold {
                  font-weight: 600;
                }
                
                /* Icon styles */
                .mr-2 {
                  margin-right: 0.5rem;
                }
                .h-5 {
                  height: 1.25rem;
                }
                .w-5 {
                  width: 1.25rem;
                }
                
                /* Warning box styles */
                .bg-yellow-50 {
                  background-color: rgb(254 252 232);
                }
                .border-yellow-200 {
                  border-color: rgb(254 240 138);
                }
                .rounded-md {
                  border-radius: 0.375rem;
                }
                .p-3 {
                  padding: 0.75rem;
                }
                .text-yellow-800 {
                  color: rgb(133 77 14);
                }
                .text-yellow-600 {
                  color: rgb(217 119 6);
                }
                .text-xs {
                  font-size: 0.75rem;
                  line-height: 1rem;
                }
                .mt-1 {
                  margin-top: 0.25rem;
                }
                
                /* Header styles */
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                  padding-bottom: 20px;
                  border-bottom: 3px solid hsl(222.2 84% 4.9%);
                }
                .company-logo {
                  font-size: 28px;
                  font-weight: bold;
                  color: hsl(222.2 84% 4.9%);
                  margin-bottom: 8px;
                  letter-spacing: -0.5px;
                }
                .fleet-card-title {
                  font-size: 18px;
                  color: hsl(215.4 16.3% 46.9%);
                  font-weight: 500;
                }
                .print-date {
                  text-align: right;
                  font-size: 12px;
                  color: hsl(215.4 16.3% 46.9%);
                  margin-top: 20px;
                  font-style: italic;
                }
                
                /* Utility classes */
                .space-y-6 > * + * {
                  margin-top: 1.5rem;
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
                  .rounded-lg {
                    border-radius: calc(0.5rem - 2px);
                  }
                  .border {
                    border: 1px solid hsl(214.3 31.8% 91.4%);
                  }
                  .shadow-sm {
                    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                  }
                  .bg-yellow-50 {
                    background-color: rgb(254 252 232) !important;
                    -webkit-print-color-adjust: exact;
                  }
                  .border-yellow-200 {
                    border-color: rgb(254 240 138) !important;
                  }
                  .text-yellow-800 {
                    color: rgb(133 77 14) !important;
                  }
                  .text-yellow-600 {
                    color: rgb(217 119 6) !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="company-logo">TiresDash</div>
                <div class="fleet-card-title">Fleet Service Card</div>
              </div>
              <div class="space-y-6">
                ${printContents}
              </div>
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
