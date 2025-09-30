"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  Target,
  Award,
} from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  company: string
  interests?: string
  referredBy?: string
  maritalStatus?: "single" | "married" | "divorced" | "widowed"
  hasChildren?: boolean
  lastContactType?: string
  lastContactNotes?: string
  value: number
  stage: "prospect" | "qualified" | "proposal" | "negotiation" | "closed"
  probability: number
  lastContact: string
  source: string
  isGoldenClient: boolean
  avatar?: string
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "(11) 99999-9999",
    company: "Tech Solutions",
    value: 15000,
    stage: "qualified",
    probability: 75,
    lastContact: "2024-01-15",
    source: "LinkedIn",
    isGoldenClient: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@startup.com",
    phone: "(11) 88888-8888",
    company: "StartupX",
    value: 8500,
    stage: "proposal",
    probability: 60,
    lastContact: "2024-01-14",
    source: "Indicação",
    isGoldenClient: false,
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro@corp.com",
    phone: "(11) 77777-7777",
    company: "Corp Industries",
    value: 25000,
    stage: "negotiation",
    probability: 85,
    lastContact: "2024-01-13",
    source: "Website",
    isGoldenClient: true,
  },
]

const stageColors = {
  prospect: "bg-gray-100 text-gray-800",
  qualified: "bg-blue-100 text-blue-800",
  proposal: "bg-yellow-100 text-yellow-800",
  negotiation: "bg-orange-100 text-orange-800",
  closed: "bg-green-100 text-green-800",
}

const stageLabels = {
  prospect: "Prospecto",
  qualified: "Qualificado",
  proposal: "Proposta",
  negotiation: "Negociação",
  closed: "Fechado",
}

export function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState<string>("all")
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false) // Added state for modal
  const [newLead, setNewLead] = useState({
    // Updated state for new lead form
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    interests: [] as string[], // Changed to array for multiple selection
    customInterests: "", // Added for custom text when "nenhuma das anteriores" is selected
    referredBy: "",
    maritalStatus: "",
    hasChildren: false,
    lastContactType: "",
    lastContactNotes: "",
    value: "",
    source: "",
  })

  const predefinedInterests = [
    "Esportes",
    "Carros",
    "Viagens",
    "Música",
    "Leitura",
    "Jardinagem",
    "Culinária",
    "Jogos",
    "Fotografia",
    "Cinema e Séries",
    "Artes e Artesanato",
    "Tecnologia",
    "Moda",
    "Caminhadas e Natureza",
    "Dança",
  ]

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === "all" || lead.stage === selectedStage
    return matchesSearch && matchesStage
  })

  const goldenClients = leads.filter((lead) => lead.isGoldenClient)
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0)
  const avgProbability = leads.reduce((sum, lead) => sum + lead.probability, 0) / leads.length

  const handleSubmitNewLead = () => {
    const finalInterests = newLead.interests.includes("nenhuma das anteriores")
      ? newLead.customInterests
      : newLead.interests.join(", ")

    const lead: Lead = {
      id: Date.now().toString(),
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      address: newLead.address,
      company: newLead.company,
      interests: finalInterests,
      referredBy: newLead.referredBy,
      maritalStatus: newLead.maritalStatus as "single" | "married" | "divorced" | "widowed",
      hasChildren: newLead.hasChildren,
      lastContactType: newLead.lastContactType,
      lastContactNotes: newLead.lastContactNotes,
      value: Number.parseFloat(newLead.value) || 0,
      stage: "prospect",
      probability: 25,
      lastContact: new Date().toISOString().split("T")[0],
      source: newLead.source,
      isGoldenClient: false,
    }

    setLeads([...leads, lead])
    setIsNewLeadOpen(false)
    setNewLead({
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      interests: [],
      customInterests: "",
      referredBy: "",
      maritalStatus: "",
      hasChildren: false,
      lastContactType: "",
      lastContactNotes: "",
      value: "",
      source: "",
    })
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (interest === "nenhuma das anteriores") {
      if (checked) {
        setNewLead({ ...newLead, interests: ["nenhuma das anteriores"], customInterests: "" })
      } else {
        setNewLead({ ...newLead, interests: [], customInterests: "" })
      }
    } else {
      if (checked) {
        const newInterests = [...newLead.interests.filter((i) => i !== "nenhuma das anteriores"), interest]
        setNewLead({ ...newLead, interests: newInterests })
      } else {
        const newInterests = newLead.interests.filter((i) => i !== interest)
        setNewLead({ ...newLead, interests: newInterests })
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-xs text-muted-foreground">+2 desde ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prob. Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProbability.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">+5% esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Dourados</CardTitle>
            <Award className="h-4 w-4 text-coins" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-coins">{goldenClients.length}</div>
            <p className="text-xs text-muted-foreground">Alto potencial</p>
          </CardContent>
        </Card>
      </div>

      {/* CRM Tabs */}
      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="golden">Clientes Dourados</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Dialog open={isNewLeadOpen} onOpenChange={setIsNewLeadOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Lead
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Lead</DialogTitle>
                    <DialogDescription>
                      Preencha as informações do cliente para adicionar ao seu pipeline de vendas.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          value={newLead.name}
                          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                          placeholder="Nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newLead.email}
                          onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                          placeholder="email@exemplo.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={newLead.phone}
                          onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          value={newLead.company}
                          onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                          placeholder="Nome da empresa"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={newLead.address}
                        onChange={(e) => setNewLead({ ...newLead, address: e.target.value })}
                        placeholder="Endereço completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Gostos e Interesses</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                        {predefinedInterests.map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                              id={`interest-${interest}`}
                              checked={newLead.interests.includes(interest)}
                              onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                              disabled={
                                newLead.interests.includes("nenhuma das anteriores") &&
                                interest !== "nenhuma das anteriores"
                              }
                            />
                            <Label htmlFor={`interest-${interest}`} className="text-sm font-normal">
                              {interest}
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2 col-span-2 border-t pt-2 mt-2">
                          <Checkbox
                            id="interest-none"
                            checked={newLead.interests.includes("nenhuma das anteriores")}
                            onCheckedChange={(checked) =>
                              handleInterestChange("nenhuma das anteriores", checked as boolean)
                            }
                          />
                          <Label htmlFor="interest-none" className="text-sm font-normal">
                            Nenhuma das anteriores
                          </Label>
                        </div>
                      </div>
                      {newLead.interests.includes("nenhuma das anteriores") && (
                        <div className="mt-2">
                          <Textarea
                            placeholder="Descreva os interesses, hobbies e preferências do cliente..."
                            value={newLead.customInterests}
                            onChange={(e) => setNewLead({ ...newLead, customInterests: e.target.value })}
                            rows={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="referredBy">Indicado por</Label>
                        <Select
                          value={newLead.referredBy}
                          onValueChange={(value) => setNewLead({ ...newLead, referredBy: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione quem indicou" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amigo-profissao">Por um amigo de profissão</SelectItem>
                            <SelectItem value="autoridade-cidade">Por uma autoridade da cidade</SelectItem>
                            <SelectItem value="vizinho">Por um vizinho</SelectItem>
                            <SelectItem value="familiar">Por um familiar</SelectItem>
                            <SelectItem value="conhecido">Por um conhecido</SelectItem>
                            <SelectItem value="empresario">Por um empresário</SelectItem>
                            <SelectItem value="nao-indicado">Não foi indicado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="source">Fonte do Lead</Label>
                        <Select
                          value={newLead.source}
                          onValueChange={(value) => setNewLead({ ...newLead, source: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a fonte" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="evento">Evento</SelectItem>
                            <SelectItem value="cold-call">Cold Call</SelectItem>
                            <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Estado Civil</Label>
                        <Select
                          value={newLead.maritalStatus}
                          onValueChange={(value) => setNewLead({ ...newLead, maritalStatus: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Solteiro(a)</SelectItem>
                            <SelectItem value="married">Casado(a)</SelectItem>
                            <SelectItem value="divorced">Divorciado(a)</SelectItem>
                            <SelectItem value="widowed">Viúvo(a)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Valor Estimado (R$)</Label>
                        <Input
                          id="value"
                          type="number"
                          value={newLead.value}
                          onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasChildren"
                        checked={newLead.hasChildren}
                        onCheckedChange={(checked) => setNewLead({ ...newLead, hasChildren: checked as boolean })}
                      />
                      <Label htmlFor="hasChildren">Tem filhos</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastContactType">Tipo do Último Contato</Label>
                      <Select
                        value={newLead.lastContactType}
                        onValueChange={(value) => setNewLead({ ...newLead, lastContactType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Como foi o último contato?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Ligação</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="meeting">Reunião</SelectItem>
                          <SelectItem value="event">Evento</SelectItem>
                          <SelectItem value="social">Redes Sociais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastContactNotes">Como foi o último contato?</Label>
                      <Textarea
                        id="lastContactNotes"
                        value={newLead.lastContactNotes}
                        onChange={(e) => setNewLead({ ...newLead, lastContactNotes: e.target.value })}
                        placeholder="Descreva como foi o último contato, o que foi discutido, próximos passos..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewLeadOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSubmitNewLead} disabled={!newLead.name || !newLead.email || !newLead.phone}>
                      Cadastrar Lead
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Leads List */}
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={lead.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{lead.name}</h3>
                          {lead.isGoldenClient && <Star className="h-4 w-4 text-coins fill-coins" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-lg font-semibold">R$ {lead.value.toLocaleString()}</div>
                      <Badge className={stageColors[lead.stage]}>{stageLabels[lead.stage]}</Badge>
                      <div className="text-sm text-muted-foreground">{lead.probability}% probabilidade</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Último contato: {new Date(lead.lastContact).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-3 w-3 mr-1" />
                        Ligar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Agendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(stageLabels).map(([stage, label]) => {
              const stageLeads = leads.filter((lead) => lead.stage === stage)
              const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0)

              return (
                <Card key={stage}>
                  <CardHeader>
                    <CardTitle className="text-sm">{label}</CardTitle>
                    <CardDescription>
                      {stageLeads.length} leads • R$ {stageValue.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stageLeads.map((lead) => (
                      <div key={lead.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.company}</p>
                          </div>
                          {lead.isGoldenClient && <Star className="h-3 w-3 text-coins fill-coins" />}
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs">
                            <span>R$ {lead.value.toLocaleString()}</span>
                            <span>{lead.probability}%</span>
                          </div>
                          <Progress value={lead.probability} className="h-1 mt-1" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="golden" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-coins" />
                <span>Clientes Dourados</span>
              </CardTitle>
              <CardDescription>Leads com maior potencial identificados pela IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {goldenClients.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg bg-coins/5">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={lead.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{lead.name}</h3>
                        <Star className="h-4 w-4 text-coins fill-coins" />
                      </div>
                      <p className="text-sm text-muted-foreground">{lead.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>R$ {lead.value.toLocaleString()}</span>
                        <span>{lead.probability}% probabilidade</span>
                        <Badge className={stageColors[lead.stage]}>{stageLabels[lead.stage]}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Target className="h-3 w-3 mr-1" />
                      Focar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
