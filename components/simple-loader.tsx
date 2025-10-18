"use client"

import React from "react"

interface SimpleLoaderProps {
  size?: number
}

export default function SimpleLoader({ size = 40 }: SimpleLoaderProps) {
  return (
    <div className="flex items-center justify-center">
      <div 
        className="animate-spin rounded-full border-4 border-gray-300 border-t-custom-green dark:border-gray-600 dark:border-t-custom-green"
        style={{ 
          width: `${size}px`, 
          height: `${size}px` 
        }}
      />
    </div>
  )
}
