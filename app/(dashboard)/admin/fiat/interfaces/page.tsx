"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Globe, Network, Settings, TrendingUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { DataTotal } from "@/components/data-total"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { payIfDefinesApis, type PayIfDefine } from "@/router/pay-if-defines-api"
import { payWaysApis, type PayWay } from "@/router/pay-ways-api"

type IfType = "OTC" | "三方支付" | "四方支付" | "加密货币托管钱包"

type UIInterface = {
  id: string
  name: string
  code: string
  description: string
  status: "active" | "inactive"
  type: IfType
  isUsed: boolean
  channelCount: number
  currencyCount: number
  createdAt: string
  supportedCurrencies: string[]
  supportedChannels: { name: string; code: string; type: string }[]
  raw: PayIfDefine
}

const splitCsv = (s?: string) =>
  String(s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)

const parseJsonOrUndef = (v: string) => {
  const t = v.trim()
  if (!t) return undefined
  return JSON.parse(t)
}

const payTypeLabel = (v: any) => {
  const n = Number(v)
  if (n === 1) return "代收"
  if (n === 2) return "代付"
  return "-"
}

const inferType = (x: PayIfDefine): IfType => {
  const s = `${x.ifCode || ""} ${x.ifName || ""}`.toLowerCase()
  if (s.includes("otc")) return "OTC"
  if (s.includes("wallet") || s.includes("custody") || s.includes("托管")) return "加密货币托管钱包"
  if (s.includes("4") || s.includes("four")) return "四方支付"
  return "三方支付"
}

export default function InterfacesPage() {
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currencyFilter, setCurrencyFilter] = useState<string>("all")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const [allIfs, setAllIfs] = useState<PayIfDefine[]>([])
  const [activeIfCodes, setActiveIfCodes] = useState<Set<string>>(new Set())
  const [payWays, setPayWays] = useState<PayWay[]>([])
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})

  const reload = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setLoading(true)
    setError(null)

    try {
      const signal = abortRef.current.signal
      const [defsAll, defsActive] = await Promise.all([
        payIfDefinesApis.getPayIfDefines({ signal }),
        payIfDefinesApis.getPayIfDefines({ active: 1, signal }),
      ])
      if (signal.aborted) return
      setAllIfs(Array.isArray(defsAll) ? defsAll : [])
      setActiveIfCodes(new Set((Array.isArray(defsActive) ? defsActive : []).map((x) => x.ifCode).filter(Boolean)))

      const list: PayWay[] = []
      let page = 1
      for (;;) {
        const res = await payWaysApis.getPayWays({ pageNumber: page, pageSize: 500, signal })
        if (signal.aborted) return
        list.push(...(res.records || []))
        if (!res.hasNext) break
        page += 1
        if (page > 100) break
      }
      setPayWays(list)
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return
      setError(e instanceof Error ? e.message : "加载失败")
      setAllIfs([])
      setActiveIfCodes(new Set())
      setPayWays([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
    return () => abortRef.current?.abort()
  }, [reload])

  const waysByIfCode = useMemo(() => {
    const m = new Map<string, PayWay[]>()
    for (const w of payWays) {
      const k = String((w as any).ifCode || "").trim()
      if (!k) continue
      const arr = m.get(k) || []
      arr.push(w)
      m.set(k, arr)
    }
    return m
  }, [payWays])

  const allCurrencies = useMemo(() => {
    const s = new Set<string>()
    for (const w of payWays) {
      const c = String((w as any).currency || "").trim()
      if (c) s.add(c)
    }
    return Array.from(s).sort()
  }, [payWays])

  const interfaces: UIInterface[] = useMemo(() => {
    return (allIfs || []).map((x) => {
      const code = String(x.ifCode || "").trim()
      const ws = waysByIfCode.get(code) || []
      const currencies = Array.from(new Set(ws.map((w) => String((w as any).currency || "").trim()).filter(Boolean))).sort()
      const createdAt = String((x as any).createdAt || "").slice(0, 10) || "-"
      const desc = String((x as any).description || (x as any).desc || "").trim()

      const status = enabled[code] === false ? "inactive" : "active"
      const supportedChannels = ws.map((w) => ({
        name: String((w as any).wayName || (w as any).wayCode || "-"),
        code: String((w as any).wayCode || "-"),
        type: payTypeLabel((w as any).payType),
      }))

      return {
        id: code,
        name: String(x.ifName || code),
        code,
        description: desc || "-",
        status,
        type: inferType(x),
        isUsed: activeIfCodes.has(code),
        channelCount: ws.length || splitCsv(x.wayCodeStrs).length || splitCsv(x.wayCodeOutStrs).length,
        currencyCount: currencies.length,
        createdAt,
        supportedCurrencies: currencies,
        supportedChannels,
        raw: x,
      }
    })
  }, [activeIfCodes, allIfs, enabled, waysByIfCode])

  const filteredInterfaces = useMemo(() => {
    const st = searchTerm.trim().toLowerCase()
    return interfaces.filter((iface) => {
      const matchesSearch =
        !st ||
        iface.name.toLowerCase().includes(st) ||
        iface.code.toLowerCase().includes(st) ||
        iface.description.toLowerCase().includes(st)

      const matchesStatus = (() => {
        if (statusFilter === "all") return true
        if (statusFilter === "used") return iface.isUsed
        if (statusFilter === "unused") return !iface.isUsed
        if (statusFilter === "otc") return iface.type === "OTC"
        if (statusFilter === "third-party") return iface.type === "三方支付"
        if (statusFilter === "fourth-party") return iface.type === "四方支付"
        if (statusFilter === "crypto-wallet") return iface.type === "加密货币托管钱包"
        return true
      })()

      const matchesCurrency = currencyFilter === "all" || iface.supportedCurrencies.includes(currencyFilter)

      return matchesSearch && matchesStatus && matchesCurrency
    })
  }, [currencyFilter, interfaces, searchTerm, statusFilter])

  useEffect(() => {
    if (currencyFilter !== "all" && !allCurrencies.includes(currencyFilter)) {
      setCurrencyFilter("all")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCurrencies.join("|")])

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedInterface, setSelectedInterface] = useState<UIInterface | null>(null)

  const handleViewDetails = (iface: UIInterface) => {
    setSelectedInterface(iface)
    setIsDetailDialogOpen(true)
  }

  const handleToggleStatus = (id: string) => {
    setEnabled((prev) => {
      const next = { ...prev }
      const cur = next[id]
      next[id] = cur === false
      return next
    })
  }

  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [configIface, setConfigIface] = useState<UIInterface | null>(null)
  const [configGlobal, setConfigGlobal] = useState("")
  const [configIdr, setConfigIdr] = useState("")
  const [configSaving, setConfigSaving] = useState(false)

  const openConfig = (iface: UIInterface) => {
    setConfigIface(iface)
    setConfigGlobal(iface.raw.globalSetting ? JSON.stringify(iface.raw.globalSetting, null, 2) : "")
    setConfigIdr(iface.raw.idrConfig ? JSON.stringify(iface.raw.idrConfig, null, 2) : "")
    setIsConfigOpen(true)
  }

  const saveConfig = async () => {
    if (!configIface) return
    setConfigSaving(true)
    try {
      const payload = {
        globalSetting: parseJsonOrUndef(configGlobal),
        idrConfig: parseJsonOrUndef(configIdr),
      }
      await payIfDefinesApis.updatePayIfDefine(configIface.code, payload)
      setIsConfigOpen(false)
      await reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败")
    } finally {
      setConfigSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">接口管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">查看和管理所有支付接口</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchControls
          placeholder="搜索接口名称、代码或描述..."
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
          onReset={handleReset}
          loading={loading}
          className="flex-1"
        />
        <Button variant="outline" onClick={reload} disabled={loading}>
          刷新
        </Button>
      </div>

      <div className="space-y-4">
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="used">使用中</TabsTrigger>
            <TabsTrigger value="unused">未使用</TabsTrigger>
            <TabsTrigger value="otc">合规OTC</TabsTrigger>
            <TabsTrigger value="third-party">合规三方支付</TabsTrigger>
            <TabsTrigger value="fourth-party">合规四方支付</TabsTrigger>
            <TabsTrigger value="crypto-wallet">加密货币托管钱包</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs value={currencyFilter} onValueChange={setCurrencyFilter}>
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="all">全部币种</TabsTrigger>
            {allCurrencies.map((currency) => (
              <TabsTrigger key={currency} value={currency}>
                {currency}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {loading && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            加载中...
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredInterfaces.map((iface) => (
          <Card
            key={iface.id}
            className={`p-4 hover:shadow-lg transition-all ${iface.status === "inactive" ? "bg-gray-100 dark:bg-gray-800 opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{iface.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{iface.code}</p>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    iface.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {iface.status === "active" ? "启用" : "停用"}
                </span>
                <Switch checked={iface.status === "active"} onCheckedChange={() => handleToggleStatus(iface.id)} className="scale-75" />
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{iface.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div
                className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                onClick={() => handleViewDetails(iface)}
              >
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{iface.channelCount}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">支付通道</div>
              </div>
              <div
                className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                onClick={() => handleViewDetails(iface)}
              >
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{iface.currencyCount}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">支持币种</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">{iface.createdAt}</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400"
                onClick={(e) => {
                  e.stopPropagation()
                  openConfig(iface)
                }}
                title="供应商配置"
              >
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {!loading && filteredInterfaces.length === 0 && (
        <div className="text-center py-12">
          <Network className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">未找到相关接口</p>
        </div>
      )}

      {filteredInterfaces.length > 0 && <DataTotal total={filteredInterfaces.length} />}

      {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-custom-green" />
              {selectedInterface?.name} - 接口详情
            </DialogTitle>
          </DialogHeader>
          {selectedInterface && (
            <div className="space-y-6 py-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-custom-green" />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">支持的币种</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(selectedInterface.supportedCurrencies.length ? selectedInterface.supportedCurrencies : ["-"]).map((currency) => (
                    <span
                      key={currency}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                    >
                      {currency}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-custom-green" />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">支持的支付通道</h3>
                </div>
                <div className="space-y-2">
                  {(selectedInterface.supportedChannels.length ? selectedInterface.supportedChannels : [{ name: "-", code: "-", type: "-" }]).map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-custom-green"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{channel.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{channel.code}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          channel.type === "代收"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : channel.type === "代付"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {channel.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setIsDetailDialogOpen(false)} variant="outline">
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              {configIface?.name} - 供应商配置
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900 dark:text-white">globalSetting (JSON)</div>
              <Textarea value={configGlobal} onChange={(e) => setConfigGlobal(e.target.value)} rows={10} className="font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900 dark:text-white">idrConfig (JSON)</div>
              <Textarea value={configIdr} onChange={(e) => setConfigIdr(e.target.value)} rows={10} className="font-mono text-xs" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-background">
            <Button onClick={() => setIsConfigOpen(false)} variant="outline" disabled={configSaving}>
              取消
            </Button>
            <Button onClick={saveConfig} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={configSaving}>
              {configSaving ? "保存中" : "保存配置"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

