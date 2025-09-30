"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { QuestCard } from "./quest-card"
import { Calendar, Target, Trophy, Flame } from "lucide-react"
import type { Quest } from "@/lib/types"
import { mockQuests } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"

export function QuestDashboard() {
  const [quests, setQuests] = useState<Quest[]>(mockQuests)
  const [selectedTab, setSelectedTab] = useState("daily")
  const { user } = useAuth()

  const dailyQuests = quests.filter((q) => q.type === "daily")
  const weeklyQuests = quests.filter((q) => q.type === "weekly")
  const completedQuests = quests.filter((q) => q.completed)
  const activeQuests = quests.filter((q) => !q.completed)

  const dailyProgress =
    dailyQuests.length > 0 ? Math.round((dailyQuests.filter((q) => q.completed).length / dailyQuests.length) * 100) : 0

  const handleCompleteQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? { ...quest, completed: true, completedAt: new Date(), currentValue: quest.targetValue }
          : quest,
      ),
    )
  }

  const handleQuestProgress = (questId: string, increment: number) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? { ...quest, currentValue: Math.min(quest.currentValue + increment, quest.targetValue) }
          : quest,
      ),
    )
  }

  const generateNewDailyQuests = () => {
    const newQuests: Quest[] = [
      {
        id: Date.now().toString(),
        title: "Fazer 3 ligações de prospecção",
        description: "Entre em contato com 3 novos prospects hoje",
        type: "daily",
        xpReward: 60,
        coinReward: 12,
        difficulty: "easy",
        category: "calls",
        completed: false,
        targetValue: 3,
        currentValue: 0,
      },
      {
        id: (Date.now() + 1).toString(),
        title: "Enviar 5 propostas",
        description: "Prepare e envie 5 propostas comerciais",
        type: "daily",
        xpReward: 100,
        coinReward: 25,
        difficulty: "medium",
        category: "closing",
        completed: false,
        targetValue: 5,
        currentValue: 0,
      },
    ]

    setQuests((prev) => [...prev.filter((q) => q.type !== "daily"), ...newQuests])
  }

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quests Hoje</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyQuests.length}</div>
            <p className="text-xs text-muted-foreground">{dailyQuests.filter((q) => q.completed).length} completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Diário</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyProgress}%</div>
            <p className="text-xs text-muted-foreground">Meta diária</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{user?.streak || 0}</div>
            <p className="text-xs text-muted-foreground">dias consecutivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedQuests.length}</div>
            <p className="text-xs text-muted-foreground">quests concluídas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Quests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Suas Quests</CardTitle>
              <CardDescription>Complete quests para ganhar XP, moedas e manter sua sequência</CardDescription>
            </div>
            <Button variant="outline" onClick={generateNewDailyQuests}>
              Gerar Novas Quests
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Diárias</span>
                {dailyQuests.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {dailyQuests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Semanais</span>
                {weeklyQuests.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {weeklyQuests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Completadas</span>
                {completedQuests.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {completedQuests.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4 mt-6">
              {dailyQuests.length > 0 ? (
                <div className="space-y-4">
                  {dailyQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onComplete={handleCompleteQuest}
                      onProgress={handleQuestProgress}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma quest diária</h3>
                  <p className="text-muted-foreground mb-4">Gere novas quests para começar sua jornada hoje</p>
                  <Button onClick={generateNewDailyQuests}>Gerar Quests Diárias</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4 mt-6">
              {weeklyQuests.length > 0 ? (
                <div className="space-y-4">
                  {weeklyQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onComplete={handleCompleteQuest}
                      onProgress={handleQuestProgress}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma quest semanal</h3>
                  <p className="text-muted-foreground">Quests semanais aparecerão aqui quando disponíveis</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-6">
              {completedQuests.length > 0 ? (
                <div className="space-y-4">
                  {completedQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onComplete={handleCompleteQuest}
                      onProgress={handleQuestProgress}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma quest completada</h3>
                  <p className="text-muted-foreground">Complete suas primeiras quests para vê-las aqui</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
