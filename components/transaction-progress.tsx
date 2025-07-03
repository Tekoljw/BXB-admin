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
      <div className="relative">
        {/* 步骤容器 */}
        <div className="flex justify-between items-center relative">
          {steps.map((step, index) => {
            const isFirst = index === 0
            const isLast = index === steps.length - 1
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                {/* 气泡标签 */}
                <div className={`
                  relative mb-4 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap
                  ${step.status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : step.status === 'current'
                    ? 'bg-yellow-400 text-black'
                    : step.status === 'dispute'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                  }
                `}>
                  {step.label}
                  {/* 气泡指向箭头 */}
                  <div className={`
                    absolute top-full left-1/2 transform -translate-x-1/2
                    w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent
                    ${step.status === 'completed' 
                      ? 'border-t-green-500' 
                      : step.status === 'current'
                      ? 'border-t-yellow-400'
                      : step.status === 'dispute'
                      ? 'border-t-red-500'
                      : 'border-t-gray-300'
                    }
                  `} />
                </div>
                
                {/* 步骤圆球 */}
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center
                  border-2 border-white shadow-lg relative z-20
                  ${step.status === 'completed' 
                    ? 'bg-green-500' 
                    : step.status === 'current'
                    ? 'bg-yellow-400'
                    : step.status === 'dispute'
                    ? 'bg-red-500'
                    : 'bg-gray-300'
                  }
                `}>
                  {step.status === 'completed' && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* 横线容器 - 绝对定位在圆球层之下 */}
        <div className="absolute inset-0 flex items-center" style={{ top: 'calc(100% - 10px)' }}>
          <div className="w-full flex justify-between px-2.5">
            {/* 背景横线 - 从第一个圆球中心到最后一个圆球中心 */}
            <div className="flex-1 h-0.5 bg-gray-200 mx-0" />
            
            {/* 进度横线 - 覆盖在背景线上 */}
            <div 
              className="absolute h-0.5 bg-green-500 transition-all duration-500 ease-out"
              style={{
                left: '10px',
                width: `calc((100% - 20px) * ${Math.min(progressPercentage, 100)}%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}