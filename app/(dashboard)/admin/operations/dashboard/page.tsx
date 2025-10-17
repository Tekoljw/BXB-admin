import OperationsLayout from "@/components/operations-layout"
import { 
  LayoutDashboard, 
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
  // 核心指标数据
  const coreMetrics = [
    { 
      label: "今日交易额", 
      value: "¥15,678,900", 
      change: "+12.5%", 
      trend: "up", 
      icon: DollarSign,
      color: "green",
      description: "较昨日增长" 
    },
    { 
      label: "今日新增用户", 
      value: "1,234", 
      change: "+8.2%", 
      trend: "up", 
      icon: Users,
      color: "blue",
      description: "较昨日增长" 
    },
    { 
      label: "活跃用户数", 
      value: "45,678", 
      change: "+5.3%", 
      trend: "up", 
      icon: TrendingUp,
      color: "purple",
      description: "今日在线" 
    },
    { 
      label: "今日订单量", 
      value: "8,901", 
      change: "-2.1%", 
      trend: "down", 
      icon: ShoppingCart,
      color: "orange",
      description: "较昨日下降" 
    },
    { 
      label: "总资产规模", 
      value: "¥2.45亿", 
      change: "+18.3%", 
      trend: "up", 
      icon: Wallet,
      color: "indigo",
      description: "本月增长" 
    },
    { 
      label: "平台手续费", 
      value: "¥234,500", 
      change: "+15.7%", 
      trend: "up", 
      icon: Target,
      color: "pink",
      description: "今日收入" 
    }
  ]

  // 待办事项
  const pendingTasks = [
    { id: 1, title: "审核大额提现申请", count: 12, priority: "high", icon: FileCheck },
    { id: 2, title: "处理风控警报", count: 8, priority: "high", icon: AlertTriangle },
    { id: 3, title: "待审核用户KYC", count: 45, priority: "medium", icon: Users },
    { id: 4, title: "活动效果审核", count: 3, priority: "low", icon: CheckCircle }
  ]

  // 实时交易动态
  const realtimeTrades = [
    { user: "user***123", pair: "BTC/USDT", amount: "¥125,000", type: "buy", time: "刚刚" },
    { user: "user***456", pair: "ETH/USDT", amount: "¥89,500", type: "sell", time: "1分钟前" },
    { user: "user***789", pair: "BNB/USDT", amount: "¥45,200", type: "buy", time: "2分钟前" },
    { user: "user***321", pair: "SOL/USDT", amount: "¥32,800", type: "sell", time: "3分钟前" },
    { user: "user***654", pair: "BTC/USDT", amount: "¥156,000", type: "buy", time: "5分钟前" }
  ]

  // 热门交易对
  const topPairs = [
    { pair: "BTC/USDT", volume: "¥12.5亿", change: "+3.5%", trend: "up" },
    { pair: "ETH/USDT", volume: "¥8.9亿", change: "+2.1%", trend: "up" },
    { pair: "BNB/USDT", volume: "¥3.2亿", change: "-1.2%", trend: "down" },
    { pair: "SOL/USDT", volume: "¥2.1亿", change: "+5.8%", trend: "up" },
    { pair: "XRP/USDT", volume: "¥1.8亿", change: "+1.3%", trend: "up" }
  ]

  // 用户地域分布
  const userRegions = [
    { region: "中国大陆", users: 25678, percentage: 56 },
    { region: "香港", users: 8901, percentage: 19 },
    { region: "台湾", users: 5432, percentage: 12 },
    { region: "新加坡", users: 3456, percentage: 8 },
    { region: "其他", users: 2211, percentage: 5 }
  ]

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      green: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
      pink: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
    }
    return colors[color] || colors.green
  }

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
          {coreMetrics.map((metric, index) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${getColorClass(metric.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center text-xs font-semibold ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{metric.description}</div>
              </div>
            )
          })}
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
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-full font-medium">
                {pendingTasks.reduce((sum, task) => sum + task.count, 0)}
              </span>
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task) => {
                const Icon = task.icon
                return (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                        task.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                        'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{task.title}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                      'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    }`}>
                      {task.count}
                    </span>
                  </div>
                )
              })}
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
              {realtimeTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      trade.type === 'buy' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      {trade.type === 'buy' ? (
                        <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{trade.user}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{trade.pair}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{trade.amount}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{trade.time}</div>
                  </div>
                </div>
              ))}
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
              {topPairs.map((pair, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-custom-green/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-custom-green">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{pair.pair}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">交易量: {pair.volume}</div>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm font-semibold ${
                    pair.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {pair.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {pair.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 用户地域分布 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Globe2 className="w-5 h-5 mr-2 text-blue-500" />
              用户地域分布
            </h2>
            <div className="space-y-4">
              {userRegions.map((region, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{region.region}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{region.users.toLocaleString()}</span>
                      <span className="text-sm font-semibold text-custom-green">{region.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-custom-green h-2 rounded-full transition-all duration-500"
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">总用户数</span>
                <span className="text-lg font-bold text-custom-green">
                  {userRegions.reduce((sum, r) => sum + r.users, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
