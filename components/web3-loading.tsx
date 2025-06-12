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
        {/* 创意加载动画 */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <div className="relative w-20 h-20">
            <style jsx>{`
              .web3-creative-loader:before {
                content: '';
                width: 8px;
                height: 8px;
                border-radius: 50%;
                position: absolute;
                display: block;
                background: #00D4AA;
                top: 67px;
                left: 34px;
                transform: translate(-18px, -18px);
                animation: dotCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
              }
              
              .web3-creative-loader svg {
                display: block;
                width: 100%;
                height: 100%;
              }
              
              .web3-creative-loader svg circle {
                fill: none;
                stroke: #00D4AA;
                stroke-width: 10px;
                stroke-linejoin: round;
                stroke-linecap: round;
                stroke-dasharray: 150 50 150 50;
                stroke-dashoffset: 75;
                animation: pathCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
              }
              
              @keyframes pathCircle {
                25% { stroke-dashoffset: 125; }
                50% { stroke-dashoffset: 175; }
                75% { stroke-dashoffset: 225; }
                100% { stroke-dashoffset: 275; }
              }
              
              @keyframes dotCircle {
                25% { transform: translate(0, 0); }
                50% { transform: translate(18px, -18px); }
                75% { transform: translate(0, -36px); }
                100% { transform: translate(-18px, -18px); }
              }
            `}</style>
            <div className="web3-creative-loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" />
              </svg>
            </div>
          </div>
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