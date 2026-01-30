"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Eye, Loader2, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  fiatCommissionApis,
  type AgentRankType,
  type AgentSummary,
  type AgentsPageResponse,
  type AgentCommissionRate,
  type AgentCommissionRecord,
} from "@/router/fiat-commission-api"

const money = (v: any) => {
  const n = typeof v === "number" ? v : Number(v)
  if (!Number.isFinite(n)) return "-"
  return n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const num = (v: any) => {
  const n = typeof v === "number" ? v : Number(v)
  if (!Number.isFinite(n)) return 0
  return n
}

const getCurrent = (d: AgentsPageResponse<any> | null, fallback: number) =>
  (typeof d?.pageNumber === "number" ? d.pageNumber : typeof d?.current === "number" ? d.current : fallback)

const getPageSize = (d: AgentsPageResponse<any> | null, fallback: number) =>
  (typeof d?.pageSize === "number" ? d.pageSize : typeof d?.size === "number" ? d.size : fallback)

export default function CommissionPage() {
  const [rankType, setRankType] = useState<AgentRankType>("today")
  const [keyword, setKeyword] = useState("")
  const [appliedKeyword, setAppliedKeyword] = useState("")

  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 10

  const [data, setData] = useState<AgentsPageResponse<AgentSummary> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchList = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setLoading(true)
    setError(null)
    try {
      const res = await fiatCommissionApis.getAgents({
        rankType,
        keyword: appliedKeyword || undefined,
        pageNumber,
        pageSize,
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
  }, [rankType, appliedKeyword, pageNumber])

  useEffect(() => {
    fetchList()
    return () => abortRef.current?.abort()
  }, [fetchList])

  const records = data?.records ?? []
  const total = data?.total ?? 0
  const current = getCurrent(data, pageNumber)
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize])

  const onSearch = () => {
    setPageNumber(1)
    setAppliedKeyword(keyword.trim())
  }

  const onReset = () => {
    setKeyword("")
    setAppliedKeyword("")
    setPageNumber(1)
  }

  const [ratesOpen, setRatesOpen] = useState(false)
  const [recordsOpen, setRecordsOpen] = useState(false)
  const [selected, setSelected] = useState<AgentSummary | null>(null)

  const [rates, setRates] = useState<AgentCommissionRate[]>([])
  const [ratesLoading, setRatesLoading] = useState(false)
  const [ratesError, setRatesError] = useState<string | null>(null)
  const ratesAbortRef = useRef<AbortController | null>(null)

  const openRates = async (a: AgentSummary) => {
    setSelected(a)
    setRates([])
    setRatesError(null)
    setRatesOpen(true)
    ratesAbortRef.current?.abort()
    ratesAbortRef.current = new AbortController()
    setRatesLoading(true)
    try {
      const res = await fiatCommissionApis.getAgentCommissionRates(a.mchNo, { signal: ratesAbortRef.current.signal })
      if (ratesAbortRef.current.signal.aborted) return
      setRates(Array.isArray(res) ? res : [])
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return
      setRatesError(e instanceof Error ? e.message : "加载失败")
      setRates([])
    } finally {
      setRatesLoading(false)
    }
  }

  const [recStartDate, setRecStartDate] = useState("")
  const [recEndDate, setRecEndDate] = useState("")
  const [subMchNo, setSubMchNo] = useState("")
  const [recCurrent, setRecCurrent] = useState(1)
  const recSize = 20

  const [recData, setRecData] = useState<AgentsPageResponse<AgentCommissionRecord> | null>(null)
  const [recLoading, setRecLoading] = useState(false)
  const [recError, setRecError] = useState<string | null>(null)
  const recAbortRef = useRef<AbortController | null>(null)

  const fetchRecords = useCallback(async (mchNo: string) => {
    recAbortRef.current?.abort()
    recAbortRef.current = new AbortController()
    setRecLoading(true)
    setRecError(null)
    try {
      const res = await fiatCommissionApis.getAgentRecords({
        mchNo,
        startDate: recStartDate || undefined,
        endDate: recEndDate || undefined,
        subMchNo: subMchNo || undefined,
        pageNumber: recCurrent,
        pageSize: recSize,
        signal: recAbortRef.current.signal,
      })
      if (recAbortRef.current.signal.aborted) return
      setRecData(res)
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return
      setRecError(e instanceof Error ? e.message : "加载失败")
      setRecData(null)
    } finally {
      setRecLoading(false)
    }
  }, [recStartDate, recEndDate, subMchNo, recCurrent])

  const openDetail = (a: AgentSummary) => {
    setSelected(a)
    setRecStartDate("")
    setRecEndDate("")
    setSubMchNo("")
    setRecCurrent(1)
    setRecData(null)
    setRecError(null)
    setRecordsOpen(true)
  }

  useEffect(() => {
    if (!recordsOpen || !selected?.mchNo) return
    fetchRecords(selected.mchNo)
    return () => recAbortRef.current?.abort()
  }, [recordsOpen, selected?.mchNo, fetchRecords])

  const recRecords = recData?.records ?? []
  const recTotal = recData?.total ?? 0
  const recPages = useMemo(() => Math.max(1, Math.ceil(recTotal / recSize)), [recTotal, recSize])

  const toggleState = async (a: AgentSummary, checked: boolean) => {
    await fiatCommissionApis.updateAgentState(a.mchNo, checked ? 1 : 0)
    await fetchList()
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">代理商管理</h1>
      </div>

      <Card className="p-4 space-y-3">
        <Tabs
          value={rankType}
          onValueChange={(v) => {
            setRankType(v as AgentRankType)
            setPageNumber(1)
          }}
        >
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="today">今日</TabsTrigger>
            <TabsTrigger value="yesterday">昨日</TabsTrigger>
            <TabsTrigger value="month">本月</TabsTrigger>
            <TabsTrigger value="total">累计</TabsTrigger>
            <TabsTrigger value="merchantCount">商户数</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Input
            placeholder="名称/邮箱/电话/商户号/UserID"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch()
            }}
          />
          <div className="flex items-center gap-2 md:justify-end">
            <Button onClick={onSearch} className="bg-custom-green hover:bg-custom-green/90 text-white" disabled={loading}>
              搜索
            </Button>
            <Button onClick={onReset} variant="outline" disabled={loading}>
              重置
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
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead>代理商</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>数据</TableHead>
                <TableHead className="w-32">启用</TableHead>
                <TableHead className="text-right w-40">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((a, idx) => (
                <TableRow key={a.mchNo} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <TableCell className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {(current - 1) * pageSize + idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900 dark:text-white">{a.mchName || a.mchNo}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {a.mchNo}{a.userId ? ` / ${a.userId}` : ""}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900 dark:text-gray-300">{a.email || "-"}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{a.phone || "-"}</div>
                  </TableCell>
                  <TableCell>
                    {rankType === "merchantCount" ? (
                      <div className="text-sm text-gray-900 dark:text-gray-300">{num(a.merchantCount)} 个</div>
                    ) : (
                      <div className="text-sm text-gray-900 dark:text-gray-300">
                        {money(
                          rankType === "today"
                            ? a.todayCommission
                            : rankType === "yesterday"
                              ? a.yesterdayCommission
                              : rankType === "month"
                                ? a.monthCommission
                                : a.totalCommission
                        )}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400">累计 {money(a.totalCommission)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={(a.state ?? 1) === 1} onCheckedChange={(v) => toggleState(a, v)} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{(a.state ?? 1) === 1 ? "启用" : "停用"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openRates(a)} title="佣金比例">
                        <Percent className="w-4 h-4 mr-1" />
                        比例
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDetail(a)} title="明细">
                        <Eye className="w-4 h-4 mr-1" />
                        明细
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
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
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={loading || pageNumber <= 1}
            >
              上一页
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              第 {pageNumber} / {totalPages} 页
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
              disabled={loading || pageNumber >= totalPages}
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

      <Dialog open={ratesOpen} onOpenChange={setRatesOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>佣金比例</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{selected?.mchNo || "-"}</div>
          {ratesLoading ? (
            <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                加载中...
              </span>
            </div>
          ) : rates.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">{ratesError || "暂无数据"}</div>
          ) : (
            <pre className="text-xs bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-auto">
              {JSON.stringify(rates, null, 2)}
            </pre>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={recordsOpen} onOpenChange={setRecordsOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>佣金明细</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{selected?.mchNo || "-"}</div>

          <Card className="p-4 space-y-3 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input type="date" value={recStartDate} onChange={(e) => { setRecStartDate(e.target.value); setRecCurrent(1) }} />
              <Input type="date" value={recEndDate} onChange={(e) => { setRecEndDate(e.target.value); setRecCurrent(1) }} />
              <Input placeholder="下级商户号" value={subMchNo} onChange={(e) => { setSubMchNo(e.target.value); setRecCurrent(1) }} />
              <Button onClick={() => selected?.mchNo && fetchRecords(selected.mchNo)} disabled={recLoading || !selected?.mchNo}>
                查询
              </Button>
            </div>
            {recLoading && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  加载中...
                </span>
              </div>
            )}
            {recError && <div className="text-sm text-red-600">{recError}</div>}
          </Card>

          {recRecords.length === 0 && !recLoading ? (
            <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">暂无数据</div>
          ) : (
            <pre className="text-xs bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-auto">
              {JSON.stringify(recRecords, null, 2)}
            </pre>
          )}

          <div className="flex items-center justify-between mt-4">
            <DataTotal total={recTotal} />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRecCurrent((p) => Math.max(1, p - 1))}
                disabled={recLoading || recCurrent <= 1}
              >
                上一页
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                第 {recCurrent} / {recPages} 页
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRecCurrent((p) => Math.min(recPages, p + 1))}
                disabled={recLoading || recCurrent >= recPages}
              >
                下一页
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

