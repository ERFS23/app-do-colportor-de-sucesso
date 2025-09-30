"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, RotateCcw, CheckCircle2, Lightbulb, MessageSquare, Star, Trophy, Target } from "lucide-react"
import type { RejectionScenario } from "@/lib/types"
import { mockRejectionScenarios } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

interface SimulatorState {
  currentScenario: RejectionScenario | null
  userResponse: string
  showSuggestions: boolean
  showTips: boolean
  score: number | null
  isCompleted: boolean
  feedback: string
}

export function RejectionSimulator() {
  const [scenarios] = useState<RejectionScenario[]>(mockRejectionScenarios)
  const [state, setState] = useState<SimulatorState>({
    currentScenario: null,
    userResponse: "",
    showSuggestions: false,
    showTips: false,
    score: null,
    isCompleted: false,
    feedback: "",
  })
  const { toast } = useToast()

  const availableScenarios = scenarios.filter((s) => !s.completed)
  const completedScenarios = scenarios.filter((s) => s.completed)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "advanced":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "price":
        return "💰"
      case "timing":
        return "⏰"
      case "authority":
        return "👔"
      case "need":
        return "❓"
      case "competition":
        return "⚔️"
      default:
        return "🎯"
    }
  }

  const startScenario = (scenario: RejectionScenario) => {
    setState({
      currentScenario: scenario,
      userResponse: "",
      showSuggestions: false,
      showTips: false,
      score: null,
      isCompleted: false,
      feedback: "",
    })
  }

  const submitResponse = () => {
    if (!state.currentScenario || !state.userResponse.trim()) return

    // Simular avaliação da resposta
    const responseLength = state.userResponse.length
    const hasKeywords =
      state.userResponse.toLowerCase().includes("valor") ||
      state.userResponse.toLowerCase().includes("benefício") ||
      state.userResponse.toLowerCase().includes("solução")

    let score = Math.min(100, Math.max(20, responseLength / 2))
    if (hasKeywords) score += 20
    if (state.userResponse.length > 100) score += 10

    const feedback =
      score >= 80
        ? "Excelente resposta! Você demonstrou confiança e focou no valor."
        : score >= 60
          ? "Boa resposta! Considere enfatizar mais os benefícios."
          : "Resposta adequada, mas pode melhorar. Veja as sugestões abaixo."

    setState((prev) => ({
      ...prev,
      score: Math.round(score),
      isCompleted: true,
      feedback,
      showSuggestions: true,
      showTips: true,
    }))

    toast({
      title: "Resposta avaliada!",
      description: `Você obteve ${Math.round(score)} pontos neste cenário.`,
    })
  }

  const resetSimulator = () => {
    setState({
      currentScenario: null,
      userResponse: "",
      showSuggestions: false,
      showTips: false,
      score: null,
      isCompleted: false,
      feedback: "",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cenários Disponíveis</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableScenarios.length}</div>
            <p className="text-xs text-muted-foreground">para praticar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedScenarios.length}</div>
            <p className="text-xs text-muted-foreground">cenários praticados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedScenarios.length > 0
                ? Math.round(completedScenarios.reduce((acc, s) => acc + (s.score || 0), 0) / completedScenarios.length)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">pontos médios</p>
          </CardContent>
        </Card>
      </div>

      {/* Simulador Principal */}
      {!state.currentScenario ? (
        <Card>
          <CardHeader>
            <CardTitle>Simulador de Rejeição</CardTitle>
            <CardDescription>Pratique suas habilidades de vendas com cenários realistas de objeções</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Escolha um cenário para praticar:</h3>
              <div className="grid gap-4">
                {availableScenarios.map((scenario) => (
                  <Card key={scenario.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{getCategoryIcon(scenario.category)}</div>
                          <div>
                            <CardTitle className="text-base">{scenario.title}</CardTitle>
                            <CardDescription>{scenario.description}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(scenario.difficulty)} variant="secondary">
                          {scenario.difficulty === "beginner" && "Iniciante"}
                          {scenario.difficulty === "intermediate" && "Intermediário"}
                          {scenario.difficulty === "advanced" && "Avançado"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => startScenario(scenario)} className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar Simulação
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Cenário Atual */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getCategoryIcon(state.currentScenario.category)}</div>
                  <div>
                    <CardTitle>{state.currentScenario.title}</CardTitle>
                    <CardDescription>{state.currentScenario.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(state.currentScenario.difficulty)} variant="secondary">
                    {state.currentScenario.difficulty === "beginner" && "Iniciante"}
                    {state.currentScenario.difficulty === "intermediate" && "Intermediário"}
                    {state.currentScenario.difficulty === "advanced" && "Avançado"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={resetSimulator}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Alert>
                <MessageSquare className="h-4 w-4" />
                <AlertDescription className="text-base">
                  <strong>Cliente diz:</strong> "{state.currentScenario.scenario}"
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Área de Resposta */}
          <Card>
            <CardHeader>
              <CardTitle>Sua Resposta</CardTitle>
              <CardDescription>
                Como você responderia a esta objeção? Seja específico e focado no valor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Digite sua resposta aqui..."
                value={state.userResponse}
                onChange={(e) => setState((prev) => ({ ...prev, userResponse: e.target.value }))}
                className="min-h-[120px]"
                disabled={state.isCompleted}
              />

              {!state.isCompleted ? (
                <Button onClick={submitResponse} disabled={!state.userResponse.trim()} className="w-full">
                  Enviar Resposta
                </Button>
              ) : (
                <div className="space-y-4">
                  {/* Score */}
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className={`text-3xl font-bold ${getScoreColor(state.score!)}`}>{state.score}/100</div>
                    <p className="text-sm text-muted-foreground mt-1">{state.feedback}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={resetSimulator} variant="outline" className="flex-1 bg-transparent">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Tentar Outro
                    </Button>
                    <Button onClick={() => startScenario(state.currentScenario!)} variant="outline" className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Repetir
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sugestões */}
          {state.showSuggestions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Respostas Sugeridas</span>
                </CardTitle>
                <CardDescription>Veja como outros vendedores experientes lidariam com esta objeção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {state.currentScenario.suggestedResponses.map((response, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">{response}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dicas */}
          {state.showTips && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span>Dicas Importantes</span>
                </CardTitle>
                <CardDescription>Estratégias para lidar com este tipo de objeção</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {state.currentScenario.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{tip}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Cenários Completados */}
      {completedScenarios.length > 0 && !state.currentScenario && (
        <Card>
          <CardHeader>
            <CardTitle>Cenários Completados</CardTitle>
            <CardDescription>Revise seus cenários praticados e suas pontuações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedScenarios.map((scenario) => (
                <div key={scenario.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{getCategoryIcon(scenario.category)}</div>
                    <div>
                      <p className="font-medium">{scenario.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Completado em {scenario.completedAt?.toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(scenario.score!)}`}>{scenario.score}/100</div>
                    <Button variant="outline" size="sm" onClick={() => startScenario(scenario)} className="mt-1">
                      Repetir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
