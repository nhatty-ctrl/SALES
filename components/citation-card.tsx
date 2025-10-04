"use client"

import { ExternalLink, FileText, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface CitationCardProps {
  id: string
  title: string
  url: string
  snippet: string
  index: number
  timestamp?: Date
  source?: string
}

export function CitationCard({ id, title, url, snippet, index, timestamp, source }: CitationCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
          <span className="font-mono text-xs font-semibold text-primary">{index + 1}</span>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Title */}
      <h4 className="mb-2 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h4>

      {/* Snippet */}
      <p className="mb-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">{snippet}</p>

      {/* Metadata */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        {source && (
          <div className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span className="truncate max-w-[120px]">{source}</span>
          </div>
        )}
        {timestamp && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timestamp.toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </motion.a>
  )
}
