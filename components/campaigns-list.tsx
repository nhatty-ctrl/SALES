"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, MoreVertical, Mail, Users, TrendingUp } from "lucide-react"
import type { Campaign } from "@/lib/types"

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Q1 SaaS Outreach",
    status: "active",
    totalLeads: 150,
    contacted: 120,
    responded: 45,
    converted: 12,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "2",
    name: "Enterprise Follow-up",
    status: "active",
    totalLeads: 80,
    contacted: 80,
    responded: 32,
    converted: 8,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "3",
    name: "Product Launch Campaign",
    status: "paused",
    totalLeads: 200,
    contacted: 150,
    responded: 55,
    converted: 15,
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "4",
    name: "Startup Founders Outreach",
    status: "draft",
    totalLeads: 100,
    contacted: 0,
    responded: 0,
    converted: 0,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
]

const STATUS_CONFIG = {
  active: { label: "Active", color: "bg-chart-1/10 text-chart-1 border-chart-1/20" },
  paused: { label: "Paused", color: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  draft: { label: "Draft", color: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20" },
  completed: { label: "Completed", color: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
}

export function CampaignsList() {
  const [campaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {campaigns.map((campaign) => {
        const responseRate = campaign.contacted > 0 ? (campaign.responded / campaign.contacted) * 100 : 0
        const conversionRate = campaign.responded > 0 ? (campaign.converted / campaign.responded) * 100 : 0
        const progress = campaign.totalLeads > 0 ? (campaign.contacted / campaign.totalLeads) * 100 : 0

        return (
          <Card key={campaign.id} className="metallic-card cyan-glow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg metallic-text">{campaign.name}</CardTitle>
                  <CardDescription>
                    Created {campaign.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={STATUS_CONFIG[campaign.status].color}>
                    {STATUS_CONFIG[campaign.status].label}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    {campaign.contacted} / {campaign.totalLeads} contacted
                  </span>
                </div>
                <Progress value={progress} className="h-2 [&>div]:bg-chart-2 [&>div]:lime-glow" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3 text-chart-1" />
                    Contacted
                  </div>
                  <div className="text-2xl font-semibold">{campaign.contacted}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3 text-chart-2" />
                    Responded
                  </div>
                  <div className="text-2xl font-semibold">{campaign.responded}</div>
                  <div className="text-xs text-muted-foreground">{responseRate.toFixed(1)}% rate</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-chart-4" />
                    Converted
                  </div>
                  <div className="text-2xl font-semibold">{campaign.converted}</div>
                  <div className="text-xs text-muted-foreground">{conversionRate.toFixed(1)}% rate</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {campaign.status === "active" ? (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent hover-shimmer">
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1 hover-shimmer">
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1 bg-transparent hover-shimmer">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
