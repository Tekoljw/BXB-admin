"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

export default function HomePage() {
  const { language, setLanguage, theme, setTheme } = useTheme()
  const router = useRouter()
  const [navOpen, setNavOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}></div>
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b transition-colors ${isDark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold">BeDAO</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="#home" className={`transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                {language === 'zh' ? '首页' : 'Home'}
              </Link>
              <Link href="#about" className={`transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                {language === 'zh' ? '关于我们' : 'About'}
              </Link>
              <Link href="#services" className={`transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                {language === 'zh' ? '服务' : 'Services'}
              </Link>
              <Link href="#portfolio" className={`transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                {language === 'zh' ? '案例' : 'Portfolio'}
              </Link>
              <Link href="#team" className={`transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                {language === 'zh' ? '团队' : 'Team'}
              </Link>
              <Link href="#contact" className={`transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                {language === 'zh' ? '联系' : 'Contact'}
              </Link>
            </div>

            {/* Theme Toggle & Language & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <div className="relative group">
                <button className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:bg-opacity-80`}>
                  <span>{language === 'zh' ? '中文' : 'English'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className={`absolute top-full right-0 mt-2 w-32 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <button 
                    onClick={() => changeLang('zh')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    中文
                  </button>
                  <button 
                    onClick={() => changeLang('en')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              <button 
                onClick={handleLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                {language === 'zh' ? '开始使用' : 'Get Started'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleNav}
              className="lg:hidden p-2"
            >
              {navOpen ? (
                <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-700'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-700'}`} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {navOpen && (
            <div className={`lg:hidden border-t transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex flex-col space-y-2 p-4">
                <Link href="#home" className={`py-2 transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                  {language === 'zh' ? '首页' : 'Home'}
                </Link>
                <Link href="#about" className={`py-2 transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                  {language === 'zh' ? '关于我们' : 'About'}
                </Link>
                <Link href="#services" className={`py-2 transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                  {language === 'zh' ? '服务' : 'Services'}
                </Link>
                <Link href="#portfolio" className={`py-2 transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                  {language === 'zh' ? '案例' : 'Portfolio'}
                </Link>
                <Link href="#team" className={`py-2 transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                  {language === 'zh' ? '团队' : 'Team'}
                </Link>
                <Link href="#contact" className={`py-2 transition-colors ${isDark ? 'text-white' : 'text-gray-700'} hover:text-blue-600`}>
                  {language === 'zh' ? '联系' : 'Contact'}
                </Link>
                <div className={`flex items-center space-x-4 pt-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={handleLogin}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                  >
                    {language === 'zh' ? '开始使用' : 'Get Started'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-[size:50px_50px] ${isDark ? 'bg-grid-white/[0.02]' : 'bg-grid-gray-900/[0.04]'}`}></div>
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900' : 'bg-gradient-to-t from-white via-white/80 to-white'}`}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center justify-center mb-8">
              <div className={`backdrop-blur-xl border rounded-full px-6 py-2 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className={`font-medium text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {language === 'zh' ? '🚀 全球领先的数字金融平台' : '🚀 World Leading Digital Financial Platform'}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-6 mb-12">
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className="block mb-2">
                  {language === 'zh' ? '让区块链' : 'Making Blockchain'}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {language === 'zh' ? '更简单安全' : 'Simple & Secure'}
                </span>
              </h1>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'zh' ? 
                  '提供企业级区块链解决方案，助力您的业务数字化转型，开启去中心化金融的无限可能' : 
                  'Providing enterprise-grade blockchain solutions to help your business digital transformation and unlock the infinite possibilities of decentralized finance'
                }
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={handleLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {language === 'zh' ? '开始体验' : 'Get Started'}
              </button>
              <button className={`border-2 px-8 py-4 rounded-full hover:bg-opacity-80 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`}>
                <div className="flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>{language === 'zh' ? '观看演示' : 'Watch Demo'}</span>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">10M+</div>
                <div className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'zh' ? '全球用户' : 'Global Users'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">$50B+</div>
                <div className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'zh' ? '交易量' : 'Trading Volume'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">99.9%</div>
                <div className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'zh' ? '可用性' : 'Uptime'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">150+</div>
                <div className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'zh' ? '支持国家' : 'Countries'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'zh' ? '关于我们' : 'About Us'}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'zh' ? 
                  '我们是区块链技术的先驱者，致力于构建下一代数字金融基础设施，让区块链技术更加平易近人' : 
                  'We are pioneers in blockchain technology, committed to building next-generation digital financial infrastructure to make blockchain more accessible'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'zh' ? '安全可靠' : 'Security First'}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'zh' ? 
                    '采用银行级安全标准，多重签名技术，确保您的数字资产绝对安全' : 
                    'Bank-grade security standards with multi-signature technology to ensure absolute safety of your digital assets'
                  }
                </p>
              </div>

              <div className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'zh' ? '极致性能' : 'High Performance'}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'zh' ? 
                    '毫秒级交易执行，支持百万级并发，为您提供极致的交易体验' : 
                    'Millisecond-level transaction execution supporting millions of concurrent users for ultimate trading experience'
                  }
                </p>
              </div>

              <div className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'zh' ? '全球服务' : 'Global Service'}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'zh' ? 
                    '覆盖全球150+国家和地区，7x24小时不间断服务，随时随地进行交易' : 
                    'Covering 150+ countries and regions worldwide with 24/7 uninterrupted service for trading anytime, anywhere'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'zh' ? '我们的服务' : 'Our Services'}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'zh' ? 
                  '提供全方位的数字金融服务，从基础设施到应用层面，满足不同客户的多样化需求' : 
                  'Providing comprehensive digital financial services from infrastructure to application layer, meeting diverse customer needs'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'zh' ? '智能交易' : 'Smart Trading'}
                    </h3>
                    <p className={`leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'zh' ? 
                        '基于AI算法的智能交易系统，自动分析市场趋势，提供最优交易策略，最大化投资收益' : 
                        'AI-powered smart trading system that automatically analyzes market trends and provides optimal trading strategies to maximize investment returns'
                      }
                    </p>
                    <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{language === 'zh' ? '自动交易执行' : 'Automated trade execution'}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{language === 'zh' ? '风险管理系统' : 'Risk management system'}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{language === 'zh' ? '实时市场分析' : 'Real-time market analysis'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'zh' ? '社交交易' : 'Social Trading'}
                    </h3>
                    <p className={`leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'zh' ? 
                        '连接全球交易者，分享交易策略，跟随顶级交易员，通过社交网络提升交易技能' : 
                        'Connect global traders, share trading strategies, follow top traders, and improve trading skills through social networks'
                      }
                    </p>
                    <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{language === 'zh' ? '跟单交易' : 'Copy trading'}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{language === 'zh' ? '策略分享' : 'Strategy sharing'}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{language === 'zh' ? '社区讨论' : 'Community discussions'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>BeDAO</span>
                </div>
                <p className={`mb-6 max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'zh' ? 
                    '构建下一代数字金融基础设施，让区块链技术更加简单安全，为全球用户提供优质的数字金融服务。' : 
                    'Building next-generation digital financial infrastructure to make blockchain technology simpler and more secure, providing quality digital financial services for global users.'
                  }
                </p>
                <div className="flex space-x-4">
                  <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Mail className="w-4 h-4" />
                    <span>contact@bedao.com</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'zh' ? '产品' : 'Products'}
                </h4>
                <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li><Link href="#" className="hover:text-blue-600 transition-colors">{language === 'zh' ? '智能交易' : 'Smart Trading'}</Link></li>
                  <li><Link href="#" className="hover:text-blue-600 transition-colors">{language === 'zh' ? '数字钱包' : 'Digital Wallet'}</Link></li>
                  <li><Link href="#" className="hover:text-blue-600 transition-colors">{language === 'zh' ? '社交交易' : 'Social Trading'}</Link></li>
                  <li><Link href="#" className="hover:text-blue-600 transition-colors">{language === 'zh' ? 'API服务' : 'API Services'}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'zh' ? '公司' : 'Company'}
                </h4>
                <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li><Link href="#about" className="hover:text-blue-600 transition-colors">{language === 'zh' ? '关于我们' : 'About Us'}</Link></li>
                  <li><Link href="#team" className="hover:text-blue-600 transition-colors">{language === 'zh' ? '团队' : 'Team'}</Link></li>
                  <li><Link href="#" className="hover:text-blue-600 transition-colors">{language === 'zh' ? '职业机会' : 'Careers'}</Link></li>
                  <li><Link href="#contact" className="hover:text-blue-600 transition-colors">{language === 'zh' ? '联系我们' : 'Contact'}</Link></li>
                </ul>
              </div>
            </div>

            <div className={`mt-8 pt-8 border-t text-center ${isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
              <p>&copy; 2025 BeDAO. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}