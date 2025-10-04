"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PlaybooksHeader() {
  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Playbooks</h1>
          <p className="text-sm text-muted-foreground">Create and manage your sales playbooks and strategies</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>
    </div>
  )
}
