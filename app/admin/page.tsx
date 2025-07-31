"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, Calendar, FileText, Download, Edit, Eye, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [fleetData, setFleetData] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [supportRequests, setSupportRequests] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [fleetRepName, setFleetRepName] = useState("")
  const [fleetRepPhone, setFleetRepPhone] = useState("")
  const [internalNotes, setInternalNotes] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load all data from localStorage
    const vehicles = JSON.parse(localStorage.getItem("tiresdash_vehicles") || "[]")
    const appointmentData = JSON.parse(localStorage.getItem("tiresdash_appointments") || "[]")
    const supportData = JSON.parse(localStorage.getItem("tiresdash_support_requests") || "[]")
    const invoiceData = JSON.parse(localStorage.getItem("tiresdash_invoices") || "[]")
    const userData = JSON.parse(localStorage.getItem("tiresdash_user") || "{}")

    setFleetData([
      {
        id: "1",
        company: userData.company || "ABC Logistics",
        contact: userData.name || "John Smith",
        email: userData.email || "john@company.com",
        accountNumber: userData.accountNumber || "TD-2024-001",
        vehicleCount: vehicles.length,
        status: "Active",
        fleetRep: userData.fleetRep || { name: "Sarah Johnson", phone: "(555) 123-4567" },
      },
    ])

    setAppointments(appointmentData)
    setSupportRequests(supportData)
    setInvoices(invoiceData)
  }, [])

  const handleAssignFleetRep = () => {
    if (!selectedAccount || !fleetRepName || !fleetRepPhone) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Update user data with new fleet rep
    const userData = JSON.parse(localStorage.getItem("tiresdash_user") || "{}")
    userData.fleetRep = { name: fleetRepName, phone: fleetRepPhone }
    localStorage.setItem("tiresdash_user", JSON.stringify(userData))

    toast({
      title: "Success",
      description: "Fleet representative assigned successfully",
    })

    setFleetRepName("")
    setFleetRepPhone("")
    setSelectedAccount(null)
  }

  const handleSuspendAccount = (accountId: string, suspend: boolean) => {
    toast({
      title: suspend ? "Account Suspended" : "Account Activated",
      description: `Account has been ${suspend ? "suspended" : "activated"} successfully`,
    })
  }

  const handleAddInternalNote = () => {
    if (!selectedAccount || !internalNotes) return

    const notes = JSON.parse(localStorage.getItem("tiresdash_internal_notes") || "[]")
    notes.push({
      id: Date.now().toString(),
      accountId: selectedAccount.id,
      note: internalNotes,
      createdAt: new Date().toISOString(),
      createdBy: "Admin",
    })
    localStorage.setItem("tiresdash_internal_notes", JSON.stringify(notes))

    toast({
      title: "Success",
      description: "Internal note added successfully",
    })

    setInternalNotes("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">Manage fleet accounts and system data</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Accounts</p>
                  <p className="text-2xl font-bold">{fleetData.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Appointments</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Support Tickets</p>
                  <p className="text-2xl font-bold">{supportRequests.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unpaid Invoices</p>
                  <p className="text-2xl font-bold">{invoices.filter((inv) => inv.status === "Unpaid").length}</p>
                </div>
                <FileText className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fleet Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Account #</TableHead>
                  <TableHead>Vehicles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleetData.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.company}</TableCell>
                    <TableCell>
                      <div>
                        <p>{account.contact}</p>
                        <p className="text-sm text-gray-500">{account.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{account.accountNumber}</TableCell>
                    <TableCell>{account.vehicleCount}</TableCell>
                    <TableCell>
                      <Badge variant={account.status === "Active" ? "default" : "destructive"}>{account.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedAccount(account)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Account Details - {account.company}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Assign Fleet Rep</Label>
                                  <Input
                                    placeholder="Rep Name"
                                    value={fleetRepName}
                                    onChange={(e) => setFleetRepName(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <Input
                                    placeholder="Phone Number"
                                    value={fleetRepPhone}
                                    onChange={(e) => setFleetRepPhone(e.target.value)}
                                  />
                                </div>
                              </div>
                              <Button onClick={handleAssignFleetRep}>Assign Fleet Rep</Button>

                              <div>
                                <Label>Internal Notes</Label>
                                <Textarea
                                  placeholder="Add internal notes..."
                                  value={internalNotes}
                                  onChange={(e) => setInternalNotes(e.target.value)}
                                />
                                <Button className="mt-2" onClick={handleAddInternalNote}>
                                  Add Note
                                </Button>
                              </div>

                              <div className="flex items-center justify-between">
                                <Label>Suspend Account</Label>
                                <Switch onCheckedChange={(checked) => handleSuspendAccount(account.id, checked)} />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No appointments scheduled</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.serviceTypes.join(", ")}</TableCell>
                      <TableCell>
                        <Badge>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Export Data */}
        <Card>
          <CardHeader>
            <CardTitle>Data Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Fleet Data CSV
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Appointments CSV
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Support Tickets CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
