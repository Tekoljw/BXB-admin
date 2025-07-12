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
              <Link href="#" className="text-[#14C2A3] font-medium">
                {language === 'zh' ? '首页' : 'Home'}
              </Link>
              <Link href="#" className="text-white hover:text-[#14C2A3] transition-colors">
                {language === 'zh' ? '卡片' : 'Card'}
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
                    <span className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-xs mr-2">CN</span>
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
        <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* 动态网格背景 */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#14C2A3_1px,transparent_1px),linear-gradient(to_bottom,#14C2A3_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/95 to-black"></div>
          </div>
          
          {/* 3D几何背景效果 */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-conic from-[#14C2A3]/20 via-gray-900/20 to-[#14C2A3]/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-conic from-gray-900/15 via-[#14C2A3]/15 to-gray-900/15 rounded-full blur-3xl animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
            
            {/* 几何线条 */}
            <div className="absolute top-1/4 left-1/2 w-px h-96 bg-gradient-to-b from-[#14C2A3]/50 to-transparent transform -rotate-45"></div>
            <div className="absolute bottom-1/4 right-1/2 w-px h-96 bg-gradient-to-t from-blue-900/50 to-transparent transform rotate-45"></div>
            <div className="absolute top-1/2 left-1/4 w-96 h-px bg-gradient-to-r from-[#14C2A3]/30 to-transparent"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-px bg-gradient-to-l from-blue-900/30 to-transparent"></div>
          </div>

          {/* 浮动粒子群 */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full ${i % 3 === 0 ? 'bg-[#14C2A3]' : i % 3 === 1 ? 'bg-gray-600' : 'bg-white'} opacity-20 animate-float`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              {/* 标签徽章 */}
              <div className="inline-flex items-center justify-center mb-8 animate-fade-in-up">
                <div className="bg-gradient-to-r from-[#14C2A3]/20 to-gray-900/20 backdrop-blur-xl border border-[#14C2A3]/30 rounded-full px-8 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#14C2A3] rounded-full animate-ping"></div>
                    <span className="text-[#14C2A3] font-medium text-sm">
                      {language === 'zh' ? '🚀 下一代金融基础设施' : '🚀 Next-Gen Financial Infrastructure'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 主标题 */}
              <div className="space-y-6 mb-12">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="relative inline-block">
                    <span className="block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent mb-4">
                      {language === 'zh' ? '革新加密' : 'Revolutionize'}
                    </span>
                    <span className="block bg-gradient-to-r from-[#14C2A3] via-blue-400 to-[#14C2A3] bg-clip-text text-transparent animate-gradient bg-[size:300%_300%]">
                      {language === 'zh' ? '经济生态' : 'Crypto Economy'}
                    </span>
                    {/* 装饰元素 */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#14C2A3]/20 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </h1>
                
                <div className="relative">
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
                    {language === 'zh' ? '全球首个「社交+担保+AI」一体化数字资产平台' : 'World\'s First Integrated "Social + Guarantee + AI" Digital Asset Platform'}
                  </p>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#14C2A3] to-blue-400 rounded-full"></div>
                </div>
              </div>

              {/* 核心功能图标 - 重新设计 */}
              <div className="flex flex-wrap justify-center gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="group text-center cursor-pointer">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#14C2A3]/30 via-[#14C2A3]/20 to-[#14C2A3]/10 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-xl border border-[#14C2A3]/20 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#14C2A3]/25 transition-all duration-500 group-hover:border-[#14C2A3]/40">
                      <svg className="w-12 h-12 text-[#14C2A3] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#14C2A3] rounded-full animate-pulse opacity-80"></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-300 group-hover:text-[#14C2A3] transition-colors duration-300">
                      {language === 'zh' ? '社交网络' : 'Social Network'}
                    </span>
                  </div>
                </div>
                
                <div className="group text-center cursor-pointer">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#14C2A3]/30 via-[#14C2A3]/20 to-[#14C2A3]/10 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-xl border border-[#14C2A3]/20 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#14C2A3]/25 transition-all duration-500 group-hover:border-[#14C2A3]/40">
                      <svg className="w-12 h-12 text-[#14C2A3] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse opacity-80"></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-300 group-hover:text-[#14C2A3] transition-colors duration-300">
                      USDT 生态
                    </span>
                  </div>
                </div>
                
                <div className="group text-center cursor-pointer">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#14C2A3]/30 via-[#14C2A3]/20 to-[#14C2A3]/10 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-xl border border-[#14C2A3]/20 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#14C2A3]/25 transition-all duration-500 group-hover:border-[#14C2A3]/40">
                      <svg className="w-12 h-12 text-[#14C2A3] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#14C2A3] rounded-full animate-pulse opacity-80"></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-300 group-hover:text-[#14C2A3] transition-colors duration-300">
                      {language === 'zh' ? '智能担保' : 'Smart Guarantee'}
                    </span>
                  </div>
                </div>
                
                <div className="group text-center cursor-pointer">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-900/30 via-blue-900/20 to-blue-900/10 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-xl border border-blue-900/20 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-900/25 transition-all duration-500 group-hover:border-blue-900/40">
                      <svg className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse opacity-80"></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                      AI 引擎
                    </span>
                  </div>
                </div>
              </div>

              {/* 下载按钮 */}
              <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <h3 className="text-white text-2xl font-semibold mb-8">
                  {language === 'zh' ? '多平台下载' : 'Multi-Platform Download'}
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {/* Web版 */}
                  <button 
                    onClick={handleLogin}
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#14C2A3] via-[#12b89a] to-[#10a085] text-white rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#14C2A3]/30"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      {language === 'zh' ? 'Web版' : 'Web Version'}
                    </span>
                  </button>

                  {/* Windows */}
                  <button className="group relative px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.851"/>
                      </svg>
                      Windows
                    </span>
                  </button>

                  {/* 安卓APK */}
                  <button className="group relative px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.523 15.3414c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993zm-11.046 0c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993zm11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5972.416.416 0 00-.5972.1518l-2.0223 3.5021c-.8897-.4279-1.8968-.6662-2.9712-.6662-1.0744 0-2.0815.2383-2.9712.6662L8.1472 5.4568a.4161.4161 0 00-.5972-.1518.4161.4161 0 00-.1518.5972L9.3955 9.3214c-2.0905 1.0863-3.5414 3.2915-3.5414 5.8186 0 .2776.0156.5471.0444.8088h15.2031c.0288-.2617.0444-.5312.0444-.8088 0-2.5271-1.4509-4.7323-3.5415-5.8186z"/>
                      </svg>
                      {language === 'zh' ? '安卓APK' : 'Android APK'}
                    </span>
                  </button>

                  {/* Google Play */}
                  <button className="group relative px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      Google Play
                    </span>
                  </button>

                  {/* App Store */}
                  <button className="group relative px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                      </svg>
                      App Store
                    </span>
                  </button>
                </div>
              </div>

              {/* 统计数据 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#14C2A3] to-green-400 bg-clip-text text-transparent mb-2">1M+</div>
                  <div className="text-gray-400 text-sm font-medium">{language === 'zh' ? '全球用户' : 'Global Users'}</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#14C2A3] to-green-400 bg-clip-text text-transparent mb-2">$100B+</div>
                  <div className="text-gray-400 text-sm font-medium">{language === 'zh' ? '交易量' : 'Trading Volume'}</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#14C2A3] to-green-400 bg-clip-text text-transparent mb-2">99.9%</div>
                  <div className="text-gray-400 text-sm font-medium">{language === 'zh' ? '安全保障' : 'Security Rate'}</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#14C2A3] to-green-400 bg-clip-text text-transparent mb-2">200+</div>
                  <div className="text-gray-400 text-sm font-medium">{language === 'zh' ? '合作伙伴' : 'Partners'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* P1 市场痛点 */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* 背景渐变效果 */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/10 to-gray-900"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-gray-700/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-600/8 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-xl border border-gray-600/30 rounded-full px-8 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400 font-medium text-sm">
                      {language === 'zh' ? '⚠️ 当前市场挑战' : '⚠️ Current Market Challenges'}
                    </span>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-6">
                {language === 'zh' ? '为什么需要我们的平台？' : 'Why Do We Need Our Platform?'}
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {language === 'zh' ? '传统加密货币生态系统面临的三大核心问题亟待解决' : 'Three core issues in traditional cryptocurrency ecosystems urgently need solutions'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-700/10 rounded-3xl blur-xl group-hover:from-gray-600/30 group-hover:to-gray-700/20 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl backdrop-blur-xl border border-gray-600/20 group-hover:border-gray-600/40 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-gray-600/30 to-gray-700/20 rounded-3xl flex items-center justify-center mb-8 group-hover:animate-glow-pulse">
                    <svg className="w-10 h-10 text-gray-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full animate-pulse opacity-80"></div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors duration-300">
                      {language === 'zh' ? '信任缺失危机' : 'Trust Deficit Crisis'}
                    </h4>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {language === 'zh' ? '加密货币交易欺诈频发，用户资金安全无保障，缺乏可信任的支付场景和交易环境' : 'Frequent cryptocurrency fraud, no protection for user funds, lacking trustworthy payment scenarios and trading environments'}
                    </p>
                    <div className="flex items-center text-gray-400 text-sm font-medium">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-pulse"></span>
                      {language === 'zh' ? '每年损失超过 $14B' : 'Annual losses exceed $14B'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#14C2A3]/20 to-green-600/10 rounded-3xl blur-xl group-hover:from-[#14C2A3]/30 group-hover:to-green-600/20 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl backdrop-blur-xl border border-[#14C2A3]/20 group-hover:border-[#14C2A3]/40 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-[#14C2A3]/30 to-green-600/20 rounded-3xl flex items-center justify-center mb-8 group-hover:animate-glow-pulse">
                    <svg className="w-10 h-10 text-[#14C2A3] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#14C2A3] rounded-full animate-pulse opacity-80"></div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-green-200 transition-colors duration-300">
                      {language === 'zh' ? '技术门槛过高' : 'Technical Barriers Too High'}
                    </h4>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {language === 'zh' ? '普通用户难以参与量化交易和合约市场，复杂的技术要求阻碍了大众化普及' : 'Ordinary users cannot participate in quantitative trading and contract markets due to complex technical requirements hindering mass adoption'}
                    </p>
                    <div className="flex items-center text-[#14C2A3] text-sm font-medium">
                      <span className="w-2 h-2 bg-[#14C2A3] rounded-full mr-2 animate-pulse"></span>
                      {language === 'zh' ? '95% 用户被技术壁垒拒绝' : '95% users excluded by technical barriers'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/10 rounded-3xl blur-xl group-hover:from-blue-600/30 group-hover:to-blue-800/20 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl backdrop-blur-xl border border-blue-600/20 group-hover:border-blue-600/40 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600/30 to-blue-800/20 rounded-3xl flex items-center justify-center mb-8 group-hover:animate-glow-pulse">
                    <svg className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse opacity-80"></div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                      {language === 'zh' ? '功能分散割裂' : 'Fragmented Features'}
                    </h4>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {language === 'zh' ? '社交、交易、担保功能分散在不同平台，用户体验割裂，增加操作复杂性和成本' : 'Social, trading, and guarantee functions scattered across different platforms, creating fragmented user experience and increased complexity'}
                    </p>
                    <div className="flex items-center text-blue-400 text-sm font-medium">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                      {language === 'zh' ? '平均需要 8+ 个应用' : 'Average need for 8+ apps'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 统计展示 */}
            <div className="mt-20 text-center">
              <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-400 mb-2">$14B+</div>
                  <div className="text-gray-400 text-sm">{language === 'zh' ? '年度欺诈损失' : 'Annual Fraud Loss'}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-400 mb-2">95%</div>
                  <div className="text-gray-400 text-sm">{language === 'zh' ? '用户被技术排斥' : 'Users Excluded by Tech'}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-400 mb-2">8+</div>
                  <div className="text-gray-400 text-sm">{language === 'zh' ? '平均使用应用数' : 'Average Apps Required'}</div>
                </div>
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

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* P3 三大核心功能 */}
        <section className="py-20 lg:py-32 bg-gray-800/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
                {language === 'zh' ? '三大核心功能' : 'Three Core Functions'}
              </h2>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                {language === 'zh' ? '社交+担保+AI，重新定义数字资产交易生态' : 'Social + Guarantee + AI, redefining digital asset trading ecosystem'}
              </p>
            </div>

            <div className="space-y-32">
              {/* 第一大功能：社交金融网络 */}
              <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
                  <div className="bg-[#14C2A3] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl">
                    01
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#14C2A3]/10 via-gray-800/50 to-[#14C2A3]/10 rounded-3xl border border-[#14C2A3]/30 p-12 backdrop-blur-lg">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start mb-6">
                        <div className="w-20 h-20 bg-[#14C2A3]/20 rounded-2xl flex items-center justify-center mr-4">
                          <svg className="w-12 h-12 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-white text-4xl font-bold">
                          {language === 'zh' ? '社交金融网络' : 'Social Finance Network'}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        {language === 'zh' ? '构建基于信任的金融社交生态，让每个用户都能在安全环境中进行价值交换' : 'Building a trust-based financial social ecosystem where every user can exchange value in a secure environment'}
                      </p>
                      <div className="grid gap-4">
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-[#14C2A3] rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? '加密红包/空投增强用户粘性' : 'Crypto red packets/airdrops enhance user stickiness'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-[#14C2A3] rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? '行业圈子精准匹配优质资源' : 'Industry circles precisely match premium resources'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-[#14C2A3] rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? '面对面现金交易的C2C系统' : 'Face-to-face cash trading C2C system'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="bg-gradient-to-br from-[#14C2A3]/20 to-[#14C2A3]/5 rounded-2xl p-8 border border-[#14C2A3]/20">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/10 p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-[#14C2A3] mb-1">50万+</div>
                            <div className="text-gray-300 text-sm">{language === 'zh' ? '活跃用户' : 'Active Users'}</div>
                          </div>
                          <div className="bg-white/10 p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-[#14C2A3] mb-1">1000+</div>
                            <div className="text-gray-300 text-sm">{language === 'zh' ? '行业圈子' : 'Industry Circles'}</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto bg-[#14C2A3]/10 rounded-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 第二大功能：智能担保交易 */}
              <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
                  <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl">
                    02
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 via-gray-800/50 to-blue-500/10 rounded-3xl border border-blue-500/30 p-12 backdrop-blur-lg">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-8 border border-blue-500/20">
                        <div className="flex justify-center mb-8">
                          <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                              <span className="text-white">{language === 'zh' ? '建群谈判' : 'Group Negotiation'}</span>
                            </div>
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                              <span className="text-white">{language === 'zh' ? 'AI生成合同' : 'AI Contract Generation'}</span>
                            </div>
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                              <span className="text-white">{language === 'zh' ? '资金托管' : 'Fund Custody'}</span>
                            </div>
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                              <span className="text-white">{language === 'zh' ? '验收放款' : 'Acceptance & Release'}</span>
                            </div>
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 lg:order-2 text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start mb-6">
                        <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mr-4">
                          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-white text-4xl font-bold">
                          {language === 'zh' ? '智能担保交易' : 'Smart Guarantee Trading'}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        {language === 'zh' ? '革命性的四步担保流程，AI合同生成+多重签名托管，让每笔交易都安全可信' : 'Revolutionary 4-step guarantee process with AI contract generation + multi-sig custody, making every transaction secure and trustworthy'}
                      </p>
                      <div className="grid gap-4">
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? '多重签名担保账户，资金绝对安全' : 'Multi-signature guarantee accounts, absolutely secure funds'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? 'AI智能合同，支持20+语言' : 'AI smart contracts supporting 20+ languages'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? '0.3%超低手续费，高效快捷' : '0.3% ultra-low fees, efficient and fast'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 第三大功能：AI量化生态 */}
              <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
                  <div className="bg-gradient-to-r from-[#14C2A3] to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl">
                    03
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#14C2A3]/10 via-blue-500/10 to-[#14C2A3]/10 rounded-3xl border border-blue-500/30 p-12 backdrop-blur-lg">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#14C2A3]/20 to-blue-500/20 rounded-2xl flex items-center justify-center mr-4">
                          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-white text-4xl font-bold">
                          {language === 'zh' ? 'AI量化生态' : 'AI Quantitative Ecosystem'}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        {language === 'zh' ? '零门槛量化交易平台，AI策略App Store让每个人都能成为量化专家' : 'Zero-threshold quantitative trading platform, AI strategy App Store enables everyone to become a quant expert'}
                      </p>
                      <div className="grid gap-4">
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#14C2A3] to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? 'AI实时市场信号推送' : 'AI real-time market signal push'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#14C2A3] to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? '量化策略App Store，共享收益' : 'Quantitative strategy App Store, shared profits'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#14C2A3] to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                            </svg>
                          </div>
                          <p className="text-white font-medium">
                            {language === 'zh' ? '智能策略自动执行，24小时无人值守' : 'Smart strategy auto-execution, 24/7 unattended'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-500/20 to-[#14C2A3]/20 rounded-2xl p-8 border border-blue-500/20">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/10 p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-blue-500 mb-1">1000+</div>
                            <div className="text-gray-300 text-sm">{language === 'zh' ? 'AI策略' : 'AI Strategies'}</div>
                          </div>
                          <div className="bg-white/10 p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-[#14C2A3] mb-1">85%+</div>
                            <div className="text-gray-300 text-sm">{language === 'zh' ? '胜率' : 'Win Rate'}</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500/10 to-[#14C2A3]/10 rounded-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm text-gray-400 mb-2">{language === 'zh' ? '月平均收益' : 'Monthly Average Return'}</div>
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#14C2A3] to-blue-500">
                              +15.8%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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





        {/* 封底页 CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-r from-[#14C2A3]/10 to-blue-500/10">
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
              <button className="bg-blue-600 text-white px-12 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold text-lg">
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