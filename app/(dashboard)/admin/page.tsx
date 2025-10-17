"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  Database,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Bell,
  MessageSquare,
  ShoppingBag,
  Wallet,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminPage() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDateRange, setSelectedDateRange] = useState("7days")

  const cardStyle = isDark ? "bg-[#1a1d29] border-[#252842]" : "bg-white border-gray-200"
  const textPrimary = isDark ? "text-white" : "text-gray-900"
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600"

  const stats = [
    {
      title: "总用户数",
      value: "12,458",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "总交易额",
      value: "¥8,456,789",
      change: "+23.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "活跃用户",
      value: "8,234",
      change: "+8.2%",
      trend: "up",
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "待处理事项",
      value: "24",
      change: "-15.3%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ]

  const recentUsers = [
    { id: "U001", name: "张三", email: "zhangsan@example.com", status: "active", joinDate: "2025-10-15", balance: "¥12,450" },
    { id: "U002", name: "李四", email: "lisi@example.com", status: "active", joinDate: "2025-10-14", balance: "¥8,900" },
    { id: "U003", name: "王五", email: "wangwu@example.com", status: "suspended", joinDate: "2025-10-13", balance: "¥0" },
    { id: "U004", name: "赵六", email: "zhaoliu@example.com", status: "active", joinDate: "2025-10-12", balance: "¥34,200" },
  ]

  const recentTransactions = [
    { id: "TX001", user: "张三", type: "充值", amount: "+¥5,000", status: "completed", time: "2小时前" },
    { id: "TX002", user: "李四", type: "提现", amount: "-¥2,500", status: "pending", time: "3小时前" },
    { id: "TX003", user: "王五", type: "交易", amount: "+¥890", status: "completed", time: "5小时前" },
    { id: "TX004", user: "赵六", type: "充值", amount: "+¥10,000", status: "failed", time: "6小时前" },
  ]

  const systemAlerts = [
    { id: 1, type: "warning", message: "系统负载较高，当前CPU使用率85%", time: "10分钟前" },
    { id: 2, type: "info", message: "数据库备份已完成", time: "1小时前" },
    { id: 3, type: "error", message: "支付网关连接异常", time: "2小时前" },
    { id: 4, type: "success", message: "系统更新已成功部署", time: "3小时前" },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={cardStyle}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${textSecondary}`}>{stat.title}</p>
                  <h3 className={`text-2xl font-bold mt-2 ${textPrimary}`}>{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardStyle}>
          <CardHeader>
            <CardTitle className={textPrimary}>最近用户</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-blue-500/20" : "bg-blue-100"}`}>
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className={`font-medium ${textPrimary}`}>{user.name}</p>
                      <p className={`text-sm ${textSecondary}`}>{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${textPrimary}`}>{user.balance}</p>
                    <Badge variant={user.status === "active" ? "default" : "destructive"} className="mt-1">
                      {user.status === "active" ? "活跃" : "暂停"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cardStyle}>
          <CardHeader>
            <CardTitle className={textPrimary}>最近交易</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-green-500/20" : "bg-green-100"}`}>
                      <DollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className={`font-medium ${textPrimary}`}>{tx.user}</p>
                      <p className={`text-sm ${textSecondary}`}>{tx.type} • {tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {tx.amount}
                    </p>
                    <Badge 
                      variant={tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"}
                      className="mt-1"
                    >
                      {tx.status === "completed" ? "完成" : tx.status === "pending" ? "处理中" : "失败"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={cardStyle}>
        <CardHeader>
          <CardTitle className={textPrimary}>系统告警</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center space-x-3 p-3 rounded-lg ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
                {alert.type === "error" && <XCircle className="w-5 h-5 text-red-500" />}
                {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                {alert.type === "success" && <CheckCircle className="w-5 h-5 text-green-500" />}
                {alert.type === "info" && <Bell className="w-5 h-5 text-blue-500" />}
                <div className="flex-1">
                  <p className={textPrimary}>{alert.message}</p>
                  <p className={`text-sm ${textSecondary}`}>{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUserManagement = () => (
    <div className="space-y-4">
      <Card className={cardStyle}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={textPrimary}>用户管理</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
                <input
                  type="text"
                  placeholder="搜索用户..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>用户ID</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>姓名</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>邮箱</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>余额</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>状态</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>注册时间</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>操作</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className={`border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                    <td className={`py-3 px-4 ${textPrimary}`}>{user.id}</td>
                    <td className={`py-3 px-4 ${textPrimary}`}>{user.name}</td>
                    <td className={`py-3 px-4 ${textSecondary}`}>{user.email}</td>
                    <td className={`py-3 px-4 ${textPrimary}`}>{user.balance}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>
                        {user.status === "active" ? "活跃" : "暂停"}
                      </Badge>
                    </td>
                    <td className={`py-3 px-4 ${textSecondary}`}>{user.joinDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTransactionMonitoring = () => (
    <div className="space-y-4">
      <Card className={cardStyle}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={textPrimary}>交易监控</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新
              </Button>
              <select className={`px-3 py-2 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}>
                <option>最近7天</option>
                <option>最近30天</option>
                <option>最近3个月</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
              <p className={`text-sm ${textSecondary}`}>今日交易量</p>
              <p className={`text-2xl font-bold mt-2 ${textPrimary}`}>¥456,789</p>
              <p className="text-sm text-green-500 mt-1">+18.2% 较昨日</p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
              <p className={`text-sm ${textSecondary}`}>待处理交易</p>
              <p className={`text-2xl font-bold mt-2 ${textPrimary}`}>12</p>
              <p className="text-sm text-yellow-500 mt-1">需要审核</p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
              <p className={`text-sm ${textSecondary}`}>失败交易</p>
              <p className={`text-2xl font-bold mt-2 ${textPrimary}`}>3</p>
              <p className="text-sm text-red-500 mt-1">需要关注</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>交易ID</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>用户</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>类型</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>金额</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>状态</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>时间</th>
                  <th className={`text-left py-3 px-4 ${textSecondary}`}>操作</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className={`border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                    <td className={`py-3 px-4 ${textPrimary}`}>{tx.id}</td>
                    <td className={`py-3 px-4 ${textPrimary}`}>{tx.user}</td>
                    <td className={`py-3 px-4 ${textSecondary}`}>{tx.type}</td>
                    <td className={`py-3 px-4 font-medium ${tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {tx.amount}
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"}
                      >
                        {tx.status === "completed" ? "完成" : tx.status === "pending" ? "处理中" : "失败"}
                      </Badge>
                    </td>
                    <td className={`py-3 px-4 ${textSecondary}`}>{tx.time}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={cardStyle}>
          <CardHeader>
            <CardTitle className={textPrimary}>系统配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${textPrimary}`}>维护模式</p>
                <p className={`text-sm ${textSecondary}`}>启用后用户无法访问系统</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${textPrimary}`}>新用户注册</p>
                <p className={`text-sm ${textSecondary}`}>允许新用户注册账号</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${textPrimary}`}>交易功能</p>
                <p className={`text-sm ${textSecondary}`}>启用交易和转账功能</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className={cardStyle}>
          <CardHeader>
            <CardTitle className={textPrimary}>安全设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${textPrimary}`}>双因素认证</p>
                <p className={`text-sm ${textSecondary}`}>要求管理员使用2FA</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${textPrimary}`}>IP白名单</p>
                <p className={`text-sm ${textSecondary}`}>限制管理后台访问IP</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${textPrimary}`}>登录日志</p>
                <p className={`text-sm ${textSecondary}`}>记录所有登录活动</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className={cardStyle}>
          <CardHeader>
            <CardTitle className={textPrimary}>数据管理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              数据库备份
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              导出报表
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              查看日志
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-500">
              <Trash2 className="w-4 h-4 mr-2" />
              清理缓存
            </Button>
          </CardContent>
        </Card>

        <Card className={cardStyle}>
          <CardHeader>
            <CardTitle className={textPrimary}>系统信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className={textSecondary}>系统版本</span>
              <span className={textPrimary}>v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className={textSecondary}>数据库状态</span>
              <Badge variant="default">正常</Badge>
            </div>
            <div className="flex justify-between">
              <span className={textSecondary}>服务器负载</span>
              <span className={textPrimary}>65%</span>
            </div>
            <div className="flex justify-between">
              <span className={textSecondary}>存储使用</span>
              <span className={textPrimary}>45.2 GB / 100 GB</span>
            </div>
            <div className="flex justify-between">
              <span className={textSecondary}>上次更新</span>
              <span className={textSecondary}>2025-10-15</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const tabs = [
    { id: "overview", label: "总览", icon: BarChart3 },
    { id: "users", label: "用户管理", icon: Users },
    { id: "transactions", label: "交易监控", icon: DollarSign },
    { id: "settings", label: "系统设置", icon: Settings },
  ]

  return (
    <div className={`min-h-screen p-6 ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${textPrimary}`}>后台管理系统</h1>
          <p className={`mt-2 ${textSecondary}`}>管理平台用户、交易和系统设置</p>
        </div>

        <div className={`flex items-center space-x-2 mb-6 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? `border-blue-500 ${textPrimary}`
                    : `border-transparent ${textSecondary} hover:${textPrimary}`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {activeTab === "overview" && renderOverview()}
        {activeTab === "users" && renderUserManagement()}
        {activeTab === "transactions" && renderTransactionMonitoring()}
        {activeTab === "settings" && renderSystemSettings()}
      </div>
    </div>
  )
}
