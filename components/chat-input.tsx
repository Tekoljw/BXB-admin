"use client"

import { useState } from "react"
import { Smile, Paperclip, Scissors, MessageCircle, Phone, Video, Send } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface ChatInputProps {
  onSendMessage?: (message: string) => void
  placeholder?: string
}

export default function ChatInput({ onSendMessage, placeholder = "123123" }: ChatInputProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={`border-t ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}>
      <div className="flex items-center p-4 space-x-3">
        {/* 左侧功能按钮 */}
        <div className="flex items-center space-x-3">
          <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
          }`}>
            <Smile className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
          }`}>
            <Paperclip className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
          }`}>
            <Scissors className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
          }`}>
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* 输入框 */}
        <div className="flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border-none outline-none bg-transparent text-base ${
              isDark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
            }`}
          />
        </div>

        {/* 右侧功能按钮 */}
        <div className="flex items-center space-x-3">
          <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
          }`}>
            <Phone className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
          }`}>
            <Video className="w-5 h-5" />
          </button>
          
          {/* 发送按钮 */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              message.trim()
                ? "bg-custom-green text-white hover:bg-custom-green/90"
                : isDark
                  ? "bg-[#3a3d4a] text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            发送(S)
          </button>
        </div>
      </div>
    </div>
  )
}