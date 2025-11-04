"use client"

import React from "react"

interface IMLayoutProps {
  children: React.ReactNode
}

export default function IMLayout({ children }: IMLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
