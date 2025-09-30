"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("blitzseller-user")
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      }
    } catch (error) {
      localStorage.removeItem("blitzseller-user")
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      // Create a demo user with the provided email
      const loggedUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email,
        level: 1,
        xp: 0,
        coins: 50,
        streak: 0,
        joinedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        role: "user",
      }

      setUser(loggedUser)
      localStorage.setItem("blitzseller-user", JSON.stringify(loggedUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        level: 1,
        xp: 0,
        coins: 50,
        streak: 0,
        joinedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        role: "user",
      }

      setUser(newUser)
      localStorage.setItem("blitzseller-user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = {
      ...user,
      ...updates,
      lastActiveAt: new Date().toISOString(),
    }

    setUser(updatedUser)
    localStorage.setItem("blitzseller-user", JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("blitzseller-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
