import { Sidebar } from "@/components/sidebar"
import { AnalyticsHeader } from "@/components/analytics-header"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <AnalyticsHeader />
          <div className="flex-1 overflow-y-auto p-6">
            <AnalyticsDashboard />
          </div>
        </div>
      </main>
    </div>
  )
}
