"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, AlertCircle, Check } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface WithdrawalModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: WithdrawalFormData) => void
  currentCurrency: string
  getAvailableBalanceForCurrency: (currency: string) => number
}

export interface WithdrawalFormData {
  recipientName: string
  recipientAccount: string
  recipientBank: string
  amount: string
  paymentMethod: string
  purpose: string
  currency: string
}

interface FormErrors {
  [key: string]: string
}

export function WithdrawalModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  currentCurrency, 
  getAvailableBalanceForCurrency 
}: WithdrawalModalProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // 表单状态
  const [formData, setFormData] = useState<WithdrawalFormData>({
    recipientName: "",
    recipientAccount: "",
    recipientBank: "",
    amount: "",
    paymentMethod: "银行转账",
    purpose: "",
    currency: currentCurrency
  })

  // 验证错误状态
  const [errors, setErrors] = useState<FormErrors>({})
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 当货币发生变化时更新表单
  useEffect(() => {
    setFormData(prev => ({ ...prev, currency: currentCurrency }))
  }, [currentCurrency])

  // 获取当前选择货币的可用余额
  const getCurrentBalance = () => {
    return getAvailableBalanceForCurrency(formData.currency)
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      recipientName: "",
      recipientAccount: "",
      recipientBank: "",
      amount: "",
      paymentMethod: "银行转账",
      purpose: "",
      currency: currentCurrency
    })
    setErrors({})
    setIsSubmitting(false)
  }

  // 处理表单字段变化
  const handleFieldChange = (field: keyof WithdrawalFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // 清除相关字段的错误
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // 收款人姓名验证
    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "请输入收款人姓名"
    } else if (formData.recipientName.trim().length < 2) {
      newErrors.recipientName = "收款人姓名至少需要2个字符"
    }

    // 收款账户验证
    if (!formData.recipientAccount.trim()) {
      newErrors.recipientAccount = "请输入收款账户"
    } else if (formData.recipientAccount.trim().length < 6) {
      newErrors.recipientAccount = "收款账户至少需要6个字符"
    }

    // 收款银行验证
    if (!formData.recipientBank.trim()) {
      newErrors.recipientBank = "请输入收款银行"
    }

    // 金额验证
    const currentBalance = getCurrentBalance()
    if (!formData.amount) {
      newErrors.amount = "请输入代付金额"
    } else {
      const amount = parseFloat(formData.amount)
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = "请输入有效的代付金额"
      } else if (amount > currentBalance) {
        newErrors.amount = `代付金额不能超过代付备佣金余额 ${formatCurrency(currentBalance, formData.currency)}`
      } else if (amount < 10) {
        newErrors.amount = "最小代付金额为 10"
      }
    }

    // 用途说明验证
    if (!formData.purpose.trim()) {
      newErrors.purpose = "请输入用途说明"
    } else if (formData.purpose.trim().length < 10) {
      newErrors.purpose = "用途说明至少需要10个字符"
    } else if (formData.purpose.trim().length > 200) {
      newErrors.purpose = "用途说明不能超过200个字符"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 处理表单提交
  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
      resetForm()
      onClose()
    } catch (error) {
      console.error("代付申请提交失败:", error)
      // 这里可以添加错误提示
    } finally {
      setIsSubmitting(false)
    }
  }

  // 处理模态框关闭
  const handleClose = () => {
    if (!isSubmitting) {
      resetForm()
      onClose()
    }
  }

  // 支付方式选项
  const paymentMethods = [
    "银行转账",
    "支付宝转账", 
    "微信转账",
    "PayPal",
    "Wire Transfer"
  ]

  // 格式化货币
  const formatCurrency = (amount: number, currency: string): string => {
    const symbols: { [key: string]: string } = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'CNY': '¥'
    }
    const symbol = symbols[currency] || currency
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  // 处理键盘事件（ESC关闭）
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isSubmitting) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, isSubmitting])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-full max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto p-0 sm:p-6 sm:rounded-lg rounded-none h-[100dvh] sm:h-auto">
        <div className="p-4 pt-[env(safe-area-inset-top,1rem)] pb-[env(safe-area-inset-bottom,1rem)] sm:p-0">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-[#00D4AA]" />
              <span>手动代付</span>
            </DialogTitle>
            <DialogDescription>
              填写代付信息，资金将从代付备佣金转入指定账户。请仔细核对信息以确保资金安全。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
          {/* 可用余额显示 */}
          <div className={`p-4 rounded-lg border ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">代付备佣金可用余额</span>
              <span className="font-semibold text-[#00D4AA]">
                {formatCurrency(getCurrentBalance(), formData.currency)}
              </span>
            </div>
          </div>

          {/* 收款人信息 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">收款人信息</h3>
            
            <div className="space-y-2">
              <Label htmlFor="recipientName">收款人姓名 *</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => handleFieldChange('recipientName', e.target.value)}
                placeholder="请输入收款人姓名"
                className={errors.recipientName ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.recipientName && (
                <div className="flex items-center space-x-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.recipientName}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientAccount">收款账户 *</Label>
              <Input
                id="recipientAccount"
                value={formData.recipientAccount}
                onChange={(e) => handleFieldChange('recipientAccount', e.target.value)}
                placeholder="请输入收款账户号码"
                className={errors.recipientAccount ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.recipientAccount && (
                <div className="flex items-center space-x-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.recipientAccount}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientBank">收款银行 *</Label>
              <Input
                id="recipientBank"
                value={formData.recipientBank}
                onChange={(e) => handleFieldChange('recipientBank', e.target.value)}
                placeholder="请输入收款银行名称"
                className={errors.recipientBank ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.recipientBank && (
                <div className="flex items-center space-x-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.recipientBank}</span>
                </div>
              )}
            </div>
          </div>

          {/* 转账信息 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">转账信息</h3>
            
            {/* 币种选择 */}
            <div className="space-y-2">
              <Label htmlFor="currency">法币币种 *</Label>
              <Select 
                value={formData.currency} 
                onValueChange={(value) => handleFieldChange('currency', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择法币币种" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">美元 (USD)</SelectItem>
                  <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                  <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                  <SelectItem value="GBP">英镑 (GBP)</SelectItem>
                  <SelectItem value="JPY">日元 (JPY)</SelectItem>
                  <SelectItem value="HKD">港币 (HKD)</SelectItem>
                  <SelectItem value="KRW">韩元 (KRW)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">代付金额 *</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleFieldChange('amount', e.target.value)}
                  placeholder="请输入代付金额"
                  className={`${errors.amount ? 'border-red-500' : ''} pr-16`}
                  disabled={isSubmitting}
                  min="10"
                  max={getCurrentBalance()}
                  step="0.01"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {formData.currency}
                </div>
              </div>
              {errors.amount && (
                <div className="flex items-center space-x-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.amount}</span>
                </div>
              )}
              <div className="text-xs text-gray-500">
                最小代付金额：10 {formData.currency}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">支付方式 *</Label>
              <Select 
                value={formData.paymentMethod} 
                onValueChange={(value) => handleFieldChange('paymentMethod', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择支付方式" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">用途说明 *</Label>
              <textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleFieldChange('purpose', e.target.value)}
                placeholder="请详细说明资金用途（至少10个字符）"
                className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors resize-none ${
                  errors.purpose 
                    ? 'border-red-500' 
                    : isDark 
                      ? 'border-gray-600 bg-gray-800' 
                      : 'border-gray-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                rows={3}
                maxLength={200}
                disabled={isSubmitting}
              />
              {errors.purpose && (
                <div className="flex items-center space-x-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.purpose}</span>
                </div>
              )}
              <div className="text-xs text-gray-500">
                {formData.purpose.length}/200 字符
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              取消
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#00D4AA] hover:bg-[#00B898] text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>提交中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>确认代付</span>
                </div>
              )}
            </Button>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}