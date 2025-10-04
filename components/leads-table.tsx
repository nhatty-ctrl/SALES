"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Mail } from "lucide-react"
import type { Lead } from "@/lib/types"

// Mock data
const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Inc",
    title: "VP of Sales",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    status: "qualified",
    score: 85,
    source: "LinkedIn Search",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@innovate.io",
    company: "Innovate.io",
    title: "Head of Marketing",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    status: "contacted",
    score: 72,
    source: "Website Scrape",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@startupxyz.com",
    company: "StartupXYZ",
    title: "CEO",
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
    status: "responded",
    score: 92,
    source: "Manual Entry",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "4",
    name: "David Park",
    email: "david@growthco.com",
    company: "GrowthCo",
    title: "Director of Sales",
    status: "new",
    score: 68,
    source: "LinkedIn Search",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@enterprise.com",
    company: "Enterprise Solutions",
    title: "VP of Operations",
    linkedinUrl: "https://linkedin.com/in/lisathompson",
    status: "qualified",
    score: 78,
    source: "Website Scrape",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-15"),
  },
]

const STATUS_COLORS = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  qualified: "bg-green-500/10 text-green-500 border-green-500/20",
  contacted: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  responded: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  converted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS)
  const [filter, setFilter] = useState<string>("all")

  const filteredLeads = filter === "all" ? leads : leads.filter((lead) => lead.status === filter)

  const handleStatusChange = (leadId: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus, updatedAt: new Date() } : lead)),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {lead.name}
                    {lead.linkedinUrl && (
                      <a
                        href={lead.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell className="text-muted-foreground">{lead.title}</TableCell>
                <TableCell>
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-sm hover:underline">
                    {lead.email}
                  </a>
                </TableCell>
                <TableCell>
                  {lead.score && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-primary transition-all" style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground">{lead.score}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(value) => handleStatusChange(lead.id, value as Lead["status"])}
                  >
                    <SelectTrigger className="w-[130px]">
                      <Badge variant="outline" className={STATUS_COLORS[lead.status]}>
                        {lead.status}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{lead.source}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
