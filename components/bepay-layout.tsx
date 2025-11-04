"use client"

import React from "react"

interface BePayLayoutProps {
  children: React.ReactNode
}

export default function BePayLayout({ children }: BePayLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
