"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Channel {
  id: string
  code: string
  name: string
  currency: string
  interface: string
  collectionFee: string
  paymentFee: string
  demoVideo?: string
  status: "active" | "inactive"
  createdAt: string
}

const mockChannels: Channel[] = [
  {
    id: "CH001",
    code: "ALIPAY_CN",
    name: "支付宝",
    currency: "CNY",
    interface: "Bitzpay",
    collectionFee: "0.5%",
    paymentFee: "0.3%",
    demoVideo: "https://example.com/demo1.mp4",
    status: "active",
    createdAt: "2024-01-15 10:30:00"
  },
  {
    id: "CH002",
    code: "WECHAT_CN",
    name: "微信支付",
    currency: "CNY",
    interface: "Bitzpay",
    collectionFee: "0.5%",
    paymentFee: "0.3%",
    demoVideo: "https://example.com/demo2.mp4",
    status: "active",
    createdAt: "2024-01-15 10:35:00"
  },
  {
    id: "CH003",
    code: "BANK_CN",
    name: "银行转账",
    currency: "CNY",
    interface: "BePayOTC",
    collectionFee: "0.3%",
    paymentFee: "0.2%",
    status: "active",
    createdAt: "2024-01-16 09:20:00"
  },
  {
    id: "CH004",
    code: "PIX_BR",
    name: "PIX支付",
    currency: "BRL",
    interface: "CFpay",
    collectionFee: "0.8%",
    paymentFee: "0.5%",
    demoVideo: "https://example.com/demo3.mp4",
    status: "active",
    createdAt: "2024-01-17 14:15:00"
  },
  {
    id: "CH005",
    code: "UPI_IN",
    name: "UPI支付",
    currency: "INR",
    interface: "CFpay",
    collectionFee: "0.6%",
    paymentFee: "0.4%",
    status: "active",
    createdAt: "2024-01-18 11:00:00"
  },
]

const currencies = ["全部", "CNY", "BRL", "INR", "USD", "EUR"]

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("全部")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false)
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    currency: "",
    interface: "",
    collectionFee: "",
    paymentFee: "",
    demoVideo: "",
    status: "active" as "active" | "inactive"
  })

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = 
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.interface.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCurrency = selectedCurrency === "全部" || channel.currency === selectedCurrency
    
    return matchesSearch && matchesCurrency
  })

  const handleAdd = () => {
    const newChannel: Channel = {
      id: `CH${String(channels.length + 1).padStart(3, '0')}`,
      ...formData,
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setChannels([...channels, newChannel])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (currentChannel) {
      setChannels(channels.map(c => 
        c.id === currentChannel.id ? { ...currentChannel, ...formData } : c
      ))
      setIsEditDialogOpen(false)
      setCurrentChannel(null)
      resetForm()
    }
  }

  const handleDelete = () => {
    if (currentChannel) {
      setChannels(channels.filter(c => c.id !== currentChannel.id))
      setIsDeleteDialogOpen(false)
      setCurrentChannel(null)
    }
  }

  const openEditDialog = (channel: Channel) => {
    setCurrentChannel(channel)
    setFormData({
      code: channel.code,
      name: channel.name,
      currency: channel.currency,
      interface: channel.interface,
      collectionFee: channel.collectionFee,
      paymentFee: channel.paymentFee,
      demoVideo: channel.demoVideo || "",
      status: channel.status
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (channel: Channel) => {
    setCurrentChannel(channel)
    setIsDeleteDialogOpen(true)
  }

  const openDemoDialog = (channel: Channel) => {
    setCurrentChannel(channel)
    setIsDemoDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      currency: "",
      interface: "",
      collectionFee: "",
      paymentFee: "",
      demoVideo: "",
      status: "active"
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">通道列表</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-custom-green hover:bg-custom-green/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加通道
        </Button>
      </div>

      <Tabs value={selectedCurrency} onValueChange={setSelectedCurrency}>
        <TabsList className="grid grid-cols-6 w-full max-w-2xl">
          {currencies.map(currency => (
            <TabsTrigger key={currency} value={currency}>
              {currency}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="搜索通道名称、代码或接口..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  通道信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  接口来源
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  代收费率
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  代付费率
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredChannels.map((channel) => (
                <tr key={channel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{channel.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">ID: {channel.id} | {channel.code}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {channel.currency}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {channel.interface}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {channel.collectionFee}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {channel.paymentFee}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      channel.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}>
                      {channel.status === "active" ? "启用" : "禁用"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      {channel.demoVideo && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDemoDialog(channel)}
                          className="text-custom-green hover:text-custom-green/80"
                          title="查看演示"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(channel)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(channel)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredChannels.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加通道</DialogTitle>
            <DialogDescription>添加新的支付通道</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">通道代码</Label>
              <Input
                id="code"
                placeholder="例如：ALIPAY_CN"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">通道名称</Label>
              <Input
                id="name"
                placeholder="例如：支付宝"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">币种</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="选择币种" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNY">CNY</SelectItem>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interface">接口来源</Label>
              <Select value={formData.interface} onValueChange={(value) => setFormData({...formData, interface: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="选择接口" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bitzpay">Bitzpay</SelectItem>
                  <SelectItem value="BePayOTC">BePayOTC</SelectItem>
                  <SelectItem value="CFpay">CFpay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="collectionFee">代收手续费</Label>
              <Input
                id="collectionFee"
                placeholder="例如：0.5%"
                value={formData.collectionFee}
                onChange={(e) => setFormData({...formData, collectionFee: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentFee">代付手续费</Label>
              <Input
                id="paymentFee"
                placeholder="例如：0.3%"
                value={formData.paymentFee}
                onChange={(e) => setFormData({...formData, paymentFee: e.target.value})}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="demoVideo">Demo视频链接</Label>
              <Input
                id="demoVideo"
                placeholder="https://example.com/demo.mp4"
                value={formData.demoVideo}
                onChange={(e) => setFormData({...formData, demoVideo: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">状态</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">启用</SelectItem>
                  <SelectItem value="inactive">禁用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAdd} className="bg-custom-green hover:bg-custom-green/90">
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑通道</DialogTitle>
            <DialogDescription>修改通道配置信息</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-code">通道代码</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">通道名称</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-currency">币种</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNY">CNY</SelectItem>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-interface">接口来源</Label>
              <Select value={formData.interface} onValueChange={(value) => setFormData({...formData, interface: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bitzpay">Bitzpay</SelectItem>
                  <SelectItem value="BePayOTC">BePayOTC</SelectItem>
                  <SelectItem value="CFpay">CFpay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-collectionFee">代收手续费</Label>
              <Input
                id="edit-collectionFee"
                value={formData.collectionFee}
                onChange={(e) => setFormData({...formData, collectionFee: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-paymentFee">代付手续费</Label>
              <Input
                id="edit-paymentFee"
                value={formData.paymentFee}
                onChange={(e) => setFormData({...formData, paymentFee: e.target.value})}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-demoVideo">Demo视频链接</Label>
              <Input
                id="edit-demoVideo"
                value={formData.demoVideo}
                onChange={(e) => setFormData({...formData, demoVideo: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">状态</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">启用</SelectItem>
                  <SelectItem value="inactive">禁用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEdit} className="bg-custom-green hover:bg-custom-green/90">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除通道</DialogTitle>
            <DialogDescription>
              确定要删除通道 "{currentChannel?.name}" 吗？此操作不可恢复。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Demo视频 - {currentChannel?.name}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            {currentChannel?.demoVideo ? (
              <video
                src={currentChannel.demoVideo}
                controls
                className="w-full h-full rounded-lg"
              >
                您的浏览器不支持视频播放
              </video>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">暂无视频</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
