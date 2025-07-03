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
      <div className="relative py-6 px-4">
        {/* 步骤标签 - 气泡形式 */}
        <div className="flex justify-between items-start mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center flex-1">
              <div className={`
                relative px-3 py-2 rounded-lg text-sm font-medium text-center
                whitespace-nowrap shadow-sm
                ${step.status === 'completed' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : step.status === 'current'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : step.status === 'dispute'
                  ? 'bg-red-100 text-red-800 border border-red-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
                }
              `}>
                {step.label}
                {/* 气泡尖角 */}
                <div className={`
                  absolute top-full left-1/2 transform -translate-x-1/2 
                  w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent
                  ${step.status === 'completed' 
                    ? 'border-t-green-200' 
                    : step.status === 'current'
                    ? 'border-t-yellow-200'
                    : step.status === 'dispute'
                    ? 'border-t-red-200'
                    : 'border-t-gray-200'
                  }
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* 进度条容器 */}
        <div className="relative w-full">
          {/* 背景横线 */}
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
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center
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
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                  {step.status === 'current' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>

                {/* 圆球下方小字说明 */}
                <div className="mt-2 text-xs text-gray-500 text-center whitespace-nowrap">
                  {step.label === '发起交易' && '发起时间：00/00/0000'}
                  {step.label === '等待确认' && '自动确认：00：00：00'}
                  {step.label === '争议仲裁' && '无争议则跳过'}
                  {step.label === '等待确认完成交易' && '自动确认：00：00：00'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}