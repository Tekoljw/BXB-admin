"use client"

import React from "react"

interface PermissionsLayoutProps {
  children: React.ReactNode
}

export default function PermissionsLayout({ children }: PermissionsLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
