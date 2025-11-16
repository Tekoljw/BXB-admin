'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Snowflake, DollarSign } from 'lucide-react'

interface CurrencyFreezeData {
  currency: string
  merchantBalance: string
  payoutBalance: string
  currentFrozen: string
}

interface FreezeFundsDrawerProps {
  open: boolean
  onClose: () => void
  userId: string
  username: string
  currencies: CurrencyFreezeData[]
  onSubmit: (freezeData: Record<string, string>) => void
}

export function FreezeFundsDrawer({ 
  open, 
  onClose, 
  userId, 
  username,
  currencies,
  onSubmit 
}: FreezeFundsDrawerProps) {
  const [freezeAmounts, setFreezeAmounts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    currencies.forEach(c => {
      initial[c.currency] = c.currentFrozen
    })
    return initial
  })

  const handleAmountChange = (currency: string, value: string) => {
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setFreezeAmounts(prev => ({
        ...prev,
        [currency]: value
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(freezeAmounts)
    onClose()
  }

  const getCurrencyColor = (currency: string) => {
    switch(currency) {
      case 'CNY':
        return 'text-red-600 dark:text-red-400'
      case 'USD':
        return 'text-green-600 dark:text-green-400'
      case 'EUR':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Snowflake className="w-6 h-6 text-blue-500" />
            冻结资金管理
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* 用户信息 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">用户信息</h3>
            <div className="space-y-1">
              <p className="text-base font-semibold text-gray-900 dark:text-white">{username}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">用户ID: {userId}</p>
            </div>
          </div>

          {/* 多币种冻结管理 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              币种资产冻结管理
            </h3>

            <div className="space-y-4">
              {currencies.map((currencyData) => (
                <div 
                  key={currencyData.currency}
                  className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700"
                >
                  {/* 币种标题 */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <DollarSign className={`w-5 h-5 ${getCurrencyColor(currencyData.currency)}`} />
                      <h4 className={`text-lg font-bold ${getCurrencyColor(currencyData.currency)}`}>
                        {currencyData.currency}
                      </h4>
                    </div>
                  </div>

                  {/* 资产信息展示 */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">商户资产余额</p>
                      <p className={`text-base font-semibold ${getCurrencyColor(currencyData.currency)}`}>
                        {currencyData.merchantBalance}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">代付金余额</p>
                      <p className={`text-base font-semibold ${getCurrencyColor(currencyData.currency)}`}>
                        {currencyData.payoutBalance}
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">当前冻结金额</p>
                      <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                        {currencyData.currentFrozen}
                      </p>
                    </div>
                  </div>

                  {/* 冻结金额编辑 */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Snowflake className="w-4 h-4 inline-block mr-1 text-blue-500" />
                      修改冻结金额
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={freezeAmounts[currencyData.currency]}
                          onChange={(e) => handleAmountChange(currencyData.currency, e.target.value)}
                          className="w-full px-4 py-2.5 text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-custom-green"
                          placeholder="0.00"
                        />
                      </div>
                      <span className={`text-lg font-bold ${getCurrencyColor(currencyData.currency)} min-w-[60px]`}>
                        {currencyData.currency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      输入新的冻结金额，支持两位小数
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6"
            >
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Snowflake className="w-4 h-4 mr-2" />
              确认冻结
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
