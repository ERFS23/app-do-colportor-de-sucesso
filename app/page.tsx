"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")
  const { login, register, isLoading, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  // Don't render if user is logged in
  if (user) {
    return null
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    try {
      let success = false

      if (isLogin) {
        success = await login(email, password)
        if (!success) {
          setError("Erro no login. Tente novamente.")
        }
      } else {
        const name = formData.get("name") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (!name) {
          setError("Por favor, preencha seu nome")
          return
        }

        if (password !== confirmPassword) {
          setError("As senhas não coincidem")
          return
        }

        success = await register(name, email, password)
        if (!success) {
          setError("Erro ao criar conta. Tente novamente.")
        }
      }

      if (success) {
        toast({
          title: isLogin ? "Login realizado!" : "Conta criada!",
          description: isLogin ? "Bem-vindo de volta ao BRIDGE Solutions" : "Sua jornada de vendas começou!",
        })
      }
    } catch (err) {
      setError("Erro inesperado. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 flex items-center justify-center">
            <img src="/images/bridge-logo.png" alt="BRIDGE Solutions" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">BRIDGE Solutions</h1>
            <p className="text-muted-foreground text-balance">Transforme suas vendas em um jogo</p>
          </div>
        </div>

        {/* Formulário de Autenticação */}
        <Card>
          <CardHeader>
            <Tabs value={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <CardTitle>Bem-vindo de volta!</CardTitle>
                <CardDescription>Entre na sua conta para continuar sua jornada de vendas</CardDescription>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <CardTitle>Comece sua jornada</CardTitle>
                <CardDescription>Crie sua conta e transforme suas vendas em conquistas</CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" name="name" type="text" placeholder="Seu nome" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={isLogin ? "seu@email.com" : "seu@email.com"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
              </Button>
            </form>

            {isLogin && (
              <div className="mt-4 text-center">
                <Button variant="link" className="text-sm text-muted-foreground">
                  Esqueceu sua senha?
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Modo Demo:</strong> Use qualquer email e senha para acessar
            </p>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-accent/20 rounded-lg mx-auto flex items-center justify-center text-xl">🎯</div>
            <p className="text-sm text-muted-foreground">Quests Diárias</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto flex items-center justify-center text-xl">
              📊
            </div>
            <p className="text-sm text-muted-foreground">Analytics IA</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-warning/20 rounded-lg mx-auto flex items-center justify-center text-xl">
              🏆
            </div>
            <p className="text-sm text-muted-foreground">Conquistas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
