"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Crown, Zap, Target, Flame } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface LeaderboardUser {
  id: string
  name: string
  avatar?: string
  level: number
  xp: number
  streak: number
  salesThisMonth: number
  rank: number
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Ana Silva",
    avatar: "/placeholder.svg",
    level: 8,
    xp: 4200,
    streak: 15,
    salesThisMonth: 28,
    rank: 1,
  },
  {
    id: "2",
    name: "Carlos Santos",
    avatar: "/placeholder.svg",
    level: 7,
    xp: 3800,
    streak: 12,
    salesThisMonth: 25,
    rank: 2,
  },
  {
    id: "3",
    name: "Maria Oliveira",
    avatar: "/placeholder.svg",
    level: 6,
    xp: 3200,
    streak: 8,
    salesThisMonth: 22,
    rank: 3,
  },
  {
    id: "4",
    name: "João Pereira",
    avatar: "/placeholder.svg",
    level: 6,
    xp: 2900,
    streak: 10,
    salesThisMonth: 20,
    rank: 4,
  },
  {
    id: "5",
    name: "Lucia Costa",
    avatar: "/placeholder.svg",
    level: 5,
    xp: 2600,
    streak: 6,
    salesThisMonth: 18,
    rank: 5,
  },
]

export function Leaderboard() {
  const [leaderboard] = useState<LeaderboardUser[]>(mockLeaderboard)
  const { user } = useAuth()

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">Top 3</Badge>
    }
    if (rank <= 10) {
      return <Badge variant="secondary">Top 10</Badge>
    }
    return null
  }

  const LeaderboardCard = ({
    user: leaderUser,
    showStats = "xp",
  }: { user: LeaderboardUser; showStats?: "xp" | "sales" | "streak" }) => {
    const isCurrentUser = user?.id === leaderUser.id

    return (
      <Card
        className={`transition-all duration-200 ${isCurrentUser ? "bg-primary/5 border-primary/20" : "hover:shadow-md"}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getRankIcon(leaderUser.rank)}
                {getRankBadge(leaderUser.rank)}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={leaderUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>{leaderUser.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium flex items-center space-x-2">
                  <span>{leaderUser.name}</span>
                  {isCurrentUser && <Badge variant="outline">Você</Badge>}
                </p>
                <p className="text-sm text-muted-foreground">Nível {leaderUser.level}</p>
              </div>
            </div>

            <div className="text-right">
              {showStats === "xp" && (
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-xp" />
                  <span className="font-bold text-xp">{leaderUser.xp.toLocaleString()}</span>
                </div>
              )}
              {showStats === "sales" && (
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="font-bold text-green-600">{leaderUser.salesThisMonth}</span>
                </div>
              )}
              {showStats === "streak" && (
                <div className="flex items-center space-x-1">
                  <Flame className="h-4 w-4 text-orange-600" />
                  <span className="font-bold text-orange-600">{leaderUser.streak}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-600" />
          <span>Ranking</span>
        </h2>
        <p className="text-muted-foreground">Veja como você se compara com outros vendedores</p>
      </div>

      {/* Pódio Top 3 */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <CardHeader>
          <CardTitle className="text-center">Pódio</CardTitle>
          <CardDescription className="text-center">Os 3 melhores vendedores do mês</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-center space-x-4">
            {/* 2º lugar */}
            {leaderboard[1] && (
              <div className="text-center space-y-2">
                <div className="relative">
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={leaderboard[1].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{leaderboard[1].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2">
                    <Medal className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">{leaderboard[1].name}</p>
                  <p className="text-sm text-muted-foreground">Nível {leaderboard[1].level}</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Zap className="h-3 w-3 text-xp" />
                    <span className="text-sm font-bold text-xp">{leaderboard[1].xp}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 1º lugar */}
            {leaderboard[0] && (
              <div className="text-center space-y-2">
                <div className="relative">
                  <Avatar className="h-20 w-20 mx-auto ring-4 ring-yellow-400">
                    <AvatarImage src={leaderboard[0].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{leaderboard[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-3 -right-3">
                    <Crown className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg">{leaderboard[0].name}</p>
                  <p className="text-sm text-muted-foreground">Nível {leaderboard[0].level}</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Zap className="h-4 w-4 text-xp" />
                    <span className="font-bold text-xp">{leaderboard[0].xp}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3º lugar */}
            {leaderboard[2] && (
              <div className="text-center space-y-2">
                <div className="relative">
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={leaderboard[2].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{leaderboard[2].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">{leaderboard[2].name}</p>
                  <p className="text-sm text-muted-foreground">Nível {leaderboard[2].level}</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Zap className="h-3 w-3 text-xp" />
                    <span className="text-sm font-bold text-xp">{leaderboard[2].xp}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Rankings */}
      <Tabs defaultValue="xp" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="xp" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>XP</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Vendas</span>
          </TabsTrigger>
          <TabsTrigger value="streak" className="flex items-center space-x-2">
            <Flame className="h-4 w-4" />
            <span>Sequência</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="xp" className="space-y-3">
          {leaderboard
            .sort((a, b) => b.xp - a.xp)
            .map((user) => (
              <LeaderboardCard key={user.id} user={user} showStats="xp" />
            ))}
        </TabsContent>

        <TabsContent value="sales" className="space-y-3">
          {leaderboard
            .sort((a, b) => b.salesThisMonth - a.salesThisMonth)
            .map((user) => (
              <LeaderboardCard key={user.id} user={user} showStats="sales" />
            ))}
        </TabsContent>

        <TabsContent value="streak" className="space-y-3">
          {leaderboard
            .sort((a, b) => b.streak - a.streak)
            .map((user) => (
              <LeaderboardCard key={user.id} user={user} showStats="streak" />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
