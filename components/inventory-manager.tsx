"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import type { InventoryItem } from "@/lib/types"

export function InventoryManager() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      title: "A Grande Esperança",
      category: "religious",
      stock: 25,
      price: 15.0,
      cost: 8.0,
      publisher: "Casa Publicadora Brasileira",
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Vida Saudável",
      category: "health",
      stock: 15,
      price: 20.0,
      cost: 12.0,
      publisher: "Casa Publicadora Brasileira",
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ])

  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    category: "religious" as InventoryItem["category"],
    stock: 0,
    price: 0,
    cost: 0,
    publisher: "",
  })

  const handleAddItem = () => {
    if (!newItem.title || newItem.price <= 0) return

    const item: InventoryItem = {
      id: Date.now().toString(),
      ...newItem,
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setInventory([...inventory, item])
    setNewItem({
      title: "",
      category: "religious",
      stock: 0,
      price: 0,
      cost: 0,
      publisher: "",
    })
    setIsAddingItem(false)
  }

  const handleStockAdjustment = (itemId: string, adjustment: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === itemId
          ? {
              ...item,
              stock: Math.max(0, item.stock + adjustment),
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    )
  }

  const totalValue = inventory.reduce((sum, item) => sum + item.stock * item.cost, 0)
  const totalItems = inventory.reduce((sum, item) => sum + item.stock, 0)
  const lowStockItems = inventory.filter((item) => item.stock < 5).length

  const getCategoryLabel = (category: string) => {
    const labels = {
      religious: "Religioso",
      health: "Saúde",
      family: "Família",
      education: "Educação",
      children: "Infantil",
    }
    return labels[category as keyof typeof labels] || category
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Estoque</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">{inventory.length} títulos diferentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor do Estoque</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Valor de custo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Itens com menos de 5 unidades</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gerenciamento de Estoque</CardTitle>
              <CardDescription>Controle seus livros e materiais de venda</CardDescription>
            </div>
            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Item</DialogTitle>
                  <DialogDescription>Cadastre um novo livro ou material no estoque</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Nome do livro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) =>
                        setNewItem({ ...newItem, category: value as InventoryItem["category"] })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="religious">Religioso</SelectItem>
                        <SelectItem value="health">Saúde</SelectItem>
                        <SelectItem value="family">Família</SelectItem>
                        <SelectItem value="education">Educação</SelectItem>
                        <SelectItem value="children">Infantil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Quantidade</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={newItem.stock}
                        onChange={(e) => setNewItem({ ...newItem, stock: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cost">Custo (R$)</Label>
                      <Input
                        id="cost"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newItem.cost}
                        onChange={(e) => setNewItem({ ...newItem, cost: Number.parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Preço de Venda (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publisher">Editora</Label>
                    <Input
                      id="publisher"
                      value={newItem.publisher}
                      onChange={(e) => setNewItem({ ...newItem, publisher: e.target.value })}
                      placeholder="Nome da editora"
                    />
                  </div>

                  <Button onClick={handleAddItem} className="w-full">
                    Adicionar ao Estoque
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant="secondary">{getCategoryLabel(item.category)}</Badge>
                    {item.stock < 5 && <Badge variant="destructive">Estoque Baixo</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.publisher}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Estoque: {item.stock}</span>
                    <span>Custo: R$ {item.cost.toFixed(2)}</span>
                    <span>Venda: R$ {item.price.toFixed(2)}</span>
                    <span className="text-green-600">
                      Margem: {(((item.price - item.cost) / item.price) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleStockAdjustment(item.id, -1)}>
                    <TrendingDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleStockAdjustment(item.id, 1)}>
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
