"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, ImageIcon, MapPin, Globe, Grid3x3, Paperclip, Mic, AudioWaveform, Send } from "lucide-react"

interface PerplexityMessageBoxProps {
  onSend?: (message: string) => void
  placeholder?: string
}

export function PerplexityMessageBox({
  onSend,
  placeholder = "Ask anything or @mention a Space",
}: PerplexityMessageBoxProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const leftButtons = [
    { icon: Search, label: "Search", primary: true },
    { icon: ImageIcon, label: "Image" },
    { icon: MapPin, label: "Location" },
  ]

  const rightButtons = [
    { icon: Globe, label: "Web" },
    { icon: Grid3x3, label: "Apps" },
    { icon: Paperclip, label: "Attach" },
    { icon: Mic, label: "Voice" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`relative bg-[#1A1D21] rounded-[28px] border transition-all duration-200 ${
          isFocused ? "border-[#20D5D5]/50 shadow-lg shadow-[#20D5D5]/10" : "border-[#2A2D31]"
        }`}
      >
        {/* Input Area */}
        <div className="flex items-start gap-3 p-4">
          {/* Left Buttons */}
          <div className="flex items-center gap-2 pt-2">
            {leftButtons.map((button, index) => {
              const Icon = button.icon
              return (
                <button
                  key={index}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    button.primary
                      ? "bg-[#20D5D5]/10 text-[#20D5D5] hover:bg-[#20D5D5]/20"
                      : "text-[#6B7280] hover:text-white hover:bg-[#2A2D31]"
                  }`}
                  aria-label={button.label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              )
            })}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder:text-[#6B7280] outline-none resize-none min-h-[40px] max-h-[200px] pt-2 font-normal text-[15px] leading-relaxed"
            rows={1}
          />

          {/* Right Buttons */}
          <div className="flex items-center gap-2 pt-2">
            {rightButtons.map((button, index) => {
              const Icon = button.icon
              return (
                <button
                  key={index}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-white hover:bg-[#2A2D31] transition-all"
                  aria-label={button.label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              )
            })}

            {/* Primary Action Button (Audio/Send) */}
            <button
              onClick={message.trim() ? handleSend : () => setIsRecording(!isRecording)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                message.trim()
                  ? "bg-[#20D5D5] text-[#0F1114] hover:bg-[#1BC5C5] shadow-lg shadow-[#20D5D5]/30"
                  : isRecording
                    ? "bg-[#20D5D5] text-[#0F1114] animate-pulse"
                    : "bg-[#20D5D5] text-[#0F1114] hover:bg-[#1BC5C5] shadow-lg shadow-[#20D5D5]/30"
              }`}
              aria-label={message.trim() ? "Send" : "Voice input"}
            >
              {message.trim() ? <Send className="w-4 h-4" /> : <AudioWaveform className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
