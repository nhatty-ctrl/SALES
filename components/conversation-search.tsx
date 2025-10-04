"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Conversation } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ConversationSearchProps {
  conversations: Conversation[]
  currentConversationId: string | null
  onSelectConversation: (id: string) => void
}

export function ConversationSearch({
  conversations,
  currentConversationId,
  onSelectConversation,
}: ConversationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      {searchQuery && (
        <div className="max-h-48 overflow-y-auto space-y-1">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => {
                  onSelectConversation(conversation.id)
                  setSearchQuery("")
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  currentConversationId === conversation.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <div className="truncate font-medium">{conversation.title}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {conversation.messages[0]?.content.slice(0, 60)}...
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground text-center">No conversations found</div>
          )}
        </div>
      )}
    </div>
  )
}
