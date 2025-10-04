"use client"

import { Sidebar } from "@/components/sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { useConversations } from "@/hooks/use-conversations"
import type { Message } from "@/lib/types"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const {
    conversations,
    currentConversation,
    currentConversationId,
    setCurrentConversationId,
    createConversation,
    deleteConversation,
    updateConversationTitle,
    addMessage,
  } = useConversations()

  const handleNewConversation = () => {
    createConversation()
  }

  const handleSendMessage = (content: string) => {
    let conversationId = currentConversationId

    if (!conversationId) {
      conversationId = createConversation()
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }
    addMessage(conversationId, userMessage)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'll help you with that. Let me process your request...",
        timestamp: new Date(),
      }
      addMessage(conversationId!, assistantMessage)
    }, 1000)
  }

  return (
    <>
      <div className="flex h-screen">
        <Sidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewConversation={handleNewConversation}
          onSelectConversation={setCurrentConversationId}
          onDeleteConversation={deleteConversation}
          onRenameConversation={updateConversationTitle}
        />
        <main className="flex-1">
          <ChatInterface messages={currentConversation?.messages || []} onSendMessage={handleSendMessage} />
        </main>
      </div>
      <Toaster />
    </>
  )
}
