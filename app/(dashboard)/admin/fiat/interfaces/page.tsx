"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
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
import {
  payIfDefinesApis,
  type PayIfDefine,
} from "@/router/pay-if-defines-api"

const trimOrUndef = (v: string) => {
  const t = v.trim()
  return t ? t : undefined
}

const parseJsonOrUndef = (v: string) => {
  const t = v.trim()
  if (!t) return undefined
  return JSON.parse(t)
}

export default function InterfacesPage() {
  const [q, setQ] = useState("")
  const [activeOnly, setActiveOnly] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [list, setList] = useState<PayIfDefine[]>([])

  const abortRef = useRef<AbortController | null>(null)

  const fetchList = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setLoading(true)
    setError(null)
    try {
      const res = await payIfDefinesApis.getPayIfDefines({
        active: activeOnly ? 1 : undefined,
        signal: abortRef.current.signal,
      })
      if (abortRef.current.signal.aborted) return
      setList(Array.isArray(res) ? res : [])
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return
      setError(e instanceof Error ? e.message : "加载失败")
      setList([])
    } finally {
      setLoading(false)
    }
  }, [activeOnly])

  useEffect(() => {
    fetchList()
    return () => abortRef.current?.abort()
  }, [fetchList])

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase()
    if (!key) return list
    return list.filter((x) => {
      const code = String(x.ifCode || "").toLowerCase()
      const name = String(x.ifName || "").toLowerCase()
      return code.includes(key) || name.includes(key)
    })
  }, [list, q])

  const [editOpen, setEditOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<PayIfDefine | null>(null)
  const [form, setForm] = useState({
    ifCode: "",
    ifName: "",
    wayCodeStrs: "",
    wayCodeOutStrs: "",
    cryptoWayCodeStrs: "",
    cryptoWayCodeOutStrs: "",
    globalSetting: "",
    idrConfig: "",
  })

  const openCreate = () => {
    setEditing(null)
    setForm({
      ifCode: "",
      ifName: "",
      wayCodeStrs: "",
      wayCodeOutStrs: "",
      cryptoWayCodeStrs: "",
      cryptoWayCodeOutStrs: "",
      globalSetting: "",
      idrConfig: "",
    })
    setEditOpen(true)
  }

  const openEdit = (x: PayIfDefine) => {
    setEditing(x)
    setForm({
      ifCode: x.ifCode || "",
      ifName: x.ifName || "",
      wayCodeStrs: x.wayCodeStrs || "",
      wayCodeOutStrs: x.wayCodeOutStrs || "",
      cryptoWayCodeStrs: x.cryptoWayCodeStrs || "",
      cryptoWayCodeOutStrs: x.cryptoWayCodeOutStrs || "",
      globalSetting: x.globalSetting ? JSON.stringify(x.globalSetting, null, 2) : "",
      idrConfig: x.idrConfig ? JSON.stringify(x.idrConfig, null, 2) : "",
    })
    setEditOpen(true)
  }

  const save = async () => {
    const ifCode = form.ifCode.trim()
    const ifName = form.ifName.trim()
    if (!ifCode || !ifName) return

    let globalSetting: any
    let idrConfig: any
    try {
      globalSetting = parseJsonOrUndef(form.globalSetting)
      idrConfig = parseJsonOrUndef(form.idrConfig)
    } catch (e) {
      setError(e instanceof Error ? e.message : "JSON 格式错误")
      return
    }

    setSaving(true)
    try {
      const payload = {
        ifCode,
        ifName,
        wayCodeStrs: trimOrUndef(form.wayCodeStrs),
        wayCodeOutStrs: trimOrUndef(form.wayCodeOutStrs),
        cryptoWayCodeStrs: trimOrUndef(form.cryptoWayCodeStrs),
        cryptoWayCodeOutStrs: trimOrUndef(form.cryptoWayCodeOutStrs),
        globalSetting,
        idrConfig,
      }
      if (editing) {
        await payIfDefinesApis.updatePayIfDefine(editing.ifCode, payload)
      } else {
        await payIfDefinesApis.createPayIfDefine(payload)
      }
      setEditOpen(false)
      await fetchList()
    } finally {
      setSaving(false)
    }
  }

  const del = async (x: PayIfDefine) => {
    if (!confirm(`确定删除接口 ${x.ifCode} 吗？`)) return
    await payIfDefinesApis.deletePayIfDefine(x.ifCode)
    await fetchList()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">接口管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">支付接口定义</p>
        </div>
        <Button onClick={openCreate} className="bg-custom-green hover:bg-custom-green/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          新增
        </Button>
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <Input placeholder="搜索 ifCode / ifName" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="flex items-center gap-2 md:justify-end md:min-w-[260px]">
            <span className="text-sm text-gray-600 dark:text-gray-400">近30天有订单</span>
            <Switch checked={activeOnly} onCheckedChange={setActiveOnly} />
            <Button variant="outline" onClick={fetchList} disabled={loading}>
              刷新
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {loading && (
            <span className="inline-flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              加载中...
            </span>
          )}
        </div>
      </Card>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ifCode</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>收款通道</TableHead>
                <TableHead>出款通道</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((x) => (
                <TableRow key={x.ifCode} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <TableCell className="font-medium">{x.ifCode}</TableCell>
                  <TableCell>{x.ifName}</TableCell>
                  <TableCell className="max-w-[320px] truncate">{x.wayCodeStrs || "-"}</TableCell>
                  <TableCell className="max-w-[320px] truncate">{x.wayCodeOutStrs || "-"}</TableCell>
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
              {!loading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    暂无数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <DataTotal total={filtered.length} />
        </div>

        {error && (
          <div className="p-4 text-center text-red-600 dark:text-red-400 text-sm border-t border-gray-200 dark:border-gray-700">
            {error}
          </div>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑接口" : "新增接口"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">ifCode *</div>
              <Input
                value={form.ifCode}
                onChange={(e) => setForm((s) => ({ ...s, ifCode: e.target.value }))}
                disabled={!!editing}
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">ifName *</div>
              <Input value={form.ifName} onChange={(e) => setForm((s) => ({ ...s, ifName: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">wayCodeStrs</div>
              <Input
                value={form.wayCodeStrs}
                onChange={(e) => setForm((s) => ({ ...s, wayCodeStrs: e.target.value }))}
                placeholder="逗号分隔"
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">wayCodeOutStrs</div>
              <Input
                value={form.wayCodeOutStrs}
                onChange={(e) => setForm((s) => ({ ...s, wayCodeOutStrs: e.target.value }))}
                placeholder="逗号分隔"
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">cryptoWayCodeStrs</div>
              <Input
                value={form.cryptoWayCodeStrs}
                onChange={(e) => setForm((s) => ({ ...s, cryptoWayCodeStrs: e.target.value }))}
                placeholder="逗号分隔"
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">cryptoWayCodeOutStrs</div>
              <Input
                value={form.cryptoWayCodeOutStrs}
                onChange={(e) => setForm((s) => ({ ...s, cryptoWayCodeOutStrs: e.target.value }))}
                placeholder="逗号分隔"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">globalSetting (JSON)</div>
              <Textarea
                value={form.globalSetting}
                onChange={(e) => setForm((s) => ({ ...s, globalSetting: e.target.value }))}
                rows={6}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">idrConfig (JSON)</div>
              <Textarea
                value={form.idrConfig}
                onChange={(e) => setForm((s) => ({ ...s, idrConfig: e.target.value }))}
                rows={6}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>
              取消
            </Button>
            <Button
              onClick={save}
              className="bg-custom-green hover:bg-custom-green/90"
              disabled={saving || !form.ifCode.trim() || !form.ifName.trim()}
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

