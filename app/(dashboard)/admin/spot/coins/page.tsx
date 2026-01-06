"use client"

import React, { useState } from "react"
import SpotLayout from "@/components/spot-layout"
import { Coins, Search, Edit2, Check, X, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

type Sector = 'defi' | 'gamefi' | 'nft' | 'layer1' | 'layer2' | 'meme' | 'other'

interface SpotCoin {
  id: string
  coinId: string
  symbol: string
  name: string
  listedName: string
  precision: number
  displayWeight: number
  onChainExists: boolean
  sector: Sector
  transferEnabled: boolean
  status: string
}

const SECTORS: { value: Sector; label: string }[] = [
  { value: 'defi', label: 'DeFi' },
  { value: 'gamefi', label: 'GameFi' },
  { value: 'nft', label: 'NFT' },
  { value: 'layer1', label: 'Layer1' },
  { value: 'layer2', label: 'Layer2' },
  { value: 'meme', label: 'Meme' },
  { value: 'other', label: '其他' },
]

const getSectorLabel = (sector: Sector) => {
  return SECTORS.find(s => s.value === sector)?.label || sector
}

const getSectorColor = (sector: Sector) => {
  const colors: Record<Sector, string> = {
    defi: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    gamefi: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    nft: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    layer1: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    layer2: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    meme: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  }
  return colors[sector]
}

export default function CoinsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingPrecision, setEditingPrecision] = useState<string | null>(null)
  const [tempPrecision, setTempPrecision] = useState("")
  const [editingWeight, setEditingWeight] = useState<string | null>(null)
  const [tempWeight, setTempWeight] = useState("")

  const [coins, setCoins] = useState<SpotCoin[]>([
    { id: '1', coinId: 'BTC001', symbol: "BTC", name: "Bitcoin", listedName: "比特币", precision: 8, displayWeight: 100, onChainExists: true, sector: 'layer1', transferEnabled: true, status: "启用" },
    { id: '2', coinId: 'ETH001', symbol: "ETH", name: "Ethereum", listedName: "以太坊", precision: 8, displayWeight: 99, onChainExists: true, sector: 'layer1', transferEnabled: true, status: "启用" },
    { id: '3', coinId: 'USDT001', symbol: "USDT", name: "Tether", listedName: "泰达币", precision: 6, displayWeight: 98, onChainExists: true, sector: 'defi', transferEnabled: true, status: "启用" },
    { id: '4', coinId: 'BNB001', symbol: "BNB", name: "Binance Coin", listedName: "币安币", precision: 8, displayWeight: 97, onChainExists: true, sector: 'layer1', transferEnabled: true, status: "启用" },
    { id: '5', coinId: 'SOL001', symbol: "SOL", name: "Solana", listedName: "索拉纳", precision: 9, displayWeight: 96, onChainExists: true, sector: 'layer1', transferEnabled: true, status: "启用" },
    { id: '6', coinId: 'DOGE001', symbol: "DOGE", name: "Dogecoin", listedName: "狗狗币", precision: 8, displayWeight: 80, onChainExists: true, sector: 'meme', transferEnabled: false, status: "启用" },
    { id: '7', coinId: 'UNI001', symbol: "UNI", name: "Uniswap", listedName: "Uniswap", precision: 18, displayWeight: 75, onChainExists: true, sector: 'defi', transferEnabled: true, status: "启用" },
    { id: '8', coinId: 'SAND001', symbol: "SAND", name: "The Sandbox", listedName: "沙盒", precision: 18, displayWeight: 70, onChainExists: true, sector: 'gamefi', transferEnabled: true, status: "启用" },
  ])

  const filteredCoins = coins.filter(coin => 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.listedName.includes(searchQuery)
  )

  const handleSavePrecision = (id: string) => {
    const precision = parseInt(tempPrecision)
    if (isNaN(precision) || precision < 0 || precision > 18) {
      toast.error("精度必须在0-18之间")
      return
    }
    setCoins(prev => prev.map(coin => 
      coin.id === id ? { ...coin, precision } : coin
    ))
    setEditingPrecision(null)
    toast.success("精度已更新")
  }

  const handleSaveWeight = (id: string) => {
    const weight = parseInt(tempWeight)
    if (isNaN(weight) || weight < 0) {
      toast.error("权重必须为非负整数")
      return
    }
    setCoins(prev => prev.map(coin => 
      coin.id === id ? { ...coin, displayWeight: weight } : coin
    ))
    setEditingWeight(null)
    toast.success("权重已更新")
  }

  const toggleTransfer = (id: string) => {
    setCoins(prev => prev.map(coin => {
      if (coin.id === id) {
        const newState = !coin.transferEnabled
        toast.success(newState ? "已开放划转" : "已关闭划转")
        return { ...coin, transferEnabled: newState }
      }
      return coin
    }))
  }

  const handleSectorChange = (id: string, sector: Sector) => {
    setCoins(prev => prev.map(coin => 
      coin.id === id ? { ...coin, sector } : coin
    ))
    toast.success("板块已更新")
  }

  return (
    <SpotLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-custom-green/10 flex items-center justify-center">
              <Coins className="text-custom-green" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">币种管理</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">管理现货交易支持的币种</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Info className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-700 dark:text-blue-300">币种列表从Crypto币种管理中读取</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索币种名称、符号或收录名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">币种ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">币种符号</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">币种名称</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">收录名称</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">精度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">展示权重</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">链上存在</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">所属板块</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">开放划转</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCoins.map((coin) => (
                  <tr key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{coin.coinId}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900 dark:text-white">{coin.symbol}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{coin.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{coin.listedName}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingPrecision === coin.id ? (
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            value={tempPrecision}
                            onChange={(e) => setTempPrecision(e.target.value)}
                            className="w-16 h-7 text-sm"
                            min={0}
                            max={18}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSavePrecision(coin.id)
                              if (e.key === 'Escape') setEditingPrecision(null)
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleSavePrecision(coin.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            onClick={() => setEditingPrecision(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1 group"
                          onClick={() => {
                            setEditingPrecision(coin.id)
                            setTempPrecision(coin.precision.toString())
                          }}
                        >
                          <span className="text-gray-900 dark:text-white font-medium">{coin.precision}</span>
                          <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingWeight === coin.id ? (
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            value={tempWeight}
                            onChange={(e) => setTempWeight(e.target.value)}
                            className="w-16 h-7 text-sm"
                            min={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveWeight(coin.id)
                              if (e.key === 'Escape') setEditingWeight(null)
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleSaveWeight(coin.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            onClick={() => setEditingWeight(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1 group"
                          onClick={() => {
                            setEditingWeight(coin.id)
                            setTempWeight(coin.displayWeight.toString())
                          }}
                        >
                          <span className="text-gray-900 dark:text-white font-medium">{coin.displayWeight}</span>
                          <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        coin.onChainExists 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {coin.onChainExists ? '是' : '否'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Select 
                        value={coin.sector} 
                        onValueChange={(value: Sector) => handleSectorChange(coin.id, value)}
                      >
                        <SelectTrigger className="w-24 h-7 text-xs">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getSectorColor(coin.sector)}`}>
                            {getSectorLabel(coin.sector)}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {SECTORS.map(sector => (
                            <SelectItem key={sector.value} value={sector.value}>
                              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getSectorColor(sector.value)}`}>
                                {sector.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Switch
                        checked={coin.transferEnabled}
                        onCheckedChange={() => toggleTransfer(coin.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SpotLayout>
  )
}
