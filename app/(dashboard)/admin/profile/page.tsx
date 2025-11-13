"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/contexts/admin-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { User, Mail, Shield, MapPin, Clock, Monitor, Key, Smartphone, LogOut, Eye, EyeOff } from "lucide-react"

export default function ProfilePage() {
  const { logout, userInfo: contextUserInfo, isAdminLoggedIn } = useAdmin()
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showGoogleAuthDialog, setShowGoogleAuthDialog] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 认证守卫：如果未登录，跳转到登录页
  useEffect(() => {
    if (!isAdminLoggedIn) {
      window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { 
          path: "/admin/login"
        } 
      }))
    }
  }, [isAdminLoggedIn])

  const userInfo = {
    name: contextUserInfo?.name || "管理员",
    email: contextUserInfo?.email || "admin@bedao.com",
    role: contextUserInfo?.role || "超级管理员",
    avatar: contextUserInfo?.avatar || "",
    lastLogin: "2024-11-13 16:30:25",
    lastLoginIP: "192.168.1.100",
    lastLoginLocation: "中国 广东省 深圳市"
  }

  const loginRecords = [
    { id: 1, time: "2024-11-13 16:30:25", ip: "192.168.1.100", location: "中国 广东省 深圳市", device: "Chrome 120 / Windows 10", status: "成功" },
    { id: 2, time: "2024-11-13 09:15:10", ip: "192.168.1.100", location: "中国 广东省 深圳市", device: "Chrome 120 / Windows 10", status: "成功" },
    { id: 3, time: "2024-11-12 18:45:30", ip: "192.168.1.105", location: "中国 广东省 深圳市", device: "Safari 17 / macOS", status: "成功" },
    { id: 4, time: "2024-11-12 10:20:15", ip: "192.168.1.100", location: "中国 广东省 深圳市", device: "Chrome 120 / Windows 10", status: "成功" },
    { id: 5, time: "2024-11-11 14:35:50", ip: "192.168.1.88", location: "中国 北京市", device: "Chrome 120 / Windows 10", status: "失败" },
    { id: 6, time: "2024-11-11 14:30:20", ip: "192.168.1.100", location: "中国 广东省 深圳市", device: "Chrome 120 / Windows 10", status: "成功" },
    { id: 7, time: "2024-11-10 16:10:45", ip: "192.168.1.100", location: "中国 广东省 深圳市", device: "Chrome 120 / Windows 10", status: "成功" },
    { id: 8, time: "2024-11-10 09:05:30", ip: "192.168.1.105", location: "中国 广东省 深圳市", device: "Safari 17 / macOS", status: "成功" },
  ]

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("请填写所有密码字段")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("两次输入的新密码不一致")
      return
    }
    if (newPassword.length < 8) {
      toast.error("新密码长度至少为8位")
      return
    }
    
    toast.success("密码修改成功")
    setShowPasswordDialog(false)
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleResetGoogleAuth = () => {
    toast.success("Google验证码已重置，请重新绑定")
    setShowGoogleAuthDialog(false)
  }

  const handleLogout = () => {
    toast.success("已退出登录")
    logout()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">个人中心</h1>
          <p className="text-muted-foreground mt-1">管理您的账号信息和安全设置</p>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          退出登录
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
            <CardDescription>您的基本账号信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="text-2xl bg-custom-green text-white">
                  {userInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">姓名</p>
                  <p className="font-medium">{userInfo.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">邮箱</p>
                  <p className="font-medium">{userInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">角色</p>
                  <Badge className="mt-1">{userInfo.role}</Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">最近登录</p>
                  <p className="font-medium text-sm">{userInfo.lastLogin}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">登录位置</p>
                  <p className="font-medium text-sm">{userInfo.lastLoginLocation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>管理您的账号安全</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">登录密码</p>
                    <p className="text-sm text-muted-foreground">定期修改密码以保护账号安全</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
                  修改密码
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Google 验证码</p>
                    <p className="text-sm text-muted-foreground">重置Google验证器以提高安全性</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setShowGoogleAuthDialog(true)}>
                  重置验证码
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>登录记录</CardTitle>
          <CardDescription>最近的登录活动记录</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>登录时间</TableHead>
                <TableHead>IP 地址</TableHead>
                <TableHead>登录位置</TableHead>
                <TableHead>设备信息</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{record.time}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{record.ip}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{record.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{record.device}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={record.status === "成功" ? "default" : "destructive"}>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改密码</DialogTitle>
            <DialogDescription>
              请输入旧密码和新密码，新密码长度至少为8位
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="old-password">旧密码</Label>
              <div className="relative">
                <Input
                  id="old-password"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="请输入旧密码"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">新密码</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="请输入新密码（至少8位）"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">确认新密码</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入新密码"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              取消
            </Button>
            <Button onClick={handleChangePassword}>确认修改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showGoogleAuthDialog} onOpenChange={setShowGoogleAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重置 Google 验证码</DialogTitle>
            <DialogDescription>
              重置后需要重新绑定Google验证器应用
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>警告：</strong>重置Google验证码后，您需要使用Google Authenticator或类似应用重新扫描二维码进行绑定。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGoogleAuthDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleResetGoogleAuth}>
              确认重置
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
