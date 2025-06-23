"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"

export default function LandingPage() {
  const { theme, language, setLanguage } = useTheme()
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

  const handleGetStarted = () => {
    router.push("/wallet")
  }

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const changeLang = (lang: string) => {
    setLanguage(lang as "en" | "zh")
  }

  return (
    <div className="wrapper min-h-screen min-h-[100dvh] bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="navbar fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="navbar-brand">
              <img 
                src="/logo.png" 
                alt="BeDAO" 
                width={180} 
                height={40}
                className="h-10 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTgwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwRDRBQSI+QmVEQU88L3RleHQ+PC9zdmc+"
                }}
              />
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={toggleNav}
              className="md:hidden p-2"
            >
              <div className="navbar-toggler-icon">
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="nav-link text-white hover:text-[#14C2A3] transition-colors">
                Wallet
              </Link>
              <Link href="#" className="nav-link text-[#14C2A3] font-medium">
                SDK&API
              </Link>
              <Link href="#" className="nav-link text-white hover:text-[#14C2A3] transition-colors">
                Card
              </Link>
              <Link href="#" className="nav-link text-white hover:text-[#14C2A3] transition-colors">
                Tokenomic
              </Link>
              <Link href="#" className="nav-link text-white hover:text-[#14C2A3] transition-colors">
                News
              </Link>
              
              {/* Documents Dropdown */}
              <div className="relative group">
                <button className="nav-link text-white hover:text-[#14C2A3] transition-colors flex items-center">
                  Documents
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="#" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
                    White Paper
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
                    Development DOCS
                  </Link>
                </div>
              </div>

              {/* Language Dropdown */}
              <div className="relative group">
                <button className="nav-link flex items-center">
                  <img 
                    width={24} 
                    src={language === 'zh' ? "/icons/CN.png" : "/icons/US.png"} 
                    alt="" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzAwRDRBQSIvPjx0ZXh0IHg9IjEyIiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+e2xhbmd1YWdlID09PSAnemgnID8gJ0NOJyA6ICdVUyd9PC90ZXh0Pjwvc3ZnPg=="
                    }}
                  />
                </button>
                <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={() => changeLang('en')}
                    className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    <img width={24} src="/icons/US.png" alt="" className="mr-2" />
                    English
                  </button>
                  <button 
                    onClick={() => changeLang('zh')}
                    className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg"
                  >
                    <img width={24} src="/icons/CN.png" alt="" className="mr-2" />
                    简体中文
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button 
                onClick={handleLogin}
                className="bg-[#14C2A3] text-white px-6 py-2 rounded-full hover:bg-[#10a085] transition-colors font-medium"
              >
                Login
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {navOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 shadow-lg">
              <div className="flex flex-col space-y-2 p-4">
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">Wallet</Link>
                <Link href="#" className="text-[#14C2A3] py-2">SDK&API</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">Card</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">Tokenomic</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">News</Link>
                <Link href="#" className="text-white hover:text-[#14C2A3] py-2">Documents</Link>
                <button 
                  onClick={handleLogin}
                  className="bg-[#14C2A3] text-white px-6 py-2 rounded-full hover:bg-[#10a085] transition-colors font-medium mt-4"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <section className="hero-section overflow-hidden py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="max-w-4xl text-center">
                <div className="relative z-10">
                  <p className="text-[#14C2A3] text-lg mb-4" data-aos="fade-up-sm">
                    {language === 'zh' ? '全球加密货币保证交易所' : 'Global Cryptocurrency Guaranteed Trading Exchange'}
                  </p>
                  <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-8" data-aos="fade-up-sm">
                    <span className="block mb-4">
                      {language === 'zh' ? '安全可靠的数字资产交易平台' : 'Secure & Reliable Digital Asset Trading Platform'}
                    </span>
                    <span className="text-transparent bg-gradient-to-r from-[#14C2A3] to-[#10a085] bg-clip-text">
                      {language === 'zh' ? '您的财富增值之路' : 'Your Path to Wealth Growth'}
                    </span>
                  </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" data-aos="fade-up-sm">
                  <button 
                    onClick={handleLogin}
                    className="bg-[#14C2A3] text-white px-8 py-3 rounded-lg hover:bg-[#10a085] transition-colors font-medium"
                  >
                    {language === 'zh' ? '立即登录' : 'Login Now'}
                  </button>
                  <a 
                    href="#" 
                    className="bg-transparent border-2 border-[#14C2A3] text-[#14C2A3] px-8 py-3 rounded-lg hover:bg-[#14C2A3] hover:text-white transition-colors font-medium inline-block text-center"
                  >
                    {language === 'zh' ? '白皮书' : 'White Paper'}
                  </a>
                </div>

                <div data-aos="fade-up-sm" className="relative">
                  <div className="relative z-10">
                    <img 
                      className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-[#14C2A3] shadow-2xl"
                      src="https://scource-static.funibet.com/beingfi/images/bg/screen-1.png" 
                      alt="Dashboard Preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiMxRTI5M0IiLz48dGV4dCB4PSI0MDAiIHk9IjIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMDBENEFBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EYXNoYm9hcmQgUHJldmlldyA8L3RleHQ+PC9zdmc+"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-[#14C2A3] text-lg mb-4">
                {language === 'zh' ? '核心特性' : 'Core Features'}
              </h2>
              <h3 className="text-white text-3xl md:text-5xl font-bold">
                {language === 'zh' ? '为什么选择BeDAO' : 'Why Choose BeDAO'}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '安全保障' : 'Security Guarantee'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '全球领先的加密技术，多重安全防护，为您的资产保驾护航' : 'Leading encryption technology with multiple security layers to protect your assets'}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? 'USDT保证金' : 'USDT Margin'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '专业的USDT保证金交易系统，稳定币交易更安全可靠' : 'Professional USDT margin trading system, stablecoin trading for enhanced security'}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '资产保障' : 'Asset Protection'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '完善的保证账户体系，多重风控措施，确保您的资产安全' : 'Comprehensive guarantee account system with multiple risk controls for asset security'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-r from-[#14C2A3]/10 to-[#10a085]/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
              {language === 'zh' ? '准备开始您的交易之旅？' : 'Ready to Start Your Trading Journey?'}
            </h2>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              {language === 'zh' ? '加入BeDAO全球加密货币保证交易所，享受USDT保证金交易，安全、透明、可靠' : 'Join BeDAO Global Cryptocurrency Guaranteed Trading Exchange with USDT margin trading - Safe, Transparent, Reliable'}
            </p>
            <button 
              onClick={handleGetStarted}
              className="bg-[#14C2A3] text-white px-12 py-4 rounded-full hover:bg-[#10a085] transition-colors font-semibold text-lg"
            >
              {language === 'zh' ? '立即开始交易' : 'Start Trading Now'}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 flex-shrink-0 w-full">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/logo.png" 
                alt="BeDAO" 
                width={120} 
                height={30}
                className="mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjMwIiB2aWV3Qm94PSIwIDAgMTIwIDMwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwRDRBQSI+QmVEQU88L3RleHQ+PC9zdmc+"
                }}
              />
              <p className="text-gray-400">
                {language === 'zh' ? '全球加密货币保证交易所' : 'Global Cryptocurrency Guaranteed Trading Exchange'}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">
                {language === 'zh' ? '产品' : 'Products'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-[#14C2A3]">Wallet</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">SDK&API</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">Card</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">
                {language === 'zh' ? '资源' : 'Resources'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '白皮书' : 'White Paper'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '开发文档' : 'Documentation'}</Link></li>
                <li><Link href="#" className="hover:text-[#14C2A3]">{language === 'zh' ? '新闻' : 'News'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">
                {language === 'zh' ? '联系我们' : 'Contact'}
              </h4>
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
            <p>&copy; 2024 BeDAO. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}