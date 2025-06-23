"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import DigitalRain from "@/components/digital-rain"

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
        {/* Hero Section with Digital Rain */}
        <section className="hero-section relative overflow-hidden py-20 lg:py-32">
          {/* Digital Rain Background */}
          <DigitalRain />
          
          {/* Gradient Light Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Main gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
            
            {/* Animated light beams */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#14C2A3]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#10a085]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#14C2A3]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Radial gradient from center */}
            <div className="absolute inset-0 bg-gradient-radial from-[#14C2A3]/5 via-transparent to-transparent"></div>
            
            {/* Floating particles */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-[#14C2A3] rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-[#10a085] rounded-full animate-bounce opacity-40" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-[#14C2A3] rounded-full animate-bounce opacity-50" style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute top-1/2 right-20 w-2 h-2 bg-[#14C2A3] rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }}></div>
            
            {/* Geometric light patterns */}
            <div className="absolute top-1/4 right-1/3 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#14C2A3]/50 to-transparent transform rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#10a085]/40 to-transparent transform -rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-center">
              <div className="max-w-4xl text-center">
                <div className="relative z-10">
                  <p className="text-[#14C2A3] text-lg mb-4 animate-fade-in-up">
                    {language === 'zh' ? '最便捷的一站式链改+托管解决方案' : 'The most convenient one-stop chain modification+hosting solution'}
                  </p>
                  <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="block mb-4">
                      {language === 'zh' ? '一个SDK囊括所有Web3.0功能' : 'A single SDK that encompasses all Web3.0 functions'}
                    </span>
                    <span className="text-transparent bg-gradient-to-r from-[#14C2A3] to-[#10a085] bg-clip-text animate-glow">
                      {language === 'zh' ? 'Web2.0用户的钥匙' : 'The key to Web2.0 users'}
                    </span>
                  </h1>
                </div>

                <div className="flex justify-center space-x-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <button className="bg-[#14C2A3] text-white px-8 py-3 rounded-lg hover:bg-[#10a085] transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#14C2A3]/25">
                    {language === 'zh' ? '白皮书' : 'White Paper'}
                  </button>
                  <button className="bg-[#14C2A3] text-white px-8 py-3 rounded-lg hover:bg-[#10a085] transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#14C2A3]/25">
                    {language === 'zh' ? '开发文档' : 'Development'}
                  </button>
                </div>

                <div className="relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="relative z-10">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#14C2A3]/50 to-[#10a085]/50 rounded-2xl blur-sm animate-pulse"></div>
                    <img 
                      className="relative w-full max-w-4xl mx-auto rounded-2xl border-2 border-[#14C2A3] shadow-2xl shadow-[#14C2A3]/20 hover:shadow-[#14C2A3]/30 transition-all duration-300"
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

        {/* Features */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h5 className="text-[#14C2A3] text-lg mb-4">
                <span>{language === 'zh' ? '●集成20+去中心化钱包' : '●Integrated 20+decentralized wallets'}</span>
                &nbsp;
                <span>{language === 'zh' ? '●支持100+加密货币' : '●supporting 100+cryptocurrencies'}</span>
                &nbsp;
                <span>{language === 'zh' ? '●50+NFTs' : '●50+NFTs'}</span>
                &nbsp;
                <span>{language === 'zh' ? '●100+法币' : '●100+fiat'}</span>
              </h5>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-white text-3xl md:text-5xl font-bold">
                {language === 'zh' ? 'BeDAO确保您的资产受到行业领先的安全级别保护' : 'BeDAO ensures that your assets are protected by industry-leading levels of security'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '2FA验证' : '2FA validation'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '2FA（双因素认证）是一种安全措施，要求用户在登录或执行敏感操作时提供两个认证要素，通常是密码和动态验证码。增加了额外的安全层以增强账户保护。' : '2FA (Two Factor Authentication) is a security measure that requires users to provide two authentication elements, usually passwords and dynamic verification codes, when logging in or performing sensitive operations. Added an additional security layer to enhance account protection.'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? '冷热钱包分离' : 'Separation of hot and cold wallets'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? '冷热钱包分离是一种加密货币存储策略，将大部分资金存储在离线冷存储设备（冷钱包）中，只在在线热存储设备（热钱包）中保留少量资金用于日常交易。提高了资金安全性，防止网络攻击和黑客入侵。' : 'Cold and hot wallet separation is a cryptocurrency storage strategy that stores most of the funds in offline cold storage devices (cold wallets) and only retains a small amount of funds for daily transactions on online hot storage devices (hot wallets). Improved the security of funds and prevented network attacks and hacker intrusions.'}
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
                <div className="w-16 h-16 bg-[#14C2A3]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#14C2A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-semibold mb-4">
                  {language === 'zh' ? 'MPC加密技术' : 'MPC encryption technology'}
                </h4>
                <p className="text-gray-300">
                  {language === 'zh' ? 'MPC（多方计算）是一种密码学技术，安全地处理和存储敏感数据，确保隐私和安全。它使多个参与者能够在不泄露个人输入的情况下执行计算。在加密货币领域，MPC技术通过促进密钥管理和交易签名来增强安全性和保护。' : 'MPC (Multi-Party Computation) is a cryptographic technique that securely processes and stores sensitive data, ensuring privacy and security. It enables multiple participants to perform computations without disclosing individual inputs. In the realm of cryptocurrencies, MPC technology enhances security and protection by facilitating key management and transaction signing.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-r from-[#14C2A3]/10 to-[#10a085]/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
              {language === 'zh' ? '准备开始您的Web3之旅？' : 'Ready to Start Your Web3 Journey?'}
            </h2>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              {language === 'zh' ? '加入BeDAO全球加密货币平台，体验前所未有的区块链服务' : 'Join BeDAO global cryptocurrency platform for an unprecedented blockchain experience'}
            </p>
            <button 
              onClick={handleLogin}
              className="bg-[#14C2A3] text-white px-12 py-4 rounded-full hover:bg-[#10a085] transition-colors font-semibold text-lg"
            >
              {language === 'zh' ? '立即开始' : 'Get Started Now'}
            </button>
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