"use client"

import React, { useState } from "react"
import { Plus, Edit, Trash2, Lock, Unlock, Settings, Key, Eye, Check, X } from "lucide-react"
import { DataTotal } from "@/components/data-total"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface ApiKey {
  keyId: string
  key: string
  callbackDomain: string
  domainStatus: "approved" | "pending"
  createdAt: string
}

interface InterfaceSupplier {
  name: string
  enabled: boolean
}

interface PaymentInterface {
  name: string
  enabled: boolean
  collectionFeeRate: string
  collectionFeeFixed: string
  paymentFeeRate: string
  paymentFeeFixed: string
  suppliers: InterfaceSupplier[]
}

interface FeeConfig {
  id: string
  currency: string
  channel: string
  channelType: "代收" | "代付"
  interfaces: PaymentInterface[]
  collectionFee: string
  paymentFee: string
  minCollectionFee: string
  minPaymentFee: string
  useSystemTieredFee: boolean
}

interface CurrencyBalance {
  currency: string
  balance: number
  frozenBalance: number
}

interface NetworkAddressCount {
  network: string
  count: number
  monthlyFee: number
}

interface AddressStats {
  total: number
  networks: NetworkAddressCount[]
}

interface NetworkProfitData {
  network: string
  currency: string
  addressMonthlyFee: number
  withdrawFee: number
  withdrawCost: number
  withdrawProfit: number
}

interface ProfitContribution {
  totalAddressMonthlyFee: number
  totalWithdrawFee: number
  totalWithdrawCost: number
  totalWithdrawProfit: number
  networks: NetworkProfitData[]
}

interface CurrencyProfit {
  currency: string
  collectionProfit: number
  paymentProfit: number
  exchangeRateProfit: number
  totalProfit: number
}

interface CurrencyVolume {
  currency: string
  collectionVolume: number
  paymentVolume: number
  totalVolume: number
}

interface TimeRangeProfitData {
  today: CurrencyProfit[]
  yesterday: CurrencyProfit[]
  thisMonth: CurrencyProfit[]
  total: CurrencyProfit[]
}

interface CryptoUser {
  id: string
  name: string
  userId: string
  bxbUserId: string
  email: string
  phone: string
  apiKeys: ApiKey[]
  primaryCurrency: string
  balance: number
  frozenBalance: number
  currencyBalances: CurrencyBalance[]
  addressStats: AddressStats
  profitContribution: ProfitContribution
  dailyProfit: number
  monthlyProfit: number
  totalProfit: number
  currencyProfits: CurrencyProfit[]
  profitDataByTimeRange: TimeRangeProfitData
  dailyVolume: number
  monthlyVolume: number
  totalVolume: number
  currencyVolumes: CurrencyVolume[]
  totalOrders: number
  feeConfigs: FeeConfig[]
  status: "active" | "frozen" | "disabled"
  hasPendingDomain: boolean
  createdAt: string
  lastLoginLocation?: string
  lastLoginTime?: string
}

const mockCryptoUsers: CryptoUser[] = [
  {
    id: "M003",
    name: "云端收银",
    userId: "U100003",
    bxbUserId: "BXB003",
    email: "yunduan@example.com",
    phone: "+86 138 0000 0003",
    apiKeys: [
      {
        keyId: "KEY004",
        key: "sk_live_q1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6",
        callbackDomain: "https://api.yunduan.com",
        domainStatus: "approved",
        createdAt: "2024-01-15 09:15:00"
      },
      {
        keyId: "KEY005",
        key: "sk_live_z9x8c7v6b5n4m3l2k1j0h9g8f7d6s5a4",
        callbackDomain: "https://webhook.yunduan.com",
        domainStatus: "approved",
        createdAt: "2024-03-01 11:20:00"
      },
      {
        keyId: "KEY006",
        key: "sk_live_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
        callbackDomain: "https://notify.yunduan.com",
        domainStatus: "approved",
        createdAt: "2024-04-10 16:45:00"
      }
    ],
    primaryCurrency: "USDT",
    balance: 320000,
    frozenBalance: 25000,
    currencyBalances: [
      { currency: "USDT", balance: 320000, frozenBalance: 25000 },
      { currency: "BTC", balance: 45200.00, frozenBalance: 10000 },
      { currency: "TRX", balance: 58000, frozenBalance: 8000 },
      { currency: "ETH", balance: 35000, frozenBalance: 5000 },
      { currency: "USDC", balance: 28000, frozenBalance: 3000 }
    ],
    addressStats: {
      total: 156,
      networks: [
        { network: "TRC20", count: 58, monthlyFee: 3480 },
        { network: "ERC20", count: 42, monthlyFee: 2520 },
        { network: "BSC", count: 28, monthlyFee: 1680 },
        { network: "Polygon", count: 18, monthlyFee: 1080 },
        { network: "Solana", count: 10, monthlyFee: 740 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 9500,
      totalWithdrawFee: 45800,
      totalWithdrawCost: 18200,
      totalWithdrawProfit: 27600,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 3480, withdrawFee: 18500, withdrawCost: 6200, withdrawProfit: 12300 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 2520, withdrawFee: 14200, withdrawCost: 6800, withdrawProfit: 7400 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 1680, withdrawFee: 8500, withdrawCost: 3200, withdrawProfit: 5300 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 1080, withdrawFee: 3200, withdrawCost: 1400, withdrawProfit: 1800 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 740, withdrawFee: 1400, withdrawCost: 600, withdrawProfit: 800 }
      ]
    },
    dailyProfit: 1250.50,
    monthlyProfit: 28500.00,
    totalProfit: 156000.00,
    currencyProfits: [
      { currency: "USDT", collectionProfit: 8500, paymentProfit: 3200, exchangeRateProfit: 1500, totalProfit: 13200 },
      { currency: "BTC", collectionProfit: 2800, paymentProfit: 1200, exchangeRateProfit: 800, totalProfit: 4800 },
      { currency: "TRX", collectionProfit: 35000, paymentProfit: 18000, exchangeRateProfit: 12000, totalProfit: 65000 },
      { currency: "ETH", collectionProfit: 5200, paymentProfit: 2100, exchangeRateProfit: 900, totalProfit: 8200 },
      { currency: "USDC", collectionProfit: 4500, paymentProfit: 1800, exchangeRateProfit: 700, totalProfit: 7000 }
    ],
    profitDataByTimeRange: {
      today: [
        { currency: "USDT", collectionProfit: 850, paymentProfit: 320, exchangeRateProfit: 150, totalProfit: 1320 },
        { currency: "BTC", collectionProfit: 280, paymentProfit: 120, exchangeRateProfit: 80, totalProfit: 480 },
        { currency: "TRX", collectionProfit: 3500, paymentProfit: 1800, exchangeRateProfit: 1200, totalProfit: 6500 },
        { currency: "ETH", collectionProfit: 520, paymentProfit: 210, exchangeRateProfit: 90, totalProfit: 820 },
        { currency: "USDC", collectionProfit: 450, paymentProfit: 180, exchangeRateProfit: 70, totalProfit: 700 }
      ],
      yesterday: [
        { currency: "USDT", collectionProfit: 900, paymentProfit: 340, exchangeRateProfit: 160, totalProfit: 1400 },
        { currency: "BTC", collectionProfit: 300, paymentProfit: 130, exchangeRateProfit: 85, totalProfit: 515 },
        { currency: "TRX", collectionProfit: 3700, paymentProfit: 1900, exchangeRateProfit: 1250, totalProfit: 6850 },
        { currency: "ETH", collectionProfit: 550, paymentProfit: 220, exchangeRateProfit: 95, totalProfit: 865 },
        { currency: "USDC", collectionProfit: 480, paymentProfit: 190, exchangeRateProfit: 75, totalProfit: 745 }
      ],
      thisMonth: [
        { currency: "USDT", collectionProfit: 2850, paymentProfit: 1070, exchangeRateProfit: 500, totalProfit: 4420 },
        { currency: "BTC", collectionProfit: 930, paymentProfit: 400, exchangeRateProfit: 270, totalProfit: 1600 },
        { currency: "TRX", collectionProfit: 11700, paymentProfit: 6000, exchangeRateProfit: 4000, totalProfit: 21700 },
        { currency: "ETH", collectionProfit: 1730, paymentProfit: 700, exchangeRateProfit: 300, totalProfit: 2730 },
        { currency: "USDC", collectionProfit: 1500, paymentProfit: 600, exchangeRateProfit: 230, totalProfit: 2330 }
      ],
      total: [
        { currency: "USDT", collectionProfit: 8500, paymentProfit: 3200, exchangeRateProfit: 1500, totalProfit: 13200 },
        { currency: "BTC", collectionProfit: 2800, paymentProfit: 1200, exchangeRateProfit: 800, totalProfit: 4800 },
        { currency: "TRX", collectionProfit: 35000, paymentProfit: 18000, exchangeRateProfit: 12000, totalProfit: 65000 },
        { currency: "ETH", collectionProfit: 5200, paymentProfit: 2100, exchangeRateProfit: 900, totalProfit: 8200 },
        { currency: "USDC", collectionProfit: 4500, paymentProfit: 1800, exchangeRateProfit: 700, totalProfit: 7000 }
      ]
    },
    dailyVolume: 125000,
    monthlyVolume: 2850000,
    totalVolume: 15600000,
    currencyVolumes: [
      { currency: "USDT", collectionVolume: 8500000, paymentVolume: 3200000, totalVolume: 11700000 },
      { currency: "BTC", collectionVolume: 850000, paymentVolume: 320000, totalVolume: 1170000 },
      { currency: "TRX", collectionVolume: 1800000, paymentVolume: 900000, totalVolume: 2700000 },
      { currency: "ETH", collectionVolume: 180000, paymentVolume: 90000, totalVolume: 270000 },
      { currency: "USDC", collectionVolume: 120000, paymentVolume: 50000, totalVolume: 170000 }
    ],
    totalOrders: 5432,
    feeConfigs: [
      { 
        id: "FC008", currency: "USDT", channel: "TRC20", channelType: "代收",
        interfaces: [
          { name: "Bitzpay", enabled: true, collectionFeeRate: "1%", collectionFeeFixed: "1", paymentFeeRate: "2%", paymentFeeFixed: "0", suppliers: [{ name: "云端支付", enabled: true }, { name: "极速支付", enabled: false }] }
        ], 
        collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "USDT 1.00", minPaymentFee: "USDT 0.50", useSystemTieredFee: false 
      },
      { 
        id: "FC009", currency: "USDT", channel: "ERC20", channelType: "代收",
        interfaces: [
          { name: "BePayOTC", enabled: true, collectionFeeRate: "0.8%", collectionFeeFixed: "0.5", paymentFeeRate: "1.5%", paymentFeeFixed: "0", suppliers: [{ name: "星辰支付", enabled: true }] }, 
          { name: "CFpay", enabled: false, collectionFeeRate: "1.2%", collectionFeeFixed: "2", paymentFeeRate: "1.8%", paymentFeeFixed: "1", suppliers: [{ name: "快付通", enabled: true }, { name: "TRC20", enabled: false }] }
        ], 
        collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "USDT 1.00", minPaymentFee: "USDT 0.50", useSystemTieredFee: false 
      },
      { 
        id: "FC010", currency: "USDT", channel: "TRC20", channelType: "代收",
        interfaces: [
          { name: "PayGate", enabled: true, collectionFeeRate: "0.5%", collectionFeeFixed: "1", paymentFeeRate: "0.8%", paymentFeeFixed: "0.5", suppliers: [{ name: "链上支付", enabled: true }, { name: "数字钱包", enabled: true }] }, 
          { name: "EasyPay", enabled: true, collectionFeeRate: "0.6%", collectionFeeFixed: "0", paymentFeeRate: "1%", paymentFeeFixed: "0", suppliers: [{ name: "USDT通道", enabled: true }] }
        ], 
        collectionFee: "1.2%", paymentFee: "1.0%", minCollectionFee: "1.2 USDT", minPaymentFee: "1.0 USDT", useSystemTieredFee: true 
      },
      { 
        id: "FC011", currency: "USDT", channel: "ERC20", channelType: "代付",
        interfaces: [
          { name: "Bitzpay", enabled: true, collectionFeeRate: "1%", collectionFeeFixed: "2", paymentFeeRate: "1.2%", paymentFeeFixed: "1.5", suppliers: [{ name: "以太坊网关", enabled: true }] }
        ], 
        collectionFee: "1.5%", paymentFee: "1.3%", minCollectionFee: "2.0 USDT", minPaymentFee: "1.5 USDT", useSystemTieredFee: false 
      },
    ],
    status: "frozen",
    hasPendingDomain: false,
    createdAt: "2024-01-15 09:15:00",
    lastLoginLocation: "北京市朝阳区",
    lastLoginTime: "2024-11-15 09:30:00"
  },
  {
    id: "M004",
    name: "星际支付",
    userId: "U100004",
    bxbUserId: "BXB004",
    email: "xingji@example.com",
    phone: "+86 138 0000 0004",
    apiKeys: [
      {
        keyId: "KEY007",
        key: "sk_live_7h6g5f4d3s2a1p0o9i8u7y6t5r4e3w2q",
        callbackDomain: "https://api.xingji.com",
        domainStatus: "approved",
        createdAt: "2024-01-08 16:45:00"
      }
    ],
    primaryCurrency: "USDT",
    balance: 1250000,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "USDT", balance: 1250000, frozenBalance: 0 },
      { currency: "BTC", balance: 210000.75, frozenBalance: 0 },
      { currency: "TRX", balance: 165000, frozenBalance: 0 },
      { currency: "ETH", balance: 120000, frozenBalance: 0 },
      { currency: "USDC", balance: 95000, frozenBalance: 0 }
    ],
    addressStats: {
      total: 425,
      networks: [
        { network: "TRC20", count: 165, monthlyFee: 9900 },
        { network: "ERC20", count: 125, monthlyFee: 7500 },
        { network: "BSC", count: 85, monthlyFee: 5100 },
        { network: "Polygon", count: 35, monthlyFee: 2100 },
        { network: "Solana", count: 15, monthlyFee: 900 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 25500,
      totalWithdrawFee: 158000,
      totalWithdrawCost: 62000,
      totalWithdrawProfit: 96000,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 9900, withdrawFee: 65000, withdrawCost: 22000, withdrawProfit: 43000 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 7500, withdrawFee: 48000, withdrawCost: 22000, withdrawProfit: 26000 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 5100, withdrawFee: 32000, withdrawCost: 12000, withdrawProfit: 20000 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 2100, withdrawFee: 9500, withdrawCost: 4200, withdrawProfit: 5300 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 900, withdrawFee: 3500, withdrawCost: 1800, withdrawProfit: 1700 }
      ]
    },
    dailyProfit: 5800.25,
    monthlyProfit: 158000.00,
    totalProfit: 980000.00,
    currencyProfits: [
      { currency: "USDT", collectionProfit: 85000, paymentProfit: 42000, exchangeRateProfit: 28000, totalProfit: 155000 },
      { currency: "BTC", collectionProfit: 125000, paymentProfit: 68000, exchangeRateProfit: 45000, totalProfit: 238000 },
      { currency: "TRX", collectionProfit: 220000, paymentProfit: 115000, exchangeRateProfit: 82000, totalProfit: 417000 },
      { currency: "ETH", collectionProfit: 68000, paymentProfit: 35000, exchangeRateProfit: 22000, totalProfit: 125000 },
      { currency: "USDC", collectionProfit: 28000, paymentProfit: 12000, exchangeRateProfit: 5000, totalProfit: 45000 }
    ],
    profitDataByTimeRange: {
      today: [
        { currency: "USDT", collectionProfit: 8500, paymentProfit: 4200, exchangeRateProfit: 2800, totalProfit: 15500 },
        { currency: "BTC", collectionProfit: 12500, paymentProfit: 6800, exchangeRateProfit: 4500, totalProfit: 23800 },
        { currency: "TRX", collectionProfit: 22000, paymentProfit: 11500, exchangeRateProfit: 8200, totalProfit: 41700 },
        { currency: "ETH", collectionProfit: 6800, paymentProfit: 3500, exchangeRateProfit: 2200, totalProfit: 12500 },
        { currency: "USDC", collectionProfit: 2800, paymentProfit: 1200, exchangeRateProfit: 500, totalProfit: 4500 }
      ],
      yesterday: [
        { currency: "USDT", collectionProfit: 9000, paymentProfit: 4400, exchangeRateProfit: 2900, totalProfit: 16300 },
        { currency: "BTC", collectionProfit: 13200, paymentProfit: 7100, exchangeRateProfit: 4700, totalProfit: 25000 },
        { currency: "TRX", collectionProfit: 23000, paymentProfit: 12000, exchangeRateProfit: 8500, totalProfit: 43500 },
        { currency: "ETH", collectionProfit: 7100, paymentProfit: 3700, exchangeRateProfit: 2300, totalProfit: 13100 },
        { currency: "USDC", collectionProfit: 2900, paymentProfit: 1300, exchangeRateProfit: 530, totalProfit: 4730 }
      ],
      thisMonth: [
        { currency: "TRX", collectionProfit: 28500, paymentProfit: 14000, exchangeRateProfit: 9300, totalProfit: 51800 },
        { currency: "BTC", collectionProfit: 41700, paymentProfit: 22700, exchangeRateProfit: 15000, totalProfit: 79400 },
        { currency: "USDT", collectionProfit: 73300, paymentProfit: 38300, exchangeRateProfit: 27300, totalProfit: 138900 },
        { currency: "ETH", collectionProfit: 22700, paymentProfit: 11700, exchangeRateProfit: 7300, totalProfit: 41700 },
        { currency: "USDC", collectionProfit: 9300, paymentProfit: 4000, exchangeRateProfit: 1670, totalProfit: 15000 }
      ],
      total: [
        { currency: "TRX", collectionProfit: 85000, paymentProfit: 42000, exchangeRateProfit: 28000, totalProfit: 155000 },
        { currency: "BTC", collectionProfit: 125000, paymentProfit: 68000, exchangeRateProfit: 45000, totalProfit: 238000 },
        { currency: "USDT", collectionProfit: 220000, paymentProfit: 115000, exchangeRateProfit: 82000, totalProfit: 417000 },
        { currency: "ETH", collectionProfit: 68000, paymentProfit: 35000, exchangeRateProfit: 22000, totalProfit: 125000 },
        { currency: "USDC", collectionProfit: 28000, paymentProfit: 12000, exchangeRateProfit: 5000, totalProfit: 45000 }
      ]
    },
    dailyVolume: 580000,
    monthlyVolume: 15800000,
    totalVolume: 98000000,
    currencyVolumes: [
      { currency: "USDT", collectionVolume: 55000000, paymentVolume: 25000000, totalVolume: 80000000 },
      { currency: "BTC", collectionVolume: 8500000, paymentVolume: 3800000, totalVolume: 12300000 },
      { currency: "TRX", collectionVolume: 3500000, paymentVolume: 1800000, totalVolume: 5300000 },
      { currency: "ETH", collectionVolume: 280000, paymentVolume: 120000, totalVolume: 400000 },
      { currency: "USDC", collectionVolume: 180000, paymentVolume: 80000, totalVolume: 260000 }
    ],
    totalOrders: 23456,
    feeConfigs: [
      { 
        id: "FC012", currency: "USDT", channel: "TRC20", channelType: "代收",
        interfaces: [
          { name: "CFpay", enabled: true, collectionFeeRate: "0.9%", collectionFeeFixed: "1.5", paymentFeeRate: "1.2%", paymentFeeFixed: "0.8", suppliers: [{ name: "云支付", enabled: true }, { name: "付费通", enabled: true }] }, 
          { name: "PayGate", enabled: true, collectionFeeRate: "1.1%", collectionFeeFixed: "2", paymentFeeRate: "1.5%", paymentFeeFixed: "1", suppliers: [{ name: "支付网关", enabled: true }] }, 
          { name: "EasyPay", enabled: false, collectionFeeRate: "0.7%", collectionFeeFixed: "1", paymentFeeRate: "1%", paymentFeeFixed: "0.5", suppliers: [{ name: "简易支付", enabled: false }] }
        ], 
        collectionFee: "0.4%", paymentFee: "0.2%", minCollectionFee: "USDT 0.80", minPaymentFee: "USDT 0.40", useSystemTieredFee: true 
      },
      { 
        id: "FC013", currency: "USDT", channel: "ERC20", channelType: "代收",
        interfaces: [
          { name: "Bitzpay", enabled: true, collectionFeeRate: "1%", collectionFeeFixed: "1", paymentFeeRate: "1.3%", paymentFeeFixed: "0", suppliers: [{ name: "微信通道", enabled: true }] }, 
          { name: "BePayOTC", enabled: true, collectionFeeRate: "0.8%", collectionFeeFixed: "0.5", paymentFeeRate: "1.2%", paymentFeeFixed: "0", suppliers: [{ name: "场外支付", enabled: true }] }
        ], 
        collectionFee: "0.4%", paymentFee: "0.2%", minCollectionFee: "USDT 0.80", minPaymentFee: "USDT 0.40", useSystemTieredFee: false 
      },
      { 
        id: "FC014", currency: "USDT", channel: "BSC", channelType: "代付",
        interfaces: [
          { name: "CFpay", enabled: true, collectionFeeRate: "1.2%", collectionFeeFixed: "2", paymentFeeRate: "1.5%", paymentFeeFixed: "1.5", suppliers: [{ name: "银行直连", enabled: true }, { name: "聚合支付", enabled: true }] }
        ], 
        collectionFee: "0.45%", paymentFee: "0.25%", minCollectionFee: "USDT 0.90", minPaymentFee: "USDT 0.50", useSystemTieredFee: true 
      },
      { 
        id: "FC015", currency: "BTC", channel: "Solana", channelType: "代收",
        interfaces: [
          { name: "PayGate", enabled: true, collectionFeeRate: "2.5%", collectionFeeFixed: "0.3", paymentFeeRate: "2.8%", paymentFeeFixed: "0.25", suppliers: [{ name: "国际支付", enabled: true }] }
        ], 
        collectionFee: "2.8%", paymentFee: "2.4%", minCollectionFee: "BTC 0.30", minPaymentFee: "BTC 0.25", useSystemTieredFee: false 
      },
      { 
        id: "FC016", currency: "USDT", channel: "TRC20", channelType: "代付",
        interfaces: [
          { name: "EasyPay", enabled: true, collectionFeeRate: "0.6%", collectionFeeFixed: "0", paymentFeeRate: "0.9%", paymentFeeFixed: "0", suppliers: [{ name: "波场网络", enabled: true }] }, 
          { name: "Bitzpay", enabled: false, collectionFeeRate: "0.8%", collectionFeeFixed: "1", paymentFeeRate: "1.1%", paymentFeeFixed: "0.5", suppliers: [{ name: "数字货币", enabled: false }] }
        ], 
        collectionFee: "0.9%", paymentFee: "0.7%", minCollectionFee: "0.9 USDT", minPaymentFee: "0.7 USDT", useSystemTieredFee: true 
      },
    ],
    status: "active",
    hasPendingDomain: false,
    createdAt: "2024-01-08 16:45:00",
    lastLoginLocation: "深圳市福田区",
    lastLoginTime: "2024-11-14 14:25:00"
  },
  {
    id: "M005",
    name: "快付科技",
    userId: "U100005",
    bxbUserId: "BXB005",
    email: "kuaifu@example.com",
    phone: "+86 138 0000 0005",
    apiKeys: [],
    primaryCurrency: "USDT",
    balance: 0,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "USDT", balance: 0, frozenBalance: 0 },
      { currency: "BTC", balance: 0, frozenBalance: 0 },
      { currency: "TRX", balance: 0, frozenBalance: 0 },
      { currency: "ETH", balance: 0, frozenBalance: 0 },
      { currency: "USDC", balance: 0, frozenBalance: 0 }
    ],
    addressStats: {
      total: 0,
      networks: [
        { network: "TRC20", count: 0, monthlyFee: 0 },
        { network: "ERC20", count: 0, monthlyFee: 0 },
        { network: "BSC", count: 0, monthlyFee: 0 },
        { network: "Polygon", count: 0, monthlyFee: 0 },
        { network: "Solana", count: 0, monthlyFee: 0 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 0,
      totalWithdrawFee: 0,
      totalWithdrawCost: 0,
      totalWithdrawProfit: 0,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 }
      ]
    },
    dailyProfit: 0,
    monthlyProfit: 0,
    totalProfit: 0,
    currencyProfits: [],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 0,
    monthlyVolume: 0,
    totalVolume: 0,
    currencyVolumes: [],
    totalOrders: 0,
    feeConfigs: [],
    status: "active",
    hasPendingDomain: false,
    createdAt: "2024-06-20 10:30:00",
    lastLoginLocation: "广州市天河区",
    lastLoginTime: "2024-11-13 16:45:00"
  },
  {
    id: "M006",
    name: "数字钱包Pro",
    userId: "U100006",
    bxbUserId: "BXB006",
    email: "digitalwallet@example.com",
    phone: "+86 138 0000 0006",
    apiKeys: [
      {
        keyId: "KEY008",
        key: "sk_live_a1s2d3f4g5h6j7k8l9z0x1c2v3b4n5m6",
        callbackDomain: "https://api-test.digitalwallet.com",
        domainStatus: "pending",
        createdAt: "2024-06-15 14:20:00"
      }
    ],
    primaryCurrency: "USDT",
    balance: 85000,
    frozenBalance: 15000,
    currencyBalances: [
      { currency: "USDT", balance: 85000, frozenBalance: 15000 },
      { currency: "BTC", balance: 12500, frozenBalance: 2500 },
      { currency: "TRX", balance: 28000, frozenBalance: 5000 },
      { currency: "ETH", balance: 18000, frozenBalance: 3000 },
      { currency: "USDC", balance: 15000, frozenBalance: 2000 }
    ],
    addressStats: {
      total: 48,
      networks: [
        { network: "TRC20", count: 20, monthlyFee: 1200 },
        { network: "ERC20", count: 15, monthlyFee: 900 },
        { network: "BSC", count: 8, monthlyFee: 480 },
        { network: "Polygon", count: 3, monthlyFee: 180 },
        { network: "Solana", count: 2, monthlyFee: 120 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 2880,
      totalWithdrawFee: 12500,
      totalWithdrawCost: 5200,
      totalWithdrawProfit: 7300,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 1200, withdrawFee: 5000, withdrawCost: 2000, withdrawProfit: 3000 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 900, withdrawFee: 4000, withdrawCost: 1800, withdrawProfit: 2200 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 480, withdrawFee: 2500, withdrawCost: 1000, withdrawProfit: 1500 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 180, withdrawFee: 800, withdrawCost: 300, withdrawProfit: 500 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 120, withdrawFee: 200, withdrawCost: 100, withdrawProfit: 100 }
      ]
    },
    dailyProfit: 350,
    monthlyProfit: 8500,
    totalProfit: 42000,
    currencyProfits: [
      { currency: "USDT", collectionProfit: 3200, paymentProfit: 1500, exchangeRateProfit: 800, totalProfit: 5500 },
      { currency: "BTC", collectionProfit: 1200, paymentProfit: 600, exchangeRateProfit: 400, totalProfit: 2200 }
    ],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 35000,
    monthlyVolume: 850000,
    totalVolume: 4200000,
    currencyVolumes: [],
    totalOrders: 1250,
    feeConfigs: [
      { 
        id: "FC017", currency: "USDT", channel: "TRC20", channelType: "代收",
        interfaces: [
          { name: "PayGate", enabled: true, collectionFeeRate: "0.6%", collectionFeeFixed: "1", paymentFeeRate: "0.9%", paymentFeeFixed: "0.5", suppliers: [{ name: "快速通道", enabled: true }] }
        ], 
        collectionFee: "0.6%", paymentFee: "0.4%", minCollectionFee: "USDT 1.00", minPaymentFee: "USDT 0.60", useSystemTieredFee: false 
      },
    ],
    status: "active",
    hasPendingDomain: true,
    createdAt: "2024-03-12 11:45:00",
    lastLoginLocation: "杭州市西湖区",
    lastLoginTime: "2024-11-12 10:15:00"
  },
  {
    id: "M007",
    name: "链上交易所",
    userId: "U100007",
    bxbUserId: "BXB007",
    email: "chainex@example.com",
    phone: "+86 138 0000 0007",
    apiKeys: [
      {
        keyId: "KEY009",
        key: "sk_live_p0o9i8u7y6t5r4e3w2q1a2s3d4f5g6h7",
        callbackDomain: "https://api.chainex.io",
        domainStatus: "approved",
        createdAt: "2024-02-20 08:30:00"
      },
      {
        keyId: "KEY010",
        key: "sk_live_m6n5b4v3c2x1z0l9k8j7h6g5f4d3s2a1",
        callbackDomain: "https://webhook.chainex.io",
        domainStatus: "approved",
        createdAt: "2024-05-10 15:20:00"
      }
    ],
    primaryCurrency: "USDT",
    balance: 580000,
    frozenBalance: 45000,
    currencyBalances: [
      { currency: "USDT", balance: 580000, frozenBalance: 45000 },
      { currency: "BTC", balance: 98000, frozenBalance: 12000 },
      { currency: "TRX", balance: 125000, frozenBalance: 18000 },
      { currency: "ETH", balance: 75000, frozenBalance: 8000 },
      { currency: "USDC", balance: 52000, frozenBalance: 6000 }
    ],
    addressStats: {
      total: 285,
      networks: [
        { network: "TRC20", count: 110, monthlyFee: 6600 },
        { network: "ERC20", count: 85, monthlyFee: 5100 },
        { network: "BSC", count: 55, monthlyFee: 3300 },
        { network: "Polygon", count: 25, monthlyFee: 1500 },
        { network: "Solana", count: 10, monthlyFee: 600 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 17100,
      totalWithdrawFee: 89000,
      totalWithdrawCost: 35000,
      totalWithdrawProfit: 54000,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 6600, withdrawFee: 38000, withdrawCost: 14000, withdrawProfit: 24000 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 5100, withdrawFee: 28000, withdrawCost: 12000, withdrawProfit: 16000 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 3300, withdrawFee: 18000, withdrawCost: 7000, withdrawProfit: 11000 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 1500, withdrawFee: 4000, withdrawCost: 1500, withdrawProfit: 2500 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 600, withdrawFee: 1000, withdrawCost: 500, withdrawProfit: 500 }
      ]
    },
    dailyProfit: 2850,
    monthlyProfit: 68000,
    totalProfit: 425000,
    currencyProfits: [],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 285000,
    monthlyVolume: 6800000,
    totalVolume: 42500000,
    currencyVolumes: [],
    totalOrders: 8950,
    feeConfigs: [
      { 
        id: "FC018", currency: "USDT", channel: "TRC20", channelType: "代收",
        interfaces: [
          { name: "Bitzpay", enabled: true, collectionFeeRate: "0.5%", collectionFeeFixed: "0.8", paymentFeeRate: "0.8%", paymentFeeFixed: "0.6", suppliers: [{ name: "主力通道", enabled: true }] }
        ], 
        collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "USDT 0.80", minPaymentFee: "USDT 0.50", useSystemTieredFee: true 
      },
      { 
        id: "FC019", currency: "USDT", channel: "ERC20", channelType: "代付",
        interfaces: [
          { name: "CFpay", enabled: true, collectionFeeRate: "0.7%", collectionFeeFixed: "1", paymentFeeRate: "1%", paymentFeeFixed: "0.8", suppliers: [{ name: "以太通道", enabled: true }] }
        ], 
        collectionFee: "0.7%", paymentFee: "0.5%", minCollectionFee: "USDT 1.00", minPaymentFee: "USDT 0.80", useSystemTieredFee: false 
      },
    ],
    status: "active",
    hasPendingDomain: false,
    createdAt: "2024-02-20 08:30:00",
    lastLoginLocation: "上海市浦东新区",
    lastLoginTime: "2024-11-11 08:50:00"
  },
  {
    id: "M008",
    name: "跨境支付",
    userId: "U100008",
    bxbUserId: "BXB008",
    email: "crosspay@example.com",
    phone: "+86 138 0000 0008",
    apiKeys: [],
    primaryCurrency: "USDT",
    balance: 5000,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "USDT", balance: 5000, frozenBalance: 0 },
      { currency: "BTC", balance: 0, frozenBalance: 0 },
      { currency: "TRX", balance: 0, frozenBalance: 0 },
      { currency: "ETH", balance: 0, frozenBalance: 0 },
      { currency: "USDC", balance: 0, frozenBalance: 0 }
    ],
    addressStats: {
      total: 5,
      networks: [
        { network: "TRC20", count: 3, monthlyFee: 180 },
        { network: "ERC20", count: 2, monthlyFee: 120 },
        { network: "BSC", count: 0, monthlyFee: 0 },
        { network: "Polygon", count: 0, monthlyFee: 0 },
        { network: "Solana", count: 0, monthlyFee: 0 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 300,
      totalWithdrawFee: 850,
      totalWithdrawCost: 380,
      totalWithdrawProfit: 470,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 180, withdrawFee: 500, withdrawCost: 220, withdrawProfit: 280 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 120, withdrawFee: 350, withdrawCost: 160, withdrawProfit: 190 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 }
      ]
    },
    dailyProfit: 15.50,
    monthlyProfit: 470,
    totalProfit: 1250,
    currencyProfits: [],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 1500,
    monthlyVolume: 47000,
    totalVolume: 125000,
    currencyVolumes: [],
    totalOrders: 85,
    feeConfigs: [],
    status: "active",
    hasPendingDomain: false,
    createdAt: "2024-06-01 09:00:00",
    lastLoginLocation: "成都市高新区",
    lastLoginTime: "2024-11-10 13:30:00"
  },
  {
    id: "M009",
    name: "区块支付",
    userId: "U100009",
    bxbUserId: "BXB009",
    email: "blockpay@example.com",
    phone: "+86 138 0000 0009",
    apiKeys: [
      {
        keyId: "KEY011",
        key: "sk_live_q9w8e7r6t5y4u3i2o1p0a9s8d7f6g5h4",
        callbackDomain: "https://api.blockpay.net",
        domainStatus: "approved",
        createdAt: "2024-04-05 13:15:00"
      }
    ],
    primaryCurrency: "USDT",
    balance: 0,
    frozenBalance: 180000,
    currencyBalances: [
      { currency: "USDT", balance: 0, frozenBalance: 180000 },
      { currency: "BTC", balance: 0, frozenBalance: 28000 },
      { currency: "TRX", balance: 0, frozenBalance: 45000 },
      { currency: "ETH", balance: 0, frozenBalance: 22000 },
      { currency: "USDC", balance: 0, frozenBalance: 18000 }
    ],
    addressStats: {
      total: 95,
      networks: [
        { network: "TRC20", count: 38, monthlyFee: 2280 },
        { network: "ERC20", count: 28, monthlyFee: 1680 },
        { network: "BSC", count: 18, monthlyFee: 1080 },
        { network: "Polygon", count: 8, monthlyFee: 480 },
        { network: "Solana", count: 3, monthlyFee: 180 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 5700,
      totalWithdrawFee: 28500,
      totalWithdrawCost: 11500,
      totalWithdrawProfit: 17000,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 2280, withdrawFee: 12000, withdrawCost: 4500, withdrawProfit: 7500 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 1680, withdrawFee: 9500, withdrawCost: 4200, withdrawProfit: 5300 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 1080, withdrawFee: 5000, withdrawCost: 2000, withdrawProfit: 3000 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 480, withdrawFee: 1500, withdrawCost: 600, withdrawProfit: 900 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 180, withdrawFee: 500, withdrawCost: 200, withdrawProfit: 300 }
      ]
    },
    dailyProfit: 0,
    monthlyProfit: 0,
    totalProfit: 85000,
    currencyProfits: [],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 0,
    monthlyVolume: 0,
    totalVolume: 8500000,
    currencyVolumes: [],
    totalOrders: 3250,
    feeConfigs: [
      { 
        id: "FC020", currency: "USDT", channel: "TRC20", channelType: "代收",
        interfaces: [
          { name: "PayGate", enabled: false, collectionFeeRate: "0.8%", collectionFeeFixed: "1.2", paymentFeeRate: "1.1%", paymentFeeFixed: "0.9", suppliers: [{ name: "已停用", enabled: false }] }
        ], 
        collectionFee: "0.8%", paymentFee: "0.6%", minCollectionFee: "USDT 1.20", minPaymentFee: "USDT 0.90", useSystemTieredFee: false 
      },
    ],
    status: "frozen",
    hasPendingDomain: false,
    createdAt: "2024-04-05 13:15:00",
    lastLoginLocation: "南京市鼓楼区",
    lastLoginTime: "2024-11-14 17:20:00"
  },
  {
    id: "M010",
    name: "闪电网络",
    userId: "U100010",
    bxbUserId: "BXB010",
    email: "lightning@example.com",
    phone: "+86 138 0000 0010",
    apiKeys: [],
    primaryCurrency: "USDT",
    balance: 0,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "USDT", balance: 0, frozenBalance: 0 },
      { currency: "BTC", balance: 0, frozenBalance: 0 },
      { currency: "TRX", balance: 0, frozenBalance: 0 },
      { currency: "ETH", balance: 0, frozenBalance: 0 },
      { currency: "USDC", balance: 0, frozenBalance: 0 }
    ],
    addressStats: {
      total: 0,
      networks: [
        { network: "TRC20", count: 0, monthlyFee: 0 },
        { network: "ERC20", count: 0, monthlyFee: 0 },
        { network: "BSC", count: 0, monthlyFee: 0 },
        { network: "Polygon", count: 0, monthlyFee: 0 },
        { network: "Solana", count: 0, monthlyFee: 0 }
      ]
    },
    profitContribution: {
      totalAddressMonthlyFee: 0,
      totalWithdrawFee: 0,
      totalWithdrawCost: 0,
      totalWithdrawProfit: 0,
      networks: [
        { network: "TRC20", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "ERC20", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "BSC", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "Polygon", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 },
        { network: "Solana", currency: "USDT", addressMonthlyFee: 0, withdrawFee: 0, withdrawCost: 0, withdrawProfit: 0 }
      ]
    },
    dailyProfit: 0,
    monthlyProfit: 0,
    totalProfit: 0,
    currencyProfits: [],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 0,
    monthlyVolume: 0,
    totalVolume: 0,
    currencyVolumes: [],
    totalOrders: 0,
    feeConfigs: [],
    status: "disabled",
    hasPendingDomain: false,
    createdAt: "2024-06-25 16:00:00",
    lastLoginLocation: "武汉市江汉区",
    lastLoginTime: "2024-11-15 11:05:00"
  },
]

export default function CryptoUsersPage() {
  const [cryptoUsers, setCryptoUsers] = useState<CryptoUser[]>(mockCryptoUsers)
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [userFilter, setUserFilter] = useState<"normal" | "hasApi" | "pending" | "all">("all")
  const [sortBy, setSortBy] = useState<"none" | "profit" | "volume">("none")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false)
  const [isFreezeFundsDialogOpen, setIsFreezeFundsDialogOpen] = useState(false)
  const [isFeeConfigDialogOpen, setIsFeeConfigDialogOpen] = useState(false)
  const [isAddFeeConfigDialogOpen, setIsAddFeeConfigDialogOpen] = useState(false)
  const [isApiKeysDialogOpen, setIsApiKeysDialogOpen] = useState(false)
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false)
  const [isAddressStatsDialogOpen, setIsAddressStatsDialogOpen] = useState(false)
  const [isProfitContributionDialogOpen, setIsProfitContributionDialogOpen] = useState(false)
  const [isInterfaceManageDialogOpen, setIsInterfaceManageDialogOpen] = useState(false)
  const [isSupplierManageDialogOpen, setIsSupplierManageDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<CryptoUser | null>(null)
  const [currentFeeConfig, setCurrentFeeConfig] = useState<FeeConfig | null>(null)
  const [currentInterface, setCurrentInterface] = useState<PaymentInterface | null>(null)
  const [freezeAmount, setFreezeAmount] = useState("")
  const [freezeFormData, setFreezeFormData] = useState({
    currency: "",
    amount: ""
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active" as "active" | "frozen" | "disabled"
  })
  const [feeFormData, setFeeFormData] = useState({
    currency: "",
    channel: "",
    channelType: "代收" as "代收" | "代付",
    supplier: "",
    collectionFee: "",
    paymentFee: "",
    minCollectionFee: "",
    minPaymentFee: "",
    useSystemTieredFee: false
  })
  const [activeCurrency, setActiveCurrency] = useState<string>("")

  const ALL_CRYPTOS = ["USDT", "BTC", "ETH", "USDC", "TRX"]
  const ALL_NETWORKS = ["TRC20", "ERC20", "BSC", "Polygon", "Solana", "Arbitrum"]

  const getAllPaymentMethods = (user: CryptoUser | null) => {
    if (!user) return []
    
    const allMethods: FeeConfig[] = []
    
    ALL_CRYPTOS.forEach(currency => {
      ALL_NETWORKS.forEach(channel => {
        const existingConfig = user.feeConfigs.find(
          fc => fc.currency === currency && fc.channel === channel
        )
        
        if (existingConfig) {
          allMethods.push(existingConfig)
        } else {
          allMethods.push({
            id: `auto-${currency}-${channel}`,
            currency,
            channel,
            channelType: "代收",
            interfaces: [],
            collectionFee: "",
            paymentFee: "",
            minCollectionFee: "",
            minPaymentFee: "",
            useSystemTieredFee: true
          })
        }
      })
    })
    
    return allMethods
  }

  const getUserCounts = () => {
    return {
      all: cryptoUsers.length,
      normal: cryptoUsers.filter(u => u.apiKeys.length === 0 && !u.hasPendingDomain).length,
      hasApi: cryptoUsers.filter(u => u.apiKeys.length > 0 && !u.hasPendingDomain).length,
      pending: cryptoUsers.filter(u => u.hasPendingDomain).length
    }
  }

  const counts = getUserCounts()

  const filteredUsers = cryptoUsers.filter(user => {
    // 先按页签筛选（互斥逻辑：pending优先级最高）
    if (userFilter === "normal" && (user.apiKeys.length > 0 || user.hasPendingDomain)) {
      return false
    }
    if (userFilter === "hasApi" && (user.apiKeys.length === 0 || user.hasPendingDomain)) {
      return false
    }
    if (userFilter === "pending" && !user.hasPendingDomain) {
      return false
    }
    
    // 再按搜索词筛选
    if (searchTerm) {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchTerm.toLowerCase())
    }
    
    return true
  }).sort((a, b) => {
    // 根据排序按钮进行排序
    if (sortBy === "profit") {
      return b.profitContribution.totalWithdrawProfit - a.profitContribution.totalWithdrawProfit
    }
    if (sortBy === "volume") {
      return b.totalVolume - a.totalVolume
    }
    return 0
  })

  const openBalanceDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setIsBalanceDialogOpen(true)
  }

  const openAddressStatsDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setIsAddressStatsDialogOpen(true)
  }

  const openProfitContributionDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setIsProfitContributionDialogOpen(true)
  }

  const openApiKeysDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setIsApiKeysDialogOpen(true)
  }

  const handleEdit = () => {
    if (currentUser) {
      setCryptoUsers(cryptoUsers.map(m => 
        m.id === currentUser.id ? { ...m, ...formData } : m
      ))
      setIsEditDialogOpen(false)
      setCurrentUser(null)
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "active"
      })
    }
  }

  const handleDelete = () => {
    if (currentUser) {
      setCryptoUsers(cryptoUsers.filter(m => m.id !== currentUser.id))
      setIsDeleteDialogOpen(false)
      setCurrentUser(null)
    }
  }

  const handleToggleFreeze = () => {
    if (currentUser && freezeFormData.currency && freezeFormData.amount) {
      const newStatus = currentUser.status === "frozen" ? "active" : "frozen"
      setCryptoUsers(cryptoUsers.map(m => 
        m.id === currentUser.id ? { ...m, status: newStatus } : m
      ))
      setIsFreezeDialogOpen(false)
      setCurrentUser(null)
      setFreezeFormData({ currency: "", amount: "" })
    }
  }

  const handleFreezeFunds = () => {
    if (currentUser && freezeAmount) {
      const amount = parseFloat(freezeAmount)
      setCryptoUsers(cryptoUsers.map(m => 
        m.id === currentUser.id 
          ? { 
              ...m, 
              frozenBalance: m.frozenBalance + amount,
              balance: m.balance - amount
            } 
          : m
      ))
      setIsFreezeFundsDialogOpen(false)
      setCurrentUser(null)
      setFreezeAmount("")
    }
  }

  const handleUserStatusToggle = (user: CryptoUser, checked: boolean) => {
    if (user.status === "disabled") {
      return
    }
    
    const newStatus = checked ? "active" : "frozen"
    setCryptoUsers(cryptoUsers.map(m => 
      m.id === user.id ? { ...m, status: newStatus } : m
    ))
  }

  const openEditDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setIsDeleteDialogOpen(true)
  }

  const openFreezeDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setFreezeFormData({ currency: "", amount: "" })
    setIsFreezeDialogOpen(true)
  }

  const openFreezeFundsDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setIsFreezeFundsDialogOpen(true)
  }

  const openFeeConfigDialog = (user: CryptoUser) => {
    setCurrentUser(user)
    setActiveCurrency(ALL_CRYPTOS[0])
    setIsFeeConfigDialogOpen(true)
  }

  const openAddFeeConfigDialog = () => {
    setFeeFormData({
      currency: "",
      channel: "",
      channelType: "代收",
      supplier: "",
      collectionFee: "",
      paymentFee: "",
      minCollectionFee: "",
      minPaymentFee: "",
      useSystemTieredFee: false
    })
    setIsAddFeeConfigDialogOpen(true)
  }

  const openInterfaceManageDialog = (feeConfig: FeeConfig) => {
    setCurrentFeeConfig(feeConfig)
    setIsInterfaceManageDialogOpen(true)
  }

  const openSupplierManageDialog = (paymentInterface: PaymentInterface) => {
    setCurrentInterface(paymentInterface)
    setIsSupplierManageDialogOpen(true)
  }

  const handleToggleInterface = (interfaceName: string, enabled: boolean) => {
    if (!currentFeeConfig || !currentUser) return
    
    const updatedFeeConfigs = currentUser.feeConfigs.map(fc => {
      if (fc.id === currentFeeConfig.id) {
        const updatedInterfaces = fc.interfaces.map(iface => 
          iface.name === interfaceName ? { ...iface, enabled } : iface
        )
        return { ...fc, interfaces: updatedInterfaces }
      }
      return fc
    })
    
    setCryptoUsers(cryptoUsers.map(m => 
      m.id === currentUser.id ? { ...m, feeConfigs: updatedFeeConfigs } : m
    ))
    
    setCurrentFeeConfig(updatedFeeConfigs.find(fc => fc.id === currentFeeConfig.id) || null)
  }

  const handleToggleSupplier = (supplierName: string, enabled: boolean) => {
    if (!currentInterface || !currentFeeConfig || !currentUser) return
    
    const updatedFeeConfigs = currentUser.feeConfigs.map(fc => {
      if (fc.id === currentFeeConfig.id) {
        const updatedInterfaces = fc.interfaces.map(iface => {
          if (iface.name === currentInterface.name) {
            const updatedSuppliers = iface.suppliers.map(s => 
              s.name === supplierName ? { ...s, enabled } : s
            )
            return { ...iface, suppliers: updatedSuppliers }
          }
          return iface
        })
        return { ...fc, interfaces: updatedInterfaces }
      }
      return fc
    })
    
    setCryptoUsers(cryptoUsers.map(m => 
      m.id === currentUser.id ? { ...m, feeConfigs: updatedFeeConfigs } : m
    ))
    
    const updatedInterface = updatedFeeConfigs
      .find(fc => fc.id === currentFeeConfig.id)
      ?.interfaces.find(iface => iface.name === currentInterface.name)
    
    if (updatedInterface) {
      setCurrentInterface(updatedInterface)
    }
    
    setCurrentUser({ ...currentUser, feeConfigs: updatedFeeConfigs })
    
    const updatedFeeConfig = updatedFeeConfigs.find(fc => fc.id === currentFeeConfig.id)
    if (updatedFeeConfig) {
      setCurrentFeeConfig(updatedFeeConfig)
    }
  }

  const handleAddFeeConfig = () => {
    if (currentUser) {
      const newFeeConfig: FeeConfig = {
        id: `FC${String(Date.now()).slice(-3)}`,
        currency: feeFormData.currency,
        channel: feeFormData.channel,
        channelType: feeFormData.channelType,
        interfaces: [],
        collectionFee: feeFormData.collectionFee,
        paymentFee: feeFormData.paymentFee,
        minCollectionFee: feeFormData.minCollectionFee,
        minPaymentFee: feeFormData.minPaymentFee,
        useSystemTieredFee: feeFormData.useSystemTieredFee
      }
      const updatedFeeConfigs = [...currentUser.feeConfigs, newFeeConfig]
      setCryptoUsers(cryptoUsers.map(m => 
        m.id === currentUser.id 
          ? { ...m, feeConfigs: updatedFeeConfigs }
          : m
      ))
      setCurrentUser({
        ...currentUser,
        feeConfigs: updatedFeeConfigs
      })
      if (!Array.from(new Set(currentUser.feeConfigs.map(fc => fc.currency))).includes(feeFormData.currency)) {
        setActiveCurrency(feeFormData.currency)
      }
      setIsAddFeeConfigDialogOpen(false)
      setFeeFormData({
        currency: "",
        channel: "",
        channelType: "代收",
        supplier: "",
        collectionFee: "",
        paymentFee: "",
        minCollectionFee: "",
        minPaymentFee: "",
        useSystemTieredFee: false
      })
    }
  }

  const handleUpdateFeeConfig = (configId: string, field: keyof FeeConfig, value: string) => {
    if (currentUser) {
      const updatedConfigs = currentUser.feeConfigs.map(fc =>
        fc.id === configId ? { ...fc, [field]: value } : fc
      )
      setCryptoUsers(cryptoUsers.map(m => 
        m.id === currentUser.id 
          ? { ...m, feeConfigs: updatedConfigs }
          : m
      ))
      setCurrentUser({
        ...currentUser,
        feeConfigs: updatedConfigs
      })
    }
  }

  const handleDeleteFeeConfig = (feeConfigId: string) => {
    if (currentUser) {
      const updatedFeeConfigs = currentUser.feeConfigs.filter(fc => fc.id !== feeConfigId)
      setCryptoUsers(cryptoUsers.map(m => 
        m.id === currentUser.id 
          ? { ...m, feeConfigs: updatedFeeConfigs }
          : m
      ))
      setCurrentUser({
        ...currentUser,
        feeConfigs: updatedFeeConfigs
      })
      const remainingCurrencies = Array.from(new Set(updatedFeeConfigs.map(fc => fc.currency)))
      if (!remainingCurrencies.includes(activeCurrency) && remainingCurrencies.length > 0) {
        setActiveCurrency(remainingCurrencies[0])
      }
    }
  }

  const handleToggleSystemTieredFee = (configId: string, checked: boolean) => {
    if (currentUser) {
      const updatedConfigs = currentUser.feeConfigs.map(fc =>
        fc.id === configId ? { ...fc, useSystemTieredFee: checked } : fc
      )
      setCryptoUsers(cryptoUsers.map(m => 
        m.id === currentUser.id 
          ? { ...m, feeConfigs: updatedConfigs }
          : m
      ))
      setCurrentUser({
        ...currentUser,
        feeConfigs: updatedConfigs
      })
    }
  }

  const updateUserState = (updatedUser: CryptoUser) => {
    setCryptoUsers(cryptoUsers.map(m => 
      m.id === updatedUser.id ? updatedUser : m
    ))
    setCurrentUser(updatedUser)
  }

  const handleApproveDomain = (userId: string, keyId: string) => {
    if (currentUser && currentUser.id === userId) {
      const updatedApiKeys = currentUser.apiKeys.map(k =>
        k.keyId === keyId ? { ...k, domainStatus: "approved" as const } : k
      )
      const hasPendingDomain = updatedApiKeys.some(k => k.domainStatus === "pending")
      const updatedUser = {
        ...currentUser,
        apiKeys: updatedApiKeys,
        hasPendingDomain
      }
      updateUserState(updatedUser)
    }
  }

  const handleRejectDomain = (userId: string, keyId: string) => {
    const confirmed = window.confirm("确定要拒绝并删除此API密钥吗？此操作不可恢复。")
    if (!confirmed) return

    if (currentUser && currentUser.id === userId) {
      const updatedApiKeys = currentUser.apiKeys.filter(k => k.keyId !== keyId)
      const hasPendingDomain = updatedApiKeys.some(k => k.domainStatus === "pending")
      const updatedUser = {
        ...currentUser,
        apiKeys: updatedApiKeys,
        hasPendingDomain
      }
      updateUserState(updatedUser)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Crypto用户列表</h2>

      <Tabs value={userFilter} onValueChange={(value) => setUserFilter(value as "normal" | "hasApi" | "pending" | "all")}>
        <TabsList>
          <TabsTrigger value="normal">
            普通用户
            {counts.normal > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                {counts.normal}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="hasApi">
            API商户
            {counts.hasApi > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                {counts.hasApi}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending">
            正在申请API
            {counts.pending > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                {counts.pending}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">
            全部用户
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              {counts.all}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-3">
        <Button 
          variant={sortBy === "profit" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy(sortBy === "profit" ? "none" : "profit")}
        >
          利润贡献排名
        </Button>
        <Button 
          variant={sortBy === "volume" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy(sortBy === "volume" ? "none" : "volume")}
        >
          交易量排名
        </Button>
        <div className="flex-1">
          <SearchControls
            placeholder="搜索用户名称、邮箱、用户ID或UserID..."
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  用户信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  联系方式
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  最近登录
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  账户余额
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  申请地址数量
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  利润贡献
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  密钥
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      用户ID: {user.id}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      UserID: {user.userId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-gray-900 dark:text-gray-300">{user.email}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{user.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="text-gray-900 dark:text-white text-xs">
                      {user.lastLoginLocation || '-'}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {user.lastLoginTime || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openBalanceDialog(user)}
                      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <div className="text-gray-900 dark:text-white font-medium">
                        可用: {user.primaryCurrency} {user.balance.toLocaleString()}
                      </div>
                      <div className="text-orange-600 dark:text-orange-400 text-xs mt-1 font-medium">
                        冻结: {user.primaryCurrency} {user.frozenBalance.toLocaleString()}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openAddressStatsDialog(user)}
                      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <div className="text-blue-600 dark:text-blue-400 font-medium">
                        总地址: {user.addressStats.total}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        {user.addressStats.networks.slice(0, 2).map(n => `${n.network}: ${n.count}`).join(', ')}
                      </div>
                      <div className="text-green-600 dark:text-green-400 text-xs mt-1 font-medium">
                        月费: {user.primaryCurrency} {user.addressStats.networks.reduce((sum, n) => sum + n.monthlyFee, 0).toLocaleString()}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openProfitContributionDialog(user)}
                      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <div className="text-green-600 dark:text-green-400 font-medium">
                        地址月费: {user.primaryCurrency} {user.profitContribution.totalAddressMonthlyFee.toLocaleString()}
                      </div>
                      <div className="text-emerald-600 dark:text-emerald-400 text-xs mt-1 font-medium">
                        提币手续费: {user.primaryCurrency} {user.profitContribution.totalWithdrawFee.toLocaleString()}
                      </div>
                      <div className="text-teal-600 dark:text-teal-400 text-xs mt-1 font-medium">
                        利润: {user.primaryCurrency} {user.profitContribution.totalWithdrawProfit.toLocaleString()}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {user.apiKeys.length === 0 && !user.hasPendingDomain ? (
                      <span className="text-gray-400 dark:text-gray-500 text-sm">无API</span>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openApiKeysDialog(user)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          <Key className="w-4 h-4 mr-1" />
                          查看密钥 ({user.apiKeys.length})
                        </Button>
                        {user.hasPendingDomain && (
                          <div className="mt-1">
                            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs font-medium">
                              新域名待审核
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={user.status === "active"}
                        onCheckedChange={(checked) => handleUserStatusToggle(user, checked)}
                        disabled={user.status === "disabled"}
                      />
                      <span className={`text-sm font-medium BTC {
                        user.status === "active"
                          ? "text-green-600 dark:text-green-400"
                          : user.status === "frozen"
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {user.status === "active" ? "正常" : 
                         user.status === "frozen" ? "冻结" : "禁用"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFeeConfigDialog(user)}
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
                        title="用户通道配置"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFreezeDialog(user)}
                        className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400"
                        title={user.status === "frozen" ? "解冻资金" : "冻结资金"}
                      >
                        {user.status === "frozen" ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}

        {filteredUsers.length > 0 && (
          <DataTotal total={filteredUsers.length} />
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑用户</DialogTitle>
            <DialogDescription>修改用户信息</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">用户名称</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">联系邮箱</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">联系电话</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">状态</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "frozen" | "disabled") => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">正常</SelectItem>
                  <SelectItem value="frozen">冻结</SelectItem>
                  <SelectItem value="disabled">禁用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEdit} className="bg-custom-green hover:bg-custom-green/90">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={isFeeConfigDialogOpen} onOpenChange={setIsFeeConfigDialogOpen}>
        <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>用户通道配置</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <Tabs value={activeCurrency} onValueChange={setActiveCurrency}>
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(BTC {ALL_CRYPTOS.length}, 1fr)` }}>
                {ALL_CRYPTOS.map(currency => (
                  <TabsTrigger key={currency} value={currency}>
                    {currency}
                  </TabsTrigger>
                ))}
              </TabsList>
              {ALL_CRYPTOS.map(currency => (
                <TabsContent key={currency} value={currency} className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                            通道类型
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                            支付通道
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                            手续费率
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                            单笔最低费用
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                            系统梯度费率
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                            接口配置
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {getAllPaymentMethods(currentUser).filter(fc => fc.currency === currency).sort((a, b) => {
                          // 代收在前，代付在后
                          if (a.channelType === "代收" && b.channelType === "代付") return -1;
                          if (a.channelType === "代付" && b.channelType === "代收") return 1;
                          return 0;
                        }).map((config) => (
                            <tr key={config.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                                <span className={`px-2 py-1 rounded text-xs BTC {
                                  config.channelType === "代收" 
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                }`}>
                                  {config.channelType}
                                </span>
                              </td>
                              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 font-medium">
                                {config.channel}
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={config.channelType === "代收" ? config.collectionFee : config.paymentFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, config.channelType === "代收" ? 'collectionFee' : 'paymentFee', e.target.value)}
                                  className="h-8 text-sm w-24 text-orange-600 dark:text-orange-400 font-semibold"
                                  placeholder="0.3%"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={config.channelType === "代收" ? config.minCollectionFee : config.minPaymentFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, config.channelType === "代收" ? 'minCollectionFee' : 'minPaymentFee', e.target.value)}
                                  className="h-8 text-sm w-28 text-orange-600 dark:text-orange-400"
                                  placeholder="USDT 0.50"
                                />
                              </td>
                              <td className="px-3 py-3 whitespace-nowrap text-sm">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={config.useSystemTieredFee}
                                    onCheckedChange={(checked) => handleToggleSystemTieredFee(config.id, checked)}
                                  />
                                  <span className={`text-xs BTC {config.useSystemTieredFee ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}>
                                    {config.useSystemTieredFee ? "已启用" : "未启用"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-3 whitespace-nowrap text-sm">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openInterfaceManageDialog(config)}
                                  className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
                                  title="接口配置"
                                >
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </td>
                              <td className="px-3 py-3 whitespace-nowrap text-sm">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                                  onClick={() => handleDeleteFeeConfig(config.id)}
                                  title="删除"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                ))}
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isAddFeeConfigDialogOpen} onOpenChange={setIsAddFeeConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加支付方式</DialogTitle>
            <DialogDescription>
              为用户 {currentUser?.name} 添加新的支付方式配置（币种、通道）。添加后可通过"管理供应商"配置具体供应商。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-currency">币种 *</Label>
                <Select value={feeFormData.currency} onValueChange={(value) => setFeeFormData({...feeFormData, currency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">CNY</SelectItem>
                    <SelectItem value="BTC">USD</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="ETH">EUR</SelectItem>
                    <SelectItem value="USDC">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-channel">支付通道 *</Label>
                <Select value={feeFormData.channel} onValueChange={(value) => setFeeFormData({...feeFormData, channel: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TRC20">TRC20</SelectItem>
                    <SelectItem value="ERC20">ERC20</SelectItem>
                    <SelectItem value="BSC">BSC</SelectItem>
                    <SelectItem value="Polygon">Polygon</SelectItem>
                    <SelectItem value="Solana">Solana</SelectItem>
                    <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="TRC20">TRC20</SelectItem>
                    <SelectItem value="ERC20">ERC20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-channel-type">通道类型 *</Label>
                <Select value={feeFormData.channelType} onValueChange={(value: "代收" | "代付") => setFeeFormData({...feeFormData, channelType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="代收">代收</SelectItem>
                    <SelectItem value="代付">代付</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-collection-fee">代收费率 *</Label>
                <Input
                  id="add-collection-fee"
                  placeholder="例如：0.5%"
                  value={feeFormData.collectionFee}
                  onChange={(e) => setFeeFormData({...feeFormData, collectionFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">百分比费率</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-min-collection-fee">最低代收费 *</Label>
                <Input
                  id="add-min-collection-fee"
                  placeholder="例如：USDT 1.00"
                  value={feeFormData.minCollectionFee}
                  onChange={(e) => setFeeFormData({...feeFormData, minCollectionFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">单笔最低手续费</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-payment-fee">代付费率 *</Label>
                <Input
                  id="add-payment-fee"
                  placeholder="例如：0.3%"
                  value={feeFormData.paymentFee}
                  onChange={(e) => setFeeFormData({...feeFormData, paymentFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">百分比费率</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-min-payment-fee">最低代付费 *</Label>
                <Input
                  id="add-min-payment-fee"
                  placeholder="例如：USDT 0.50"
                  value={feeFormData.minPaymentFee}
                  onChange={(e) => setFeeFormData({...feeFormData, minPaymentFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">单笔最低手续费</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFeeConfigDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddFeeConfig} className="bg-custom-green hover:bg-custom-green/90">
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreezeFundsDialogOpen} onOpenChange={setIsFreezeFundsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>冻结资金 - {currentUser?.name}</DialogTitle>
            <DialogDescription>
              可用余额: {currentUser?.primaryCurrency} {currentUser?.balance.toLocaleString()} | 冻结余额: {currentUser?.primaryCurrency} {currentUser?.frozenBalance.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="freeze-amount">冻结金额</Label>
              <Input
                id="freeze-amount"
                type="number"
                placeholder="请输入冻结金额"
                value={freezeAmount}
                onChange={(e) => setFreezeAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFreezeFundsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleFreezeFunds} className="bg-orange-600 hover:bg-orange-700">
              冻结
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreezeDialogOpen} onOpenChange={setIsFreezeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentUser?.status === "frozen" ? "解冻" : "冻结"}资金
            </DialogTitle>
            <DialogDescription>
              用户名称: {currentUser?.name} | 当前状态: {currentUser?.status === "frozen" ? "已冻结" : "正常"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="freeze-currency">币种 *</Label>
              <Select 
                value={freezeFormData.currency} 
                onValueChange={(value) => setFreezeFormData({...freezeFormData, currency: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">CNY (人民币)</SelectItem>
                  <SelectItem value="BTC">USD (美元)</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ETH">EUR (欧元)</SelectItem>
                  <SelectItem value="USDC">GBP (英镑)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="freeze-user-amount">冻结金额 *</Label>
              <Input
                id="freeze-user-amount"
                type="number"
                placeholder="请输入冻结金额"
                value={freezeFormData.amount}
                onChange={(e) => setFreezeFormData({...freezeFormData, amount: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFreezeDialogOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={handleToggleFreeze}
              className={currentUser?.status === "frozen" 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-yellow-600 hover:bg-yellow-700"
              }
              disabled={!freezeFormData.currency || !freezeFormData.amount}
            >
              {currentUser?.status === "frozen" ? "解冻" : "冻结"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isApiKeysDialogOpen} onOpenChange={setIsApiKeysDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>密钥管理 - {currentUser?.name}</DialogTitle>
            <DialogDescription>
              用户ID: {currentUser?.id} | UserID: {currentUser?.userId} | 共 {currentUser?.apiKeys.length} 个密钥
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {currentUser?.apiKeys && currentUser.apiKeys.length > 0 ? (
              <div className="space-y-4">
                {currentUser.apiKeys.map((apiKey) => (
                  <div 
                    key={apiKey.keyId} 
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <Label className="text-xs text-gray-500 dark:text-gray-400">密钥ID</Label>
                            <div className="mt-1 font-mono text-sm text-gray-900 dark:text-white">
                              {apiKey.keyId}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium BTC {
                            apiKey.domainStatus === "approved"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              : "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                          }`}>
                            {apiKey.domainStatus === "approved" ? "已审核" : "待审核"}
                          </span>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">创建时间</Label>
                          <div className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                            {apiKey.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">API密钥</Label>
                          <div className="mt-1 font-mono text-xs bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white break-all">
                            {apiKey.key}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">回调主域名</Label>
                          <div className="mt-1 text-sm bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                            <a 
                              href={apiKey.callbackDomain} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                            >
                              {apiKey.callbackDomain}
                            </a>
                          </div>
                        </div>
                      </div>
                      {apiKey.domainStatus === "pending" && (
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                          <Button
                            size="sm"
                            onClick={() => handleApproveDomain(currentUser.id, apiKey.keyId)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            审核通过
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectDomain(currentUser.id, apiKey.keyId)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-300 dark:border-red-700"
                          >
                            <X className="w-4 h-4 mr-1" />
                            拒绝
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                该用户暂无密钥
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApiKeysDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBalanceDialogOpen} onOpenChange={setIsBalanceDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[75vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>账户余额详情</DialogTitle>
            <DialogDescription>
              用户 {currentUser?.name} 的各币种余额信息
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentUser && currentUser.currencyBalances && currentUser.currencyBalances.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">币种</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">可用余额</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-orange-600 dark:text-orange-400">冻结金额</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser.currencyBalances.map((cb, index) => (
                      <tr 
                        key={cb.currency}
                        className={`border-b border-gray-100 dark:border-gray-800 BTC {
                          index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {cb.currency === "USDT" && "USDT "}
                              {cb.currency === "BTC" && "BTC "}
                              {cb.currency === "ETH" && "€"}
                              {cb.currency === "USDC" && "£"}
                              {cb.currency === "USDT" && "₮"}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">{cb.currency}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {cb.balance.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-orange-600 dark:text-orange-400">
                            {cb.frozenBalance.toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                暂无余额数据
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBalanceDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddressStatsDialogOpen} onOpenChange={setIsAddressStatsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[75vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>申请地址数量详情</DialogTitle>
            <DialogDescription>
              用户 {currentUser?.name} 的地址统计信息
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">总地址数</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentUser?.addressStats.total}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">各网络地址分布及月费</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold">网络</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400">地址数量</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">月费 ({currentUser?.primaryCurrency})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser?.addressStats.networks.map((net, idx) => (
                      <tr key={net.network} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'}>
                        <td className="py-3 px-4 font-medium">{net.network}</td>
                        <td className="py-3 px-4 text-right text-blue-600 dark:text-blue-400 font-semibold">{net.count}</td>
                        <td className="py-3 px-4 text-right text-green-600 dark:text-green-400 font-semibold">{net.monthlyFee.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddressStatsDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isProfitContributionDialogOpen} onOpenChange={setIsProfitContributionDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[75vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>利润贡献详情</DialogTitle>
            <DialogDescription>
              用户 {currentUser?.name} 的利润贡献明细
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">地址月费</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{currentUser?.profitContribution.totalAddressMonthlyFee.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">提币手续费</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{currentUser?.profitContribution.totalWithdrawFee.toLocaleString()}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">成本</p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{currentUser?.profitContribution.totalWithdrawCost.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">利润</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{currentUser?.profitContribution.totalWithdrawProfit.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">各网络利润详情</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold">网络</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">地址月费</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400">提币手续费</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-orange-600 dark:text-orange-400">成本</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-purple-600 dark:text-purple-400">利润</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser?.profitContribution.networks.map((net, idx) => (
                      <tr key={net.network} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'}>
                        <td className="py-3 px-4 font-medium">{net.network}</td>
                        <td className="py-3 px-4 text-right text-green-600 dark:text-green-400">{net.addressMonthlyFee.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-blue-600 dark:text-blue-400">{net.withdrawFee.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-orange-600 dark:text-orange-400">{net.withdrawCost.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-purple-600 dark:text-purple-400 font-semibold">{net.withdrawProfit.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProfitContributionDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除用户</DialogTitle>
            <DialogDescription>
              确定要删除用户 "{currentUser?.name}" 吗？此操作不可恢复。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={isInterfaceManageDialogOpen} onOpenChange={setIsInterfaceManageDialogOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>接口配置</SheetTitle>
            <SheetDescription>
              支付通道: {currentFeeConfig?.channel} | 币种: {currentFeeConfig?.currency}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                💡 这里只展示支持该支付通道的接口
              </p>
            </div>

            {currentFeeConfig?.interfaces && currentFeeConfig.interfaces.length > 0 ? (
              <div className="space-y-3">
                {currentFeeConfig.interfaces.map((paymentInterface) => {
                  const allSuppliersEnabled = paymentInterface.suppliers.every(s => s.enabled)
                  const someSuppliersEnabled = paymentInterface.suppliers.some(s => s.enabled)
                  const supplierStatus = allSuppliersEnabled ? "全部供应商" : (someSuppliersEnabled ? "指定供应商" : "未指定")
                  
                  return (
                    <div key={paymentInterface.name} className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold BTC {
                            paymentInterface.enabled 
                              ? "bg-gradient-to-br from-purple-400 to-purple-600" 
                              : "bg-gray-400 dark:bg-gray-600"
                          }`}>
                            {paymentInterface.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {paymentInterface.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openSupplierManageDialog(paymentInterface)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            title="指定供应商"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Switch
                            checked={paymentInterface.enabled}
                            onCheckedChange={(checked) => handleToggleInterface(paymentInterface.name, checked)}
                          />
                        </div>
                      </div>
                      <div className="ml-[52px] space-y-1 pr-24">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {paymentInterface.enabled ? "已启用" : "已禁用"}
                        </p>
                        <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                          成本：{paymentInterface.collectionFeeRate}+{paymentInterface.collectionFeeFixed}   {paymentInterface.paymentFeeRate}+{paymentInterface.paymentFeeFixed}
                        </p>
                      </div>
                      <div className="absolute bottom-3 right-4">
                        <p className={`text-xs font-medium BTC {
                          allSuppliersEnabled 
                            ? "text-green-600 dark:text-green-400" 
                            : someSuppliersEnabled 
                              ? "text-blue-600 dark:text-blue-400" 
                              : "text-gray-400 dark:text-gray-500"
                        }`}>
                          {supplierStatus}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="mb-2">暂无支持该支付通道的接口</p>
                <p className="text-sm">请联系系统管理员配置接口</p>
              </div>
            )}
          </div>

          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsInterfaceManageDialogOpen(false)} className="w-full">
              完成
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isSupplierManageDialogOpen} onOpenChange={setIsSupplierManageDialogOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm overflow-y-auto">
          <SheetHeader>
            <SheetTitle>指定供应商</SheetTitle>
            <SheetDescription>
              接口: {currentInterface?.name}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                💡 这里罗列支持该接口的所有供应商
              </p>
            </div>

            {currentInterface?.suppliers && currentInterface.suppliers.length > 0 ? (
              <div className="space-y-3">
                {currentInterface.suppliers.map((supplier) => (
                  <div key={supplier.name} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold BTC {
                        supplier.enabled 
                          ? "bg-gradient-to-br from-green-400 to-green-600" 
                          : "bg-gray-400 dark:bg-gray-600"
                      }`}>
                        {supplier.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {supplier.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {supplier.enabled ? "已启用" : "已禁用"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={supplier.enabled}
                      onCheckedChange={(checked) => handleToggleSupplier(supplier.name, checked)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="mb-2">暂无支持该接口的供应商</p>
                <p className="text-sm">请联系系统管理员配置供应商</p>
              </div>
            )}
          </div>

          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsSupplierManageDialogOpen(false)} className="w-full">
              完成
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
