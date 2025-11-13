"use client"

import React, { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 验证
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "错误",
        description: "请填写所有字段",
        variant: "destructive"
      })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "错误",
        description: "两次输入的新密码不一致",
        variant: "destructive"
      })
      return
    }

    if (formData.newPassword.length < 8) {
      toast({
        title: "错误",
        description: "新密码长度至少为8位",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      // 这里调用实际的API
      // const response = await fetch('/api/admin/password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "成功",
        description: "密码修改成功，请使用新密码重新登录",
      })

      // 清空表单并关闭
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
      onOpenChange(false)

    } catch (error) {
      toast({
        title: "错误",
        description: "密码修改失败，请稍后重试",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
        <DialogHeader>
          <DialogTitle className={theme === 'dark' ? 'text-white' : ''}>
            修改登录密码
          </DialogTitle>
          <DialogDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
            为了您的账户安全，请定期修改密码。密码长度至少为8位。
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 当前密码 */}
          <div className="space-y-2">
            <Label className={theme === 'dark' ? 'text-gray-300' : ''}>
              当前密码
            </Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                placeholder="请输入当前密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 新密码 */}
          <div className="space-y-2">
            <Label className={theme === 'dark' ? 'text-gray-300' : ''}>
              新密码
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                placeholder="请输入新密码（至少8位）"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 确认新密码 */}
          <div className="space-y-2">
            <Label className={theme === 'dark' ? 'text-gray-300' : ''}>
              确认新密码
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
                placeholder="请再次输入新密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className={theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
            >
              取消
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-custom-green hover:bg-custom-green/90"
            >
              {loading ? "提交中..." : "确认修改"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
