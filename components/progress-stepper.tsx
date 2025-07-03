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
    <div className={`w-full ${className}`}>
      {/* 步骤标签和圆点容器 */}
      <div className="relative">
        {/* 步骤标签 */}
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* 气泡标签 */}
              <div className={`
                px-3 py-2 rounded-lg text-sm font-medium relative whitespace-nowrap mb-3
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
                w-5 h-5 rounded-full border-3 border-white dark:border-gray-800 
                relative z-10 shadow-md flex items-center justify-center
                ${step.status === 'completed' 
                  ? 'bg-[#00D4AA]' 
                  : step.status === 'current'
                  ? 'bg-yellow-400'
                  : 'bg-gray-300'
                }
              `}>
                {step.status === 'completed' && (
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* 进度线容器 */}
        <div className="absolute bottom-[10px] left-[10px] right-[10px] h-2">
          {/* 背景线 */}
          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
          {/* 进度线 */}
          <div 
            className="absolute left-0 top-0 h-full bg-[#00D4AA] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}