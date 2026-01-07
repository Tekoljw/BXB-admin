"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Search, 
  Download,
  Eye,
  Clock,
  User,
  Monitor,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LogEntry {
  id: string
  type: "operation" | "login" | "security" | "error"
  level: "info" | "success" | "warning" | "error"
  action: string
  module: string
  operator: string
  operatorId: string
  ip: string
  location: string
  device: string
  browser: string
  description: string
  requestData?: string
  responseData?: string
  createdAt: string
}

const mockLogs: LogEntry[] = [
  {
    id: "LOG001",
    type: "operation",
    level: "success",
    action: "创建用户",
    module: "用户管理",
    operator: "admin",
    operatorId: "U001",
    ip: "192.168.1.100",
    location: "中国 上海",
    device: "Windows 11",
    browser: "Chrome 120",
    description: "创建新用户账号 user@example.com",
    requestData: '{"email":"user@example.com","role":"user"}',
    responseData: '{"success":true,"userId":"U123"}',
    createdAt: "2026-01-07 10:30:45"
  },
  {
    id: "LOG002",
    type: "login",
    level: "success",
    action: "用户登录",
    module: "认证系统",
    operator: "张三",
    operatorId: "U002",
    ip: "10.0.0.55",
    location: "中国 北京",
    device: "macOS 14",
    browser: "Safari 17",
    description: "用户成功登录系统",
    createdAt: "2026-01-07 10:28:12"
  },
  {
    id: "LOG003",
    type: "security",
    level: "warning",
    action: "异常登录尝试",
    module: "安全中心",
    operator: "unknown",
    operatorId: "-",
    ip: "45.33.32.156",
    location: "美国 加州",
    device: "未知设备",
    browser: "未知",
    description: "检测到来自异常IP的登录尝试，已阻止",
    createdAt: "2026-01-07 10:25:33"
  },
  {
    id: "LOG004",
    type: "error",
    level: "error",
    action: "API调用失败",
    module: "支付网关",
    operator: "system",
    operatorId: "SYS",
    ip: "127.0.0.1",
    location: "本地服务器",
    device: "Server",
    browser: "-",
    description: "支付接口连接超时，错误码: TIMEOUT_ERROR",
    requestData: '{"orderId":"ORD123","amount":100}',
    responseData: '{"error":"Connection timeout after 30000ms"}',
    createdAt: "2026-01-07 10:20:18"
  },
  {
    id: "LOG005",
    type: "operation",
    level: "info",
    action: "修改配置",
    module: "系统设置",
    operator: "李四",
    operatorId: "U003",
    ip: "192.168.1.105",
    location: "中国 深圳",
    device: "Windows 10",
    browser: "Edge 120",
    description: "修改系统邮件通知配置",
    createdAt: "2026-01-07 10:15:22"
  },
  {
    id: "LOG006",
    type: "operation",
    level: "success",
    action: "删除订单",
    module: "订单管理",
    operator: "王五",
    operatorId: "U004",
    ip: "192.168.1.88",
    location: "中国 广州",
    device: "macOS 13",
    browser: "Chrome 119",
    description: "删除过期订单 ORD20260101001",
    createdAt: "2026-01-07 10:10:05"
  },
  {
    id: "LOG007",
    type: "login",
    level: "error",
    action: "登录失败",
    module: "认证系统",
    operator: "test@example.com",
    operatorId: "-",
    ip: "103.25.44.78",
    location: "中国 杭州",
    device: "Android 14",
    browser: "Chrome Mobile",
    description: "密码错误，第3次尝试",
    createdAt: "2026-01-07 10:05:44"
  },
  {
    id: "LOG008",
    type: "security",
    level: "info",
    action: "密码修改",
    module: "安全中心",
    operator: "赵六",
    operatorId: "U005",
    ip: "192.168.1.200",
    location: "中国 成都",
    device: "iPhone 15",
    browser: "Safari Mobile",
    description: "用户成功修改登录密码",
    createdAt: "2026-01-07 10:00:11"
  },
  {
    id: "LOG009",
    type: "operation",
    level: "success",
    action: "导出报表",
    module: "财务报表",
    operator: "admin",
    operatorId: "U001",
    ip: "192.168.1.100",
    location: "中国 上海",
    device: "Windows 11",
    browser: "Chrome 120",
    description: "导出2025年12月财务报表",
    createdAt: "2026-01-07 09:55:30"
  },
  {
    id: "LOG010",
    type: "error",
    level: "error",
    action: "数据库错误",
    module: "数据存储",
    operator: "system",
    operatorId: "SYS",
    ip: "127.0.0.1",
    location: "本地服务器",
    device: "Server",
    browser: "-",
    description: "数据库连接池耗尽，等待连接超时",
    createdAt: "2026-01-07 09:50:15"
  }
]

export default function SystemLogsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const stats = {
    total: 8456,
    error: 12,
    success: 8234,
    warning: 56
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      operation: "操作日志",
      login: "登录日志",
      security: "安全日志",
      error: "错误日志"
    }
    return labels[type] || type
  }

  const getTypeBadgeClass = (type: string) => {
    const classes: Record<string, string> = {
      operation: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      login: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      security: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    }
    return classes[type] || ""
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const filteredLogs = mockLogs.filter(log => {
    if (activeTab !== "all" && log.type !== activeTab) return false
    if (levelFilter !== "all" && log.level !== levelFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        log.action.toLowerCase().includes(query) ||
        log.operator.toLowerCase().includes(query) ||
        log.module.toLowerCase().includes(query) ||
        log.description.toLowerCase().includes(query) ||
        log.ip.includes(query)
      )
    }
    return true
  })

  const totalPages = Math.ceil(filteredLogs.length / pageSize)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const openLogDetail = (log: LogEntry) => {
    setSelectedLog(log)
    setSheetOpen(true)
  }

  return (
    <PermissionsLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系统日志</h1>
            <Button className="bg-custom-green hover:bg-custom-green/90 text-white">
              <Download className="w-4 h-4 mr-2" />
              导出日志
            </Button>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日日志</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total.toLocaleString()}</h3>
                </div>
                <FileText className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">错误日志</p>
                  <h3 className="text-2xl font-bold text-red-500">{stats.error}</h3>
                </div>
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">成功操作</p>
                  <h3 className="text-2xl font-bold text-green-500">{stats.success.toLocaleString()}</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">警告信息</p>
                  <h3 className="text-2xl font-bold text-orange-500">{stats.warning}</h3>
                </div>
                <Info className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          {/* 筛选区域 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-4">
                {/* 搜索框 */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索操作、模块、操作人、IP..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>

                {/* 日志类型页签 */}
                <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setCurrentPage(1); }}>
                  <TabsList className="h-9">
                    <TabsTrigger value="all" className="h-7 px-3 text-xs">全部</TabsTrigger>
                    <TabsTrigger value="operation" className="h-7 px-3 text-xs">操作日志</TabsTrigger>
                    <TabsTrigger value="login" className="h-7 px-3 text-xs">登录日志</TabsTrigger>
                    <TabsTrigger value="security" className="h-7 px-3 text-xs">安全日志</TabsTrigger>
                    <TabsTrigger value="error" className="h-7 px-3 text-xs">错误日志</TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* 级别筛选 */}
                <Select value={levelFilter} onValueChange={(v) => { setLevelFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-28 h-9">
                    <Filter className="w-4 h-4 mr-1" />
                    <SelectValue placeholder="级别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部级别</SelectItem>
                    <SelectItem value="info">信息</SelectItem>
                    <SelectItem value="success">成功</SelectItem>
                    <SelectItem value="warning">警告</SelectItem>
                    <SelectItem value="error">错误</SelectItem>
                  </SelectContent>
                </Select>

                {/* 时间筛选 */}
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-28 h-9">
                    <Calendar className="w-4 h-4 mr-1" />
                    <SelectValue placeholder="时间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">今天</SelectItem>
                    <SelectItem value="yesterday">昨天</SelectItem>
                    <SelectItem value="week">近7天</SelectItem>
                    <SelectItem value="month">近30天</SelectItem>
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 日志表格 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">级别</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">模块</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作人</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP地址</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {log.createdAt}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeClass(log.type)}`}>
                          {getTypeLabel(log.type)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {getLevelIcon(log.level)}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {log.action}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {log.module}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          {log.operator}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {log.ip}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openLogDetail(log)}
                          className="h-7 px-2 text-custom-green hover:text-custom-green hover:bg-custom-green/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {paginatedLogs.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                        暂无匹配的日志记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 分页 */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                共 {filteredLogs.length} 条记录
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {currentPage} / {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="h-8"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 日志详情 Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[500px] sm:w-[600px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {selectedLog && getLevelIcon(selectedLog.level)}
              日志详情
            </SheetTitle>
          </SheetHeader>
          {selectedLog && (
            <div className="py-4 space-y-6">
              {/* 基本信息 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  基本信息
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">日志ID</p>
                    <p className="font-mono text-gray-900 dark:text-white">{selectedLog.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">日志类型</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeClass(selectedLog.type)}`}>
                      {getTypeLabel(selectedLog.type)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">操作动作</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedLog.action}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">所属模块</p>
                    <p className="text-gray-900 dark:text-white">{selectedLog.module}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">操作描述</p>
                    <p className="text-gray-900 dark:text-white">{selectedLog.description}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">操作时间</p>
                    <p className="text-gray-900 dark:text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedLog.createdAt}
                    </p>
                  </div>
                </div>
              </div>

              {/* 操作人信息 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  操作人信息
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">操作人</p>
                    <p className="text-gray-900 dark:text-white">{selectedLog.operator}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">用户ID</p>
                    <p className="font-mono text-gray-900 dark:text-white">{selectedLog.operatorId}</p>
                  </div>
                </div>
              </div>

              {/* 设备信息 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  设备信息
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">IP地址</p>
                    <p className="font-mono text-gray-900 dark:text-white">{selectedLog.ip}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">地理位置</p>
                    <p className="text-gray-900 dark:text-white flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedLog.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">设备</p>
                    <p className="text-gray-900 dark:text-white">{selectedLog.device}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">浏览器</p>
                    <p className="text-gray-900 dark:text-white">{selectedLog.browser}</p>
                  </div>
                </div>
              </div>

              {/* 请求/响应数据 */}
              {(selectedLog.requestData || selectedLog.responseData) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    请求/响应数据
                  </h3>
                  {selectedLog.requestData && (
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">请求数据</p>
                      <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-xs font-mono overflow-x-auto text-gray-800 dark:text-gray-200">
                        {JSON.stringify(JSON.parse(selectedLog.requestData), null, 2)}
                      </pre>
                    </div>
                  )}
                  {selectedLog.responseData && (
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">响应数据</p>
                      <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-xs font-mono overflow-x-auto text-gray-800 dark:text-gray-200">
                        {JSON.stringify(JSON.parse(selectedLog.responseData), null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </PermissionsLayout>
  )
}
