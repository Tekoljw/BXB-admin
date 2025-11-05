"use client"

import React, { useState } from "react"
import { Eye, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Supplier {
  id: number
  tgid: string
  name: string
  tgAccount: string
  status: "active" | "inactive" | "suspended"
  config: string
  supportedInterfaces: string[]
  supportedMerchants: string[]
  balances: Array<{ currency: string; deposit: string; pending: string }>
  rates: Array<{ currency: string; paymentMethod: string; rate: string }>
}

const mockSuppliers: Supplier[] = [
  {
    id: 1,
    tgid: "TG001",
    name: "供应商A",
    tgAccount: "@supplier_a",
    status: "active",
    config: "标准配置",
    supportedInterfaces: ["接口1", "接口2", "接口3"],
    supportedMerchants: ["商户001", "商户002", "商户003"],
    balances: [
      { currency: "USDT", deposit: "10,000", pending: "2,500" },
      { currency: "BTC", deposit: "1.5", pending: "0.3" },
    ],
    rates: [
      { currency: "USDT", paymentMethod: "银行卡", rate: "0.5%" },
      { currency: "USDT", paymentMethod: "支付宝", rate: "0.6%" },
    ],
  },
  {
    id: 2,
    tgid: "TG002",
    name: "供应商B",
    tgAccount: "@supplier_b",
    status: "active",
    config: "高级配置",
    supportedInterfaces: ["接口1", "接口4"],
    supportedMerchants: ["商户004", "商户005"],
    balances: [
      { currency: "USDT", deposit: "25,000", pending: "5,000" },
    ],
    rates: [
      { currency: "USDT", paymentMethod: "微信", rate: "0.55%" },
    ],
  },
  {
    id: 3,
    tgid: "TG003",
    name: "供应商C",
    tgAccount: "@supplier_c",
    status: "inactive",
    config: "基础配置",
    supportedInterfaces: ["接口2", "接口5"],
    supportedMerchants: ["商户006"],
    balances: [
      { currency: "USDT", deposit: "5,000", pending: "1,000" },
    ],
    rates: [
      { currency: "USDT", paymentMethod: "银行卡", rate: "0.7%" },
    ],
  },
]

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogType, setDialogType] = useState<"interfaces" | "merchants" | "balances" | "rates" | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.tgid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.tgAccount.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openDialog = (type: "interfaces" | "merchants" | "balances" | "rates", supplier: Supplier) => {
    setDialogType(type)
    setSelectedSupplier(supplier)
  }

  const closeDialog = () => {
    setDialogType(null)
    setSelectedSupplier(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "活跃"
      case "inactive":
        return "停用"
      case "suspended":
        return "暂停"
      default:
        return status
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">供应商管理</h1>
          
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索供应商名称、TGID或TG账号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-custom-green"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TGID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TG账号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">参数配置</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">支持接口</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">支持商户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">余额查询</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">费率</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {supplier.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {supplier.tgid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {supplier.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {supplier.tgAccount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                        {getStatusText(supplier.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {supplier.config}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openDialog("interfaces", supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查看</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openDialog("merchants", supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查看</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openDialog("balances", supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查询</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openDialog("rates", supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查看</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              暂无数据
            </div>
          )}
        </div>
      </div>

      <Dialog open={dialogType !== null} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "interfaces" && "支持的接口"}
              {dialogType === "merchants" && "支持的商户"}
              {dialogType === "balances" && "余额查询"}
              {dialogType === "rates" && "费率配置"}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {dialogType === "interfaces" && selectedSupplier && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  供应商：<span className="font-medium text-gray-900 dark:text-white">{selectedSupplier.name}</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedSupplier.supportedInterfaces.map((iface, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{iface}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dialogType === "merchants" && selectedSupplier && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  供应商：<span className="font-medium text-gray-900 dark:text-white">{selectedSupplier.name}</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedSupplier.supportedMerchants.map((merchant, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{merchant}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dialogType === "balances" && selectedSupplier && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  供应商：<span className="font-medium text-gray-900 dark:text-white">{selectedSupplier.name}</span>
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">币种</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">保证金</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">待结算金额</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedSupplier.balances.map((balance, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{balance.currency}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{balance.deposit}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{balance.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {dialogType === "rates" && selectedSupplier && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  供应商：<span className="font-medium text-gray-900 dark:text-white">{selectedSupplier.name}</span>
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">币种</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">支付方式</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">费率</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedSupplier.rates.map((rate, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{rate.currency}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{rate.paymentMethod}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{rate.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
