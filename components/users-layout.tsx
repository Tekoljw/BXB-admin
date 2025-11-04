"use client"

import React from "react"

interface UsersLayoutProps {
  children: React.ReactNode
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
