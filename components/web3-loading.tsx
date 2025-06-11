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
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    "初始化区块链连接...",
    "加载智能合约...",
    "验证钱包权限...",
    "同步市场数据...",
    "准备交易界面..."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length)
    }, 1000)

    return () => clearInterval(stepInterval)
  }, [])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isDark ? 'bg-gradient-to-br from-[#0f0f1a] via-[#1a1c2e] to-[#0f0f1a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* 背景粒子效果 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${isDark ? 'bg-custom-green/20' : 'bg-custom-green/30'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo区域 */}
        <div className="mb-8">
          <div className={`relative mx-auto w-24 h-24 rounded-full flex items-center justify-center ${
            isDark ? 'bg-gradient-to-r from-custom-green to-blue-500' : 'bg-gradient-to-r from-custom-green to-blue-600'
          } shadow-2xl animate-spin-slow`}>
            <div className={`w-20 h-20 rounded-full ${
              isDark ? 'bg-[#1a1c2e]' : 'bg-white'
            } flex items-center justify-center`}>
              <div className="text-2xl font-bold bg-gradient-to-r from-custom-green to-blue-500 bg-clip-text text-transparent">
                ₿
              </div>
            </div>
          </div>
        </div>

        {/* 标题 */}
        <h1 className={`text-3xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          BeDAO
        </h1>
        <p className={`text-lg mb-8 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          去中心化交易平台
        </p>

        {/* 进度条 */}
        <div className="mb-6">
          <div className={`w-full h-2 rounded-full ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          } overflow-hidden`}>
            <div 
              className="h-full bg-gradient-to-r from-custom-green to-blue-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
            </div>
          </div>
          <div className={`text-sm mt-2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {progress}%
          </div>
        </div>

        {/* 加载步骤 */}
        <div className={`text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        } animate-pulse`}>
          {loadingSteps[currentStep]}
        </div>

        {/* 装饰性元素 */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-custom-green/30 rounded-full animate-spin-slow" />
        <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-blue-500/30 rounded-full animate-spin-reverse" />
        
        {/* 浮动的加密货币符号 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {['₿', 'Ξ', '◈', '⟐'].map((symbol, i) => (
            <div
              key={i}
              className={`absolute text-2xl ${
                isDark ? 'text-custom-green/20' : 'text-custom-green/30'
              } animate-float`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-custom-green to-transparent opacity-50" />
    </div>
  )
}