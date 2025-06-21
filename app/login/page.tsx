"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Eye, 
  EyeOff, 
  Sun, 
  Moon, 
  TrendingUp, 
  Shield,
  Zap,
  DollarSign,
  ArrowLeft
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login success
    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('user', JSON.stringify({ email, username: username || email }))
    
    // Redirect to chat interface after successful login
    router.push('/dashboard/chat')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate registration success and auto-login
    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('user', JSON.stringify({ email, username }))
    
    // Redirect to chat interface after successful registration
    router.push('/dashboard/chat')
  }

  const themeClasses = isDarkMode ? {
    bg: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    text: 'text-white',
    inputBg: 'bg-gray-700',
    inputBorder: 'border-gray-600',
    inputText: 'text-white',
    button: 'bg-[#00D4AA] hover:bg-[#00B894]',
    accent: 'text-[#00D4AA]'
  } : {
    bg: 'bg-gray-100',
    cardBg: 'bg-white',
    text: 'text-gray-900',
    inputBg: 'bg-gray-50',
    inputBorder: 'border-gray-300',
    inputText: 'text-gray-900',
    button: 'bg-[#00D4AA] hover:bg-[#00B894]',
    accent: 'text-[#00D4AA]'
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300`}>
      {/* Header Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
              <Shield className="h-8 w-8 text-[#00D4AA]" />
              <span className="text-2xl font-bold text-white">BeDAO</span>
              <span className="px-2 py-1 text-xs bg-[#00D4AA] text-black rounded-full font-semibold">PRO</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => router.push('/')} 
                className="text-white/80 hover:text-[#00D4AA] transition-colors font-medium"
              >
                首页
              </button>
              <button 
                onClick={() => router.push('/wallet')} 
                className="text-white/80 hover:text-[#00D4AA] transition-colors font-medium"
              >
                钱包
              </button>
              <button 
                onClick={() => router.push('/market')} 
                className="text-white/80 hover:text-[#00D4AA] transition-colors font-medium"
              >
                行情
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen pt-16">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#00D4AA] rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-500 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">UBX加密货币交易</h1>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <span className="text-gray-300">立即注册并享有UBX理财产品，享受高达</span>
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">68.60%</span>
              <span className="text-gray-300">的年化收益!</span>
            </div>
          </div>

          {/* 3D Trading Platform Mockup */}
          <div className="relative w-96 h-64">
            {/* Trading Platform Base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-32 bg-gradient-to-t from-[#00D4AA] to-emerald-400 rounded-2xl shadow-2xl">
              <div className="absolute inset-2 bg-gray-900/20 rounded-xl border border-[#00D4AA]/50"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-2xl font-bold text-black">UBX</div>
                <div className="flex space-x-1 justify-center mt-1">
                  <div className="w-2 h-2 bg-gray-900/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-900/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-900/40 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Trading Chart Screen */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-40 bg-gray-800 rounded-lg border-2 border-[#00D4AA]/50 shadow-xl">
              <div className="p-4 h-full">
                {/* Chart bars */}
                <div className="flex items-end justify-between h-full space-x-1">
                  <div className="w-3 bg-red-500 h-1/4 rounded-t"></div>
                  <div className="w-3 bg-green-500 h-3/4 rounded-t"></div>
                  <div className="w-3 bg-red-500 h-1/2 rounded-t"></div>
                  <div className="w-3 bg-green-500 h-full rounded-t"></div>
                  <div className="w-3 bg-green-500 h-2/3 rounded-t"></div>
                  <div className="w-3 bg-red-500 h-1/3 rounded-t"></div>
                  <div className="w-3 bg-green-500 h-5/6 rounded-t"></div>
                  <div className="w-3 bg-green-500 h-1/2 rounded-t"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-[#00D4AA] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm">T</span>
            </div>
            
            <div className="absolute top-8 right-8 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <DollarSign className="w-5 h-5 text-black" />
            </div>

            <div className="absolute bottom-4 left-8 w-10 h-10 bg-[#00D4AA] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm">T</span>
            </div>

            {/* Trending Arrow */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-[#00D4AA]">
              <TrendingUp className="w-8 h-8" />
            </div>

            {/* Sparkles */}
            <div className="absolute top-12 left-16 text-[#00D4AA]">
              <div className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse"></div>
            </div>
            <div className="absolute bottom-16 right-12 text-yellow-500">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute top-24 right-4 text-blue-400">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeClasses.cardBg} border ${themeClasses.inputBorder} transition-colors`}
            >
              {isDarkMode ? (
                <Sun className={`w-5 h-5 ${themeClasses.text}`} />
              ) : (
                <Moon className={`w-5 h-5 ${themeClasses.text}`} />
              )}
            </button>
          </div>

          {/* Login/Register Card */}
          <div className={`${themeClasses.cardBg} rounded-2xl p-8 shadow-2xl border border-gray-200 ${isDarkMode ? 'border-gray-700' : ''}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="w-8 h-8 text-[#00D4AA]" />
                <span className={`text-2xl font-bold ${themeClasses.text}`}>UBX</span>
                <span className={`${themeClasses.accent} font-bold`}>登录</span>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                  isLogin 
                    ? `${themeClasses.accent} border-b-2 border-[#00D4AA]` 
                    : `${themeClasses.text} opacity-60`
                }`}
              >
                登录
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                  !isLogin 
                    ? `${themeClasses.accent} border-b-2 border-[#00D4AA]` 
                    : `${themeClasses.text} opacity-60`
                }`}
              >
                注册
              </button>
            </div>

            {/* Form */}
            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="请输入用户昵称"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} placeholder-gray-400 focus:outline-none focus:border-[#00D4AA] transition-colors`}
                    required
                  />
                </div>
              )}
              
              <div>
                <input
                  type="email"
                  placeholder="请输入您的邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} placeholder-gray-400 focus:outline-none focus:border-[#00D4AA] transition-colors`}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入您的密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} placeholder-gray-400 focus:outline-none focus:border-[#00D4AA] transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.text} opacity-60 hover:opacity-100 transition-opacity`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className={`text-sm ${themeClasses.accent} hover:underline`}>
                    忘记密码?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className={`w-full ${themeClasses.button} text-white font-bold py-3 rounded-lg transition-colors`}
              >
                {isLogin ? '登录' : '注册'}
              </button>
            </form>

            {isLogin && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setIsLogin(false)}
                  className={`text-sm ${themeClasses.accent} hover:underline`}
                >
                  注册
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}