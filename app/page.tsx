"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { 
  Shield, 
  Globe, 
  TrendingUp, 
  Users, 
  Lock, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Star,
  BarChart3,
  Wallet,
  CreditCard,
  ChevronRight,
  Menu,
  X,
  Bitcoin,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Redirect authenticated users to chat
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/chat')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: "担保交易保障",
      description: "多重安全机制，资金担保，让每笔交易都有保障"
    },
    {
      icon: Globe,
      title: "全球化服务",
      description: "覆盖全球200+国家和地区，24/7不间断服务"
    },
    {
      icon: TrendingUp,
      title: "专业交易工具",
      description: "实时行情分析，专业K线图表，助您把握市场脉搏"
    },
    {
      icon: Users,
      title: "千万用户信赖",
      description: "全球超过1000万用户的共同选择，交易量行业领先"
    },
    {
      icon: Lock,
      title: "银行级安全",
      description: "采用银行级加密技术，多重身份验证，保障资产安全"
    },
    {
      icon: Zap,
      title: "极速交易",
      description: "毫秒级撮合引擎，订单秒速成交，不错过任何机会"
    }
  ]

  const stats = [
    { number: "1000万+", label: "全球用户" },
    { number: "200+", label: "支持国家" },
    { number: "24/7", label: "客户服务" },
    { number: "99.9%", label: "系统稳定性" }
  ]

  const cryptoList = [
    { symbol: "BTC", name: "Bitcoin", price: "$67,234.56", change: "+2.34%" },
    { symbol: "ETH", name: "Ethereum", price: "$3,456.78", change: "+1.87%" },
    { symbol: "BNB", name: "BNB", price: "$598.32", change: "-0.45%" },
    { symbol: "ADA", name: "Cardano", price: "$0.4567", change: "+3.21%" },
    { symbol: "SOL", name: "Solana", price: "$156.78", change: "+5.67%" },
    { symbol: "DOT", name: "Polkadot", price: "$7.89", change: "+2.10%" }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-teal-900/30" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 170, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 170, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00D4AA] rounded-full opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Mouse Glow Effect */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00D4AA]/20 to-blue-500/20 blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-xl shadow-2xl border-b border-[#00D4AA]/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="h-10 w-10 text-[#00D4AA] group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 h-10 w-10 bg-[#00D4AA]/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-300" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-white tracking-tight">BeDAO</span>
                <div className="px-2 py-1 bg-gradient-to-r from-[#00D4AA] to-blue-500 rounded-full">
                  <span className="text-xs text-white font-bold">PRO</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-[#00D4AA] transition-all duration-300 hover:scale-105 relative group">
                功能特色
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D4AA] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="text-gray-300 hover:text-[#00D4AA] transition-all duration-300 hover:scale-105 relative group">
                关于我们
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D4AA] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#security" className="text-gray-300 hover:text-[#00D4AA] transition-all duration-300 hover:scale-105 relative group">
                安全保障
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D4AA] group-hover:w-full transition-all duration-300"></span>
              </a>
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-gradient-to-r from-[#00D4AA] to-blue-500 hover:from-[#00B894] hover:to-blue-600 text-white px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#00D4AA]/25"
              >
                登录交易
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-[#00D4AA]/20">
            <div className="px-4 py-6 space-y-6">
              <a href="#features" className="block text-gray-300 hover:text-[#00D4AA] transition-colors py-2">功能特色</a>
              <a href="#about" className="block text-gray-300 hover:text-[#00D4AA] transition-colors py-2">关于我们</a>
              <a href="#security" className="block text-gray-300 hover:text-[#00D4AA] transition-colors py-2">安全保障</a>
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="w-full bg-gradient-to-r from-[#00D4AA] to-blue-500 hover:from-[#00B894] hover:to-blue-600 text-white py-4 rounded-full shadow-lg"
              >
                登录交易
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Animated Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 leading-tight">
                <span className="inline-block animate-pulse">全球</span>
                <span className="inline-block bg-gradient-to-r from-[#00D4AA] to-blue-500 bg-clip-text text-transparent animate-bounce">加密货币</span>
              </h1>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#00D4AA] via-blue-500 to-purple-500 bg-clip-text text-transparent bg-300% animate-gradient">
                  担保交易所
                </span>
              </h1>
            </div>
            
            {/* Subtitle with Typewriter Effect */}
            <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
              <span className="inline-block border-r-2 border-[#00D4AA] animate-pulse">
                安全可靠的数字资产交易平台，提供专业的担保交易服务
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="group bg-gradient-to-r from-[#00D4AA] to-blue-500 hover:from-[#00B894] hover:to-blue-600 text-white px-12 py-6 text-xl rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-[#00D4AA]/50"
              >
                <span className="flex items-center">
                  立即登录交易
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
              <Button 
                variant="outline"
                className="group border-2 border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-black px-12 py-6 text-xl rounded-full transform hover:scale-110 transition-all duration-300"
              >
                <span className="flex items-center">
                  了解更多
                  <Globe className="ml-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </Button>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-[#00D4AA]/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-20 w-20 h-20 bg-purple-500/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s' }} />
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00D4AA] to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/20 to-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Crypto Prices - Enhanced */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00D4AA] to-blue-500 bg-clip-text text-transparent mb-4">
              实时加密货币行情
            </h2>
            <p className="text-xl text-gray-400">跟踪全球主要加密货币的实时价格变动</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cryptoList.map((crypto, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-8 border border-gray-800 hover:border-[#00D4AA]/50 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-r from-[#00D4AA] to-blue-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">{crypto.symbol.charAt(0)}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/20 to-blue-500/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xl">{crypto.symbol}</div>
                      <div className="text-gray-400">{crypto.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-xl group-hover:text-[#00D4AA] transition-colors duration-300">
                      {crypto.price}
                    </div>
                    <div className={`text-lg font-semibold ${
                      crypto.change.startsWith('+') 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {crypto.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#00D4AA]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">为什么选择BeDAO</h2>
            <p className="text-xl text-gray-300">专业、安全、可靠的加密货币交易服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-8 border border-slate-700 hover:border-[#00D4AA]/50 transition-all hover:transform hover:scale-105">
                <feature.icon className="h-12 w-12 text-[#00D4AA] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">银行级安全保障</h2>
              <p className="text-xl text-gray-300 mb-8">
                我们采用最先进的安全技术，多层防护机制，确保您的数字资产绝对安全。
              </p>
              <div className="space-y-4">
                {[
                  "SSL加密传输",
                  "多重签名钱包",
                  "冷热钱包分离",
                  "24/7安全监控",
                  "保险基金保障"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#00D4AA]" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:text-center">
              <div className="inline-block p-8 bg-gradient-to-br from-[#00D4AA]/20 to-blue-500/20 rounded-full">
                <Shield className="h-32 w-32 text-[#00D4AA]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#00D4AA] to-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">准备开始您的交易之旅？</h2>
          <p className="text-xl text-white/90 mb-8">
            加入全球数百万用户的行列，体验最安全、最专业的加密货币交易服务
          </p>
          <Button 
            onClick={() => router.push('/wallet')}
            className="bg-white text-[#00D4AA] hover:bg-gray-100 px-8 py-4 text-lg h-auto font-bold"
          >
            立即注册交易
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-[#00D4AA]" />
                <span className="text-2xl font-bold text-white">BeDAO</span>
              </div>
              <p className="text-gray-400">
                全球领先的加密货币担保交易平台
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">产品服务</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">现货交易</a></li>
                <li><a href="#" className="hover:text-white transition-colors">合约交易</a></li>
                <li><a href="#" className="hover:text-white transition-colors">担保交易</a></li>
                <li><a href="#" className="hover:text-white transition-colors">理财服务</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">帮助中心</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">用户指南</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API文档</a></li>
                <li><a href="#" className="hover:text-white transition-colors">费率说明</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系客服</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">关于我们</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">公司介绍</a></li>
                <li><a href="#" className="hover:text-white transition-colors">安全保障</a></li>
                <li><a href="#" className="hover:text-white transition-colors">法律声明</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BeDAO. All rights reserved. 全球加密货币担保交易所</p>
          </div>
        </div>
      </footer>
    </div>
  )
}