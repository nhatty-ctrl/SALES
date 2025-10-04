"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, BookOpen, Lightbulb, Link2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CitationCard } from "@/components/citation-card"

interface Citation {
  id: string
  title: string
  url: string
  snippet: string
  source?: string
  timestamp?: Date
}

interface RelatedTopic {
  id: string
  title: string
  description: string
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
}

interface ReferencePanelProps {
  isOpen: boolean
  onClose: () => void
  citations?: Citation[]
  relatedTopics?: RelatedTopic[]
  quickActions?: QuickAction[]
}

export function ReferencePanel({
  isOpen,
  onClose,
  citations = [],
  relatedTopics = [],
  quickActions = [],
}: ReferencePanelProps) {
  const [expandedSection, setExpandedSection] = useState<"citations" | "related" | "actions" | null>("citations")

  const toggleSection = (section: "citations" | "related" | "actions") => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed right-0 top-0 h-screen w-80 border-l border-border bg-background z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-lg font-semibold text-foreground">References</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="h-[calc(100vh-64px)] overflow-y-auto p-4 space-y-4">
            {/* Citations Section */}
            {citations.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("citations")}
                  className="flex w-full items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Citations <span className="text-muted-foreground">({citations.length})</span>
                    </h3>
                  </div>
                  {expandedSection === "citations" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSection === "citations" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {citations.map((citation, index) => (
                        <CitationCard key={citation.id} {...citation} index={index} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Related Topics Section */}
            {relatedTopics.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("related")}
                  className="flex w-full items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Related Topics</h3>
                  </div>
                  {expandedSection === "related" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSection === "related" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {relatedTopics.map((topic) => (
                        <button
                          key={topic.id}
                          className="w-full text-left rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <h4 className="text-sm font-medium text-foreground mb-1">{topic.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {topic.description}
                          </p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Quick Actions Section */}
            {quickActions.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("actions")}
                  className="flex w-full items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
                  </div>
                  {expandedSection === "actions" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSection === "actions" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {quickActions.map((action) => (
                        <Button
                          key={action.id}
                          onClick={action.onClick}
                          variant="outline"
                          className="w-full justify-start gap-2 bg-transparent"
                        >
                          {action.icon}
                          <span className="text-sm">{action.label}</span>
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
