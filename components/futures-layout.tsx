"use client"

import React from "react"

interface FuturesLayoutProps {
  children: React.ReactNode
}

export default function FuturesLayout({ children }: FuturesLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
