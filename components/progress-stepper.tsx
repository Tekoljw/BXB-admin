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
  
  // 计算进度：已完成步骤数 / (总步骤数-1) * 100
  const progressPercentage = currentStepIndex === -1 
    ? (completedSteps / (steps.length - 1)) * 100
    : ((completedSteps + 0.5) / (steps.length - 1)) * 100

  return (
    <div className={`w-full max-w-4xl min-w-[360px] mx-auto overflow-x-auto ${className}`}>
      <div className="relative py-8">
        <div className="flex justify-between items-center relative px-4 sm:px-8 md:px-12">
          {/* 背景横线 - 精确从第一个圆球中心到最后一个圆球中心 */}
          <div 
            className="absolute top-1/2 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"
            style={{
              left: `calc(${(100 / (steps.length - 1)) * 0}% + 10px)`,
              right: `calc(${(100 / (steps.length - 1)) * 0}% + 10px)`
            }}
          ></div>
          
          {/* 进度横线 - 从第一个圆球中心按进度延伸 */}
          <div 
            className="absolute top-1/2 h-0.5 bg-[#00D4AA] transform -translate-y-1/2 z-0 transition-all duration-500 ease-out"
            style={{ 
              left: `calc(${(100 / (steps.length - 1)) * 0}% + 10px)`,
              width: `calc((100% - 20px) * ${progressPercentage / 100})`
            }}
          ></div>

          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
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