"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, MoreVertical, Download, Eye } from "lucide-react"
import type { Playbook } from "@/lib/types"

const MOCK_PLAYBOOKS: Playbook[] = [
  {
    id: "1",
    name: "Enterprise Sales Strategy",
    description: "Comprehensive guide for selling to enterprise clients with 500+ employees",
    content: "# Enterprise Sales Strategy\n\n## Overview\nThis playbook covers...",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Cold Email Templates",
    description: "Proven email templates for initial outreach and follow-ups",
    content: "# Cold Email Templates\n\n## Template 1: Introduction\nSubject: Quick question about...",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    name: "Objection Handling Guide",
    description: "How to handle common objections and turn them into opportunities",
    content: "# Objection Handling\n\n## Common Objections\n1. Price concerns...",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    name: "Discovery Call Framework",
    description: "Structured approach to conducting effective discovery calls",
    content: "# Discovery Call Framework\n\n## Pre-call Preparation\n- Research the company...",
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "5",
    name: "SaaS Qualification Criteria",
    description: "BANT framework adapted for SaaS sales with scoring system",
    content: "# SaaS Qualification\n\n## Budget\n- Annual revenue...",
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "6",
    name: "Follow-up Sequences",
    description: "Multi-touch follow-up sequences for different scenarios",
    content: "# Follow-up Sequences\n\n## Sequence 1: Post-Demo\nDay 1: Thank you email...",
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2024-01-03"),
  },
]

export function PlaybooksList() {
  const [playbooks] = useState<Playbook[]>(MOCK_PLAYBOOKS)

  const getWordCount = (content: string) => {
    return content.split(/\s+/).length
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {playbooks.map((playbook) => {
          const wordCount = getWordCount(playbook.content)
          const readTime = Math.ceil(wordCount / 200)

          return (
            <Card key={playbook.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base leading-tight">{playbook.name}</CardTitle>
                      <CardDescription className="text-xs">{playbook.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="font-normal">
                    {readTime} min read
                  </Badge>
                  <span>•</span>
                  <span>
                    Updated {playbook.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="mr-2 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-3 w-3" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
