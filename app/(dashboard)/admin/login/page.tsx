"use client"

import React, { useState } from "react"
import { Shield, Lock, User, Eye, EyeOff, AlertCircle, Mail } from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const { login } = useAdmin()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = async () => {
    if (!username) {
      setError("请先输入管理员账号")
      return
    }

    setIsSendingCode(true)
    setError("")

    setTimeout(() => {
      setCodeSent(true)
      setIsSendingCode(false)
      setCountdown(60)
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password || !verificationCode) {
      setError("请填写所有必填项")
      return
    }

    if (verificationCode.length !== 6) {
      setError("验证码应为6位数字")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      if (username === "123123" && password === "123123" && verificationCode === "123123") {
        localStorage.setItem("adminEmail", username)
        
        // 显示登录成功提示
        toast.success("登录成功", {
          description: "欢迎回到 BeDAO 管理后台",
          duration: 2000,
        })
        
        // 模拟从API获取的用户数据（实际应该从登录API响应中获取）
        const userData = {
          name: "管理员",
          email: "admin@bedao.com",
          role: "超级管理员",
          avatar: ""
        }
        
        // 调用 context 的 login 方法，传入用户数据，并在回调中触发导航
        // 确保 context 状态更新后再导航，避免认证检查失败
        login(userData, () => {
          window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { 
              path: "/admin/profile"
            } 
          }))
        })
      } else {
        setError("账号、密码或验证码错误")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-custom-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* 登录卡片 */}
      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          {/* Logo和标题 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img 
                src="/bxb-logo.png" 
                alt="BXB Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">管理后台</h1>
            <p className="text-gray-400 text-sm">请登录以访问管理系统</p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* 登录表单 */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* 账号输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                管理员账号
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-custom-green focus:ring-1 focus:ring-custom-green transition-all"
                  placeholder="请输入管理员账号"
                  required
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-custom-green focus:ring-1 focus:ring-custom-green transition-all"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(!showPassword)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors z-10 p-1 rounded hover:bg-gray-700/50"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 验证码输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                验证码
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-custom-green focus:ring-1 focus:ring-custom-green transition-all"
                  placeholder="请输入6位验证码"
                  maxLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isSendingCode || countdown > 0}
                  className="px-4 py-3 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                >
                  {isSendingCode ? "发送中..." : countdown > 0 ? `${countdown}秒` : codeSent ? "重新发送" : "发送验证码"}
                </button>
              </div>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-custom-green to-custom-green/90 text-white font-semibold rounded-lg hover:from-custom-green/90 hover:to-custom-green/80 focus:outline-none focus:ring-2 focus:ring-custom-green focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-custom-green/20"
            >
              {isLoading ? "登录中..." : "登录"}
            </button>
          </form>

          {/* 提示信息 */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm text-center">
              演示账号：123123 / 123123 / 验证码：123123
            </p>
          </div>
        </div>

        {/* 底部版权 */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 BXB. All rights reserved.
        </p>
      </div>
    </div>
  )
}
