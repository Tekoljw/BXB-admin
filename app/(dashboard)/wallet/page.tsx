'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Eye, EyeOff, Plus, ArrowUpRight, ArrowDownLeft, 
  ArrowLeftRight, Wallet, TrendingUp, TrendingDown,
  MoreHorizontal, Settings, CreditCard, Receipt,
  Clock, CheckCircle, AlertTriangle, FileText, User,
  DollarSign, Users, Zap
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

// 账户数据
const walletData = {
  "钱包概览": {
    totalBalance: "1,234.56",
    currency: "USDT",
    balanceChange: "+56.78",
    changePercent: "+4.8%"
  },
  "合约账户": {
    balance: "500.00",
    currency: "USDT"
  },
  "理财账户": {
    balance: "300.00", 
    currency: "USDT"
  },
  "担保账户": {
    balance: "200.00",
    currency: "USDT"
  },
  "佣金账户": {
    balance: "150.00",
    currency: "USDT"
  },
  "BePAY账户": {
    balance: "100.00",
    currency: "USDT"
  }
}

export default function WalletPage() {
  const { isDark } = useTheme()
  const [selectedAccount, setSelectedAccount] = useState("钱包概览")
  const [balanceVisible, setBalanceVisible] = useState(true)

  const accountTabs = ["钱包概览", "合约账户", "理财账户", "担保账户", "佣金账户", "BePAY账户"]

  const renderTabContent = () => {
    switch (selectedAccount) {
      case "钱包概览":
        return (
          <div className="space-y-6">
            {/* 总余额卡片 */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-[#1a1f3a]' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  总资产
                </h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {walletData["钱包概览"].changePercent}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? `$${walletData["钱包概览"].totalBalance}` : '****'}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-600">+${walletData["钱包概览"].balanceChange}</span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>今日收益</span>
                </div>
              </div>
            </div>

            {/* 账户分布 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(walletData).slice(1).map(([account, data]) => (
                <div
                  key={account}
                  className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    isDark ? 'bg-[#1a1f3a] hover:bg-[#252842]' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="space-y-2">
                    <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {account}
                    </div>
                    <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {balanceVisible ? `$${data.balance}` : '****'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "合约账户":
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-[#1a1f3a]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                合约账户
              </h3>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {balanceVisible ? `$${walletData["合约账户"].balance}` : '****'}
              </div>
            </div>
          </div>
        )

      case "理财账户":
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-[#1a1f3a]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                理财账户
              </h3>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {balanceVisible ? `$${walletData["理财账户"].balance}` : '****'}
              </div>
            </div>
          </div>
        )

      case "担保账户":
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-[#1a1f3a]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                担保账户
              </h3>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {balanceVisible ? `$${walletData["担保账户"].balance}` : '****'}
              </div>
            </div>
          </div>
        )

      case "佣金账户":
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-[#1a1f3a]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                佣金账户
              </h3>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {balanceVisible ? `$${walletData["佣金账户"].balance}` : '****'}
              </div>
            </div>
          </div>
        )

      case "BePAY账户":
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-[#1a1f3a]' : 'bg-white'} shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                BePAY账户
              </h3>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {balanceVisible ? `$${walletData["BePAY账户"].balance}` : '****'}
              </div>
            </div>
          </div>
        )

      default:
        return <div>内容加载中...</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1426]">
      <div className="max-w-6xl mx-auto p-6">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            钱包
          </h1>
          
          {/* 余额可见性切换 */}
          <Button
            onClick={() => setBalanceVisible(!balanceVisible)}
            variant="ghost"
            size="sm"
            className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        {/* 账户选择页签 */}
        <div className="flex space-x-1 mb-8 bg-gray-200 dark:bg-[#252842] rounded-lg p-1">
          {accountTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedAccount(tab)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedAccount === tab
                  ? 'bg-white dark:bg-[#1a1f3a] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 渲染选中的页签内容 */}
        {renderTabContent()}
      </div>
    </div>
  )
}