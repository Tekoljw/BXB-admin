"use client"

import React, { useState, useEffect } from "react"
import { Shield, Lock, User, Eye, EyeOff, AlertCircle, Mail, Smartphone } from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { toast } from "sonner"
import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import { authApis } from "@/router/auth-api"
import { APIError } from "@/utils/api-request-util"
import { encryptPassword, isRSAEncryptAvailable } from "@/utils/rsa-encrypt-util"
import { storageUtils } from "@/utils/storage-util"
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
  const { login, fetchUserInfo } = useAdmin()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  
  const [mfaId, setMfaId] = useState("")
  const [hasBind, setHasBind] = useState(false)
  const [showGoogleAuthStep, setShowGoogleAuthStep] = useState(false)
  const [showBindDialog, setShowBindDialog] = useState(false)
  const [googleSecret, setGoogleSecret] = useState("")
  const [qrcodeUrl, setQrcodeUrl] = useState("")
  const [googleCode, setGoogleCode] = useState("")
  const [isBinding, setIsBinding] = useState(false)

  const handleOpenBindDialog = async () => {
    if (!mfaId) {
      setError("请先完成用户名密码登录")
      return
    }
    
    setIsBinding(true)
    try {
      const response = await authApis.getGoogleValidateQrCode(mfaId)
      setGoogleSecret(response.secret)
      
      const otpauthUrl = authenticator.keyuri(
        username || 'admin@bedao.com',
        'BXB Admin',
        response.secret
      )
      
      const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)
      setQrcodeUrl(qrCodeDataUrl)
      
      setShowBindDialog(true)
    } catch (error) {
      console.error('获取二维码失败:', error)
      const errorMessage = error instanceof Error ? error.message : '请重试'
      toast.error('获取二维码失败', {
        description: errorMessage
      })
    } finally {
      setIsBinding(false)
    }
  }
  const handleBindGoogleAuth = async () => {
    if (!googleCode || googleCode.length !== 6) {
      toast.error('请输入6位验证码')
      return
    }
    
    if (!mfaId) {
      toast.error('登录会话已过期，请重新登录')
      return
    }
    
    setIsBinding(true)
    
    try {
      await authApis.doSetupGoogleValidate(mfaId, googleCode)
      
      toast.success('绑定成功', {
        description: '谷歌验证码已成功绑定'
      })
      
      setShowBindDialog(false)
      setGoogleCode("")
      setHasBind(true)
      
      await handleGoogleValidate(googleCode)
    } catch (error) {
      console.error('绑定失败:', error)
      const errorMessage = error instanceof APIError ? error.message : '请检查验证码是否正确'
      toast.error('绑定失败', {
        description: errorMessage
      })
    } finally {
      setIsBinding(false)
    }
  }
  
  // 验证谷歌验证码并完成登录
  const handleGoogleValidate = async (code?: string) => {
    const codeToValidate = code || verificationCode
    
    if (!codeToValidate || codeToValidate.length !== 6) {
      setError("验证码应为6位数字")
      return
    }
    
    if (!mfaId) {
      setError("登录会话已过期，请重新登录")
      return
    }
    
    setIsLoading(true)
    setError("")
    
    try {
      const tokenResponse = await authApis.googleValidate(mfaId, codeToValidate)
      
      storageUtils.disk.set('accessToken', tokenResponse.accessToken)
      storageUtils.disk.set('refreshToken', tokenResponse.refreshToken)
      localStorage.setItem('refreshToken', tokenResponse.refreshToken)
      localStorage.setItem('lastActivity', String(Date.now()))
      localStorage.setItem("adminEmail", username)
      
      toast.success("登录成功", {
        description: "欢迎回到 BXB 管理后台",
        duration: 2000,
      })
      
      await fetchUserInfo()
      
      window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { 
          path: "/admin/profile"
        } 
      }))
    } catch (error) {
      console.error('验证失败:', error)
      const errorMessage = error instanceof APIError ? error.message : "验证码错误，请重试"
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  const handleSendCode = async () => {
    toast.info("请使用Google Authenticator应用生成验证码")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("请填写用户名和密码")
      return
    }

    setIsLoading(true)

    try {
      if (!isRSAEncryptAvailable()) {
        throw new Error('RSA加密功能不可用，请确保已安装jsencrypt包')
      }

      const publicKey = await authApis.getPublicKey()
      const encryptedPassword = encryptPassword(publicKey, password)
      const loginResponse = await authApis.login(username, encryptedPassword)
      
      setMfaId(loginResponse.mfaId)
      setHasBind(loginResponse.hasBind)
      
      if (loginResponse.hasBind) {
        setShowGoogleAuthStep(true)
        setIsLoading(false)
        toast.info("请输入Google Authenticator验证码")
      } else {
        setIsLoading(false)
        await handleOpenBindDialog()
      }
    } catch (error) {
      console.error('登录失败:', error)
      const errorMessage = error instanceof APIError ? error.message : "登录失败，请检查用户名和密码"
      toast.error('登录失败', {
        description: errorMessage
      })
      setError("")
      setIsLoading(false)
      setShowGoogleAuthStep(false)
    }
  }
  const handleSubmitGoogleCode = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleGoogleValidate()
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

            {/* 谷歌验证码输入（仅在已绑定且需要验证时显示） */}
            {showGoogleAuthStep && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Google Authenticator 验证码
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
                <p className="mt-2 text-xs text-gray-400">
                  请打开Google Authenticator应用，输入6位验证码
                </p>
              </div>
            )}

            {/* 登录按钮 */}
            {!showGoogleAuthStep ? (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-custom-green to-custom-green/90 text-white font-semibold rounded-lg hover:from-custom-green/90 hover:to-custom-green/80 focus:outline-none focus:ring-2 focus:ring-custom-green focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-custom-green/20"
              >
                {isLoading ? "登录中..." : "登录"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitGoogleCode}
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full py-3 bg-gradient-to-r from-custom-green to-custom-green/90 text-white font-semibold rounded-lg hover:from-custom-green/90 hover:to-custom-green/80 focus:outline-none focus:ring-2 focus:ring-custom-green focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-custom-green/20"
              >
                {isLoading ? "验证中..." : "验证并登录"}
              </button>
            )}
          </form>

          {/* 绑定谷歌验证码按钮（仅在未绑定时显示） */}
          {!hasBind && !showGoogleAuthStep && (
            <div className="mt-6">
              <p className="text-center text-sm text-gray-400 mb-2">
                首次登录需要绑定Google Authenticator
              </p>
            </div>
          )}
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
