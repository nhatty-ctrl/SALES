"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Maximize2,
  Minimize2,
  FileText,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Citation {
  id: string
  title: string
  url: string
  snippet: string
}

interface ChatBubbleProps {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: Citation[]
  timestamp?: Date
  onRegenerate?: () => void
  onCite?: () => void
  onSave?: () => void
}

export function ChatBubble({
  id,
  role,
  content,
  citations = [],
  timestamp,
  onRegenerate,
  onCite,
  onSave,
}: ChatBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)
  const { toast } = useToast()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied.",
    })
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.()
    toast({
      title: isSaved ? "Removed from saved" : "Saved",
      description: isSaved ? "Message removed from your saved items." : "Message saved to your collection.",
    })
  }

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(feedback === type ? null : type)
    toast({
      title: "Feedback recorded",
      description: "Thank you for your feedback!",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn("group flex gap-3", role === "user" ? "justify-end" : "justify-start")}
    >
      {role === "assistant" && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 gentle-glow">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      )}

      <div className="flex flex-col gap-2 max-w-[75%]">
        <div
          className={cn(
            "rounded-2xl px-4 py-3 smooth-transition soft-shadow",
            role === "user" ? "glass-surface" : "glass-surface",
            isExpanded && "max-w-full",
          )}
        >
          <p className={cn("text-[15px] leading-relaxed", isExpanded ? "whitespace-pre-wrap" : "line-clamp-6")}>
            {content}
          </p>

          {role === "assistant" && citations.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-border/30">
              {citations.map((citation, index) => (
                <a
                  key={citation.id}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cite inline-flex items-center gap-1.5 rounded-lg glass-surface px-2.5 py-1.5 text-xs hover:gentle-glow-hover smooth-transition"
                >
                  <span className="font-mono text-primary">[{index + 1}]</span>
                  <span className="text-muted-foreground group-hover/cite:text-foreground smooth-transition max-w-[120px] truncate">
                    {citation.title}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover/cite:text-primary smooth-transition" />
                </a>
              ))}
            </div>
          )}
        </div>

        {role === "assistant" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-1 opacity-0 group-hover:opacity-100 smooth-transition"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 smooth-transition-fast rounded-lg"
              title="Copy"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 smooth-transition-fast rounded-lg"
              title="Regenerate"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback("up")}
              className={cn(
                "h-7 px-2",
                feedback === "up"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50 smooth-transition-fast rounded-lg",
              )}
              title="Good response"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback("down")}
              className={cn(
                "h-7 px-2",
                feedback === "down"
                  ? "text-destructive"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50 smooth-transition-fast rounded-lg",
              )}
              title="Bad response"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>

            <div className="w-px h-4 bg-border mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 smooth-transition-fast rounded-lg"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>

            {citations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCite}
                className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 smooth-transition-fast rounded-lg"
                title="View citations"
              >
                <FileText className="h-3.5 w-3.5" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={cn(
                "h-7 px-2",
                isSaved
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50 smooth-transition-fast rounded-lg",
              )}
              title={isSaved ? "Saved" : "Save"}
            >
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            </Button>
          </motion.div>
        )}

        {timestamp && (
          <span className="text-xs text-muted-foreground px-1">
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>

      {role === "user" && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass-surface text-sm font-semibold">
          U
        </div>
      )}
    </motion.div>
  )
}
