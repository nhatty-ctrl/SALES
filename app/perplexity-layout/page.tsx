import { PerplexitySidebar } from "@/components/perplexity-sidebar"
import { PerplexityMessageBox } from "@/components/perplexity-message-box"
import { UpgradeModal } from "@/components/upgrade-modal"

export default function PerplexityLayoutPage() {
  return (
    <div className="min-h-screen bg-[#1A1D21] relative">
      {/* Sidebar */}
      <PerplexitySidebar />

      {/* Main Content */}
      <main className="ml-[72px] min-h-screen flex flex-col items-center justify-center p-8">
        {/* Logo */}
        <div className="mb-16">
          <h1 className="text-white text-5xl font-light tracking-tight lowercase">perplexity</h1>
        </div>

        {/* Message Box */}
        <PerplexityMessageBox
          onSend={(message) => {
            console.log("[v0] Message sent:", message)
          }}
        />

        {/* Helper Text */}
        <p className="mt-6 text-[#6B7280] text-sm text-center max-w-2xl">
          Pro Search uses advanced AI to provide comprehensive answers with sources
        </p>
      </main>

      {/* Upgrade Modal */}
      <UpgradeModal />
    </div>
  )
}
