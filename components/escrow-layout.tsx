"use client"

import React from "react"

interface EscrowLayoutProps {
  children: React.ReactNode
}

export default function EscrowLayout({ children }: EscrowLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
