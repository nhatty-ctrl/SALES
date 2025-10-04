"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Search, ImageIcon, MapPin, Globe, Grid3x3, Paperclip, Mic, AudioWaveform, Send } from "lucide-react"

interface PerplexityInputProps {
  onSendMessage?: (message: string) => void
  placeholder?: string
  disabled?: boolean
}

export function PerplexityInput({
  onSendMessage,
  placeholder = "Ask anything or @mention a Space",
  disabled = false,
}: PerplexityInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim())
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // Auto-resize textarea
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center gap-3 rounded-full bg-[#1F2326] border border-[#2F3336] px-4 py-3 transition-all duration-300 hover:border-[#3F4346] focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(0,245,255,0.15)]">
        {/* Left side buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
            aria-label="Add image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
            aria-label="Add location"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>

        {/* Input field */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 min-h-[24px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-0 text-base text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 overflow-hidden"
          rows={1}
        />

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
            aria-label="Web search"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
            aria-label="Apps"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
            aria-label="Voice input"
          >
            <Mic className="h-4 w-4" />
          </Button>

          {/* Primary action button - changes based on state */}
          {message.trim() ? (
            <Button
              onClick={handleSend}
              disabled={disabled}
              size="icon"
              className="h-9 w-9 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={toggleRecording}
              size="icon"
              className={`h-9 w-9 rounded-full transition-all duration-200 ${
                isRecording
                  ? "bg-red-500 text-white hover:bg-red-400 animate-pulse"
                  : "bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
              }`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              <AudioWaveform className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
