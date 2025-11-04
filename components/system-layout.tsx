"use client"

import React from "react"

interface SystemLayoutProps {
  children: React.ReactNode
}

export default function SystemLayout({ children }: SystemLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
