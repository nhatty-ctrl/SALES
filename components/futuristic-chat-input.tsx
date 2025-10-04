"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Mic, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface FuturisticChatInputProps {
  onSendMessage?: (content: string, file?: File) => void
  disabled?: boolean
}

export function FuturisticChatInput({ onSendMessage, disabled = false }: FuturisticChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim())
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onSendMessage?.(`Uploaded file: ${file.name}`, file)
    }
  }

  return (
    <div className="w-full flex items-end gap-2">
      <div className="flex-1 relative rounded-3xl border border-input bg-background transition-colors focus-within:border-primary">
        <div className="flex items-end gap-2 p-3">
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} disabled={disabled} />
          <Button
            variant="ghost"
            size="icon"
            disabled={disabled}
            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Message..."
            className="min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-2 text-[15px] placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            rows={1}
          />

          <Button
            variant="ghost"
            size="icon"
            disabled={disabled}
            className={`h-9 w-9 shrink-0 ${isRecording ? "text-destructive" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            disabled={!message.trim() || disabled}
            className="h-9 w-9 shrink-0 rounded-full"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
