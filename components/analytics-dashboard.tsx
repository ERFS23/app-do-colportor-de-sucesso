"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  Users,
  Phone,
  Calendar,
  Award,
  Activity,
  Zap,
} from "lucide-react"
import { mockDashboardStats } from "@/lib/data"

// Dados mock para gráficos
const salesData = [
  { month: "Jan", vendas: 12, meta: 15, receita: 18000 },
  { month: "Fev", vendas: 19, meta: 15, receita: 28500 },
  { month: "Mar", vendas: 8, meta: 15, receita: 12000 },
  { month: "Abr", vendas: 22, meta: 20, receita: 33000 },
  { month: "Mai", vendas: 16, meta: 20, receita: 24000 },
  { month: "Jun", vendas: 25, meta: 20, receita: 37500 },
]

const activityData = [
  { day: "Seg", ligacoes: 8, reunioes: 3, emails: 12 },
  { day: "Ter", ligacoes: 12, reunioes: 5, emails: 15 },
  { day: "Qua", ligacoes: 6, reunioes: 2, emails: 8 },
  { day: "Qui", ligacoes: 15, reunioes: 4, emails: 18 },
  { day: "Sex", ligacoes: 10, reunioes: 6, emails: 14 },
  { day: "Sab", ligacoes: 4, reunioes: 1, emails: 5 },
  { day: "Dom", ligacoes: 2, reunioes: 0, emails: 3 },
]

const pipelineData = [
  { name: "Prospecção", value: 45, color: "#8884d8" },
  { name: "Qualificação", value: 23, color: "#82ca9d" },
  { name: "Proposta", value: 12, color: "#ffc658" },
  { name: "Negociação", value: 8, color: "#ff7300" },
  { name: "Fechamento", value: 5, color: "#00ff00" },
]

const performanceData = [
  { week: "Sem 1", xp: 120, nivel: 3.2 },
  { week: "Sem 2", xp: 180, nivel: 3.6 },
  { week: "Sem 3", xp: 95, nivel: 3.8 },
  { week: "Sem 4", xp: 220, nivel: 4.4 },
]

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const stats = mockDashboardStats

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend = "up",
    format = "number",
  }: {
    title: string
    value: number
    change: number
    icon: any
    trend?: "up" | "down"
    format?: "number" | "currency" | "percentage"
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case "currency":
          return `R$ ${val.toLocaleString("pt-BR")}`
        case "percentage":
          return `${val}%`
        default:
          return val.toLocaleString("pt-BR")
      }
    }

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          <div className="flex items-center space-x-1 text-xs">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span className={trend === "up" ? "text-green-600" : "text-red-600"}>
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-muted-foreground">vs mês anterior</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">Acompanhe sua performance e identifique oportunidades de melhoria</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 dias</SelectItem>
            <SelectItem value="30d">30 dias</SelectItem>
            <SelectItem value="90d">90 dias</SelectItem>
            <SelectItem value="1y">1 ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Receita Total" value={stats.revenue} change={12.5} icon={DollarSign} format="currency" />
        <MetricCard title="Leads Ativos" value={stats.activeLeads} change={8.2} icon={Users} />
        <MetricCard
          title="Taxa de Conversão"
          value={stats.conversionRate}
          change={-2.1}
          icon={Target}
          trend="down"
          format="percentage"
        />
        <MetricCard title="Ticket Médio" value={stats.averageDealSize} change={15.3} icon={Award} format="currency" />
      </div>

      {/* Tabs de Analytics */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Tab de Vendas */}
        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendas vs Meta</CardTitle>
                <CardDescription>Acompanhe seu progresso mensal em relação às metas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
                    <Bar dataKey="meta" fill="#82ca9d" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
                <CardDescription>Evolução da receita ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value}`, "Receita"]} />
                    <Area type="monotone" dataKey="receita" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas de vendas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Deals Fechados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.closedDeals}</div>
                <p className="text-sm text-muted-foreground">neste mês</p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sequência Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{stats.streak}</div>
                <p className="text-sm text-muted-foreground">dias consecutivos</p>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{stats.activitiesThisWeek}</div>
                <p className="text-sm text-muted-foreground">esta semana</p>
                <Progress value={60} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Atividade */}
        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Atividades Semanais</CardTitle>
                <CardDescription>Distribuição das suas atividades por dia da semana</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ligacoes" fill="#8884d8" name="Ligações" />
                    <Bar dataKey="reunioes" fill="#82ca9d" name="Reuniões" />
                    <Bar dataKey="emails" fill="#ffc658" name="Emails" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo de Atividades</CardTitle>
                <CardDescription>Suas atividades principais hoje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>Ligações hoje</span>
                  </div>
                  <Badge variant="secondary">{stats.callsToday}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>Reuniões agendadas</span>
                  </div>
                  <Badge variant="secondary">{stats.meetingsScheduled}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-orange-600" />
                    <span>Atividades esta semana</span>
                  </div>
                  <Badge variant="secondary">{stats.activitiesThisWeek}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Pipeline */}
        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição do Pipeline</CardTitle>
                <CardDescription>Leads por estágio do funil de vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pipelineData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funil de Conversão</CardTitle>
                <CardDescription>Taxa de conversão entre os estágios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelineData.map((stage, index) => {
                  const conversionRate = index === 0 ? 100 : (stage.value / pipelineData[0].value) * 100
                  return (
                    <div key={stage.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{stage.name}</span>
                        <span>
                          {stage.value} leads ({conversionRate.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={conversionRate} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Performance */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do XP</CardTitle>
                <CardDescription>Seu progresso de experiência ao longo das semanas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="xp" stroke="#8884d8" strokeWidth={2} name="XP Ganho" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progressão de Nível</CardTitle>
                <CardDescription>Evolução do seu nível no BlitzSeller</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="nivel"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                      name="Nível"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Insights de Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Insights de Performance</CardTitle>
              <CardDescription>Análises baseadas em IA para melhorar seus resultados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Oportunidade de Melhoria</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Suas ligações nas terças-feiras têm 23% mais taxa de conversão. Considere concentrar mais
                      atividades neste dia.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Ponto Forte</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Você está 15% acima da média em follow-ups. Continue mantendo esse ritmo de acompanhamento!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Tendência Positiva</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      Sua taxa de conversão aumentou 8% nas últimas 2 semanas. O treinamento no simulador está dando
                      resultado!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
