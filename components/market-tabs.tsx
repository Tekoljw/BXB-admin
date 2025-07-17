"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Star, TrendingUp, TrendingDown } from "lucide-react"

export default function MarketTabs() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeTab, setActiveTab] = useState("自选")
  const [favorites, setFavorites] = useState<string[]>(["BTC/USDT", "ETH/USDT", "BNB/USDT"])
  
  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"
  
  // 自选数据
  const favoriteData = [
    { symbol: "BTC", pair: "BTC/USDT", name: "Bitcoin", price: "45,123.45", change: "+2.34%", changeValue: "+1,023.45", volume: "1.23B", isPositive: true },
    { symbol: "ETH", pair: "ETH/USDT", name: "Ethereum", price: "3,234.56", change: "+1.87%", changeValue: "+59.45", volume: "456M", isPositive: true },
    { symbol: "BNB", pair: "BNB/USDT", name: "BNB", price: "312.89", change: "-0.87%", changeValue: "-2.75", volume: "89M", isPositive: false },
  ]

  // 现货数据
  const spotData = [
    { symbol: "BTC", pair: "BTC/USDT", name: "Bitcoin", price: "45,123.45", change: "+2.34%", changeValue: "+1,023.45", volume: "1.23B", marketCap: "847.2B", isPositive: true },
    { symbol: "ETH", pair: "ETH/USDT", name: "Ethereum", price: "3,234.56", change: "+1.87%", changeValue: "+59.45", volume: "456M", marketCap: "389.1B", isPositive: true },
    { symbol: "BNB", pair: "BNB/USDT", name: "BNB", price: "312.89", change: "-0.87%", changeValue: "-2.75", volume: "89M", marketCap: "50.7B", isPositive: false },
    { symbol: "ADA", pair: "ADA/USDT", name: "Cardano", price: "0.4567", change: "+3.21%", changeValue: "+0.0142", volume: "123M", marketCap: "16B", isPositive: true },
    { symbol: "SOL", pair: "SOL/USDT", name: "Solana", price: "98.76", change: "-1.23%", changeValue: "-1.23", volume: "67M", marketCap: "44B", isPositive: false },
    { symbol: "DOT", pair: "DOT/USDT", name: "Polkadot", price: "7.654", change: "+0.98%", changeValue: "+0.074", volume: "234K", marketCap: "10B", isPositive: true },
    { symbol: "LINK", pair: "LINK/USDT", name: "Chainlink", price: "14.32", change: "-4.3%", changeValue: "-0.64", volume: "45M", marketCap: "8.5B", isPositive: false },
    { symbol: "UNI", pair: "UNI/USDT", name: "Uniswap", price: "5.42", change: "-5.8%", changeValue: "-0.33", volume: "23M", marketCap: "4.2B", isPositive: false },
  ]

  // 合约数据
  const futuresData = [
    { symbol: "BTC", pair: "BTC/USDT", name: "Bitcoin", price: "45,123.45", change: "+2.34%", changeValue: "+1,023.45", volume: "1.23B", openInterest: "2.1B", fundingRate: "0.0045%", isPositive: true },
    { symbol: "ETH", pair: "ETH/USDT", name: "Ethereum", price: "3,234.56", change: "+1.87%", changeValue: "+59.45", volume: "456M", openInterest: "890M", fundingRate: "0.0032%", isPositive: true },
    { symbol: "BNB", pair: "BNB/USDT", name: "BNB", price: "312.89", change: "-0.87%", changeValue: "-2.75", volume: "89M", openInterest: "234M", fundingRate: "-0.0012%", isPositive: false },
    { symbol: "ADA", pair: "ADA/USDT", name: "Cardano", price: "0.4567", change: "+3.21%", changeValue: "+0.0142", volume: "123M", openInterest: "45M", fundingRate: "0.0025%", isPositive: true },
    { symbol: "SOL", pair: "SOL/USDT", name: "Solana", price: "98.76", change: "-1.23%", changeValue: "-1.23", volume: "67M", openInterest: "123M", fundingRate: "-0.0018%", isPositive: false },
    { symbol: "DOT", pair: "DOT/USDT", name: "Polkadot", price: "7.654", change: "+0.98%", changeValue: "+0.074", volume: "234K", openInterest: "12M", fundingRate: "0.0014%", isPositive: true },
  ]

  const toggleFavorite = (pair: string) => {
    setFavorites(prev => 
      prev.includes(pair) 
        ? prev.filter(p => p !== pair)
        : [...prev, pair]
    )
  }

  const renderTable = (data: any[], type: string) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">交易对</th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">价格</th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">24h涨跌</th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">24h成交量</th>
              {type === "现货" && <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">市值</th>}
              {type === "合约" && <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">持仓量</th>}
              {type === "合约" && <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">资金费率</th>}
              <th className="text-center py-3 px-2 text-xs font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((crypto, index) => (
              <tr key={index} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-sm">{crypto.pair}</div>
                    <div className="text-xs text-gray-500">{crypto.name}</div>
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${crypto.price}
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <div className={`font-medium ${crypto.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change}
                  </div>
                  <div className={`text-xs ${crypto.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.isPositive ? '+' : ''}${crypto.changeValue}
                  </div>
                </td>
                <td className="py-3 px-2 text-right text-sm text-gray-500">
                  {crypto.volume}
                </td>
                {type === "现货" && (
                  <td className="py-3 px-2 text-right text-sm text-gray-500">
                    ${crypto.marketCap}
                  </td>
                )}
                {type === "合约" && (
                  <td className="py-3 px-2 text-right text-sm text-gray-500">
                    ${crypto.openInterest}
                  </td>
                )}
                {type === "合约" && (
                  <td className="py-3 px-2 text-right">
                    <div className={`text-sm ${crypto.fundingRate.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                      {crypto.fundingRate}
                    </div>
                  </td>
                )}
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => toggleFavorite(crypto.pair)}
                    className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      favorites.includes(crypto.pair) ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={favorites.includes(crypto.pair) ? 'currentColor' : 'none'} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页签切换 */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {["自选", "现货", "合约"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? isDark
                  ? "bg-white text-black"
                  : "bg-white text-gray-900 shadow-sm"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className={`${cardStyle} rounded-lg p-4`}>
        {activeTab === "自选" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                自选列表
              </h3>
              <div className="text-sm text-gray-500">
                {favoriteData.length} 个交易对
              </div>
            </div>
            {favoriteData.length > 0 ? (
              renderTable(favoriteData, "自选")
            ) : (
              <div className="text-center py-8 text-gray-500">
                暂无自选交易对，请添加关注的交易对
              </div>
            )}
          </div>
        )}

        {activeTab === "现货" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                现货交易
              </h3>
              <div className="text-sm text-gray-500">
                {spotData.length} 个交易对
              </div>
            </div>
            {renderTable(spotData, "现货")}
          </div>
        )}

        {activeTab === "合约" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                合约交易
              </h3>
              <div className="text-sm text-gray-500">
                {futuresData.length} 个交易对
              </div>
            </div>
            {renderTable(futuresData, "合约")}
          </div>
        )}
      </div>
    </div>
  )
}