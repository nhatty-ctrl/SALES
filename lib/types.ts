export interface Lead {
  id: string
  name: string
  email: string
  company: string
  title: string
  linkedinUrl?: string
  status: "new" | "qualified" | "contacted" | "responded" | "converted"
  score?: number
  source: string
  createdAt: Date
  updatedAt: Date
}

export interface Campaign {
  id: string
  name: string
  status: "draft" | "active" | "paused" | "completed"
  totalLeads: number
  contacted: number
  responded: number
  converted: number
  createdAt: Date
  updatedAt: Date
}

export interface Playbook {
  id: string
  name: string
  description: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}
