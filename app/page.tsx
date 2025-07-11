"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"


export default function HomePage() {
  const { language, setLanguage } = useTheme()
  const router = useRouter()
  const [navOpen, setNavOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-gray-900"></div>
  }

  const handleLogin = () => {
    router.push("/wallet")
  }

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const changeLang = (lang: string) => {
    setLanguage(lang as "en" | "zh")
  }

  return (
    <div className="wrapper min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="navbar fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <img src="/bedao-logo.png" alt="BeDAO" className="h-8" />
            </Link>

            <button 
              onClick={toggleNav}
              className="md:hidden p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </div>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-white hover:text-[#14C2A3] transition-colors">
                {language === 'zh' ? '钱包' : 'Wallet'}
              </Link>
              <Link href="#" className="text-[#14C2A3] font-medium">
                SDK&API
              </Link>
              <Link href="#" className="text-white hover:text-[#14C2A3] transition-colors">
                {language === 'zh' ? '卡片' : 'Card'}
              </Link>
              <Link href="#" className="text-white hover:text-[#14C2A3] transition-colors">
                {language === 'zh' ? '代币经济' : 'Tokenomic'}
              </Link>
              <Link href="#" className="text-white hover:text-[#14C2A3] transition-colors">
                {language === 'zh' ? '新闻' : 'News'}
              </Link>
              
              <div className="relative group">
                <button className="text-white hover:text-[#14C2A3] transition-colors flex items-center">
                  {language === 'zh' ? '文档' : 'Documents'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="#" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
                    {language === 'zh' ? '白皮书' : 'White Paper'}
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
                    {language === 'zh' ? '开发文档' : 'Development DOCS'}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center">
                  <span className="w-6 h-6 bg-[#14C2A3] rounded-full flex items-center justify-center text-xs text-white">
                    {language === 'zh' ? 'CN' : 'US'}
                  </span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={() => changeLang('en')}
                    className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs mr-2">US</span>
                    English
                  </button>
                  <button 
                    onClick={() => changeLang('zh')}
                    className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs mr-2">CN</span>
                    简体中文
                  </button>
                </div>
              </div>

              <button 
                onClick={handleLogin}
                className="bg-[#14C2A3] text-white px-6 py-2 rounded-full hover:bg-[#10a085] transition-colors font-medium"
              >
                {language === 'zh' ? '登录' : 'Login'}
              </button>
            </div>
          </div>

          {navOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 shadow-lg">
              <div className="flex flex-col space-y-2 p-4">
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">{language === 'zh' ? '钱包' : 'Wallet'}</Link>
                <Link href="#" className="text-[#14C2A3] py-2">SDK&API</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">{language === 'zh' ? '卡片' : 'Card'}</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">{language === 'zh' ? '代币经济' : 'Tokenomic'}</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">{language === 'zh' ? '新闻' : 'News'}</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">{language === 'zh' ? '文档' : 'Documents'}</Link>
                <button 
                  onClick={handleLogin}
                  className="bg-[#14C2A3] text-white px-6 py-2 rounded-full hover:bg-[#10a085] transition-colors font-medium mt-4"
                >
                  {language === 'zh' ? '登录' : 'Login'}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {/* Hero Section - 封面页 */}
        <section className="hero-section relative overflow-hidden py-20 lg:py-32">
          {/* 科技感背景 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
            
            {/* 渐变光效 */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#14C2A3]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#14C2A3]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* 浮动粒子 */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-[#14C2A3] rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-[#14C2A3] rounded-full animate-bounce opacity-50" style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute top-1/2 right-20 w-2 h-2 bg-[#14C2A3] rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-center">
              <div className="max-w-4xl text-center">
                <div className="relative z-10">
                  <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
                    <span className="block mb-4">
                      {language === 'zh' ? '革新加密经济生态' : 'Revolutionizing Crypto Economic Ecosystem'}
                    </span>
                    <span className="text-transparent bg-gradient-to-r from-[#14C2A3] to-purple-500 bg-clip-text animate-glow">
                      {language === 'zh' ? '全球首个「社交+担保+AI」一体化数字资产平台' : 'The World\'s First Integrated "Social + Guarantee + AI" Digital Asset Platform'}
                    </span>
                  </h1>
                </div>

                {/* 核心功能图标 */}
                <div className="flex justify-center space-x-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#14C2A3]/20 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">{language === 'zh' ? '社交' : 'Social'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#14C2A3]/20 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">USDT</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#14C2A3]/20 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">{language === 'zh' ? '担保' : 'Guarantee'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">AI</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <button 
                    onClick={handleLogin}
                    className="bg-[#14C2A3] text-white px-8 py-3 rounded-lg hover:bg-[#10a085] transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#14C2A3]/25"
                  >
                    {language === 'zh' ? '立即体验' : 'Try Now'}
                  </button>
                  <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                    {language === 'zh' ? '白皮书' : 'White Paper'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* P1 市场痛点 */}
        <section className="py-20 lg:py-32 bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '为什么需要我们的平台？' : 'Why do we need our platform?'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-red-500/20">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  🔴 {language === 'zh' ? '信任缺失' : 'Trust Deficit'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '加密货币交易欺诈频发，缺乏安全支付场景' : 'Cryptocurrency trading fraud is frequent, lacking secure payment scenarios'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-red-500/20">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  🔴 {language === 'zh' ? '门槛过高' : 'High Barriers'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '普通用户难以参与量化交易和合约市场' : 'Ordinary users find it difficult to participate in quantitative trading and contract markets'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-red-500/20">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  🔴 {language === 'zh' ? '功能割裂' : 'Fragmented Features'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '社交、交易、担保需切换多个平台' : 'Social, trading, and guarantee functions require switching between multiple platforms'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* P2 解决方案 */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '一站式加密经济生态' : 'One-Stop Crypto Economic Ecosystem'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                <div className="w-16 h-16 bg-[#14C2A3]/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '加密社交网络' : 'Crypto Social Network'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '聊天+转账+社区' : 'Chat + Transfer + Community'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                <div className="w-16 h-16 bg-[#14C2A3]/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '智能担保交易系统' : 'Smart Guarantee Trading System'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? 'AI合同+资金托管' : 'AI Contract + Fund Custody'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '零门槛量化工具' : 'Zero-Threshold Quantitative Tools'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? 'AI生成策略+自动执行' : 'AI Generated Strategies + Auto Execution'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* P3 核心功能详解 */}
        <section className="py-20 lg:py-32 bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '核心功能详解' : 'Core Features Detailed'}
              </h2>
            </div>

            <div className="space-y-16">
              {/* 社交金融网络 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-6">
                    {language === 'zh' ? '社交金融网络' : 'Social Finance Network'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#14C2A3] rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        {language === 'zh' ? '加密红包/空投增强粘性' : 'Crypto red packets/airdrops enhance stickiness'}
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#14C2A3] rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        {language === 'zh' ? '行业圈子精准匹配资源' : 'Industry circles precisely match resources'}
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#14C2A3] rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        {language === 'zh' ? '支持「面对面现金交易」的C2C系统' : 'C2C system supporting "face-to-face cash trading"'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                  <div className="w-full h-64 bg-gradient-to-r from-[#14C2A3]/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 革命性担保交易 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="md:order-2">
                  <h3 className="text-white text-2xl font-bold mb-6">
                    {language === 'zh' ? '革命性担保交易' : 'Revolutionary Guarantee Trading'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-[#14C2A3] rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <p className="text-gray-300">{language === 'zh' ? '建群谈判' : 'Group Negotiation'}</p>
                      <svg className="w-4 h-4 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-[#14C2A3] rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <p className="text-gray-300">{language === 'zh' ? 'AI生成合同' : 'AI Generated Contract'}</p>
                      <svg className="w-4 h-4 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-[#14C2A3] rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <p className="text-gray-300">{language === 'zh' ? '资金托管' : 'Fund Custody'}</p>
                      <svg className="w-4 h-4 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-[#14C2A3] rounded-full flex items-center justify-center text-white font-bold">4</div>
                      <p className="text-gray-300">{language === 'zh' ? '验收放款' : 'Acceptance & Release'}</p>
                    </div>
                  </div>
                </div>
                <div className="md:order-1 bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                  <div className="w-full h-64 bg-gradient-to-r from-[#14C2A3]/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* AI交易生态 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-6">
                    {language === 'zh' ? 'AI交易生态' : 'AI Trading Ecosystem'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        {language === 'zh' ? '实时市场信号推送' : 'Real-time market signal push'}
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        {language === 'zh' ? '量化策略「App Store」（用户共享策略获利）' : 'Quantitative Strategy "App Store" (users share strategies for profit)'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
                  <div className="w-full h-64 bg-gradient-to-r from-purple-500/10 to-[#14C2A3]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* P4 技术优势 */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '为什么我们更安全高效？' : 'Why Are We More Secure and Efficient?'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  🔒 {language === 'zh' ? '多重签名担保账户' : 'Multi-sig Guarantee Accounts'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '基于多重签名技术的安全担保机制' : 'Secure guarantee mechanism based on multi-signature technology'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  🤖 {language === 'zh' ? 'NLP智能合同生成' : 'NLP Smart Contract Generation'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '支持20+语言的AI合同生成系统' : 'AI contract generation system supporting 20+ languages'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  ⚡ {language === 'zh' ? '法币通道聚合' : 'Fiat Channel Aggregation'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '对接全球300+支付供应商' : 'Connecting to 300+ payment providers globally'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* P5 商业模式 */}
        <section className="py-20 lg:py-32 bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '商业模式' : 'Business Model'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-white text-2xl font-bold mb-6">
                  {language === 'zh' ? '盈利来源' : 'Revenue Sources'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#14C2A3] rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-300">
                      {language === 'zh' ? '交易手续费（担保交易0.3%）' : 'Transaction fees (0.3% for guarantee trading)'}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#14C2A3] rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-300">
                      {language === 'zh' ? '量化策略订阅分成' : 'Quantitative strategy subscription revenue sharing'}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#14C2A3] rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-300">
                      {language === 'zh' ? 'USDT法币通道价差' : 'USDT-fiat channel price difference'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '3年用户增长预测' : '3-Year User Growth Forecast'}
                </h4>
                <div className="w-full h-64 bg-gradient-to-r from-[#14C2A3]/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* P6 竞争优势 */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '竞争优势' : 'Competitive Advantages'}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-6 text-white font-semibold">
                      {language === 'zh' ? '功能' : 'Features'}
                    </th>
                    <th className="text-center p-6 text-white font-semibold">
                      {language === 'zh' ? '竞品A' : 'Competitor A'}
                    </th>
                    <th className="text-center p-6 text-white font-semibold">
                      {language === 'zh' ? '竞品B' : 'Competitor B'}
                    </th>
                    <th className="text-center p-6 text-[#14C2A3] font-semibold">
                      {language === 'zh' ? '我们' : 'Us'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 text-gray-300">
                      {language === 'zh' ? '社交担保交易' : 'Social Guarantee Trading'}
                    </td>
                    <td className="text-center p-6">
                      <span className="text-red-500 text-2xl">❌</span>
                    </td>
                    <td className="text-center p-6">
                      <span className="text-red-500 text-2xl">❌</span>
                    </td>
                    <td className="text-center p-6">
                      <span className="text-[#14C2A3] text-2xl">✅</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-6 text-gray-300">
                      {language === 'zh' ? 'AI量化策略生成' : 'AI Quantitative Strategy Generation'}
                    </td>
                    <td className="text-center p-6">
                      <span className="text-red-500 text-2xl">❌</span>
                    </td>
                    <td className="text-center p-6">
                      <span className="text-[#14C2A3] text-2xl">✅</span>
                    </td>
                    <td className="text-center p-6">
                      <span className="text-[#14C2A3] text-2xl">✅</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-300">
                      {language === 'zh' ? '线下现金交易支持' : 'Offline Cash Trading Support'}
                    </td>
                    <td className="text-center p-6">
                      <span className="text-red-500 text-2xl">❌</span>
                    </td>
                    <td className="text-center p-6">
                      <span className="text-red-500 text-2xl">❌</span>
                    </td>
                    <td className="text-center p-6">
                      <span className="text-[#14C2A3] text-2xl">✅</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* P7 发展路线图 */}
        <section className="py-20 lg:py-32 bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '发展路线图' : 'Development Roadmap'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-[#14C2A3] font-bold text-lg">Q3</span>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  2024 Q3
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '社交+担保MVP上线' : 'Social + Guarantee MVP Launch'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-[#14C2A3]/20">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-[#14C2A3] font-bold text-lg">Q1</span>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  2025 Q1
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '接入合约交易' : 'Contract Trading Integration'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-purple-500 font-bold text-lg">Q4</span>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  2025 Q4
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '开放量化策略市场' : 'Open Quantitative Strategy Market'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 封底页 CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-r from-[#14C2A3]/10 to-purple-500/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
              {language === 'zh' ? '让每一笔加密交易都安全可信任' : 'Making every crypto transaction secure and trustworthy'}
            </h2>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              {language === 'zh' ? '加入全球首个「社交+担保+AI」一体化数字资产平台，开启全新的加密经济时代' : 'Join the world\'s first integrated "Social + Guarantee + AI" digital asset platform and start a new era of crypto economy'}
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <button 
                onClick={handleLogin}
                className="bg-[#14C2A3] text-white px-12 py-4 rounded-full hover:bg-[#10a085] transition-colors font-semibold text-lg"
              >
                {language === 'zh' ? '立即开始' : 'Get Started Now'}
              </button>
              <button className="bg-purple-600 text-white px-12 py-4 rounded-full hover:bg-purple-700 transition-colors font-semibold text-lg">
                {language === 'zh' ? '查看白皮书' : 'View Whitepaper'}
              </button>
            </div>
            <div className="flex justify-center space-x-8 text-gray-400">
              <span>官网: bedao.com</span>
              <span>Telegram: @bedao</span>
              <span>邮箱: info@bedao.com</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img src="/bedao-logo.png" alt="BeDAO" className="h-8" />
              </div>
              <p className="text-gray-400">
                {language === 'zh' ? '最便捷的一站式Web3解决方案' : 'The most convenient one-stop Web3 solution'}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">BeDAO</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '钱包' : 'Wallet'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">SDK&API</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '卡片' : 'Card'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '代币经济' : 'Tokenomic'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{language === 'zh' ? '指南' : 'Guide'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '横幅' : 'Banner'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '特性' : 'Features'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '功能' : 'Function'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '资产' : 'Asset'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{language === 'zh' ? '关注我们' : 'Follow Us'}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#14C2A3]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#14C2A3]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BePay. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}