"use client"

import { useState, useEffect, useCallback } from "react"
import type { Conversation, Message } from "@/lib/types"

const STORAGE_KEY = "ai-sales-assistant-conversations"

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setConversations(parsed)
        if (parsed.length > 0) {
          setCurrentConversationId(parsed[0].id)
        }
      } catch (error) {
        console.error("Failed to parse conversations:", error)
      }
    }
  }, [])

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
    }
  }, [conversations])

  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations((prev) => [newConversation, ...prev])
    setCurrentConversationId(newConversation.id)
    return newConversation.id
  }, [])

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const filtered = prev.filter((c) => c.id !== id)
        if (currentConversationId === id && filtered.length > 0) {
          setCurrentConversationId(filtered[0].id)
        } else if (filtered.length === 0) {
          setCurrentConversationId(null)
        }
        return filtered
      })
    },
    [currentConversationId],
  )

  const updateConversationTitle = useCallback((id: string, title: string) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title, updatedAt: new Date() } : c)))
  }, [])

  const addMessage = useCallback((conversationId: string, message: Message) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const updatedMessages = [...c.messages, message]
          // Auto-generate title from first user message
          const title =
            c.messages.length === 0 && message.role === "user"
              ? message.content.slice(0, 50) + (message.content.length > 50 ? "..." : "")
              : c.title
          return {
            ...c,
            messages: updatedMessages,
            title,
            updatedAt: new Date(),
          }
        }
        return c
      }),
    )
  }, [])

  const currentConversation = conversations.find((c) => c.id === currentConversationId)

  return {
    conversations,
    currentConversation,
    currentConversationId,
    setCurrentConversationId,
    createConversation,
    deleteConversation,
    updateConversationTitle,
    addMessage,
  }
}
