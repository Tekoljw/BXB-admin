"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Star, Shield, Clock, TrendingUp, TrendingDown, Plus, MessageSquare, Filter, RefreshCw, Users, Zap, Building2, ChevronDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

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

  const currencies = [
    { code: "CNY", name: "人民币", symbol: "¥" },
    { code: "USD", name: "美元", symbol: "$" },
    { code: "EUR", name: "欧元", symbol: "€" },
    { code: "HKD", name: "港币", symbol: "HK$" },
    { code: "JPY", name: "日元", symbol: "¥" },
    { code: "KRW", name: "韩元", symbol: "₩" }
  ]

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


  const cardStyle = isDark
    ? "bg-[#1a1c2e] border border-[#2a2d42] shadow"
    : "bg-white border border-gray-200 shadow"

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
      isFriend: true
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
      isFriend: false
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
      price: "7150.00",
      rate: "7.15",
      payments: ["银行卡", "支付宝", "微信", "Apple Pay"],
      icon: "⚡",
      fees: "1.5%"
    },
    {
      name: "MoonPay", 
      label: "",
      price: "7180.00",
      rate: "7.18",
      payments: ["银行卡", "支付宝", "微信"],
      icon: "🌙",
      fees: "2.1%"
    }
  ]

  const filteredMerchants = c2cMerchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className={`min-h-screen p-6 ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      <div className="max-w-full mx-auto">
        {/* 主要布局 */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* 左侧筛选面板 */}
          <div className="col-span-3">
            <div className={`${cardStyle} rounded-lg p-4`}>
              
              {/* 买入/卖出切换 */}
              <div className="relative mb-4">
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
                              className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700"
                            >
                              {tag}
                            </span>
                          ))}
                          {disadvantages.map((tag, index) => (
                            <span 
                              key={`dis-${index}`}
                              className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700"
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
                  {["现金交易", "银行卡", "支付宝", "微信", "现金上门"].map((payment) => (
                    <button
                      key={payment}
                      onClick={() => {
                        if (selectedPayments.includes(payment)) {
                          setSelectedPayments(prev => prev.filter(p => p !== payment))
                        } else {
                          setSelectedPayments(prev => [...prev, payment])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        selectedPayments.includes(payment)
                          ? "border-black bg-white text-black"
                          : isDark
                            ? "border-[#3a3d4a] bg-[#2a2d42] text-gray-300 hover:bg-[#3a3d4a]"
                            : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {payment}
                    </button>
                  ))}
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
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            maxAmount === amount && !minAmount
                              ? "border-black bg-white text-black"
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
                        className="w-full px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
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
          <div className="col-span-9">
            
            {/* 搜索和操作栏 */}
            <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`} />
                    <input
                      type="text"
                      placeholder="搜索商家或订单"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 w-80 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
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
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg border transition-all ${
                    isDark ? "border-[#3a3d4a] hover:bg-[#2a2d42]" : "border-gray-300 hover:bg-gray-50"
                  }`}>
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg border transition-all ${
                    isDark ? "border-[#3a3d4a] hover:bg-[#2a2d42]" : "border-gray-300 hover:bg-gray-50"
                  }`}>
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  
                  {tradeMode === "C2C" && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
                      <Plus className="w-4 h-4" />
                      <span>发布订单</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 内容展示区域 */}
            <div className={`${cardStyle} rounded-lg`}>
              
              {/* C2C模式 */}
              {tradeMode === "C2C" && (
                <div>
                  {/* 表格头部 */}
                  <div className={`grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-500 ${
                    isDark ? "border-[#3a3d4a]" : "border-gray-200"
                  }`}>
                    <div className="col-span-3">商家</div>
                    <div className="col-span-2">价格(CNY)</div>
                    <div className="col-span-2">限额</div>
                    <div className="col-span-2">支付方式</div>
                    <div className="col-span-3">操作</div>
                  </div>

                  {/* 商家列表 */}
                  <div className="divide-y divide-gray-200 dark:divide-[#3a3d4a]">
                    {filteredMerchants.map((merchant, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#252842] transition-all">
                        
                        {/* 商家信息 */}
                        <div className="col-span-3 flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">
                              {merchant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                {merchant.name}
                              </span>
                              {merchant.verified && (
                                <Shield className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-1 text-xs">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-yellow-600">{merchant.rating}</span>
                              <span className="text-gray-400">({merchant.orders}单)</span>
                            </div>
                          </div>
                        </div>

                        {/* 价格 */}
                        <div className="col-span-2 flex flex-col justify-center">
                          <div className="text-lg font-bold text-custom-green">
                            ¥{merchant.price}
                          </div>
                          <div className="text-xs text-gray-400">
                            {merchant.responseTime}
                          </div>
                        </div>

                        {/* 限额 */}
                        <div className="col-span-2 flex flex-col justify-center">
                          <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                            ¥{merchant.limit}
                          </div>
                          <div className="text-xs text-blue-600">
                            {merchant.note}
                          </div>
                        </div>

                        {/* 支付方式 */}
                        <div className="col-span-2 flex flex-wrap gap-1">
                          {merchant.paymentMethods.map((method, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
                            >
                              {method}
                            </span>
                          ))}
                        </div>

                        {/* 操作 */}
                        <div className="col-span-3 flex items-center space-x-2">
                          <button 
                            className="bg-black text-white p-1.5 rounded text-xs hover:bg-gray-800 transition-all"
                            onClick={() => {
                              if (merchant.isFriend) {
                                console.log('开始对话:', merchant.name)
                              } else {
                                console.log('添加好友:', merchant.name)
                              }
                            }}
                          >
                            {merchant.isFriend ? <MessageSquare className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </button>
                          <button className="bg-custom-green text-white px-3 py-1 rounded text-xs font-medium hover:bg-custom-green/90 transition-all">
                            {activeTab.includes("买入") ? "买入" : "卖出"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 快捷模式 */}
              {tradeMode === "快捷" && (
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
                    选择支付方式
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className={`p-6 rounded-lg border cursor-pointer transition-all hover:border-custom-green hover:shadow-md ${
                        isDark ? "border-[#3a3d4a] hover:bg-[#252842]" : "border-gray-200 hover:bg-gray-50"
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                              <div className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {method.status}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-custom-green">
                              ¥{method.rate}
                            </div>
                            <div className="text-xs text-gray-400">
                              费率: {method.fee}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          限额: ¥{method.limit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OTC模式 */}
              {tradeMode === "OTC" && (
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
                    选择OTC服务商
                  </h3>
                  
                  <div className="space-y-4">
                    {otcProviders.map((provider, index) => (
                      <div key={index} className={`p-6 border rounded-lg cursor-pointer transition-all hover:border-custom-green hover:shadow-md ${
                        isDark ? "border-[#3a3d4a] hover:bg-[#252842]" : "border-gray-200 hover:bg-gray-50"
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{provider.icon}</span>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                  {provider.name}
                                </span>
                                {provider.label && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    {provider.label}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                手续费: {provider.fees}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {provider.payments.map((payment, idx) => (
                                  <span key={idx} className={`text-xs px-2 py-1 rounded ${
                                    isDark ? "bg-[#1a1c2e] text-gray-300" : "bg-gray-100 text-gray-600"
                                  }`}>
                                    {payment}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-custom-green">
                              ¥{provider.price}
                            </div>
                            <div className="text-sm text-gray-400">
                              ¥{provider.rate}/USDT
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}