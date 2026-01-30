"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Edit2, Link2, Loader2, Plus, Trash2 } from "lucide-react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  payProviderApis,
  type PayProvider,
  type PaginatedResponse,
} from "@/router/pay-provider-api"
import { mchPayProviderApis, type MchPayProviderConfig } from "@/router/mch-pay-provider-api"

type StateFilter = "all" | "0" | "1"
type ProviderType = "1" | "2"

const stateLabel = (v?: number) => (v === 1 ? "正常" : v === 0 ? "停用" : "-")
const typeLabel = (v?: number) => (v === 1 ? "法币直充" : v === 2 ? "法币买币" : "-")

export default function SuppliersPage() {
  const [providerNo, setProviderNo] = useState("")
  const [providerName, setProviderName] = useState("")
  const [state, setState] = useState<StateFilter>("all")
  const [applied, setApplied] = useState({ providerNo: "", providerName: "", state: "all" as StateFilter })

  const [current, setCurrent] = useState(1)
  const size = 10

  const [data, setData] = useState<PaginatedResponse<PayProvider> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)

  const fetchList = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)
    try {
      const res = await payProviderApis.getPayProviderList({
        providerNo: applied.providerNo || undefined,
        providerName: applied.providerName || undefined,
        state: applied.state === "all" ? undefined : Number(applied.state),
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

  const [editOpen, setEditOpen] = useState(false)
  const [editing, setEditing] = useState<PayProvider | null>(null)
  const [form, setForm] = useState({
    providerName: "",
    providerShortName: "",
    type: "1" as ProviderType,
    contactName: "",
    contactTel: "",
    contactEmail: "",
    state: "1" as "0" | "1",
    remark: "",
  })
  const [saving, setSaving] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setForm({
      providerName: "",
      providerShortName: "",
      type: "1",
      contactName: "",
      contactTel: "",
      contactEmail: "",
      state: "1",
      remark: "",
    })
    setEditOpen(true)
  }

  const openEdit = (p: PayProvider) => {
    setEditing(p)
    setForm({
      providerName: p.providerName || "",
      providerShortName: p.providerShortName || "",
      type: String(p.type || 1) as ProviderType,
      contactName: p.contactName || "",
      contactTel: p.contactTel || "",
      contactEmail: p.contactEmail || "",
      state: String(p.state ?? 1) as "0" | "1",
      remark: p.remark || "",
    })
    setEditOpen(true)
  }

  const saveProvider = async () => {
    if (!form.providerName.trim()) return
    setSaving(true)
    try {
      const payload = {
        providerName: form.providerName.trim(),
        providerShortName: form.providerShortName.trim() || undefined,
        type: Number(form.type),
        contactName: form.contactName.trim() || undefined,
        contactTel: form.contactTel.trim() || undefined,
        contactEmail: form.contactEmail.trim() || undefined,
        state: Number(form.state),
        remark: form.remark.trim() || undefined,
      }
      if (editing) {
        await payProviderApis.updatePayProvider(editing.providerNo, payload)
      } else {
        await payProviderApis.createPayProvider(payload)
      }
      setEditOpen(false)
      await fetchList()
    } finally {
      setSaving(false)
    }
  }

  const deleteProvider = async (p: PayProvider) => {
    if (!confirm(`确定删除供应商 ${p.providerNo} 吗？`)) return
    await payProviderApis.deletePayProvider(p.providerNo)
    await fetchList()
  }

  const toggleState = async (p: PayProvider, checked: boolean) => {
    await payProviderApis.updatePayProvider(p.providerNo, { state: checked ? 1 : 0 })
    await fetchList()
  }

  const onSearch = () => {
    setCurrent(1)
    setApplied({ providerNo: providerNo.trim(), providerName: providerName.trim(), state })
  }

  const onReset = () => {
    setProviderNo("")
    setProviderName("")
    setState("all")
    setCurrent(1)
    setApplied({ providerNo: "", providerName: "", state: "all" })
  }

  const [bindOpen, setBindOpen] = useState(false)
  const [bindTarget, setBindTarget] = useState<PayProvider | null>(null)
  const [bindMchNo, setBindMchNo] = useState("")
  const [bindIfCode, setBindIfCode] = useState("FIAT_SUPPLIER")
  const [bindList, setBindList] = useState<MchPayProviderConfig[]>([])
  const [bindLoading, setBindLoading] = useState(false)
  const [bindError, setBindError] = useState<string | null>(null)

  const openBind = (p: PayProvider) => {
    setBindTarget(p)
    setBindList([])
    setBindError(null)
    setBindOpen(true)
  }

  const loadBind = async () => {
    if (!bindMchNo.trim() || !bindIfCode.trim()) return
    setBindLoading(true)
    setBindError(null)
    try {
      const list = await mchPayProviderApis.getMchPayProviderConfigList({
        mchNo: bindMchNo.trim(),
        ifCode: bindIfCode.trim(),
      })
      setBindList(list)
    } catch (e) {
      setBindError(e instanceof Error ? e.message : "加载失败")
      setBindList([])
    } finally {
      setBindLoading(false)
    }
  }

  const bindEnabled = useMemo(() => {
    if (!bindTarget) return false
    const hit = bindList.find((x) => x.providerNo === bindTarget.providerNo)
    return hit?.state === 1
  }, [bindList, bindTarget])

  const saveBindState = async (checked: boolean) => {
    if (!bindTarget) return
    const mchNoV = bindMchNo.trim()
    const ifCodeV = bindIfCode.trim()
    if (!mchNoV || !ifCodeV) return
    await mchPayProviderApis.saveOrUpdate({
      mchNo: mchNoV,
      ifCode: ifCodeV,
      providerNo: bindTarget.providerNo,
      state: checked ? 1 : 0,
    })
    await loadBind()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">供应商管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">支付供应商基础信息</p>
        </div>
        <Button onClick={openCreate} className="bg-custom-green hover:bg-custom-green/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          新增
        </Button>
      </div>

      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input placeholder="服务商号" value={providerNo} onChange={(e) => setProviderNo(e.target.value)} />
          <Input placeholder="服务商名称" value={providerName} onChange={(e) => setProviderName(e.target.value)} />
          <Select value={state} onValueChange={(v) => setState(v as StateFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="1">正常</SelectItem>
              <SelectItem value="0">停用</SelectItem>
            </SelectContent>
          </Select>
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
                <TableHead>服务商号</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>TG号</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>备注</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((p) => (
                <TableRow key={p.providerNo} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <TableCell className="font-medium">{p.providerNo}</TableCell>
                  <TableCell>{p.providerName}</TableCell>
                  <TableCell>{p.contactTel || "-"}</TableCell>
                  <TableCell>{typeLabel(p.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{stateLabel(p.state)}</span>
                      <Switch checked={p.state === 1} onCheckedChange={(v) => toggleState(p, v)} />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[240px] truncate">{p.remark || "-"}</TableCell>
                  <TableCell>{p.createdAt ? p.createdAt.replace("T", " ") : "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(p)} title="编辑">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openBind(p)} title="绑定状态">
                        <Link2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteProvider(p)} title="删除" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {!loading && records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
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
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑供应商" : "新增供应商"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">服务商名称 *</div>
              <Input
                value={form.providerName}
                onChange={(e) => setForm((s) => ({ ...s, providerName: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">服务商简称</div>
              <Input
                value={form.providerShortName}
                onChange={(e) => setForm((s) => ({ ...s, providerShortName: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">类型</div>
              <Select value={form.type} onValueChange={(v) => setForm((s) => ({ ...s, type: v as ProviderType }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">法币直充服务商</SelectItem>
                  <SelectItem value="2">法币买币服务商</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">状态</div>
              <Select value={form.state} onValueChange={(v) => setForm((s) => ({ ...s, state: v as "0" | "1" }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">正常</SelectItem>
                  <SelectItem value="0">停用</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">联系人</div>
              <Input value={form.contactName} onChange={(e) => setForm((s) => ({ ...s, contactName: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">TG号</div>
              <Input value={form.contactTel} onChange={(e) => setForm((s) => ({ ...s, contactTel: e.target.value }))} />
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">邮箱</div>
              <Input
                value={form.contactEmail}
                onChange={(e) => setForm((s) => ({ ...s, contactEmail: e.target.value }))}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">备注</div>
              <Textarea value={form.remark} onChange={(e) => setForm((s) => ({ ...s, remark: e.target.value }))} rows={3} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>
              取消
            </Button>
            <Button onClick={saveProvider} className="bg-custom-green hover:bg-custom-green/90" disabled={saving || !form.providerName.trim()}>
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

      <Sheet open={bindOpen} onOpenChange={setBindOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>绑定状态</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              供应商：<span className="font-medium text-gray-900 dark:text-white">{bindTarget?.providerNo}</span>
            </div>
            <Input placeholder="商户号 mchNo" value={bindMchNo} onChange={(e) => setBindMchNo(e.target.value)} />
            <Input placeholder="接口编码 ifCode" value={bindIfCode} onChange={(e) => setBindIfCode(e.target.value)} />
            <div className="flex items-center gap-2">
              <Button onClick={loadBind} disabled={bindLoading || !bindMchNo.trim() || !bindIfCode.trim()}>
                {bindLoading ? (
                  <span className="inline-flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    加载中
                  </span>
                ) : (
                  "查询"
                )}
              </Button>
              {bindError && <span className="text-sm text-red-600">{bindError}</span>}
            </div>

            <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">启用</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {bindMchNo.trim() && bindIfCode.trim() ? `${bindMchNo.trim()} / ${bindIfCode.trim()}` : "-"}
                </div>
              </div>
              <Switch
                checked={bindEnabled}
                onCheckedChange={(v) => saveBindState(v)}
                disabled={!bindTarget || !bindMchNo.trim() || !bindIfCode.trim() || bindLoading}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

