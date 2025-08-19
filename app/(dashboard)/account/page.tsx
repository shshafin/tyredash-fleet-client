"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building, UserIcon, Plus, Edit, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyInfo {
  businessName: string;
  fleetContact: string;
  phone: string;
  email: string;
  billingAddress: string;
  servicePreferences: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AccountPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    businessName: "",
    fleetContact: "",
    phone: "",
    email: "",
    billingAddress: "",
    servicePreferences: "",
  });
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const { toast } = useToast();

  useEffect(() => {
    // Load company info
    const savedCompanyInfo = localStorage.getItem("tiresdash_company_info");
    if (savedCompanyInfo) {
      setCompanyInfo(JSON.parse(savedCompanyInfo));
    } else {
      // Set default values
      const userData = localStorage.getItem("tiresdash_user");
      if (userData) {
        const user = JSON.parse(userData);
        setCompanyInfo({
          businessName: user.company || "",
          fleetContact: user.name || "",
          phone: "(555) 987-6543",
          email: user.email || "",
          billingAddress: "123 Business Ave\nSuite 100\nCity, ST 12345",
          servicePreferences: "Standard tire services with 5% fleet discount",
        });
      }
    }

    // Load users
    const savedUsers = localStorage.getItem("tiresdash_company_users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Set default users
      const userData = localStorage.getItem("tiresdash_user");
      if (userData) {
        const user = JSON.parse(userData);
        setUsers([
          { id: "1", name: user.name, email: user.email, role: "Admin" },
          { id: "2", name: "Jane Doe", email: "jane.doe@company.com", role: "User" },
        ]);
      }
    }
  }, []);

  const handleSaveCompanyInfo = () => {
    localStorage.setItem("tiresdash_company_info", JSON.stringify(companyInfo));
    toast({
      title: "Success",
      description: "Company information updated successfully",
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const user: UserInfo = {
      id: Date.now().toString(),
      ...newUser,
    };

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("tiresdash_company_users", JSON.stringify(updatedUsers));

    setNewUser({ name: "", email: "", role: "User" });
    setIsAddUserDialogOpen(false);

    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("tiresdash_company_users", JSON.stringify(updatedUsers));

    toast({
      title: "Success",
      description: "User removed successfully",
    });
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Account</h1>
        <p className="text-gray-600">Manage your company information and user access</p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={companyInfo.businessName}
                onChange={(e) => setCompanyInfo({ ...companyInfo, businessName: e.target.value })}
                placeholder="Your Company Name"
              />
            </div>
            <div>
              <Label htmlFor="fleetContact">Fleet Contact</Label>
              <Input
                id="fleetContact"
                value={companyInfo.fleetContact}
                onChange={(e) => setCompanyInfo({ ...companyInfo, fleetContact: e.target.value })}
                placeholder="Primary Contact Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                placeholder="contact@company.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="billingAddress">Billing Address</Label>
            <Textarea
              id="billingAddress"
              value={companyInfo.billingAddress}
              onChange={(e) => setCompanyInfo({ ...companyInfo, billingAddress: e.target.value })}
              placeholder="Enter your billing address"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="servicePreferences">Service Preferences</Label>
            <Textarea
              id="servicePreferences"
              value={companyInfo.servicePreferences}
              onChange={(e) => setCompanyInfo({ ...companyInfo, servicePreferences: e.target.value })}
              placeholder="Describe your preferred service options and requirements"
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveCompanyInfo}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      {/* <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <UserIcon className="mr-2 h-5 w-5" />
              User Management
            </CardTitle>
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userName">Name</Label>
                    <Input
                      id="userName"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="User's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="user@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userRole">Role</Label>
                    <select
                      id="userRole"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
