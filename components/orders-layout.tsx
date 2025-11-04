"use client"

import React from "react"

interface OrdersLayoutProps {
  children: React.ReactNode
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
