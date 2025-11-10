'use client'

import { useState } from 'react'
import { Settings, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UCardConfigPage() {
  const [config, setConfig] = useState({
    cardFee: '50',
    minRecharge: '10',
    maxRecharge: '50000',
    minConsumption: '1',
    maxConsumption: '10000',
    dailyLimit: '100000',
    enableAutoApproval: true,
    requireKYC: true,
    defaultCurrency: 'USD',
    expiryMonths: '12',
  })

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡基础配置</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            配置U卡发卡、充值、消费的全局参数和规则
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
          <Save className="w-4 h-4 mr-2" />
          保存配置
        </Button>
      </div>

      {/* 配置表单 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 开卡配置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            开卡配置
          </h2>
          <div className="space-y-4">
            <div>
              <Label>开卡费用 ($)</Label>
              <Input
                type="number"
                value={config.cardFee}
                onChange={(e) => setConfig({ ...config, cardFee: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label>默认币种</Label>
              <Select
                value={config.defaultCurrency}
                onValueChange={(value) => setConfig({ ...config, defaultCurrency: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">美元 (USD)</SelectItem>
                  <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                  <SelectItem value="GBP">英镑 (GBP)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>默认有效期 (月)</Label>
              <Input
                type="number"
                value={config.expiryMonths}
                onChange={(e) => setConfig({ ...config, expiryMonths: e.target.value })}
                className="mt-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>自动审批</Label>
              <Switch
                checked={config.enableAutoApproval}
                onCheckedChange={(checked) => setConfig({ ...config, enableAutoApproval: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>需要KYC认证</Label>
              <Switch
                checked={config.requireKYC}
                onCheckedChange={(checked) => setConfig({ ...config, requireKYC: checked })}
              />
            </div>
          </div>
        </div>

        {/* 充值配置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">充值配置</h2>
          <div className="space-y-4">
            <div>
              <Label>最小充值金额 ($)</Label>
              <Input
                type="number"
                value={config.minRecharge}
                onChange={(e) => setConfig({ ...config, minRecharge: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label>最大充值金额 ($)</Label>
              <Input
                type="number"
                value={config.maxRecharge}
                onChange={(e) => setConfig({ ...config, maxRecharge: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label>每日充值限额 ($)</Label>
              <Input
                type="number"
                value={config.dailyLimit}
                onChange={(e) => setConfig({ ...config, dailyLimit: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* 消费配置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">消费配置</h2>
          <div className="space-y-4">
            <div>
              <Label>最小消费金额 ($)</Label>
              <Input
                type="number"
                value={config.minConsumption}
                onChange={(e) => setConfig({ ...config, minConsumption: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label>最大消费金额 ($)</Label>
              <Input
                type="number"
                value={config.maxConsumption}
                onChange={(e) => setConfig({ ...config, maxConsumption: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* 当前配置汇总 */}
        <div className="bg-gradient-to-br from-custom-green/10 to-custom-green-dark/10 dark:from-custom-green/20 dark:to-custom-green-dark/20 rounded-lg border border-custom-green/30 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">配置汇总</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">开卡费用:</span>
              <span className="font-medium text-gray-900 dark:text-white">${config.cardFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">充值范围:</span>
              <span className="font-medium text-gray-900 dark:text-white">${config.minRecharge} - ${config.maxRecharge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">消费范围:</span>
              <span className="font-medium text-gray-900 dark:text-white">${config.minConsumption} - ${config.maxConsumption}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">每日限额:</span>
              <span className="font-medium text-gray-900 dark:text-white">${config.dailyLimit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">自动审批:</span>
              <span className={`font-medium ${config.enableAutoApproval ? 'text-green-600 dark:text-green-400' : 'text-gray-600'}`}>
                {config.enableAutoApproval ? '已启用' : '已关闭'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">KYC认证:</span>
              <span className={`font-medium ${config.requireKYC ? 'text-green-600 dark:text-green-400' : 'text-gray-600'}`}>
                {config.requireKYC ? '必需' : '可选'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
