"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ChatContextType {
  showMobileChat: boolean
  setShowMobileChat: (show: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [showMobileChat, setShowMobileChat] = useState(false)

  return (
    <ChatContext.Provider value={{
      showMobileChat,
      setShowMobileChat
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}