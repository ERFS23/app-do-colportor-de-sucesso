"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coins, Zap, Bell, ArrowLeft, User, Briefcase, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth()
  const { toast } = useToast()

  const [primarySegment, setPrimarySegment] = useState(user?.primarySegment || "")
  const [secondarySegment, setSecondarySegment] = useState(user?.secondarySegment || "")
  const [geographicArea, setGeographicArea] = useState(user?.geographicArea || "")

  const handleSaveSegments = () => {
    if (!primarySegment) {
      toast({
        title: "Erro",
        description: "Por favor, selecione seu segmento primário de atuação",
        variant: "destructive",
      })
      return
    }

    updateUser({
      primarySegment,
      secondarySegment,
      geographicArea,
    })

    toast({
      title: "Configurações salvas!",
      description: "Suas preferências de segmento foram atualizadas com sucesso.",
    })
  }

  const getSegmentLabel = (segment: string) => {
    switch (segment) {
      case "door-to-door":
        return "Porta em Porta (Residencial)"
      case "medical-business":
        return "Médicos e Empresários (B2B)"
      case "speaker-scheduler":
        return "Agendista/Palestrante (Empresas)"
      default:
        return "Não configurado"
    }
  }

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
                <h1 className="text-xl font-bold">Configurações</h1>
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
          <div className="max-w-4xl mx-auto space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="segments">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Segmentos
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>Gerencie suas informações pessoais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Alterar foto</Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} disabled />
                      <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Função</Label>
                      <Input value={user?.role === "admin" ? "Administrador" : "Usuário"} disabled />
                    </div>

                    <Button>Salvar alterações</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Segments Tab */}
              <TabsContent value="segments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Segmentos de Atuação</CardTitle>
                    <CardDescription>Configure seus segmentos de colportagem primário e secundário</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Current Segments Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-primary/5">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Segmento Primário
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-semibold">
                            {primarySegment ? getSegmentLabel(primarySegment) : "Não configurado"}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-accent/5">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Segmento Secundário
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-semibold">
                            {secondarySegment && secondarySegment !== "none"
                              ? getSegmentLabel(secondarySegment)
                              : "Nenhum"}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Segment Configuration */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="primarySegment">Segmento Primário de Atuação</Label>
                        <Select value={primarySegment} onValueChange={setPrimarySegment}>
                          <SelectTrigger id="primarySegment">
                            <SelectValue placeholder="Selecione seu segmento principal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="door-to-door">Porta em Porta (Residencial)</SelectItem>
                            <SelectItem value="medical-business">Médicos e Empresários (B2B)</SelectItem>
                            <SelectItem value="speaker-scheduler">Agendista/Palestrante (Empresas)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Este é o segmento onde você atua com mais frequência
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="secondarySegment">Segmento Secundário (Opcional)</Label>
                        <Select value={secondarySegment} onValueChange={setSecondarySegment}>
                          <SelectTrigger id="secondarySegment">
                            <SelectValue placeholder="Selecione um segmento secundário" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Nenhum</SelectItem>
                            <SelectItem value="door-to-door">Porta em Porta (Residencial)</SelectItem>
                            <SelectItem value="medical-business">Médicos e Empresários (B2B)</SelectItem>
                            <SelectItem value="speaker-scheduler">Agendista/Palestrante (Empresas)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Segmento adicional onde você também atua ocasionalmente
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="geographicArea" className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Área Geográfica de Atuação
                        </Label>
                        <Input
                          id="geographicArea"
                          type="text"
                          placeholder="Ex: Centro de São Paulo, Zona Sul do Rio"
                          value={geographicArea}
                          onChange={(e) => setGeographicArea(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">Defina a região onde você realiza suas vendas</p>
                      </div>
                    </div>

                    <Button onClick={handleSaveSegments} className="w-full">
                      Salvar configurações de segmento
                    </Button>
                  </CardContent>
                </Card>

                {/* Segment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sobre os Segmentos de Colportagem</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Porta em Porta (Residencial)</h4>
                      <p className="text-sm text-muted-foreground">
                        Vendas diretas em residências, focando no contato pessoal com famílias e indivíduos.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Médicos e Empresários (B2B)</h4>
                      <p className="text-sm text-muted-foreground">
                        Abordagem direta a profissionais e empresários, com foco em vendas corporativas e para
                        autoridades.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Agendista/Palestrante (Empresas)</h4>
                      <p className="text-sm text-muted-foreground">
                        Agendamento de palestras em empresas e organizações, com vendas realizadas ao final das
                        apresentações.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>Gerencie como você recebe notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Em breve: configurações de notificações</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
