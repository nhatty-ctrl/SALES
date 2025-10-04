"use client"

import { useState } from "react"
import { Home, Globe, Grid3x3, Bell, User, ArrowUpRight, Download, Plus } from "lucide-react"
import Link from "next/link"

export function PerplexitySidebar() {
  const [activeItem, setActiveItem] = useState("home")

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "discover", label: "Discover", icon: Globe, href: "/discover" },
    { id: "spaces", label: "Spaces", icon: Grid3x3, href: "/spaces" },
  ]

  const bottomItems = [
    { id: "notifications", label: "Notifications", icon: Bell, href: "/notifications" },
    { id: "account", label: "Account", icon: User, href: "/account" },
    { id: "upgrade", label: "Upgrade", icon: ArrowUpRight, href: "/upgrade", badge: true },
    { id: "install", label: "Install", icon: Download, href: "/install" },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] bg-[#0F1114] border-r border-[#2A2D31] flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <Link href="/" className="mb-8 p-2 hover:bg-[#1A1D21] rounded-lg transition-colors">
        <div className="w-8 h-8 relative">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>

      {/* New Chat Button */}
      <button className="mb-8 w-10 h-10 rounded-lg border border-[#2A2D31] hover:border-[#20D5D5] hover:bg-[#20D5D5]/10 transition-all flex items-center justify-center group">
        <Plus className="w-5 h-5 text-[#6B7280] group-hover:text-[#20D5D5]" />
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg transition-all ${
                isActive ? "bg-[#1A1D21] text-[#20D5D5]" : "text-[#6B7280] hover:text-white hover:bg-[#1A1D21]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-2 w-full px-2 mt-auto">
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center gap-1 py-3 px-2 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#1A1D21] transition-all"
            >
              {item.badge && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />}
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
