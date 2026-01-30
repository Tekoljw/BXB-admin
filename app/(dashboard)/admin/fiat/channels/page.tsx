"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DataTotal } from "@/components/data-total"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { payWaysApis, type PayWay, type PaginatedResponse } from "@/router/pay-ways-api"

const toNumOrUndef = (v: string) => {
  const t = v.trim()
  if (!t) return undefined
  const n = Number(t)
  return Number.isFinite(n) ? n : undefined
}

export default function ChannelsPage() {
  const [wayCode, setWayCode] = useState("")
  const [wayName, setWayName] = useState("")
  const [currency, setCurrency] = useState("")
  const [ifCode, setIfCode] = useState("")
  const [payType, setPayType] = useState("")

  const [applied, setApplied] = useState({
    wayCode: "",
    wayName: "",
    currency: "",
    ifCode: "",
    payType: "",
  })

  const [current, setCurrent] = useState(1)
  const size = 10

  const [data, setData] = useState<PaginatedResponse<PayWay> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchList = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setLoading(true)
    setError(null)
    try {
      const res = await payWaysApis.getPayWays({
        wayCode: applied.wayCode || undefined,
        wayName: applied.wayName || undefined,
        currency: applied.currency || undefined,
        ifCode: applied.ifCode || undefined,
        payType: applied.payType || undefined,
        pageNumber: current,
        pageSize: size,
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
    return () => abortRef.current?.abort()
  }, [fetchList])

  const records = data?.records ?? []
  const total = data?.total ?? 0
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / size)), [total, size])

  const onSearch = () => {
    setCurrent(1)
    setApplied({
      wayCode: wayCode.trim(),
      wayName: wayName.trim(),
      currency: currency.trim(),
      ifCode: ifCode.trim(),
      payType: payType.trim(),
    })
  }

  const onReset = () => {
    setWayCode("")
    setWayName("")
    setCurrency("")
    setIfCode("")
    setPayType("")
    setCurrent(1)
    setApplied({ wayCode: "", wayName: "", currency: "", ifCode: "", payType: "" })
  }

  const [editOpen, setEditOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<PayWay | null>(null)
  const [form, setForm] = useState({
    wayCode: "",
    wayName: "",
    ifCode: "",
    currency: "",
    payType: "",
    ifRate: "",
    basicFee: "",
    minValue: "",
    maxValue: "",
  })

  const openCreate = () => {
    setEditing(null)
    setForm({
      wayCode: "",
      wayName: "",
      ifCode: "",
      currency: "",
      payType: "",
      ifRate: "",
      basicFee: "",
      minValue: "",
      maxValue: "",
    })
    setEditOpen(true)
  }

  const openEdit = (x: PayWay) => {
    setEditing(x)
    setForm({
      wayCode: x.wayCode || "",
      wayName: x.wayName || "",
      ifCode: x.ifCode || "",
      currency: x.currency || "",
      payType: x.payType || "",
      ifRate: x.ifRate !== undefined ? String(x.ifRate) : "",
      basicFee: x.basicFee !== undefined ? String(x.basicFee) : "",
      minValue: x.minValue !== undefined ? String(x.minValue) : "",
      maxValue: x.maxValue !== undefined ? String(x.maxValue) : "",
    })
    setEditOpen(true)
  }

  const save = async () => {
    const code = form.wayCode.trim().toUpperCase()
    if (!code) return

    setSaving(true)
    try {
      const payload = {
        wayCode: code,
        wayName: form.wayName.trim() || undefined,
        ifCode: form.ifCode.trim() || undefined,
        currency: form.currency.trim() || undefined,
        payType: form.payType.trim() || undefined,
        ifRate: toNumOrUndef(form.ifRate) ?? 0,
        basicFee: toNumOrUndef(form.basicFee) ?? 0,
        minValue: toNumOrUndef(form.minValue) ?? 0,
        maxValue: toNumOrUndef(form.maxValue) ?? 0,
      }

      if (editing) {
        await payWaysApis.updatePayWay(editing.wayCode, payload)
      } else {
        await payWaysApis.createPayWay(payload)
      }
      setEditOpen(false)
      await fetchList()
    } finally {
      setSaving(false)
    }
  }

  const del = async (x: PayWay) => {
    if (!confirm(`确定删除通道 ${x.wayCode} 吗？`)) return
    await payWaysApis.deletePayWay(x.wayCode)
    await fetchList()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">通道管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">支付方式</p>
        </div>
        <Button onClick={openCreate} className="bg-custom-green hover:bg-custom-green/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          新增
        </Button>
      </div>

      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <Input placeholder="wayCode" value={wayCode} onChange={(e) => setWayCode(e.target.value)} />
          <Input placeholder="wayName" value={wayName} onChange={(e) => setWayName(e.target.value)} />
          <Input placeholder="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
          <Input placeholder="ifCode" value={ifCode} onChange={(e) => setIfCode(e.target.value)} />
          <Input placeholder="payType" value={payType} onChange={(e) => setPayType(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onSearch} className="bg-custom-green hover:bg-custom-green/90 text-white" disabled={loading}>
            搜索
          </Button>
          <Button onClick={onReset} variant="outline" disabled={loading}>
            重置
          </Button>
          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
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
                <TableHead>wayCode</TableHead>
                <TableHead>wayName</TableHead>
                <TableHead>ifCode</TableHead>
                <TableHead>currency</TableHead>
                <TableHead>payType</TableHead>
                <TableHead className="text-right">ifRate</TableHead>
                <TableHead className="text-right">basicFee</TableHead>
                <TableHead className="text-right">minValue</TableHead>
                <TableHead className="text-right">maxValue</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((x) => (
                <TableRow key={x.wayCode} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <TableCell className="font-medium">{x.wayCode}</TableCell>
                  <TableCell>{x.wayName || "-"}</TableCell>
                  <TableCell>{x.ifCode || "-"}</TableCell>
                  <TableCell>{x.currency || "-"}</TableCell>
                  <TableCell>{x.payType || "-"}</TableCell>
                  <TableCell className="text-right">{x.ifRate ?? 0}</TableCell>
                  <TableCell className="text-right">{x.basicFee ?? 0}</TableCell>
                  <TableCell className="text-right">{x.minValue ?? 0}</TableCell>
                  <TableCell className="text-right">{x.maxValue ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(x)} title="编辑">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => del(x)} title="删除" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
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

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[720px]">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑通道" : "新增通道"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">wayCode *</div>
              <Input
                value={form.wayCode}
                onChange={(e) => setForm((s) => ({ ...s, wayCode: e.target.value }))}
                disabled={!!editing}
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">wayName</div>
              <Input value={form.wayName} onChange={(e) => setForm((s) => ({ ...s, wayName: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">ifCode</div>
              <Input value={form.ifCode} onChange={(e) => setForm((s) => ({ ...s, ifCode: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">currency</div>
              <Input value={form.currency} onChange={(e) => setForm((s) => ({ ...s, currency: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">payType</div>
              <Input value={form.payType} onChange={(e) => setForm((s) => ({ ...s, payType: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">ifRate</div>
              <Input value={form.ifRate} onChange={(e) => setForm((s) => ({ ...s, ifRate: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">basicFee</div>
              <Input value={form.basicFee} onChange={(e) => setForm((s) => ({ ...s, basicFee: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">minValue</div>
              <Input value={form.minValue} onChange={(e) => setForm((s) => ({ ...s, minValue: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">maxValue</div>
              <Input value={form.maxValue} onChange={(e) => setForm((s) => ({ ...s, maxValue: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>
              取消
            </Button>
            <Button
              onClick={save}
              className="bg-custom-green hover:bg-custom-green/90"
              disabled={saving || !form.wayCode.trim()}
            >
              {saving ? (
                <span className="inline-flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  保存中
                </span>
              ) : (
                "保存"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

