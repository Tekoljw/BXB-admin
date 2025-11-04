"use client"

import React from "react"

interface SpotLayoutProps {
  children: React.ReactNode
}

export default function SpotLayout({ children }: SpotLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
