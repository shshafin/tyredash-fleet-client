"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, Calendar, ExternalLink, Star, Shield, Truck, Percent } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  category: "Partnership" | "App Update" | "Promotion" | "Safety"
  featured: boolean
  image?: string
}

export default function NewsPage() {
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "New Partnership with Michelin Fleet Solutions",
      summary:
        "We're excited to announce our expanded partnership with Michelin, bringing you even better pricing on premium tires and extended warranty options for your fleet.",
      date: "2024-01-15",
      category: "Partnership",
      featured: true,
    },
    {
      id: "2",
      title: "TiresDash Mobile App 2.0 Released",
      summary:
        "Our new mobile app features improved scheduling, real-time service tracking, and enhanced fleet management tools. Download now from the App Store or Google Play.",
      date: "2024-01-10",
      category: "App Update",
      featured: true,
    },
    {
      id: "3",
      title: "Winter Tire Special - 15% Off Fleet Orders",
      summary:
        "Prepare your fleet for winter conditions with our special pricing on winter tires. Valid through February 28th for orders of 10+ tires.",
      date: "2024-01-08",
      category: "Promotion",
      featured: false,
    },
    {
      id: "4",
      title: "New Safety Guidelines for Commercial Vehicles",
      summary:
        "Updated DOT regulations for commercial vehicle tire safety. Learn about new inspection requirements and how we can help ensure compliance.",
      date: "2024-01-05",
      category: "Safety",
      featured: false,
    },
    {
      id: "5",
      title: "Fleet Maintenance Best Practices Webinar",
      summary:
        "Join our free webinar on January 25th to learn about tire maintenance best practices that can extend tire life and reduce costs.",
      date: "2024-01-03",
      category: "Safety",
      featured: false,
    },
    {
      id: "6",
      title: "Holiday Service Schedule",
      summary:
        "Please note our modified service hours during the holiday season. Emergency services remain available 24/7.",
      date: "2023-12-20",
      category: "App Update",
      featured: false,
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Partnership":
        return <Star className="h-4 w-4" />
      case "App Update":
        return <Truck className="h-4 w-4" />
      case "Promotion":
        return <Percent className="h-4 w-4" />
      case "Safety":
        return <Shield className="h-4 w-4" />
      default:
        return <Newspaper className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Partnership":
        return "bg-blue-100 text-blue-800"
      case "App Update":
        return "bg-green-100 text-green-800"
      case "Promotion":
        return "bg-purple-100 text-purple-800"
      case "Safety":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const featuredNews = newsItems.filter((item) => item.featured)
  const regularNews = newsItems.filter((item) => !item.featured)

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">News & Updates</h1>
        <p className="text-gray-600">Stay informed about the latest fleet services and company updates</p>
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Featured News</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNews.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(item.category)}>
                          {getCategoryIcon(item.category)}
                          <span className="ml-1">{item.category}</span>
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.summary}</p>
                  <Button variant="outline" size="sm">
                    Read More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular News */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Updates</h2>
        <div className="space-y-4">
          {regularNews.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={getCategoryColor(item.category)}>
                        {getCategoryIcon(item.category)}
                        <span className="ml-1">{item.category}</span>
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.summary}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                    Read More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <Newspaper className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to receive the latest fleet service updates and promotions.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe to Newsletter</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
