"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OutreachHeader() {
  return (
    <div className="border-b border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Outreach</h1>
          <p className="text-sm text-muted-foreground">Manage your email campaigns and sequences</p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
