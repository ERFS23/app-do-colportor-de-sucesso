// BlitzSeller - Tipos de dados principais
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  xp: number
  coins: number
  streak: number
  joinedAt: string
  lastActiveAt: string
  primarySegment?: "door-to-door" | "medical-business" | "speaker-scheduler"
  secondarySegment?: "door-to-door" | "medical-business" | "speaker-scheduler"
  geographicArea?: string
  role?: "user" | "admin" // Added role field to identify admin users
}

export interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "special"
  xpReward: number
  coinReward: number
  difficulty: "easy" | "medium" | "hard"
  category: "prospecting" | "calls" | "meetings" | "closing"
  completed: boolean
  completedAt?: string
  targetValue: number
  currentValue: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  coinReward: number
  unlocked: boolean
  unlockedAt?: string
  category: "sales" | "activity" | "streak" | "special"
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  address?: string // Added address field
  company?: string
  interests?: string // Added interests field
  referredBy?: string // Added referral field
  maritalStatus?: "single" | "married" | "divorced" | "widowed" // Added marital status
  hasChildren?: boolean // Added children field
  lastContactType?: string // Added last contact type
  lastContactNotes?: string // Added last contact notes
  status: "cold" | "warm" | "hot" | "qualified" | "closed" | "lost"
  source: string
  value: number
  probability: number
  lastContact?: string
  nextFollowUp?: string
  notes: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface SalesActivity {
  id: string
  leadId: string
  type: "call" | "email" | "meeting" | "demo" | "proposal" | "follow-up"
  description: string
  outcome: "positive" | "neutral" | "negative" | "no-response"
  duration?: number
  scheduledAt?: string
  completedAt: string
  notes: string
  xpEarned: number
}

export interface RejectionScenario {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: "price" | "timing" | "authority" | "need" | "competition"
  scenario: string
  suggestedResponses: string[]
  tips: string[]
  completed: boolean
  score?: number
  completedAt?: string
}

export interface InventoryItem {
  id: string
  title: string
  category: "religious" | "health" | "family" | "education" | "children"
  stock: number
  price: number
  cost: number
  isbn?: string
  publisher?: string
  addedAt: string
  updatedAt: string
}

export interface InventoryTransaction {
  id: string
  itemId: string
  type: "purchase" | "sale" | "adjustment" | "return"
  quantity: number
  unitPrice?: number
  totalValue: number
  notes?: string
  createdAt: string
}

export interface DashboardStats {
  totalLeads: number
  activeLeads: number
  closedDeals: number
  revenue: number
  conversionRate: number
  averageDealSize: number
  activitiesThisWeek: number
  callsToday: number
  meetingsScheduled: number
  streak: number
}
