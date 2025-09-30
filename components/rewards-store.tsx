"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, ShoppingCart, Gift, Zap, Palette, BookOpen } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

interface StoreItem {
  id: string
  name: string
  description: string
  price: number
  category: "power-ups" | "customization" | "rewards" | "training"
  icon: string
  available: boolean
  purchased?: boolean
}

const storeItems: StoreItem[] = [
  {
    id: "1",
    name: "XP Boost 2x",
    description: "Dobre seu XP por 24 horas",
    price: 50,
    category: "power-ups",
    icon: "⚡",
    available: true,
  },
  {
    id: "2",
    name: "Quest Extra",
    description: "Desbloqueie uma quest adicional hoje",
    price: 30,
    category: "power-ups",
    icon: "🎯",
    available: true,
  },
  {
    id: "3",
    name: "Proteção de Sequência",
    description: "Mantenha sua sequência mesmo perdendo um dia",
    price: 75,
    category: "power-ups",
    icon: "🛡️",
    available: true,
  },
  {
    id: "4",
    name: "Avatar Premium",
    description: "Desbloqueie avatares exclusivos",
    price: 100,
    category: "customization",
    icon: "👤",
    available: true,
  },
  {
    id: "5",
    name: "Tema Dourado",
    description: "Interface com tema dourado exclusivo",
    price: 150,
    category: "customization",
    icon: "🎨",
    available: true,
  },
  {
    id: "6",
    name: "Vale Café",
    description: "R$ 20 para usar em cafeterias parceiras",
    price: 200,
    category: "rewards",
    icon: "☕",
    available: true,
  },
  {
    id: "7",
    name: "Curso de Vendas",
    description: "Acesso a curso premium de técnicas de vendas",
    price: 300,
    category: "training",
    icon: "📚",
    available: true,
  },
  {
    id: "8",
    name: "Mentoria 1:1",
    description: "1 hora de mentoria com especialista em vendas",
    price: 500,
    category: "training",
    icon: "🎓",
    available: true,
  },
]

export function RewardsStore() {
  const [items] = useState<StoreItem[]>(storeItems)
  const [purchasedItems, setPurchasedItems] = useState<string[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "power-ups":
        return <Zap className="h-4 w-4" />
      case "customization":
        return <Palette className="h-4 w-4" />
      case "rewards":
        return <Gift className="h-4 w-4" />
      case "training":
        return <BookOpen className="h-4 w-4" />
      default:
        return <ShoppingCart className="h-4 w-4" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "power-ups":
        return "Power-ups"
      case "customization":
        return "Personalização"
      case "rewards":
        return "Recompensas"
      case "training":
        return "Treinamento"
      default:
        return "Outros"
    }
  }

  const handlePurchase = (item: StoreItem) => {
    if (!user || user.coins < item.price) {
      toast({
        title: "Moedas insuficientes",
        description: `Você precisa de ${item.price} moedas para comprar este item.`,
        variant: "destructive",
      })
      return
    }

    if (purchasedItems.includes(item.id)) {
      toast({
        title: "Item já comprado",
        description: "Você já possui este item.",
        variant: "destructive",
      })
      return
    }

    setPurchasedItems((prev) => [...prev, item.id])

    toast({
      title: "Compra realizada!",
      description: `Você comprou ${item.name} por ${item.price} moedas.`,
    })
  }

  const StoreItemCard = ({ item }: { item: StoreItem }) => {
    const isPurchased = purchasedItems.includes(item.id)
    const canAfford = user && user.coins >= item.price

    return (
      <Card
        className={`transition-all duration-200 ${isPurchased ? "bg-success/5 border-success/20" : "hover:shadow-md"}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </div>
            <Badge variant={item.available ? "default" : "secondary"}>
              {item.available ? "Disponível" : "Indisponível"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="h-4 w-4 text-coins" />
              <span className="font-bold text-coins">{item.price}</span>
            </div>
            <Button
              onClick={() => handlePurchase(item)}
              disabled={!item.available || isPurchased || !canAfford}
              variant={isPurchased ? "secondary" : "default"}
              size="sm"
            >
              {isPurchased ? "Comprado" : !canAfford ? "Sem moedas" : "Comprar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com saldo */}
      <Card className="bg-gradient-to-r from-coins/10 to-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="h-5 w-5 text-coins" />
                <span>Loja de Recompensas</span>
              </CardTitle>
              <CardDescription>Use suas moedas para comprar power-ups, personalizações e recompensas</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Seu saldo</p>
              <p className="text-2xl font-bold text-coins">{user?.coins || 0} moedas</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs por categoria */}
      <Tabs defaultValue="power-ups" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {["power-ups", "customization", "rewards", "training"].map((category) => {
            const categoryItems = items.filter((item) => item.category === category)
            return (
              <TabsTrigger key={category} value={category} className="flex items-center space-x-2">
                {getCategoryIcon(category)}
                <span className="hidden sm:inline">{getCategoryName(category)}</span>
                <Badge variant="secondary" className="ml-1">
                  {categoryItems.length}
                </Badge>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {["power-ups", "customization", "rewards", "training"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <StoreItemCard key={item.id} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Itens comprados */}
      {purchasedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Seus Itens</span>
            </CardTitle>
            <CardDescription>Itens que você já comprou</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {items
                .filter((item) => purchasedItems.includes(item.id))
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Ativo</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
