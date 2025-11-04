"use client"

import React from "react"

interface FuturesConfigLayoutProps {
  children: React.ReactNode
}

export default function FuturesConfigLayout({ children }: FuturesConfigLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
