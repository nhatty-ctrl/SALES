import { Sidebar } from "@/components/sidebar"
import { LeadsTable } from "@/components/leads-table"
import { LeadsHeader } from "@/components/leads-header"

export default function LeadsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <LeadsHeader />
          <div className="flex-1 overflow-y-auto p-6">
            <LeadsTable />
          </div>
        </div>
      </main>
    </div>
  )
}
