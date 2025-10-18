"use client"

import React from "react"
import { LucideIcon } from "lucide-react"

export interface TabNavItem {
  path: string
  icon: LucideIcon
  label: string
}

interface HorizontalTabNavProps {
  items: TabNavItem[]
  currentPath: string
  onNavigate: (path: string) => void
}

export default function HorizontalTabNav({
  items,
  currentPath,
  onNavigate,
}: HorizontalTabNavProps) {
  const isActive = (path: string) => currentPath === path

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div 
        className="flex items-center space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 pb-2"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                active
                  ? "bg-custom-green text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
