"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Star, Shield, Clock, TrendingUp, TrendingDown, Plus, MessageCircle, Filter, RefreshCw, Users, Zap, Building2, ChevronDown, CreditCard, Smartphone, MapPin, Banknote, Loader2, X } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

// 统一的交易按钮组件
interface TradeButtonProps {
  type: "buy" | "sell"
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

function TradeButton({ type, children, onClick, disabled = false, size = "md", className = "" }: TradeButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs h-8",
    md: "px-4 py-2 text-sm h-10", 
    lg: "px-6 py-3 text-base h-12"
  }
  
  const baseClasses = `
    rounded font-medium transition-all flex items-center justify-center
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
  `
  
  const typeClasses = type === "buy" 
    ? "bg-custom-green text-white hover:bg-custom-green/90 disabled:hover:bg-custom-green"
    : "bg-red-500 text-white hover:bg-red-600 disabled:hover:bg-red-500"
  
  return (
    <button 
      className={`${baseClasses} ${typeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default function USDTTradePage() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("买入USDT")
  const [tradeMode, setTradeMode] = useState("C2C")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("CNY")
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)
  const currencyDropdownRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [displayCount, setDisplayCount] = useState(2)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [otcAmount, setOtcAmount] = useState("")
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [tradeModalAnimating, setTradeModalAnimating] = useState(false)
  const [tradeModalClosing, setTradeModalClosing] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishModalAnimating, setPublishModalAnimating] = useState(false)
  const [publishModalClosing, setPublishModalClosing] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null)
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [tradeAmount, setTradeAmount] = useState("")
  const [totalPrice, setTotalPrice] = useState("")
  const [selectedTradePaymentMethods, setSelectedTradePaymentMethods] = useState<string[]>([])
  const [publishOrderType, setPublishOrderType] = useState<"buy" | "sell">("buy")
  const [publishPrice, setPublishPrice] = useState("")
  const [publishMinAmount, setPublishMinAmount] = useState("")
  const [publishMaxAmount, setPublishMaxAmount] = useState("")
  const [publishPayments, setPublishPayments] = useState<string[]>([])
  const [publishPeriod, setPublishPeriod] = useState("24小时")
  const [customPayment, setCustomPayment] = useState("")
  const [publishCurrency, setPublishCurrency] = useState("CNY")
  const [publishCurrencyDropdownOpen, setPublishCurrencyDropdownOpen] = useState(false)
  
  // 现金上门位置选择
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationModalAnimating, setLocationModalAnimating] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("中国")
  const [selectedCity, setSelectedCity] = useState("北京")
  const [locationSearchTerm, setLocationSearchTerm] = useState("")

  // 支付方式图标映射
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "银行卡":
        return <CreditCard className="w-3 h-3" />
      case "支付宝":
        return <Smartphone className="w-3 h-3" />
      case "微信":
        return <Smartphone className="w-3 h-3" />
      case "现金上门":
      case "现金交易":
        return <MapPin className="w-3 h-3" />
      default:
        return <Banknote className="w-3 h-3" />
    }
  }

  // 排序支付方式，现金上门排第一
  const sortPaymentMethods = (methods: string[]) => {
    return [...methods].sort((a, b) => {
      if (a.includes("现金")) return -1
      if (b.includes("现金")) return 1
      return 0
    })
  }

  const currencies = [
    { code: "CNY", name: "人民币", symbol: "¥" },
    { code: "USD", name: "美元", symbol: "$" },
    { code: "EUR", name: "欧元", symbol: "€" },
    { code: "HKD", name: "港币", symbol: "HK$" },
    { code: "JPY", name: "日元", symbol: "¥" },
    { code: "KRW", name: "韩元", symbol: "₩" }
  ]

  const paymentMethodsByCurrency: Record<string, string[]> = {
    "CNY": ["现金上门", "支付宝", "微信支付", "银行转账"],
    "USD": ["现金上门", "PayPal", "银行转账", "Western Union"],
    "EUR": ["现金上门", "银行转账", "SEPA", "PayPal"],
    "HKD": ["现金上门", "银行转账", "八达通", "支付宝HK"],
    "JPY": ["现金上门", "银行转账", "Line Pay", "PayPay"],
    "KRW": ["现金上门", "银行转账", "카카오페이", "네이버페이"]
  }

  const getCurrentPaymentMethods = () => {
    return paymentMethodsByCurrency[publishCurrency] || paymentMethodsByCurrency["CNY"]
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Auto-select first payment method when currency changes
  useEffect(() => {
    const currentMethods = getCurrentPaymentMethods()
    if (currentMethods.length > 0 && !publishPayments.some(method => currentMethods.includes(method))) {
      setPublishPayments([currentMethods[0]])
    }
  }, [publishCurrency])


  const cardStyle = isDark
    ? "bg-[#1a1d29] border border-[#252842] shadow"
    : "bg-white border border-gray-200 shadow"

  // 位置数据
  const countries = [
    { code: "CN", name: "中国", cities: ["北京", "上海", "广州", "深圳", "杭州", "成都", "重庆", "武汉", "西安", "南京"] },
    { code: "US", name: "美国", cities: ["纽约", "洛杉矶", "芝加哥", "休斯敦", "费城", "凤凰城", "圣安东尼奥", "圣地亚哥", "达拉斯", "圣何塞"] },
    { code: "HK", name: "香港", cities: ["中环", "铜锣湾", "尖沙咀", "旺角", "荃湾", "沙田", "元朗", "屯门", "观塘", "九龙塘"] },
    { code: "JP", name: "日本", cities: ["东京", "大阪", "横滨", "名古屋", "札幌", "神户", "京都", "福冈", "川崎", "埼玉"] },
    { code: "KR", name: "韩国", cities: ["首尔", "釜山", "仁川", "大邱", "大田", "光州", "蔚山", "水原", "城南", "高阳"] }
  ]

  // C2C商家数据
  const c2cMerchants = [
    {
      name: "BitcoinMaster",
      verified: true,
      rating: 4.8,
      orders: 1923,
      price: "7.23",
      note: "要求担保周期12小时",
      limit: "500 - 100000",
      paymentMethods: ["现金交易", "银行卡", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "99.2%",
      isFriend: true,
      cashLocation: { country: "中国", city: "北京" }
    },
    {
      name: "SafeTrader", 
      verified: true,
      rating: 4.9,
      orders: 3521,
      price: "7.22",
      note: "要求担保周期6小时",
      limit: "1000 - 90000",
      paymentMethods: ["银行卡", "微信", "现金上门"],
      responseTime: "剩余 无限制",
      completionRate: "98.8%",
      isFriend: false,
      cashLocation: { country: "中国", city: "上海" }
    },
    {
      name: "CryptoExpert",
      verified: true,
      rating: 4.7,
      orders: 2156,
      price: "7.24",
      note: "要求担保周期8小时",
      limit: "200 - 50000",
      paymentMethods: ["支付宝", "微信"],
      responseTime: "剩余 无限制",
      completionRate: "99.5%",
      isFriend: false
    },
    {
      name: "USDTKing",
      verified: true,
      rating: 4.6,
      orders: 1876,
      price: "7.26",
      note: "要求担保周期10小时",
      limit: "300 - 80000",
      paymentMethods: ["银行卡", "现金上门", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "98.9%",
      isFriend: true,
      cashLocation: { country: "中国", city: "广州" }
    },
    {
      name: "DigitalTrader",
      verified: true,
      rating: 4.5,
      orders: 1432,
      price: "7.25",
      note: "要求担保周期14小时",
      limit: "100 - 60000",
      paymentMethods: ["微信", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "99.1%",
      isFriend: false
    },
    {
      name: "CoinMaster",
      verified: true,
      rating: 4.8,
      orders: 2645,
      price: "7.21",
      note: "要求担保周期4小时",
      limit: "500 - 120000",
      paymentMethods: ["银行卡", "现金交易", "微信", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "99.7%",
      isFriend: false,
      cashLocation: { country: "香港", city: "中环" }
    }
  ]

  // 快捷支付方式
  const paymentMethods = [
    {
      name: "支付宝",
      icon: "💰",
      rate: "7.24",
      fee: "0.1%",
      limit: "100 - 3000",
      status: "可用"
    },
    {
      name: "微信",
      icon: "💬",
      rate: "7.23", 
      fee: "0.15%",
      limit: "100 - 3000",
      status: "可用"
    },
    {
      name: "银行卡",
      icon: "🏦",
      rate: "7.25",
      fee: "0.05%", 
      limit: "500 - 3000",
      status: "可用"
    },
    {
      name: "PayPal",
      icon: "💳",
      rate: "7.20",
      fee: "0.2%",
      limit: "100 - 2000", 
      status: "可用"
    }
  ]

  // OTC服务商
  const otcProviders = [
    {
      name: "Ramp",
      label: "价格最优",
      price: "879.45",
      rate: "7.15",
      payments: ["银行卡", "支付宝", "微信", "Apple Pay"],
      icon: "⚡",
      fees: "1.5%",
      bgColor: "bg-yellow-50 border-yellow-200",
      iconBg: "bg-yellow-500"
    },
    {
      name: "MoonPay", 
      label: "",
      price: "883.14",
      rate: "7.18",
      payments: ["银行卡", "支付宝", "微信"],
      icon: "🌙",
      fees: "2.1%",
      bgColor: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-500"
    },
    {
      name: "Transak",
      label: "",
      price: "885.60",
      rate: "7.20",
      payments: ["银行卡", "支付宝"],
      icon: "🔄",
      fees: "2.3%",
      bgColor: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-500"
    },
    {
      name: "Simplex",
      label: "",
      price: "888.06",
      rate: "7.22",
      payments: ["银行卡", "PayPal"],
      icon: "💎",
      fees: "2.5%",
      bgColor: "bg-red-50 border-red-200",
      iconBg: "bg-red-500"
    }
  ]



  // 加载更多功能
  const handleLoadMore = async () => {
    setIsLoading(true)
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDisplayCount(prev => prev + 3)
    setIsLoading(false)
  }

  // 打开交易弹窗
  const handleOpenTradeModal = (merchant: any, type: "buy" | "sell") => {
    if (tradeModalClosing) return
    setSelectedMerchant(merchant)
    setTradeType(type)
    setTradeAmount("")
    setTotalPrice("")
    setSelectedTradePaymentMethods([])
    setTradeModalClosing(false)
    setShowTradeModal(true)
    requestAnimationFrame(() => {
      setTradeModalAnimating(true)
    })
  }

  // 关闭交易弹窗
  const handleCloseTradeModal = () => {
    if (tradeModalClosing) return
    setTradeModalClosing(true)
    setTradeModalAnimating(false)
    setTimeout(() => {
      setShowTradeModal(false)
      setSelectedMerchant(null)
      setTradeModalClosing(false)
    }, 300)
  }

  // 打开发布订单弹窗
  const handleOpenPublishModal = () => {
    if (publishModalClosing) return
    console.log('Opening publish modal')
    setPublishModalClosing(false)
    setShowPublishModal(true)
    
    // 延迟一帧以确保DOM元素已经渲染
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPublishModalAnimating(true)
      })
    })
    
    setPublishPrice("")
    setPublishMinAmount("")
    setPublishMaxAmount("")
    setPublishPayments([])
    console.log('Modal state set to:', true)
  }

  // 关闭发布订单弹窗
  const handleClosePublishModal = () => {
    if (publishModalClosing) return
    setPublishModalClosing(true)
    setPublishModalAnimating(false)
    
    // 使用更长的延迟以确保动画完成
    setTimeout(() => {
      setShowPublishModal(false)
      setPublishModalClosing(false)
    }, 400)
  }

  // 计算总价
  const calculateTotal = (amount: string, price: string) => {
    const amountNum = parseFloat(amount) || 0
    const priceNum = parseFloat(price) || 0
    return (amountNum * priceNum).toFixed(2)
  }

  // 处理交易按钮点击
  const handleTradeButtonClick = (merchant: any, tradeType: 'buy' | 'sell') => {
    setSelectedMerchant(merchant)
    setTradeType(tradeType)
    setShowTradeModal(true)
  }



  // 自动检测是否应该向外弹出
  const [shouldUseOutwardMode, setShouldUseOutwardMode] = useState(true)
  
  useEffect(() => {
    const checkModalMode = () => {
      const leftSidebarWidth = window.innerWidth * 0.25 // 左侧栏占25%
      const minLeftSidebarWidth = 320 // 最小宽度320px
      const modalWidth = 384 // 模态框宽度384px
      const remainingWidth = window.innerWidth - leftSidebarWidth - modalWidth
      
      // 如果左侧栏已经很小或者剩余空间不足，则向内弹出
      if (leftSidebarWidth < minLeftSidebarWidth || remainingWidth < 600) {
        setShouldUseOutwardMode(false)
      } else {
        setShouldUseOutwardMode(true)
      }
    }
    
    checkModalMode()
    window.addEventListener('resize', checkModalMode)
    return () => window.removeEventListener('resize', checkModalMode)
  }, [])

  // 位置选择模态框处理
  const handleOpenLocationModal = () => {
    setShowLocationModal(true)
    requestAnimationFrame(() => {
      setLocationModalAnimating(true)
    })
  }

  const handleCloseLocationModal = () => {
    setLocationModalAnimating(false)
    setTimeout(() => {
      setShowLocationModal(false)
    }, 300)
  }

  // 处理支付方式变化
  const handlePaymentMethodToggle = (method: string) => {
    if (method === "现金上门") {
      if (selectedPayments.includes(method)) {
        setSelectedPayments(selectedPayments.filter(p => p !== method))
      } else {
        handleOpenLocationModal()
        setSelectedPayments([...selectedPayments, method])
      }
    } else {
      if (selectedPayments.includes(method)) {
        setSelectedPayments(selectedPayments.filter(p => p !== method))
      } else {
        setSelectedPayments([...selectedPayments, method])
      }
    }
  }

  // 获取筛选后的商家
  const getFilteredMerchants = () => {
    return c2cMerchants.filter(merchant => {
      // 支付方式筛选
      if (selectedPayments.length > 0) {
        const hasMatchingPayment = selectedPayments.some(payment => {
          if (payment === "现金上门") {
            return merchant.paymentMethods.some(method => 
              method === "现金上门" || method === "现金交易"
            ) && merchant.cashLocation?.country === selectedCountry && merchant.cashLocation?.city === selectedCity
          }
          return merchant.paymentMethods.includes(payment)
        })
        if (!hasMatchingPayment) return false
      }
      
      // 金额筛选
      if (minAmount) {
        const merchantMin = parseInt(merchant.limit.split(" - ")[0])
        if (merchantMin > parseInt(minAmount)) return false
      }
      
      if (maxAmount) {
        const merchantMax = parseInt(merchant.limit.split(" - ")[1])
        if (merchantMax < parseInt(maxAmount)) return false
      }
      
      return true
    })
  }

  const filteredMerchants = getFilteredMerchants()
  const displayedMerchants = filteredMerchants.slice(0, displayCount)
  const hasMore = displayCount < filteredMerchants.length

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ease-in-out ${isDark ? "bg-background" : "bg-gray-50"} md:p-6 p-0`}
      style={{ 
        marginRight: shouldUseOutwardMode && (showTradeModal || showPublishModal) ? '384px' : '0px',
        transition: 'margin-right 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
        <div className="max-w-full mx-auto">
          {/* 移动端顶部筛选区域 */}
          <div className="md:hidden">
            <div className={`${cardStyle} p-4 rounded-none border-0 border-b`}>
              
              {/* 买入/卖出切换 */}
              <div className="mb-4">
                <div className="relative">
                  <div className="flex bg-gray-200 dark:bg-[#252842] rounded-md p-1">
                    {/* 滑动背景 */}
                    <div
                      className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out ${
                        activeTab === "买入USDT" || activeTab === "买入" ? "bg-custom-green left-1" : "bg-red-500 left-1/2"
                      }`}
                    />

                    {/* 买入按钮 */}
                    <button
                      onClick={() => setActiveTab("买入USDT")}
                      className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                        activeTab === "买入USDT" || activeTab === "买入"
                          ? "text-white"
                          : isDark
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      买入USDT
                    </button>

                    {/* 卖出按钮 */}
                    <button
                      onClick={() => setActiveTab("卖出USDT")}
                      className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                        activeTab === "卖出USDT" || activeTab === "卖出"
                          ? "text-white"
                          : isDark
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      卖出USDT
                    </button>
                  </div>
                </div>
              </div>

              {/* 交易模式切换 */}
              <div className="mb-4">
                <div className="flex space-x-2">
                  {[
                    { mode: "C2C", icon: Users, advantages: ["点对点", "更安全"], disadvantages: ["可能稍慢"] },
                    { mode: "快捷支付", icon: Zap, advantages: ["快速到账", "方便"], disadvantages: ["费用稍高"] },
                    { mode: "OTC", icon: Building2, advantages: ["大额交易", "专业服务"], disadvantages: ["门槛较高"] }
                  ].map(({ mode, icon: Icon, advantages, disadvantages }) => (
                    <button
                      key={mode}
                      onClick={() => setTradeMode(mode)}
                      className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                        tradeMode === mode
                          ? "border-custom-green bg-custom-green/10"
                          : isDark
                            ? "border-[#3a3d4a] bg-[#2a2d42]"
                            : "border-gray-300 bg-gray-100"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{mode}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 法币选择 */}
              <div className="mb-4 relative" ref={currencyDropdownRef}>
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a] text-white hover:bg-[#2a2d42]"
                      : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{currencies.find(c => c.code === selectedCurrency)?.symbol}</span>
                    <span>{currencies.find(c => c.code === selectedCurrency)?.name}</span>
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      currencyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 下拉菜单 */}
                <div 
                  className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border shadow-lg transition-all duration-200 ${
                    currencyDropdownOpen 
                      ? "opacity-100 visible translate-y-0" 
                      : "opacity-0 invisible -translate-y-2"
                  } ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code)
                        setCurrencyDropdownOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedCurrency === currency.code
                          ? isDark
                            ? "bg-custom-green/20 text-custom-green"
                            : "bg-custom-green/10 text-custom-green"
                          : isDark
                            ? "text-gray-300 hover:bg-[#2a2d42]"
                            : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-base">{currency.symbol}</span>
                      <span>{currency.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 筛选按钮 */}
              <div className="flex space-x-2">
                <button 
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                    isDark ? "border-[#3a3d4a] bg-[#2a2d42] text-white" : "border-gray-300 bg-gray-100 text-gray-700"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">筛选</span>
                </button>
                <button 
                  onClick={handleOpenPublishModal}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDark 
                      ? "bg-white text-black hover:bg-gray-200" 
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>发布</span>
                </button>
              </div>

            </div>
          </div>

          {/* 主要布局 */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
          
          {/* 左侧筛选面板 - 仅桌面端显示 */}
          <div className="hidden md:block md:col-span-3">
            <div className={`${cardStyle} rounded-lg p-4`}>
              


              {/* 买入/卖出切换和发布订单 */}
              <div className="mb-4 space-y-3">
                <div className="relative">
                  <div className="flex bg-gray-200 dark:bg-[#252842] rounded-md p-1">
                    {/* 滑动背景 */}
                    <div
                      className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out ${
                        activeTab === "买入USDT" || activeTab === "买入" ? "bg-custom-green left-1" : "bg-red-500 left-1/2"
                      }`}
                    />

                    {/* 买入按钮 */}
                    <button
                      onClick={() => setActiveTab("买入USDT")}
                      className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                        activeTab === "买入USDT" || activeTab === "买入"
                          ? "text-white"
                          : isDark
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      买入USDT
                    </button>

                    {/* 卖出按钮 */}
                    <button
                      onClick={() => setActiveTab("卖出USDT")}
                      className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                        activeTab === "卖出USDT" || activeTab === "卖出"
                          ? "text-white"
                          : isDark
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      卖出USDT
                    </button>
                  </div>
                </div>


              </div>

              {/* 法币选择下拉框 */}
              <div className="mb-4 relative" ref={currencyDropdownRef}>
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a] text-white hover:bg-[#2a2d42]"
                      : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{currencies.find(c => c.code === selectedCurrency)?.symbol}</span>
                    <span>{currencies.find(c => c.code === selectedCurrency)?.name}</span>
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      currencyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 下拉菜单 */}
                <div 
                  className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border shadow-lg transition-all duration-200 ${
                    currencyDropdownOpen 
                      ? "opacity-100 visible translate-y-0" 
                      : "opacity-0 invisible -translate-y-2"
                  } ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code)
                        setCurrencyDropdownOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedCurrency === currency.code
                          ? isDark
                            ? "bg-custom-green/20 text-custom-green"
                            : "bg-custom-green/10 text-custom-green"
                          : isDark
                            ? "text-gray-300 hover:bg-[#2a2d42]"
                            : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">{currency.symbol}</span>
                      <span>{currency.name}</span>
                      <span className="text-xs text-gray-500">({currency.code})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 交易模式 */}
              <div className="mb-4">
                <div className="space-y-2">
                  {[
                    { 
                      mode: "C2C", 
                      icon: Users, 
                      advantages: ["价格灵活", "支付多样"],
                      disadvantages: ["交易时间长", "需要沟通", "风险较高"]
                    },
                    { 
                      mode: "快捷", 
                      icon: Zap, 
                      advantages: ["交易快速", "操作简单", "手续费低"],
                      disadvantages: ["价格固定"]
                    },
                    { 
                      mode: "OTC", 
                      icon: Building2, 
                      advantages: ["大额交易", "专业服务", "安全可靠"],
                      disadvantages: ["门槛较高", "定制化"]
                    }
                  ].map(({ mode, icon: Icon, advantages, disadvantages }) => (
                    <button
                      key={mode}
                      onClick={() => setTradeMode(mode)}
                      className={`w-full px-3 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                        tradeMode === mode
                          ? isDark 
                            ? "border-2 border-custom-green bg-[#1a1c2e]/50 text-white shadow-lg" 
                            : "border-2 border-custom-green bg-custom-green/5 text-gray-900 shadow-lg"
                          : isDark
                            ? "border border-[#3a3d4a] text-gray-300 hover:bg-[#2a2d42] hover:border-custom-green/50"
                            : "border border-gray-200 text-gray-600 hover:border-custom-green hover:bg-gray-50 hover:shadow-md"
                      }`}
                      style={{ transform: 'none' }}
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="font-bold text-left text-base flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span>{mode}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {advantages.map((tag, index) => (
                            <span 
                              key={`adv-${index}`}
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                isDark 
                                  ? "bg-green-900/50 text-green-300" 
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                          {disadvantages.map((tag, index) => (
                            <span 
                              key={`dis-${index}`}
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                isDark 
                                  ? "bg-red-900/50 text-red-300" 
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 筛选支付方式 */}
              <div className="mb-4">
                <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                  筛选支付方式
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sortPaymentMethods(["现金交易", "银行卡", "支付宝", "微信", "现金上门"]).map((payment) => {
                    const isCash = payment.includes("现金")
                    return (
                      <button
                        key={payment}
                        onClick={() => handlePaymentMethodToggle(payment)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 flex items-center gap-1 ${
                          selectedPayments.includes(payment)
                            ? "border-custom-green bg-custom-green/10 text-custom-green"
                            : isCash
                              ? isDark
                                ? "border-orange-700 bg-orange-900/50 text-orange-300 hover:bg-orange-900/70"
                                : "border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100"
                              : isDark
                                ? "border-[#3a3d4a] bg-[#2a2d42] text-gray-300 hover:bg-[#3a3d4a]"
                                : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {getPaymentIcon(payment)}
                        {payment}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 筛选交易金额 */}
              <div className="mb-4">
                <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                  筛选交易金额
                </h3>
                <div className="space-y-3">
                  {/* 快捷金额 */}
                  <div>
                    <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>快捷金额</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["1000", "5000", "10000", "50000"].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setMinAmount("")
                            setMaxAmount(amount)
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border-2 ${
                            maxAmount === amount && !minAmount
                              ? "border-custom-green bg-custom-green/10 text-custom-green"
                              : isDark
                                ? "border-[#3a3d4a] bg-[#2a2d42] text-gray-300 hover:bg-[#3a3d4a]"
                                : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {amount} USDT
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 自定义金额 */}
                  <div>
                    <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>自定义范围</p>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="最小 USDT"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                          isDark
                            ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                        }`}
                      />
                      <input
                        type="number"
                        placeholder="最大 USDT"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                          isDark
                            ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                        }`}
                      />
                      <button
                        onClick={() => {
                          // Apply filter logic here
                          console.log('Filtering with amounts:', minAmount, maxAmount)
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
                      >
                        筛选
                      </button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="md:col-span-9">
            
            {/* 搜索和操作栏 - 仅桌面端显示 */}
            <div className={`hidden md:block ${cardStyle} rounded-lg p-4 mb-6`}>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="text"
                    placeholder="搜索商家或订单"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                    }`}
                  />
                </div>
                
                {/* 排序下拉框 */}
                <select
                  className={`px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a] text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="price">价格排序</option>
                  <option value="time">时间排序</option>
                  <option value="reputation">信誉排序</option>
                </select>
                
                <button className={`p-2 rounded-lg border transition-all ${
                  isDark ? "border-[#3a3d4a] hover:bg-[#2a2d42]" : "border-gray-300 hover:bg-gray-50"
                }`}>
                  <RefreshCw className="w-4 h-4" />
                </button>
                
                {tradeMode === "C2C" && (
                  <button 
                    onClick={handleOpenPublishModal}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isDark 
                        ? "bg-white text-black hover:bg-gray-200" 
                        : isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>发布订单</span>
                  </button>
                )}
              </div>
            </div>

            {/* 内容展示区域 */}
            <div className={`${cardStyle} md:rounded-lg`}>
              
              {/* C2C模式 */}
              {tradeMode === "C2C" && (
                <div className="divide-y divide-gray-200 dark:divide-[#3a3d4a]">
                  {/* 商家卡片列表 */}
                  {displayedMerchants.map((merchant, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-[#252842] transition-all">
                      
                      {/* 桌面端布局 */}
                      <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                        {/* 商家信息 */}
                        <div className="col-span-3 flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-300">
                              {merchant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                {merchant.name}
                              </span>
                              {merchant.verified && (
                                <Shield className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                {merchant.rating}
                              </div>
                              <span>•</span>
                              <span>{merchant.orders}单</span>
                            </div>
                          </div>
                        </div>

                        {/* 价格 */}
                        <div className="col-span-2">
                          <div className="text-lg font-bold text-custom-green">¥{merchant.price}</div>
                          <div className="text-xs text-gray-400">{merchant.responseTime}</div>
                        </div>

                        {/* 限额 */}
                        <div className="col-span-2">
                          <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                            ¥{merchant.limit}
                          </div>
                          <div className="text-xs text-blue-600">{merchant.note}</div>
                        </div>

                        {/* 支付方式 */}
                        <div className="col-span-3">
                          <div className="flex flex-wrap gap-1">
                            {sortPaymentMethods(merchant.paymentMethods).slice(0, 2).map((method, index) => {
                              const isCash = method.includes("现金")
                              return (
                                <span 
                                  key={index}
                                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                    isCash 
                                      ? "bg-orange-100 text-orange-800 border border-orange-200 font-medium" 
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {getPaymentIcon(method)}
                                  {method}
                                  {isCash && merchant.cashLocation && (
                                    <span className="ml-1 text-xs text-orange-600">
                                      ({merchant.cashLocation.city})
                                    </span>
                                  )}
                                </span>
                              )
                            })}
                            {merchant.paymentMethods.length > 2 && (
                              <span className="text-xs text-gray-500">+{merchant.paymentMethods.length - 2}</span>
                            )}
                          </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="col-span-2 flex items-center justify-end space-x-2">
                          <button 
                            className={`border px-2 py-1.5 rounded text-xs transition-all h-8 flex items-center justify-center ${
                              isDark 
                                ? "bg-white border-white text-black hover:bg-gray-200" 
                                : "bg-black border-black text-white hover:bg-gray-800"
                            }`}
                          >
                            <MessageCircle className="w-3 h-3" />
                          </button>
                          <TradeButton 
                            type={activeTab === "买入USDT" ? "buy" : "sell"}
                            onClick={() => handleTradeButtonClick(merchant, activeTab === "买入USDT" ? "buy" : "sell")}
                            size="sm"
                            className="min-w-12"
                          >
                            {activeTab === "买入USDT" ? "买入" : "卖出"}
                          </TradeButton>
                        </div>
                      </div>

                      {/* 移动端布局 */}
                      <div className="md:hidden">
                        {/* 顶部商家信息行 */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-300">
                                {merchant.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-1">
                                <span className={`text-base font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                  {merchant.name}
                                </span>
                                {merchant.verified && (
                                  <Shield className="w-4 h-4 text-blue-500" />
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                  {merchant.rating}
                                </div>
                                <span>•</span>
                                <span>{merchant.orders}单</span>
                                <span>•</span>
                                <span>{merchant.completionRate}</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            className={`p-2 rounded-lg border transition-all ${
                              isDark 
                                ? "bg-white border-white text-black hover:bg-gray-200" 
                                : "bg-black border-black text-white hover:bg-gray-800"
                            }`}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>

                        {/* 价格和限额行 */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div>
                              <div className="text-xs text-gray-400 mb-1">价格</div>
                              <div className="text-xl font-bold text-custom-green">¥{merchant.price}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">限额</div>
                              <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                ¥{merchant.limit}
                              </div>
                            </div>
                          </div>
                          <TradeButton 
                            type={activeTab === "买入USDT" ? "buy" : "sell"}
                            onClick={() => handleTradeButtonClick(merchant, activeTab === "买入USDT" ? "buy" : "sell")}
                            size="md"
                            className="min-w-20"
                          >
                            {activeTab === "买入USDT" ? "买入" : "卖出"}
                          </TradeButton>
                        </div>

                        {/* 支付方式 */}
                        <div className="mb-2">
                          <div className="flex flex-wrap gap-1">
                            {sortPaymentMethods(merchant.paymentMethods).map((method, index) => {
                              const isCash = method.includes("现金")
                              return (
                                <span 
                                  key={index}
                                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                    isCash 
                                      ? "bg-orange-100 text-orange-800 border border-orange-200 font-medium" 
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {getPaymentIcon(method)}
                                  {method}
                                  {isCash && merchant.cashLocation && (
                                    <span className="ml-1 text-xs text-orange-600">
                                      ({merchant.cashLocation.city})
                                    </span>
                                  )}
                                </span>
                              )
                            })}
                          </div>
                        </div>

                        {/* 备注信息 */}
                        <div className="text-xs text-blue-600">{merchant.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
