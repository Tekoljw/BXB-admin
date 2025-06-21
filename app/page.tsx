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
  Star,
  BarChart3,
  Wallet,
  CreditCard,
  ChevronRight,
  Menu,
  X,
  ChevronDown
} from "lucide-react"

// 支付页面翻译
const translations = {
  en: {
    title: "Global Cryptocurrency Guaranteed Trading Exchange",
    subtitle: "Professional, secure, and guaranteed trading solutions for global crypto markets",
    description: "Experience the safest crypto trading platform with guaranteed transactions, advanced security, and 24/7 global support for all your digital asset needs.",
    getStarted: "Start Trading",
    documentation: "Documentation",
    features: "Features",
    featureList: [
      {
        title: "Guaranteed Trading Protection",
        description: "Multi-layer security mechanisms with fund guarantees for every transaction"
      },
      {
        title: "Global Market Coverage",
        description: "Serving 200+ countries and regions with 24/7 uninterrupted service"
      },
      {
        title: "Professional Trading Tools",
        description: "Real-time market analysis and professional charting tools to capture market opportunities"
      },
      {
        title: "Trusted by Millions",
        description: "Over 10 million users worldwide choose our industry-leading trading platform"
      },
      {
        title: "Bank-Grade Security",
        description: "Enterprise-level encryption and multi-factor authentication for asset protection"
      },
      {
        title: "Lightning-Fast Execution",
        description: "Millisecond matching engine for instant order execution and opportunity capture"
      }
    ],
    integration: "Integration",
    apiKey: "API Key",
    getApiKey: "Get Your API Key",
    sampleCode: "Sample Code",
    javascript: "JavaScript",
    python: "Python",
    php: "PHP",
    testimonials: "What Our Clients Say",
    pricing: "Trading Plans",
    pricingPlans: [
      {
        name: "Basic Trader",
        price: "0.1%",
        period: "trading fee",
        features: [
          "Spot trading access",
          "Basic charting tools",
          "Email support",
          "Standard withdrawal limits",
          "Mobile app access"
        ]
      },
      {
        name: "Pro Trader",
        price: "0.08%",
        period: "trading fee",
        features: [
          "Advanced trading features",
          "Priority customer support",
          "Advanced analytics",
          "Higher withdrawal limits",
          "API access",
          "Margin trading"
        ]
      },
      {
        name: "VIP Trader",
        price: "0.05%",
        period: "trading fee",
        features: [
          "Lowest trading fees",
          "Dedicated account manager",
          "Institutional-grade tools",
          "Unlimited withdrawals",
          "Custom API solutions",
          "OTC trading access"
        ]
      }
    ],
    contactUs: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    wallet: "Wallet",
    payment: "Payment",
    news: "News",
    documents: "Documents",
    whitePaper: "White Paper",
    devDocs: "Development DOCS",
    login: "Login"
  },
  zh: {
    title: "全球加密货币担保交易所",
    subtitle: "专业、安全、有保障的全球加密货币交易解决方案",
    description: "体验最安全的加密货币交易平台，提供担保交易、高级安全保护和24/7全球支持，满足您所有数字资产需求。",
    getStarted: "开始交易",
    documentation: "文档",
    features: "功能特点",
    featureList: [
      {
        title: "担保交易保障",
        description: "多重安全机制，资金担保，让每笔交易都有保障"
      },
      {
        title: "全球市场覆盖",
        description: "覆盖全球200+国家和地区，24/7不间断服务"
      },
      {
        title: "专业交易工具",
        description: "实时行情分析，专业K线图表，助您把握市场脉搏"
      },
      {
        title: "千万用户信赖",
        description: "全球超过1000万用户的共同选择，交易量行业领先"
      },
      {
        title: "银行级安全",
        description: "采用银行级加密技术，多重身份验证，保障资产安全"
      },
      {
        title: "极速交易",
        description: "毫秒级撮合引擎，订单秒速成交，不错过任何机会"
      }
    ],
    integration: "集成",
    apiKey: "API密钥",
    getApiKey: "获取您的API密钥",
    sampleCode: "示例代码",
    javascript: "JavaScript",
    python: "Python",
    php: "PHP",
    testimonials: "客户评价",
    pricing: "交易计划",
    pricingPlans: [
      {
        name: "基础交易者",
        price: "0.1%",
        period: "交易手续费",
        features: [
          "现货交易权限",
          "基础图表工具",
          "邮件支持",
          "标准提现限额",
          "手机应用访问"
        ]
      },
      {
        name: "专业交易者",
        price: "0.08%",
        period: "交易手续费",
        features: [
          "高级交易功能",
          "优先客户支持",
          "高级分析工具",
          "更高提现限额",
          "API访问权限",
          "保证金交易"
        ]
      },
      {
        name: "VIP交易者",
        price: "0.05%",
        period: "交易手续费",
        features: [
          "最低交易费率",
          "专属客户经理",
          "机构级交易工具",
          "无限制提现",
          "定制API解决方案",
          "OTC交易权限"
        ]
      }
    ],
    contactUs: "联系我们",
    name: "姓名",
    email: "电子邮件",
    message: "留言",
    send: "发送消息",
    wallet: "钱包",
    payment: "支付",
    news: "新闻",
    documents: "文档",
    whitePaper: "白皮书",
    devDocs: "开发文档",
    login: "登录"
  }
}

// 代码示例
const codeSamples = {
  javascript: `// BeDAO Trading API integration example
const bedao = require('bedao-trading-sdk');

// Initialize with your API key
const client = new bedao.TradingClient('YOUR_API_KEY');

// Place a guaranteed trade order
async function placeGuaranteedOrder() {
  const order = await client.orders.create({
    symbol: 'BTCUSDT',
    side: 'buy',
    type: 'market',
    quantity: 0.001,
    guarantee: true, // Enable guaranteed execution
    timeInForce: 'IOC'
  });
  
  return order;
}`,
  python: `# BeDAO Trading API integration example
import bedao_trading

# Initialize with your API key
client = bedao_trading.TradingClient('YOUR_API_KEY')

# Place a guaranteed trade order
def place_guaranteed_order():
    order = client.orders.create(
        symbol='BTCUSDT',
        side='buy',
        type='market',
        quantity=0.001,
        guarantee=True,  # Enable guaranteed execution
        time_in_force='IOC'
    )
    
    return order`,
  php: `<?php
// BeDAO Trading API integration example
require_once('vendor/autoload.php');

// Initialize with your API key
$client = new BeDAO\\TradingClient('YOUR_API_KEY');

// Place a guaranteed trade order
function placeGuaranteedOrder() {
    $order = $client->orders->create([
        'symbol' => 'BTCUSDT',
        'side' => 'buy',
        'type' => 'market',
        'quantity' => 0.001,
        'guarantee' => true, // Enable guaranteed execution
        'timeInForce' => 'IOC'
    ]);
    
    return $order;
}
?>`
}

// 客户评价
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Crypto Investment Fund",
    content: "BeDAO's guaranteed trading protection gave us the confidence to execute large volume trades. Outstanding platform with exceptional security.",
    avatar: "/assets/images/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Michael Zhang",
    company: "Global Fintech Solutions",
    content: "The 24/7 global support and guaranteed execution has revolutionized our trading operations. Highly recommended for institutional traders.",
    avatar: "/assets/images/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "Digital Asset Management",
    content: "BeDAO's advanced security measures and guaranteed transactions provide unmatched peace of mind for our high-value crypto operations.",
    avatar: "/assets/images/avatar-3.jpg"
  }
]

// 加密货币实时价格数据
const cryptoList = [
  { symbol: "BTC", name: "Bitcoin", price: "$67,234.56", change: "+2.34%" },
  { symbol: "ETH", name: "Ethereum", price: "$3,456.78", change: "+1.87%" },
  { symbol: "BNB", name: "BNB", price: "$598.32", change: "-0.45%" },
  { symbol: "ADA", name: "Cardano", price: "$0.4567", change: "+3.21%" },
  { symbol: "SOL", name: "Solana", price: "$156.78", change: "+5.67%" },
  { symbol: "DOT", name: "Polkadot", price: "$7.89", change: "+2.10%" }
]

export default function LandingPage() {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('zh')
  const [activeTab, setActiveTab] = useState('javascript')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const t = translations[currentLang as keyof typeof translations]

  useEffect(() => {
    // Check local storage for language preference
    const savedLang = localStorage.getItem('lang')
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      setCurrentLang(savedLang)
    }
    
    // Check login status
    const hasToken = localStorage.getItem('token')
    setIsLoggedIn(!!hasToken)

    // Handle scroll for navbar
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

  const handleLogin = () => {
    router.push('/wallet')
  }

  const stats = [
    { number: "1000万+", label: currentLang === 'zh' ? "全球用户" : "Global Users" },
    { number: "200+", label: currentLang === 'zh' ? "支持国家" : "Countries" },
    { number: "24/7", label: currentLang === 'zh' ? "客户服务" : "Support" },
    { number: "99.9%", label: currentLang === 'zh' ? "系统稳定性" : "Uptime" }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900/90 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
              <Shield className="h-8 w-8 text-[#00D4AA]" />
              <span className="text-2xl font-bold text-white">BeDAO</span>
              <span className="text-sm text-[#00D4AA] font-medium">PRO</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => router.push('/wallet')} className="text-white hover:text-[#00D4AA] transition cursor-pointer">
                {t.wallet}
              </button>
              <button onClick={() => router.push('/spot')} className="text-white hover:text-[#00D4AA] transition cursor-pointer">
                {t.payment}
              </button>
              <button onClick={() => router.push('/market')} className="text-white hover:text-[#00D4AA] transition cursor-pointer">
                {t.news}
              </button>
              
              <div className="relative group">
                <button className="text-white hover:text-[#00D4AA] transition flex items-center">
                  {t.documents}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-t-md">
                    {t.whitePaper}
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-b-md">
                    {t.devDocs}
                  </a>
                </div>
              </div>
              
              <div className="relative group">
                <button className="px-3 py-1 rounded bg-gray-800 text-white flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {currentLang.toUpperCase()}
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {currentLang !== 'en' && (
                    <button onClick={() => changeLang('en')} className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-t-md">
                      EN
                    </button>
                  )}
                  {currentLang !== 'zh' && (
                    <button onClick={() => changeLang('zh')} className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-b-md">
                      中文
                    </button>
                  )}
                </div>
              </div>
              
              <button 
                onClick={handleLogin} 
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00D4AA] to-blue-500 text-white hover:from-[#00B894] hover:to-blue-600 transition"
              >
                {t.login}
              </button>
            </div>
            
            <button 
              onClick={() => setNavbarOpen(!navbarOpen)} 
              className="md:hidden text-white focus:outline-none"
            >
              {navbarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {navbarOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <button onClick={() => router.push('/wallet')} className="block py-2 text-white hover:text-[#00D4AA] cursor-pointer">
                {t.wallet}
              </button>
              <button onClick={() => router.push('/spot')} className="block py-2 text-white hover:text-[#00D4AA] cursor-pointer">
                {t.payment}
              </button>
              <button onClick={() => router.push('/market')} className="block py-2 text-white hover:text-[#00D4AA] cursor-pointer">
                {t.news}
              </button>
              <div className="py-2 flex space-x-2">
                <button onClick={() => changeLang('en')} className={`px-3 py-1 rounded ${currentLang === 'en' ? 'bg-[#00D4AA]' : 'bg-gray-700'}`}>
                  EN
                </button>
                <button onClick={() => changeLang('zh')} className={`px-3 py-1 rounded ${currentLang === 'zh' ? 'bg-[#00D4AA]' : 'bg-gray-700'}`}>
                  中文
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00D4AA] to-blue-400">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">{t.subtitle}</p>
              <p className="text-lg text-gray-400 mb-8">{t.description}</p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
                <button 
                  onClick={() => router.push('/wallet')}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00D4AA] to-blue-500 text-white text-lg font-semibold hover:from-[#00B894] hover:to-blue-600 transition"
                >
                  {t.getStarted}
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-[#00D4AA] text-[#00D4AA] text-lg font-semibold hover:bg-[#00D4AA] hover:text-white transition">
                  {t.documentation}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-[#00D4AA]/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Shield className="h-24 w-24 text-[#00D4AA] mx-auto mb-4" />
                  <p className="text-white font-semibold">
                    {currentLang === 'zh' ? '安全担保交易平台' : 'Guaranteed Trading Platform'}
                  </p>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-gradient-to-r from-[#00D4AA] to-blue-500 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -left-8 top-1/2 w-24 h-24 bg-gradient-to-r from-[#00D4AA] to-blue-500 rounded-full opacity-60 blur-xl"></div>
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
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#00D4AA] to-blue-500 opacity-10 rounded-bl-full"></div>
      </section>

      {/* Live Crypto Prices */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            {currentLang === 'zh' ? '实时加密货币行情' : 'Live Cryptocurrency Prices'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoList.map((crypto, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-[#00D4AA]/50 transition-all">
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
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.features}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00D4AA] to-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.featureList.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 transform transition hover:-translate-y-2 hover:shadow-xl border border-gray-700 hover:border-[#00D4AA]/50">
                <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-full flex items-center justify-center mb-6">
                  {index === 0 && <Shield className="w-8 h-8 text-[#00D4AA]" />}
                  {index === 1 && <Globe className="w-8 h-8 text-[#00D4AA]" />}
                  {index === 2 && <TrendingUp className="w-8 h-8 text-[#00D4AA]" />}
                  {index === 3 && <Users className="w-8 h-8 text-[#00D4AA]" />}
                  {index === 4 && <Lock className="w-8 h-8 text-[#00D4AA]" />}
                  {index === 5 && <Zap className="w-8 h-8 text-[#00D4AA]" />}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-900" id="integration">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.integration}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00D4AA] to-blue-500 mx-auto"></div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{t.apiKey}</h3>
                <p className="text-gray-400">YOUR_API_KEY</p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 bg-[#00D4AA] rounded-lg hover:bg-[#00B894] transition">
                {t.getApiKey}
              </button>
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">{t.sampleCode}</h3>
            <div className="bg-gray-900 rounded-t-lg border-b border-gray-700">
              <div className="flex">
                <button 
                  onClick={() => setActiveTab('javascript')}
                  className={`px-4 py-2 ${activeTab === 'javascript' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
                >
                  {t.javascript}
                </button>
                <button 
                  onClick={() => setActiveTab('python')}
                  className={`px-4 py-2 ${activeTab === 'python' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
                >
                  {t.python}
                </button>
                <button 
                  onClick={() => setActiveTab('php')}
                  className={`px-4 py-2 ${activeTab === 'php' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
                >
                  {t.php}
                </button>
              </div>
            </div>
            <pre className="bg-gray-900 p-4 rounded-b-lg overflow-x-auto text-gray-300 text-sm">
              {codeSamples[activeTab as keyof typeof codeSamples]}
            </pre>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.testimonials}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00D4AA] to-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#00D4AA]/20 flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-[#00D4AA]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-900" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00D4AA] to-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-gray-800 rounded-xl p-8 border ${index === 1 ? 'border-[#00D4AA] transform scale-105' : 'border-gray-700'}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[#00D4AA] mb-2">{plan.price}</div>
                  <p className="text-gray-400">{plan.period}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#00D4AA] mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => router.push('/wallet')}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    index === 1 
                      ? 'bg-[#00D4AA] text-white hover:bg-[#00B894]' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {currentLang === 'zh' ? '开始交易' : 'Start Trading'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#00D4AA] to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {currentLang === 'zh' ? '准备开始您的交易之旅？' : 'Ready to Start Your Trading Journey?'}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {currentLang === 'zh' 
              ? '加入全球数百万用户的行列，体验最安全、最专业的加密货币交易服务' 
              : 'Join millions of users worldwide and experience the safest, most professional crypto trading platform'
            }
          </p>
          <button 
            onClick={() => router.push('/wallet')}
            className="bg-white text-[#00D4AA] hover:bg-gray-100 px-8 py-4 text-lg h-auto font-bold rounded-full transition flex items-center mx-auto"
          >
            {currentLang === 'zh' ? '立即注册交易' : 'Start Trading Now'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-[#00D4AA]" />
                <span className="text-2xl font-bold text-white">BeDAO</span>
              </div>
              <p className="text-gray-400">
                {currentLang === 'zh' ? '全球领先的加密货币担保交易平台' : 'Global Leading Cryptocurrency Guaranteed Trading Platform'}
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">
                {currentLang === 'zh' ? '产品服务' : 'Products & Services'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '现货交易' : 'Spot Trading'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '合约交易' : 'Futures Trading'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '担保交易' : 'Guaranteed Trading'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '理财服务' : 'Wealth Management'}
                </a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">
                {currentLang === 'zh' ? '帮助中心' : 'Help Center'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '用户指南' : 'User Guide'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? 'API文档' : 'API Documentation'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '费率说明' : 'Fee Structure'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '联系客服' : 'Customer Support'}
                </a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">
                {currentLang === 'zh' ? '关于我们' : 'About Us'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '公司介绍' : 'Company Info'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '安全保障' : 'Security'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '法律声明' : 'Legal Terms'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === 'zh' ? '隐私政策' : 'Privacy Policy'}
                </a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BeDAO. All rights reserved. {currentLang === 'zh' ? '全球加密货币担保交易所' : 'Global Cryptocurrency Guaranteed Trading Exchange'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}