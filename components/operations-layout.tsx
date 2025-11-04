"use client"

import React from "react"

interface OperationsLayoutProps {
  children: React.ReactNode
}

export default function OperationsLayout({ children }: OperationsLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
