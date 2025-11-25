"use client"

import React, { useState } from "react"
import { Plus, Edit, Trash2, Lock, Unlock, Settings, Key, Eye, Check, X, CheckCircle, XCircle } from "lucide-react"
import { DataTotal } from "@/components/data-total"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { UserDetailDrawer, AdminUserProfile } from "@/components/admin/user-detail-drawer"
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
  paymentBalance: number
  frozenBalance: number
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

interface KYCAddress {
  label: string
  country: string
  province: string
  city: string
  district?: string
  street: string
  postalCode?: string
  fullAddress: string
}

interface Merchant {
  id: string
  name: string
  userId: string
  bxbUserId: string
  email: string
  phone: string
  isKYC: boolean
  kycRealName?: string
  kycIdNumber?: string
  kycCountry?: string
  kycIdType?: string
  kycVerifiedAt?: string
  kycBirthday?: string
  kycGender?: string
  kycNationality?: string
  kycAddresses?: KYCAddress[]
  registeredAt: string
  registeredLocation?: string
  lastLoginLocation?: string
  lastLoginTime?: string
  apiKeys: ApiKey[]
  balance: number
  paymentBalance: number
  frozenBalance: number
  currencyBalances: CurrencyBalance[]
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
}

const mockMerchants: Merchant[] = [
  {
    id: "M003",
    name: "云端收银",
    userId: "U100003",
    bxbUserId: "BXB003",
    email: "yunduan@example.com",
    phone: "+86 138 0000 0003",
    isKYC: true,
    kycRealName: "李云端",
    kycIdNumber: "110101199001010003",
    kycCountry: "中国",
    kycIdType: "身份证",
    kycVerifiedAt: "2024-01-20 14:30:00",
    kycBirthday: "1990-01-01",
    kycGender: "男",
    kycNationality: "中国",
    kycAddresses: [
      {
        label: "居住地址",
        country: "中国",
        province: "北京市",
        city: "北京市",
        district: "朝阳区",
        street: "建国路88号SOHO现代城A座1208室",
        postalCode: "100022",
        fullAddress: "中国北京市朝阳区建国路88号SOHO现代城A座1208室"
      },
      {
        label: "公司地址",
        country: "中国",
        province: "上海市",
        city: "上海市",
        district: "浦东新区",
        street: "陆家嘴环路1000号恒生银行大厦25楼",
        postalCode: "200120",
        fullAddress: "中国上海市浦东新区陆家嘴环路1000号恒生银行大厦25楼"
      }
    ],
    registeredAt: "2024-01-15 09:15:00",
    registeredLocation: "北京市朝阳区",
    lastLoginLocation: "上海市浦东新区",
    lastLoginTime: "2024-11-15 10:30:00",
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
    balance: 45200.00,
    paymentBalance: 20000.00,
    frozenBalance: 10000,
    currencyBalances: [
      { currency: "CNY", balance: 320000, paymentBalance: 140000, frozenBalance: 25000 },
      { currency: "USD", balance: 45200.00, paymentBalance: 20000.00, frozenBalance: 10000 },
      { currency: "USDT", balance: 58000, paymentBalance: 22000, frozenBalance: 8000 },
      { currency: "EUR", balance: 35000, paymentBalance: 15000, frozenBalance: 5000 },
      { currency: "GBP", balance: 28000, paymentBalance: 12000, frozenBalance: 3000 }
    ],
    dailyProfit: 1250.50,
    monthlyProfit: 28500.00,
    totalProfit: 156000.00,
    currencyProfits: [
      { currency: "CNY", collectionProfit: 8500, paymentProfit: 3200, exchangeRateProfit: 1500, totalProfit: 13200 },
      { currency: "USD", collectionProfit: 2800, paymentProfit: 1200, exchangeRateProfit: 800, totalProfit: 4800 },
      { currency: "USDT", collectionProfit: 35000, paymentProfit: 18000, exchangeRateProfit: 12000, totalProfit: 65000 },
      { currency: "EUR", collectionProfit: 5200, paymentProfit: 2100, exchangeRateProfit: 900, totalProfit: 8200 },
      { currency: "GBP", collectionProfit: 4500, paymentProfit: 1800, exchangeRateProfit: 700, totalProfit: 7000 }
    ],
    profitDataByTimeRange: {
      today: [
        { currency: "CNY", collectionProfit: 850, paymentProfit: 320, exchangeRateProfit: 150, totalProfit: 1320 },
        { currency: "USD", collectionProfit: 280, paymentProfit: 120, exchangeRateProfit: 80, totalProfit: 480 },
        { currency: "USDT", collectionProfit: 3500, paymentProfit: 1800, exchangeRateProfit: 1200, totalProfit: 6500 },
        { currency: "EUR", collectionProfit: 520, paymentProfit: 210, exchangeRateProfit: 90, totalProfit: 820 },
        { currency: "GBP", collectionProfit: 450, paymentProfit: 180, exchangeRateProfit: 70, totalProfit: 700 }
      ],
      yesterday: [
        { currency: "CNY", collectionProfit: 900, paymentProfit: 340, exchangeRateProfit: 160, totalProfit: 1400 },
        { currency: "USD", collectionProfit: 300, paymentProfit: 130, exchangeRateProfit: 85, totalProfit: 515 },
        { currency: "USDT", collectionProfit: 3700, paymentProfit: 1900, exchangeRateProfit: 1250, totalProfit: 6850 },
        { currency: "EUR", collectionProfit: 550, paymentProfit: 220, exchangeRateProfit: 95, totalProfit: 865 },
        { currency: "GBP", collectionProfit: 480, paymentProfit: 190, exchangeRateProfit: 75, totalProfit: 745 }
      ],
      thisMonth: [
        { currency: "CNY", collectionProfit: 2850, paymentProfit: 1070, exchangeRateProfit: 500, totalProfit: 4420 },
        { currency: "USD", collectionProfit: 930, paymentProfit: 400, exchangeRateProfit: 270, totalProfit: 1600 },
        { currency: "USDT", collectionProfit: 11700, paymentProfit: 6000, exchangeRateProfit: 4000, totalProfit: 21700 },
        { currency: "EUR", collectionProfit: 1730, paymentProfit: 700, exchangeRateProfit: 300, totalProfit: 2730 },
        { currency: "GBP", collectionProfit: 1500, paymentProfit: 600, exchangeRateProfit: 230, totalProfit: 2330 }
      ],
      total: [
        { currency: "CNY", collectionProfit: 8500, paymentProfit: 3200, exchangeRateProfit: 1500, totalProfit: 13200 },
        { currency: "USD", collectionProfit: 2800, paymentProfit: 1200, exchangeRateProfit: 800, totalProfit: 4800 },
        { currency: "USDT", collectionProfit: 35000, paymentProfit: 18000, exchangeRateProfit: 12000, totalProfit: 65000 },
        { currency: "EUR", collectionProfit: 5200, paymentProfit: 2100, exchangeRateProfit: 900, totalProfit: 8200 },
        { currency: "GBP", collectionProfit: 4500, paymentProfit: 1800, exchangeRateProfit: 700, totalProfit: 7000 }
      ]
    },
    dailyVolume: 125000,
    monthlyVolume: 2850000,
    totalVolume: 15600000,
    currencyVolumes: [
      { currency: "CNY", collectionVolume: 8500000, paymentVolume: 3200000, totalVolume: 11700000 },
      { currency: "USD", collectionVolume: 850000, paymentVolume: 320000, totalVolume: 1170000 },
      { currency: "USDT", collectionVolume: 1800000, paymentVolume: 900000, totalVolume: 2700000 },
      { currency: "EUR", collectionVolume: 180000, paymentVolume: 90000, totalVolume: 270000 },
      { currency: "GBP", collectionVolume: 120000, paymentVolume: 50000, totalVolume: 170000 }
    ],
    totalOrders: 5432,
    feeConfigs: [
      { 
        id: "FC008", currency: "CNY", channel: "支付宝", channelType: "代收",
        interfaces: [
          { name: "Bitzpay", enabled: true, collectionFeeRate: "1%", collectionFeeFixed: "1", paymentFeeRate: "2%", paymentFeeFixed: "0", suppliers: [{ name: "云端支付", enabled: true }, { name: "极速支付", enabled: false }] }
        ], 
        collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.50", useSystemTieredFee: false 
      },
      { 
        id: "FC009", currency: "CNY", channel: "微信支付", channelType: "代收",
        interfaces: [
          { name: "BePayOTC", enabled: true, collectionFeeRate: "0.8%", collectionFeeFixed: "0.5", paymentFeeRate: "1.5%", paymentFeeFixed: "0", suppliers: [{ name: "星辰支付", enabled: true }] }, 
          { name: "CFpay", enabled: false, collectionFeeRate: "1.2%", collectionFeeFixed: "2", paymentFeeRate: "1.8%", paymentFeeFixed: "1", suppliers: [{ name: "快付通", enabled: true }, { name: "支付宝", enabled: false }] }
        ], 
        collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.50", useSystemTieredFee: false 
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
    createdAt: "2024-01-15 09:15:00"
  },
  {
    id: "M004",
    name: "星际支付",
    userId: "U100004",
    bxbUserId: "BXB004",
    email: "xingji@example.com",
    phone: "+86 138 0000 0004",
    isKYC: true,
    kycRealName: "王星际",
    kycIdNumber: "310101198505050004",
    kycCountry: "中国",
    kycIdType: "身份证",
    kycVerifiedAt: "2024-01-10 10:00:00",
    kycBirthday: "1985-05-05",
    kycGender: "男",
    kycNationality: "中国",
    kycAddresses: [
      {
        label: "居住地址",
        country: "中国",
        province: "上海市",
        city: "上海市",
        district: "浦东新区",
        street: "世纪大道100号上海环球金融中心68楼",
        postalCode: "200120",
        fullAddress: "中国上海市浦东新区世纪大道100号上海环球金融中心68楼"
      }
    ],
    registeredAt: "2024-01-08 16:45:00",
    registeredLocation: "上海市浦东新区",
    lastLoginLocation: "深圳市南山区",
    lastLoginTime: "2024-11-14 18:20:00",
    apiKeys: [
      {
        keyId: "KEY007",
        key: "sk_live_7h6g5f4d3s2a1p0o9i8u7y6t5r4e3w2q",
        callbackDomain: "https://api.xingji.com",
        domainStatus: "approved",
        createdAt: "2024-01-08 16:45:00"
      }
    ],
    balance: 210000.75,
    paymentBalance: 80000.00,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "CNY", balance: 1250000, paymentBalance: 580000, frozenBalance: 0 },
      { currency: "USD", balance: 210000.75, paymentBalance: 80000.00, frozenBalance: 0 },
      { currency: "USDT", balance: 165000, paymentBalance: 70000, frozenBalance: 0 },
      { currency: "EUR", balance: 120000, paymentBalance: 55000, frozenBalance: 0 },
      { currency: "GBP", balance: 95000, paymentBalance: 42000, frozenBalance: 0 }
    ],
    dailyProfit: 5800.25,
    monthlyProfit: 158000.00,
    totalProfit: 980000.00,
    currencyProfits: [
      { currency: "CNY", collectionProfit: 85000, paymentProfit: 42000, exchangeRateProfit: 28000, totalProfit: 155000 },
      { currency: "USD", collectionProfit: 125000, paymentProfit: 68000, exchangeRateProfit: 45000, totalProfit: 238000 },
      { currency: "USDT", collectionProfit: 220000, paymentProfit: 115000, exchangeRateProfit: 82000, totalProfit: 417000 },
      { currency: "EUR", collectionProfit: 68000, paymentProfit: 35000, exchangeRateProfit: 22000, totalProfit: 125000 },
      { currency: "GBP", collectionProfit: 28000, paymentProfit: 12000, exchangeRateProfit: 5000, totalProfit: 45000 }
    ],
    profitDataByTimeRange: {
      today: [
        { currency: "CNY", collectionProfit: 8500, paymentProfit: 4200, exchangeRateProfit: 2800, totalProfit: 15500 },
        { currency: "USD", collectionProfit: 12500, paymentProfit: 6800, exchangeRateProfit: 4500, totalProfit: 23800 },
        { currency: "USDT", collectionProfit: 22000, paymentProfit: 11500, exchangeRateProfit: 8200, totalProfit: 41700 },
        { currency: "EUR", collectionProfit: 6800, paymentProfit: 3500, exchangeRateProfit: 2200, totalProfit: 12500 },
        { currency: "GBP", collectionProfit: 2800, paymentProfit: 1200, exchangeRateProfit: 500, totalProfit: 4500 }
      ],
      yesterday: [
        { currency: "CNY", collectionProfit: 9000, paymentProfit: 4400, exchangeRateProfit: 2900, totalProfit: 16300 },
        { currency: "USD", collectionProfit: 13200, paymentProfit: 7100, exchangeRateProfit: 4700, totalProfit: 25000 },
        { currency: "USDT", collectionProfit: 23000, paymentProfit: 12000, exchangeRateProfit: 8500, totalProfit: 43500 },
        { currency: "EUR", collectionProfit: 7100, paymentProfit: 3700, exchangeRateProfit: 2300, totalProfit: 13100 },
        { currency: "GBP", collectionProfit: 2900, paymentProfit: 1300, exchangeRateProfit: 530, totalProfit: 4730 }
      ],
      thisMonth: [
        { currency: "CNY", collectionProfit: 28500, paymentProfit: 14000, exchangeRateProfit: 9300, totalProfit: 51800 },
        { currency: "USD", collectionProfit: 41700, paymentProfit: 22700, exchangeRateProfit: 15000, totalProfit: 79400 },
        { currency: "USDT", collectionProfit: 73300, paymentProfit: 38300, exchangeRateProfit: 27300, totalProfit: 138900 },
        { currency: "EUR", collectionProfit: 22700, paymentProfit: 11700, exchangeRateProfit: 7300, totalProfit: 41700 },
        { currency: "GBP", collectionProfit: 9300, paymentProfit: 4000, exchangeRateProfit: 1670, totalProfit: 15000 }
      ],
      total: [
        { currency: "CNY", collectionProfit: 85000, paymentProfit: 42000, exchangeRateProfit: 28000, totalProfit: 155000 },
        { currency: "USD", collectionProfit: 125000, paymentProfit: 68000, exchangeRateProfit: 45000, totalProfit: 238000 },
        { currency: "USDT", collectionProfit: 220000, paymentProfit: 115000, exchangeRateProfit: 82000, totalProfit: 417000 },
        { currency: "EUR", collectionProfit: 68000, paymentProfit: 35000, exchangeRateProfit: 22000, totalProfit: 125000 },
        { currency: "GBP", collectionProfit: 28000, paymentProfit: 12000, exchangeRateProfit: 5000, totalProfit: 45000 }
      ]
    },
    dailyVolume: 580000,
    monthlyVolume: 15800000,
    totalVolume: 98000000,
    currencyVolumes: [
      { currency: "CNY", collectionVolume: 55000000, paymentVolume: 25000000, totalVolume: 80000000 },
      { currency: "USD", collectionVolume: 8500000, paymentVolume: 3800000, totalVolume: 12300000 },
      { currency: "USDT", collectionVolume: 3500000, paymentVolume: 1800000, totalVolume: 5300000 },
      { currency: "EUR", collectionVolume: 280000, paymentVolume: 120000, totalVolume: 400000 },
      { currency: "GBP", collectionVolume: 180000, paymentVolume: 80000, totalVolume: 260000 }
    ],
    totalOrders: 23456,
    feeConfigs: [
      { 
        id: "FC012", currency: "CNY", channel: "支付宝", channelType: "代收",
        interfaces: [
          { name: "CFpay", enabled: true, collectionFeeRate: "0.9%", collectionFeeFixed: "1.5", paymentFeeRate: "1.2%", paymentFeeFixed: "0.8", suppliers: [{ name: "云支付", enabled: true }, { name: "付费通", enabled: true }] }, 
          { name: "PayGate", enabled: true, collectionFeeRate: "1.1%", collectionFeeFixed: "2", paymentFeeRate: "1.5%", paymentFeeFixed: "1", suppliers: [{ name: "支付网关", enabled: true }] }, 
          { name: "EasyPay", enabled: false, collectionFeeRate: "0.7%", collectionFeeFixed: "1", paymentFeeRate: "1%", paymentFeeFixed: "0.5", suppliers: [{ name: "简易支付", enabled: false }] }
        ], 
        collectionFee: "0.4%", paymentFee: "0.2%", minCollectionFee: "¥0.80", minPaymentFee: "¥0.40", useSystemTieredFee: true 
      },
      { 
        id: "FC013", currency: "CNY", channel: "微信支付", channelType: "代收",
        interfaces: [
          { name: "Bitzpay", enabled: true, collectionFeeRate: "1%", collectionFeeFixed: "1", paymentFeeRate: "1.3%", paymentFeeFixed: "0", suppliers: [{ name: "微信通道", enabled: true }] }, 
          { name: "BePayOTC", enabled: true, collectionFeeRate: "0.8%", collectionFeeFixed: "0.5", paymentFeeRate: "1.2%", paymentFeeFixed: "0", suppliers: [{ name: "场外支付", enabled: true }] }
        ], 
        collectionFee: "0.4%", paymentFee: "0.2%", minCollectionFee: "¥0.80", minPaymentFee: "¥0.40", useSystemTieredFee: false 
      },
      { 
        id: "FC014", currency: "CNY", channel: "银行卡", channelType: "代付",
        interfaces: [
          { name: "CFpay", enabled: true, collectionFeeRate: "1.2%", collectionFeeFixed: "2", paymentFeeRate: "1.5%", paymentFeeFixed: "1.5", suppliers: [{ name: "银行直连", enabled: true }, { name: "聚合支付", enabled: true }] }
        ], 
        collectionFee: "0.45%", paymentFee: "0.25%", minCollectionFee: "¥0.90", minPaymentFee: "¥0.50", useSystemTieredFee: true 
      },
      { 
        id: "FC015", currency: "USD", channel: "Stripe", channelType: "代收",
        interfaces: [
          { name: "PayGate", enabled: true, collectionFeeRate: "2.5%", collectionFeeFixed: "0.3", paymentFeeRate: "2.8%", paymentFeeFixed: "0.25", suppliers: [{ name: "国际支付", enabled: true }] }
        ], 
        collectionFee: "2.8%", paymentFee: "2.4%", minCollectionFee: "$0.30", minPaymentFee: "$0.25", useSystemTieredFee: false 
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
    createdAt: "2024-01-08 16:45:00"
  },
  {
    id: "M005",
    name: "快捷支付",
    userId: "U100005",
    bxbUserId: "BXB005",
    email: "quickpay@example.com",
    phone: "+86 138 0000 0005",
    isKYC: false,
    registeredAt: "2024-06-18 14:30:00",
    registeredLocation: "广州市天河区",
    lastLoginLocation: "广州市天河区",
    lastLoginTime: "2024-11-10 09:00:00",
    apiKeys: [],
    balance: 0,
    paymentBalance: 0,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "CNY", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "USD", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "USDT", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "EUR", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "GBP", balance: 0, paymentBalance: 0, frozenBalance: 0 }
    ],
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
    createdAt: "2024-06-18 14:30:00"
  },
  {
    id: "M006",
    name: "聚合支付平台",
    userId: "U100006",
    bxbUserId: "BXB006",
    email: "aggregate@example.com",
    phone: "+86 138 0000 0006",
    isKYC: true,
    kycRealName: "赵聚合",
    kycIdNumber: "440101199208080006",
    kycCountry: "中国",
    kycIdType: "身份证",
    kycVerifiedAt: "2024-02-25 16:00:00",
    kycBirthday: "1992-08-08",
    kycGender: "男",
    kycNationality: "中国",
    kycAddresses: [
      {
        label: "居住地址",
        country: "中国",
        province: "浙江省",
        city: "杭州市",
        district: "西湖区",
        street: "文三路478号华星时代广场B座1506室",
        postalCode: "310012",
        fullAddress: "中国浙江省杭州市西湖区文三路478号华星时代广场B座1506室"
      }
    ],
    registeredAt: "2024-02-20 09:30:00",
    registeredLocation: "杭州市西湖区",
    lastLoginLocation: "杭州市余杭区",
    lastLoginTime: "2024-11-15 14:30:00",
    apiKeys: [
      {
        keyId: "KEY008",
        key: "sk_live_h7g6f5d4s3a2p1o0i9u8y7t6r5e4w3q2",
        callbackDomain: "https://api-beta.aggregate.com",
        domainStatus: "pending",
        createdAt: "2024-06-10 10:25:00"
      }
    ],
    balance: 28000,
    paymentBalance: 12000,
    frozenBalance: 5000,
    currencyBalances: [
      { currency: "CNY", balance: 128000, paymentBalance: 58000, frozenBalance: 18000 },
      { currency: "USD", balance: 18000, paymentBalance: 8000, frozenBalance: 3000 },
      { currency: "USDT", balance: 22000, paymentBalance: 9500, frozenBalance: 4000 },
      { currency: "EUR", balance: 15000, paymentBalance: 6500, frozenBalance: 2500 },
      { currency: "GBP", balance: 12000, paymentBalance: 5000, frozenBalance: 1800 }
    ],
    dailyProfit: 450,
    monthlyProfit: 11500,
    totalProfit: 58000,
    currencyProfits: [
      { currency: "CNY", collectionProfit: 4200, paymentProfit: 1800, exchangeRateProfit: 900, totalProfit: 6900 },
      { currency: "USD", collectionProfit: 1500, paymentProfit: 680, exchangeRateProfit: 420, totalProfit: 2600 }
    ],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 45000,
    monthlyVolume: 1150000,
    totalVolume: 5800000,
    currencyVolumes: [],
    totalOrders: 2350,
    feeConfigs: [
      { 
        id: "FC021", currency: "CNY", channel: "支付宝", channelType: "代收",
        interfaces: [
          { name: "FastPay", enabled: true, collectionFeeRate: "0.6%", collectionFeeFixed: "0.5", paymentFeeRate: "0.9%", paymentFeeFixed: "0.3", suppliers: [{ name: "支付宝直连", enabled: true }] }
        ], 
        collectionFee: "0.6%", paymentFee: "0.4%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.60", useSystemTieredFee: false 
      },
    ],
    status: "active",
    hasPendingDomain: true,
    createdAt: "2024-03-15 09:00:00"
  },
  {
    id: "M007",
    name: "国际支付网关",
    userId: "U100007",
    bxbUserId: "BXB007",
    email: "intlpay@example.com",
    phone: "+86 138 0000 0007",
    isKYC: true,
    kycRealName: "钱国际",
    kycIdNumber: "330101199106060007",
    kycCountry: "中国",
    kycIdType: "护照",
    kycVerifiedAt: "2024-03-15 11:00:00",
    registeredAt: "2024-03-10 15:00:00",
    registeredLocation: "成都市高新区",
    lastLoginLocation: "新加坡",
    lastLoginTime: "2024-11-14 22:00:00",
    apiKeys: [
      {
        keyId: "KEY009",
        key: "sk_live_q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7",
        callbackDomain: "https://api.intlpay.net",
        domainStatus: "approved",
        createdAt: "2024-02-18 16:30:00"
      },
      {
        keyId: "KEY010",
        key: "sk_live_j8k9l0m1n2b3v4c5x6z7a8s9d0f1g2h3",
        callbackDomain: "https://webhook.intlpay.net",
        domainStatus: "approved",
        createdAt: "2024-05-22 11:45:00"
      }
    ],
    balance: 98000,
    paymentBalance: 42000,
    frozenBalance: 15000,
    currencyBalances: [
      { currency: "CNY", balance: 450000, paymentBalance: 195000, frozenBalance: 68000 },
      { currency: "USD", balance: 98000, paymentBalance: 42000, frozenBalance: 15000 },
      { currency: "USDT", balance: 125000, paymentBalance: 55000, frozenBalance: 22000 },
      { currency: "EUR", balance: 72000, paymentBalance: 31000, frozenBalance: 12000 },
      { currency: "GBP", balance: 58000, paymentBalance: 25000, frozenBalance: 9500 }
    ],
    dailyProfit: 3250,
    monthlyProfit: 82000,
    totalProfit: 560000,
    currencyProfits: [
      { currency: "CNY", collectionProfit: 38000, paymentProfit: 16500, exchangeRateProfit: 9200, totalProfit: 63700 },
      { currency: "USD", collectionProfit: 12500, paymentProfit: 5800, exchangeRateProfit: 3100, totalProfit: 21400 },
      { currency: "EUR", collectionProfit: 8500, paymentProfit: 3800, exchangeRateProfit: 2200, totalProfit: 14500 }
    ],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 325000,
    monthlyVolume: 8200000,
    totalVolume: 56000000,
    currencyVolumes: [],
    totalOrders: 15680,
    feeConfigs: [
      { 
        id: "FC022", currency: "CNY", channel: "微信支付", channelType: "代收",
        interfaces: [
          { name: "WechatPay", enabled: true, collectionFeeRate: "0.5%", collectionFeeFixed: "0.3", paymentFeeRate: "0.7%", paymentFeeFixed: "0.2", suppliers: [{ name: "微信官方", enabled: true }] }
        ], 
        collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "¥0.50", minPaymentFee: "¥0.30", useSystemTieredFee: true 
      },
      { 
        id: "FC023", currency: "USD", channel: "Stripe", channelType: "代收",
        interfaces: [
          { name: "StripeAPI", enabled: true, collectionFeeRate: "2.9%", collectionFeeFixed: "0.30", paymentFeeRate: "3.2%", paymentFeeFixed: "0.25", suppliers: [{ name: "Stripe", enabled: true }] }
        ], 
        collectionFee: "2.9%", paymentFee: "2.5%", minCollectionFee: "$0.30", minPaymentFee: "$0.25", useSystemTieredFee: false 
      },
    ],
    status: "active",
    hasPendingDomain: false,
    createdAt: "2024-02-18 16:30:00"
  },
  {
    id: "M008",
    name: "移动支付",
    userId: "U100008",
    bxbUserId: "BXB008",
    email: "mobilepay@example.com",
    phone: "+86 138 0000 0008",
    isKYC: true,
    kycRealName: "孙移动",
    kycIdNumber: "510101199404040008",
    kycCountry: "中国",
    kycIdType: "身份证",
    kycVerifiedAt: "2024-04-20 10:00:00",
    registeredAt: "2024-04-15 11:20:00",
    registeredLocation: "武汉市洪山区",
    lastLoginLocation: "武汉市江汉区",
    lastLoginTime: "2024-11-13 16:45:00",
    apiKeys: [],
    balance: 8500,
    paymentBalance: 3200,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "CNY", balance: 32000, paymentBalance: 14500, frozenBalance: 0 },
      { currency: "USD", balance: 8500, paymentBalance: 3200, frozenBalance: 0 },
      { currency: "USDT", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "EUR", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "GBP", balance: 0, paymentBalance: 0, frozenBalance: 0 }
    ],
    dailyProfit: 85,
    monthlyProfit: 2180,
    totalProfit: 6850,
    currencyProfits: [],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 8500,
    monthlyVolume: 218000,
    totalVolume: 685000,
    currencyVolumes: [],
    totalOrders: 485,
    feeConfigs: [],
    status: "active",
    hasPendingDomain: false,
    createdAt: "2024-05-28 13:20:00"
  },
  {
    id: "M009",
    name: "跨境电商支付",
    userId: "U100009",
    bxbUserId: "BXB009",
    email: "ecompay@example.com",
    phone: "+86 138 0000 0009",
    isKYC: true,
    kycRealName: "周电商",
    kycIdNumber: "320101199702020009",
    kycCountry: "中国",
    kycIdType: "身份证",
    kycVerifiedAt: "2024-05-10 14:30:00",
    registeredAt: "2024-05-05 08:45:00",
    registeredLocation: "南京市鼓楼区",
    lastLoginLocation: "南京市建邺区",
    lastLoginTime: "2024-11-15 11:30:00",
    apiKeys: [
      {
        keyId: "KEY011",
        key: "sk_live_p9o8i7u6y5t4r3e2w1q0a9s8d7f6g5h4",
        callbackDomain: "https://api.ecompay.io",
        domainStatus: "approved",
        createdAt: "2024-04-12 08:15:00"
      }
    ],
    balance: 0,
    paymentBalance: 0,
    frozenBalance: 235000,
    currencyBalances: [
      { currency: "CNY", balance: 0, paymentBalance: 0, frozenBalance: 580000 },
      { currency: "USD", balance: 0, paymentBalance: 0, frozenBalance: 135000 },
      { currency: "USDT", balance: 0, paymentBalance: 0, frozenBalance: 95000 },
      { currency: "EUR", balance: 0, paymentBalance: 0, frozenBalance: 68000 },
      { currency: "GBP", balance: 0, paymentBalance: 0, frozenBalance: 52000 }
    ],
    dailyProfit: 0,
    monthlyProfit: 0,
    totalProfit: 168000,
    currencyProfits: [],
    profitDataByTimeRange: {
      today: [],
      yesterday: [],
      thisMonth: [],
      total: []
    },
    dailyVolume: 0,
    monthlyVolume: 0,
    totalVolume: 16800000,
    currencyVolumes: [],
    totalOrders: 6850,
    feeConfigs: [
      { 
        id: "FC024", currency: "CNY", channel: "支付宝", channelType: "代收",
        interfaces: [
          { name: "AlipayGlobal", enabled: false, collectionFeeRate: "0.8%", collectionFeeFixed: "0.8", paymentFeeRate: "1.1%", paymentFeeFixed: "0.6", suppliers: [{ name: "已停用", enabled: false }] }
        ], 
        collectionFee: "0.8%", paymentFee: "0.6%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.80", useSystemTieredFee: false 
      },
    ],
    status: "frozen",
    hasPendingDomain: false,
    createdAt: "2024-04-12 08:15:00"
  },
  {
    id: "M010",
    name: "便捷付",
    userId: "U100010",
    bxbUserId: "BXB010",
    email: "easypay@example.com",
    phone: "+86 138 0000 0010",
    isKYC: false,
    registeredAt: "2024-07-01 13:00:00",
    registeredLocation: "西安市雁塔区",
    lastLoginLocation: "西安市雁塔区",
    lastLoginTime: "2024-11-12 20:00:00",
    apiKeys: [],
    balance: 0,
    paymentBalance: 0,
    frozenBalance: 0,
    currencyBalances: [
      { currency: "CNY", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "USD", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "USDT", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "EUR", balance: 0, paymentBalance: 0, frozenBalance: 0 },
      { currency: "GBP", balance: 0, paymentBalance: 0, frozenBalance: 0 }
    ],
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
    createdAt: "2024-06-22 15:40:00"
  },
]

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants)
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [merchantFilter, setMerchantFilter] = useState<"normal" | "hasApi" | "pending" | "all">("all")
  const [sortBy, setSortBy] = useState<"none" | "profit" | "volume">("none")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false)
  const [isFreezeFundsDialogOpen, setIsFreezeFundsDialogOpen] = useState(false)
  const [isFeeConfigDialogOpen, setIsFeeConfigDialogOpen] = useState(false)
  const [isAddFeeConfigDialogOpen, setIsAddFeeConfigDialogOpen] = useState(false)
  const [isApiKeysDialogOpen, setIsApiKeysDialogOpen] = useState(false)
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false)
  const [isProfitDialogOpen, setIsProfitDialogOpen] = useState(false)
  const [isVolumeDialogOpen, setIsVolumeDialogOpen] = useState(false)
  const [profitTimeRange, setProfitTimeRange] = useState<"today" | "yesterday" | "thisMonth" | "total">("total")
  const [isInterfaceManageDialogOpen, setIsInterfaceManageDialogOpen] = useState(false)
  const [isSupplierManageDialogOpen, setIsSupplierManageDialogOpen] = useState(false)
  const [currentMerchant, setCurrentMerchant] = useState<Merchant | null>(null)
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
  const [showUserDetailDrawer, setShowUserDetailDrawer] = useState(false)
  const [currentUserProfile, setCurrentUserProfile] = useState<AdminUserProfile | null>(null)
  const [isUnfreezeFundsDialogOpen, setIsUnfreezeFundsDialogOpen] = useState(false)
  const [unfreezeCurrency, setUnfreezeCurrency] = useState("")
  const [unfreezeAmount, setUnfreezeAmount] = useState("")
  const [freezeFundsCurrency, setFreezeFundsCurrency] = useState("")
  const [editingFrozenBalance, setEditingFrozenBalance] = useState<{currency: string, value: string} | null>(null)

  const ALL_CURRENCIES = ["CNY", "USD", "USDT", "EUR", "GBP"]
  const ALL_CHANNELS = ["支付宝", "微信支付", "银行卡", "云闪付", "Stripe", "PayPal", "TRC20", "ERC20"]

  const getAllPaymentMethods = (merchant: Merchant | null) => {
    if (!merchant) return []
    
    const allMethods: FeeConfig[] = []
    
    ALL_CURRENCIES.forEach(currency => {
      ALL_CHANNELS.forEach(channel => {
        const existingConfig = merchant.feeConfigs.find(
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

  const getMerchantCounts = () => {
    return {
      all: merchants.length,
      normal: merchants.filter(m => m.apiKeys.length === 0 && !m.hasPendingDomain).length,
      hasApi: merchants.filter(m => m.apiKeys.length > 0 && !m.hasPendingDomain).length,
      pending: merchants.filter(m => m.hasPendingDomain).length
    }
  }

  const counts = getMerchantCounts()

  const filteredMerchants = merchants.filter(merchant => {
    // 先按页签筛选（互斥逻辑：pending优先级最高）
    if (merchantFilter === "normal" && (merchant.apiKeys.length > 0 || merchant.hasPendingDomain)) {
      return false
    }
    if (merchantFilter === "hasApi" && (merchant.apiKeys.length === 0 || merchant.hasPendingDomain)) {
      return false
    }
    if (merchantFilter === "pending" && !merchant.hasPendingDomain) {
      return false
    }
    
    // 再按搜索词筛选
    if (searchTerm) {
      return merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.userId.toLowerCase().includes(searchTerm.toLowerCase())
    }
    
    return true
  }).sort((a, b) => {
    // 根据排序按钮进行排序
    if (sortBy === "profit") {
      return b.totalProfit - a.totalProfit
    }
    if (sortBy === "volume") {
      return b.totalVolume - a.totalVolume
    }
    return 0
  })

  const openBalanceDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsBalanceDialogOpen(true)
  }

  const openUserDetailDrawer = (merchant: Merchant) => {
    setCurrentUserProfile({
      userId: merchant.userId,
      username: merchant.name,
      phone: merchant.phone,
      email: merchant.email,
      isKYC: merchant.isKYC,
      kycRealName: merchant.kycRealName,
      kycIdNumber: merchant.kycIdNumber,
      kycCountry: merchant.kycCountry,
      kycIdType: merchant.kycIdType,
      kycVerifiedAt: merchant.kycVerifiedAt,
      kycBirthday: merchant.kycBirthday,
      kycGender: merchant.kycGender,
      kycNationality: merchant.kycNationality,
      kycAddresses: merchant.kycAddresses,
      registeredAt: merchant.registeredAt,
      registeredLocation: merchant.registeredLocation,
      lastLoginLocation: merchant.lastLoginLocation,
      lastLoginTime: merchant.lastLoginTime,
    })
    setShowUserDetailDrawer(true)
  }

  const openProfitDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setProfitTimeRange("total")
    setIsProfitDialogOpen(true)
  }

  const openVolumeDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsVolumeDialogOpen(true)
  }

  const openApiKeysDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsApiKeysDialogOpen(true)
  }

  const handleEdit = () => {
    if (currentMerchant) {
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id ? { ...m, ...formData } : m
      ))
      setIsEditDialogOpen(false)
      setCurrentMerchant(null)
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "active"
      })
    }
  }

  const handleDelete = () => {
    if (currentMerchant) {
      setMerchants(merchants.filter(m => m.id !== currentMerchant.id))
      setIsDeleteDialogOpen(false)
      setCurrentMerchant(null)
    }
  }

  const handleToggleFreeze = () => {
    if (currentMerchant && freezeFormData.currency && freezeFormData.amount) {
      const newStatus = currentMerchant.status === "frozen" ? "active" : "frozen"
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id ? { ...m, status: newStatus } : m
      ))
      setIsFreezeDialogOpen(false)
      setCurrentMerchant(null)
      setFreezeFormData({ currency: "", amount: "" })
    }
  }

  const handleFreezeFunds = () => {
    if (currentMerchant && freezeAmount && freezeFundsCurrency) {
      const amount = parseFloat(freezeAmount)
      const updatedBalances = currentMerchant.currencyBalances.map(cb => {
        if (cb.currency === freezeFundsCurrency) {
          return {
            ...cb,
            frozenBalance: cb.frozenBalance + amount,
            balance: Math.max(0, cb.balance - amount)
          }
        }
        return cb
      })
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, currencyBalances: updatedBalances } 
          : m
      ))
      setIsFreezeFundsDialogOpen(false)
      setCurrentMerchant(null)
      setFreezeAmount("")
      setFreezeFundsCurrency("")
    }
  }

  const handleMerchantStatusToggle = (merchant: Merchant, checked: boolean) => {
    if (merchant.status === "disabled") {
      return
    }
    
    const newStatus = checked ? "active" : "frozen"
    setMerchants(merchants.map(m => 
      m.id === merchant.id ? { ...m, status: newStatus } : m
    ))
  }

  const openEditDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setFormData({
      name: merchant.name,
      email: merchant.email,
      phone: merchant.phone,
      status: merchant.status
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsDeleteDialogOpen(true)
  }

  const openFreezeDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setFreezeFormData({ currency: "", amount: "" })
    setIsFreezeDialogOpen(true)
  }

  const openFreezeFundsDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setFreezeFundsCurrency("")
    setFreezeAmount("")
    setIsFreezeFundsDialogOpen(true)
  }

  const openUnfreezeFundsDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setUnfreezeCurrency("")
    setUnfreezeAmount("")
    setIsUnfreezeFundsDialogOpen(true)
  }

  const getCurrentFrozenBalance = (currency: string) => {
    if (!currentMerchant) return 0
    const cb = currentMerchant.currencyBalances.find(b => b.currency === currency)
    return cb?.frozenBalance || 0
  }

  const handleUnfreezeFunds = () => {
    if (currentMerchant && unfreezeCurrency && unfreezeAmount) {
      const amount = parseFloat(unfreezeAmount)
      const updatedBalances = currentMerchant.currencyBalances.map(cb => {
        if (cb.currency === unfreezeCurrency) {
          return {
            ...cb,
            frozenBalance: Math.max(0, cb.frozenBalance - amount),
            balance: cb.balance + amount
          }
        }
        return cb
      })
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, currencyBalances: updatedBalances } 
          : m
      ))
      setIsUnfreezeFundsDialogOpen(false)
      setCurrentMerchant(null)
      setUnfreezeCurrency("")
      setUnfreezeAmount("")
    }
  }

  const handleUpdateFrozenBalance = (currency: string, newValue: number) => {
    if (currentMerchant) {
      const updatedBalances = currentMerchant.currencyBalances.map(cb => {
        if (cb.currency === currency) {
          return { ...cb, frozenBalance: newValue }
        }
        return cb
      })
      const updatedMerchant = { ...currentMerchant, currencyBalances: updatedBalances }
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id ? updatedMerchant : m
      ))
      setCurrentMerchant(updatedMerchant)
      setEditingFrozenBalance(null)
    }
  }

  const openFeeConfigDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setActiveCurrency(ALL_CURRENCIES[0])
    setIsFeeConfigDialogOpen(true)
  }

  const openAddFeeConfigDialog = () => {
    setFeeFormData({
      currency: "",
      channel: "",
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
    if (!currentFeeConfig || !currentMerchant) return
    
    const updatedFeeConfigs = currentMerchant.feeConfigs.map(fc => {
      if (fc.id === currentFeeConfig.id) {
        const updatedInterfaces = fc.interfaces.map(iface => 
          iface.name === interfaceName ? { ...iface, enabled } : iface
        )
        return { ...fc, interfaces: updatedInterfaces }
      }
      return fc
    })
    
    setMerchants(merchants.map(m => 
      m.id === currentMerchant.id ? { ...m, feeConfigs: updatedFeeConfigs } : m
    ))
    
    setCurrentFeeConfig(updatedFeeConfigs.find(fc => fc.id === currentFeeConfig.id) || null)
  }

  const handleToggleSupplier = (supplierName: string, enabled: boolean) => {
    if (!currentInterface || !currentFeeConfig || !currentMerchant) return
    
    const updatedFeeConfigs = currentMerchant.feeConfigs.map(fc => {
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
    
    setMerchants(merchants.map(m => 
      m.id === currentMerchant.id ? { ...m, feeConfigs: updatedFeeConfigs } : m
    ))
    
    const updatedInterface = updatedFeeConfigs
      .find(fc => fc.id === currentFeeConfig.id)
      ?.interfaces.find(iface => iface.name === currentInterface.name)
    
    if (updatedInterface) {
      setCurrentInterface(updatedInterface)
    }
    
    setCurrentMerchant({ ...currentMerchant, feeConfigs: updatedFeeConfigs })
    
    const updatedFeeConfig = updatedFeeConfigs.find(fc => fc.id === currentFeeConfig.id)
    if (updatedFeeConfig) {
      setCurrentFeeConfig(updatedFeeConfig)
    }
  }

  const handleAddFeeConfig = () => {
    if (currentMerchant) {
      const newFeeConfig: FeeConfig = {
        id: `FC${String(Date.now()).slice(-3)}`,
        currency: feeFormData.currency,
        channel: feeFormData.channel,
        suppliers: [],
        collectionFee: feeFormData.collectionFee,
        paymentFee: feeFormData.paymentFee,
        minCollectionFee: feeFormData.minCollectionFee,
        minPaymentFee: feeFormData.minPaymentFee,
        useSystemTieredFee: feeFormData.useSystemTieredFee
      }
      const updatedFeeConfigs = [...currentMerchant.feeConfigs, newFeeConfig]
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, feeConfigs: updatedFeeConfigs }
          : m
      ))
      setCurrentMerchant({
        ...currentMerchant,
        feeConfigs: updatedFeeConfigs
      })
      if (!Array.from(new Set(currentMerchant.feeConfigs.map(fc => fc.currency))).includes(feeFormData.currency)) {
        setActiveCurrency(feeFormData.currency)
      }
      setIsAddFeeConfigDialogOpen(false)
      setFeeFormData({
        currency: "",
        channel: "",
        collectionFee: "",
        paymentFee: "",
        minCollectionFee: "",
        minPaymentFee: "",
        useSystemTieredFee: false
      })
    }
  }

  const handleUpdateFeeConfig = (configId: string, field: keyof FeeConfig, value: string) => {
    if (currentMerchant) {
      const updatedConfigs = currentMerchant.feeConfigs.map(fc =>
        fc.id === configId ? { ...fc, [field]: value } : fc
      )
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, feeConfigs: updatedConfigs }
          : m
      ))
      setCurrentMerchant({
        ...currentMerchant,
        feeConfigs: updatedConfigs
      })
    }
  }

  const handleDeleteFeeConfig = (feeConfigId: string) => {
    if (currentMerchant) {
      const updatedFeeConfigs = currentMerchant.feeConfigs.filter(fc => fc.id !== feeConfigId)
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, feeConfigs: updatedFeeConfigs }
          : m
      ))
      setCurrentMerchant({
        ...currentMerchant,
        feeConfigs: updatedFeeConfigs
      })
      const remainingCurrencies = Array.from(new Set(updatedFeeConfigs.map(fc => fc.currency)))
      if (!remainingCurrencies.includes(activeCurrency) && remainingCurrencies.length > 0) {
        setActiveCurrency(remainingCurrencies[0])
      }
    }
  }

  const handleToggleSystemTieredFee = (configId: string, checked: boolean) => {
    if (currentMerchant) {
      const updatedConfigs = currentMerchant.feeConfigs.map(fc =>
        fc.id === configId ? { ...fc, useSystemTieredFee: checked } : fc
      )
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, feeConfigs: updatedConfigs }
          : m
      ))
      setCurrentMerchant({
        ...currentMerchant,
        feeConfigs: updatedConfigs
      })
    }
  }

  const updateMerchantState = (updatedMerchant: Merchant) => {
    setMerchants(merchants.map(m => 
      m.id === updatedMerchant.id ? updatedMerchant : m
    ))
    setCurrentMerchant(updatedMerchant)
  }

  const handleApproveDomain = (merchantId: string, keyId: string) => {
    if (currentMerchant && currentMerchant.id === merchantId) {
      const updatedApiKeys = currentMerchant.apiKeys.map(k =>
        k.keyId === keyId ? { ...k, domainStatus: "approved" as const } : k
      )
      const hasPendingDomain = updatedApiKeys.some(k => k.domainStatus === "pending")
      const updatedMerchant = {
        ...currentMerchant,
        apiKeys: updatedApiKeys,
        hasPendingDomain
      }
      updateMerchantState(updatedMerchant)
    }
  }

  const handleRejectDomain = (merchantId: string, keyId: string) => {
    const confirmed = window.confirm("确定要拒绝并删除此API密钥吗？此操作不可恢复。")
    if (!confirmed) return

    if (currentMerchant && currentMerchant.id === merchantId) {
      const updatedApiKeys = currentMerchant.apiKeys.filter(k => k.keyId !== keyId)
      const hasPendingDomain = updatedApiKeys.some(k => k.domainStatus === "pending")
      const updatedMerchant = {
        ...currentMerchant,
        apiKeys: updatedApiKeys,
        hasPendingDomain
      }
      updateMerchantState(updatedMerchant)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">法币用户列表</h2>

      <Tabs value={merchantFilter} onValueChange={(value) => setMerchantFilter(value as "normal" | "hasApi" | "pending" | "all")}>
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
                  KYC
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  账户余额
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  利润贡献
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  交易量
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
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{merchant.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      商户ID: {merchant.id}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      UserID: {merchant.userId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => openUserDetailDrawer(merchant)}
                      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <div className="text-blue-600 dark:text-blue-400 hover:underline">
                        {merchant.email || '-'}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {merchant.phone || '-'}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {merchant.isKYC ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400 text-xs">已认证</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500 text-xs">未认证</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openBalanceDialog(merchant)}
                      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <div className="text-gray-900 dark:text-white font-medium">
                        可用: ${merchant.balance.toLocaleString()}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xs mt-1 font-medium">
                        代付金: ${merchant.paymentBalance.toLocaleString()}
                      </div>
                      <div className="text-orange-600 dark:text-orange-400 text-xs mt-1 font-medium">
                        冻结: ${merchant.frozenBalance.toLocaleString()}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openProfitDialog(merchant)}
                      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <div className="text-green-600 dark:text-green-400 font-medium">
                        日: ${merchant.dailyProfit.toLocaleString()}
                      </div>
                      <div className="text-emerald-600 dark:text-emerald-400 text-xs mt-1 font-medium">
                        月: ${merchant.monthlyProfit.toLocaleString()}
                      </div>
                      <div className="text-teal-600 dark:text-teal-400 text-xs mt-1 font-medium">
                        总: ${merchant.totalProfit.toLocaleString()}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openVolumeDialog(merchant)}
                      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <div className="text-purple-900 dark:text-purple-100 font-medium">
                        日: ${merchant.dailyVolume.toLocaleString()}
                      </div>
                      <div className="text-purple-700 dark:text-purple-300 text-xs mt-1">
                        月: ${merchant.monthlyVolume.toLocaleString()}
                      </div>
                      <div className="text-purple-600 dark:text-purple-400 text-xs mt-1 font-medium">
                        总: ${merchant.totalVolume.toLocaleString()}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {merchant.apiKeys.length === 0 && !merchant.hasPendingDomain ? (
                      <span className="text-gray-400 dark:text-gray-500 text-sm">无API</span>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openApiKeysDialog(merchant)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          <Key className="w-4 h-4 mr-1" />
                          查看密钥 ({merchant.apiKeys.length})
                        </Button>
                        {merchant.hasPendingDomain && (
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
                        checked={merchant.status === "active"}
                        onCheckedChange={(checked) => handleMerchantStatusToggle(merchant, checked)}
                        disabled={merchant.status === "disabled"}
                      />
                      <span className={`text-sm font-medium ${
                        merchant.status === "active"
                          ? "text-green-600 dark:text-green-400"
                          : merchant.status === "frozen"
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {merchant.status === "active" ? "正常" : 
                         merchant.status === "frozen" ? "冻结" : "禁用"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFeeConfigDialog(merchant)}
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
                        title="商户通道配置"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFreezeFundsDialog(merchant)}
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400"
                        title="冻结资金"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openUnfreezeFundsDialog(merchant)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400"
                        title="解冻资金"
                      >
                        <Unlock className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMerchants.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}

        {filteredMerchants.length > 0 && (
          <DataTotal total={filteredMerchants.length} />
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑商户</DialogTitle>
            <DialogDescription>修改商户信息</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">商户名称</Label>
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
            <SheetTitle>商户通道配置</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <Tabs value={activeCurrency} onValueChange={setActiveCurrency}>
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${ALL_CURRENCIES.length}, 1fr)` }}>
                {ALL_CURRENCIES.map(currency => (
                  <TabsTrigger key={currency} value={currency}>
                    {currency}
                  </TabsTrigger>
                ))}
              </TabsList>
              {ALL_CURRENCIES.map(currency => (
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
                        {getAllPaymentMethods(currentMerchant).filter(fc => fc.currency === currency).sort((a, b) => {
                          // 代收在前，代付在后
                          if (a.channelType === "代收" && b.channelType === "代付") return -1;
                          if (a.channelType === "代付" && b.channelType === "代收") return 1;
                          return 0;
                        }).map((config) => (
                            <tr key={config.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                                <span className={`px-2 py-1 rounded text-xs ${
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
                                  value={config.paymentFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, 'paymentFee', e.target.value)}
                                  className="h-8 text-sm w-24 text-orange-600 dark:text-orange-400 font-semibold"
                                  placeholder="0.3%"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={config.minPaymentFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, 'minPaymentFee', e.target.value)}
                                  className="h-8 text-sm w-28 text-orange-600 dark:text-orange-400"
                                  placeholder="¥0.50"
                                />
                              </td>
                              <td className="px-3 py-3 whitespace-nowrap text-sm">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={config.useSystemTieredFee}
                                    onCheckedChange={(checked) => handleToggleSystemTieredFee(config.id, checked)}
                                  />
                                  <span className={`text-xs ${config.useSystemTieredFee ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}>
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
              为商户 {currentMerchant?.name} 添加新的支付方式配置（币种、通道）。添加后可通过"管理供应商"配置具体供应商。
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
                    <SelectItem value="CNY">CNY</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
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
                    <SelectItem value="支付宝">支付宝</SelectItem>
                    <SelectItem value="微信支付">微信支付</SelectItem>
                    <SelectItem value="银行卡">银行卡</SelectItem>
                    <SelectItem value="云闪付">云闪付</SelectItem>
                    <SelectItem value="Stripe">Stripe</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
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
                  placeholder="例如：¥1.00"
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
                  placeholder="例如：¥0.50"
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
            <DialogTitle>冻结资金 - {currentMerchant?.name}</DialogTitle>
            <DialogDescription>
              从用户可用余额中冻结指定金额的资金
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="freeze-funds-currency">币种 *</Label>
              <Select 
                value={freezeFundsCurrency} 
                onValueChange={setFreezeFundsCurrency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择币种" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNY">CNY (人民币)</SelectItem>
                  <SelectItem value="USD">USD (美元)</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="EUR">EUR (欧元)</SelectItem>
                  <SelectItem value="GBP">GBP (英镑)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {freezeFundsCurrency && currentMerchant && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  当前可用余额: <span className="font-medium text-gray-900 dark:text-white">
                    {currentMerchant.currencyBalances.find(cb => cb.currency === freezeFundsCurrency)?.balance.toLocaleString() || 0}
                  </span>
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  当前冻结金额: <span className="font-medium">
                    {currentMerchant.currencyBalances.find(cb => cb.currency === freezeFundsCurrency)?.frozenBalance.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="freeze-amount">冻结金额 *</Label>
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
            <Button 
              onClick={handleFreezeFunds} 
              className="bg-orange-600 hover:bg-orange-700"
              disabled={!freezeFundsCurrency || !freezeAmount}
            >
              冻结
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isUnfreezeFundsDialogOpen} onOpenChange={setIsUnfreezeFundsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>解冻资金 - {currentMerchant?.name}</DialogTitle>
            <DialogDescription>
              将已冻结的资金解冻回可用余额
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="unfreeze-currency">币种 *</Label>
              <Select 
                value={unfreezeCurrency} 
                onValueChange={setUnfreezeCurrency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择币种" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNY">CNY (人民币)</SelectItem>
                  <SelectItem value="USD">USD (美元)</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="EUR">EUR (欧元)</SelectItem>
                  <SelectItem value="GBP">GBP (英镑)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {unfreezeCurrency && (
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  当前冻结金额: <span className="font-semibold text-lg">{getCurrentFrozenBalance(unfreezeCurrency).toLocaleString()}</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="unfreeze-amount">解冻金额 *</Label>
              <Input
                id="unfreeze-amount"
                type="number"
                placeholder="请输入解冻金额"
                value={unfreezeAmount}
                onChange={(e) => setUnfreezeAmount(e.target.value)}
              />
              {unfreezeCurrency && unfreezeAmount && parseFloat(unfreezeAmount) > getCurrentFrozenBalance(unfreezeCurrency) && (
                <p className="text-xs text-red-500">解冻金额不能超过当前冻结金额</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnfreezeFundsDialogOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={handleUnfreezeFunds} 
              className="bg-green-600 hover:bg-green-700"
              disabled={!unfreezeCurrency || !unfreezeAmount || parseFloat(unfreezeAmount) > getCurrentFrozenBalance(unfreezeCurrency)}
            >
              解冻
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreezeDialogOpen} onOpenChange={setIsFreezeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentMerchant?.status === "frozen" ? "解冻" : "冻结"}资金
            </DialogTitle>
            <DialogDescription>
              商户名称: {currentMerchant?.name} | 当前状态: {currentMerchant?.status === "frozen" ? "已冻结" : "正常"}
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
                  <SelectItem value="CNY">CNY (人民币)</SelectItem>
                  <SelectItem value="USD">USD (美元)</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="EUR">EUR (欧元)</SelectItem>
                  <SelectItem value="GBP">GBP (英镑)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="freeze-merchant-amount">冻结金额 *</Label>
              <Input
                id="freeze-merchant-amount"
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
              className={currentMerchant?.status === "frozen" 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-yellow-600 hover:bg-yellow-700"
              }
              disabled={!freezeFormData.currency || !freezeFormData.amount}
            >
              {currentMerchant?.status === "frozen" ? "解冻" : "冻结"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isApiKeysDialogOpen} onOpenChange={setIsApiKeysDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>密钥管理 - {currentMerchant?.name}</DialogTitle>
            <DialogDescription>
              商户ID: {currentMerchant?.id} | UserID: {currentMerchant?.userId} | 共 {currentMerchant?.apiKeys.length} 个密钥
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {currentMerchant?.apiKeys && currentMerchant.apiKeys.length > 0 ? (
              <div className="space-y-4">
                {currentMerchant.apiKeys.map((apiKey) => (
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                            onClick={() => handleApproveDomain(currentMerchant.id, apiKey.keyId)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            审核通过
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectDomain(currentMerchant.id, apiKey.keyId)}
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
                该商户暂无密钥
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
              商户 {currentMerchant?.name} 的各币种余额信息
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentMerchant && currentMerchant.currencyBalances && currentMerchant.currencyBalances.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">币种</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">法币余额</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400">代付金余额</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-orange-600 dark:text-orange-400">冻结金额</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">总余额</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMerchant.currencyBalances.map((cb, index) => (
                      <tr 
                        key={cb.currency}
                        className={`border-b border-gray-100 dark:border-gray-800 ${
                          index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {cb.currency === "CNY" && "¥"}
                              {cb.currency === "USD" && "$"}
                              {cb.currency === "EUR" && "€"}
                              {cb.currency === "GBP" && "£"}
                              {cb.currency === "USDT" && "₮"}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">{cb.currency}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {cb.currency === "CNY" && "¥"}
                            {cb.currency === "USD" && "$"}
                            {cb.currency === "EUR" && "€"}
                            {cb.currency === "GBP" && "£"}
                            {cb.balance.toLocaleString()}
                            {cb.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-blue-600 dark:text-blue-400">
                            {cb.currency === "CNY" && "¥"}
                            {cb.currency === "USD" && "$"}
                            {cb.currency === "EUR" && "€"}
                            {cb.currency === "GBP" && "£"}
                            {cb.paymentBalance.toLocaleString()}
                            {cb.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {editingFrozenBalance?.currency === cb.currency ? (
                            <div className="flex items-center justify-end gap-2">
                              <Input
                                type="number"
                                value={editingFrozenBalance.value}
                                onChange={(e) => setEditingFrozenBalance({ 
                                  currency: cb.currency, 
                                  value: e.target.value 
                                })}
                                className="h-8 w-32 text-right text-orange-600 dark:text-orange-400"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleUpdateFrozenBalance(cb.currency, parseFloat(editingFrozenBalance.value) || 0)
                                  } else if (e.key === 'Escape') {
                                    setEditingFrozenBalance(null)
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-800"
                                onClick={() => handleUpdateFrozenBalance(cb.currency, parseFloat(editingFrozenBalance.value) || 0)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                onClick={() => setEditingFrozenBalance(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingFrozenBalance({ 
                                currency: cb.currency, 
                                value: cb.frozenBalance.toString() 
                              })}
                              className="font-medium text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                              title="点击编辑冻结金额"
                            >
                              {cb.currency === "CNY" && "¥"}
                              {cb.currency === "USD" && "$"}
                              {cb.currency === "EUR" && "€"}
                              {cb.currency === "GBP" && "£"}
                              {cb.frozenBalance.toLocaleString()}
                              {cb.currency === "USDT" && " USDT"}
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {cb.currency === "CNY" && "¥"}
                            {cb.currency === "USD" && "$"}
                            {cb.currency === "EUR" && "€"}
                            {cb.currency === "GBP" && "£"}
                            {(cb.balance + cb.paymentBalance).toLocaleString()}
                            {cb.currency === "USDT" && " USDT"}
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

      <Dialog open={isProfitDialogOpen} onOpenChange={setIsProfitDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[75vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>利润贡献详情</DialogTitle>
            <DialogDescription>
              商户 {currentMerchant?.name} 的各币种利润明细
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={profitTimeRange} onValueChange={(value) => setProfitTimeRange(value as "today" | "yesterday" | "thisMonth" | "total")} className="mt-4">
            <TabsList>
              <TabsTrigger value="today">今日</TabsTrigger>
              <TabsTrigger value="yesterday">昨日</TabsTrigger>
              <TabsTrigger value="thisMonth">本月</TabsTrigger>
              <TabsTrigger value="total">累计</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="py-4">
            {currentMerchant && currentMerchant.profitDataByTimeRange && currentMerchant.profitDataByTimeRange[profitTimeRange] && currentMerchant.profitDataByTimeRange[profitTimeRange].length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">币种</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">代收利润</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400">代付利润</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-purple-600 dark:text-purple-400">汇率利润</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-teal-600 dark:text-teal-400">总利润</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMerchant.profitDataByTimeRange[profitTimeRange].map((cp, index) => (
                      <tr 
                        key={cp.currency}
                        className={`border-b border-gray-100 dark:border-gray-800 ${
                          index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {cp.currency === "CNY" && "¥"}
                              {cp.currency === "USD" && "$"}
                              {cp.currency === "EUR" && "€"}
                              {cp.currency === "GBP" && "£"}
                              {cp.currency === "USDT" && "₮"}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">{cp.currency}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-green-600 dark:text-green-400">
                            {cp.currency === "CNY" && "¥"}
                            {cp.currency === "USD" && "$"}
                            {cp.currency === "EUR" && "€"}
                            {cp.currency === "GBP" && "£"}
                            {cp.collectionProfit.toLocaleString()}
                            {cp.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-blue-600 dark:text-blue-400">
                            {cp.currency === "CNY" && "¥"}
                            {cp.currency === "USD" && "$"}
                            {cp.currency === "EUR" && "€"}
                            {cp.currency === "GBP" && "£"}
                            {cp.paymentProfit.toLocaleString()}
                            {cp.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-purple-600 dark:text-purple-400">
                            {cp.currency === "CNY" && "¥"}
                            {cp.currency === "USD" && "$"}
                            {cp.currency === "EUR" && "€"}
                            {cp.currency === "GBP" && "£"}
                            {cp.exchangeRateProfit.toLocaleString()}
                            {cp.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-semibold text-teal-600 dark:text-teal-400">
                            {cp.currency === "CNY" && "¥"}
                            {cp.currency === "USD" && "$"}
                            {cp.currency === "EUR" && "€"}
                            {cp.currency === "GBP" && "£"}
                            {cp.totalProfit.toLocaleString()}
                            {cp.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                暂无利润数据
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProfitDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isVolumeDialogOpen} onOpenChange={setIsVolumeDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[75vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>交易量详情</DialogTitle>
            <DialogDescription>
              商户 {currentMerchant?.name} 的各币种交易量明细
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentMerchant && currentMerchant.currencyVolumes && currentMerchant.currencyVolumes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">币种</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">代收交易量</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400">代付交易量</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-purple-600 dark:text-purple-400">总交易量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMerchant.currencyVolumes.map((cv, index) => (
                      <tr 
                        key={cv.currency}
                        className={`border-b border-gray-100 dark:border-gray-800 ${
                          index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {cv.currency === "CNY" && "¥"}
                              {cv.currency === "USD" && "$"}
                              {cv.currency === "EUR" && "€"}
                              {cv.currency === "GBP" && "£"}
                              {cv.currency === "USDT" && "₮"}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">{cv.currency}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-green-600 dark:text-green-400">
                            {cv.currency === "CNY" && "¥"}
                            {cv.currency === "USD" && "$"}
                            {cv.currency === "EUR" && "€"}
                            {cv.currency === "GBP" && "£"}
                            {cv.collectionVolume.toLocaleString()}
                            {cv.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-medium text-blue-600 dark:text-blue-400">
                            {cv.currency === "CNY" && "¥"}
                            {cv.currency === "USD" && "$"}
                            {cv.currency === "EUR" && "€"}
                            {cv.currency === "GBP" && "£"}
                            {cv.paymentVolume.toLocaleString()}
                            {cv.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-semibold text-purple-600 dark:text-purple-400">
                            {cv.currency === "CNY" && "¥"}
                            {cv.currency === "USD" && "$"}
                            {cv.currency === "EUR" && "€"}
                            {cv.currency === "GBP" && "£"}
                            {cv.totalVolume.toLocaleString()}
                            {cv.currency === "USDT" && " USDT"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                暂无交易量数据
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVolumeDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除商户</DialogTitle>
            <DialogDescription>
              确定要删除商户 "{currentMerchant?.name}" 吗？此操作不可恢复。
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
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
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
                        <p className={`text-xs font-medium ${
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
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

      <UserDetailDrawer
        open={showUserDetailDrawer}
        onClose={() => setShowUserDetailDrawer(false)}
        user={currentUserProfile}
      />
    </div>
  )
}
