'use client'

import React from 'react'
import { Check } from 'lucide-react'

interface Step {
  id: string
  label: string
  status: 'completed' | 'current' | 'pending' | 'dispute'
}

interface TransactionProgressProps {
  steps: Step[]
  className?: string
}

export default function TransactionProgress({ steps, className = '' }: TransactionProgressProps) {
  // 计算已完成的步骤数量
  const completedCount = steps.filter(step => step.status === 'completed').length
  const currentIndex = steps.findIndex(step => step.status === 'current')
  
  // 计算进度百分比 - 基于已完成的步骤
  const progressPercentage = currentIndex === -1 
    ? (completedCount / (steps.length - 1)) * 100
    : ((completedCount + 0.5) / (steps.length - 1)) * 100

  return (
    <div className={`w-full ${className}`}>
      <div className="relative py-6 px-4 sm:px-6 lg:px-8">
        {/* 步骤标签 */}
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center flex-1">
              <div className={`
                px-1.5 sm:px-2 py-1 rounded text-xs font-medium text-center
                max-w-[80px] sm:max-w-none whitespace-nowrap overflow-hidden text-ellipsis
                ${step.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : step.status === 'current'
                  ? 'bg-yellow-100 text-yellow-800'
                  : step.status === 'dispute'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {step.label}
              </div>
            </div>
          ))}
        </div>

        {/* 进度条容器 - 横跨整个卡片宽度 */}
        <div className="relative w-full">
          {/* 背景横线 - 完整宽度 */}
          <div className="absolute w-full h-1 bg-gray-200 top-1/2 transform -translate-y-1/2" />
          
          {/* 进度横线 */}
          <div 
            className="absolute h-1 bg-green-500 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(progressPercentage, 100)}%`
            }}
          />

          {/* 步骤圆球容器 */}
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`
                  w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center
                  border-2 border-white shadow-md
                  ${step.status === 'completed' 
                    ? 'bg-green-500' 
                    : step.status === 'current'
                    ? 'bg-yellow-400'
                    : step.status === 'dispute'
                    ? 'bg-red-500'
                    : 'bg-gray-400'
                  }
                `}
              >
                {step.status === 'completed' && (
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                )}
                {step.status === 'current' && (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}