'use client'

import { useState } from 'react'
import { Settings, Save, CreditCard, Smartphone } from 'lucide-react'
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

interface CardTypeConfig {
  id: string
  name: string
  cardFee: string
  annualFee: string
  minRecharge: string
  maxRecharge: string
  minConsumption: string
  maxConsumption: string
  dailyLimit: string
  monthlyLimit: string
  defaultCurrency: string
  expiryMonths: string
  enableAutoApproval: boolean
  requireKYC: boolean
  isEnabled: boolean
}

const defaultVirtualCards: CardTypeConfig[] = [
  {
    id: 'virtual_standard',
    name: '标准虚拟卡',
    cardFee: '2',
    annualFee: '0',
    minRecharge: '10',
    maxRecharge: '10000',
    minConsumption: '1',
    maxConsumption: '5000',
    dailyLimit: '10000',
    monthlyLimit: '50000',
    defaultCurrency: 'USD',
    expiryMonths: '12',
    enableAutoApproval: true,
    requireKYC: false,
    isEnabled: true,
  },
  {
    id: 'virtual_premium',
    name: '高级虚拟卡',
    cardFee: '5',
    annualFee: '10',
    minRecharge: '50',
    maxRecharge: '50000',
    minConsumption: '1',
    maxConsumption: '20000',
    dailyLimit: '50000',
    monthlyLimit: '200000',
    defaultCurrency: 'USD',
    expiryMonths: '24',
    enableAutoApproval: false,
    requireKYC: true,
    isEnabled: true,
  },
  {
    id: 'virtual_business',
    name: '企业虚拟卡',
    cardFee: '10',
    annualFee: '50',
    minRecharge: '100',
    maxRecharge: '100000',
    minConsumption: '10',
    maxConsumption: '50000',
    dailyLimit: '100000',
    monthlyLimit: '500000',
    defaultCurrency: 'USD',
    expiryMonths: '36',
    enableAutoApproval: false,
    requireKYC: true,
    isEnabled: true,
  },
]

const defaultPhysicalCards: CardTypeConfig[] = [
  {
    id: 'physical_black',
    name: '黑金实体卡',
    cardFee: '100',
    annualFee: '200',
    minRecharge: '100',
    maxRecharge: '100000',
    minConsumption: '10',
    maxConsumption: '50000',
    dailyLimit: '100000',
    monthlyLimit: '500000',
    defaultCurrency: 'USD',
    expiryMonths: '48',
    enableAutoApproval: false,
    requireKYC: true,
    isEnabled: true,
  },
  {
    id: 'physical_white',
    name: '白金实体卡',
    cardFee: '50',
    annualFee: '100',
    minRecharge: '50',
    maxRecharge: '50000',
    minConsumption: '5',
    maxConsumption: '20000',
    dailyLimit: '50000',
    monthlyLimit: '200000',
    defaultCurrency: 'USD',
    expiryMonths: '36',
    enableAutoApproval: false,
    requireKYC: true,
    isEnabled: true,
  },
  {
    id: 'physical_standard',
    name: '标准实体卡',
    cardFee: '20',
    annualFee: '30',
    minRecharge: '20',
    maxRecharge: '20000',
    minConsumption: '1',
    maxConsumption: '10000',
    dailyLimit: '20000',
    monthlyLimit: '100000',
    defaultCurrency: 'USD',
    expiryMonths: '24',
    enableAutoApproval: true,
    requireKYC: true,
    isEnabled: true,
  },
]

export default function UCardConfigPage() {
  const [primaryTab, setPrimaryTab] = useState<'virtual' | 'physical'>('virtual')
  const [virtualCards, setVirtualCards] = useState<CardTypeConfig[]>(defaultVirtualCards)
  const [physicalCards, setPhysicalCards] = useState<CardTypeConfig[]>(defaultPhysicalCards)
  const [selectedVirtualCard, setSelectedVirtualCard] = useState(virtualCards[0].id)
  const [selectedPhysicalCard, setSelectedPhysicalCard] = useState(physicalCards[0].id)

  const currentCards = primaryTab === 'virtual' ? virtualCards : physicalCards
  const setCurrentCards = primaryTab === 'virtual' ? setVirtualCards : setPhysicalCards
  const selectedCardId = primaryTab === 'virtual' ? selectedVirtualCard : selectedPhysicalCard
  const setSelectedCardId = primaryTab === 'virtual' ? setSelectedVirtualCard : setSelectedPhysicalCard
  
  const currentConfig = currentCards.find(c => c.id === selectedCardId) || currentCards[0]

  const updateConfig = (field: keyof CardTypeConfig, value: string | boolean) => {
    setCurrentCards(prev => prev.map(card => 
      card.id === selectedCardId ? { ...card, [field]: value } : card
    ))
  }

  const getCardTypeStyle = (cardId: string, isSelected: boolean) => {
    if (primaryTab === 'virtual') {
      return isSelected 
        ? 'bg-blue-500 text-white border-blue-500' 
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
    } else {
      if (cardId === 'physical_black') {
        return isSelected 
          ? 'bg-gradient-to-r from-gray-900 to-black text-yellow-400 border-gray-900' 
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400'
      } else if (cardId === 'physical_white') {
        return isSelected 
          ? 'bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 border-gray-400' 
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400'
      } else {
        return isSelected 
          ? 'bg-gray-500 text-white border-gray-500' 
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400'
      }
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡基础配置</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            配置不同类型U卡的发卡、充值、消费参数和规则
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
          <Save className="w-4 h-4 mr-2" />
          保存配置
        </Button>
      </div>

      <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-fit">
        <button
          onClick={() => setPrimaryTab('virtual')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
            primaryTab === 'virtual'
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          虚拟卡
        </button>
        <button
          onClick={() => setPrimaryTab('physical')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-l border-gray-200 dark:border-gray-700 ${
            primaryTab === 'physical'
              ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          实体卡
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        {currentCards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelectedCardId(card.id)}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${getCardTypeStyle(card.id, selectedCardId === card.id)}`}
          >
            {card.name}
            {!card.isEnabled && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded">
                已停用
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              primaryTab === 'virtual' 
                ? 'bg-blue-100 dark:bg-blue-900/30' 
                : currentConfig.id === 'physical_black' 
                  ? 'bg-gradient-to-br from-gray-800 to-black'
                  : currentConfig.id === 'physical_white'
                    ? 'bg-gradient-to-br from-gray-100 to-gray-300'
                    : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {primaryTab === 'virtual' ? (
                <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <CreditCard className={`w-5 h-5 ${
                  currentConfig.id === 'physical_black' ? 'text-yellow-400' : 'text-gray-600 dark:text-gray-400'
                }`} />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{currentConfig.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {primaryTab === 'virtual' ? '虚拟卡配置' : '实体卡配置'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">启用状态</span>
            <Switch
              checked={currentConfig.isEnabled}
              onCheckedChange={(checked) => updateConfig('isEnabled', checked)}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings className="w-4 h-4" />
                开卡配置
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">开卡费用 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.cardFee}
                    onChange={(e) => updateConfig('cardFee', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">年费 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.annualFee}
                    onChange={(e) => updateConfig('annualFee', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">默认币种</Label>
                  <Select
                    value={currentConfig.defaultCurrency}
                    onValueChange={(value) => updateConfig('defaultCurrency', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">美元 (USD)</SelectItem>
                      <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                      <SelectItem value="GBP">英镑 (GBP)</SelectItem>
                      <SelectItem value="HKD">港币 (HKD)</SelectItem>
                      <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">有效期 (月)</Label>
                  <Input
                    type="number"
                    value={currentConfig.expiryMonths}
                    onChange={(e) => updateConfig('expiryMonths', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">充值配置</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">最小充值金额 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.minRecharge}
                    onChange={(e) => updateConfig('minRecharge', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">最大充值金额 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.maxRecharge}
                    onChange={(e) => updateConfig('maxRecharge', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">每日充值限额 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.dailyLimit}
                    onChange={(e) => updateConfig('dailyLimit', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">每月充值限额 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.monthlyLimit}
                    onChange={(e) => updateConfig('monthlyLimit', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">消费配置</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">最小消费金额 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.minConsumption}
                    onChange={(e) => updateConfig('minConsumption', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">最大消费金额 ($)</Label>
                  <Input
                    type="number"
                    value={currentConfig.maxConsumption}
                    onChange={(e) => updateConfig('maxConsumption', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <Label className="text-xs">自动审批开卡</Label>
                    <Switch
                      checked={currentConfig.enableAutoApproval}
                      onCheckedChange={(checked) => updateConfig('enableAutoApproval', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <Label className="text-xs">需要KYC认证</Label>
                    <Switch
                      checked={currentConfig.requireKYC}
                      onCheckedChange={(checked) => updateConfig('requireKYC', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-custom-green/10 to-custom-green-dark/10 dark:from-custom-green/20 dark:to-custom-green-dark/20 rounded-lg border border-custom-green/30">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">配置汇总 - {currentConfig.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">开卡费:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">${currentConfig.cardFee}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">年费:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">${currentConfig.annualFee}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">充值范围:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">${currentConfig.minRecharge} - ${currentConfig.maxRecharge}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">消费范围:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">${currentConfig.minConsumption} - ${currentConfig.maxConsumption}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">每日限额:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">${currentConfig.dailyLimit}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">每月限额:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">${currentConfig.monthlyLimit}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">自动审批:</span>
                <span className={`ml-2 font-medium ${currentConfig.enableAutoApproval ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {currentConfig.enableAutoApproval ? '是' : '否'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">KYC认证:</span>
                <span className={`ml-2 font-medium ${currentConfig.requireKYC ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {currentConfig.requireKYC ? '必需' : '可选'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
