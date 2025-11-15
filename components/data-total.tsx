import React from 'react'

interface DataTotalProps {
  total: number
  label?: string
  className?: string
}

export function DataTotal({ total, label = '条数据', className = '' }: DataTotalProps) {
  return (
    <div className={`flex items-center justify-center py-4 px-6 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      共 <span className="font-medium text-gray-900 dark:text-white mx-1">{total}</span> {label}
    </div>
  )
}
