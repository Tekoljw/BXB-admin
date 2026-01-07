"use client"

import React, { useState, useMemo, useEffect, useRef } from "react"
import { Plus, RotateCcw, Download, TrendingUp, Info, Clock, History, Calendar as CalendarIcon, X, CalendarDays, Search, Edit2, Globe, Check, Trash2, Users, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTotal } from "@/components/data-total"
import { Switch } from "@/components/ui/switch"
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"

interface SpotMarket {
  id: string
  name: string
  baseCurrency: string
  quoteCurrency: string
  marketType: "spot" | "leverage"
  pricePrecision: number
  quantityPrecision: number
  displayWeight: number
  tradingStatus: "open" | "closed"
  shardGroup: number
  displayLevel: string
  enableOpenAPI: boolean
  allowCancel: boolean
  enableTrading: boolean
  enableRebate: boolean
  takerFeeRate: string
  makerFeeRate: string
  orderBookDepth: number
  priceEnabled: boolean
  priceMax: string
  priceMin: string
  priceStep: string
  quantityEnabled: boolean
  quantityMax: string
  quantityMin: string
  quantityStep: string
  amountEnabled: boolean
  amountMin: string
  openProtection: boolean
  openProtectionSeconds: number
  openProtectionMultiplier: number
  limitProtection: boolean
  limitBuyDeviation: string
  limitSellDeviation: string
  marketProtection: boolean
  marketDeviation: string
}

const marketTypes = [
  { value: "spot", label: "现货" },
  { value: "leverage", label: "杠杆" },
]

interface MarketSchedule {
  id: string
  marketId: string
  action: "open" | "close"
  scheduledAt: Date
  createdAt: Date
  status: "pending" | "executed" | "cancelled"
  executedAt?: Date
}

const mockMarkets: SpotMarket[] = [
  { id: "9432", name: "ubn_usdt", baseCurrency: "UBN", quoteCurrency: "USDT", marketType: "spot", pricePrecision: 4, quantityPrecision: 4, displayWeight: 100, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9431", name: "ubc_usdt", baseCurrency: "UBC", quoteCurrency: "USDT", marketType: "leverage", pricePrecision: 4, quantityPrecision: 4, displayWeight: 1, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9430", name: "ubx_usdt", baseCurrency: "UBX", quoteCurrency: "USDT", marketType: "spot", pricePrecision: 4, quantityPrecision: 4, displayWeight: 1, tradingStatus: "closed", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: false, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9429", name: "ab_usdt", baseCurrency: "AB", quoteCurrency: "USDT", marketType: "leverage", pricePrecision: 4, quantityPrecision: 2, displayWeight: 3, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9428", name: "gcgl_usdt", baseCurrency: "GCGL", quoteCurrency: "USDT", marketType: "spot", pricePrecision: 3, quantityPrecision: 3, displayWeight: 0, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9427", name: "busd_btc", baseCurrency: "BUSD", quoteCurrency: "BTC", marketType: "spot", pricePrecision: 2, quantityPrecision: 2, displayWeight: 1, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9426", name: "sand_eth", baseCurrency: "SAND", quoteCurrency: "ETH", marketType: "leverage", pricePrecision: 2, quantityPrecision: 2, displayWeight: 1, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9425", name: "btc_usdt", baseCurrency: "BTC", quoteCurrency: "USDT", marketType: "spot", pricePrecision: 2, quantityPrecision: 6, displayWeight: 99, tradingStatus: "open", shardGroup: 1, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 10, priceEnabled: true, priceMax: "100000", priceMin: "10000", priceStep: "0.01", quantityEnabled: true, quantityMax: "100", quantityMin: "0.0001", quantityStep: "0.0001", amountEnabled: true, amountMin: "10", openProtection: true, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: true, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: true, marketDeviation: "0.1" },
  { id: "9424", name: "eth_usdt", baseCurrency: "ETH", quoteCurrency: "USDT", marketType: "spot", pricePrecision: 2, quantityPrecision: 5, displayWeight: 98, tradingStatus: "open", shardGroup: 1, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 10, priceEnabled: true, priceMax: "10000", priceMin: "1000", priceStep: "0.01", quantityEnabled: true, quantityMax: "1000", quantityMin: "0.001", quantityStep: "0.001", amountEnabled: true, amountMin: "10", openProtection: true, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: true, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: true, marketDeviation: "0.1" },
  { id: "9423", name: "bnb_usdt", baseCurrency: "BNB", quoteCurrency: "USDT", marketType: "leverage", pricePrecision: 2, quantityPrecision: 4, displayWeight: 95, tradingStatus: "open", shardGroup: 2, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 8, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9422", name: "sol_usdt", baseCurrency: "SOL", quoteCurrency: "USDT", marketType: "spot", pricePrecision: 2, quantityPrecision: 3, displayWeight: 90, tradingStatus: "open", shardGroup: 2, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 8, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9421", name: "doge_usdt", baseCurrency: "DOGE", quoteCurrency: "USDT", marketType: "spot", pricePrecision: 6, quantityPrecision: 0, displayWeight: 80, tradingStatus: "open", shardGroup: 3, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
]

export default function SpotMarketManagementPage() {
  const [markets, setMarkets] = useState<SpotMarket[]>(mockMarkets)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditSheet, setShowEditSheet] = useState(false)
  const [showPlanDialog, setShowPlanDialog] = useState(false)
  const [planTab, setPlanTab] = useState("create")
  const [schedules, setSchedules] = useState<MarketSchedule[]>([])
  const [newScheduleDateTime, setNewScheduleDateTime] = useState("")
  const [countdown, setCountdown] = useState("")
  const [selectedMarket, setSelectedMarket] = useState<SpotMarket | null>(null)
  const [editingMarket, setEditingMarket] = useState<Partial<SpotMarket>>({})
  const [editTab, setEditTab] = useState("basic")
  const [googleCode, setGoogleCode] = useState("")
  const scheduleSheetRef = useRef<HTMLDivElement>(null)
  const [newMarket, setNewMarket] = useState<Partial<SpotMarket>>({
    name: "",
    baseCurrency: "",
    quoteCurrency: "USDT",
    marketType: "spot",
    pricePrecision: 4,
    quantityPrecision: 4,
    displayWeight: 0,
    tradingStatus: "open",
    shardGroup: 1,
    displayLevel: "full",
  })
  const [showCountryRestrictionSheet, setShowCountryRestrictionSheet] = useState(false)
  const [showMarketSelectSheet, setShowMarketSelectSheet] = useState(false)
  const [showCountrySelectSheet, setShowCountrySelectSheet] = useState(false)
  const [showWhitelistUserSheet, setShowWhitelistUserSheet] = useState(false)
  const [restrictionMarketType, setRestrictionMarketType] = useState<"spot" | "leverage">("spot")
  const [restrictionMode, setRestrictionMode] = useState<"blacklist" | "whitelist">("blacklist")
  const [countryRestrictions, setCountryRestrictions] = useState<{ marketId: string; marketName: string; restrictedCountries: string[]; mode: "blacklist" | "whitelist" }[]>([
    { marketId: "9425", marketName: "btc_usdt", restrictedCountries: ["+86", "+1"], mode: "blacklist" },
    { marketId: "9424", marketName: "eth_usdt", restrictedCountries: ["+86"], mode: "blacklist" },
    { marketId: "9423", marketName: "bnb_usdt", restrictedCountries: [], mode: "blacklist" },
  ])
  const [whitelistUsers, setWhitelistUsers] = useState<{ marketId: string; users: { uid: string; email: string; name: string }[] }[]>([
    { marketId: "9425", users: [
      { uid: "100001", email: "vip1@example.com", name: "VIP用户1" },
      { uid: "100002", email: "vip2@example.com", name: "VIP用户2" },
    ]},
  ])
  const [newWhitelistUser, setNewWhitelistUser] = useState({ uid: "", email: "", name: "" })
  const [whitelistUserSearch, setWhitelistUserSearch] = useState("")
  const [selectedRestrictionMarket, setSelectedRestrictionMarket] = useState<string>("")
  const [marketSearchQuery, setMarketSearchQuery] = useState("")
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 10)
      setIsLoadingMore(false)
    }, 800)
  }
  const allCountries = [
    { code: "+86", name: "中国", flag: "🇨🇳" },
    { code: "+1", name: "美国", flag: "🇺🇸" },
    { code: "+1", name: "加拿大", flag: "🇨🇦" },
    { code: "+81", name: "日本", flag: "🇯🇵" },
    { code: "+82", name: "韩国", flag: "🇰🇷" },
    { code: "+44", name: "英国", flag: "🇬🇧" },
    { code: "+49", name: "德国", flag: "🇩🇪" },
    { code: "+33", name: "法国", flag: "🇫🇷" },
    { code: "+39", name: "意大利", flag: "🇮🇹" },
    { code: "+34", name: "西班牙", flag: "🇪🇸" },
    { code: "+65", name: "新加坡", flag: "🇸🇬" },
    { code: "+852", name: "香港", flag: "🇭🇰" },
    { code: "+853", name: "澳门", flag: "🇲🇴" },
    { code: "+886", name: "台湾", flag: "🇹🇼" },
    { code: "+7", name: "俄罗斯", flag: "🇷🇺" },
    { code: "+91", name: "印度", flag: "🇮🇳" },
    { code: "+61", name: "澳大利亚", flag: "🇦🇺" },
    { code: "+55", name: "巴西", flag: "🇧🇷" },
    { code: "+971", name: "阿联酋", flag: "🇦🇪" },
    { code: "+966", name: "沙特阿拉伯", flag: "🇸🇦" },
    { code: "+66", name: "泰国", flag: "🇹🇭" },
    { code: "+84", name: "越南", flag: "🇻🇳" },
    { code: "+62", name: "印度尼西亚", flag: "🇮🇩" },
    { code: "+60", name: "马来西亚", flag: "🇲🇾" },
    { code: "+63", name: "菲律宾", flag: "🇵🇭" },
    { code: "+27", name: "南非", flag: "🇿🇦" },
    { code: "+234", name: "尼日利亚", flag: "🇳🇬" },
    { code: "+20", name: "埃及", flag: "🇪🇬" },
    { code: "+90", name: "土耳其", flag: "🇹🇷" },
    { code: "+48", name: "波兰", flag: "🇵🇱" },
    { code: "+31", name: "荷兰", flag: "🇳🇱" },
    { code: "+46", name: "瑞典", flag: "🇸🇪" },
    { code: "+41", name: "瑞士", flag: "🇨🇭" },
    { code: "+43", name: "奥地利", flag: "🇦🇹" },
    { code: "+32", name: "比利时", flag: "🇧🇪" },
    { code: "+351", name: "葡萄牙", flag: "🇵🇹" },
    { code: "+30", name: "希腊", flag: "🇬🇷" },
    { code: "+47", name: "挪威", flag: "🇳🇴" },
    { code: "+45", name: "丹麦", flag: "🇩🇰" },
    { code: "+358", name: "芬兰", flag: "🇫🇮" },
    { code: "+353", name: "爱尔兰", flag: "🇮🇪" },
    { code: "+64", name: "新西兰", flag: "🇳🇿" },
    { code: "+52", name: "墨西哥", flag: "🇲🇽" },
    { code: "+54", name: "阿根廷", flag: "🇦🇷" },
    { code: "+56", name: "智利", flag: "🇨🇱" },
    { code: "+57", name: "哥伦比亚", flag: "🇨🇴" },
    { code: "+51", name: "秘鲁", flag: "🇵🇪" },
    { code: "+92", name: "巴基斯坦", flag: "🇵🇰" },
    { code: "+880", name: "孟加拉国", flag: "🇧🇩" },
    { code: "+94", name: "斯里兰卡", flag: "🇱🇰" },
    { code: "+95", name: "缅甸", flag: "🇲🇲" },
    { code: "+855", name: "柬埔寨", flag: "🇰🇭" },
    { code: "+856", name: "老挝", flag: "🇱🇦" },
    { code: "+977", name: "尼泊尔", flag: "🇳🇵" },
    { code: "+372", name: "爱沙尼亚", flag: "🇪🇪" },
    { code: "+370", name: "立陶宛", flag: "🇱🇹" },
    { code: "+371", name: "拉脱维亚", flag: "🇱🇻" },
    { code: "+380", name: "乌克兰", flag: "🇺🇦" },
    { code: "+972", name: "以色列", flag: "🇮🇱" },
  ]

  const quoteCurrencies = useMemo(() => {
    const currencies = new Set(markets.map(m => m.quoteCurrency))
    return Array.from(currencies).sort()
  }, [markets])

  const filteredMarkets = useMemo(() => {
    return markets.filter(market => {
      const matchesSearch = !searchQuery || 
        market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.baseCurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.quoteCurrency.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || market.tradingStatus === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [markets, searchQuery, statusFilter])

  const handleReset = () => {
    setSearchQuery("")
    setStatusFilter("all")
  }

  const handleAddMarket = () => {
    if (!newMarket.baseCurrency || !newMarket.quoteCurrency) {
      toast.error("请填写完整信息", { description: "标的币种和报价币种为必填项" })
      return
    }

    const market: SpotMarket = {
      id: String(Date.now()),
      name: `${newMarket.baseCurrency?.toLowerCase()}_${newMarket.quoteCurrency?.toLowerCase()}`,
      baseCurrency: newMarket.baseCurrency!.toUpperCase(),
      quoteCurrency: newMarket.quoteCurrency!.toUpperCase(),
      marketType: newMarket.marketType || "spot",
      pricePrecision: newMarket.pricePrecision || 4,
      quantityPrecision: newMarket.quantityPrecision || 4,
      displayWeight: newMarket.displayWeight || 0,
      tradingStatus: newMarket.tradingStatus || "open",
      shardGroup: newMarket.shardGroup || 1,
      displayLevel: newMarket.displayLevel || "full",
      enableOpenAPI: true,
      allowCancel: true,
      enableTrading: true,
      enableRebate: true,
      takerFeeRate: "0.002",
      makerFeeRate: "0.002",
      orderBookDepth: 5,
      priceEnabled: false,
      priceMax: "",
      priceMin: "",
      priceStep: "",
      quantityEnabled: false,
      quantityMax: "",
      quantityMin: "",
      quantityStep: "",
      amountEnabled: false,
      amountMin: "",
      openProtection: false,
      openProtectionSeconds: 300,
      openProtectionMultiplier: 5,
      limitProtection: false,
      limitBuyDeviation: "0.8",
      limitSellDeviation: "0.8",
      marketProtection: false,
      marketDeviation: "0.1",
    }

    setMarkets(prev => [market, ...prev])
    setNewMarket({
      name: "",
      baseCurrency: "",
      quoteCurrency: "USDT",
      marketType: "spot",
      pricePrecision: 4,
      quantityPrecision: 4,
      displayWeight: 0,
      tradingStatus: "open",
      shardGroup: 1,
      displayLevel: "full",
    })
    setShowAddDialog(false)
    toast.success("市场已添加", { description: `${market.name} 已成功创建` })
  }

  const handleEdit = (market: SpotMarket) => {
    setSelectedMarket(market)
    setEditingMarket({ ...market })
    setEditTab("basic")
    setGoogleCode("")
    setShowEditSheet(true)
  }

  const handleSaveEdit = () => {
    if (!selectedMarket) return
    if (!googleCode) {
      toast.error("请输入谷歌验证码")
      return
    }
    setMarkets(prev => prev.map(m => 
      m.id === selectedMarket.id ? { ...m, ...editingMarket } as SpotMarket : m
    ))
    setShowEditSheet(false)
    setGoogleCode("")
    toast.success("市场已更新", { description: `${selectedMarket.name} 配置已保存` })
  }

  const handleOpenPlan = (market: SpotMarket) => {
    setSelectedMarket(market)
    setEditingMarket({ ...market })
    setNewScheduleDateTime("")
    setPlanTab("create")
    setShowPlanDialog(true)
  }

  const pendingSchedule = useMemo(() => {
    if (!selectedMarket) return null
    return schedules.find(s => s.marketId === selectedMarket.id && s.status === "pending")
  }, [selectedMarket, schedules])

  const marketHistory = useMemo(() => {
    if (!selectedMarket) return []
    return schedules.filter(s => s.marketId === selectedMarket.id && s.status !== "pending").sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }, [selectedMarket, schedules])

  useEffect(() => {
    if (!pendingSchedule) {
      setCountdown("")
      return
    }
    const timer = setInterval(() => {
      const now = new Date()
      const diff = pendingSchedule.scheduledAt.getTime() - now.getTime()
      if (diff <= 0) {
        setSchedules(prev => prev.map(s => 
          s.id === pendingSchedule.id ? { ...s, status: "executed" as const, executedAt: new Date() } : s
        ))
        setMarkets(prev => prev.map(m => 
          m.id === pendingSchedule.marketId ? { ...m, tradingStatus: pendingSchedule.action === "open" ? "open" : "closed" } : m
        ))
        toast.success("计划已执行", { description: `${pendingSchedule.action === "open" ? "开盘" : "停盘"}计划已自动执行` })
        setCountdown("")
        return
      }
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
    }, 1000)
    return () => clearInterval(timer)
  }, [pendingSchedule])

  const handleCreateSchedule = () => {
    if (!selectedMarket || !newScheduleDateTime) {
      toast.error("请选择计划执行时间")
      return
    }
    const scheduledAt = new Date(newScheduleDateTime)
    if (scheduledAt <= new Date()) {
      toast.error("计划时间必须晚于当前时间")
      return
    }
    const action = selectedMarket.tradingStatus === "open" ? "close" : "open"
    const newSchedule: MarketSchedule = {
      id: `SCH${Date.now()}`,
      marketId: selectedMarket.id,
      action,
      scheduledAt,
      createdAt: new Date(),
      status: "pending"
    }
    setSchedules(prev => [...prev, newSchedule])
    setNewScheduleDateTime("")
    toast.success("计划已创建", { description: `${action === "open" ? "开盘" : "停盘"}计划将于 ${scheduledAt.toLocaleString()} 执行` })
  }

  const handleCancelSchedule = () => {
    if (!pendingSchedule) return
    setSchedules(prev => prev.map(s => 
      s.id === pendingSchedule.id ? { ...s, status: "cancelled" as const } : s
    ))
    toast.success("计划已取消")
  }

  const handleInlineEdit = (id: string, field: keyof SpotMarket, value: number | string) => {
    setMarkets(prev => prev.map(m => 
      m.id === id ? { ...m, [field]: value } as SpotMarket : m
    ))
  }

  const handleExport = () => {
    toast.success("导出成功", { description: "市场数据已导出为CSV文件" })
  }

  const LabelWithInfo = ({ label, hasInfo = false }: { label: string; hasInfo?: boolean }) => (
    <div className="flex items-center gap-1 mb-2">
      <span className="text-red-500">*</span>
      <Label>{label}</Label>
      {hasInfo && <Info className="h-3 w-3 text-gray-400" />}
    </div>
  )

  const SectionHeader = ({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: (v: boolean) => void }) => (
    <div className="flex items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="w-1 h-4 bg-amber-500 rounded"></div>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
      <Switch checked={enabled} onCheckedChange={onToggle} className="ml-2" />
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">现货市场管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理现货交易市场、交易对和开盘配置
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="bg-custom-green hover:bg-custom-green-dark text-white"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            添加
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
          <Button variant="outline" onClick={() => setShowCountryRestrictionSheet(true)}>
            <Globe className="w-4 h-4 mr-2" />
            限制交易国家
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-auto flex-shrink-0">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-sm px-4">全部</TabsTrigger>
              <TabsTrigger value="open" className="text-sm px-4">开盘</TabsTrigger>
              <TabsTrigger value="closed" className="text-sm px-4">停盘</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="搜索市场名称、币种..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <Button variant="outline" className="h-9 flex-shrink-0">
              <Search className="w-4 h-4 mr-2" />
              搜索
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">市场ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">市场名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">市场类型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">标的币种</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">报价币种</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">交易价格精度</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">交易数量精度</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">展示权重</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">开盘状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMarkets.slice(0, displayCount).map((market) => (
                <tr key={market.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{market.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{market.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      market.marketType === "spot" 
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                        : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                    }`}>
                      {market.marketType === "spot" ? "现货" : "杠杆"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{market.baseCurrency.toLowerCase()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{market.quoteCurrency.toLowerCase()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Input type="number" className="w-16 h-7 text-sm text-center" value={market.pricePrecision} onChange={(e) => handleInlineEdit(market.id, 'pricePrecision', parseInt(e.target.value))} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Input type="number" className="w-16 h-7 text-sm text-center" value={market.quantityPrecision} onChange={(e) => handleInlineEdit(market.id, 'quantityPrecision', parseInt(e.target.value))} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Input type="number" className="w-16 h-7 text-sm text-center" value={market.displayWeight} onChange={(e) => handleInlineEdit(market.id, 'displayWeight', parseInt(e.target.value))} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Switch checked={market.tradingStatus === "open"} onCheckedChange={(checked) => handleInlineEdit(market.id, 'tradingStatus', checked ? "open" : "closed")} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(market)} className="h-7 w-7 p-0">
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenPlan(market)} className="h-7 text-xs text-custom-green hover:text-custom-green-dark border-custom-green/30 hover:border-custom-green/50">
                        开盘计划
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">未找到市场</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">尝试调整筛选条件</p>
          </div>
        )}

        {filteredMarkets.length > 0 && <DataTotal total={filteredMarkets.length} />}
      </div>

      {filteredMarkets.length > displayCount && (
        <div className="flex justify-center py-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="min-w-[140px]"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                加载中...
              </>
            ) : (
              `加载更多 (${filteredMarkets.length - displayCount})`
            )}
          </Button>
        </div>
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>添加市场</DialogTitle>
            <DialogDescription>创建新的现货交易市场</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>市场类型</Label>
              <Tabs value={newMarket.marketType || "spot"} onValueChange={(v) => setNewMarket({ ...newMarket, marketType: v as "spot" | "leverage" })} className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="spot">现货</TabsTrigger>
                  <TabsTrigger value="leverage">杠杆</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>标的币种</Label>
                <Input placeholder="如：BTC" value={newMarket.baseCurrency || ""} onChange={(e) => setNewMarket({ ...newMarket, baseCurrency: e.target.value.toUpperCase() })} className="mt-2" />
              </div>
              <div>
                <Label>报价币种</Label>
                <Select value={newMarket.quoteCurrency || "USDT"} onValueChange={(value) => setNewMarket({ ...newMarket, quoteCurrency: value })}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>交易价格精度</Label>
                <Input type="number" value={newMarket.pricePrecision || 4} onChange={(e) => setNewMarket({ ...newMarket, pricePrecision: parseInt(e.target.value) })} className="mt-2" />
              </div>
              <div>
                <Label>交易数量精度</Label>
                <Input type="number" value={newMarket.quantityPrecision || 4} onChange={(e) => setNewMarket({ ...newMarket, quantityPrecision: parseInt(e.target.value) })} className="mt-2" />
              </div>
            </div>
            <div>
              <Label>展示权重</Label>
              <Input type="number" value={newMarket.displayWeight || 0} onChange={(e) => setNewMarket({ ...newMarket, displayWeight: parseInt(e.target.value) })} className="mt-2" />
            </div>
            <div className="pt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddDialog(false)}>取消</Button>
              <Button className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white" onClick={handleAddMarket}>确认添加</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>修改市场</SheetTitle>
          </SheetHeader>
          {selectedMarket && (
            <div className="mt-4">
              <Tabs value={editTab} onValueChange={setEditTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">基本配置</TabsTrigger>
                  <TabsTrigger value="trading">交易配置</TabsTrigger>
                  <TabsTrigger value="limits">交易限制</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>市场类型</Label></div>
                    <Tabs value={editingMarket.marketType || "spot"} onValueChange={(v) => setEditingMarket({ ...editingMarket, marketType: v as "spot" | "leverage" })}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="spot">现货</TabsTrigger>
                        <TabsTrigger value="leverage">杠杆</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>标的币种</Label></div>
                      <Select value={editingMarket.baseCurrency?.toLowerCase() || ""} disabled>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value={editingMarket.baseCurrency?.toLowerCase() || ""}>{editingMarket.baseCurrency?.toLowerCase()}</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>报价币种</Label></div>
                      <Select value={editingMarket.quoteCurrency?.toLowerCase() || ""} disabled>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value={editingMarket.quoteCurrency?.toLowerCase() || ""}>{editingMarket.quoteCurrency?.toLowerCase()}</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>分片组</Label></div>
                      <Input type="number" value={editingMarket.shardGroup || 0} onChange={(e) => setEditingMarket({ ...editingMarket, shardGroup: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>交易数量精度</Label></div>
                      <Input type="number" value={editingMarket.quantityPrecision || 0} onChange={(e) => setEditingMarket({ ...editingMarket, quantityPrecision: parseInt(e.target.value) })} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>交易价格精度</Label></div>
                      <Input type="number" value={editingMarket.pricePrecision || 0} onChange={(e) => setEditingMarket({ ...editingMarket, pricePrecision: parseInt(e.target.value) })} />
                    </div>
                    <div>
                      <LabelWithInfo label="展示权重" hasInfo />
                      <Input type="number" value={editingMarket.displayWeight || 0} onChange={(e) => setEditingMarket({ ...editingMarket, displayWeight: parseInt(e.target.value) })} className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <LabelWithInfo label="显示级别" hasInfo />
                    <Select value={editingMarket.displayLevel || "full"} onValueChange={(value) => setEditingMarket({ ...editingMarket, displayLevel: value })}>
                      <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">完全展示</SelectItem>
                        <SelectItem value="partial">部分展示</SelectItem>
                        <SelectItem value="hidden">隐藏</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>谷歌验证码</Label></div>
                    <Input placeholder="谷歌验证码" value={googleCode} onChange={(e) => setGoogleCode(e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="trading" className="mt-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <LabelWithInfo label="启用OPENAPI" hasInfo />
                      <Select value={editingMarket.enableOpenAPI ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, enableOpenAPI: v === "是" })}>
                        <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>允许撤单</Label></div>
                      <Select value={editingMarket.allowCancel ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, allowCancel: v === "是" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>启用交易</Label></div>
                      <Select value={editingMarket.enableTrading ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, enableTrading: v === "是" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>启用返佣</Label></div>
                      <Select value={editingMarket.enableRebate ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, enableRebate: v === "是" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <LabelWithInfo label="taker手续费率" hasInfo />
                      <Input value={editingMarket.takerFeeRate || ""} onChange={(e) => setEditingMarket({ ...editingMarket, takerFeeRate: e.target.value })} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>maker手续费率</Label></div>
                      <Input value={editingMarket.makerFeeRate || ""} onChange={(e) => setEditingMarket({ ...editingMarket, makerFeeRate: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>盘口合并深度</Label></div>
                    <Input type="number" value={editingMarket.orderBookDepth || 5} onChange={(e) => setEditingMarket({ ...editingMarket, orderBookDepth: parseInt(e.target.value) })} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>谷歌验证码</Label></div>
                    <Input placeholder="谷歌验证码" value={googleCode} onChange={(e) => setGoogleCode(e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="limits" className="mt-4 space-y-4">
                  <SectionHeader label="价格" enabled={editingMarket.priceEnabled || false} onToggle={(v) => setEditingMarket({ ...editingMarket, priceEnabled: v })} />
                  <div className="grid grid-cols-3 gap-4">
                    <div><Label className="text-sm">最大值</Label><Input placeholder="请输入" value={editingMarket.priceMax || ""} onChange={(e) => setEditingMarket({ ...editingMarket, priceMax: e.target.value })} disabled={!editingMarket.priceEnabled} className="mt-1" /></div>
                    <div><Label className="text-sm">最小值</Label><Input placeholder="请输入" value={editingMarket.priceMin || ""} onChange={(e) => setEditingMarket({ ...editingMarket, priceMin: e.target.value })} disabled={!editingMarket.priceEnabled} className="mt-1" /></div>
                    <div><LabelWithInfo label="步进值" hasInfo /><Input placeholder="请输入" value={editingMarket.priceStep || ""} onChange={(e) => setEditingMarket({ ...editingMarket, priceStep: e.target.value })} disabled={!editingMarket.priceEnabled} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="数量" enabled={editingMarket.quantityEnabled || false} onToggle={(v) => setEditingMarket({ ...editingMarket, quantityEnabled: v })} />
                  <div className="grid grid-cols-3 gap-4">
                    <div><Label className="text-sm">最大值</Label><Input placeholder="请输入" value={editingMarket.quantityMax || ""} onChange={(e) => setEditingMarket({ ...editingMarket, quantityMax: e.target.value })} disabled={!editingMarket.quantityEnabled} className="mt-1" /></div>
                    <div><Label className="text-sm">最小值</Label><Input placeholder="请输入" value={editingMarket.quantityMin || ""} onChange={(e) => setEditingMarket({ ...editingMarket, quantityMin: e.target.value })} disabled={!editingMarket.quantityEnabled} className="mt-1" /></div>
                    <div><LabelWithInfo label="步进值" hasInfo /><Input placeholder="请输入" value={editingMarket.quantityStep || ""} onChange={(e) => setEditingMarket({ ...editingMarket, quantityStep: e.target.value })} disabled={!editingMarket.quantityEnabled} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="金额" enabled={editingMarket.amountEnabled || false} onToggle={(v) => setEditingMarket({ ...editingMarket, amountEnabled: v })} />
                  <div><Label className="text-sm">最小值</Label><Input placeholder="请输入" value={editingMarket.amountMin || ""} onChange={(e) => setEditingMarket({ ...editingMarket, amountMin: e.target.value })} disabled={!editingMarket.amountEnabled} className="mt-1" /></div>

                  <SectionHeader label="开盘保护" enabled={editingMarket.openProtection || false} onToggle={(v) => setEditingMarket({ ...editingMarket, openProtection: v })} />
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label className="text-sm">开盘后持续秒数</Label><Input type="number" value={editingMarket.openProtectionSeconds || 300} onChange={(e) => setEditingMarket({ ...editingMarket, openProtectionSeconds: parseInt(e.target.value) })} disabled={!editingMarket.openProtection} className="mt-1" /></div>
                    <div><Label className="text-sm">最大价格倍数</Label><Input type="number" value={editingMarket.openProtectionMultiplier || 5} onChange={(e) => setEditingMarket({ ...editingMarket, openProtectionMultiplier: parseInt(e.target.value) })} disabled={!editingMarket.openProtection} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="限价保护" enabled={editingMarket.limitProtection || false} onToggle={(v) => setEditingMarket({ ...editingMarket, limitProtection: v })} />
                  <div className="grid grid-cols-2 gap-4">
                    <div><LabelWithInfo label="买单最大偏离度" hasInfo /><Input value={editingMarket.limitBuyDeviation || ""} onChange={(e) => setEditingMarket({ ...editingMarket, limitBuyDeviation: e.target.value })} disabled={!editingMarket.limitProtection} className="mt-1" /></div>
                    <div><LabelWithInfo label="卖单最大偏离度" hasInfo /><Input value={editingMarket.limitSellDeviation || ""} onChange={(e) => setEditingMarket({ ...editingMarket, limitSellDeviation: e.target.value })} disabled={!editingMarket.limitProtection} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="市价保护" enabled={editingMarket.marketProtection || false} onToggle={(v) => setEditingMarket({ ...editingMarket, marketProtection: v })} />
                  <div><Label className="text-sm">最大偏离度</Label><Input value={editingMarket.marketDeviation || ""} onChange={(e) => setEditingMarket({ ...editingMarket, marketDeviation: e.target.value })} disabled={!editingMarket.marketProtection} className="mt-1" /></div>
                </TabsContent>
              </Tabs>

              <div className="pt-6 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowEditSheet(false)}>取消</Button>
                <Button className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white" onClick={handleSaveEdit}>提交</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <SheetContent ref={scheduleSheetRef} className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>开盘计划</SheetTitle>
          </SheetHeader>
          {selectedMarket && (
            <div className="mt-6 space-y-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">市场</span>
                  <span className="font-medium">{selectedMarket.name}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">当前状态</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    selectedMarket.tradingStatus === "open" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}>
                    {selectedMarket.tradingStatus === "open" ? "开盘中" : "已停盘"}
                  </span>
                </div>
              </div>

              <Tabs value={planTab} onValueChange={setPlanTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create">创建计划</TabsTrigger>
                  <TabsTrigger value="history">查看历史</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="mt-4 space-y-4">
                  {pendingSchedule ? (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="font-medium text-amber-800 dark:text-amber-300">等待执行的计划</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">计划类型</span>
                          <span className={pendingSchedule.action === "open" ? "text-green-600" : "text-red-600"}>
                            {pendingSchedule.action === "open" ? "开盘" : "停盘"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">执行时间</span>
                          <span>{pendingSchedule.scheduledAt.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">倒计时</span>
                          <span className="font-mono text-lg font-bold text-amber-600">{countdown}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20" onClick={handleCancelSchedule}>
                        <X className="w-4 h-4 mr-2" />
                        取消计划
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarIcon className="w-4 h-4 text-custom-green" />
                        <span className="font-medium">
                          创建{selectedMarket.tradingStatus === "open" ? "停盘" : "开盘"}计划
                        </span>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">快捷选择</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "30分钟后", minutes: 30 },
                            { label: "1小时后", minutes: 60 },
                            { label: "2小时后", minutes: 120 },
                            { label: "6小时后", minutes: 360 },
                            { label: "12小时后", minutes: 720 },
                            { label: "24小时后", minutes: 1440 },
                          ].map((preset) => {
                            const presetTime = new Date(Date.now() + preset.minutes * 60 * 1000)
                            const presetValue = presetTime.toISOString().slice(0, 16)
                            return (
                              <Button
                                key={preset.label}
                                variant="outline"
                                size="sm"
                                className={`text-xs ${newScheduleDateTime === presetValue ? "border-custom-green bg-custom-green/10 text-custom-green" : ""}`}
                                onClick={() => setNewScheduleDateTime(presetValue)}
                              >
                                {preset.label}
                              </Button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">自定义时间</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">日期</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {newScheduleDateTime 
                                    ? format(new Date(newScheduleDateTime.split("T")[0]), "yyyy年MM月dd日", { locale: zhCN })
                                    : "选择日期"
                                  }
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={newScheduleDateTime ? new Date(newScheduleDateTime.split("T")[0]) : undefined}
                                  onSelect={(date) => {
                                    if (date) {
                                      const dateStr = format(date, "yyyy-MM-dd")
                                      const time = newScheduleDateTime ? newScheduleDateTime.split("T")[1] || "09:00" : "09:00"
                                      setNewScheduleDateTime(`${dateStr}T${time}`)
                                    }
                                  }}
                                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                  locale={zhCN}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">时间</Label>
                            <Select 
                              value={newScheduleDateTime ? newScheduleDateTime.split("T")[1]?.slice(0, 5) || "" : ""}
                              onValueChange={(time) => {
                                const date = newScheduleDateTime ? newScheduleDateTime.split("T")[0] : new Date().toISOString().slice(0, 10)
                                setNewScheduleDateTime(`${date}T${time}`)
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="选择时间" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, h) => 
                                  ["00", "30"].map(m => {
                                    const time = `${h.toString().padStart(2, "0")}:${m}`
                                    return (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    )
                                  })
                                ).flat()}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {newScheduleDateTime && (
                        <div className="p-3 bg-custom-green/10 border border-custom-green/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">计划执行时间</span>
                            <span className="font-medium text-custom-green">
                              {new Date(newScheduleDateTime).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button className="w-full bg-custom-green hover:bg-custom-green-dark text-white" onClick={handleCreateSchedule} disabled={!newScheduleDateTime}>
                        创建计划
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  {marketHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">暂无历史记录</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {marketHistory.map((schedule) => (
                        <div key={schedule.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              schedule.action === "open" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}>
                              {schedule.action === "open" ? "开盘" : "停盘"}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              schedule.status === "executed" 
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                            }`}>
                              {schedule.status === "executed" ? "已执行" : "已取消"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex justify-between">
                              <span>计划时间</span>
                              <span>{schedule.scheduledAt.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>创建时间</span>
                              <span>{schedule.createdAt.toLocaleString()}</span>
                            </div>
                            {schedule.executedAt && (
                              <div className="flex justify-between">
                                <span>执行时间</span>
                                <span>{schedule.executedAt.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* 限制交易国家 Sheet */}
      <Sheet open={showCountryRestrictionSheet} onOpenChange={setShowCountryRestrictionSheet}>
        <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>限制交易国家</SheetTitle>
            <SheetDescription>
              配置每个市场在哪些国家禁止交易
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="mb-2 block">市场类型</Label>
                <Tabs value={restrictionMarketType} onValueChange={(v) => setRestrictionMarketType(v as "spot" | "leverage")} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="spot" className="flex-1">现货</TabsTrigger>
                    <TabsTrigger value="leverage" className="flex-1">杠杆</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex-1">
                <Label className="mb-2 block">限制模式</Label>
                <Tabs value={restrictionMode} onValueChange={(v) => setRestrictionMode(v as "blacklist" | "whitelist")} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="blacklist" className="flex-1">黑名单</TabsTrigger>
                    <TabsTrigger value="whitelist" className="flex-1">白名单</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="mb-2 block">选择市场</Label>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => setShowMarketSelectSheet(true)}
                >
                  {selectedRestrictionMarket 
                    ? markets.find(m => m.id === selectedRestrictionMarket)?.name.toUpperCase() 
                    : "点击选择市场"}
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="flex-1">
                <Label className="mb-2 block">{restrictionMode === "blacklist" ? "添加黑名单国家" : "添加白名单国家"}</Label>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => {
                    if (!selectedRestrictionMarket) {
                      toast.error("请先选择一个市场")
                      return
                    }
                    setShowCountrySelectSheet(true)
                  }}
                  disabled={!selectedRestrictionMarket}
                >
                  点击选择国家
                  <Globe className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {selectedRestrictionMarket && (
              <div>
                <Label className="mb-2 block">白名单用户</Label>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => setShowWhitelistUserSheet(true)}
                >
                  <span className="flex items-center gap-2">
                    配置白名单用户
                    <span className="text-xs px-1.5 py-0.5 bg-custom-green/10 text-custom-green rounded">
                      {whitelistUsers.find(w => w.marketId === selectedRestrictionMarket)?.users.length || 0} 人
                    </span>
                  </span>
                  <Users className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {selectedRestrictionMarket ? (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {markets.find(m => m.id === selectedRestrictionMarket)?.name.toUpperCase()}
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        restrictionMode === "blacklist" 
                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" 
                          : "bg-custom-green/10 text-custom-green"
                      }`}>
                        {restrictionMode === "blacklist" ? "黑名单模式" : "白名单模式"}
                      </span>
                    </h4>
                    <span className="text-sm text-gray-500">
                      共 {countryRestrictions.find(r => r.marketId === selectedRestrictionMarket)?.restrictedCountries.length || 0} 个
                    </span>
                  </div>
                  
                  {(countryRestrictions.find(r => r.marketId === selectedRestrictionMarket)?.restrictedCountries.length || 0) > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {countryRestrictions.find(r => r.marketId === selectedRestrictionMarket)?.restrictedCountries.map(code => {
                        const country = allCountries.find(c => c.code === code)
                        return (
                          <div 
                            key={code}
                            className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                          >
                            <span>{country?.flag}</span>
                            <span className="text-sm font-medium text-red-700 dark:text-red-400">{code}</span>
                            <span className="text-sm text-red-600 dark:text-red-400">{country?.name}</span>
                            <button
                              className="ml-1 text-red-500 hover:text-red-700"
                              onClick={() => {
                                setCountryRestrictions(prev => prev.map(r => {
                                  if (r.marketId === selectedRestrictionMarket) {
                                    return { ...r, restrictedCountries: r.restrictedCountries.filter(c => c !== code) }
                                  }
                                  return r
                                }))
                                toast.success(`已移除 ${country?.name}`)
                              }}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">暂无限制国家，点击上方按钮添加</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setCountryRestrictions(prev => prev.map(r => {
                        if (r.marketId === selectedRestrictionMarket) {
                          return { ...r, restrictedCountries: [] }
                        }
                        return r
                      }))
                      toast.success("已清除所有限制")
                    }}
                  >
                    清除全部
                  </Button>
                  <Button 
                    className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                    onClick={() => {
                      toast.success("保存成功", { description: "交易国家限制已更新" })
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    保存配置
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">请先选择一个市场进行配置</p>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">已配置限制的市场</h4>
              <div className="space-y-2">
                {countryRestrictions.filter(r => r.restrictedCountries.length > 0).map(restriction => (
                  <div 
                    key={restriction.marketId}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{restriction.marketName.toUpperCase()}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        限制 {restriction.restrictedCountries.length} 个国家
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap gap-1">
                        {restriction.restrictedCountries.slice(0, 5).map(code => {
                          const country = allCountries.find(c => c.code === code)
                          return (
                            <span key={code} className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
                              {country?.flag} {code}
                            </span>
                          )
                        })}
                        {restriction.restrictedCountries.length > 5 && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            +{restriction.restrictedCountries.length - 5}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 w-7 p-0"
                        onClick={() => setSelectedRestrictionMarket(restriction.marketId)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                {countryRestrictions.filter(r => r.restrictedCountries.length > 0).length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">暂无已配置限制的市场</p>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* 选择市场 Sheet */}
      <Sheet open={showMarketSelectSheet} onOpenChange={setShowMarketSelectSheet}>
        <SheetContent className="w-[450px] sm:max-w-[450px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              选择市场
              <span className={`text-xs px-2 py-0.5 rounded ${
                restrictionMarketType === "spot" 
                  ? "bg-custom-green/10 text-custom-green" 
                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
              }`}>
                {restrictionMarketType === "spot" ? "现货" : "杠杆"}
              </span>
            </SheetTitle>
            <SheetDescription>
              选择要配置限制国家的{restrictionMarketType === "spot" ? "现货" : "杠杆"}市场
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="搜索市场名称..." 
                value={marketSearchQuery}
                onChange={(e) => setMarketSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {markets
                .filter(m => !marketSearchQuery || m.name.toLowerCase().includes(marketSearchQuery.toLowerCase()))
                .map(market => (
                  <div 
                    key={market.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRestrictionMarket === market.id
                        ? "bg-custom-green/10 border-custom-green"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedRestrictionMarket(market.id)
                      const existing = countryRestrictions.find(r => r.marketId === market.id)
                      if (!existing) {
                        setCountryRestrictions(prev => [...prev, {
                          marketId: market.id,
                          marketName: market.name,
                          restrictedCountries: []
                        }])
                      }
                      setShowMarketSelectSheet(false)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-custom-green/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-custom-green" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{market.name.toUpperCase()}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{market.baseCurrency}/{market.quoteCurrency}</p>
                      </div>
                    </div>
                    {selectedRestrictionMarket === market.id && (
                      <Check className="w-5 h-5 text-custom-green" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* 选择国家 Sheet */}
      <Sheet open={showCountrySelectSheet} onOpenChange={setShowCountrySelectSheet}>
        <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>选择限制国家</SheetTitle>
            <SheetDescription>
              选择要限制交易的国家/地区（按手机区号）
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="搜索国家名称或区号..." 
                value={countrySearchQuery}
                onChange={(e) => setCountrySearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {allCountries
                .filter(c => 
                  !countrySearchQuery || 
                  c.name.includes(countrySearchQuery) || 
                  c.code.includes(countrySearchQuery)
                )
                .map((country, index) => {
                  const restriction = countryRestrictions.find(r => r.marketId === selectedRestrictionMarket)
                  const isSelected = restriction?.restrictedCountries.includes(country.code) || false
                  
                  return (
                    <div 
                      key={`${country.code}-${country.name}-${index}`}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        setCountryRestrictions(prev => {
                          const existing = prev.find(r => r.marketId === selectedRestrictionMarket)
                          if (existing) {
                            return prev.map(r => {
                              if (r.marketId === selectedRestrictionMarket) {
                                const hasCode = r.restrictedCountries.includes(country.code)
                                return {
                                  ...r,
                                  restrictedCountries: hasCode 
                                    ? r.restrictedCountries.filter(c => c !== country.code)
                                    : [...r.restrictedCountries, country.code]
                                }
                              }
                              return r
                            })
                          }
                          return prev
                        })
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{country.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{country.code}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )
                })}
            </div>

            <Button 
              className="w-full bg-custom-green hover:bg-custom-green-dark text-white"
              onClick={() => setShowCountrySelectSheet(false)}
            >
              完成选择
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* 白名单用户 Sheet */}
      <Sheet open={showWhitelistUserSheet} onOpenChange={setShowWhitelistUserSheet}>
        <SheetContent className="w-[550px] sm:max-w-[550px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              白名单用户配置
              <span className={`text-xs px-2 py-0.5 rounded ${
                restrictionMarketType === "spot" 
                  ? "bg-custom-green/10 text-custom-green" 
                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
              }`}>
                {restrictionMarketType === "spot" ? "现货" : "杠杆"}
              </span>
            </SheetTitle>
            <SheetDescription>
              {selectedRestrictionMarket && `${markets.find(m => m.id === selectedRestrictionMarket)?.name.toUpperCase()} - `}
              白名单用户不受国家限制，可正常交易
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
              <Label className="text-sm font-medium">添加白名单用户</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input 
                  placeholder="用户UID" 
                  value={newWhitelistUser.uid}
                  onChange={(e) => setNewWhitelistUser(prev => ({ ...prev, uid: e.target.value }))}
                />
                <Input 
                  placeholder="用户邮箱" 
                  value={newWhitelistUser.email}
                  onChange={(e) => setNewWhitelistUser(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input 
                  placeholder="用户名称" 
                  value={newWhitelistUser.name}
                  onChange={(e) => setNewWhitelistUser(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <Button 
                className="w-full bg-custom-green hover:bg-custom-green-dark text-white"
                onClick={() => {
                  if (!newWhitelistUser.uid || !newWhitelistUser.email) {
                    toast.error("请填写用户UID和邮箱")
                    return
                  }
                  setWhitelistUsers(prev => {
                    const existing = prev.find(w => w.marketId === selectedRestrictionMarket)
                    if (existing) {
                      if (existing.users.some(u => u.uid === newWhitelistUser.uid)) {
                        toast.error("该用户已在白名单中")
                        return prev
                      }
                      return prev.map(w => {
                        if (w.marketId === selectedRestrictionMarket) {
                          return { ...w, users: [...w.users, { ...newWhitelistUser }] }
                        }
                        return w
                      })
                    }
                    return [...prev, { marketId: selectedRestrictionMarket, users: [{ ...newWhitelistUser }] }]
                  })
                  setNewWhitelistUser({ uid: "", email: "", name: "" })
                  toast.success("已添加白名单用户")
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加用户
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">当前白名单用户</Label>
                <span className="text-sm text-gray-500">
                  共 {whitelistUsers.find(w => w.marketId === selectedRestrictionMarket)?.users.length || 0} 人
                </span>
              </div>
              
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="搜索用户UID/邮箱/名称..." 
                  value={whitelistUserSearch}
                  onChange={(e) => setWhitelistUserSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="space-y-2 max-h-[350px] overflow-y-auto">
                {(whitelistUsers.find(w => w.marketId === selectedRestrictionMarket)?.users || [])
                  .filter(u => 
                    !whitelistUserSearch ||
                    u.uid.includes(whitelistUserSearch) ||
                    u.email.includes(whitelistUserSearch) ||
                    u.name.includes(whitelistUserSearch)
                  )
                  .map(user => (
                    <div 
                      key={user.uid}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-custom-green/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-custom-green" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name || "未命名用户"}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>UID: {user.uid}</span>
                            <span>|</span>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => {
                          setWhitelistUsers(prev => prev.map(w => {
                            if (w.marketId === selectedRestrictionMarket) {
                              return { ...w, users: w.users.filter(u => u.uid !== user.uid) }
                            }
                            return w
                          }))
                          toast.success(`已移除用户 ${user.name || user.uid}`)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                {(whitelistUsers.find(w => w.marketId === selectedRestrictionMarket)?.users.length || 0) === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">暂无白名单用户</p>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
