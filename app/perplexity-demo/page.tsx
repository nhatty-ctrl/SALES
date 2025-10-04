import { PerplexityInput } from "@/components/perplexity-input"

export default function PerplexityDemoPage() {
  return (
    <div className="min-h-screen bg-[#1A1C1E] flex flex-col items-center justify-center p-8">
      {/* Logo */}
      <div className="mb-16">
        <h1 className="text-5xl font-light text-white tracking-wide">perplexity</h1>
      </div>

      {/* Input Box */}
      <PerplexityInput
        onSendMessage={(message) => {
          console.log("[v0] Message sent:", message)
        }}
      />

      {/* Optional: Add some example prompts below */}
      <div className="mt-12 flex flex-wrap gap-3 justify-center max-w-3xl">
        {[
          "What's the latest in AI research?",
          "Explain quantum computing",
          "Best practices for React development",
          "How does blockchain work?",
        ].map((prompt) => (
          <button
            key={prompt}
            className="px-4 py-2 rounded-full bg-[#1F2326] border border-[#2F3336] text-gray-400 text-sm hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
