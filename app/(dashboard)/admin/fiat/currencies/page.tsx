"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit2,
  Upload,
  DollarSign,
  X
} from "lucide-react"

interface Currency {
  id: string
  code: string
  name: string
  shortName: string
  icon: string
  status: "active" | "inactive"
  createdAt: string
}

export default function CurrenciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      id: "CUR001",
      code: "CNY",
      name: "人民币",
      shortName: "¥",
      icon: "🇨🇳",
      status: "active",
      createdAt: "2024-01-15 10:30:00"
    },
    {
      id: "CUR002",
      code: "USD",
      name: "美元",
      shortName: "$",
      icon: "🇺🇸",
      status: "active",
      createdAt: "2024-01-15 10:30:00"
    },
    {
      id: "CUR003",
      code: "BRL",
      name: "巴西雷亚尔",
      shortName: "R$",
      icon: "🇧🇷",
      status: "active",
      createdAt: "2024-01-15 10:30:00"
    },
    {
      id: "CUR004",
      code: "INR",
      name: "印度卢比",
      shortName: "₹",
      icon: "🇮🇳",
      status: "active",
      createdAt: "2024-01-18 14:20:00"
    },
    {
      id: "CUR005",
      code: "EUR",
      name: "欧元",
      shortName: "€",
      icon: "🇪🇺",
      status: "active",
      createdAt: "2024-01-20 09:15:00"
    }
  ])
  
  const [newCurrency, setNewCurrency] = useState({
    code: "",
    name: "",
    shortName: "",
    icon: ""
  })

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("图片大小不能超过2MB")
        return
      }
      
      if (!file.type.startsWith('image/')) {
        alert("请上传图片文件")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (isEdit && selectedCurrency) {
          setSelectedCurrency({ ...selectedCurrency, icon: result })
        } else {
          setNewCurrency({ ...newCurrency, icon: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveIcon = (isEdit = false) => {
    if (isEdit && selectedCurrency) {
      setSelectedCurrency({ ...selectedCurrency, icon: "" })
    } else {
      setNewCurrency({ ...newCurrency, icon: "" })
    }
  }

  const handleAddCurrency = () => {
    const currency: Currency = {
      id: `CUR${String(currencies.length + 1).padStart(3, '0')}`,
      ...newCurrency,
      status: "active",
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setCurrencies([...currencies, currency])
    setNewCurrency({ code: "", name: "", shortName: "", icon: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditCurrency = () => {
    if (!selectedCurrency) return
    
    setCurrencies(currencies.map(c => 
      c.id === selectedCurrency.id ? selectedCurrency : c
    ))
    setIsEditDialogOpen(false)
    setSelectedCurrency(null)
  }

  const handleDeleteCurrency = (id: string) => {
    if (confirm("确定要删除这个币种吗？")) {
      setCurrencies(currencies.filter(c => c.id !== id))
    }
  }

  const openEditDialog = (currency: Currency) => {
    setSelectedCurrency({ ...currency })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">币种管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理平台支持的所有币种
          </p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-custom-green hover:bg-custom-green/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加币种
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索币种代码、名称或简称..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">币种ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">图标</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">币种代码</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">币种名称</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">简称</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">创建时间</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCurrencies.map((currency) => (
                <tr key={currency.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {currency.id}
                  </td>
                  <td className="py-3 px-4">
                    {currency.icon ? (
                      currency.icon.startsWith('data:') ? (
                        <img src={currency.icon} alt={currency.code} className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-2xl">{currency.icon}</span>
                      )
                    ) : (
                      <DollarSign className="w-6 h-6 text-gray-400" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {currency.code}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {currency.name}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-custom-green">
                    {currency.shortName}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currency.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {currency.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                    {currency.createdAt}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(currency)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCurrency(currency.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
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

        {filteredCurrencies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">未找到相关币种</p>
          </div>
        )}
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加币种</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>币种代码 *</Label>
              <Input
                placeholder="例如: CNY, USD, BRL"
                value={newCurrency.code}
                onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="space-y-2">
              <Label>币种名称 *</Label>
              <Input
                placeholder="例如: 人民币, 美元, 巴西雷亚尔"
                value={newCurrency.name}
                onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>币种简称 *</Label>
              <Input
                placeholder="例如: ¥, $, R$"
                value={newCurrency.shortName}
                onChange={(e) => setNewCurrency({ ...newCurrency, shortName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>币种图标</Label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                />
                <Input
                  placeholder="输入emoji或留空"
                  value={newCurrency.icon && !newCurrency.icon.startsWith('data:') ? newCurrency.icon : ''}
                  onChange={(e) => setNewCurrency({ ...newCurrency, icon: e.target.value })}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              {newCurrency.icon && newCurrency.icon.startsWith('data:') && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <img 
                    src={newCurrency.icon} 
                    alt="预览" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">图片已上传</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => handleRemoveIcon(false)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <p className="text-xs text-gray-500">可以输入emoji（如🇨🇳）或上传图片（最大2MB）</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                setNewCurrency({ code: "", name: "", shortName: "", icon: "" })
              }}
            >
              取消
            </Button>
            <Button
              onClick={handleAddCurrency}
              disabled={!newCurrency.code || !newCurrency.name || !newCurrency.shortName}
              className="bg-custom-green hover:bg-custom-green/90"
            >
              确认添加
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑币种</DialogTitle>
          </DialogHeader>
          {selectedCurrency && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>币种代码</Label>
                <Input
                  value={selectedCurrency.code}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800"
                />
                <p className="text-xs text-gray-500">币种代码不可修改</p>
              </div>
              <div className="space-y-2">
                <Label>币种名称 *</Label>
                <Input
                  value={selectedCurrency.name}
                  onChange={(e) => setSelectedCurrency({ ...selectedCurrency, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>币种简称 *</Label>
                <Input
                  value={selectedCurrency.shortName}
                  onChange={(e) => setSelectedCurrency({ ...selectedCurrency, shortName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>币种图标</Label>
                <div className="flex items-center gap-2">
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                  <Input
                    placeholder="输入emoji或留空"
                    value={selectedCurrency.icon && !selectedCurrency.icon.startsWith('data:') ? selectedCurrency.icon : ''}
                    onChange={(e) => setSelectedCurrency({ ...selectedCurrency, icon: e.target.value })}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                {selectedCurrency.icon && selectedCurrency.icon.startsWith('data:') && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <img 
                      src={selectedCurrency.icon} 
                      alt="预览" 
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">图片已上传</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleRemoveIcon(true)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500">可以输入emoji（如🇨🇳）或上传图片（最大2MB）</p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                setSelectedCurrency(null)
              }}
            >
              取消
            </Button>
            <Button
              onClick={handleEditCurrency}
              className="bg-custom-green hover:bg-custom-green/90"
            >
              保存修改
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
