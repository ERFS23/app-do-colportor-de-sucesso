"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Star, BookOpen, Play } from "lucide-react"

interface SalesTechnique {
  id: string
  title: string
  category: string
  difficulty: "Iniciante" | "Intermediário" | "Avançado"
  description: string
  steps: string[]
  example: string
  tips: string[]
  whenToUse: string
}

const salesTechniques: SalesTechnique[] = [
  {
    id: "spin",
    title: "Técnica SPIN",
    category: "Descoberta",
    difficulty: "Intermediário",
    description:
      "Método de questionamento estruturado para identificar necessidades do cliente através de perguntas Situação, Problema, Implicação e Necessidade.",
    steps: [
      "Situação: Faça perguntas sobre a situação atual do cliente",
      "Problema: Identifique problemas ou dificuldades",
      "Implicação: Explore as consequências desses problemas",
      "Necessidade: Desenvolva a necessidade de uma solução",
    ],
    example:
      "Situação: 'Como vocês fazem o controle de estoque atualmente?' → Problema: 'Vocês têm problemas com produtos em falta?' → Implicação: 'Isso afeta suas vendas?' → Necessidade: 'Seria útil ter um sistema automatizado?'",
    tips: [
      "Use mais perguntas de Implicação e Necessidade",
      "Escute ativamente as respostas",
      "Faça anotações das informações importantes",
    ],
    whenToUse: "Ideal para vendas consultivas e produtos complexos",
  },
  {
    id: "aida",
    title: "Modelo AIDA",
    category: "Apresentação",
    difficulty: "Iniciante",
    description: "Estrutura clássica para apresentações de vendas: Atenção, Interesse, Desejo e Ação.",
    steps: [
      "Atenção: Capture a atenção com uma abertura impactante",
      "Interesse: Desperte interesse mostrando benefícios relevantes",
      "Desejo: Crie desejo demonstrando valor e resultados",
      "Ação: Conduza para uma ação específica (compra, reunião, etc.)",
    ],
    example:
      "Atenção: 'Você sabia que 70% das empresas perdem vendas por falta de follow-up?' → Interesse: 'Nosso CRM automatiza esse processo' → Desejo: 'Clientes aumentaram vendas em 40%' → Ação: 'Vamos agendar uma demonstração?'",
    tips: [
      "Personalize cada etapa para o cliente específico",
      "Use dados e estatísticas na abertura",
      "Sempre termine com uma chamada para ação clara",
    ],
    whenToUse: "Perfeito para apresentações estruturadas e pitches de vendas",
  },
  {
    id: "consultiva",
    title: "Venda Consultiva",
    category: "Abordagem",
    difficulty: "Avançado",
    description:
      "Abordagem focada em entender profundamente o cliente e oferecer soluções personalizadas como um consultor especialista.",
    steps: [
      "Pesquise o cliente e seu mercado antes do contato",
      "Faça perguntas abertas para entender desafios",
      "Escute ativamente e tome notas detalhadas",
      "Apresente soluções específicas para os problemas identificados",
      "Posicione-se como parceiro, não apenas vendedor",
    ],
    example:
      "Em vez de 'Temos o melhor produto', use 'Com base no que você me contou sobre os desafios de produtividade, acredito que nossa solução pode ajudar especificamente com...'",
    tips: [
      "Foque mais em perguntas do que em apresentação",
      "Demonstre conhecimento do setor do cliente",
      "Ofereça insights valiosos mesmo se não fechar a venda",
    ],
    whenToUse: "Ideal para vendas B2B complexas e relacionamentos de longo prazo",
  },
  {
    id: "storytelling",
    title: "Storytelling em Vendas",
    category: "Persuasão",
    difficulty: "Intermediário",
    description: "Use histórias e casos de sucesso para criar conexão emocional e demonstrar valor de forma memorável.",
    steps: [
      "Identifique o contexto similar ao do cliente",
      "Conte uma história com início, meio e fim",
      "Inclua desafios, soluções e resultados específicos",
      "Conecte a história com a situação atual do cliente",
      "Use dados concretos para validar os resultados",
    ],
    example:
      "'Tivemos um cliente similar ao seu negócio que enfrentava o mesmo desafio. Eles implementaram nossa solução e em 6 meses reduziram custos em 30%. Imagino que você também gostaria de ver resultados assim, não é?'",
    tips: [
      "Mantenha histórias curtas e relevantes",
      "Use nomes reais (com permissão) para credibilidade",
      "Pratique suas melhores histórias até ficarem naturais",
    ],
    whenToUse: "Excelente para superar objeções e criar conexão emocional",
  },
  {
    id: "assumptive",
    title: "Fechamento Assumptivo",
    category: "Fechamento",
    difficulty: "Intermediário",
    description:
      "Técnica de fechamento que assume que o cliente já decidiu comprar, facilitando a finalização da venda.",
    steps: [
      "Identifique sinais de compra do cliente",
      "Use linguagem que assume a decisão de compra",
      "Ofereça opções em vez de sim/não",
      "Mantenha confiança na sua abordagem",
      "Esteja preparado para lidar com hesitações",
    ],
    example:
      "'Quando você gostaria de começar a implementação?' ou 'Prefere o plano mensal ou anual?' em vez de 'Você gostaria de comprar?'",
    tips: [
      "Observe a linguagem corporal do cliente",
      "Use após apresentar benefícios claros",
      "Seja natural, não forçado",
    ],
    whenToUse: "Quando o cliente demonstra interesse claro mas precisa de um empurrão final",
  },
  {
    id: "objection-handling",
    title: "Tratamento de Objeções",
    category: "Objeções",
    difficulty: "Avançado",
    description:
      "Método estruturado para lidar com objeções de forma profissional e converter resistência em oportunidade.",
    steps: [
      "Escute completamente a objeção sem interromper",
      "Reconheça e valide a preocupação do cliente",
      "Faça perguntas para entender melhor a objeção",
      "Responda com fatos, benefícios ou histórias relevantes",
      "Confirme se a objeção foi resolvida",
    ],
    example:
      "Cliente: 'Está muito caro' → Você: 'Entendo sua preocupação com o investimento. Posso perguntar qual seria um valor mais adequado para seu orçamento?' → Apresente valor e ROI → 'Isso esclarece a questão do investimento?'",
    tips: [
      "Nunca discuta ou desqualifique a objeção",
      "Prepare respostas para objeções comuns",
      "Use a técnica 'Sinta, Sentiu, Descobriu'",
    ],
    whenToUse: "Essencial em todas as vendas, especialmente quando há resistência",
  },
]

export function SalesTechniques() {
  const [selectedTechnique, setSelectedTechnique] = useState<SalesTechnique | null>(null)
  const [completedTechniques, setCompletedTechniques] = useState<string[]>([])

  const categories = ["Todas", "Descoberta", "Apresentação", "Abordagem", "Persuasão", "Fechamento", "Objeções"]
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  const filteredTechniques =
    selectedCategory === "Todas" ? salesTechniques : salesTechniques.filter((t) => t.category === selectedCategory)

  const markAsStudied = (techniqueId: string) => {
    if (!completedTechniques.includes(techniqueId)) {
      setCompletedTechniques([...completedTechniques, techniqueId])
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "bg-green-100 text-green-800"
      case "Intermediário":
        return "bg-yellow-100 text-yellow-800"
      case "Avançado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedTechnique) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedTechnique(null)}>
            ← Voltar às Técnicas
          </Button>
          <Button
            onClick={() => markAsStudied(selectedTechnique.id)}
            disabled={completedTechniques.includes(selectedTechnique.id)}
          >
            {completedTechniques.includes(selectedTechnique.id) ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Estudado
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Marcar como Estudado
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{selectedTechnique.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{selectedTechnique.category}</Badge>
                  <Badge className={getDifficultyColor(selectedTechnique.difficulty)}>
                    {selectedTechnique.difficulty}
                  </Badge>
                </div>
              </div>
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
            <CardDescription className="text-base">{selectedTechnique.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="steps" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="steps">Passos</TabsTrigger>
                <TabsTrigger value="example">Exemplo</TabsTrigger>
                <TabsTrigger value="tips">Dicas</TabsTrigger>
                <TabsTrigger value="usage">Quando Usar</TabsTrigger>
              </TabsList>

              <TabsContent value="steps" className="space-y-4">
                <h3 className="font-semibold text-lg">Como Aplicar:</h3>
                <div className="space-y-3">
                  {selectedTechnique.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="example" className="space-y-4">
                <h3 className="font-semibold text-lg">Exemplo Prático:</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm italic">{selectedTechnique.example}</p>
                </div>
              </TabsContent>

              <TabsContent value="tips" className="space-y-4">
                <h3 className="font-semibold text-lg">Dicas Importantes:</h3>
                <div className="space-y-2">
                  {selectedTechnique.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                <h3 className="font-semibold text-lg">Quando Usar:</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm">{selectedTechnique.whenToUse}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Técnicas de Venda 📚</h2>
            <p className="text-muted-foreground">
              Aprenda e domine as principais técnicas de vendas para aumentar sua performance
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progresso</p>
            <p className="text-2xl font-bold text-primary">
              {completedTechniques.length}/{salesTechniques.length}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Techniques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechniques.map((technique) => (
          <Card
            key={technique.id}
            className="cursor-pointer hover:shadow-md transition-shadow relative"
            onClick={() => setSelectedTechnique(technique)}
          >
            {completedTechniques.includes(technique.id) && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}

            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-lg">{technique.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {technique.category}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(technique.difficulty)}`}>
                    {technique.difficulty}
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-sm line-clamp-3">{technique.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Estudar Técnica
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTechniques.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma técnica encontrada nesta categoria.</p>
        </div>
      )}
    </div>
  )
}
