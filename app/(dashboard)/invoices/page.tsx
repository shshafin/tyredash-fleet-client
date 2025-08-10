"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Download, CreditCard, Calendar, DollarSign, FileText } from "lucide-react"

interface Invoice {
  id: string
  date: string
  amount: number
  status: "Paid" | "Unpaid"
  description: string
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [billingTerms, setBillingTerms] = useState<"Net15" | "Net30">("Net30")

  useEffect(() => {
    const savedInvoices = localStorage.getItem("tiresdash_invoices")
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices))
    }

    const savedBillingTerms = localStorage.getItem("tiresdash_billing_terms")
    if (savedBillingTerms) {
      setBillingTerms(savedBillingTerms as "Net15" | "Net30")
    }
  }, [])

  const handleBillingTermsChange = (isNet30: boolean) => {
    const newTerms = isNet30 ? "Net30" : "Net15"
    setBillingTerms(newTerms)
    localStorage.setItem("tiresdash_billing_terms", newTerms)
  }

  const totalUnpaid = invoices
    .filter((invoice) => invoice.status === "Unpaid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  const totalPaid = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Invoices & Payments</h1>
        <p className="text-gray-600">Manage your fleet service invoices and payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalUnpaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-blue-600">{invoices.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="billing-terms" className="text-base font-medium">
                Payment Terms
              </Label>
              <p className="text-sm text-gray-600">Choose your preferred payment terms for invoices</p>
            </div>
            <div className="flex items-center space-x-3">
              <Label htmlFor="billing-terms" className="text-sm">
                Net15
              </Label>
              <Switch
                id="billing-terms"
                checked={billingTerms === "Net30"}
                onCheckedChange={handleBillingTermsChange}
              />
              <Label htmlFor="billing-terms" className="text-sm">
                Net30
              </Label>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Current terms: <strong>{billingTerms}</strong> - Payment due {billingTerms === "Net30" ? "30" : "15"} days
              from invoice date
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No invoices found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{invoice.id}</h3>
                        <Badge
                          variant={invoice.status === "Paid" ? "default" : "destructive"}
                          className={invoice.status === "Paid" ? "bg-green-100 text-green-800" : ""}
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-1">{invoice.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(invoice.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ${invoice.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>

                        {invoice.status === "Unpaid" && (
                          <Button size="sm">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
