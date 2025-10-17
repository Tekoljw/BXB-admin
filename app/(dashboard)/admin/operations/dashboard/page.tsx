"use client"

import OperationsLayout from "@/components/operations-layout"
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wallet,
  Globe2,
  Activity,
  Zap,
  Target,
  FileCheck,
  Bell
} from "lucide-react"

export default function DashboardPage() {
  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* 顶部标题和快捷操作 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">总仪表盘</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">实时监控平台运营核心数据</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Clock className="w-4 h-4 inline-block mr-2" />
              今日
            </button>
            <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors">
              导出报表
            </button>
          </div>
        </div>
        
        {/* 核心指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                +12.5%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">¥15,678,900</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">今日交易额</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">较昨日增长</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                +8.2%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,234</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">今日新增用户</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">较昨日增长</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                +5.3%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">45,678</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">活跃用户数</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">今日在线</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-semibold text-red-600">
                <ArrowDown className="w-3 h-3 mr-1" />
                -2.1%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">8,901</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">今日订单量</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">较昨日下降</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                +18.3%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">¥2.45亿</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">总资产规模</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">本月增长</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                +15.7%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">¥234,500</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">平台手续费</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">今日收入</div>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 待办事项 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-500" />
                待办事项
              </h2>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-full font-medium">68</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">审核大额提现申请</span>
                </div>
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">12</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">处理风控警报</span>
                </div>
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">8</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">待审核用户KYC</span>
                </div>
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">45</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">活动效果审核</span>
                </div>
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">3</span>
              </div>
            </div>
          </div>

          {/* 实时交易动态 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                实时交易动态
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">实时更新</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/20">
                    <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">user***123</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">BTC/USDT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">¥125,000</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">刚刚</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 dark:bg-red-900/20">
                    <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">user***456</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ETH/USDT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">¥89,500</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">1分钟前</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/20">
                    <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">user***789</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">BNB/USDT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">¥45,200</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">2分钟前</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 dark:bg-red-900/20">
                    <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">user***321</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">SOL/USDT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">¥32,800</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3分钟前</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/20">
                    <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">user***654</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">BTC/USDT</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">¥156,000</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">5分钟前</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部数据面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 热门交易对 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-custom-green" />
              热门交易对（24h交易量）
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-custom-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-custom-green">#1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">BTC/USDT</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">交易量: ¥12.5亿</div>
                  </div>
                </div>
                <div className="flex items-center text-sm font-semibold text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +3.5%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-custom-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-custom-green">#2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">ETH/USDT</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">交易量: ¥8.9亿</div>
                  </div>
                </div>
                <div className="flex items-center text-sm font-semibold text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +2.1%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-custom-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-custom-green">#3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">BNB/USDT</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">交易量: ¥3.2亿</div>
                  </div>
                </div>
                <div className="flex items-center text-sm font-semibold text-red-600">
                  <ArrowDown className="w-4 h-4 mr-1" />
                  -1.2%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-custom-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-custom-green">#4</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">SOL/USDT</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">交易量: ¥2.1亿</div>
                  </div>
                </div>
                <div className="flex items-center text-sm font-semibold text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +5.8%
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-custom-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-custom-green">#5</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">XRP/USDT</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">交易量: ¥1.8亿</div>
                  </div>
                </div>
                <div className="flex items-center text-sm font-semibold text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +1.3%
                </div>
              </div>
            </div>
          </div>

          {/* 用户地域分布 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Globe2 className="w-5 h-5 mr-2 text-blue-500" />
              用户地域分布
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">中国大陆</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">25,678</span>
                    <span className="text-sm font-semibold text-custom-green">56%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-custom-green h-2 rounded-full transition-all duration-500" style={{ width: '56%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">香港</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">8,901</span>
                    <span className="text-sm font-semibold text-custom-green">19%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-custom-green h-2 rounded-full transition-all duration-500" style={{ width: '19%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">台湾</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">5,432</span>
                    <span className="text-sm font-semibold text-custom-green">12%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-custom-green h-2 rounded-full transition-all duration-500" style={{ width: '12%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">新加坡</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">3,456</span>
                    <span className="text-sm font-semibold text-custom-green">8%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-custom-green h-2 rounded-full transition-all duration-500" style={{ width: '8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">其他</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2,211</span>
                    <span className="text-sm font-semibold text-custom-green">5%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-custom-green h-2 rounded-full transition-all duration-500" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">总用户数</span>
                <span className="text-lg font-bold text-custom-green">45,678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
