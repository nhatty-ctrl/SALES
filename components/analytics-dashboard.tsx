"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mail, TrendingUp, Target, ArrowUp, ArrowDown } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const METRICS = [
  {
    title: "Total Leads",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Emails Sent",
    value: "8,432",
    change: "+8.2%",
    trend: "up",
    icon: Mail,
  },
  {
    title: "Response Rate",
    value: "24.3%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
  },
  {
    title: "Conversion Rate",
    value: "8.7%",
    change: "+3.4%",
    trend: "up",
    icon: Target,
  },
]

const WEEKLY_DATA = [
  { name: "Mon", leads: 45, emails: 120, responses: 28 },
  { name: "Tue", leads: 52, emails: 145, responses: 35 },
  { name: "Wed", leads: 48, emails: 132, responses: 31 },
  { name: "Thu", leads: 61, emails: 168, responses: 42 },
  { name: "Fri", leads: 55, emails: 151, responses: 38 },
  { name: "Sat", leads: 28, emails: 72, responses: 18 },
  { name: "Sun", leads: 22, emails: 58, responses: 14 },
]

const FUNNEL_DATA = [
  { stage: "Leads", count: 1284, percentage: 100 },
  { stage: "Contacted", count: 856, percentage: 67 },
  { stage: "Responded", count: 312, percentage: 24 },
  { stage: "Qualified", count: 187, percentage: 15 },
  { stage: "Converted", count: 112, percentage: 9 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? ArrowUp : ArrowDown
          const trendColor = metric.trend === "up" ? "text-neon-cyan" : "text-neon-magenta"

          return (
            <Card key={metric.title} className="stat-card cyan-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-nav uppercase tracking-wider">{metric.title}</CardTitle>
                <Icon className="h-5 w-5 text-chart-1 icon-embossed" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono text-neon-cyan">{metric.value}</div>
                <div className={`flex items-center text-xs font-medium mt-1 ${trendColor}`}>
                  <TrendIcon className="mr-1 h-3 w-3" />
                  {metric.change} from last period
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Activity with molten silver bars */}
        <Card className="metallic-card border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-display text-silver-white">Weekly Activity</CardTitle>
            <CardDescription className="text-muted-foreground">
              Leads and emails sent over the past week
            </CardDescription>
          </CardHeader>
          <CardContent className="holographic-viz rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="name" className="text-xs font-mono" stroke="hsl(var(--muted-foreground))" />
                <YAxis className="text-xs font-mono" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.09 0 0)",
                    border: "1px solid oklch(0.85 0.17 200 / 0.3)",
                    borderRadius: "8px",
                    boxShadow: "0 0 20px oklch(0.85 0.17 200 / 0.2)",
                  }}
                  labelClassName="font-mono text-neon-cyan"
                  itemStyle={{ color: "oklch(0.87 0 0)" }}
                />
                <Bar dataKey="leads" fill="oklch(0.85 0.17 200)" radius={[4, 4, 0, 0]} className="chart-glow-cyan" />
                <Bar dataKey="emails" fill="oklch(0.92 0.22 120)" radius={[4, 4, 0, 0]} className="chart-glow-lime" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Trend with neon line */}
        <Card className="metallic-card border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-display text-silver-white">Response Trend</CardTitle>
            <CardDescription className="text-muted-foreground">Daily response rate over the past week</CardDescription>
          </CardHeader>
          <CardContent className="holographic-viz rounded-lg p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="name" className="text-xs font-mono" stroke="hsl(var(--muted-foreground))" />
                <YAxis className="text-xs font-mono" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.09 0 0)",
                    border: "1px solid oklch(0.85 0.17 200 / 0.3)",
                    borderRadius: "8px",
                    boxShadow: "0 0 20px oklch(0.85 0.17 200 / 0.2)",
                  }}
                  labelClassName="font-mono text-neon-cyan"
                  itemStyle={{ color: "oklch(0.87 0 0)" }}
                />
                <Line
                  type="monotone"
                  dataKey="responses"
                  stroke="oklch(0.85 0.17 200)"
                  strokeWidth={3}
                  dot={{
                    fill: "oklch(0.85 0.17 200)",
                    r: 6,
                    strokeWidth: 2,
                    stroke: "oklch(0.06 0 0)",
                    filter: "drop-shadow(0 0 6px oklch(0.85 0.17 200 / 0.8))",
                  }}
                  className="chart-glow-cyan"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="metallic-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-display text-silver-white">Conversion Funnel</CardTitle>
          <CardDescription className="text-muted-foreground">
            Lead progression through your sales pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {FUNNEL_DATA.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium font-nav uppercase tracking-wide">{stage.stage}</span>
                  <span className="text-muted-foreground font-mono">
                    {stage.count.toLocaleString()} <span className="text-neon-lime">({stage.percentage}%)</span>
                  </span>
                </div>
                <div className="h-12 overflow-hidden rounded-lg bg-secondary/30 border border-border/30">
                  <div
                    className="h-full progress-lime transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="metallic-card border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-display text-silver-white">Top Performing Campaigns</CardTitle>
          <CardDescription className="text-muted-foreground">
            Campaigns with the highest conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Q1 SaaS Outreach", conversion: 12.5, leads: 150 },
              { name: "Enterprise Follow-up", conversion: 10.0, leads: 80 },
              { name: "Product Launch Campaign", conversion: 7.5, leads: 200 },
              { name: "Startup Founders Outreach", conversion: 6.2, leads: 100 },
            ].map((campaign) => (
              <div
                key={campaign.name}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30 hover:border-primary/30 transition-all cyan-glow"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{campaign.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{campaign.leads} leads</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-neon-cyan">{campaign.conversion}%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-nav">conversion</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
