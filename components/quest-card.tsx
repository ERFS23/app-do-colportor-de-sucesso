"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Coins, Zap } from "lucide-react"
import type { Quest } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface QuestCardProps {
  quest: Quest
  onComplete: (questId: string) => void
  onProgress: (questId: string, increment: number) => void
}

export function QuestCard({ quest, onComplete, onProgress }: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)
  const { toast } = useToast()

  const progressPercentage = Math.min((quest.currentValue / quest.targetValue) * 100, 100)
  const isCompleted = quest.completed
  const canComplete = quest.currentValue >= quest.targetValue && !isCompleted

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "hard":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "calls":
        return "📞"
      case "meetings":
        return "🤝"
      case "prospecting":
        return "🎯"
      case "closing":
        return "💰"
      default:
        return "⭐"
    }
  }

  const handleComplete = async () => {
    if (!canComplete) return

    setIsCompleting(true)

    // Simular delay de completar quest
    await new Promise((resolve) => setTimeout(resolve, 500))

    onComplete(quest.id)

    toast({
      title: "Quest Completada!",
      description: `Você ganhou ${quest.xpReward} XP e ${quest.coinReward} moedas!`,
    })

    setIsCompleting(false)
  }

  const handleAddProgress = () => {
    if (isCompleted || quest.currentValue >= quest.targetValue) return
    onProgress(quest.id, 1)
  }

  return (
    <Card
      className={`transition-all duration-200 ${isCompleted ? "bg-success/5 border-success/20" : "hover:shadow-md"}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getCategoryIcon(quest.category)}</div>
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>{quest.title}</span>
                {isCompleted && <CheckCircle2 className="h-5 w-5 text-success" />}
              </CardTitle>
              <CardDescription className="mt-1">{quest.description}</CardDescription>
            </div>
          </div>
          <Badge className={getDifficultyColor(quest.difficulty)} variant="secondary">
            {quest.difficulty === "easy" && "Fácil"}
            {quest.difficulty === "medium" && "Médio"}
            {quest.difficulty === "hard" && "Difícil"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">
              {quest.currentValue}/{quest.targetValue}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Rewards */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
              <Zap className="h-4 w-4 text-xp" />
              <span className="font-medium text-xp">{quest.xpReward} XP</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Coins className="h-4 w-4 text-coins" />
              <span className="font-medium text-coins">{quest.coinReward}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            {!isCompleted && quest.currentValue < quest.targetValue && (
              <Button variant="outline" size="sm" onClick={handleAddProgress}>
                +1
              </Button>
            )}

            {canComplete && (
              <Button
                size="sm"
                onClick={handleComplete}
                disabled={isCompleting}
                className="bg-success hover:bg-success/90 text-success-foreground"
              >
                {isCompleting ? "Completando..." : "Completar"}
              </Button>
            )}

            {isCompleted && (
              <Button size="sm" disabled className="bg-success/20 text-success">
                Concluída
              </Button>
            )}
          </div>
        </div>

        {isCompleted && quest.completedAt && (
          <p className="text-xs text-muted-foreground">
            Completada em {new Date(quest.completedAt).toLocaleDateString("pt-BR")}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
