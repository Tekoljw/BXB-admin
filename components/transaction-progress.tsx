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
      <div className="relative py-6 px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* 步骤标签 */}
        <div className="flex justify-between items-start mb-8 sm:mb-10 lg:mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center flex-1 mx-2 sm:mx-4 lg:mx-6">
              <div className={`
                px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-center
                max-w-[70px] sm:max-w-[100px] lg:max-w-none whitespace-nowrap overflow-hidden text-ellipsis
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

        {/* 进度条容器 - 扩展间距 */}
        <div className="relative w-full mx-auto" style={{ maxWidth: '90%' }}>
          {/* 背景横线 - 完整宽度 */}
          <div className="absolute w-full h-1 sm:h-1.5 bg-gray-200 top-1/2 transform -translate-y-1/2 rounded-full" />
          
          {/* 进度横线 */}
          <div 
            className="absolute h-1 sm:h-1.5 bg-green-500 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${Math.min(progressPercentage, 100)}%`
            }}
          />

          {/* 步骤圆球容器 - 增加间距 */}
          <div className="flex justify-between items-center relative z-10 px-2 sm:px-4 lg:px-8">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`
                  w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center
                  border-2 sm:border-3 border-white shadow-lg
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
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" strokeWidth={3} />
                )}
                {step.status === 'current' && (
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}