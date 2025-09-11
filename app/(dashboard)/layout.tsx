"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import {
  Building,
  Calendar,
  FileText,
  HeadphonesIcon,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Newspaper,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logoutUser } from "@/service/logoutUser";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Schedule Appointment", href: "/schedule", icon: Calendar },
  { name: "Request Support", href: "/support", icon: HeadphonesIcon },
  {
    name: "My Appointments",
    href: "/may-appointments",
    icon: Calendar,
  },
  { name: "Invoices / Payments", href: "/invoices", icon: FileText },
  { name: "My Fleet", href: "/fleet", icon: Truck },
  { name: "Company Account", href: "/account", icon: Building },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "News & Updates", href: "/news", icon: Newspaper },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [logoutFn] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutFn({}).unwrap();
    await logoutUser(router);
    router.push("/login");
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={cn("flex flex-col h-full", mobile ? "w-full" : "w-64")}>
      <div className="flex items-center px-6 py-4 border-b">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Truck className="h-6 w-6 text-white" />
        </div>
        <span className="ml-3 text-xl font-bold text-gray-900">TiresDash</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => mobile && setMobileMenuOpen(false)}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4 space-y-2">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="flex items-center">
            <div className="bg-blue-600 p-1.5 rounded">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">TiresDash</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
