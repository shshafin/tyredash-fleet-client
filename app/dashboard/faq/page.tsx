"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Search, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "How do I add a vehicle to my fleet?",
      answer:
        "To add a vehicle to your fleet, navigate to the 'My Fleet' page and click the 'Add Vehicle' button. Fill in the required information including year, make, model, VIN, and tire sizes. You can also upload a CSV file with multiple vehicles at once.",
      category: "Fleet Management",
    },
    {
      id: "2",
      question: "How do I schedule a service appointment?",
      answer:
        "Go to the 'Schedule Appointment' page, select the vehicles that need service, choose your service type (tire replacement, rotation, etc.), pick a date and time, and provide the service address. You can also upload any relevant documentation.",
      category: "Appointments",
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, credit cards (Visa, MasterCard, American Express), and fleet cards. You can also set up Net15 or Net30 billing terms for your account. Payment can be made online through your dashboard or at the service location.",
      category: "Billing",
    },
    {
      id: "4",
      question: "What is covered under the tire warranty?",
      answer:
        "Our tire warranty covers manufacturing defects, road hazard damage, and premature wear under normal driving conditions. The warranty period varies by tire brand and type. Contact your fleet representative for specific warranty details for your tire purchases.",
      category: "Warranty",
    },
    {
      id: "5",
      question: "How can I track my service appointments?",
      answer:
        "You can view all your scheduled appointments in the 'Schedule Appointment' section. You'll receive email notifications for appointment confirmations, reminders, and completion updates. Your fleet representative will also keep you informed of any changes.",
      category: "Appointments",
    },
    {
      id: "6",
      question: "Can I get emergency roadside service?",
      answer:
        "Yes, we offer 24/7 emergency roadside service for flat tires and other tire-related emergencies. Call our emergency line at (800) 555-HELP. Emergency service fees may apply depending on your fleet agreement.",
      category: "Emergency Service",
    },
    {
      id: "7",
      question: "How do I update my billing information?",
      answer:
        "Go to the 'Company Account' page to update your billing address, payment methods, and billing preferences. Changes to payment terms (Net15/Net30) may require approval from your fleet representative.",
      category: "Billing",
    },
    {
      id: "8",
      question: "What tire brands do you carry?",
      answer:
        "We carry all major tire brands including Michelin, Bridgestone, Goodyear, Continental, and many others. Your fleet representative can help you choose the best tires for your specific vehicle types and usage patterns.",
      category: "Products",
    },
    {
      id: "9",
      question: "How do I add additional users to my account?",
      answer:
        "In the 'Company Account' section, you can add new users by clicking 'Add User'. You can assign different permission levels (Admin or User) to control what each person can access in your fleet portal.",
      category: "Account Management",
    },
    {
      id: "10",
      question: "What should I do if I have a billing dispute?",
      answer:
        "Contact your fleet representative immediately or submit a support request through the 'Request Support' page. Include your invoice number and details about the dispute. We'll investigate and respond within 2 business days.",
      category: "Billing",
    },
  ]

  const categories = [...new Set(faqData.map((item) => item.category))]

  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="text-gray-600">Find answers to common questions about our fleet services</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      {categories.map((category) => {
        const categoryFAQs = filteredFAQs.filter((item) => item.category === category)

        if (categoryFAQs.length === 0) return null

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categoryFAQs.map((faq) => (
                <Collapsible key={faq.id} open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg border">
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", openItems.includes(faq.id) && "rotate-180")}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <div className="pt-2 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        )
      })}

      {filteredFAQs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No FAQs found matching your search.</p>
            <p className="text-sm text-gray-400 mt-2">Try different keywords or contact support for help.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
