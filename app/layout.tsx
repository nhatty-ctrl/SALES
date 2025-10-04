import type React from "react"
import { Inter_Tight, Geist_Mono } from "next/font/google"
import "./globals.css"

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "AI Sales Assistant",
  description: "ChatGPT-like AI sales assistant for lead generation and outreach",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${interTight.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
