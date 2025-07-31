"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Truck } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("tiresdash_logged_in")
    if (isLoggedIn === "true") {
      router.push("/dashboard")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      if (email && password) {
        // Store login state and user info
        localStorage.setItem("tiresdash_logged_in", "true")
        localStorage.setItem(
          "tiresdash_user",
          JSON.stringify({
            name: "John Smith",
            email: email,
            company: "ABC Logistics",
            accountNumber: "TD-2024-001",
            fleetRep: {
              name: "Sarah Johnson",
              phone: "(555) 123-4567",
            },
          }),
        )

        // Initialize default data if not exists
        if (!localStorage.getItem("tiresdash_vehicles")) {
          localStorage.setItem(
            "tiresdash_vehicles",
            JSON.stringify([
              {
                id: "1",
                year: "2022",
                make: "Ford",
                model: "Transit",
                vin: "1FTBW2CM6NKA12345",
                licensePlate: "ABC-1234",
                tireSizeFront: "225/75R16",
                tireSizeRear: "225/75R16",
                notes: "Fleet vehicle #1",
              },
            ]),
          )
        }

        if (!localStorage.getItem("tiresdash_invoices")) {
          localStorage.setItem(
            "tiresdash_invoices",
            JSON.stringify([
              {
                id: "INV-001",
                date: "2024-01-15",
                amount: 1250.0,
                status: "Paid",
                description: "Tire replacement - Ford Transit",
              },
              {
                id: "INV-002",
                date: "2024-01-20",
                amount: 850.0,
                status: "Unpaid",
                description: "Tire rotation and balance - 3 vehicles",
              },
            ]),
          )
        }

        router.push("/dashboard")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">TiresDash</CardTitle>
          <p className="text-gray-600">Fleet Portal Login</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
