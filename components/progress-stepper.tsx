'use client'

import React from 'react'
import { Check } from 'lucide-react'

interface StepperStep {
  id: string
  label: string
  status: 'completed' | 'current' | 'pending'
}

interface ProgressStepperProps {
  steps: StepperStep[]
  className?: string
}

export default function ProgressStepper({ steps, className = '' }: ProgressStepperProps) {
  const currentStepIndex = steps.findIndex(step => step.status === 'current')
  const completedSteps = steps.filter(step => step.status === 'completed').length
  const progressPercentage = currentStepIndex === -1 
    ? (completedSteps / steps.length) * 100 
    : ((completedSteps + 0.5) / steps.length) * 100

  return (
    <div className={`w-full max-w-4xl min-w-[360px] mx-auto overflow-x-auto ${className}`}>
      <div className="relative py-8">
        {/* 步骤标签和圆点容器 */}
        <div className="flex justify-between items-center relative px-4 sm:px-8 md:px-12">
          {/* 背景横线 - 从第一个圆点到最后一个圆点 */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
          
          {/* 进度横线 - 根据完成状态显示 */}
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-[#00D4AA] transform -translate-y-1/2 z-0 transition-all duration-500 ease-out"
            style={{ 
              width: `${progressPercentage}%`
            }}
          ></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* 气泡标签 */}
              <div className={`
                px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium relative whitespace-nowrap mb-3 sm:mb-4
                ${step.status === 'completed' 
                  ? 'bg-[#00D4AA] text-white' 
                  : step.status === 'current'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-300 text-gray-600'
                }
              `}>
                {step.label}
                {/* 气泡尖角 */}
                <div className={`
                  absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                  border-l-[6px] border-r-[6px] border-t-[6px] border-transparent
                  ${step.status === 'completed' 
                    ? 'border-t-[#00D4AA]' 
                    : step.status === 'current'
                    ? 'border-t-yellow-400'
                    : 'border-t-gray-300'
                  }
                `}></div>
              </div>
              
              {/* 步骤圆点 */}
              <div className={`
                w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-3 border-white dark:border-gray-800 
                relative z-10 shadow-md flex items-center justify-center
                ${step.status === 'completed' 
                  ? 'bg-[#00D4AA]' 
                  : step.status === 'current'
                  ? 'bg-yellow-400'
                  : 'bg-gray-300'
                }
              `}>
                {step.status === 'completed' && (
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}