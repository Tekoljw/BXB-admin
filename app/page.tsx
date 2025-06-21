"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-[#00D4AA]" />
              <span className="text-2xl font-bold text-white">BeDAO</span>
              <span className="text-sm text-[#00D4AA] font-medium">PRO</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">功能特色</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">关于我们</a>
              <a href="#security" className="text-gray-300 hover:text-white transition-colors">安全保障</a>
              <Button 
                onClick={() => router.push('/wallet')}
                className="bg-[#00D4AA] hover:bg-[#00B894] text-white px-6 py-2"
              >
                开始交易
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
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-white">功能特色</a>
              <a href="#about" className="block text-gray-300 hover:text-white">关于我们</a>
              <a href="#security" className="block text-gray-300 hover:text-white">安全保障</a>
              <Button 
                onClick={() => router.push('/wallet')}
                className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-white"
              >
                开始交易
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              全球加密货币
              <span className="text-[#00D4AA] block">担保交易所</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              安全可靠的数字资产交易平台，提供专业的担保交易服务，让您的每一笔交易都有保障
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push('/wallet')}
                className="bg-[#00D4AA] hover:bg-[#00B894] text-white px-8 py-4 text-lg h-auto"
              >
                立即开始交易
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg h-auto"
              >
                了解更多
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#00D4AA] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Crypto Prices */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">实时加密货币行情</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoList.map((crypto, index) => (
              <div key={index} className="bg-slate-900/80 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#00D4AA] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{crypto.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{crypto.symbol}</div>
                      <div className="text-gray-400 text-sm">{crypto.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{crypto.price}</div>
                    <div className={`text-sm ${crypto.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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