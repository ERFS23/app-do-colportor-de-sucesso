"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coins, Zap, Settings, Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                </Link>
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/images/bridge-logo.png" alt="BRIDGE Solutions" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-xl font-bold">Analytics</h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* User Stats */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-xp/10 px-3 py-1 rounded-full">
                    <Zap className="h-4 w-4 text-xp" />
                    <span className="text-sm font-medium text-xp">{user?.xp}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-coins/10 px-3 py-1 rounded-full">
                    <Coins className="h-4 w-4 text-coins" />
                    <span className="text-sm font-medium text-coins">{user?.coins}</span>
                  </div>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">Nível {user?.level}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Sair
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <AnalyticsDashboard />
        </main>
      </div>
    </ProtectedRoute>
  )
}
