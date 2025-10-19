"use client"

import OperationsLayout from "@/components/operations-layout"
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react"
import { useState } from "react"

export default function MarketConfigPage() {
  const [activeTab, setActiveTab] = useState("pairs")

  const tradingPairs = [
    { id: 1, pair: "BTC/USDT", status: "active", price: "¥328,450", change24h: "+5.32%", volume24h: "¥2.3亿", maker: "0.1%", taker: "0.2%" },
    { id: 2, pair: "ETH/USDT", status: "active", price: "¥18,234", change24h: "+3.21%", volume24h: "¥1.8亿", maker: "0.1%", taker: "0.2%" },
    { id: 3, pair: "BNB/USDT", status: "active", price: "¥2,456", change24h: "-1.45%", volume24h: "¥8,500万", maker: "0.1%", taker: "0.2%" },
    { id: 4, pair: "SOL/USDT", status: "active", price: "¥856", change24h: "+8.76%", volume24h: "¥6,200万", maker: "0.1%", taker: "0.2%" },
    { id: 5, pair: "XRP/USDT", status: "paused", price: "¥4.23", change24h: "+2.14%", volume24h: "¥3,400万", maker: "0.1%", taker: "0.2%" },
  ]

  const dataSourceConfig = [
    { id: 1, source: "Binance API", type: "实时行情", status: "connected", latency: "15ms", lastUpdate: "2秒前" },
    { id: 2, source: "Huobi API", type: "实时行情", status: "connected", latency: "23ms", lastUpdate: "3秒前" },
    { id: 3, source: "OKX API", type: "实时行情", status: "warning", latency: "156ms", lastUpdate: "45秒前" },
    { id: 4, source: "CoinGecko API", type: "参考价格", status: "connected", latency: "89ms", lastUpdate: "5秒前" },
  ]

  const priceAlerts = [
    { id: 1, pair: "BTC/USDT", condition: "价格 > ¥350,000", action: "发送通知", status: "active" },
    { id: 2, pair: "ETH/USDT", condition: "价格 < ¥15,000", action: "发送通知", status: "active" },
    { id: 3, pair: "BTC/USDT", condition: "24h涨幅 > 10%", action: "发送通知 + 风控提醒", status: "active" },
    { id: 4, pair: "SOL/USDT", condition: "价格 > ¥1,000", action: "发送通知", status: "inactive" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">运行中</span>
      case "paused":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">已暂停</span>
      case "inactive":
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">未启用</span>
      case "connected":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center space-x-1"><CheckCircle className="w-3 h-3" /><span>已连接</span></span>
      case "warning":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 flex items-center space-x-1"><AlertTriangle className="w-3 h-3" /><span>异常</span></span>
      case "disconnected":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center space-x-1"><XCircle className="w-3 h-3" /><span>断开</span></span>
      default:
        return null
    }
  }

  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">行情配置管理</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">管理交易对、数据源和行情提醒配置</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>筛选</span>
            </button>
            <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>添加配置</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-custom-green">128</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">交易对总数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">123</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">运行中</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">数据源</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">15</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">价格提醒</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-6 px-6">
              <button
                onClick={() => setActiveTab("pairs")}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "pairs"
                    ? "border-custom-green text-custom-green"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                交易对配置
              </button>
              <button
                onClick={() => setActiveTab("datasource")}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "datasource"
                    ? "border-custom-green text-custom-green"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                数据源管理
              </button>
              <button
                onClick={() => setActiveTab("alerts")}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "alerts"
                    ? "border-custom-green text-custom-green"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                价格提醒
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "pairs" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索交易对..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">交易对</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">当前价格</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h涨跌</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h成交量</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Maker费率</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Taker费率</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {tradingPairs.map((pair) => (
                        <tr key={pair.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          <td className="px-4 py-4 whitespace-nowrap font-medium">{pair.pair}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(pair.status)}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right font-medium">{pair.price}</td>
                          <td className={`px-4 py-4 whitespace-nowrap text-right font-medium ${pair.change24h.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {pair.change24h}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">{pair.volume24h}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">{pair.maker}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">{pair.taker}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <Edit className="w-4 h-4 text-blue-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <Settings className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "datasource" && (
              <div>
                <div className="space-y-4">
                  {dataSourceConfig.map((source) => (
                    <div key={source.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Activity className={`w-8 h-8 ${source.status === 'connected' ? 'text-green-600' : source.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`} />
                        <div>
                          <div className="font-medium">{source.source}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{source.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-400">延迟</div>
                          <div className={`font-medium ${parseInt(source.latency) > 100 ? 'text-red-600' : 'text-green-600'}`}>{source.latency}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-400">更新时间</div>
                          <div className="font-medium flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{source.lastUpdate}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(source.status)}
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "alerts" && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">交易对</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">触发条件</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">执行动作</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {priceAlerts.map((alert) => (
                        <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          <td className="px-4 py-4 whitespace-nowrap font-medium">{alert.pair}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{alert.condition}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{alert.action}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(alert.status)}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <Edit className="w-4 h-4 text-blue-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
