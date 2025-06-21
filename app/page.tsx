"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Shield, 
  Globe, 
  TrendingUp, 
  Users, 
  Lock, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Bitcoin,
  DollarSign,
  CreditCard,
  Activity
} from "lucide-react"

// Crypto icons data
const CryptoIcon = ({ symbol, className = "w-4 h-4" }: { symbol: string; className?: string }) => {
  const colors = {
    BTC: "bg-orange-500",
    ETH: "bg-blue-500", 
    ETC: "bg-green-600",
    EXP: "bg-purple-500",
    XMR: "bg-orange-600",
    GAME: "bg-blue-600",
    SBD: "bg-green-500",
    NLG: "bg-yellow-500",
    USD: "bg-green-700"
  }
  
  return (
    <div className={`${colors[symbol as keyof typeof colors] || 'bg-gray-500'} rounded-full ${className} flex items-center justify-center`}>
      <span className="text-white text-xs font-bold">{symbol.charAt(0)}</span>
    </div>
  )
}

// Modern dark design with CSS-inspired layout
export default function LandingPage() {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('zh')
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang')
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      setCurrentLang(savedLang)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLang = (lang: string) => {
    if (lang === 'en' || lang === 'zh') {
      localStorage.setItem('lang', lang)
      setCurrentLang(lang)
    }
  }

  const cryptoTicker = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$67,234.56', change: '+2.34%', isPositive: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,456.78', change: '+1.87%', isPositive: true },
    { symbol: 'ETC', name: 'Ethereum Classic', price: '$24.56', change: '-0.12%', isPositive: false },
    { symbol: 'EXP', name: 'Expanse', price: '$0.89', change: '+5.67%', isPositive: true },
    { symbol: 'XMR', name: 'Monero', price: '$156.78', change: '+3.21%', isPositive: true },
    { symbol: 'GAME', name: 'GameCredits', price: '$0.045', change: '-1.23%', isPositive: false },
    { symbol: 'SBD', name: 'Steem Dollar', price: '$1.02', change: '+0.98%', isPositive: true },
    { symbol: 'NLG', name: 'Gulden', price: '$0.023', change: '+2.45%', isPositive: true },
    { symbol: 'USD', name: 'US Dollar', price: '$1.00', change: '0.00%', isPositive: true }
  ]

  const t = {
    title: currentLang === 'zh' ? '全球加密货币担保交易所' : 'Global Cryptocurrency Guaranteed Trading Exchange',
    subtitle: currentLang === 'zh' ? 
      '专业、安全、有保障的全球数字资产交易平台' : 
      'Professional, secure, and guaranteed digital asset trading platform',
    heroDescription: currentLang === 'zh' ? 
      '体验最先进的加密货币交易技术，享受银行级安全保障，全球24/7专业服务' :
      'Experience cutting-edge cryptocurrency trading technology with bank-grade security and 24/7 global professional service',
    startTrading: currentLang === 'zh' ? '立即开始交易' : 'Start Trading Now',
    learnMore: currentLang === 'zh' ? '了解更多' : 'Learn More',
    wallet: currentLang === 'zh' ? '钱包' : 'Wallet',
    trading: currentLang === 'zh' ? '交易' : 'Trading', 
    market: currentLang === 'zh' ? '行情' : 'Market',
    documents: currentLang === 'zh' ? '文档' : 'Documents',
    login: currentLang === 'zh' ? '登录' : 'Login',
    features: currentLang === 'zh' ? '核心特色' : 'Core Features',
    guarantee: currentLang === 'zh' ? '担保交易' : 'Guaranteed Trading',
    guaranteeDesc: currentLang === 'zh' ? '每笔交易都有多重保障机制，确保资金安全' : 'Multiple security mechanisms for every transaction to ensure fund safety',
    global: currentLang === 'zh' ? '全球服务' : 'Global Service',
    globalDesc: currentLang === 'zh' ? '覆盖200+国家，24/7不间断专业服务' : 'Covering 200+ countries with 24/7 uninterrupted professional service',
    security: currentLang === 'zh' ? '银行级安全' : 'Bank-Grade Security',
    securityDesc: currentLang === 'zh' ? '采用最高级别的加密技术和安全标准' : 'Utilizing highest level encryption technology and security standards',
    speed: currentLang === 'zh' ? '极速执行' : 'Lightning Speed',
    speedDesc: currentLang === 'zh' ? '毫秒级订单撮合，瞬间完成交易' : 'Millisecond order matching for instant trade execution',
    stats1: currentLang === 'zh' ? '1000万+' : '10M+',
    stats1Label: currentLang === 'zh' ? '全球用户' : 'Global Users',
    stats2: currentLang === 'zh' ? '200+' : '200+', 
    stats2Label: currentLang === 'zh' ? '支持国家' : 'Countries',
    stats3: currentLang === 'zh' ? '99.9%' : '99.9%',
    stats3Label: currentLang === 'zh' ? '系统稳定性' : 'Uptime',
    stats4: currentLang === 'zh' ? '24/7' : '24/7',
    stats4Label: currentLang === 'zh' ? '客户服务' : 'Support',
    liveMarket: currentLang === 'zh' ? '实时行情' : 'Live Market Data',
    copyright: currentLang === 'zh' ? 
      '© 2024 BeDAO. 保留所有权利. 全球加密货币担保交易所' :
      '© 2024 BeDAO. All rights reserved. Global Cryptocurrency Guaranteed Trading Exchange'
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white overflow-x-hidden">
      {/* Fixed Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#111827]/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
              <Shield className="h-8 w-8 text-[#00D4AA]" />
              <span className="text-2xl font-bold text-white">BeDAO</span>
              <span className="px-2 py-1 text-xs bg-[#00D4AA] text-black rounded-full font-semibold">PRO</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => router.push('/wallet')} 
                className="text-gray-300 hover:text-[#00D4AA] transition-colors font-medium"
              >
                {t.wallet}
              </button>
              <button 
                onClick={() => router.push('/spot')} 
                className="text-gray-300 hover:text-[#00D4AA] transition-colors font-medium"
              >
                {t.trading}
              </button>
              <button 
                onClick={() => router.push('/market')} 
                className="text-gray-300 hover:text-[#00D4AA] transition-colors font-medium"
              >
                {t.market}
              </button>
              
              <div className="relative group">
                <button className="text-gray-300 hover:text-[#00D4AA] transition-colors font-medium flex items-center">
                  {t.documents}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1f2937] rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-3 text-sm text-gray-300 hover:text-[#00D4AA] hover:bg-gray-800 rounded-t-lg">
                    {currentLang === 'zh' ? '白皮书' : 'White Paper'}
                  </a>
                  <a href="#" className="block px-4 py-3 text-sm text-gray-300 hover:text-[#00D4AA] hover:bg-gray-800 rounded-b-lg">
                    {currentLang === 'zh' ? 'API文档' : 'API Docs'}
                  </a>
                </div>
              </div>
              
              <div className="relative group">
                <button className="px-3 py-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white flex items-center transition-colors">
                  <Globe className="w-4 h-4 mr-2" />
                  {currentLang.toUpperCase()}
                </button>
                <div className="absolute top-full right-0 mt-2 w-20 bg-[#1f2937] rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {currentLang !== 'en' && (
                    <button 
                      onClick={() => changeLang('en')} 
                      className="block w-full px-3 py-2 text-sm text-gray-300 hover:text-[#00D4AA] hover:bg-gray-800 rounded-t-lg text-center"
                    >
                      EN
                    </button>
                  )}
                  {currentLang !== 'zh' && (
                    <button 
                      onClick={() => changeLang('zh')} 
                      className="block w-full px-3 py-2 text-sm text-gray-300 hover:text-[#00D4AA] hover:bg-gray-800 rounded-b-lg text-center"
                    >
                      中文
                    </button>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/wallet')} 
                className="px-6 py-2 bg-gradient-to-r from-[#00D4AA] to-emerald-500 text-black font-semibold rounded-lg hover:from-[#00B894] hover:to-emerald-600 transition-all transform hover:scale-105"
              >
                {t.login}
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setNavbarOpen(!navbarOpen)} 
              className="md:hidden text-gray-300 hover:text-white"
            >
              {navbarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {navbarOpen && (
            <div className="md:hidden border-t border-gray-800 bg-[#111827]/95 backdrop-blur-md">
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => router.push('/wallet')} className="block text-gray-300 hover:text-[#00D4AA] font-medium">
                  {t.wallet}
                </button>
                <button onClick={() => router.push('/spot')} className="block text-gray-300 hover:text-[#00D4AA] font-medium">
                  {t.trading}
                </button>
                <button onClick={() => router.push('/market')} className="block text-gray-300 hover:text-[#00D4AA] font-medium">
                  {t.market}
                </button>
                <div className="flex space-x-2 pt-4">
                  <button 
                    onClick={() => changeLang('en')} 
                    className={`px-3 py-1 rounded ${currentLang === 'en' ? 'bg-[#00D4AA] text-black' : 'bg-gray-800 text-gray-300'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => changeLang('zh')} 
                    className={`px-3 py-1 rounded ${currentLang === 'zh' ? 'bg-[#00D4AA] text-black' : 'bg-gray-800 text-gray-300'}`}
                  >
                    中文
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Crypto Ticker - Floating at top */}
      <div className="fixed top-16 left-0 w-full bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 z-40 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {cryptoTicker.concat(cryptoTicker).map((crypto, index) => (
            <div key={index} className="flex items-center space-x-2 mx-6">
              <CryptoIcon symbol={crypto.symbol} className="w-4 h-4" />
              <span className="text-gray-300 text-sm font-medium">{crypto.symbol}</span>
              <span className="text-white text-sm font-bold">{crypto.price}</span>
              <span className={`text-sm font-medium ${crypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4AA]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">{currentLang === 'zh' ? '全球' : 'Global'}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D4AA] to-emerald-400">
                    {currentLang === 'zh' ? '加密货币' : 'Cryptocurrency'}
                  </span>
                  <span className="block text-white">{currentLang === 'zh' ? '担保交易所' : 'Guaranteed Exchange'}</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                  {t.heroDescription}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/wallet')}
                  className="px-8 py-4 bg-gradient-to-r from-[#00D4AA] to-emerald-500 text-black font-bold text-lg rounded-xl hover:from-[#00B894] hover:to-emerald-600 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  {t.startTrading}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-[#00D4AA] text-[#00D4AA] font-bold text-lg rounded-xl hover:bg-[#00D4AA] hover:text-black transition-all">
                  {t.learnMore}
                </button>
              </div>
            </div>
            
            {/* Right Content - Enhanced Visual */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-sm overflow-hidden">
                {/* Trading Interface Mockup */}
                <div className="absolute inset-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-[#00D4AA]" />
                      <span className="text-sm font-semibold text-white">
                        {currentLang === 'zh' ? '实时交易' : 'Live Trading'}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/70 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CryptoIcon symbol="BTC" className="w-6 h-6" />
                        <span className="text-white font-bold">BTC/USDT</span>
                      </div>
                      <div className="text-2xl font-bold text-white">$67,234.56</div>
                      <div className="text-green-400 text-sm">+2.34%</div>
                    </div>
                    
                    <div className="bg-gray-800/70 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CryptoIcon symbol="ETH" className="w-6 h-6" />
                        <span className="text-white font-bold">ETH/USDT</span>
                      </div>
                      <div className="text-2xl font-bold text-white">$3,456.78</div>
                      <div className="text-green-400 text-sm">+1.87%</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 text-sm">
                        {currentLang === 'zh' ? '担保交易状态' : 'Guaranteed Trading Status'}
                      </span>
                      <span className="text-[#00D4AA] text-sm font-semibold">
                        {currentLang === 'zh' ? '已启用' : 'ENABLED'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div className="bg-[#00D4AA] h-2 rounded-full w-full"></div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentLang === 'zh' ? '100% 资金保障' : '100% Fund Protection'}
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-[#00D4AA]/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#00D4AA]" />
                </div>
                <div className="absolute bottom-8 left-8 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00D4AA]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-800">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#00D4AA] mb-2">{t.stats1}</div>
              <div className="text-gray-400 font-medium">{t.stats1Label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#00D4AA] mb-2">{t.stats2}</div>
              <div className="text-gray-400 font-medium">{t.stats2Label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#00D4AA] mb-2">{t.stats3}</div>
              <div className="text-gray-400 font-medium">{t.stats3Label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#00D4AA] mb-2">{t.stats4}</div>
              <div className="text-gray-400 font-medium">{t.stats4Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t.features}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00D4AA] to-emerald-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-[#00D4AA]/50 transition-all hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#00D4AA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.guarantee}</h3>
              <p className="text-gray-400 leading-relaxed">{t.guaranteeDesc}</p>
            </div>
            
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-[#00D4AA]/50 transition-all hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-[#00D4AA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.global}</h3>
              <p className="text-gray-400 leading-relaxed">{t.globalDesc}</p>
            </div>
            
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-[#00D4AA]/50 transition-all hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-[#00D4AA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.security}</h3>
              <p className="text-gray-400 leading-relaxed">{t.securityDesc}</p>
            </div>
            
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-[#00D4AA]/50 transition-all hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#00D4AA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.speed}</h3>
              <p className="text-gray-400 leading-relaxed">{t.speedDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t.liveMarket}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00D4AA] to-emerald-400 mx-auto"></div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700">
              {cryptoTicker.slice(0, 6).map((crypto, index) => (
                <div key={index} className="p-6 hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CryptoIcon symbol={crypto.symbol} className="w-10 h-10" />
                      <div>
                        <div className="text-white font-bold">{crypto.symbol}</div>
                        <div className="text-gray-400 text-sm">{crypto.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">{crypto.price}</div>
                      <div className={`text-sm font-medium ${crypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {crypto.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-r from-[#00D4AA] to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            {currentLang === 'zh' ? '开启您的数字资产之旅' : 'Start Your Digital Asset Journey'}
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            {currentLang === 'zh' 
              ? '加入全球千万用户，体验最安全、最专业的加密货币交易平台' 
              : 'Join millions of global users and experience the safest, most professional cryptocurrency trading platform'
            }
          </p>
          <button 
            onClick={() => router.push('/wallet')}
            className="px-10 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 inline-flex items-center"
          >
            {t.startTrading}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 lg:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-[#00D4AA]" />
                <span className="text-2xl font-bold text-white">BeDAO</span>
                <span className="px-2 py-1 text-xs bg-[#00D4AA] text-black rounded-full font-semibold">PRO</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                {currentLang === 'zh' 
                  ? '全球领先的加密货币担保交易平台，为用户提供最安全、最专业的数字资产交易服务。' 
                  : 'The world\'s leading cryptocurrency guaranteed trading platform, providing users with the safest and most professional digital asset trading services.'
                }
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">
                {currentLang === 'zh' ? '产品服务' : 'Products'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#00D4AA] transition-colors">
                  {currentLang === 'zh' ? '现货交易' : 'Spot Trading'}
                </a></li>
                <li><a href="#" className="hover:text-[#00D4AA] transition-colors">
                  {currentLang === 'zh' ? '担保交易' : 'Guaranteed Trading'}
                </a></li>
                <li><a href="#" className="hover:text-[#00D4AA] transition-colors">
                  {currentLang === 'zh' ? '数字钱包' : 'Digital Wallet'}
                </a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">
                {currentLang === 'zh' ? '支持' : 'Support'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#00D4AA] transition-colors">
                  {currentLang === 'zh' ? '帮助中心' : 'Help Center'}
                </a></li>
                <li><a href="#" className="hover:text-[#00D4AA] transition-colors">
                  {currentLang === 'zh' ? '联系我们' : 'Contact Us'}
                </a></li>
                <li><a href="#" className="hover:text-[#00D4AA] transition-colors">
                  {currentLang === 'zh' ? 'API文档' : 'API Docs'}
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}