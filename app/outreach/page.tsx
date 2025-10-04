import { Sidebar } from "@/components/sidebar"
import { OutreachHeader } from "@/components/outreach-header"
import { CampaignsList } from "@/components/campaigns-list"

export default function OutreachPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <OutreachHeader />
          <div className="flex-1 overflow-y-auto p-6">
            <CampaignsList />
          </div>
        </div>
      </main>
    </div>
  )
}
