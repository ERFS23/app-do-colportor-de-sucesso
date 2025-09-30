"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { QuestDashboard } from "@/components/quest-dashboard"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Coins, Zap, Settings, Bell, BarChart3, Users, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout } = useAuth()

  const xpToNextLevel = (user?.level || 1) * 500
  const currentXP = user?.xp || 0
  const xpProgress = (currentXP / xpToNextLevel) * 100

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="/images/bridge-logo.png" alt="BRIDGE Solutions" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-xl font-bold">BRIDGE Solutions</h1>
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
                  <Link href="/settings">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
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
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-balance">Olá, {user?.name}! 👋</h2>
                <p className="text-muted-foreground text-balance">Pronto para conquistar suas metas de vendas hoje?</p>
              </div>

              {/* Level Progress */}
              <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>Nível {user?.level}</span>
                        <Zap className="h-5 w-5 text-xp" />
                      </CardTitle>
                      <CardDescription>
                        {Math.max(0, xpToNextLevel - currentXP)} XP para o próximo nível
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-xp">{currentXP}</p>
                      <p className="text-sm text-muted-foreground">/ {xpToNextLevel} XP</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={xpProgress} className="h-3" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/simulator">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Técnicas de Venda</span>
                    </CardTitle>
                    <CardDescription>Aprenda técnicas comprovadas para aumentar suas vendas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Estudar Técnicas</Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/analytics">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Analytics</span>
                    </CardTitle>
                    <CardDescription>Visualize suas métricas e performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Ver Analytics</Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/crm">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>CRM Inteligente</span>
                    </CardTitle>
                    <CardDescription>Gerencie seus leads e identifique clientes dourados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Acessar CRM</Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/gamification">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5" />
                      <span>Gamificação</span>
                    </CardTitle>
                    <CardDescription>Conquistas, loja de recompensas e ranking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Ver Conquistas</Button>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Quest Dashboard */}
            <QuestDashboard />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
