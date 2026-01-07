"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { 
  Settings, 
  Server, 
  Database, 
  Activity,
  Globe,
  Shield,
  Bell,
  HardDrive,
  RefreshCw,
  Save,
  Power,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Download
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface ServiceStatus {
  name: string
  status: "running" | "stopped" | "warning"
  uptime: string
  memory: string
  cpu: string
}

const services: ServiceStatus[] = [
  { name: "API Gateway", status: "running", uptime: "15天 8小时", memory: "256MB", cpu: "12%" },
  { name: "Authentication Service", status: "running", uptime: "15天 8小时", memory: "128MB", cpu: "5%" },
  { name: "Payment Service", status: "running", uptime: "15天 8小时", memory: "512MB", cpu: "18%" },
  { name: "Notification Service", status: "running", uptime: "15天 8小时", memory: "64MB", cpu: "3%" },
  { name: "Cache Service (Redis)", status: "running", uptime: "15天 8小时", memory: "1.2GB", cpu: "8%" },
  { name: "Message Queue", status: "warning", uptime: "2天 4小时", memory: "384MB", cpu: "25%" },
  { name: "Scheduler Service", status: "running", uptime: "15天 8小时", memory: "96MB", cpu: "2%" },
  { name: "File Storage", status: "running", uptime: "15天 8小时", memory: "128MB", cpu: "4%" },
]

export default function SystemManagementPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [twoFactorRequired, setTwoFactorRequired] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [showApiKey, setShowApiKey] = useState(false)
  const [backupSheetOpen, setBackupSheetOpen] = useState(false)

  const [basicSettings, setBasicSettings] = useState({
    siteName: "BeDAO管理后台",
    siteUrl: "https://admin.bedao.io",
    adminEmail: "admin@bedao.io",
    timezone: "Asia/Shanghai",
    language: "zh-CN",
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    lockoutDuration: "30"
  })

  const stats = {
    modules: 18,
    serviceStatus: "正常",
    dbStatus: "在线",
    systemLoad: 35
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "stopped":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "running":
        return "运行中"
      case "stopped":
        return "已停止"
      case "warning":
        return "警告"
      default:
        return status
    }
  }

  return (
    <PermissionsLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系统管理</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-9">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新状态
              </Button>
              <Button className="bg-custom-green hover:bg-custom-green/90 text-white h-9">
                <Save className="w-4 h-4 mr-2" />
                保存设置
              </Button>
            </div>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">系统模块</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.modules}</h3>
                </div>
                <Settings className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">服务状态</p>
                  <h3 className="text-2xl font-bold text-green-500">{stats.serviceStatus}</h3>
                </div>
                <Server className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">数据库</p>
                  <h3 className="text-2xl font-bold text-blue-500">{stats.dbStatus}</h3>
                </div>
                <Database className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">系统负载</p>
                  <h3 className="text-2xl font-bold text-orange-500">{stats.systemLoad}%</h3>
                </div>
                <Activity className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          {/* 配置页签 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 pt-4">
                <TabsList className="h-10 bg-transparent p-0 gap-6">
                  <TabsTrigger 
                    value="basic" 
                    className="h-10 px-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-custom-green data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    基本设置
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="h-10 px-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-custom-green data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    安全设置
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notification" 
                    className="h-10 px-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-custom-green data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    通知设置
                  </TabsTrigger>
                  <TabsTrigger 
                    value="services" 
                    className="h-10 px-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-custom-green data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <Server className="w-4 h-4 mr-2" />
                    服务状态
                  </TabsTrigger>
                  <TabsTrigger 
                    value="backup" 
                    className="h-10 px-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-custom-green data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <HardDrive className="w-4 h-4 mr-2" />
                    备份管理
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* 基本设置 */}
              <TabsContent value="basic" className="p-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">站点信息</h3>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>站点名称</Label>
                        <Input 
                          value={basicSettings.siteName}
                          onChange={(e) => setBasicSettings({...basicSettings, siteName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>站点URL</Label>
                        <Input 
                          value={basicSettings.siteUrl}
                          onChange={(e) => setBasicSettings({...basicSettings, siteUrl: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>管理员邮箱</Label>
                        <Input 
                          type="email"
                          value={basicSettings.adminEmail}
                          onChange={(e) => setBasicSettings({...basicSettings, adminEmail: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">区域设置</h3>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>时区</Label>
                        <Select value={basicSettings.timezone} onValueChange={(v) => setBasicSettings({...basicSettings, timezone: v})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Shanghai">Asia/Shanghai (UTC+8)</SelectItem>
                            <SelectItem value="Asia/Hong_Kong">Asia/Hong_Kong (UTC+8)</SelectItem>
                            <SelectItem value="Asia/Tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                            <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                            <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>系统语言</Label>
                        <Select value={basicSettings.language} onValueChange={(v) => setBasicSettings({...basicSettings, language: v})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zh-CN">简体中文</SelectItem>
                            <SelectItem value="zh-TW">繁体中文</SelectItem>
                            <SelectItem value="en-US">English</SelectItem>
                            <SelectItem value="ja-JP">日本語</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">维护模式</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <Power className={`w-5 h-5 ${maintenanceMode ? 'text-orange-500' : 'text-gray-400'}`} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">维护模式</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            开启后，非管理员用户将无法访问系统
                          </p>
                        </div>
                      </div>
                      <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 安全设置 */}
              <TabsContent value="security" className="p-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">登录安全</h3>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>会话超时（分钟）</Label>
                        <Input 
                          type="number"
                          value={basicSettings.sessionTimeout}
                          onChange={(e) => setBasicSettings({...basicSettings, sessionTimeout: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>最大登录尝试次数</Label>
                        <Input 
                          type="number"
                          value={basicSettings.maxLoginAttempts}
                          onChange={(e) => setBasicSettings({...basicSettings, maxLoginAttempts: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>锁定时长（分钟）</Label>
                        <Input 
                          type="number"
                          value={basicSettings.lockoutDuration}
                          onChange={(e) => setBasicSettings({...basicSettings, lockoutDuration: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">双因素认证</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <Lock className={`w-5 h-5 ${twoFactorRequired ? 'text-custom-green' : 'text-gray-400'}`} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">强制双因素认证</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            所有管理员必须绑定谷歌验证器
                          </p>
                        </div>
                      </div>
                      <Switch checked={twoFactorRequired} onCheckedChange={setTwoFactorRequired} />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">API密钥</h3>
                    <div className="space-y-1.5">
                      <Label>系统API密钥</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input 
                            type={showApiKey ? "text" : "password"}
                            value="sk-bedao-xxxxxxxxxxxxxxxxxxxx"
                            readOnly
                            className="pr-10 font-mono"
                          />
                          <button 
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <Button variant="outline">重新生成</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 通知设置 */}
              <TabsContent value="notification" className="p-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">邮件通知</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <Mail className={`w-5 h-5 ${emailNotifications ? 'text-custom-green' : 'text-gray-400'}`} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">启用邮件通知</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            系统事件将通过邮件发送通知
                          </p>
                        </div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    {emailNotifications && (
                      <div className="space-y-3 pl-4 border-l-2 border-custom-green/30">
                        <div className="space-y-1.5">
                          <Label>SMTP服务器</Label>
                          <Input placeholder="smtp.example.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label>端口</Label>
                            <Input placeholder="587" />
                          </div>
                          <div className="space-y-1.5">
                            <Label>加密方式</Label>
                            <Select defaultValue="tls">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tls">TLS</SelectItem>
                                <SelectItem value="ssl">SSL</SelectItem>
                                <SelectItem value="none">无</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">短信通知</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <Smartphone className={`w-5 h-5 ${smsNotifications ? 'text-custom-green' : 'text-gray-400'}`} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">启用短信通知</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            重要事件通过短信发送
                          </p>
                        </div>
                      </div>
                      <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                    {smsNotifications && (
                      <div className="space-y-3 pl-4 border-l-2 border-custom-green/30">
                        <div className="space-y-1.5">
                          <Label>短信服务商</Label>
                          <Select defaultValue="aliyun">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aliyun">阿里云短信</SelectItem>
                              <SelectItem value="tencent">腾讯云短信</SelectItem>
                              <SelectItem value="twilio">Twilio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label>API Key</Label>
                          <Input type="password" placeholder="输入API Key" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* 服务状态 */}
              <TabsContent value="services" className="p-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">服务监控</h3>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      刷新
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div 
                        key={service.name}
                        className="p-4 border rounded-lg dark:border-gray-700 hover:border-custom-green/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(service.status)}
                            <span className="font-medium text-gray-900 dark:text-white">{service.name}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            service.status === 'running' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : service.status === 'warning'
                              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {getStatusText(service.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">运行时间</p>
                            <p className="text-gray-900 dark:text-white">{service.uptime}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">内存</p>
                            <p className="text-gray-900 dark:text-white">{service.memory}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">CPU</p>
                            <p className="text-gray-900 dark:text-white">{service.cpu}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* 备份管理 */}
              <TabsContent value="backup" className="p-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">自动备份</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <Clock className={`w-5 h-5 ${autoBackup ? 'text-custom-green' : 'text-gray-400'}`} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">启用自动备份</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            每日凌晨3点自动备份数据库
                          </p>
                        </div>
                      </div>
                      <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                    </div>
                    {autoBackup && (
                      <div className="space-y-3 pl-4 border-l-2 border-custom-green/30">
                        <div className="space-y-1.5">
                          <Label>备份频率</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">每小时</SelectItem>
                              <SelectItem value="daily">每天</SelectItem>
                              <SelectItem value="weekly">每周</SelectItem>
                              <SelectItem value="monthly">每月</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label>保留天数</Label>
                          <Select defaultValue="30">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">7天</SelectItem>
                              <SelectItem value="14">14天</SelectItem>
                              <SelectItem value="30">30天</SelectItem>
                              <SelectItem value="90">90天</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">手动操作</h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-custom-green hover:bg-custom-green/90 text-white justify-start">
                        <Upload className="w-4 h-4 mr-2" />
                        立即备份
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => setBackupSheetOpen(true)}>
                        <Download className="w-4 h-4 mr-2" />
                        恢复备份
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                        <Trash2 className="w-4 h-4 mr-2" />
                        清理旧备份
                      </Button>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">最近备份</h3>
                    <div className="space-y-2">
                      {[
                        { date: "2026-01-07 03:00", size: "256MB", status: "success" },
                        { date: "2026-01-06 03:00", size: "254MB", status: "success" },
                        { date: "2026-01-05 03:00", size: "251MB", status: "success" },
                      ].map((backup, i) => (
                        <div key={i} className="flex items-center justify-between py-2 px-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-900 dark:text-white">{backup.date}</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{backup.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* 恢复备份 Sheet */}
      <Sheet open={backupSheetOpen} onOpenChange={setBackupSheetOpen}>
        <SheetContent className="w-[450px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-custom-green" />
              恢复备份
            </SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              选择要恢复的备份文件，恢复操作将覆盖当前数据
            </p>
            <div className="space-y-2">
              {[
                { date: "2026-01-07 03:00", size: "256MB" },
                { date: "2026-01-06 03:00", size: "254MB" },
                { date: "2026-01-05 03:00", size: "251MB" },
                { date: "2026-01-04 03:00", size: "248MB" },
                { date: "2026-01-03 03:00", size: "245MB" },
              ].map((backup, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between py-3 px-4 border rounded-lg dark:border-gray-700 hover:border-custom-green cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{backup.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">大小: {backup.size}</p>
                  </div>
                  <Button size="sm" variant="outline">选择</Button>
                </div>
              ))}
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                恢复备份将覆盖当前所有数据，请谨慎操作
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </PermissionsLayout>
  )
}
