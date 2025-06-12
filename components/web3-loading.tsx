"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

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

  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isDark ? 'bg-[#0a0b14]' : 'bg-white'
    }`}>
      {/* 背景装饰网格 */}
      <div className="absolute inset-0 opacity-10">
        <div className={`w-full h-full ${
          isDark ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,170,0.1)_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,170,0.05)_0%,transparent_50%)]'
        }`} />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={isDark ? "#1f2937" : "#f3f4f6"} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 主要内容容器 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 圆形进度条 */}
        <div className="relative">
          {/* 外层装饰圆环 */}
          <div className={`absolute inset-0 w-32 h-32 rounded-full border-2 ${
            isDark ? 'border-gray-800' : 'border-gray-100'
          } animate-spin-slow`} style={{ animationDuration: '8s' }} />
          
          {/* 中层装饰圆环 */}
          <div className={`absolute inset-2 w-28 h-28 rounded-full border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          } animate-spin-slow`} style={{ animationDuration: '6s', animationDirection: 'reverse' }} />

          {/* 主进度圆环 */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* 背景圆环 */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isDark ? "#1f2937" : "#f3f4f6"}
                strokeWidth="3"
              />
              {/* 进度圆环 */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4AA" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>

            {/* 中心内容 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {Math.round(progress)}%
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] rounded-full animate-pulse" />
            </div>
          </div>

          {/* 发光效果 */}
          <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-[#00D4AA]/20 to-[#3B82F6]/20 blur-xl animate-pulse" />
        </div>

        {/* Logo和文字 */}
        <div className="mt-12 text-center">
          <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] bg-clip-text text-transparent`}>
            BeDAO
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

        {/* 底部装饰点 */}
        <div className="flex space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] animate-pulse`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>

        {/* 浮动粒子效果 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-[#00D4AA]/30' : 'bg-[#00D4AA]/40'
              } animate-ping`}
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}