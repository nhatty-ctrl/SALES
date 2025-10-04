"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function UpgradeModal() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 w-[360px] bg-[#1A1D21] border border-[#2A2D31] rounded-2xl p-6 shadow-2xl z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 w-6 h-6 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-white hover:bg-[#2A2D31] transition-all"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-white font-semibold text-lg">Upgrade to Pro</h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">
          Enjoy access to our agentic browser Comet, select from top models for every query, and access advanced tools
          like Research and Labs.
        </p>

        {/* Upgrade Button */}
        <button className="w-full bg-[#20D5D5] hover:bg-[#1BC5C5] text-[#0F1114] font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-[#20D5D5]/20 hover:shadow-[#20D5D5]/30">
          Upgrade
        </button>
      </div>
    </div>
  )
}
