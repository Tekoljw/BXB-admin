import OperationsLayout from "@/components/operations-layout"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  Filter,
  CreditCard,
  Wallet,
  Building2,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from "lucide-react"

export default function FundsAnalysisPage() {
  // 核心指标数据
  const summaryData = {
    todayDeposit: { value: "¥8,456,320", change: "+15.8%", trend: "up", count: 1245 },
    todayWithdraw: { value: "¥6,234,580", change: "-8.3%", trend: "down", count: 892 },
    netFlow: { value: "¥2,221,740", change: "+52.3%", trend: "up" },
    avgDeposit: { value: "¥6,792", change: "+3.2%", trend: "up" },
    avgWithdraw: { value: "¥6,989", change: "-2.1%", trend: "down" },
    totalBalance: { value: "¥145.8亿", change: "+8.7%", trend: "up" }
  }

  // 支付方式分布
  const paymentMethods = [
    { method: "银行卡", depositCount: 856, depositAmount: "¥5,234,500", withdrawCount: 623, withdrawAmount: "¥4,123,600", icon: CreditCard, color: "blue" },
    { method: "数字钱包", depositCount: 234, depositAmount: "¥2,123,400", withdrawCount: 189, withdrawAmount: "¥1,456,800", icon: Wallet, color: "purple" },
    { method: "第三方支付", depositCount: 155, depositAmount: "¥1,098,420", withdrawCount: 80, withdrawAmount: "¥654,180", icon: Zap, color: "green" }
  ]

  // 大额交易记录
  const largeTransactions = [
    { id: "D2024012001", user: "user***3456", type: "deposit", amount: "¥500,000", method: "银行卡", status: "completed", time: "10:23:45" },
    { id: "W2024012002", user: "user***7890", type: "withdraw", amount: "¥350,000", method: "银行卡", status: "pending", time: "09:45:12" },
    { id: "D2024012003", user: "user***1234", type: "deposit", amount: "¥280,000", method: "数字钱包", status: "completed", time: "08:12:33" },
    { id: "W2024012004", user: "user***5678", type: "withdraw", amount: "¥200,000", method: "银行卡", status: "processing", time: "07:56:21" },
    { id: "D2024012005", user: "user***9012", type: "deposit", amount: "¥180,000", method: "第三方支付", status: "completed", time: "06:34:10" }
  ]

  // 每日数据趋势（最近7天）
  const dailyData = [
    { date: "01-14", deposit: 7234580, withdraw: 5123490, net: 2111090 },
    { date: "01-15", deposit: 8123450, withdraw: 5896320, net: 2227130 },
    { date: "01-16", deposit: 7456890, withdraw: 6234100, net: 1222790 },
    { date: "01-17", deposit: 9123670, withdraw: 5678920, net: 3444750 },
    { date: "01-18", deposit: 8567320, withdraw: 6123450, net: 2443870 },
    { date: "01-19", deposit: 7890450, withdraw: 5934680, net: 1955770 },
    { date: "01-20", deposit: 8456320, withdraw: 6234580, net: 2221740 }
  ]

  // 时段分布
  const hourlyDistribution = [
    { hour: "00-04", deposit: 234, withdraw: 123 },
    { hour: "04-08", deposit: 456, withdraw: 289 },
    { hour: "08-12", deposit: 789, withdraw: 534 },
    { hour: "12-16", deposit: 1234, withdraw: 892 },
    { hour: "16-20", deposit: 1567, withdraw: 1123 },
    { hour: "20-24", deposit: 892, withdraw: 678 }
  ]

  const formatCurrency = (value: number) => {
    return `¥${(value / 10000).toFixed(2)}万`
  }

  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* 页面标题和筛选 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">出入金分析报表</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">实时监控资金流入流出情况</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>今日</span>
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>筛选</span>
            </button>
            <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>导出</span>
            </button>
          </div>
        </div>
        
        {/* 核心指标汇总 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                {summaryData.todayDeposit.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{summaryData.todayDeposit.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">今日入金总额</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">{summaryData.todayDeposit.count}笔交易</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex items-center text-xs font-semibold text-red-600">
                <ArrowDown className="w-3 h-3 mr-1" />
                {summaryData.todayWithdraw.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{summaryData.todayWithdraw.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">今日出金总额</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">{summaryData.todayWithdraw.count}笔交易</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                {summaryData.netFlow.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{summaryData.netFlow.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">净入金额</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">入金 - 出金</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                {summaryData.avgDeposit.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{summaryData.avgDeposit.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">平均入金额</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">单笔平均值</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex items-center text-xs font-semibold text-red-600">
                <ArrowDown className="w-3 h-3 mr-1" />
                {summaryData.avgWithdraw.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{summaryData.avgWithdraw.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">平均出金额</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">单笔平均值</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex items-center text-xs font-semibold text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                {summaryData.totalBalance.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{summaryData.totalBalance.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">平台总余额</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">所有用户余额</div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 出入金趋势图 */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">出入金趋势（最近7天）</h2>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>入金</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>出金</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>净流入</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {dailyData.map((day, index) => {
                const maxValue = Math.max(...dailyData.map(d => Math.max(d.deposit, d.withdraw)))
                const depositWidth = (day.deposit / maxValue) * 100
                const withdrawWidth = (day.withdraw / maxValue) * 100
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400 w-12">{day.date}</span>
                      <span className="text-green-600 font-medium">{formatCurrency(day.deposit)}</span>
                      <span className="text-red-600 font-medium">{formatCurrency(day.withdraw)}</span>
                      <span className="text-blue-600 font-medium">{formatCurrency(day.net)}</span>
                    </div>
                    <div className="relative h-6 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                      <div 
                        className="absolute left-0 h-full bg-green-500/60 rounded transition-all duration-500"
                        style={{ width: `${depositWidth}%` }}
                      ></div>
                      <div 
                        className="absolute left-0 h-full bg-red-500/60 rounded transition-all duration-500"
                        style={{ width: `${withdrawWidth}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 时段分布 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4">交易时段分布</h2>
            <div className="space-y-4">
              {hourlyDistribution.map((period, index) => {
                const total = period.deposit + period.withdraw
                const depositPercent = (period.deposit / total) * 100
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium">{period.hour}</span>
                      <span className="text-gray-500 dark:text-gray-400">{total}笔</span>
                    </div>
                    <div className="flex h-2 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                      <div 
                        className="bg-green-500 transition-all duration-500"
                        style={{ width: `${depositPercent}%` }}
                      ></div>
                      <div 
                        className="bg-red-500 transition-all duration-500"
                        style={{ width: `${100 - depositPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
                      <span>入金 {period.deposit}</span>
                      <span>出金 {period.withdraw}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 支付方式分布 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">支付方式分布</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      method.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                      method.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' :
                      'bg-green-100 dark:bg-green-900/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        method.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        method.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                        'text-green-600 dark:text-green-400'
                      }`} />
                    </div>
                    <div className="font-semibold">{method.method}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">入金</span>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{method.depositAmount}</div>
                        <div className="text-xs text-gray-400">{method.depositCount}笔</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">出金</span>
                      <div className="text-right">
                        <div className="font-semibold text-red-600">{method.withdrawAmount}</div>
                        <div className="text-xs text-gray-400">{method.withdrawCount}笔</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 大额交易监控 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              大额交易监控（≥¥100,000）
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">今日共 {largeTransactions.length} 笔</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">交易编号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">用户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">支付方式</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {largeTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{tx.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tx.type === 'deposit' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                      }`}>
                        {tx.type === 'deposit' ? '入金' : '出金'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${
                        tx.status === 'completed' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                          : tx.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                          : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                      }`}>
                        {tx.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {tx.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {tx.status === 'processing' && <Clock className="w-3 h-3 mr-1" />}
                        {tx.status === 'completed' ? '已完成' : tx.status === 'pending' ? '待审核' : '处理中'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-custom-green hover:underline">查看详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
