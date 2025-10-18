"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import SimpleLoader from "./simple-loader"

interface Web3LoadingProps {
  onComplete?: () => void
}

export default function Web3Loading({ onComplete }: Web3LoadingProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 800)
          return 100
        }
        return prev + 1.5
      })
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(dotsInterval)
  }, [])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isDark ? 'bg-[#0a0b14]' : 'bg-white'
    }`}>
      {/* 主要内容容器 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 简易加载动画 */}
        <div className="flex justify-center items-center mb-8">
          <SimpleLoader size={60} />
        </div>
        
        {/* 进度条 */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
          <div 
            className="h-2 bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Logo和文字 */}
        <div className="mt-12 text-center">
          <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] bg-clip-text text-transparent`}>
            BXB
          </div>
          <div className={`text-lg mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            去中心化交易平台
          </div>
          
          {/* 加载状态文字 */}
          <div className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            正在加载{dots}
          </div>
        </div>
      </div>
    </div>
  )
}
