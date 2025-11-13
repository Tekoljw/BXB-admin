"use client"

import React, { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useAdmin } from "@/contexts/admin-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Smartphone, Copy, Check } from "lucide-react"

interface ResetGoogleAuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ResetGoogleAuthDialog({ open, onOpenChange }: ResetGoogleAuthDialogProps) {
  const { theme } = useTheme()
  const { toast } = useToast()
  const { updateUser } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'confirm' | 'setup'>('confirm')
  const [secretKey, setSecretKey] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleReset = async () => {
    setLoading(true)

    try {
      // 这里调用实际的API
      // const response = await fetch('/api/admin/2fa/reset', {
      //   method: 'POST',
      // })
      // const data = await response.json()

      // 模拟API调用返回的数据
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockSecretKey = 'JBSWY3DPEHPK3PXP'
      const mockQrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/BeDAO:admin@bedao.com?secret=' + mockSecretKey + '&issuer=BeDAO'

      setSecretKey(mockSecretKey)
      setQrCodeUrl(mockQrCodeUrl)
      setStep('setup')

      toast({
        title: "重置成功",
        description: "请使用Google Authenticator扫描二维码重新绑定",
      })

    } catch (error) {
      toast({
        title: "错误",
        description: "重置失败，请稍后重试",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey)
    setCopied(true)
    toast({
      title: "已复制",
      description: "密钥已复制到剪贴板",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleComplete = () => {
    // 更新用户状态，标记2FA已重置
    updateUser({ requires2FAReset: false })
    handleClose()
    toast({
      title: "绑定完成",
      description: "Google验证码已成功重新绑定",
    })
  }

  const handleClose = () => {
    setStep('confirm')
    setSecretKey('')
    setQrCodeUrl('')
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
        {step === 'confirm' ? (
          <>
            <DialogHeader>
              <DialogTitle className={theme === 'dark' ? 'text-white' : ''}>
                重置Google验证码
              </DialogTitle>
              <DialogDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                重置后需要重新绑定Google Authenticator
              </DialogDescription>
            </DialogHeader>

            <div className={`flex items-start gap-3 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-800'}`}>
                  注意事项
                </p>
                <ul className={`mt-2 text-sm space-y-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  <li>• 重置后，旧的验证码将失效</li>
                  <li>• 您需要使用Google Authenticator重新扫描二维码</li>
                  <li>• 请确保您已安装Google Authenticator应用</li>
                </ul>
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
                type="button" 
                onClick={handleReset}
                disabled={loading}
                className="bg-custom-green hover:bg-custom-green/90"
              >
                {loading ? "重置中..." : "确认重置"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className={theme === 'dark' ? 'text-white' : ''}>
                绑定Google验证码
              </DialogTitle>
              <DialogDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
                请使用Google Authenticator扫描二维码
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* 二维码 */}
              <div className="flex justify-center">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white' : 'bg-gray-50'}`}>
                  {qrCodeUrl && (
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code" 
                      className="w-48 h-48"
                    />
                  )}
                </div>
              </div>

              {/* 密钥 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Smartphone className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    无法扫码？手动输入密钥：
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className={`flex-1 px-3 py-2 rounded text-sm font-mono ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {secretKey}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopySecret}
                    className={theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* 说明 */}
              <div className={`p-3 rounded-lg text-sm ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
              }`}>
                <p className="font-medium mb-2">操作步骤：</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>打开Google Authenticator应用</li>
                  <li>点击"+"添加账户</li>
                  <li>选择"扫描二维码"或"输入提供的密钥"</li>
                  <li>完成绑定后点击下方"完成绑定"按钮</li>
                </ol>
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
                type="button" 
                onClick={handleComplete}
                className="bg-custom-green hover:bg-custom-green/90"
              >
                完成绑定
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
