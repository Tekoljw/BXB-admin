"use client"

import React, { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useAdmin } from "@/contexts/admin-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  Shield, 
  Key, 
  Smartphone, 
  Clock,
  MapPin,
  Monitor,
  Edit
} from "lucide-react"
import ChangePasswordDialog from "@/components/dialogs/change-password-dialog"
import ResetGoogleAuthDialog from "@/components/dialogs/reset-google-auth-dialog"

interface LoginRecord {
  id: string
  timestamp: string
  ip: string
  location: string
  device: string
}

// 模拟数据
const mockLoginHistory: LoginRecord[] = [
  {
    id: "1",
    timestamp: "2024-11-13 10:30:25",
    ip: "192.168.1.100",
    location: "中国 广东省 深圳市",
    device: "Chrome 120 / Windows 11"
  },
  {
    id: "2",
    timestamp: "2024-11-12 15:20:10",
    ip: "192.168.1.101",
    location: "中国 广东省 深圳市",
    device: "Chrome 120 / macOS"
  },
  {
    id: "3",
    timestamp: "2024-11-11 09:15:30",
    ip: "183.14.132.45",
    location: "中国 北京市",
    device: "Safari 17 / iOS 17"
  },
  {
    id: "4",
    timestamp: "2024-11-10 14:45:22",
    ip: "192.168.1.100",
    location: "中国 广东省 深圳市",
    device: "Chrome 120 / Windows 11"
  },
  {
    id: "5",
    timestamp: "2024-11-09 11:30:15",
    ip: "115.236.12.88",
    location: "中国 浙江省 杭州市",
    device: "Edge 119 / Windows 10"
  }
]

export default function AccountPage() {
  const { theme } = useTheme()
  const { adminUser } = useAdmin()
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showGoogleAuthDialog, setShowGoogleAuthDialog] = useState(false)

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            个人中心
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            管理您的账户信息和安全设置
          </p>
        </div>

        {/* 账户信息和安全设置 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 账户信息卡片 */}
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : ''}>账户信息</CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                您的基本账户资料
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <User className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    账号
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {adminUser?.username || 'admin'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    邮箱
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {adminUser?.email || 'admin@bedao.com'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <User className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    姓名
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {adminUser?.fullName || '系统管理员'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    角色
                  </p>
                  <div>
                    <Badge variant="outline" className={theme === 'dark' ? 'text-gray-300' : ''}>
                      {adminUser?.role || '超级管理员'}
                    </Badge>
                  </div>
                </div>
              </div>

              {adminUser?.lastLoginAt && (
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      最后登录
                    </p>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {adminUser.lastLoginAt}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 安全设置卡片 */}
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''} id="security">
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : ''}>安全设置</CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                管理您的账户安全
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 登录密码 */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Key className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      登录密码
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {adminUser?.passwordLastUpdated 
                        ? `最后修改：${adminUser.passwordLastUpdated}` 
                        : '建议定期修改密码'}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPasswordDialog(true)}
                  className={theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  修改密码
                </Button>
              </div>

              {/* Google验证码 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Smartphone className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Google验证码
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={adminUser?.requires2FAReset ? "destructive" : "default"}
                        className={!adminUser?.requires2FAReset && theme === 'dark' ? 'bg-green-600' : ''}
                      >
                        {adminUser?.requires2FAReset ? '需要重置' : '已启用'}
                      </Badge>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {adminUser?.requires2FAReset ? '请重新绑定' : '双因素认证已开启'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowGoogleAuthDialog(true)}
                  className={theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  重置验证码
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 登录记录 */}
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-white' : ''}>登录记录</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
              最近的登录活动记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        登录时间
                      </div>
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        IP地址
                      </div>
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        登录地点
                      </div>
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        设备信息
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockLoginHistory.map((record, index) => (
                    <tr 
                      key={record.id}
                      className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} 
                        ${theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                    >
                      <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                        {record.timestamp}
                      </td>
                      <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                        <code className={`px-2 py-1 rounded text-xs ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          {record.ip}
                        </code>
                      </td>
                      <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                        {record.location}
                      </td>
                      <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {record.device}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 修改密码弹窗 */}
      <ChangePasswordDialog 
        open={showPasswordDialog} 
        onOpenChange={setShowPasswordDialog} 
      />

      {/* 重置Google验证码弹窗 */}
      <ResetGoogleAuthDialog 
        open={showGoogleAuthDialog} 
        onOpenChange={setShowGoogleAuthDialog} 
      />
    </div>
  )
}
