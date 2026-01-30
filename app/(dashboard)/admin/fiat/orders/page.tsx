"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Info, Send, RefreshCw, Lock, Unlock, RotateCcw, FileDown, Loader2, Eye } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DataTotal } from "@/components/data-total"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { payOrderApis, type PayOrder, type PaginatedResponse } from "@/router/pay-order-api"
import { fiatApis, type FiatCurrency } from "@/router/fiat-api"
import { payWaysApis, type PayWay } from "@/router/pay-ways-api"

const dl = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

const toNum = (v: string) => {
  const n = Number(v.trim())
  return Number.isFinite(n) ? n : undefined
}

const tryJson = (v: unknown): any | undefined => {
  if (!v) return undefined
  if (typeof v === "object") return v
  if (typeof v !== "string") return undefined
  const s = v.trim()
  if (!s) return undefined
  try {
    return JSON.parse(s)
  } catch {}
  return undefined
}

const normalizeChannelName = (s: string) => s.replace(/支付$/g, "")

const pickSearchField = (keyword: string): { payOrderId?: string; mchNo?: string } => {
  const k = keyword.trim()
  if (!k) return {}
  if (/^M\d+/i.test(k)) return { mchNo: k }
  if (/^\d{6,}$/.test(k)) return { mchNo: k }
  return { payOrderId: k }
}

type OrderTypeTab = "collection" | "payout"

const toPayType = (t: OrderTypeTab) => (t === "collection" ? "1" : "2")

const stateMeta = (v: unknown) => {
  const n = Number(v)
  switch (n) {
    case 0:
      return {
        label: "订单生成",
        className: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
      }
    case 1:
      return {
        label: "支付中",
        className: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
      }
    case 2:
      return {
        label: "支付成功",
        className: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
      }
    case 3:
      return {
        label: "支付失败",
        className: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
      }
    case 4:
      return {
        label: "已撤销",
        className: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
      }
    case 5:
      return {
        label: "已退款",
        className: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
      }
    case 6:
      return {
        label: "订单关闭",
        className: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
      }
    default:
      return {
        label: v === undefined || v === null ? "-" : String(v),
        className: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
      }
  }
}

export default function FiatOrdersPage() {
  const [orderTypeTab, setOrderTypeTab] = useState<OrderTypeTab>("collection")

  const [currencyTab, setCurrencyTab] = useState("all")
  const [wayCodeTab, setWayCodeTab] = useState("all")
  const [state, setState] = useState("all")
  const [searchKeyword, setSearchKeyword] = useState("")

  const [current, setCurrent] = useState(1)
  const size = 10

  const [data, setData] = useState<PaginatedResponse<PayOrder> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const [enabledCurrencies, setEnabledCurrencies] = useState<string[]>([])
  const [payWayCurrencies, setPayWayCurrencies] = useState<string[]>([])
  const [wayOptions, setWayOptions] = useState<Array<{ wayCode: string; wayName?: string }>>([])

  const [applied, setApplied] = useState<{
    orderType: OrderTypeTab
    currency: string
    wayCode: string
    state: string
    keyword: string
  }>({ orderType: "collection", currency: "all", wayCode: "all", state: "all", keyword: "" })

  const fetchList = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setLoading(true)
    setError(null)

    const k = pickSearchField(applied.keyword)
    try {
      const payType = toPayType(applied.orderType)
      const res = await payOrderApis.getPayOrders({
        pageNumber: current,
        pageSize: size,
        payType,
        currency: applied.currency === "all" ? undefined : applied.currency,
        wayCode: applied.wayCode === "all" ? undefined : applied.wayCode,
        state: applied.state === "all" ? undefined : applied.state,
        ...k,
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

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        const enabled: FiatCurrency[] = []
        let page = 1
        for (;;) {
          const res = await fiatApis.getFiatList({ pageNumber: page, pageSize: 500, signal: ac.signal })
          if (ac.signal.aborted) return
          enabled.push(...(res.records || []))
          if (!res.hasNext) break
          page += 1
          if (page > 50) break
        }

        const set = new Set<string>()
        for (const r of enabled) {
          const code = String(r.currencyCode || "").trim()
          if (!code) continue
          if (r.isShow && !r.deleted) set.add(code)
        }
        setEnabledCurrencies(Array.from(set))
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return
        if (ac.signal.aborted) return
        setEnabledCurrencies([])
      }
    })()
    return () => ac.abort()
  }, [])

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        const all: PayWay[] = []
        let page = 1
        const payType = toPayType(orderTypeTab)
        for (;;) {
          const res = await payWaysApis.getPayWays({ payType, pageNumber: page, pageSize: 500, signal: ac.signal })
          if (ac.signal.aborted) return
          all.push(...(res.records || []))
          if (!res.hasNext) break
          page += 1
          if (page > 50) break
        }

        const set = new Set<string>()
        for (const r of all) {
          const c = String((r as any).currency || "").trim()
          if (c) set.add(c)
        }
        setPayWayCurrencies(Array.from(set))
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return
        if (ac.signal.aborted) return
        setPayWayCurrencies([])
      }
    })()
    return () => ac.abort()
  }, [orderTypeTab])

  const currencyOptions = useMemo(() => {
    const enabledSet = new Set(enabledCurrencies)
    const paySet = new Set(payWayCurrencies)
    const list: string[] = []
    if (enabledSet.size && paySet.size) {
      for (const c of enabledSet) if (paySet.has(c)) list.push(c)
    } else if (enabledSet.size) {
      list.push(...enabledCurrencies)
    } else if (paySet.size) {
      list.push(...payWayCurrencies)
    }
    return ["all", ...Array.from(new Set(list))]
  }, [enabledCurrencies, payWayCurrencies])

  useEffect(() => {
    if (currencyTab !== "all" && !currencyOptions.includes(currencyTab)) {
      setCurrencyTab("all")
      setWayCodeTab("all")
      setCurrent(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyOptions.join("|")])

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        if (currencyTab === "all") {
          setWayOptions([])
          return
        }
        const payType = toPayType(orderTypeTab)
        const all: PayWay[] = []
        let page = 1
        const currency = currencyTab
        for (;;) {
          const res = await payWaysApis.getPayWays({
            payType,
            currency,
            pageNumber: page,
            pageSize: 500,
            signal: ac.signal,
          })
          if (ac.signal.aborted) return
          all.push(...(res.records || []))
          if (!res.hasNext) break
          page += 1
          if (page > 50) break
        }

        const m = new Map<string, { wayCode: string; wayName?: string }>()
        for (const r of all) {
          const code = String((r as any).wayCode || "").trim()
          if (!code) continue
          if (!m.has(code)) m.set(code, { wayCode: code, wayName: (r as any).wayName })
        }
        setWayOptions(Array.from(m.values()))
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return
        if (ac.signal.aborted) return
        setWayOptions([])
      }
    })()
    return () => ac.abort()
  }, [orderTypeTab, currencyTab])

  const wayCodes = useMemo(() => {
    return ["all", ...wayOptions.map((x) => x.wayCode)]
  }, [wayOptions])

  const wayLabel = useMemo(() => {
    const m = new Map<string, string>()
    for (const x of wayOptions) {
      const code = String(x.wayCode || "").trim()
      if (!code) continue
      const name = String(x.wayName || "").trim()
      if (name) m.set(code, name)
    }
    return m
  }, [wayOptions])

  const onSearch = () => {
    setCurrent(1)
    setApplied({
      orderType: orderTypeTab,
      currency: currencyTab,
      wayCode: wayCodeTab,
      state,
      keyword: searchKeyword.trim(),
    })
  }

  const onReset = () => {
    setOrderTypeTab("collection")
    setCurrencyTab("all")
    setWayCodeTab("all")
    setState("all")
    setSearchKeyword("")
    setCurrent(1)
    setApplied({ orderType: "collection", currency: "all", wayCode: "all", state: "all", keyword: "" })
  }

  const [detailOpen, setDetailOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [detail, setDetail] = useState<PayOrder | null>(null)
  const [detailRow, setDetailRow] = useState<PayOrder | null>(null)
  const detailAbortRef = useRef<AbortController | null>(null)

  const openDetail = async (row: PayOrder) => {
    const id = String((row as any).payOrderId || (row as any).id || "")
    if (!id) return
    setDetailOpen(true)
    setDetail(null)
    setDetailError(null)
    setDetailRow(row)
    detailAbortRef.current?.abort()
    detailAbortRef.current = new AbortController()
    setDetailLoading(true)
    try {
      const res = await payOrderApis.getPayOrderDetail(id, { signal: detailAbortRef.current.signal })
      if (detailAbortRef.current.signal.aborted) return
      setDetail(res)
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return
      setDetailError(e instanceof Error ? e.message : "加载失败")
    } finally {
      setDetailLoading(false)
    }
  }

  const infoDetails = useMemo(() => {
    const src: any = detail || detailRow || {}
    const wayName = String(src.wayName || src.paymentChannel || src.wayCode || "").trim()
    const base = wayName ? normalizeChannelName(wayName) : "其他"
    const type = orderTypeTab === "collection" ? `${base}收款` : `${base}付款`

    const ifParamsObj = tryJson(src.ifParams) || tryJson(src.channelParams) || tryJson(src.payParams) || {}
    const pick = (keys: string[]) => {
      for (const k of keys) {
        const v = (ifParamsObj as any)?.[k]
        if (v === undefined || v === null) continue
        const s = String(v).trim()
        if (s) return s
      }
      return ""
    }

    const isCollection = orderTypeTab === "collection"
    const account = pick(["account", "payAccount", "accountNo", "acct", "userName", "loginName"])
    const mchId = pick(["mchId", "merchantNo", "merchantId", "partnerId", "pid"])
    const qr = pick(["qrCode", "qrcode", "payUrl", "url", "qr", "codeUrl"])

    const details: { label: string; value: string }[] = []
    if (account) details.push({ label: isCollection ? "收款账号" : "付款账号", value: account })
    if (mchId) details.push({ label: isCollection ? "商户号" : "商户号", value: mchId })
    if (qr) details.push({ label: isCollection ? "收款二维码" : "付款信息", value: qr })

    if (!details.length) {
      const mchNo = String(src.mchNo || "").trim()
      const payOrderId = String(src.payOrderId || src.id || "").trim()
      if (mchNo) details.push({ label: "商户号", value: mchNo })
      if (wayName) details.push({ label: "支付通道", value: wayName })
      if (payOrderId) details.push({ label: "订单号", value: payOrderId })
      if (!details.length) details.push({ label: isCollection ? "收款信息" : "付款信息", value: "暂无详细信息" })
    }

    return { type, details }
  }, [detail, detailRow, orderTypeTab])

  type ActionType = "notify" | "reissue" | "manual_freeze" | "manual_unfreeze" | "manual_refund" | "refunds"
  const [actionOpen, setActionOpen] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("notify")
  const [actionRow, setActionRow] = useState<PayOrder | null>(null)
  const [actionMchNo, setActionMchNo] = useState("")
  const [refundAmount, setRefundAmount] = useState("")
  const [refundReason, setRefundReason] = useState("")
  const [acting, setActing] = useState(false)
  const [actionErr, setActionErr] = useState<string | null>(null)

  const openAction = (t: ActionType, row: PayOrder) => {
    setActionType(t)
    setActionRow(row)
    setActionErr(null)
    setRefundAmount("")
    setRefundReason("")
    setActionMchNo(String((row as any).mchNo || ""))
    setActionOpen(true)
  }

  const doAction = async () => {
    if (!actionRow) return
    const id = String((actionRow as any).payOrderId || (actionRow as any).id || "")
    if (!id) return
    setActing(true)
    setActionErr(null)
    try {
      if (actionType === "notify") await payOrderApis.manualNotify(id)
      if (actionType === "reissue") await payOrderApis.reissueManualOrder(id)
      if (actionType === "manual_freeze") {
        if (!actionMchNo.trim()) throw new Error("mchNo 必填")
        await payOrderApis.manualFreeze(id, actionMchNo.trim())
      }
      if (actionType === "manual_unfreeze") {
        if (!actionMchNo.trim()) throw new Error("mchNo 必填")
        await payOrderApis.manualUnfreeze(id, actionMchNo.trim())
      }
      if (actionType === "manual_refund") {
        if (!actionMchNo.trim()) throw new Error("mchNo 必填")
        await payOrderApis.manualRefund(id, actionMchNo.trim())
      }
      if (actionType === "refunds") {
        const amt = toNum(refundAmount)
        if (amt === undefined) throw new Error("refundAmount 必填")
        await payOrderApis.refunds(id, amt, refundReason.trim() || undefined)
      }

      setActionOpen(false)
      await fetchList()
    } catch (e) {
      setActionErr(e instanceof Error ? e.message : "操作失败")
    } finally {
      setActing(false)
    }
  }

  const [exporting, setExporting] = useState(false)
  const exportOrders = async () => {
    setExporting(true)
    try {
      const k = pickSearchField(applied.keyword)
      const payType = toPayType(applied.orderType)
      const { blob, filename } = await payOrderApis.download({
        payType,
        currency: applied.currency === "all" ? undefined : applied.currency,
        wayCode: applied.wayCode === "all" ? undefined : applied.wayCode,
        state: applied.state === "all" ? undefined : applied.state,
        ...k,
      })
      dl(blob, filename)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">法币订单管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">支付订单</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchList} disabled={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
          <Button onClick={exportOrders} disabled={exporting} className="bg-custom-green hover:bg-custom-green/90 text-white">
            <FileDown className="w-4 h-4 mr-2" />
            导出
          </Button>
          <Tabs
            value={orderTypeTab}
            onValueChange={(v) => {
              const ot = v as OrderTypeTab
              setOrderTypeTab(ot)
              setCurrencyTab("all")
              setWayCodeTab("all")
              setCurrent(1)
              setApplied({
                orderType: ot,
                currency: "all",
                wayCode: "all",
                state,
                keyword: searchKeyword.trim(),
              })
            }}
          >
            <TabsList>
              <TabsTrigger value="collection">代收订单</TabsTrigger>
              <TabsTrigger value="payout">代付订单</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">币种筛选</label>
          <Tabs
            value={currencyTab}
            onValueChange={(v) => {
              setCurrencyTab(v)
              setWayCodeTab("all")
              setCurrent(1)
              setApplied({
                orderType: orderTypeTab,
                currency: v,
                wayCode: "all",
                state,
                keyword: searchKeyword.trim(),
              })
            }}
          >
            <TabsList className="flex-wrap h-auto">
              {currencyOptions.map((c) => (
                <TabsTrigger key={c} value={c}>
                  {c === "all" ? "全部" : c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">支付通道筛选</label>
          <Tabs
            value={wayCodeTab}
            onValueChange={(v) => {
              setWayCodeTab(v)
              setCurrent(1)
              setApplied({
                orderType: orderTypeTab,
                currency: currencyTab,
                wayCode: v,
                state,
                keyword: searchKeyword.trim(),
              })
            }}
          >
            <TabsList className="flex-wrap h-auto">
              {wayCodes.map((w) => (
                <TabsTrigger key={w} value={w}>
                  {w === "all" ? "全部" : (wayLabel.get(w) || w)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
              <SelectItem value="0">订单生成</SelectItem>
              <SelectItem value="1">支付中</SelectItem>
              <SelectItem value="2">支付成功</SelectItem>
              <SelectItem value="3">支付失败</SelectItem>
              <SelectItem value="4">已撤销</SelectItem>
              <SelectItem value="5">已退款</SelectItem>
              <SelectItem value="6">订单关闭</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="搜索订单号、商户ID..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch()
              }}
              className="flex-1"
            />

            <div className="flex items-center gap-2">
              <Button onClick={onSearch} className="bg-custom-green hover:bg-custom-green/90 text-white" disabled={loading}>
                搜索
              </Button>
              <Button onClick={onReset} variant="outline" disabled={loading}>
                重置
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">订单信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">商户</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">支付信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">金额</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {records.map((r, idx) => {
                const id = String((r as any).payOrderId || (r as any).id || idx)
                const mch = String((r as any).mchNo || (r as any).merchantId || "-")
                const currency = String((r as any).currency || "-")
                const way = String((r as any).wayCode || "-")
                const ifCode = String((r as any).ifCode || "-")
                const amount = (r as any).amount
                const fee = (r as any).fee
                const createdAt = String((r as any).createdAt || "-").replace("T", " ")
                const st = stateMeta((r as any).state)

                return (
                  <tr key={id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">{String((r as any).payOrderId || (r as any).id || "-")}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{ifCode}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{mch}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                          {currency}
                        </span>
                        <span className="text-gray-900 dark:text-gray-300 text-xs">{way}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="text-gray-900 dark:text-white font-medium">{amount !== undefined ? `$${Number(amount).toFixed(2)}` : "-"}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{fee !== undefined ? `费: $${Number(fee).toFixed(2)}` : "-"}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="text-gray-900 dark:text-gray-300 text-xs">{createdAt}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${st.className}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openDetail(r)} title="详情" className="text-purple-600">
                          <Info className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openAction("notify", r)} title="补发通知" className="text-blue-600">
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openAction("reissue", r)} title="手动补单" className="text-green-600">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openAction("manual_freeze", r)} title="手动冻结" className="text-orange-600">
                          <Lock className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openAction("manual_unfreeze", r)} title="手动解冻" className="text-orange-600">
                          <Unlock className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openAction("manual_refund", r)} title="手动退款" className="text-red-600">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openAction("refunds", r)} title="发起退款" className="text-red-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              加载中...
            </span>
          </div>
        )}

        {!loading && records.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">暂无数据</div>
        )}

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <DataTotal total={total} />
          <div className="p-4 flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrent((p) => Math.max(1, p - 1))} disabled={loading || current <= 1}>
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

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{orderTypeTab === "collection" ? "收款信息" : "付款信息"}</DialogTitle>
            <DialogDescription>
              订单 "{String((detailRow as any)?.payOrderId || (detailRow as any)?.id || "-")}" 的{orderTypeTab === "collection" ? "收款" : "付款"}账户详情
            </DialogDescription>
          </DialogHeader>
          {detailLoading ? (
            <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                加载中...
              </span>
            </div>
          ) : detailError ? (
            <div className="py-6 text-sm text-red-600">{detailError}</div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-3">{infoDetails.type}</div>
                <div className="space-y-3">
                  {infoDetails.details.map((d, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{d.label}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white break-all">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={actionOpen} onOpenChange={setActionOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>订单操作</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">{String((actionRow as any)?.payOrderId || (actionRow as any)?.id || "-")}</div>

            {(actionType === "manual_refund" || actionType === "manual_freeze" || actionType === "manual_unfreeze") && (
              <Input placeholder="mchNo" value={actionMchNo} onChange={(e) => setActionMchNo(e.target.value)} />
            )}

            {actionType === "refunds" && (
              <>
                <Input placeholder="refundAmount" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} />
                <Input placeholder="refundReason" value={refundReason} onChange={(e) => setRefundReason(e.target.value)} />
              </>
            )}

            {actionErr && <div className="text-sm text-red-600">{actionErr}</div>}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setActionOpen(false)} disabled={acting}>
              取消
            </Button>
            <Button onClick={doAction} className="bg-custom-green hover:bg-custom-green/90" disabled={acting}>
              {acting ? (
                <span className="inline-flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  处理中
                </span>
              ) : (
                "确认"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

