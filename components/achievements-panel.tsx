"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Lock, Star, Zap, Coins, Target, Activity, Flame } from "lucide-react"
import type { Achievement } from "@/lib/types"
import { mockAchievements } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export function AchievementsPanel() {
  const [achievements] = useState<Achievement[]>(mockAchievements)
  const { toast } = useToast()

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sales":
        return <Target className="h-4 w-4" />
      case "activity":
        return <Activity className="h-4 w-4" />
      case "streak":
        return <Flame className="h-4 w-4" />
      case "special":
        return <Star className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sales":
        return "text-green-600 dark:text-green-400"
      case "activity":
        return "text-blue-600 dark:text-blue-400"
      case "streak":
        return "text-orange-600 dark:text-orange-400"
      case "special":
        return "text-purple-600 dark:text-purple-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card
      className={`transition-all duration-200 ${achievement.unlocked ? "bg-success/5 border-success/20" : "opacity-60"}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`text-2xl ${achievement.unlocked ? "" : "grayscale"}`}>
              {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
            </div>
            <div>
              <CardTitle className="text-base flex items-center space-x-2">
                <span>{achievement.title}</span>
                {achievement.unlocked && <Trophy className="h-4 w-4 text-yellow-600" />}
              </CardTitle>
              <CardDescription>{achievement.description}</CardDescription>
            </div>
          </div>
          <div className={`flex items-center space-x-1 ${getCategoryColor(achievement.category)}`}>
            {getCategoryIcon(achievement.category)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
              <Zap className="h-4 w-4 text-xp" />
              <span className="font-medium text-xp">{achievement.xpReward} XP</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Coins className="h-4 w-4 text-coins" />
              <span className="font-medium text-coins">{achievement.coinReward}</span>
            </div>
          </div>
          {achievement.unlocked && achievement.unlockedAt && (
            <Badge variant="secondary" className="text-xs">
              {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conquistas Desbloqueadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{unlockedAchievements.length}</div>
            <p className="text-xs text-muted-foreground">de {achievements.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Total de Conquistas</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-xp">
              {unlockedAchievements.reduce((acc, a) => acc + a.xpReward, 0)}
            </div>
            <p className="text-xs text-muted-foreground">experiência ganha</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </div>
            <Progress value={(unlockedAchievements.length / achievements.length) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Conquistas */}
      <Tabs defaultValue="unlocked" className="space-y-4">
        <TabsList>
          <TabsTrigger value="unlocked" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Desbloqueadas</span>
            <Badge variant="secondary">{unlockedAchievements.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="locked" className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Bloqueadas</span>
            <Badge variant="secondary">{lockedAchievements.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>

        <TabsContent value="unlocked" className="space-y-4">
          {unlockedAchievements.length > 0 ? (
            <div className="grid gap-4">
              {unlockedAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Nenhuma conquista desbloqueada</h3>
                <p className="text-muted-foreground">
                  Complete quests e atividades para desbloquear suas primeiras conquistas
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="locked" className="space-y-4">
          <div className="grid gap-4">
            {lockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {["sales", "activity", "streak", "special"].map((category) => {
            const categoryAchievements = achievements.filter((a) => a.category === category)
            const categoryName = {
              sales: "Vendas",
              activity: "Atividade",
              streak: "Sequência",
              special: "Especiais",
            }[category]

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className={getCategoryColor(category)}>{getCategoryIcon(category)}</div>
                    <span>{categoryName}</span>
                    <Badge variant="secondary">
                      {categoryAchievements.filter((a) => a.unlocked).length}/{categoryAchievements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {categoryAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`text-lg ${achievement.unlocked ? "" : "grayscale"}`}>
                            {achievement.unlocked ? (
                              achievement.icon
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                            {achievement.unlocked ? "Desbloqueada" : "Bloqueada"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
