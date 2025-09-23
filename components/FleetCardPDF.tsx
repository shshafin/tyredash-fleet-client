"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  isAdminApproved: boolean;
}

interface FleetCardPDFProps {
  user: User;
}

export const FleetCardPDF: React.FC<FleetCardPDFProps> = ({ user }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!printRef.current) return;

    // Capture DOM as canvas
    const canvas = await html2canvas(printRef.current, {
      scale: 2, // smaller scale for smaller PDF
      useCORS: true,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);

    // Reduce scale to make card smaller
    const pdfScale =
      Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height) * 0.7;

    pdf.addImage(
      imgData,
      "PNG",
      (pdfWidth - imgProps.width * pdfScale) / 2, // center horizontally
      (pdfHeight - imgProps.height * pdfScale) / 2, // center vertically
      imgProps.width * pdfScale,
      imgProps.height * pdfScale
    );

    pdf.save(`FleetCard-${user.company}.pdf`);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Card Preview */}
      <div
        ref={printRef}
        className="relative">
        <div className="card w-[320px] h-[200px] rounded-2xl p-5 bg-gradient-to-br from-indigo-900 to-indigo-600 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold tracking-wide">TiresDash</div>
            <div className="text-sm opacity-80">Fleet Service Card</div>
          </div>

          <div>
            <div className="text-xs opacity-80">Account Number</div>
            <div className="text-[12px] font-bold tracking-wide break-all">
              {user.accountNumber}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">{user.company}</div>
            <div className="text-xs opacity-80">
              {user.name} {user.title && `- ${user.title}`}
            </div>
            {!user.isAdminApproved && (
              <div className="text-xs text-yellow-300 mt-1">
                Pending Verification
              </div>
            )}
          </div>

          {/* QR Code */}
          <div className="absolute right-4 bottom-4 bg-white p-1 rounded">
            <QRCode
              value="https://fleet.tiresdash.com/"
              size={48}
            />
          </div>
        </div>
      </div>

      {/* Download Button */}
      <Button
        onClick={handlePrint}
        className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        Download Premium Card PDF
      </Button>
    </div>
  );
};
