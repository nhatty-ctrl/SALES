import { Sidebar } from "@/components/sidebar"
import { PlaybooksHeader } from "@/components/playbooks-header"
import { PlaybooksList } from "@/components/playbooks-list"

export default function PlaybooksPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <PlaybooksHeader />
          <div className="flex-1 overflow-y-auto p-6">
            <PlaybooksList />
          </div>
        </div>
      </main>
    </div>
  )
}
