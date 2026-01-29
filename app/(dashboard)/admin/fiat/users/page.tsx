/* eslint-disable react/no-unescaped-entities */
"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Search, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTotal } from "@/components/data-total"
import { mchInfoApis, type MchInfo, type PaginatedResponse } from "@/router/mch-info-api"

type MerchantTypeFilter = "all" | "1" | "2" | "3"
type MerchantStateFilter = "all" | "0" | "1"

const typeLabel = (type?: number) => {
  if (type === 1) return "普通商户"
  if (type === 2) return "特约商户"
  if (type === 3) return "信用卡API商户"
  return "-"
}

const stateLabel = (state?: number) => {
  if (state === 1) return "正常"
  if (state === 0) return "停用"
  return "-"
}

const fmtMoney = (v?: number) => {
  if (typeof v !== "number" || Number.isNaN(v)) return "-"
  return v.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function FiatUsersPage() {
  const [mchNo, setMchNo] = useState("")
  const [isvNo, setIsvNo] = useState("")
  const [mchName, setMchName] = useState("")
  const [type, setType] = useState<MerchantTypeFilter>("all")
  const [state, setState] = useState<MerchantStateFilter>("all")

  const [applied, setApplied] = useState<{
    mchNo: string
    isvNo: string
    mchName: string
    type: MerchantTypeFilter
    state: MerchantStateFilter
  }>({ mchNo: "", isvNo: "", mchName: "", type: "all", state: "all" })

  const [data, setData] = useState<PaginatedResponse<MchInfo> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [current, setCurrent] = useState(1)
  const size = 10

  const abortRef = useRef<AbortController | null>(null)

  const fetchList = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const res = await mchInfoApis.getMchInfoList({
        mchNo: applied.mchNo || undefined,
        isvNo: applied.isvNo || undefined,
        mchName: applied.mchName || undefined,
        type: applied.type === "all" ? undefined : Number(applied.type),
        state: applied.state === "all" ? undefined : Number(applied.state),
        current,
        size,
        signal: abortRef.current.signal,
      })
      if (abortRef.current.signal.aborted) return
      setData(res)
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return
      setError(e instanceof Error ? e.message : "加载失败")
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [applied, current])

  useEffect(() => {
    fetchList()
    return () => {
      abortRef.current?.abort()
    }
  }, [fetchList])

  const total = data?.total ?? 0
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / size)), [total, size])
  const records = data?.records ?? []

  const onSearch = () => {
    setCurrent(1)
    setApplied({ mchNo: mchNo.trim(), isvNo: isvNo.trim(), mchName: mchName.trim(), type, state })
  }

  const onReset = () => {
    setMchNo("")
    setIsvNo("")
    setMchName("")
    setType("all")
    setState("all")
    setCurrent(1)
    setApplied({ mchNo: "", isvNo: "", mchName: "", type: "all", state: "all" })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">法币用户管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">商户列表</p>
        </div>
      </div>

      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <Input placeholder="商户号（精确）" value={mchNo} onChange={(e) => setMchNo(e.target.value)} />
          <Input placeholder="服务商号（精确）" value={isvNo} onChange={(e) => setIsvNo(e.target.value)} />
          <Input placeholder="商户名称（模糊）" value={mchName} onChange={(e) => setMchName(e.target.value)} />

          <Select value={type} onValueChange={(v) => setType(v as MerchantTypeFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="商户类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="1">普通商户</SelectItem>
              <SelectItem value="2">特约商户</SelectItem>
              <SelectItem value="3">信用卡API商户</SelectItem>
            </SelectContent>
          </Select>

          <Select value={state} onValueChange={(v) => setState(v as MerchantStateFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="商户状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="1">正常</SelectItem>
              <SelectItem value="0">停用</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onSearch}
            className="bg-custom-green hover:bg-custom-green/90 text-white"
            disabled={loading}
          >
            <Search className="w-4 h-4 mr-1" />
            搜索
          </Button>
          <Button onClick={onReset} variant="outline" disabled={loading}>
            <RotateCcw className="w-4 h-4 mr-1" />
            重置
          </Button>

          <div className="ml-auto flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {loading && (
              <span className="inline-flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                加载中...
              </span>
            )}
          </div>
        </div>
      </Card>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>商户号</TableHead>
                <TableHead>商户名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>联系人</TableHead>
                <TableHead>手机号</TableHead>
                <TableHead className="text-right">法币资产</TableHead>
                <TableHead className="text-right">代付备用金</TableHead>
                <TableHead>创建时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((r) => (
                <TableRow key={r.mchNo} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <TableCell className="font-medium">{r.mchNo}</TableCell>
                  <TableCell>{r.mchName}</TableCell>
                  <TableCell>{typeLabel(r.type)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        r.state === 1
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {stateLabel(r.state)}
                    </span>
                  </TableCell>
                  <TableCell>{r.contactName || "-"}</TableCell>
                  <TableCell>{r.contactTel || "-"}</TableCell>
                  <TableCell className="text-right">{fmtMoney(r.fiatAssets)}</TableCell>
                  <TableCell className="text-right">{fmtMoney(r.fiatTransferAssets)}</TableCell>
                  <TableCell>{r.createdAt ? r.createdAt.replace("T", " ") : "-"}</TableCell>
                </TableRow>
              ))}

              {!loading && records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    暂无数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <DataTotal total={total} />
          <div className="p-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent((p) => Math.max(1, p - 1))}
              disabled={loading || current <= 1}
            >
              上一页
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              第 {current} / {totalPages} 页
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent((p) => Math.min(totalPages, p + 1))}
              disabled={loading || current >= totalPages || !(data?.hasNext ?? false)}
            >
              下一页
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 text-center text-red-600 dark:text-red-400 text-sm border-t border-gray-200 dark:border-gray-700">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

