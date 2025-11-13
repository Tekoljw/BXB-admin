"use client"

import React, { useState, useEffect } from "react"
import { Shield, Lock, User, Eye, EyeOff, AlertCircle, Mail, Smartphone } from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { toast } from "sonner"
import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  
  // 谷歌验证码绑定相关状态
  const [showBindDialog, setShowBindDialog] = useState(false)
  const [googleSecret, setGoogleSecret] = useState("")
  const [qrcodeUrl, setQrcodeUrl] = useState("")
  const [googleCode, setGoogleCode] = useState("")
  const [isBinding, setIsBinding] = useState(false)

  // 生成谷歌验证码二维码
  const generateGoogleAuthQR = async () => {
    const secret = authenticator.generateSecret()
    setGoogleSecret(secret)
    
    // 生成TOTP URI
    const otpauthUrl = authenticator.keyuri(
      username || 'admin@bedao.com',
      'BeDAO Admin',
      secret
    )
    
    // 生成二维码
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)
      setQrcodeUrl(qrCodeDataUrl)
    } catch (err) {
      console.error('生成二维码失败', err)
      toast.error('生成二维码失败')
    }
  }
  
  // 打开绑定弹窗
  const handleOpenBindDialog = () => {
    if (!username) {
      setError("请先输入管理员账号")
      return
    }
    setShowBindDialog(true)
    generateGoogleAuthQR()
  }
  
  // 验证并绑定谷歌验证码
  const handleBindGoogleAuth = () => {
    if (!googleCode || googleCode.length !== 6) {
      toast.error('请输入6位验证码')
      return
    }
    
    setIsBinding(true)
    
    // 验证谷歌验证码
    const isValid = authenticator.verify({
      token: googleCode,
      secret: googleSecret
    })
    
    setTimeout(() => {
      if (isValid) {
        // 保存到localStorage（实际应该保存到后端数据库）
        localStorage.setItem(`google_secret_${username}`, googleSecret)
        toast.success('绑定成功', {
          description: '谷歌验证码已成功绑定'
        })
        setShowBindDialog(false)
        setGoogleCode("")
      } else {
        toast.error('验证码错误', {
          description: '请检查验证码是否正确'
        })
      }
      setIsBinding(false)
    }, 800)
  }

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
                <div className="relative flex-1">
                  {/* Google Logo SVG */}
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-custom-green focus:ring-1 focus:ring-custom-green transition-all"
                    placeholder="请输入6位验证码"
                    maxLength={6}
                    required
                  />
                </div>
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

          {/* 绑定谷歌验证码按钮 */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleOpenBindDialog}
              className="w-full py-3 bg-gray-700/50 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5" />
              绑定谷歌验证码
            </button>
          </div>

          {/* 提示信息 */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm text-center">
              演示账号：123123 / 123123 / 验证码：123123
            </p>
          </div>
        </div>
        
        {/* 绑定谷歌验证码弹窗 */}
        <Dialog open={showBindDialog} onOpenChange={setShowBindDialog}>
          <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Smartphone className="w-6 h-6 text-custom-green" />
                绑定谷歌验证码
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                请使用Google Authenticator或其他TOTP应用扫描二维码
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* 二维码显示 */}
              <div className="flex flex-col items-center gap-4">
                {qrcodeUrl && (
                  <div className="bg-white p-4 rounded-lg">
                    <img src={qrcodeUrl} alt="Google Auth QR Code" className="w-48 h-48" />
                  </div>
                )}
                
                {/* 密钥显示 */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    手动输入密钥（备用）
                  </label>
                  <div className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <code className="text-sm text-custom-green break-all font-mono">
                      {googleSecret}
                    </code>
                  </div>
                </div>
              </div>
              
              {/* 验证码输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  请输入6位验证码
                </label>
                <div className="relative">
                  {/* Google Logo SVG */}
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <Input
                    type="text"
                    value={googleCode}
                    onChange={(e) => setGoogleCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="输入验证码"
                    maxLength={6}
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-custom-green focus:ring-custom-green"
                  />
                </div>
              </div>
              
              {/* 说明 */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-400 text-xs leading-relaxed">
                  1. 打开Google Authenticator应用<br/>
                  2. 扫描上方二维码或手动输入密钥<br/>
                  3. 输入应用中显示的6位验证码完成绑定
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBindDialog(false)}
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
              >
                取消
              </Button>
              <Button
                type="button"
                onClick={handleBindGoogleAuth}
                disabled={isBinding || googleCode.length !== 6}
                className="bg-custom-green text-white hover:bg-custom-green/90 disabled:opacity-50"
              >
                {isBinding ? "验证中..." : "确认绑定"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 底部版权 */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 BXB. All rights reserved.
        </p>
      </div>
    </div>
  )
}
