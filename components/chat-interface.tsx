"use client"
import { useState, useEffect, useRef } from "react"
import { Sparkles, PanelRightOpen, PanelRightClose } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Message } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"
import { FuturisticChatInput } from "@/components/futuristic-chat-input"
import { ChatBubble } from "@/components/chat-bubble"
import { ReferencePanel } from "@/components/reference-panel"
import { Button } from "@/components/ui/button"

const EXAMPLE_PROMPTS = [
  "Find 50 SaaS companies in San Francisco with 10-50 employees",
  "Scrape leads from a LinkedIn search URL",
  "Create an outreach campaign for my qualified leads",
  "Show me my top performing campaigns",
]

const MOCK_CITATIONS = [
  {
    id: "1",
    title: "SaaS Companies Database - Crunchbase",
    url: "https://crunchbase.com",
    snippet:
      "Comprehensive database of SaaS companies with detailed information about funding, employees, and location.",
    source: "Crunchbase",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "LinkedIn Sales Navigator Guide",
    url: "https://linkedin.com",
    snippet: "Advanced search and filtering capabilities for finding qualified leads on LinkedIn.",
    source: "LinkedIn",
    timestamp: new Date(),
  },
  {
    id: "3",
    title: "B2B Lead Generation Best Practices",
    url: "https://hubspot.com",
    snippet: "Proven strategies for generating and qualifying B2B leads in the SaaS industry.",
    source: "HubSpot",
    timestamp: new Date(),
  },
]

const MOCK_RELATED_TOPICS = [
  {
    id: "1",
    title: "Lead Scoring Methods",
    description: "Learn how to prioritize leads based on engagement and fit",
  },
  {
    id: "2",
    title: "Email Outreach Templates",
    description: "Proven templates for cold outreach campaigns",
  },
  {
    id: "3",
    title: "Sales Automation Tools",
    description: "Compare popular tools for automating your sales workflow",
  },
]

interface ChatInterfaceProps {
  messages?: Message[]
  onSendMessage?: (content: string) => void
}

export function ChatInterface({ messages = [], onSendMessage }: ChatInterfaceProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isReferencePanelOpen, setIsReferencePanelOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (content: string, file?: File) => {
    if (!content.trim() || isLoading) return

    setIsLoading(true)

    // Send message through parent component
    onSendMessage?.(content)

    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleExampleClick = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Main Chat Area */}
      <div className={cn("flex-1 flex flex-col smooth-transition", isReferencePanelOpen && "mr-80")}>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="flex h-full flex-col items-center justify-center p-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl glass-surface gentle-glow"
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-2 text-3xl font-semibold text-balance text-center text-foreground"
              >
                How can I help you today?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-12 text-center text-muted-foreground text-balance max-w-md leading-relaxed"
              >
                I can help you find leads, qualify prospects, create outreach campaigns, and analyze your sales
                performance.
              </motion.p>

              <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                    onClick={() => handleExampleClick(prompt)}
                    className="rounded-2xl glass-surface p-4 text-left text-sm hover:gentle-glow-hover smooth-transition"
                  >
                    <span className="text-foreground">{prompt}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-4 p-6">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    id={message.id}
                    role={message.role}
                    content={message.content}
                    citations={message.role === "assistant" ? MOCK_CITATIONS : []}
                    timestamp={new Date()}
                    onRegenerate={() => console.log("[v0] Regenerate message:", message.id)}
                    onCite={() => setIsReferencePanelOpen(true)}
                    onSave={() => console.log("[v0] Save message:", message.id)}
                  />
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 gentle-glow">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mx-auto max-w-3xl flex items-center gap-3">
            <div className="flex-1 glass-input rounded-2xl soft-shadow smooth-transition hover:soft-shadow-lg">
              <FuturisticChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReferencePanelOpen(!isReferencePanelOpen)}
              className={cn(
                "h-10 w-10 p-0 shrink-0 rounded-xl smooth-transition",
                isReferencePanelOpen
                  ? "text-primary glass-surface gentle-glow"
                  : "text-muted-foreground hover:bg-accent",
              )}
              title={isReferencePanelOpen ? "Close references" : "Open references"}
            >
              {isReferencePanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Reference Panel */}
      <ReferencePanel
        isOpen={isReferencePanelOpen}
        onClose={() => setIsReferencePanelOpen(false)}
        citations={MOCK_CITATIONS}
        relatedTopics={MOCK_RELATED_TOPICS}
        quickActions={[
          {
            id: "1",
            label: "Export conversation",
            icon: <Sparkles className="h-4 w-4" />,
            onClick: () => console.log("[v0] Export conversation"),
          },
        ]}
      />
    </div>
  )
}
