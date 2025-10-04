"use client"
import { usePathname } from "next/navigation"
import {
  MessageSquare,
  Users,
  Send,
  BookOpen,
  BarChart3,
  Pencil,
  Trash2,
  Check,
  X,
  Download,
  Search,
  Library,
  SquarePen,
  Plug,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Conversation } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const navigation = [
  { name: "Chat", href: "/", icon: MessageSquare },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Outreach", href: "/outreach", icon: Send },
  { name: "Playbooks", href: "/playbooks", icon: BookOpen },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

interface SidebarProps {
  conversations?: Conversation[]
  currentConversationId?: string | null
  onNewConversation?: () => void
  onSelectConversation?: (id: string) => void
  onDeleteConversation?: (id: string) => void
  onRenameConversation?: (id: string, title: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({
  conversations = [],
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const { toast } = useToast()

  const startEditing = (conversation: Conversation) => {
    setEditingId(conversation.id)
    setEditTitle(conversation.title)
  }

  const saveEdit = () => {
    if (editingId && editTitle.trim()) {
      onRenameConversation?.(editingId, editTitle.trim())
      toast({
        title: "Conversation renamed",
        description: "Your conversation title has been updated.",
      })
    }
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
  }

  const exportConversation = (conversation: Conversation) => {
    const data = JSON.stringify(conversation, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${conversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Conversation exported",
      description: "Your conversation has been downloaded as JSON.",
    })
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex h-screen flex-col bg-sidebar border-r border-sidebar-border relative"
    >
      <div className="flex h-14 items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center">
            <MessageSquare className="h-5 w-5 text-foreground" />
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="h-8 w-8 p-0 hover:bg-sidebar-accent">
          <SquarePen className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="full-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <Button
                onClick={onNewConversation}
                className="w-full justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent text-foreground font-normal"
                variant="ghost"
              >
                <SquarePen className="h-4 w-4" />
                New chat
              </Button>

              <Button
                onClick={() => setShowSearch(!showSearch)}
                className="w-full justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent text-foreground font-normal"
                variant="ghost"
              >
                <Search className="h-4 w-4" />
                Search chats
              </Button>

              <Button
                className="w-full justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent text-foreground font-normal"
                variant="ghost"
              >
                <Library className="h-4 w-4" />
                Library
              </Button>

              <div className="pt-6">
                <h3 className="px-3 pb-2 text-xs font-medium text-muted-foreground">Navigation</h3>
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.name} href={item.href}>
                        <button
                          className={cn(
                            "w-full flex items-center gap-3 h-9 px-3 rounded-lg text-foreground text-sm font-normal text-left transition-colors",
                            isActive ? "bg-sidebar-accent" : "hover:bg-sidebar-accent",
                          )}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="flex-1 truncate">{item.name}</span>
                        </button>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {conversations.length > 0 && (
                <div className="pt-6">
                  <h3 className="px-3 pb-2 text-xs font-medium text-muted-foreground">Chats</h3>
                  <div className="space-y-1">
                    {conversations.slice(0, 10).map((conversation) => (
                      <motion.div
                        key={conversation.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                          currentConversationId === conversation.id
                            ? "bg-sidebar-accent text-foreground"
                            : "text-foreground hover:bg-sidebar-accent",
                        )}
                      >
                        {editingId === conversation.id ? (
                          <div className="flex flex-1 items-center gap-1">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit()
                                if (e.key === "Escape") cancelEdit()
                              }}
                              className="flex-1 bg-background px-2 py-1 text-xs rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                              autoFocus
                            />
                            <button onClick={saveEdit} className="p-1 hover:bg-background rounded">
                              <Check className="h-3 w-3" />
                            </button>
                            <button onClick={cancelEdit} className="p-1 hover:bg-background rounded">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => onSelectConversation?.(conversation.id)}
                              className="flex-1 truncate text-left"
                            >
                              {conversation.title}
                            </button>
                            <div className="hidden group-hover:flex items-center gap-1">
                              <button
                                onClick={() => exportConversation(conversation)}
                                className="p-1 hover:bg-background rounded"
                                title="Export conversation"
                              >
                                <Download className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => startEditing(conversation)}
                                className="p-1 hover:bg-background rounded"
                                title="Rename conversation"
                              >
                                <Pencil className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => {
                                  onDeleteConversation?.(conversation.id)
                                  toast({
                                    title: "Conversation deleted",
                                    description: "Your conversation has been removed.",
                                  })
                                }}
                                className="p-1 hover:bg-background rounded text-destructive"
                                title="Delete conversation"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <Button
                onClick={onNewConversation}
                className="w-full p-0 h-10 hover:bg-sidebar-accent"
                size="sm"
                variant="ghost"
                title="New chat"
              >
                <SquarePen className="h-4 w-4" />
              </Button>
              <Button
                className="w-full p-0 h-10 hover:bg-sidebar-accent"
                size="sm"
                variant="ghost"
                title="Search chats"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button className="w-full p-0 h-10 hover:bg-sidebar-accent" size="sm" variant="ghost" title="Library">
                <Library className="h-4 w-4" />
              </Button>
              <div className="pt-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        className={cn("w-full p-0 h-10", isActive ? "bg-sidebar-accent" : "hover:bg-sidebar-accent")}
                        size="sm"
                        variant="ghost"
                        title={item.name}
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-sidebar-border">
        {!isCollapsed ? (
          <div className="p-2">
            <Button
              className="w-full justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent text-foreground font-normal"
              variant="ghost"
            >
              <Plug className="h-4 w-4" />
              Integrations
            </Button>
          </div>
        ) : (
          <div className="p-2">
            <Button className="w-full p-0 h-10 hover:bg-sidebar-accent" size="sm" variant="ghost" title="Integrations">
              <Plug className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              N
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">nhatty</div>
              <div className="text-xs text-muted-foreground">Free</div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 text-xs border-sidebar-border hover:bg-sidebar-accent bg-transparent"
            >
              Upgrade
            </Button>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="border-t border-sidebar-border p-2">
          <div className="flex h-10 w-full items-center justify-center rounded-lg hover:bg-sidebar-accent">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              N
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
