"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeadphonesIcon, Upload, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SupportPage() {
  const [issueType, setIssueType] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("")
  const { toast } = useToast()

  const issueTypes = [
    "Billing Question",
    "Service Issue",
    "Account Access",
    "Technical Problem",
    "Appointment Scheduling",
    "Fleet Management",
    "Other",
  ]

  const priorities = [
    { value: "low", label: "Low - General inquiry" },
    { value: "medium", label: "Medium - Service needed" },
    { value: "high", label: "High - Urgent issue" },
    { value: "critical", label: "Critical - Emergency" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!issueType || !subject || !message || !priority) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Save support request to localStorage
    const supportRequests = JSON.parse(localStorage.getItem("tiresdash_support_requests") || "[]")
    const newRequest = {
      id: Date.now().toString(),
      issueType,
      subject,
      message,
      priority,
      status: "Open",
      createdAt: new Date().toISOString(),
    }

    supportRequests.push(newRequest)
    localStorage.setItem("tiresdash_support_requests", JSON.stringify(supportRequests))

    // Reset form
    setIssueType("")
    setSubject("")
    setMessage("")
    setPriority("")

    toast({
      title: "Support Request Submitted",
      description: "We'll get back to you within 24 hours. Ticket #" + newRequest.id,
    })
  }

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Request Support</h1>
        <p className="text-gray-600">Get help with your fleet services and account</p>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HeadphonesIcon className="mr-2 h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-lg font-bold text-blue-600">(800) 555-TIRE</p>
              <p className="text-sm text-gray-600">Mon-Fri: 7AM-7PM</p>
              <p className="text-sm text-gray-600">Sat: 8AM-5PM</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-lg font-bold text-blue-600">fleet@tiresdash.com</p>
              <p className="text-sm text-gray-600">Response within 24 hours</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Emergency Service</h3>
              <p className="text-lg font-bold text-red-600">(800) 555-HELP</p>
              <p className="text-sm text-gray-600">24/7 Emergency Line</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Support Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueType">Issue Type *</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide detailed information about your issue..."
                rows={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="attachment">Attach Files (Optional)</Label>
              <div className="mt-2">
                <Button type="button" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Files
                </Button>
                <p className="text-sm text-gray-500 mt-1">
                  Upload images, documents, or other files related to your issue
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Common Issues</h4>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    How to schedule an appointment
                  </a>
                </li>
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    Adding vehicles to your fleet
                  </a>
                </li>
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    Payment and billing questions
                  </a>
                </li>
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    Service warranty information
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Account Help</h4>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    Reset your password
                  </a>
                </li>
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    Update company information
                  </a>
                </li>
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    Manage user access
                  </a>
                </li>
                <li>
                  <a href="/dashboard/faq" className="hover:underline">
                    Download invoices
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
