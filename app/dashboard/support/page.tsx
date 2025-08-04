"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FleetSupportIssueType, FleetSupportPriority } from "@/interface/FleetInterface";
import { useCreateFleetSupportMutation } from "@/redux/features/fleet/fleetSupportApi";
import {
  BookOpen,
  Calendar,
  Car,
  CreditCard,
  FileText,
  HeadphonesIcon,
  HelpCircle,
  MessageSquare,
  Send,
  Shield,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const quickHelpItems = [
  {
    category: "Service & Appointments",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    items: [
      { title: "Schedule an appointment", href: "/dashboard/faq#appointments" },
      { title: "Emergency roadside service", href: "/dashboard/faq#emergency" },
      { title: "Service locations near you", href: "/dashboard/faq#locations" },
      { title: "Track service progress", href: "/dashboard/faq#tracking" },
    ],
  },
  {
    category: "Fleet Management",
    icon: Car,
    color: "text-green-600",
    bgColor: "bg-green-50",
    items: [
      { title: "Add vehicles to fleet", href: "/dashboard/faq#add-vehicles" },
      { title: "Vehicle maintenance schedules", href: "/dashboard/faq#maintenance" },
      { title: "Fleet reporting & analytics", href: "/dashboard/faq#reporting" },
      { title: "Driver management", href: "/dashboard/faq#drivers" },
    ],
  },
  {
    category: "Billing & Payments",
    icon: CreditCard,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    items: [
      { title: "Payment methods & billing", href: "/dashboard/faq#billing" },
      { title: "Download invoices", href: "/dashboard/faq#invoices" },
      { title: "Pricing & service plans", href: "/dashboard/faq#pricing" },
      { title: "Expense tracking", href: "/dashboard/faq#expenses" },
    ],
  },
  {
    category: "Account & Security",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
    items: [
      { title: "Reset password", href: "/dashboard/faq#password" },
      { title: "Update company info", href: "/dashboard/faq#company" },
      { title: "Manage user access", href: "/dashboard/faq#users" },
      { title: "Security settings", href: "/dashboard/faq#security" },
    ],
  },
];

interface SupportFormData {
  issueType: string;
  subject: string;
  message: string;
  priority: string;
}

export default function SupportPage() {
  const [createSupportRequestFn, { isLoading: isSubmitting }] = useCreateFleetSupportMutation();

  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>();

  const issueTypes = [...Object.values(FleetSupportIssueType)];
  const priorities = [...Object.values(FleetSupportPriority)];

  const onSubmit = async (data: SupportFormData) => {
    try {
      const formData = new FormData();
      // Handle file upload here

      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const supportRequestData = {
        issueType: data.issueType,
        priority: data.priority,
        subject: data.subject,
        message: data.message,
      };

      console.log(files);

      // append to formData
      formData.append("data", JSON.stringify(supportRequestData));

      const res = await createSupportRequestFn(formData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Support request submitted successfully!");
        reset();
      }

      // Submit support request
      // await submitSupportRequest(data);

      // Reset form
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit support request. Please try again.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(newFiles);
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueType">Issue Type *</Label>
                <Select onValueChange={(value) => setValue("issueType", value, { shouldValidate: true })}>
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
                <input type="hidden" {...register("issueType", { required: "Issue type is required" })} />
                {errors.issueType && <p className="text-sm text-red-600 mt-1">{errors.issueType.message}</p>}
              </div>

              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select onValueChange={(value) => setValue("priority", value, { shouldValidate: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("priority", { required: "Priority is required" })} />
                {errors.priority && <p className="text-sm text-red-600 mt-1">{errors.priority.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                {...register("subject", { required: "Subject is required" })}
                placeholder="Brief description of your issue"
              />
              {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                placeholder="Please provide detailed information about your issue..."
                rows={6}
              />
              {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
            </div>

            <div>
              <Label htmlFor="attachments">Attach CSV Files (Optional)</Label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    type="file"
                    id="attachments"
                    accept=".csv"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <Button type="button" variant="outline" className="w-full sm:w-auto bg-transparent">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose CSV Files
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Upload CSV files related to your issue</p>
                {files && files.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Selected files:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {Array.from(files).map((file, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="truncate mr-2">
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Redesigned Quick Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Quick Help & Resources
          </CardTitle>
          <p className="text-sm text-gray-600">Find answers to common questions and get help with your account</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {quickHelpItems.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="space-y-2 ml-10">
                    {category.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href={item.href}
                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Resources */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Additional Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/dashboard/documentation"
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Documentation</p>
                  <p className="text-sm text-gray-600">Complete user guides</p>
                </div>
              </a>
              <a
                href="/dashboard/video-tutorials"
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Video Tutorials</p>
                  <p className="text-sm text-gray-600">Step-by-step videos</p>
                </div>
              </a>
              <a
                href="/dashboard/community"
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <Users className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Community Forum</p>
                  <p className="text-sm text-gray-600">Connect with other users</p>
                </div>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
