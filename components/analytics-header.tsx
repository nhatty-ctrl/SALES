"use client"

import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AnalyticsHeader() {
  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Track your sales performance and campaign metrics</p>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
      </div>
    </div>
  )
}
