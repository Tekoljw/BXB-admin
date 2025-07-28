"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, MessageCircle, Phone, Video, User, Users, Star, Shield, BookOpen, Smile, Paperclip, Scissors, ArrowUp, MoreHorizontal, X, ChevronRight, Bell, Image, Send, Gift, ChevronDown, ChevronUp, Wallet, ArrowRightLeft, Zap, Plane, ArrowLeft, Home, Percent, FileCheck, Key, Settings, UserX, LogOut, Check, Mic } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useChat } from "@/contexts/chat-context"

// Custom Transfer Icon (Wallet)
const TransferIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>
    <path d="M16 12h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4"/>
    <circle cx="18" cy="14" r="1" fill="currentColor"/>
  </svg>
)

// Custom Airdrop Icon (Parachute)
const AirdropIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Parachute canopy */}
    <path d="M12 2C8.13 2 5 5.13 5 9c0 0 0 1 0 1h14s0-1 0-1c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.8"/>
    {/* Parachute lines */}
    <path d="M7 10l3 6M12 10v6M17 10l-3 6"/>
    {/* Person/payload */}
    <circle cx="12" cy="18" r="2" fill="currentColor"/>
    <path d="M12 16v-2" strokeWidth="1"/>
  </svg>
)

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread?: number
  isOnline: boolean
  isActive?: boolean
  isSpecial?: boolean
  isAI?: boolean
}

interface Message {
  id: string
  senderId: string
  text: string
  time: string
  isRead: boolean
  type?: 'text' | 'transfer' | 'redpacket' | 'guarantee'
  transferData?: {
    amount: string
    currency: string
    note: string
    claimed?: boolean
  }
  redpacketData?: {
    totalAmount: string
    count: string
    currency: string
    note: string
    claimed?: number
    claimedBy?: string[]
  }
  guaranteeData?: {
    amount: string
    currency: string
    description: string
    type: 'buy' | 'sell'
    duration: string
    deposit: string
    status: 'pending' | 'accepted' | 'completed' | 'disputed' | 'cancelled'
    acceptedBy?: string
    createdAt: string
    expiresAt: string
    steps: Array<{
      id: string
      title: string
      status: 'pending' | 'current' | 'completed' | 'dispute'
      timestamp?: string
    }>
  }
}

export default function ChatPage() {
  const { theme, setTheme, language, setLanguage } = useTheme()
  const { showMobileChat, setShowMobileChat } = useChat()
  const router = useRouter()
  const isDark = theme === "dark"

  // All state hooks in consistent order
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("好友")
  const [selectedContact, setSelectedContact] = useState<string | null>("contact-1")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{[key: string]: Message[]}>({
    "contact-1": [
      { id: "1", senderId: "bot", text: "您好！我是您的专属交易助手，有什么可以帮您的吗？", time: "14:30", isRead: true, type: 'text' },
      { id: "2", senderId: "user", text: "最近BTC走势如何？", time: "14:32", isRead: true, type: 'text' }
    ]
  })
  const [favorites, setFavorites] = useState<string[]>(["contact-1", "contact-3"])
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [isMenuAnimating, setIsMenuAnimating] = useState(false)
  const [showUnreadIndicator, setShowUnreadIndicator] = useState(false)
  const [inputHeight, setInputHeight] = useState(140)
  const [isResizing, setIsResizing] = useState(false)
  const [showMemberSidebar, setShowMemberSidebar] = useState(false)
  const [memberSidebarAnimating, setMemberSidebarAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [profileTab, setProfileTab] = useState("动态")
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [groupInfoAnimating, setGroupInfoAnimating] = useState(false)
  const [groupInfoClosing, setGroupInfoClosing] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showRedPacketModal, setShowRedPacketModal] = useState(false)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferNote, setTransferNote] = useState("")
  const [redPacketAmount, setRedPacketAmount] = useState("")
  const [redPacketCount, setRedPacketCount] = useState("1")
  const [redPacketNote, setRedPacketNote] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("USDT")
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [showGuaranteeModal, setShowGuaranteeModal] = useState(false)
  const [guaranteeAmount, setGuaranteeAmount] = useState("")
  const [guaranteeDescription, setGuaranteeDescription] = useState("")
  const [guaranteeType, setGuaranteeType] = useState("buy") // buy or sell
  const [guaranteeDuration, setGuaranteeDuration] = useState("24") // hours
  const [guaranteeDeposit, setGuaranteeDeposit] = useState("5") // percentage
  
  // Mobile profile menu state
  const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false)
  
  // Mobile notification state
  const [showMobileNotificationDropdown, setShowMobileNotificationDropdown] = useState(false)
  const [notificationFilter, setNotificationFilter] = useState<"all" | "trading" | "system" | "social">("all")
  
  // Mobile language dropdown state
  const [showMobileLanguageDropdown, setShowMobileLanguageDropdown] = useState(false)
  
  // Contact info modal state
  const [showContactInfo, setShowContactInfo] = useState(false)
  
  // Escrow progress bar state
  const [showEscrowProgress, setShowEscrowProgress] = useState(false)
  
  // Escrow arbitration state
  const [escrowArbitrationState, setEscrowArbitrationState] = useState<{[key: string]: boolean}>({
    "escrow-state-4-3": true, // 状态4-3 争议仲裁
    "escrow-state-5-3": true  // 状态5-3 仲裁完成
  })

  // Mock escrow transaction data - 15 different states
  const escrowTransactionData = {
    // State 1-1: 合同起草
    "escrow-state-1-1": {
      transactionId: "TXN-1-1",
      amount: "10,000",
      currency: "USDT",
      type: "买入",
      progress: 1,
      stepStates: {
        step1State: 1,
        step2State: 1,
        step3State: 1,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同"
              case 2: return "已保存合同初稿"
              default: return "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "起草合同", type: "primary" }]
              case 2: return [{ label: "查看合同", type: "secondary" }]
              default: return [{ label: "起草合同", type: "primary" }]
            }
          }
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
              case 2: return "卖家已确认，等待买家确认合同"
              case 3: return "买家已确认，等待卖家确认合同"
              case 4: return "合同已生效"
              default: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认合同", type: "primary" }]
              case 2: return [{ label: "等待买家", type: "secondary" }]
              case 3: return [{ label: "等待卖家", type: "secondary" }]
              case 4: return []
              default: return [{ label: "确认合同", type: "primary" }]
            }
          }
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "等待甲方支付到担保账户"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认付款", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => {
            return []
          }
        }
      ],
      expiresAt: "16:30",
      buyer: "张三",
      seller: "您"
    },
    
    // State 1-2: 合同已保存
    "escrow-state-1-2": {
      transactionId: "TXN-1-2",
      amount: "8,000",
      currency: "USDT",
      type: "卖出",
      progress: 1,
      stepStates: {
        step1State: 2,
        step2State: 1,
        step3State: 1,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "14:25",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同"
              case 2: return "已保存合同初稿"
              default: return "已保存合同初稿"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "起草合同", type: "primary" }]
              case 2: return [{ label: "查看合同", type: "secondary" }]
              default: return [{ label: "查看合同", type: "secondary" }]
            }
          }
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
              case 2: return "卖家已确认，等待买家确认合同"
              case 3: return "买家已确认，等待卖家确认合同"
              case 4: return "合同已生效"
              default: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认合同", type: "primary" }]
              case 2: return [{ label: "等待买家", type: "secondary" }]
              case 3: return [{ label: "等待卖家", type: "secondary" }]
              case 4: return []
              default: return [{ label: "确认合同", type: "primary" }]
            }
          }
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "等待甲方支付到担保账户"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认付款", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => {
            return []
          }
        }
      ],
      expiresAt: "15:30",
      buyer: "李四",
      seller: "您"
    },

    // State 2-1: 双方确认
    "escrow-state-2-1": {
      transactionId: "TXN-2-1",
      amount: "15,000",
      currency: "USDT", 
      type: "买入",
      progress: 2,
      stepStates: {
        step1State: 2,
        step2State: 1,
        step3State: 1,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "14:20",
          getSubtitle: (state: number) => state === 2 ? "已保存合同初稿" : "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同",
          getActions: (state: number) => state === 2 ? [{ label: "查看合同", type: "secondary" }] : [{ label: "起草合同", type: "primary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
              case 2: return "卖家已确认，等待买家确认合同"
              case 3: return "买家已确认，等待卖家确认合同"
              case 4: return "合同已生效"
              default: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认合同", type: "primary" }]
              case 2: return [{ label: "等待买家", type: "secondary" }]
              case 3: return [{ label: "等待卖家", type: "secondary" }]
              case 4: return []
              default: return [{ label: "确认合同", type: "primary" }]
            }
          }
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "等待甲方支付到担保账户"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认付款", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => []
        }
      ],
      expiresAt: "16:00",
      buyer: "王五",
      seller: "您"
    },

    // State 2-2: 卖家已确认
    "escrow-state-2-2": {
      transactionId: "TXN-2-2",
      amount: "12,500",
      currency: "USDT",
      type: "卖出",
      progress: 2,
      stepStates: {
        step1State: 2,
        step2State: 2,
        step3State: 1,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "14:15",
          getSubtitle: (state: number) => state === 2 ? "已保存合同初稿" : "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同",
          getActions: (state: number) => state === 2 ? [{ label: "查看合同", type: "secondary" }] : [{ label: "起草合同", type: "primary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
              case 2: return "卖家已确认，等待买家确认合同"
              case 3: return "买家已确认，等待卖家确认合同"
              case 4: return "合同已生效"
              default: return "卖家已确认，等待买家确认合同"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认合同", type: "primary" }]
              case 2: return [{ label: "等待买家", type: "secondary" }]
              case 3: return [{ label: "等待卖家", type: "secondary" }]
              case 4: return []
              default: return [{ label: "等待买家", type: "secondary" }]
            }
          }
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "等待甲方支付到担保账户"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认付款", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => []
        }
      ],
      expiresAt: "15:45",
      buyer: "赵六",
      seller: "您"
    },

    // State 2-3: 买家已确认
    "escrow-state-2-3": {
      transactionId: "TXN-2-3",
      amount: "6,800",
      currency: "USDT",
      type: "买入",
      progress: 2,
      stepStates: {
        step1State: 2,
        step2State: 3,
        step3State: 1,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "14:10",
          getSubtitle: (state: number) => state === 2 ? "已保存合同初稿" : "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同",
          getActions: (state: number) => state === 2 ? [{ label: "查看合同", type: "secondary" }] : [{ label: "起草合同", type: "primary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
              case 2: return "卖家已确认，等待买家确认合同"
              case 3: return "买家已确认，等待卖家确认合同"
              case 4: return "合同已生效"
              default: return "买家已确认，等待卖家确认合同"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认合同", type: "primary" }]
              case 2: return [{ label: "等待买家", type: "secondary" }]
              case 3: return [{ label: "等待卖家", type: "secondary" }]
              case 4: return []
              default: return [{ label: "等待卖家", type: "secondary" }]
            }
          }
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "等待甲方支付到担保账户"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认付款", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => []
        }
      ],
      expiresAt: "15:20",
      buyer: "钱七",
      seller: "您"
    },

    // State 2-4: 合同生效
    "escrow-state-2-4": {
      transactionId: "TXN-2-4",
      amount: "20,000",
      currency: "USDT",
      type: "卖出",
      progress: 3,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 1,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "14:05",
          getSubtitle: (state: number) => state === 2 ? "已保存合同初稿" : "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同",
          getActions: (state: number) => state === 2 ? [{ label: "查看合同", type: "secondary" }] : [{ label: "起草合同", type: "primary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "14:05",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
              case 2: return "卖家已确认，等待买家确认合同"
              case 3: return "买家已确认，等待卖家确认合同"
              case 4: return "合同已生效"
              default: return "合同已生效"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认合同", type: "primary" }]
              case 2: return [{ label: "等待买家", type: "secondary" }]
              case 3: return [{ label: "等待卖家", type: "secondary" }]
              case 4: return []
              default: return []
            }
          }
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "等待甲方支付到担保账户"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认付款", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => []
        }
      ],
      expiresAt: "16:30",
      buyer: "孙八",
      seller: "您"
    },

    // State 3-1: 等待付款
    "escrow-state-3-1": {
      transactionId: "TXN-3-1",
      amount: "9,500",
      currency: "USDT",
      type: "买入",
      progress: 3,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 1,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "14:00",
          getSubtitle: (state: number) => state === 2 ? "已保存合同初稿" : "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同",
          getActions: (state: number) => state === 2 ? [{ label: "查看合同", type: "secondary" }] : [{ label: "起草合同", type: "primary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "14:00",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "双方共同确认合同内容以及付款时间，并点击确认按钮"
              case 2: return "卖家已确认，等待买家确认合同"
              case 3: return "买家已确认，等待卖家确认合同"
              case 4: return "合同已生效"
              default: return "合同已生效"
            }
          },
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "等待甲方支付到担保账户"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认付款", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => []
        }
      ],
      expiresAt: "16:15",
      buyer: "周九",
      seller: "您"
    },

    // State 3-2: 资金托管
    "escrow-state-3-2": {
      transactionId: "TXN-3-2",
      amount: "18,600",
      currency: "USDT",
      type: "卖出",
      progress: 3,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 2,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:55",
          getSubtitle: (state: number) => state === 2 ? "已保存合同初稿" : "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同",
          getActions: (state: number) => state === 2 ? [{ label: "查看合同", type: "secondary" }] : [{ label: "起草合同", type: "primary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:55",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "资金已托管，等待卖家交付"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "确认交付", type: "primary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => []
        }
      ],
      expiresAt: "15:55",
      buyer: "吴十",
      seller: "您"
    },

    // State 3-3: 已交付
    "escrow-state-3-3": {
      transactionId: "TXN-3-3",
      amount: "7,200",
      currency: "USDT",
      type: "买入",
      progress: 4,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 3,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:50",
          getSubtitle: (state: number) => state === 2 ? "已保存合同初稿" : "把你们的交易内容在担保群内输入，然后点击起草合同，让AI助手帮你写合同",
          getActions: (state: number) => state === 2 ? [{ label: "查看合同", type: "secondary" }] : [{ label: "起草合同", type: "primary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:50",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "completed", 
          timestamp: "13:50",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待甲方支付到担保账户"
              case 2: return "资金已托管，等待卖家交付"
              case 3: return "卖家已交付，等待买家确认"
              default: return "卖家已交付，等待买家确认"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认付款", type: "primary" }]
              case 2: return [{ label: "确认交付", type: "primary" }]
              case 3: return [{ label: "等待确认", type: "secondary" }]
              default: return [{ label: "等待确认", type: "secondary" }]
            }
          }
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "等待买家确认交付标的，乙方将收到款项"
              case 2: return "买家已确认"
              case 3: return "争议中，等待仲裁"
              case 4: return "买家申请取消交易，等待卖家确认"
              case 5: return "卖家申请取消交易，等待买家确认"
              default: return "等待买家确认交付标的，乙方将收到款项"
            }
          },
          getActions: (state: number) => {
            switch(state) {
              case 1: return [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
              case 2: return []
              case 3: return [{ label: "查看仲裁", type: "secondary" }]
              case 4: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              case 5: return [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
              default: return [{ label: "确认收款", type: "success" }]
            }
          }
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => {
            switch(state) {
              case 1: return "交易已顺利完成，卖家已收到款项"
              case 2: return "交易已取消，担保金已回退给买家"
              case 3: return "仲裁结果：交易完成，买家收到款项"
              case 4: return "仲裁结果：交易取消，已退款给卖家"
              default: return "交易已顺利完成，卖家已收到款项"
            }
          },
          getActions: (state: number) => []
        }
      ],
      expiresAt: "15:20",
      buyer: "郑十一",
      seller: "您"
    },

    // State 4-1: 等待确认
    "escrow-state-4-1": {
      transactionId: "TXN-4-1",
      amount: "11,300",
      currency: "USDT",
      type: "卖出",
      progress: 4,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 3,
        step4State: 1,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:45",
          getSubtitle: (state: number) => "已保存合同初稿",
          getActions: (state: number) => [{ label: "查看合同", type: "secondary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:45",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "completed", 
          timestamp: "13:45",
          getSubtitle: (state: number) => "卖家已交付，等待买家确认",
          getActions: (state: number) => [{ label: "等待确认", type: "secondary" }]
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => "等待买家确认交付标的，乙方将收到款项",
          getActions: (state: number) => [{ label: "确认收款", type: "success" }, { label: "申请仲裁", type: "danger" }]
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => "交易已顺利完成，卖家已收到款项",
          getActions: (state: number) => []
        }
      ],
      expiresAt: "15:45",
      buyer: "冯十二",
      seller: "您"
    },

    // State 4-2: 买家确认
    "escrow-state-4-2": {
      transactionId: "TXN-4-2",
      amount: "16,800",
      currency: "USDT",
      type: "买入",
      progress: 5,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 3,
        step4State: 2,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:40",
          getSubtitle: (state: number) => "已保存合同初稿",
          getActions: (state: number) => [{ label: "查看合同", type: "secondary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:40",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "completed", 
          timestamp: "13:40",
          getSubtitle: (state: number) => "卖家已交付，等待买家确认",
          getActions: (state: number) => [{ label: "等待确认", type: "secondary" }]
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "completed", 
          timestamp: "13:40",
          getSubtitle: (state: number) => "买家已确认",
          getActions: (state: number) => []
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => "交易已顺利完成，卖家已收到款项",
          getActions: (state: number) => []
        }
      ],
      expiresAt: "已完成",
      buyer: "陈十三",
      seller: "您"
    },

    // State 4-3: 争议仲裁
    "escrow-state-4-3": {
      transactionId: "TXN-4-3",
      amount: "13,900",
      currency: "USDT",
      type: "卖出",
      progress: 4,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 3,
        step4State: 3,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:35",
          getSubtitle: (state: number) => "已保存合同初稿",
          getActions: (state: number) => [{ label: "查看合同", type: "secondary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:35",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "completed", 
          timestamp: "13:35",
          getSubtitle: (state: number) => "卖家已交付，等待买家确认",
          getActions: (state: number) => [{ label: "等待确认", type: "secondary" }]
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "current", 
          timestamp: "",
          getSubtitle: (state: number) => "争议中，等待仲裁",
          getActions: (state: number) => [{ label: "查看仲裁", type: "secondary" }]
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "pending", 
          timestamp: "",
          getSubtitle: (state: number) => "仲裁结果：交易完成，买家收到款项",
          getActions: (state: number) => []
        }
      ],
      expiresAt: "仲裁中",
      buyer: "褚十四",
      seller: "您"
    },

    // State 5-1: 交易完成
    "escrow-state-5-1": {
      transactionId: "TXN-5-1",
      amount: "25,000",
      currency: "USDT",
      type: "买入",
      progress: 5,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 3,
        step4State: 2,
        step5State: 1
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:30",
          getSubtitle: (state: number) => "已保存合同初稿",
          getActions: (state: number) => [{ label: "查看合同", type: "secondary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:30",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "completed", 
          timestamp: "13:30",
          getSubtitle: (state: number) => "卖家已交付，等待买家确认",
          getActions: (state: number) => [{ label: "等待确认", type: "secondary" }]
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "completed", 
          timestamp: "13:30",
          getSubtitle: (state: number) => "买家已确认",
          getActions: (state: number) => []
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "completed", 
          timestamp: "13:30",
          getSubtitle: (state: number) => "交易已顺利完成，卖家已收到款项",
          getActions: (state: number) => []
        }
      ],
      expiresAt: "已完成",
      buyer: "卫十五",
      seller: "您"
    },

    // State 5-2: 交易取消
    "escrow-state-5-2": {
      transactionId: "TXN-5-2",
      amount: "4,500",
      currency: "USDT",
      type: "卖出",
      progress: 5,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 1,
        step4State: 4,
        step5State: 2
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:25",
          getSubtitle: (state: number) => "已保存合同初稿",
          getActions: (state: number) => [{ label: "查看合同", type: "secondary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:25",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "completed", 
          timestamp: "13:25",
          getSubtitle: (state: number) => "等待甲方支付到担保账户",
          getActions: (state: number) => [{ label: "确认付款", type: "primary" }]
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "completed", 
          timestamp: "13:25",
          getSubtitle: (state: number) => "买家申请取消交易，等待卖家确认",
          getActions: (state: number) => [{ label: "确认取消", type: "danger" }, { label: "拒绝取消", type: "secondary" }]
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "completed", 
          timestamp: "13:25",
          getSubtitle: (state: number) => "交易已取消，担保金已回退给买家",
          getActions: (state: number) => []
        }
      ],
      expiresAt: "已取消",
      buyer: "蒋十六",
      seller: "您"
    },

    // State 5-3: 仲裁完成
    "escrow-state-5-3": {
      transactionId: "TXN-5-3",
      amount: "22,700",
      currency: "USDT",
      type: "买入",
      progress: 5,
      stepStates: {
        step1State: 2,
        step2State: 4,
        step3State: 3,
        step4State: 3,
        step5State: 3
      },
      steps: [
        { 
          id: 1, 
          mainTitle: "拟定合同",
          status: "completed", 
          timestamp: "13:20",
          getSubtitle: (state: number) => "已保存合同初稿",
          getActions: (state: number) => [{ label: "查看合同", type: "secondary" }]
        },
        { 
          id: 2, 
          mainTitle: "确定合同",
          status: "completed", 
          timestamp: "13:20",
          getSubtitle: (state: number) => "合同已生效",
          getActions: (state: number) => []
        },
        { 
          id: 3, 
          mainTitle: "付款担保金",
          status: "completed", 
          timestamp: "13:20",
          getSubtitle: (state: number) => "卖家已交付，等待买家确认",
          getActions: (state: number) => [{ label: "等待确认", type: "secondary" }]
        },
        { 
          id: 4, 
          mainTitle: "买家确认",
          status: "completed", 
          timestamp: "13:20",
          getSubtitle: (state: number) => "争议中，等待仲裁",
          getActions: (state: number) => [{ label: "查看仲裁", type: "secondary" }]
        },
        { 
          id: 5, 
          mainTitle: "交易完成",
          status: "completed", 
          timestamp: "13:20",
          getSubtitle: (state: number) => "仲裁结果：交易完成，买家收到款项",
          getActions: (state: number) => []
        }
      ],
      expiresAt: "仲裁完成",
      buyer: "沈十七",
      seller: "您"
    }
  }

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleToggleLanguage = () => {
    setShowMobileLanguageDropdown(true)
  }
  
  const handleLanguageSelect = (selectedLanguage: "zh" | "en") => {
    console.log('Current language:', language)
    console.log('Switching to:', selectedLanguage)
    setLanguage(selectedLanguage)
    setShowMobileLanguageDropdown(false)
  }
  
  // All refs
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const addMenuRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)
  const currencyDropdownRef = useRef<HTMLDivElement>(null)

  // Handle resize
  const handleMouseDown = useCallback(() => {
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    const newHeight = Math.max(140, Math.min(300, window.innerHeight - e.clientY + 50))
    setInputHeight(newHeight)
  }, [isResizing])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  // Handle input area interaction
  const handleTextareaMouseDown = (e: React.MouseEvent) => {
    if (e.target === resizeRef.current) {
      e.preventDefault()
      setIsResizing(true)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle send message
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!message.trim() || !selectedContact) return
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "user",
      text: message,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      type: 'text'
    }
    
    setMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage]
    }))
    
    console.log(`发送消息到 ${selectedContact}: ${message}`)
    setMessage("")
  }

  // Handle add menu
  const handleShowMenu = () => {
    setShowAddMenu(true)
    setTimeout(() => setIsMenuAnimating(true), 10)
  }

  const handleCloseMenu = () => {
    setIsMenuAnimating(false)
    setTimeout(() => setShowAddMenu(false), 150)
  }

  // Screen size detection for modal animation
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setScreenWidth(width)
      setIsMobile(width < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Handle group info modal
  const handleOpenGroupInfo = () => {
    if (groupInfoClosing) return
    setGroupInfoClosing(false)
    setShowGroupInfo(true)
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setGroupInfoAnimating(true)
      })
    })
  }

  const handleCloseGroupInfo = () => {
    if (groupInfoClosing) return
    setGroupInfoClosing(true)
    setGroupInfoAnimating(false)
    
    setTimeout(() => {
      setShowGroupInfo(false)
      setGroupInfoClosing(false)
    }, 400)
  }

  // Handle mount and mobile detection
  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Reset selected contact when tab changes
  useEffect(() => {
    setSelectedContact(null)
  }, [activeTab])

  // Prevent body scroll when mobile chat is open
  useEffect(() => {
    if (isMobile && showMobileChat) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobile, showMobileChat])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        handleCloseMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Available cryptocurrencies
  const currencies = [
    { symbol: "USDT", name: "Tether", icon: "₮", color: "bg-green-500" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
    { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "bg-blue-500" },
    { symbol: "BNB", name: "Binance Coin", icon: "B", color: "bg-yellow-500" },
    { symbol: "ADA", name: "Cardano", icon: "₳", color: "bg-blue-600" },
    { symbol: "SOL", name: "Solana", icon: "◎", color: "bg-purple-500" }
  ]

  // Handle transfer/red packet functions
  const handleTransfer = () => {
    if (!transferAmount || !selectedContact) return
    
    const newMessage: Message = {
      id: `transfer-${Date.now()}`,
      senderId: "user",
      text: "",
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      type: 'transfer',
      transferData: {
        amount: transferAmount,
        currency: selectedCurrency,
        note: transferNote,
        claimed: false
      }
    }
    
    console.log("Transfer:", newMessage.transferData)
    
    // Add message to chat
    setMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage]
    }))
    
    setShowTransferModal(false)
    setTransferAmount("")
    setTransferNote("")
  }

  // Handle arbitration request
  const handleArbitrationRequest = (escrowId: string) => {
    setEscrowArbitrationState(prev => ({
      ...prev,
      [escrowId]: true
    }))
    console.log(`申请仲裁: ${escrowId}`)
  }

  // Handle confirm payment
  const handleConfirmPayment = (escrowId: string) => {
    // Logic to complete transaction directly
    console.log(`确认收款: ${escrowId}`)
  }

  const handleRedPacket = () => {
    if (!redPacketAmount || !redPacketCount || !selectedContact) return
    
    const newMessage: Message = {
      id: `redpacket-${Date.now()}`,
      senderId: "user", 
      text: "",
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      type: 'redpacket',
      redpacketData: {
        totalAmount: redPacketAmount,
        count: redPacketCount,
        currency: selectedCurrency,
        note: redPacketNote || "感谢支持，空投奖励！",
        claimed: 0,
        claimedBy: []
      }
    }
    
    console.log("Red Packet:", newMessage.redpacketData)
    
    // Add message to chat
    setMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage]
    }))
    
    setShowRedPacketModal(false)
    setRedPacketAmount("")
    setRedPacketCount("1")
    setRedPacketNote("")
  }

  const handleClaimTransfer = (messageId: string) => {
    console.log("Claiming transfer:", messageId)
    
    if (!selectedContact) return
    
    setMessages(prev => ({
      ...prev,
      [selectedContact]: prev[selectedContact]?.map(msg => 
        msg.id === messageId && msg.transferData 
          ? { ...msg, transferData: { ...msg.transferData, claimed: true }}
          : msg
      ) || []
    }))
  }

  const handleClaimRedPacket = (messageId: string) => {
    console.log("Claiming red packet:", messageId)
    
    if (!selectedContact) return
    
    setMessages(prev => ({
      ...prev,
      [selectedContact]: prev[selectedContact]?.map(msg => 
        msg.id === messageId && msg.redpacketData 
          ? { 
              ...msg, 
              redpacketData: { 
                ...msg.redpacketData, 
                claimed: (msg.redpacketData.claimed || 0) + 1,
                claimedBy: [...(msg.redpacketData.claimedBy || []), "current-user"]
              }
            }
          : msg
      ) || []
    }))
  }

  // Handle guarantee transaction
  const handleGuaranteeTransaction = () => {
    if (!guaranteeAmount || !guaranteeDescription || !selectedContact) return
    
    const now = new Date()
    const expires = new Date(now.getTime() + parseInt(guaranteeDuration) * 60 * 60 * 1000)
    
    const newMessage: Message = {
      id: `guarantee-${Date.now()}`,
      senderId: "user",
      text: "",
      time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      type: 'guarantee',
      guaranteeData: {
        amount: guaranteeAmount,
        currency: selectedCurrency,
        description: guaranteeDescription,
        type: guaranteeType,
        duration: guaranteeDuration,
        deposit: guaranteeDeposit,
        status: 'pending',
        createdAt: now.toISOString(),
        expiresAt: expires.toISOString(),
        steps: [
          { 
            id: 'step1', 
            title: '生成合同', 
            status: 'completed', 
            timestamp: now.toISOString(),
            actions: [
              { label: "查看合同", type: "primary" },
              { label: "下载合同", type: "secondary" }
            ]
          },
          { 
            id: 'step2', 
            title: '双方签名确定合同以及确定付款时间', 
            status: 'current',
            actions: [
              { label: "签名合同", type: "primary" },
              { label: "设置付款时间", type: "secondary" }
            ]
          },
          { 
            id: 'step3', 
            title: '等待甲方付款到担保账户', 
            status: 'pending',
            actions: [
              { label: "确认付款", type: "primary" },
              { label: "催促付款", type: "secondary" }
            ]
          },
          { 
            id: 'step4', 
            title: '等待乙方交付', 
            status: 'pending',
            actions: [
              { label: "确认收到", type: "primary" },
              { label: "联系卖方", type: "secondary" }
            ]
          },
          { 
            id: 'step5', 
            title: '等待甲方确认释放担保/申请争议仲裁', 
            status: 'pending',
            actions: [
              { label: "确认释放", type: "primary" },
              { label: "申请仲裁", type: "danger" }
            ]
          },
          { 
            id: 'step6', 
            title: '等待仲裁/确认付款，乙方将收到款项', 
            status: 'pending',
            actions: [
              { label: "查看仲裁", type: "primary" },
              { label: "确认完成", type: "success" }
            ]
          }
        ]
      }
    }
    
    setMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage]
    }))
    
    // Reset form
    setGuaranteeAmount("")
    setGuaranteeDescription("")
    setGuaranteeType("buy")
    setGuaranteeDuration("24")
    setGuaranteeDeposit("5")
    setShowGuaranteeModal(false)
  }

  const handleAcceptGuarantee = (messageId: string) => {
    if (!selectedContact) return
    
    setMessages(prev => ({
      ...prev,
      [selectedContact]: prev[selectedContact]?.map(msg => 
        msg.id === messageId && msg.guaranteeData 
          ? { 
              ...msg, 
              guaranteeData: { 
                ...msg.guaranteeData, 
                status: 'accepted',
                acceptedBy: 'current-user',
                steps: msg.guaranteeData.steps.map(step => 
                  step.id === 'step2' 
                    ? { ...step, status: 'completed', timestamp: new Date().toISOString() }
                    : step.id === 'step3'
                    ? { ...step, status: 'current' }
                    : step
                )
              }
            }
          : msg
      ) || []
    }))
  }

  const handleCompleteGuaranteeStep = (messageId: string, stepId: string) => {
    if (!selectedContact) return
    
    setMessages(prev => ({
      ...prev,
      [selectedContact]: prev[selectedContact]?.map(msg => 
        msg.id === messageId && msg.guaranteeData 
          ? { 
              ...msg, 
              guaranteeData: { 
                ...msg.guaranteeData, 
                status: stepId === 'step6' ? 'completed' : msg.guaranteeData.status,
                steps: msg.guaranteeData.steps.map((step, index) => {
                  if (step.id === stepId) {
                    return { ...step, status: 'completed', timestamp: new Date().toISOString() }
                  }
                  if (step.id === `step${parseInt(stepId.slice(-1)) + 1}`) {
                    return { ...step, status: 'current' }
                  }
                  return step
                })
              }
            }
          : msg
      ) || []
    }))
  }

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"
  const tabs = ["好友", "群组", "担保", "通讯录"]

  // Contact data for different tabs
  const friendContacts: Contact[] = [
    {
      id: "friend-1",
      name: "张三",
      avatar: "👨‍💼",
      lastMessage: "今天BTC走势不错",
      time: "10:30",
      unread: 1,
      isOnline: true,
      isActive: true,
    },
    {
      id: "friend-2",
      name: "李四",
      avatar: "👩‍💼",
      lastMessage: "我刚看了那个分析报告",
      time: "09:45",
      isOnline: true,
    },
    {
      id: "friend-3",
      name: "王五",
      avatar: "👨‍🎓",
      lastMessage: "明天见面聊聊",
      time: "昨天",
      isOnline: false,
    },
  ]

  const groupContacts: Contact[] = [
    {
      id: "group-1",
      name: "BTC交易群",
      avatar: "₿",
      lastMessage: "张三: 今天BTC走势如何？",
      time: "09:15",
      unread: 5,
      isOnline: true,
    },
    {
      id: "group-2",
      name: "USDT交易讨论",
      avatar: "💰",
      lastMessage: "李四: 稳定币市场分析",
      time: "08:30",
      unread: 3,
      isOnline: true,
    },
    {
      id: "group-3",
      name: "投资策略群",
      avatar: "📈",
      lastMessage: "王五: 下周市场预测",
      time: "昨天",
      isOnline: false,
    },
  ]

  const escrowContacts: Contact[] = [
    {
      id: "escrow-state-1-1",
      name: "状态1-1 合同起草",
      avatar: "✏️",
      lastMessage: "点击起草合同开始交易",
      time: "14:30",
      unread: 1,
      isOnline: true,
    },
    {
      id: "escrow-state-1-2",
      name: "状态1-2 合同已保存",
      avatar: "📝",
      lastMessage: "合同初稿已保存完成",
      time: "14:25",
      unread: 0,
      isOnline: true,
    },
    {
      id: "escrow-state-2-1",
      name: "状态2-1 双方确认",
      avatar: "👥",
      lastMessage: "等待双方确认合同内容",
      time: "14:20",
      unread: 1,
      isOnline: true,
    },
    {
      id: "escrow-state-2-2",
      name: "状态2-2 卖家已确认",
      avatar: "👤",
      lastMessage: "卖家已确认，等待买家",
      time: "14:15",
      unread: 0,
      isOnline: true,
    },
    {
      id: "escrow-state-2-3",
      name: "状态2-3 买家已确认",
      avatar: "👨‍💼",
      lastMessage: "买家已确认，等待卖家",
      time: "14:10",
      unread: 1,
      isOnline: true,
    },
    {
      id: "escrow-state-2-4",
      name: "状态2-4 合同生效",
      avatar: "✅",
      lastMessage: "合同已生效，进入下一步",
      time: "14:05",
      unread: 0,
      isOnline: true,
    },
    {
      id: "escrow-state-3-1",
      name: "状态3-1 等待付款",
      avatar: "⏳",
      lastMessage: "等待甲方付款到担保账户",
      time: "14:00",
      unread: 1,
      isOnline: true,
    },
    {
      id: "escrow-state-3-2",
      name: "状态3-2 资金托管",
      avatar: "🏦",
      lastMessage: "资金已托管，等待交付",
      time: "13:55",
      unread: 0,
      isOnline: true,
    },
    {
      id: "escrow-state-3-3",
      name: "状态3-3 已交付",
      avatar: "📦",
      lastMessage: "卖家已交付，等待确认",
      time: "13:50",
      unread: 1,
      isOnline: true,
    },
    {
      id: "escrow-state-4-1",
      name: "状态4-1 等待确认",
      avatar: "⌛",
      lastMessage: "等待买家确认交付标的",
      time: "13:45",
      unread: 0,
      isOnline: true,
    },
    {
      id: "escrow-state-4-2",
      name: "状态4-2 买家确认",
      avatar: "✔️",
      lastMessage: "买家已确认收到",
      time: "13:40",
      unread: 1,
      isOnline: true,
    },
    {
      id: "escrow-state-4-3",
      name: "状态4-3 争议仲裁",
      avatar: "⚖️",
      lastMessage: "争议中，等待仲裁",
      time: "13:35",
      unread: 2,
      isOnline: true,
    },
    {
      id: "escrow-state-5-1",
      name: "状态5-1 交易完成",
      avatar: "🎉",
      lastMessage: "交易已顺利完成",
      time: "13:30",
      unread: 0,
      isOnline: false,
    },
    {
      id: "escrow-state-5-2",
      name: "状态5-2 交易取消",
      avatar: "❌",
      lastMessage: "交易已取消退款",
      time: "13:25",
      unread: 0,
      isOnline: false,
    },
    {
      id: "escrow-state-5-3",
      name: "状态5-3 仲裁完成",
      avatar: "🏛️",
      lastMessage: "仲裁结果已确定",
      time: "13:20",
      unread: 1,
      isOnline: false,
    },
  ]

  const addressBookContacts: Contact[] = [
    // 新好友请求
    {
      id: "friend-request-1",
      name: "新好友请求",
      avatar: "👋",
      lastMessage: "有 2 个新的好友请求",
      time: "刚刚",
      unread: 2,
      isOnline: true,
      isSpecial: true,
    },
    // AI助手
    {
      id: "ai-escrow",
      name: "AI担保助手",
      avatar: "🛡️",
      lastMessage: "我可以帮您进行安全的担保交易",
      time: "在线",
      isOnline: true,
      isAI: true,
    },
    {
      id: "ai-trading",
      name: "AI交易助手",
      avatar: "🤖",
      lastMessage: "为您提供专业的交易建议",
      time: "在线",
      isOnline: true,
      isAI: true,
    },
    {
      id: "ai-customer",
      name: "AI客服助手",
      avatar: "👩‍💻",
      lastMessage: "24小时为您服务",
      time: "在线",
      isOnline: true,
      isAI: true,
    },
    // 我的好友 (按字母排序)
    {
      id: "friend-alex",
      name: "Alex Chen",
      avatar: "👨‍💼",
      lastMessage: "明天的会议改时间了",
      time: "15:30",
      isOnline: true,
    },
    {
      id: "friend-bob",
      name: "Bob Wang",
      avatar: "👨‍🎓",
      lastMessage: "那个项目进展如何？",
      time: "昨天",
      isOnline: false,
    },
    {
      id: "friend-charlie",
      name: "Charlie Li",
      avatar: "👨‍🔬",
      lastMessage: "新的投资机会",
      time: "2天前",
      isOnline: true,
    },
    {
      id: "friend-david",
      name: "David Zhang",
      avatar: "👨‍💻",
      lastMessage: "技术分析报告已发送",
      time: "3天前",
      isOnline: false,
    },
    {
      id: "friend-eric",
      name: "Eric Liu",
      avatar: "👨‍🏫",
      lastMessage: "下周聚餐安排",
      time: "1周前",
      isOnline: true,
    },
  ]

  // Get contacts based on active tab
  const getContactsByTab = () => {
    switch (activeTab) {
      case "好友":
        return friendContacts
      case "群组":
        return groupContacts
      case "担保":
        return escrowContacts
      case "通讯录":
        return addressBookContacts
      default:
        return friendContacts
    }
  }

  const contacts = getContactsByTab()

  // Friend request data
  const friendRequests = [
    {
      id: "req-1",
      name: "张伟",
      avatar: "👨‍💼",
      message: "你好，我是通过共同好友李明找到你的，希望能加你为好友。",
      mutualFriends: ["李明", "王芳"],
      time: "2小时前",
      status: "pending"
    },
    {
      id: "req-2", 
      name: "刘小红",
      avatar: "👩‍💼",
      message: "我们在BTC交易群里聊过，希望能进一步交流投资心得。",
      mutualFriends: ["陈浩"],
      time: "5小时前",
      status: "pending"
    },
    {
      id: "req-3",
      name: "王强",
      avatar: "👨‍🎓",
      message: "看到您在投资群里的分享很有见地，希望能交流学习。",
      mutualFriends: ["李四", "张三"],
      time: "昨天",
      status: "accepted"
    },
    {
      id: "req-4",
      name: "李娜",
      avatar: "👩‍🏫",
      message: "您好，我想了解更多关于区块链投资的信息。",
      mutualFriends: ["王五"],
      time: "2天前",
      status: "rejected"
    }
  ]

  // Contact data for chat display (use state messages for actual messaging)

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addMenuItems = [
    { icon: User, label: "添加好友", action: () => console.log("添加好友") },
    { icon: Users, label: "创建群聊", action: () => console.log("创建群聊") },
    { icon: Shield, label: "担保交易", action: () => setShowGuaranteeModal(true) },
    { icon: BookOpen, label: "通讯录", action: () => console.log("通讯录") },
  ]

  return (
    <div 
      className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}
      style={{
        transform: showGroupInfo && screenWidth >= 1440 && groupInfoAnimating 
          ? 'translateX(-384px)' 
          : 'translateX(0)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
    >
      {/* Contact List Sidebar */}
      <div 
        className={`${cardStyle} flex flex-col`}
        style={isMobile ? { width: '100vw', minWidth: '100vw', maxWidth: '100vw' } : { minWidth: '416px', maxWidth: '500px', width: 'clamp(416px, 30vw, 500px)' }}
      >
        {/* Search and Add Button - Desktop / Mobile Header */}
        {isMobile ? (
          /* Mobile Header with Avatar and Function Icons */
          <div className="flex items-center justify-between p-4">
            {/* Left: Personal Avatar */}
            <div className="flex items-center">
              <button
                onClick={() => setShowMobileProfileMenu(true)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ring-2 transition-all ${
                  isDark 
                    ? "bg-white/20 ring-white/30 hover:bg-white/30 text-white" 
                    : "bg-gray-800/80 ring-gray-600/50 hover:bg-gray-700 text-white"
                }`}
              >
                <User className="h-5 w-5" />
              </button>
            </div>

            {/* Right: Function Icons */}
            <div className="flex items-center space-x-3">
              {/* Customer Service - Hidden on Mobile */}
              <button className={`hidden p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}>
                <Phone className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-700"}`} />
              </button>
              
              {/* Language Switch */}
              <button 
                onClick={handleToggleLanguage}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}
              >
                <svg className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-700"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
              
              {/* Theme Switch */}
              <button 
                onClick={handleToggleTheme}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}
              >
                {isDark ? (
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              
              {/* Notifications */}
              <button 
                onClick={() => setShowMobileNotificationDropdown(true)}
                className={`p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"} relative`}
              >
                <Bell className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-700"}`} />
                {/* Notification badge */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">3</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Desktop Search and Add Button */
          <div className="flex items-center gap-2 p-4">
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="搜索联系人"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm transition-colors ${
                  isDark
                    ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400 focus:border-[#00D4AA]"
                    : "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
                } focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/20`}
              />
            </div>

            {/* Add Button Menu */}
            <div className="relative" ref={addMenuRef}>
              <button
                onClick={showAddMenu ? handleCloseMenu : handleShowMenu}
                className={`p-2 rounded-lg border transition-all duration-200 ${
                  isDark
                    ? "bg-[#252842] border-[#3a3d4a] text-white hover:bg-[#3a3d4a] hover:scale-105"
                    : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200 hover:scale-105"
                } ${showAddMenu ? "scale-105" : ""}`}
              >
                <Plus className={`h-4 w-4 transition-transform duration-200 ${showAddMenu ? "rotate-45" : ""}`} />
              </button>

              {showAddMenu && (
                <div
                  className={`absolute top-full right-0 mt-2 w-56 ${cardStyle} rounded-lg shadow-lg z-50 transition-all duration-150 origin-top-right ${
                    isMenuAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <div className="py-2">
                    {addMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action()
                          handleCloseMenu()
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                          isDark
                            ? "hover:bg-[#252842] text-gray-300"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mx-4 mb-4">
          <div className="relative">
            <div className={`flex ${isDark ? "bg-[#252842]" : "bg-gray-200"} rounded-md p-1`}>
              {/* Sliding background */}
              <div
                className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${
                  isDark ? "bg-white" : "bg-black"
                }`}
                style={{
                  width: `${100 / tabs.length}%`,
                  left: `${(tabs.indexOf(activeTab) * 100) / tabs.length}%`
                }}
              />

              {/* Tab buttons */}
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 flex-1 py-2 text-xs font-medium rounded-md transition-colors duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? isDark
                        ? "text-black"
                        : "text-white"
                      : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          {activeTab === "通讯录" ? (
            // Address Book with sections
            <div className="space-y-4">
              {/* Friend Requests Section */}
              <div>
                <h4 className={`text-xs font-medium mb-2 px-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  新的朋友
                </h4>
                {filteredContacts.filter(contact => contact.isSpecial).map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      if (isMobile) {
                        // 跳转到好友请求页面而不是聊天页面
                        router.push("/friend-requests")
                      } else {
                        setSelectedContact(contact.id)
                      }
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842]"
                          : "bg-gray-100"
                        : isDark
                          ? "hover:bg-[#252842]/50"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-lg font-bold">
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-400">{contact.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{contact.unread}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* AI Assistants Section */}
              <div>
                <h4 className={`text-xs font-medium mb-2 px-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  AI助手
                </h4>
                {filteredContacts.filter(contact => contact.isAI).map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact.id)
                      if (isMobile) {
                        setShowMobileChat(true)
                      }
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842]"
                          : "bg-gray-100"
                        : isDark
                          ? "hover:bg-[#252842]/50"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg font-bold">
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-400">{contact.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{contact.unread}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Friends Section */}
              <div>
                <h4 className={`text-xs font-medium mb-2 px-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  我的好友
                </h4>
                {filteredContacts.filter(contact => !contact.isSpecial && !contact.isAI).map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact.id)
                      if (isMobile) {
                        setShowMobileChat(true)
                      }
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842]"
                          : "bg-gray-100"
                        : isDark
                          ? "hover:bg-[#252842]/50"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-400">{contact.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{contact.unread}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Regular contact list for other tabs
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact.id)
                    if (isMobile) {
                      setShowMobileChat(true)
                    }
                  }}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                    selectedContact === contact.id
                      ? isDark
                        ? "bg-[#252842]"
                        : "bg-gray-100"
                      : isDark
                        ? "hover:bg-[#252842]/50"
                        : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                      {contact.avatar}
                    </div>
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                        {contact.name}
                      </h3>
                      <span className="text-xs text-gray-400">{contact.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{contact.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact && !isMobile ? (
        <div className="flex-1 flex flex-col">
          {selectedContact === "friend-request-1" ? (
            // Friend Request List View
            <>
              {/* Search Box */}
              <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}>
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="搜索好友请求"
                    className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm transition-colors ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400 focus:border-[#00D4AA]"
                        : "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
                    } focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/20`}
                  />
                </div>
              </div>

              {/* Friend Request List */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`${cardStyle} p-4 rounded-lg`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                          {request.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              {request.name}
                            </h3>
                          </div>
                          
                          <p className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {request.message}
                          </p>
                          
                          {request.mutualFriends.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs text-gray-400 mb-1">
                                共同好友: {request.mutualFriends.join(", ")}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Status and Action Buttons */}
                        <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                          {request.status === "pending" && (
                            <>
                              <div className="flex space-x-2">
                                <button className="bg-[#00D4AA] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#00B394] transition-colors whitespace-nowrap">
                                  接受
                                </button>
                                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                  isDark 
                                    ? "bg-[#252842] text-gray-300 hover:bg-[#3a3d4a]" 
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>
                                  拒绝
                                </button>
                              </div>
                              <span className="text-xs text-gray-400">{request.time}</span>
                            </>
                          )}
                          
                          {request.status === "accepted" && (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-green-500 font-medium">已接受</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-xs text-gray-400">{request.time}</span>
                            </>
                          )}
                          
                          {request.status === "rejected" && (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-red-500 font-medium">已拒绝</span>
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              </div>
                              <span className="text-xs text-gray-400">{request.time}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : selectedContact === "ai-escrow" || selectedContact === "ai-trading" || selectedContact === "ai-customer" ? (
            // AI Assistant Detail View
            <>
              {(() => {
                const aiData = {
                  "ai-escrow": {
                    name: "AI担保助手",
                    avatar: "🛡️",
                    gradient: "from-blue-500 to-cyan-500",
                    description: "专业的担保交易助手，为您的交易提供安全保障",
                    features: [
                      "🔒 安全托管资金",
                      "📋 智能合约生成",
                      "⚖️ 争议调解服务",
                      "📊 交易风险评估",
                      "🕒 24/7 交易监控",
                      "💼 多币种支持"
                    ],
                    capabilities: "我可以帮助您创建安全的担保交易，监控交易过程，并在出现争议时提供调解服务。所有交易都受到智能合约保护，确保双方利益。"
                  },
                  "ai-trading": {
                    name: "AI交易助手", 
                    avatar: "🤖",
                    gradient: "from-green-500 to-emerald-500",
                    description: "智能交易分析师，提供专业的市场分析和交易建议",
                    features: [
                      "📈 实时市场分析",
                      "🎯 个性化交易策略",
                      "⚠️ 风险管理建议",
                      "📱 交易信号推送",
                      "📊 投资组合优化",
                      "🔍 技术指标分析"
                    ],
                    capabilities: "我拥有强大的市场分析能力，可以为您提供实时的价格预测、技术分析和交易建议。基于您的风险偏好定制专属交易策略。"
                  },
                  "ai-customer": {
                    name: "AI客服助手",
                    avatar: "👩‍💻", 
                    gradient: "from-purple-500 to-pink-500",
                    description: "贴心的客户服务专家，随时为您解答疑问",
                    features: [
                      "❓ 常见问题解答",
                      "🔧 技术支持服务",
                      "📞 人工客服转接",
                      "📝 意见反馈收集",
                      "🎓 平台使用教程",
                      "🌐 多语言支持"
                    ],
                    capabilities: "我可以快速解答您的疑问，提供平台使用指导，处理技术问题，并在需要时为您转接人工客服。致力于为您提供最佳的用户体验。"
                  }
                }
                
                const currentAI = aiData[selectedContact as keyof typeof aiData]
                
                return (
                  <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
                    <div className="max-w-md w-full text-center space-y-8">
                      {/* AI Avatar and Name */}
                      <div className="space-y-4">
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentAI.gradient} flex items-center justify-center text-white text-3xl font-bold mx-auto`}>
                          {currentAI.avatar}
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                            {currentAI.name}
                          </h2>
                          <p className={`text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {currentAI.description}
                          </p>
                        </div>
                      </div>

                      {/* Capabilities Section */}
                      <div className="space-y-4">
                        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                          能力介绍
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          {currentAI.capabilities}
                        </p>
                      </div>

                      {/* Features Section */}
                      <div className="space-y-4">
                        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                          主要功能
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {currentAI.features.map((feature, index) => (
                            <div 
                              key={index}
                              className={`${cardStyle} p-3 rounded-lg text-center space-y-1 hover:shadow-md transition-shadow`}
                            >
                              <div className="text-lg">{feature.split(' ')[0]}</div>
                              <div className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                {feature.substring(feature.indexOf(' ') + 1)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4">
                        <button 
                          onClick={() => console.log(`开始与${currentAI.name}对话`)}
                          className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2 mx-auto text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>立即开始对话</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedContact && activeTab === "通讯录" && (selectedContact.startsWith("friend-") && !selectedContact.includes("request")) ? (
            // Friend Profile View
            <>
              {(() => {
                const friendProfiles = {
                  "friend-1": {
                    name: "张三",
                    avatar: "👨‍💼",
                    status: "在线",
                    bio: "资深投资者，专注于数字货币市场分析",
                    joinDate: "2023年1月",
                    mutualFriends: 5,
                    stats: {
                      trades: 128,
                      success: "92%",
                      rating: 4.8
                    },
                    interests: ["BTC交易", "市场分析", "技术指标", "投资策略"],
                    recentActivity: "刚刚分享了一篇关于BTC走势的分析"
                  },
                  "friend-2": {
                    name: "李四", 
                    avatar: "👩‍💼",
                    status: "在线",
                    bio: "量化交易专家，擅长算法交易策略",
                    joinDate: "2022年8月",
                    mutualFriends: 8,
                    stats: {
                      trades: 256,
                      success: "95%",
                      rating: 4.9
                    },
                    interests: ["量化交易", "算法策略", "风险管理", "数据分析"],
                    recentActivity: "2小时前更新了投资组合"
                  },
                  "friend-3": {
                    name: "王五",
                    avatar: "👨‍🎓",
                    status: "离线",
                    bio: "区块链技术爱好者，长期价值投资者",
                    joinDate: "2023年3月",
                    mutualFriends: 3,
                    stats: {
                      trades: 67,
                      success: "88%",
                      rating: 4.6
                    },
                    interests: ["区块链技术", "价值投资", "DeFi", "NFT"],
                    recentActivity: "昨天参与了社区讨论"
                  },
                  "friend-alex": {
                    name: "Alex Chen",
                    avatar: "👨‍💼",
                    status: "在线",
                    bio: "Professional trader with 5+ years experience",
                    joinDate: "2022年12月",
                    mutualFriends: 12,
                    stats: {
                      trades: 445,
                      success: "94%",
                      rating: 4.9
                    },
                    interests: ["Futures Trading", "Options", "Technical Analysis", "Risk Management"],
                    recentActivity: "30分钟前发布了交易信号"
                  },
                  "friend-bob": {
                    name: "Bob Wang",
                    avatar: "👨‍🎓",
                    status: "离线",
                    bio: "Crypto enthusiast and long-term hodler",
                    joinDate: "2023年5月",
                    mutualFriends: 6,
                    stats: {
                      trades: 89,
                      success: "90%",
                      rating: 4.7
                    },
                    interests: ["HODLing", "Altcoins", "Market Research", "Community"],
                    recentActivity: "3小时前点赞了一个交易策略"
                  },
                  "friend-charlie": {
                    name: "Charlie Li",
                    avatar: "👨‍🔬",
                    status: "在线",
                    bio: "Financial analyst specializing in crypto markets",
                    joinDate: "2022年11月",
                    mutualFriends: 9,
                    stats: {
                      trades: 178,
                      success: "91%",
                      rating: 4.8
                    },
                    interests: ["Market Analysis", "Financial Modeling", "Economic Indicators", "Research"],
                    recentActivity: "1小时前发布了市场报告"
                  },
                  "friend-david": {
                    name: "David Zhang",
                    avatar: "👨‍💻",
                    status: "离线",
                    bio: "Software engineer turned crypto trader",
                    joinDate: "2023年2月",
                    mutualFriends: 4,
                    stats: {
                      trades: 134,
                      success: "89%",
                      rating: 4.6
                    },
                    interests: ["Automated Trading", "Programming", "Smart Contracts", "DApps"],
                    recentActivity: "6小时前更新了交易机器人"
                  },
                  "friend-eric": {
                    name: "Eric Liu",
                    avatar: "👨‍🏫",
                    status: "在线",
                    bio: "Education specialist in cryptocurrency trading",
                    joinDate: "2022年9月",
                    mutualFriends: 15,
                    stats: {
                      trades: 223,
                      success: "93%",
                      rating: 4.8
                    },
                    interests: ["Trading Education", "Mentoring", "Strategy Development", "Community Building"],
                    recentActivity: "刚刚回复了一个学习问题"
                  }
                }
                
                const currentFriend = friendProfiles[selectedContact as keyof typeof friendProfiles]
                
                return (
                  <div className="flex-1 overflow-y-auto">
                    <div className={`${cardStyle} p-6 m-4 rounded-lg`}>
                      {/* Profile Header */}
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {currentFriend.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                            isDark ? "border-[#1a1c2e]" : "border-white"
                          } ${currentFriend.status === "在线" ? "bg-green-500" : "bg-gray-400"}`}></div>
                        </div>
                        <div className="flex-1">
                          <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {currentFriend.name}
                          </h2>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            专业交易员
                          </p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {currentFriend.bio}
                      </p>

                      {/* Location and Join Date */}
                      <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <span>📍</span>
                          <span>上海</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>📅</span>
                          <span>{currentFriend.joinDate}加入</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {currentFriend.stats.trades}
                          </div>
                          <div className="text-xs text-gray-400">动态</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            12800
                          </div>
                          <div className="text-xs text-gray-400">粉丝</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            89
                          </div>
                          <div className="text-xs text-gray-400">关注</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <button className="bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                          关注
                        </button>
                        <button className={`py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                          isDark 
                            ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                          加好友
                        </button>
                        <button className={`py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                          isDark 
                            ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                          跟单
                        </button>
                      </div>

                      {/* Tabs */}
                      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 mt-8">
                        <div className="flex space-x-8">
                          <button 
                            onClick={() => setProfileTab("动态")}
                            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
                              profileTab === "动态" 
                                ? `border-black ${isDark ? "text-white" : "text-black"}` 
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            动态
                          </button>
                          <button 
                            onClick={() => setProfileTab("合约交易")}
                            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
                              profileTab === "合约交易" 
                                ? `border-black ${isDark ? "text-white" : "text-black"}` 
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            合约交易
                          </button>
                          <button 
                            onClick={() => setProfileTab("合约持仓")}
                            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
                              profileTab === "合约持仓" 
                                ? `border-black ${isDark ? "text-white" : "text-black"}` 
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            合约持仓
                          </button>
                        </div>
                      </div>

                      {/* Tab Content */}
                      {profileTab === "动态" && (
                        <div className="space-y-6">
                          <div className={`${cardStyle} rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:${
                            isDark ? "bg-[#1e2332]" : "bg-gray-50"
                          }`}>
                            {/* 头部 - 用户信息和操作 */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                                  {currentFriend.avatar}
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                                      {currentFriend.name}
                                    </span>
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-500">4小时前</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-full text-gray-400 hover:text-yellow-500 hover:bg-gray-50 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                </button>
                                <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* 内容 */}
                            <div className="mb-4">
                              <p className={`text-base leading-relaxed ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                                刚刚发现一个新的DeFi协议，APY高达200%！但是大家要注意风险，高收益往往伴随高风险。DYOR！💰
                              </p>
                            </div>

                            {/* 标签 */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {["DeFi", "流动性挖矿", "风险提示"].map((tag, index) => (
                                <span 
                                  key={index} 
                                  className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
                                    isDark 
                                      ? "bg-[#00D4AA]/30 text-[#00D4AA] hover:bg-[#00D4AA]/50" 
                                      : "bg-[#00D4AA]/10 text-[#00D4AA] hover:bg-[#00D4AA]/20"
                                  }`}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* 底部操作栏 */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex items-center space-x-6">
                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-red-500 bg-red-50 hover:bg-red-100 transition-all duration-200">
                                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                  <span className="text-sm font-medium">1876</span>
                                </button>

                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                  </svg>
                                  <span className="text-sm font-medium">234</span>
                                </button>

                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                  </svg>
                                  <span className="text-sm font-medium">67</span>
                                </button>
                              </div>

                              {/* 数据统计 */}
                              <div className="text-sm text-gray-400">
                                2,177 次互动
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {profileTab === "合约交易" && (
                        <div className="space-y-4">
                          {/* Stats Cards */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-green-900/20" : "bg-green-50"
                            }`}>
                              <div className="text-green-500 font-bold text-lg">+158.7%</div>
                              <div className="text-xs text-gray-400">总收益</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-blue-900/20" : "bg-blue-50"
                            }`}>
                              <div className="text-blue-500 font-bold text-lg">85.2%</div>
                              <div className="text-xs text-gray-400">胜率</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-purple-900/20" : "bg-purple-50"
                            }`}>
                              <div className="text-purple-500 font-bold text-lg">1234</div>
                              <div className="text-xs text-gray-400">交易笔数</div>
                            </div>
                          </div>

                          {/* Trading Records */}
                          <div className="space-y-3">
                            <div className={`p-4 rounded-lg ${cardStyle}`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">BTC/USDT</span>
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">多单</span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                                </div>
                                <span className="text-green-500 font-medium">+2.3%</span>
                              </div>
                              <div className="text-sm text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                  <span>买入：$42,150</span>
                                  <span>卖出：$43,120</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-500">开仓 +15%</span>
                                  <span className="text-gray-400">10:30</span>
                                </div>
                              </div>
                            </div>

                            <div className={`p-4 rounded-lg ${cardStyle}`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">ETH/USDT</span>
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">空单</span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                                </div>
                                <span className="text-green-500 font-medium">+1.8%</span>
                              </div>
                              <div className="text-sm text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                  <span>买入：$2,450</span>
                                  <span>卖出：$2,406</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-500">开仓 -8%</span>
                                  <span className="text-gray-400">09:15</span>
                                </div>
                              </div>
                            </div>

                            <div className={`p-4 rounded-lg ${cardStyle}`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">BNB/USDT</span>
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">多单</span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                                </div>
                                <span className="text-green-500 font-medium">+3.5%</span>
                              </div>
                              <div className="text-sm text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                  <span>买入：$285</span>
                                  <span>卖出：$295</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-500">开仓 +22%</span>
                                  <span className="text-gray-400">昨天</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {profileTab === "合约持仓" && (
                        <div className="space-y-4">
                          {/* Stats Cards */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-green-900/20" : "bg-green-50"
                            }`}>
                              <div className="text-green-500 font-bold text-lg">+3.2%</div>
                              <div className="text-xs text-gray-400">今日盈亏</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-blue-900/20" : "bg-blue-50"
                            }`}>
                              <div className="text-blue-500 font-bold text-lg">+15.8%</div>
                              <div className="text-xs text-gray-400">本月盈亏</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center bg-[#00D4AA]/10`}>
                              <div className="text-[#00D4AA] font-bold text-lg">+68.4%</div>
                              <div className="text-xs text-gray-400">12个月盈亏</div>
                            </div>
                          </div>

                          {/* Holdings */}
                          <div>
                            <h3 className={`text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                              持仓详情
                            </h3>
                            <div className="space-y-3">
                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      BT
                                    </div>
                                    <div>
                                      <div className="font-medium">BTC</div>
                                      <div className="text-xs text-gray-400">多头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">35.2%</div>
                                    <div className="text-green-500 text-sm">+2.34%</div>
                                  </div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      ET
                                    </div>
                                    <div>
                                      <div className="font-medium">ETH</div>
                                      <div className="text-xs text-gray-400">空头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">28.1%</div>
                                    <div className="text-green-500 text-sm">+1.23%</div>
                                  </div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      BN
                                    </div>
                                    <div>
                                      <div className="font-medium">BNB</div>
                                      <div className="text-xs text-gray-400">多头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">18.7%</div>
                                    <div className="text-green-500 text-sm">+0.89%</div>
                                  </div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      SO
                                    </div>
                                    <div>
                                      <div className="font-medium">SOL</div>
                                      <div className="text-xs text-gray-400">空头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">18.0%</div>
                                    <div className="text-red-500 text-sm">-1.13%</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })()}
            </>
          ) : (
            // Regular Chat View
            <>
              {/* Chat Header */}
              <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"} flex items-center justify-between`}>
                {(() => {
                  const isGroupChat = selectedContact?.startsWith("group-")
                  const currentContact = isGroupChat 
                    ? groupContacts.find(c => c.id === selectedContact)
                    : friendContacts.find(c => c.id === selectedContact) || escrowContacts.find(c => c.id === selectedContact)
                  
                  return (
                    <>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {currentContact?.avatar || "🤖"}
                        </div>
                        <div>
                          <h2 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                            {currentContact?.name || "交易助手"}
                          </h2>
                          <p className="text-sm text-green-500">
                            {isGroupChat ? `${Math.floor(Math.random() * 50) + 10}位成员` : "在线"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Voice Call Button */}
                        <button className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                        }`}>
                          <Phone className="w-5 h-5" />
                        </button>
                        {/* Video Call Button */}
                        <button className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                        }`}>
                          <Video className="w-5 h-5" />
                        </button>
                        {/* Contact Info Button - Only for private chats */}
                        {!isGroupChat && (
                          <button 
                            onClick={() => setShowContactInfo(true)}
                            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        )}
                        {/* Group Info Button - Only for group chats */}
                        {isGroupChat && (
                          <button 
                            onClick={handleOpenGroupInfo}
                            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </>
                  )
                })()}
              </div>

              {/* Escrow Progress Bar for escrow chats */}
              {selectedContact && selectedContact.startsWith("escrow-") && (
                <div className={`border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}>
                  <div 
                    className={`p-3 cursor-pointer transition-all duration-300 ${
                      isDark ? "hover:bg-[#252842]" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setShowEscrowProgress(!showEscrowProgress)}
                  >
                    {(() => {
                      const escrowData = escrowTransactionData[selectedContact as keyof typeof escrowTransactionData]
                      if (!escrowData) return null

                      const currentStep = escrowData.steps.find(step => step.status === 'current')
                      const completedSteps = escrowData.steps.filter(step => step.status === 'completed').length
                      const progressPercent = (completedSteps / escrowData.steps.length) * 100

                      return (
                        <div className="flex items-center justify-between">
                          {/* Left Side - Transaction Info and Progress */}
                          <div className="flex-1 space-y-1">
                            {/* Transaction Amount and Status */}
                            <div className="flex items-center space-x-2">
                              <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                {escrowData.type} <span className="text-lg font-bold">{escrowData.amount}</span> {escrowData.currency}
                              </div>
                              <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                                escrowData.progress === 1 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                                escrowData.progress === 2 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                escrowData.progress === 3 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                escrowData.progress === 4 ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                escrowData.progress === 5 ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                              }`}>
                                {escrowData.progress === 1 ? '待付款' :
                                 escrowData.progress === 2 ? '担保中' :
                                 escrowData.progress === 3 ? '已确认' :
                                 escrowData.progress === 4 ? '待仲裁' :
                                 escrowData.progress === 5 ? '已退款' :
                                 '已完成'}
                              </div>
                            </div>
                            
                            {/* Current Step and Progress */}
                            <div className="text-xs text-gray-500">
                              {currentStep ? currentStep.mainTitle : '交易已完成'} • 第{Math.max(1, escrowData.steps.findIndex(step => step.status === 'current') + 1)}步 / 共{escrowData.steps.length}步 • {Math.round(progressPercent)}%
                            </div>
                          </div>
                          
                          {/* Right Side - Action Buttons and Expand Icon */}
                          <div className="flex items-center space-x-3 ml-4">
                            {/* Action Buttons */}
                            {(() => {
                              if (!currentStep || !currentStep.actions || currentStep.actions.length === 0) return null
                              
                              return (
                                <div className="flex gap-2">
                                  {currentStep.actions.map((action, index) => (
                                    <button
                                      key={`floating-${currentStep.id}-${index}`}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        console.log(`Floating Action: ${action.label} for step ${currentStep.id}`)
                                      }}
                                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                                        action.type === 'primary'
                                          ? 'text-white hover:opacity-80'
                                          : action.type === 'success'
                                          ? 'text-white hover:opacity-80'
                                          : action.type === 'danger'
                                          ? 'bg-red-500 text-white hover:bg-red-600'
                                          : isDark
                                          ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                                          : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                                      }`}
                                      style={{
                                        backgroundColor: action.type === 'primary' || action.type === 'success' ? '#20B2AA' : undefined
                                      }}
                                    >
                                      {action.label}
                                    </button>
                                  ))}
                                </div>
                              )
                            })()}
                            
                            {/* Expand/Collapse Icon */}
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                              showEscrowProgress ? 'rotate-180' : ''
                            }`} />
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                  
                  {/* Expanded Progress Details */}
                  {showEscrowProgress && selectedContact && (
                    <div className={`border-t ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-gray-50"} p-4`}>
                      {(() => {
                        const escrowData = escrowTransactionData[selectedContact as keyof typeof escrowTransactionData]
                        if (!escrowData) return null

                        return (
                          <div className="space-y-4">
                            {/* Transaction Info */}
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                  交易详情 #{escrowData.transactionId}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  买方: {escrowData.buyer} | 卖方: {escrowData.seller}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-800"}`}>
                                  {escrowData.amount} {escrowData.currency}
                                </div>
                                <div className="text-sm text-gray-500">{escrowData.type}</div>
                              </div>
                            </div>

                            {/* Progress Steps */}
                            <div className="relative">
                              {(() => {
                                // Calculate filtered steps length for progress line height
                                const isInArbitration = escrowArbitrationState[selectedContact] || false
                                const filteredStepsLength = escrowData.steps.filter(step => {
                                  if (step.id === 6) {
                                    return isInArbitration
                                  }
                                  return true
                                }).length
                                
                                return (
                                  <>
                                    {/* Full Vertical Progress Line - Connect all steps but stop at last circle */}
                                    <div className={`absolute left-4 top-4 w-0.5 ${
                                      isDark ? 'bg-gray-600' : 'bg-gray-300'
                                    }`} style={{ height: `${(filteredStepsLength - 1) * 5}rem` }} />
                                  </>
                                )
                              })()}
                              
                              <div className="space-y-4">
                                {(() => {
                                  // Filter steps based on arbitration state
                                  const isInArbitration = escrowArbitrationState[selectedContact] || false
                                  const filteredSteps = escrowData.steps.filter(step => {
                                    // Show step 6 (arbitration) only if in arbitration state
                                    if (step.id === 6) {
                                      return isInArbitration
                                    }
                                    return true
                                  })
                                  
                                  return filteredSteps.map((step, index) => (
                                    <div key={step.id} className="relative">
                                      {/* Completed section of progress line */}
                                      {step.status === 'completed' && index < filteredSteps.length - 1 && (
                                        <div className="absolute left-4 top-4 w-0.5 h-16 z-5" style={{ backgroundColor: '#20B2AA' }} />
                                      )}
                                      {step.status === 'current' && index < filteredSteps.length - 1 && (
                                        <div className="absolute left-4 top-4 w-0.5 h-16 bg-blue-500 z-5" />
                                      )}
                                      
                                      <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative z-10 ${
                                            step.status === 'completed' 
                                              ? 'text-white' 
                                              : step.status === 'current'
                                              ? 'bg-blue-500 text-white'
                                              : 'bg-gray-300 text-gray-600'
                                          }`}
                                          style={{
                                            backgroundColor: step.status === 'completed' ? '#20B2AA' : undefined
                                          }}>
                                            {step.status === 'completed' ? '✓' : step.id}
                                          </div>
                                          <div className="flex-1">
                                            <div className={`font-medium ${
                                              step.status === 'current' 
                                                ? isDark ? 'text-blue-400' : 'text-blue-600'
                                                : step.status === 'completed'
                                                ? ''
                                                : isDark ? 'text-gray-400' : 'text-gray-500'
                                            }`}
                                            style={{
                                              color: step.status === 'completed' ? '#20B2AA' : undefined
                                            }}>
                                              {step.mainTitle}
                                            </div>
                                            {/* Subtitle based on current state */}
                                            <div className="text-xs text-gray-500 mt-1">
                                              {(() => {
                                                if (!escrowData.stepStates || !step.getSubtitle) return ""
                                                const stateKey = `step${step.id}State` as keyof typeof escrowData.stepStates
                                                const currentState = escrowData.stepStates[stateKey] || 1
                                                return step.getSubtitle(currentState)
                                              })()}
                                            </div>
                                            {step.timestamp && (
                                              <div className="text-xs text-gray-500">{step.timestamp}</div>
                                            )}
                                          </div>
                                          {step.status === 'current' && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                          )}
                                        </div>
                                        
                                        {/* Action Buttons for Current and Completed Steps */}
                                        {(() => {
                                          if (!escrowData.stepStates || !step.getActions) return null
                                          const stateKey = `step${step.id}State` as keyof typeof escrowData.stepStates
                                          const currentState = escrowData.stepStates[stateKey] || 1
                                          const actions = step.getActions(currentState)
                                          
                                          return actions.length > 0 && step.id !== 5 && (
                                            <div className="ml-11 flex space-x-2">
                                              {actions.map((action, actionIndex) => (
                                              <button
                                                key={actionIndex}
                                                disabled={step.status === 'pending'}
                                                onClick={() => {
                                                  if (action.label === '申请仲裁') {
                                                    handleArbitrationRequest(selectedContact)
                                                  } else if (action.label === '确认收款') {
                                                    handleConfirmPayment(selectedContact)
                                                  } else {
                                                    console.log(`Action: ${action.label} for step ${step.id}`)
                                                  }
                                                }}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                  step.status === 'pending'
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : action.type === 'primary'
                                                    ? 'text-white hover:opacity-80'
                                                    : action.type === 'success'
                                                    ? 'text-white hover:opacity-80'
                                                    : action.type === 'danger'
                                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                                    : isDark
                                                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                                                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                                                }`}
                                                style={{
                                                  backgroundColor: step.status !== 'pending' && (action.type === 'primary' || action.type === 'success') ? '#20B2AA' : undefined
                                                }}
                                              >
                                                {action.label}
                                              </button>
                                            ))}
                                            </div>
                                          )
                                        })()}
                                      </div>
                                    </div>
                                  ))
                                })()}
                              </div>
                            </div>

                            {/* Collapse Bar */}
                            <div 
                              className={`mt-6 pt-4 border-t ${isDark ? "border-[#3a3d4a]" : "border-gray-200"} cursor-pointer transition-all duration-300 ${
                                isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"
                              }`}
                              onClick={() => setShowEscrowProgress(false)}
                            >
                              <div className="flex items-center justify-center space-x-2">
                                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                  收起详情
                                </span>
                                <ArrowUp className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                              </div>
                            </div>

                          </div>
                        )
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {(messages[selectedContact] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Render different message types */}
                      {msg.type === 'transfer' ? (
                        /* Transfer Card - Horizontal Layout */
                        <div 
                          className={`max-w-sm lg:max-w-lg rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
                            msg.senderId === 'user'
                              ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]'
                              : isDark
                                ? 'bg-gradient-to-r from-[#1E293B] to-[#334155] border border-[#475569] hover:border-[#00D4AA]'
                                : 'bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:border-[#00D4AA]'
                          }`}
                          onClick={() => msg.senderId !== 'user' && !msg.transferData?.claimed && handleClaimTransfer(msg.id)}
                        >
                          <div className="flex items-center p-4 gap-4">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              msg.senderId === 'user' 
                                ? 'bg-white/20 backdrop-blur-sm' 
                                : isDark
                                  ? 'bg-[#4F46E5] shadow-lg'
                                  : 'bg-[#4F46E5] shadow-lg'
                            }`}>
                              <TransferIcon className={`w-6 h-6 text-white`} />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Currency and Amount */}
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-6 h-6 rounded-full ${
                                  currencies.find(c => c.symbol === msg.transferData?.currency)?.color
                                } flex items-center justify-center text-white text-sm font-bold`}>
                                  {currencies.find(c => c.symbol === msg.transferData?.currency)?.icon}
                                </div>
                                <span className={`text-lg font-bold ${
                                  msg.senderId === 'user' ? 'text-white' : isDark ? 'text-white' : 'text-gray-800'
                                }`}>
                                  {msg.transferData?.amount} {msg.transferData?.currency}
                                </span>
                              </div>
                              
                              {/* Note */}
                              <p className={`text-sm truncate ${
                                msg.senderId === 'user' ? 'text-white/80' : isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {msg.transferData?.note || '转账备注'}
                              </p>
                              
                              {/* Status */}
                              <div className="mt-2">
                                {msg.senderId !== 'user' && !msg.transferData?.claimed && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                                  }`}>
                                    💰 点击领取
                                  </span>
                                )}
                                {msg.transferData?.claimed && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    ✅ 已领取
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Time */}
                            <div className="text-right flex-shrink-0">
                              <span className={`text-xs ${
                                msg.senderId === 'user' ? 'text-white/60' : isDark ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : msg.type === 'redpacket' ? (
                        /* Airdrop Card - Horizontal Layout */
                        <div 
                          className={`max-w-sm lg:max-w-lg rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
                            msg.senderId === 'user'
                              ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444]'
                              : isDark
                                ? 'bg-gradient-to-r from-[#7F1D1D] to-[#991B1B] border border-red-800 hover:border-[#00D4AA]'
                                : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200 hover:border-[#00D4AA]'
                          }`}
                          onClick={() => {
                            if (msg.senderId !== 'user' && (msg.redpacketData?.claimed || 0) < parseInt(msg.redpacketData?.count || '0')) {
                              handleClaimRedPacket(msg.id)
                            }
                          }}
                        >
                          <div className="flex items-center p-4 gap-4">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              msg.senderId === 'user' 
                                ? 'bg-yellow-400/30 backdrop-blur-sm border border-yellow-300/30' 
                                : isDark
                                  ? 'bg-red-600 shadow-lg'
                                  : 'bg-red-500 shadow-lg'
                            }`}>
                              <AirdropIcon className={`w-6 h-6 ${
                                msg.senderId === 'user' ? 'text-yellow-100' : 'text-white'
                              }`} />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Currency and Amount */}
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-6 h-6 rounded-full ${
                                  currencies.find(c => c.symbol === msg.redpacketData?.currency)?.color
                                } flex items-center justify-center text-white text-sm font-bold`}>
                                  {currencies.find(c => c.symbol === msg.redpacketData?.currency)?.icon}
                                </div>
                                <span className={`text-lg font-bold ${
                                  msg.senderId === 'user' ? 'text-white' : isDark ? 'text-white' : 'text-red-800'
                                }`}>
                                  {msg.redpacketData?.totalAmount} {msg.redpacketData?.currency}
                                </span>
                              </div>
                              
                              {/* Note */}
                              <p className={`text-sm truncate mb-2 ${
                                msg.senderId === 'user' ? 'text-yellow-100' : isDark ? 'text-red-200' : 'text-red-600'
                              }`}>
                                ⚡ {msg.redpacketData?.note}
                              </p>
                              
                              {/* Progress */}
                              <div className="flex items-center gap-2">
                                <div className={`flex-1 h-1.5 rounded-full ${
                                  msg.senderId === 'user' ? 'bg-yellow-600/30' : isDark ? 'bg-red-900' : 'bg-red-200'
                                }`}>
                                  <div 
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      msg.senderId === 'user' ? 'bg-yellow-400' : isDark ? 'bg-red-400' : 'bg-red-500'
                                    }`}
                                    style={{ 
                                      width: `${((msg.redpacketData?.claimed || 0) / parseInt(msg.redpacketData?.count || '1')) * 100}%` 
                                    }}
                                  ></div>
                                </div>
                                <span className={`text-xs font-medium ${
                                  msg.senderId === 'user' ? 'text-yellow-200' : isDark ? 'text-red-300' : 'text-red-600'
                                }`}>
                                  {msg.redpacketData?.claimed || 0}/{msg.redpacketData?.count}
                                </span>
                              </div>
                              
                              {/* Status */}
                              <div className="mt-2">
                                {msg.senderId !== 'user' && 
                                 (msg.redpacketData?.claimed || 0) < parseInt(msg.redpacketData?.count || '0') && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                                  }`}>
                                    ⚡ 点击领取空投
                                  </span>
                                )}
                                {(msg.redpacketData?.claimed || 0) >= parseInt(msg.redpacketData?.count || '0') && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    🎉 已领完
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Time */}
                            <div className="text-right flex-shrink-0">
                              <span className={`text-xs ${
                                msg.senderId === 'user' ? 'text-yellow-200/70' : isDark ? 'text-red-400' : 'text-red-500'
                              }`}>
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : msg.type === 'guarantee' ? (
                        /* Guarantee Transaction Card */
                        <div 
                          className={`max-w-sm lg:max-w-lg rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:shadow-xl ${
                            msg.senderId === 'user'
                              ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                              : isDark
                                ? 'bg-gradient-to-r from-[#1E1B4B] to-[#312E81] border border-indigo-800 hover:border-[#00D4AA]'
                                : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 hover:border-[#00D4AA]'
                          }`}
                        >
                          <div className="p-4">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  msg.senderId === 'user' 
                                    ? 'bg-white/20 backdrop-blur-sm' 
                                    : isDark
                                      ? 'bg-indigo-600 shadow-lg'
                                      : 'bg-indigo-500 shadow-lg'
                                }`}>
                                  <Shield className={`w-5 h-5 ${
                                    msg.senderId === 'user' ? 'text-white' : 'text-white'
                                  }`} />
                                </div>
                                <div>
                                  <h4 className={`text-sm font-semibold ${
                                    msg.senderId === 'user' ? 'text-white' : isDark ? 'text-white' : 'text-indigo-800'
                                  }`}>
                                    {msg.guaranteeData?.type === 'buy' ? '求购担保' : '出售担保'}
                                  </h4>
                                  <p className={`text-xs ${
                                    msg.senderId === 'user' ? 'text-indigo-200' : isDark ? 'text-indigo-300' : 'text-indigo-600'
                                  }`}>
                                    担保金: {msg.guaranteeData?.deposit}% · 期限: {msg.guaranteeData?.duration}小时
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <div className={`w-5 h-5 rounded-full ${
                                    currencies.find(c => c.symbol === msg.guaranteeData?.currency)?.color
                                  } flex items-center justify-center text-white text-xs font-bold`}>
                                    {currencies.find(c => c.symbol === msg.guaranteeData?.currency)?.icon}
                                  </div>
                                  <span className={`text-lg font-bold ${
                                    msg.senderId === 'user' ? 'text-white' : isDark ? 'text-white' : 'text-indigo-800'
                                  }`}>
                                    {msg.guaranteeData?.amount}
                                  </span>
                                </div>
                                <span className={`text-xs ${
                                  msg.senderId === 'user' ? 'text-indigo-200' : isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {msg.time}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className={`text-sm mb-4 ${
                              msg.senderId === 'user' ? 'text-indigo-100' : isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {msg.guaranteeData?.description}
                            </p>

                            {/* Progress Steps */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                {msg.guaranteeData?.steps.map((step, index) => (
                                  <div key={step.id} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                                      step.status === 'completed' 
                                        ? 'bg-green-500 text-white' 
                                        : step.status === 'current'
                                        ? 'bg-blue-500 text-white'
                                        : step.status === 'dispute'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-300 text-gray-600'
                                    }`}>
                                      {step.status === 'completed' ? '✓' : index + 1}
                                    </div>
                                    <span className={`text-xs mt-1 text-center ${
                                      msg.senderId === 'user' ? 'text-indigo-200' : isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                      {step.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="relative">
                                <div className={`h-0.5 ${
                                  msg.senderId === 'user' ? 'bg-indigo-400/30' : isDark ? 'bg-gray-700' : 'bg-gray-200'
                                }`}>
                                  <div 
                                    className={`h-full transition-all duration-300 ${
                                      msg.senderId === 'user' ? 'bg-indigo-300' : isDark ? 'bg-indigo-400' : 'bg-indigo-500'
                                    }`}
                                    style={{ 
                                      width: `${((msg.guaranteeData?.steps.filter(s => s.status === 'completed').length || 0) / (msg.guaranteeData?.steps.length || 1)) * 100}%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Status and Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  msg.guaranteeData?.status === 'pending'
                                    ? isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                                    : msg.guaranteeData?.status === 'accepted'
                                    ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                                    : msg.guaranteeData?.status === 'completed'
                                    ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                                    : msg.guaranteeData?.status === 'disputed'
                                    ? isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                                    : isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {msg.guaranteeData?.status === 'pending' ? '⏳ 等待接受' :
                                   msg.guaranteeData?.status === 'accepted' ? '✅ 已接受' :
                                   msg.guaranteeData?.status === 'completed' ? '🎉 已完成' :
                                   msg.guaranteeData?.status === 'disputed' ? '⚠️ 争议中' : '❌ 已取消'}
                                </span>
                              </div>
                              
                              {/* Action Buttons */}
                              {msg.senderId !== 'user' && msg.guaranteeData?.status === 'pending' && (
                                <button
                                  onClick={() => handleAcceptGuarantee(msg.id)}
                                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                    isDark 
                                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                  }`}
                                >
                                  接受担保
                                </button>
                              )}
                              
                              {msg.guaranteeData?.status === 'accepted' && (
                                <button
                                  onClick={() => handleCompleteGuaranteeStep(msg.id, 'step3')}
                                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                    isDark 
                                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                                      : 'bg-green-500 hover:bg-green-600 text-white'
                                  }`}
                                >
                                  支付担保金
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Regular Text Message */
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.senderId === 'user'
                              ? 'bg-[#00D4AA] text-white'
                              : isDark
                                ? 'bg-[#252842] text-white'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 ${
                            msg.senderId === 'user' 
                              ? 'text-green-100' 
                              : 'text-gray-400'
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div 
                className={`border-t ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}
                style={{ height: `${inputHeight}px` }}
              >
                <div className="h-full flex flex-col">
                  <div 
                    ref={resizeRef}
                    onMouseDown={handleTextareaMouseDown}
                    className={`h-1 cursor-row-resize hover:bg-[#00D4AA] transition-colors ${
                      isResizing ? "bg-[#00D4AA]" : "transparent"
                    }`}
                  />
                  
                  <div className="flex-1 p-4">
                    <form onSubmit={handleSendMessage} className="h-full flex flex-col">
                      <div className="flex-1 mb-3">
                        <textarea
                          ref={textareaRef}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="输入消息..."
                          className={`w-full h-full resize-none border-0 bg-transparent text-sm placeholder-gray-400 focus:outline-none ${
                            isDark ? "text-white" : "text-gray-800"
                          }`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {/* Voice Input Toggle Button */}
                          <button
                            type="button"
                            className={`p-2 rounded-lg transition-colors ${
                              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                            }`}
                            title="切换语音输入"
                          >
                            <Mic className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            className={`p-2 rounded-lg transition-colors ${
                              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                            }`}
                          >
                            <Smile className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            className={`p-2 rounded-lg transition-colors ${
                              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                            }`}
                          >
                            <Paperclip className="w-5 h-5" />
                          </button>
                          
                          {/* Transfer button for private chats */}
                          {selectedContact && !selectedContact.startsWith("group-") && (
                            <button
                              type="button"
                              onClick={() => setShowTransferModal(true)}
                              className={`p-2 rounded-lg transition-colors ${
                                isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                              }`}
                              title="转账"
                            >
                              <TransferIcon className="w-5 h-5" />
                            </button>
                          )}
                          
                          {/* Red packet button for group chats */}
                          {selectedContact && selectedContact.startsWith("group-") && (
                            <button
                              type="button"
                              onClick={() => setShowRedPacketModal(true)}
                              className={`p-2 rounded-lg transition-colors ${
                                isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                              }`}
                              title="发空投"
                            >
                              <AirdropIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        
                        <button
                          type="submit"
                          disabled={!message.trim()}
                          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                            message.trim()
                              ? isDark
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-black text-white hover:bg-gray-800"
                              : "border border-gray-400 text-gray-400 cursor-not-allowed bg-transparent"
                          }`}
                        >
                          发送
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}



        </div>
      ) : !isMobile ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
              选择一个联系人开始聊天
            </h3>
            <p className="text-gray-400">从左侧列表选择一个联系人或群组</p>
          </div>
        </div>
      ) : null}

      {/* Group Info Panel - Identical to USDT publish modal */}
      {showGroupInfo && selectedContact?.startsWith("group-") && (
        <>
          {/* 点击外部区域关闭弹窗 */}
          {screenWidth >= 1440 ? (
            /* 向外弹出模式：覆盖被压缩的内容区域 */
            <div 
              className="fixed left-0 top-0 z-40"
              style={{ 
                width: 'calc(100% - 384px)',
                height: '100%',
                backgroundColor: groupInfoAnimating ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onClick={handleCloseGroupInfo}
            />
          ) : (
            /* 向内弹出模式：全屏半透明遮罩 */
            <div 
              className="fixed inset-0 z-40 bg-black"
              style={{
                opacity: groupInfoAnimating ? 0.4 : 0,
                transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onClick={handleCloseGroupInfo}
            />
          )}
          
          <div className="fixed z-[9999] overflow-hidden right-0 top-0 h-full w-96">
          <div 
            className={`h-full w-96 ${isDark ? "bg-[#1a1c2e]" : "bg-white"} shadow-2xl border-l ${
              isDark ? "border-[#3a3d4a]" : "border-gray-200"
            }`}
            style={{
              transform: groupInfoAnimating 
                ? 'translateX(0) scale(1)' 
                : screenWidth >= 1440 
                  ? 'translateX(-100%) scale(0.98)'
                  : 'translateX(100%) scale(0.98)',
              opacity: groupInfoAnimating ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transformOrigin: screenWidth >= 1440 ? 'left center' : 'right center',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div 
              className="p-6 h-full overflow-y-auto"
              style={{
                transform: groupInfoAnimating 
                  ? 'translateX(0)' 
                  : screenWidth >= 1440 
                    ? 'translateX(-30px)' 
                    : 'translateX(30px)',
                opacity: groupInfoAnimating ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: groupInfoAnimating ? '0.15s' : '0s'
              }}
            >
                {(() => {
                  const currentGroup = groupContacts.find(c => c.id === selectedContact)
                  const memberCount = Math.floor(Math.random() * 50) + 10
                  
                  return (
                    <>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                          群组信息
                        </h2>
                        <button 
                          onClick={handleCloseGroupInfo}
                          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Group Basic Info */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                          {currentGroup?.avatar}
                        </div>
                        <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                          {currentGroup?.name}
                        </h3>
                        <p className="text-sm text-gray-400">{memberCount}位成员</p>
                      </div>

                      {/* Group Announcement */}
                      <div className={`${isDark ? "bg-[#252842]" : "bg-gray-50"} p-4 rounded-lg mb-6`}>
                        <h4 className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                          群公告
                        </h4>
                        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          欢迎加入{currentGroup?.name}！请大家文明交流，分享有价值的交易心得和市场分析。禁止发布广告和无关内容。
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                          管理员 · 2024年1月15日
                        </div>
                      </div>

                      {/* Group Members */}
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                          群成员 ({memberCount})
                        </h4>
                        <div className="space-y-3">
                          {[
                            { name: "张三", avatar: "👨‍💼", role: "群主", status: "在线" },
                            { name: "李四", avatar: "👩‍💼", role: "管理员", status: "在线" },
                            { name: "王五", avatar: "👨‍🎓", role: "成员", status: "离线" },
                            { name: "赵六", avatar: "👨‍💻", role: "成员", status: "在线" },
                            { name: "钱七", avatar: "👩‍🔬", role: "成员", status: "在线" }
                          ].map((member, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                  {member.avatar}
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                    {member.name}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-400">{member.role}</span>
                                    <div className={`w-2 h-2 rounded-full ${member.status === "在线" ? "bg-green-500" : "bg-gray-400"}`}></div>
                                  </div>
                                </div>
                              </div>
                              {member.role !== "群主" && (
                                <button className={`text-xs px-2 py-1 rounded transition-colors ${
                                  isDark ? "bg-[#252842] text-gray-300 hover:bg-[#3a3d4a]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}>
                                  @{member.name}
                                </button>
                              )}
                            </div>
                          ))}
                          
                          {memberCount > 5 && (
                            <button className={`w-full text-center py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors`}>
                              查看全部 {memberCount} 位成员
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        {/* Primary Actions */}
                        <div className="flex space-x-3">
                          <button className={`flex-1 py-2.5 rounded-lg font-medium transition-colors text-sm ${
                            isDark 
                              ? "bg-white text-black hover:bg-gray-200" 
                              : "bg-black text-white hover:bg-gray-800"
                          }`}>
                            邀请朋友
                          </button>
                          <button className={`flex-1 py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                            isDark 
                              ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}>
                            群设置
                          </button>
                        </div>
                        
                        {/* Secondary Actions */}
                        <div className="flex space-x-3">
                          <button className={`flex-1 py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                            isDark 
                              ? "border-yellow-600 text-yellow-400 hover:bg-yellow-900/20" 
                              : "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                          }`}>
                            屏蔽群组
                          </button>
                          <button className={`flex-1 py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                            isDark 
                              ? "border-red-600 text-red-400 hover:bg-red-900/20" 
                              : "border-red-500 text-red-600 hover:bg-red-50"
                          }`}>
                            退出群组
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })()}
                </div>
              </div>
              </div>
            </>
          )}
          {/* Group Info Panel */}
          {showGroupInfo && selectedContact?.startsWith("group-") && (
            <>
              {/* 点击外部区域关闭弹窗 */}
              {screenWidth >= 1440 ? (
                /* 向外弹出模式：覆盖被压缩的内容区域 */
                <div 
                  className="fixed left-0 top-0 z-40"
                  style={{ 
                    width: 'calc(100% - 384px)',
                    height: '100%',
                    backgroundColor: groupInfoAnimating ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onClick={handleCloseGroupInfo}
                />
              ) : (
                /* 向内弹出模式：全屏半透明遮罩 */
                <div 
                  className="fixed inset-0 z-40 bg-black"
                  style={{
                    opacity: groupInfoAnimating ? 0.4 : 0,
                    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onClick={handleCloseGroupInfo}
                />
              )}
              
              <div className="fixed z-[9999] overflow-hidden right-0 top-0 h-full w-96">
              <div 
                className={`h-full w-96 ${isDark ? "bg-[#1a1c2e]" : "bg-white"} shadow-2xl border-l ${
                  isDark ? "border-[#3a3d4a]" : "border-gray-200"
                }`}
                style={{
                  transform: groupInfoAnimating 
                    ? 'translateX(0) scale(1)' 
                    : screenWidth >= 1440 
                      ? 'translateX(-100%) scale(0.98)'
                      : 'translateX(100%) scale(0.98)',
                  opacity: groupInfoAnimating ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformOrigin: screenWidth >= 1440 ? 'left center' : 'right center',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div 
                  className="p-6 h-full overflow-y-auto"
                  style={{
                    transform: groupInfoAnimating 
                      ? 'translateX(0)' 
                      : screenWidth >= 1440 
                        ? 'translateX(-30px)' 
                        : 'translateX(30px)',
                    opacity: groupInfoAnimating ? 1 : 0,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: groupInfoAnimating ? '0.15s' : '0s'
                  }}
                >
                {(() => {
                  const currentGroup = groupContacts.find(c => c.id === selectedContact)
                  const memberCount = Math.floor(Math.random() * 50) + 10
                  
                  return (
                    <>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                          群组信息
                        </h2>
                        <button 
                          onClick={handleCloseGroupInfo}
                          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Group Basic Info */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                          {currentGroup?.avatar}
                        </div>
                        <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                          {currentGroup?.name}
                        </h3>
                        <p className="text-sm text-gray-400">{memberCount}位成员</p>
                      </div>

                      {/* Group Announcement */}
                      <div className={`${isDark ? "bg-[#252842]" : "bg-gray-50"} p-4 rounded-lg mb-6`}>
                        <h4 className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                          群公告
                        </h4>
                        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          欢迎加入{currentGroup?.name}！请大家文明交流，分享有价值的交易心得和市场分析。禁止发布广告和无关内容。
                        </p>
                      </div>

                      {/* Group Actions */}
                      <div className="space-y-3 mb-6">
                        <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isDark ? "hover:bg-[#252842] text-gray-300" : "hover:bg-gray-50 text-gray-700"
                        }`}>
                          <Users className="w-5 h-5" />
                          <span>查看群成员</span>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>
                        <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isDark ? "hover:bg-[#252842] text-gray-300" : "hover:bg-gray-50 text-gray-700"
                        }`}>
                          <Image className="w-5 h-5" />
                          <span>聊天记录</span>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>
                        <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isDark ? "hover:bg-[#252842] text-gray-300" : "hover:bg-gray-50 text-gray-700"
                        }`}>
                          <Bell className="w-5 h-5" />
                          <span>消息提醒</span>
                          <div className="ml-auto flex items-center gap-2">
                            <span className="text-sm text-gray-400">开启</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                          邀请朋友
                        </button>
                        <button className={`flex-1 py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                          isDark 
                            ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                          群设置
                        </button>
                      </div>
                    </>
                  )
                })()}
                </div>
              </div>
              </div>
            </>
          )}
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${cardStyle} rounded-xl p-6 w-96 mx-4`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                转账
              </h3>
              <button
                onClick={() => setShowTransferModal(false)}
                className={`p-1 rounded-lg transition-colors ${
                  isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Currency Selection */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                币种
              </label>
              <div className="relative" ref={currencyDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                    isDark 
                      ? "border-gray-600 bg-[#252842] text-white hover:border-gray-500" 
                      : "border-gray-300 bg-white text-gray-800 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${currencies.find(c => c.symbol === selectedCurrency)?.color} flex items-center justify-center text-white text-sm font-bold`}>
                      {currencies.find(c => c.symbol === selectedCurrency)?.icon}
                    </div>
                    <span>{selectedCurrency}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showCurrencyDropdown && (
                  <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 ${
                    isDark ? "border-gray-600 bg-[#252842]" : "border-gray-300 bg-white"
                  }`}>
                    {currencies.map((currency) => (
                      <button
                        key={currency.symbol}
                        onClick={() => {
                          setSelectedCurrency(currency.symbol)
                          setShowCurrencyDropdown(false)
                        }}
                        className={`w-full flex items-center gap-2 p-3 transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-white" : "hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full ${currency.color} flex items-center justify-center text-white text-sm font-bold`}>
                          {currency.icon}
                        </div>
                        <span>{currency.symbol}</span>
                        <span className="text-sm text-gray-400 ml-auto">{currency.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                转账金额
              </label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="请输入转账金额"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  isDark 
                    ? "border-gray-600 bg-[#252842] text-white placeholder-gray-400" 
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Note Input */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                转账备注
              </label>
              <input
                type="text"
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                placeholder="请输入转账备注（可选）"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  isDark 
                    ? "border-gray-600 bg-[#252842] text-white placeholder-gray-400" 
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowTransferModal(false)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors border ${
                  isDark 
                    ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                取消
              </button>
              <button
                onClick={handleTransfer}
                disabled={!transferAmount}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                  transferAmount
                    ? isDark
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                确认转账
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Red Packet Modal */}
      {showRedPacketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${cardStyle} rounded-xl p-6 w-96 mx-4`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                发空投
              </h3>
              <button
                onClick={() => setShowRedPacketModal(false)}
                className={`p-1 rounded-lg transition-colors ${
                  isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Currency Selection */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                币种
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                    isDark 
                      ? "border-gray-600 bg-[#252842] text-white hover:border-gray-500" 
                      : "border-gray-300 bg-white text-gray-800 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${currencies.find(c => c.symbol === selectedCurrency)?.color} flex items-center justify-center text-white text-sm font-bold`}>
                      {currencies.find(c => c.symbol === selectedCurrency)?.icon}
                    </div>
                    <span>{selectedCurrency}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showCurrencyDropdown && (
                  <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 ${
                    isDark ? "border-gray-600 bg-[#252842]" : "border-gray-300 bg-white"
                  }`}>
                    {currencies.map((currency) => (
                      <button
                        key={currency.symbol}
                        onClick={() => {
                          setSelectedCurrency(currency.symbol)
                          setShowCurrencyDropdown(false)
                        }}
                        className={`w-full flex items-center gap-2 p-3 transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-white" : "hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full ${currency.color} flex items-center justify-center text-white text-sm font-bold`}>
                          {currency.icon}
                        </div>
                        <span>{currency.symbol}</span>
                        <span className="text-sm text-gray-400 ml-auto">{currency.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Total Amount Input */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                空投总金额
              </label>
              <input
                type="number"
                value={redPacketAmount}
                onChange={(e) => setRedPacketAmount(e.target.value)}
                placeholder="请输入空投总金额"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  isDark 
                    ? "border-gray-600 bg-[#252842] text-white placeholder-gray-400" 
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Red Packet Count */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                空投份数
              </label>
              <input
                type="number"
                value={redPacketCount}
                onChange={(e) => setRedPacketCount(e.target.value)}
                placeholder="请输入空投份数"
                min="1"
                max="100"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  isDark 
                    ? "border-gray-600 bg-[#252842] text-white placeholder-gray-400" 
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Note Input */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                空投描述
              </label>
              <input
                type="text"
                value={redPacketNote}
                onChange={(e) => setRedPacketNote(e.target.value)}
                placeholder="感谢支持，空投奖励！"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  isDark 
                    ? "border-gray-600 bg-[#252842] text-white placeholder-gray-400" 
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRedPacketModal(false)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors border ${
                  isDark 
                    ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                取消
              </button>
              <button
                onClick={handleRedPacket}
                disabled={!redPacketAmount || !redPacketCount}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                  redPacketAmount && redPacketCount
                    ? isDark
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                发送空投
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guarantee Transaction Modal */}
      {showGuaranteeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${cardStyle} rounded-xl p-6 w-96 mx-4`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                担保交易
              </h3>
              <button
                onClick={() => setShowGuaranteeModal(false)}
                className={`p-1 rounded-lg transition-colors ${
                  isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Transaction Type */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                交易类型
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setGuaranteeType("buy")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    guaranteeType === "buy"
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isDark
                        ? "bg-[#252842] text-gray-300 hover:bg-[#2a2d42]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  求购
                </button>
                <button
                  onClick={() => setGuaranteeType("sell")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    guaranteeType === "sell"
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isDark
                        ? "bg-[#252842] text-gray-300 hover:bg-[#2a2d42]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  出售
                </button>
              </div>
            </div>

            {/* Currency Selection */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                交易币种
              </label>
              <div className="relative" ref={currencyDropdownRef}>
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className={`w-full p-3 border rounded-lg flex items-center justify-between transition-colors ${
                    isDark 
                      ? "border-gray-600 bg-[#252842] text-white" 
                      : "border-gray-300 bg-white text-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full ${
                      currencies.find(c => c.symbol === selectedCurrency)?.color
                    } flex items-center justify-center text-white text-sm font-bold`}>
                      {currencies.find(c => c.symbol === selectedCurrency)?.icon}
                    </div>
                    <span>{selectedCurrency}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showCurrencyDropdown && (
                  <div className={`absolute top-full left-0 right-0 mt-2 ${cardStyle} rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto`}>
                    {currencies.map((currency) => (
                      <button
                        key={currency.symbol}
                        onClick={() => {
                          setSelectedCurrency(currency.symbol)
                          setShowCurrencyDropdown(false)
                        }}
                        className={`w-full p-3 flex items-center space-x-3 transition-colors ${
                          isDark ? "hover:bg-[#252842] text-gray-300" : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full ${currency.color} flex items-center justify-center text-white text-sm font-bold`}>
                          {currency.icon}
                        </div>
                        <span>{currency.symbol}</span>
                        <span className="text-sm text-gray-500">{currency.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                交易金额
              </label>
              <input
                type="number"
                value={guaranteeAmount}
                onChange={(e) => setGuaranteeAmount(e.target.value)}
                placeholder="请输入交易金额"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  isDark 
                    ? "border-gray-600 bg-[#252842] text-white placeholder-gray-400" 
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                交易描述
              </label>
              <textarea
                value={guaranteeDescription}
                onChange={(e) => setGuaranteeDescription(e.target.value)}
                placeholder="请描述交易详情、要求等..."
                rows={3}
                className={`w-full p-3 border rounded-lg transition-colors resize-none ${
                  isDark 
                    ? "border-gray-600 bg-[#252842] text-white placeholder-gray-400" 
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Duration and Deposit */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  交易期限(小时)
                </label>
                <select
                  value={guaranteeDuration}
                  onChange={(e) => setGuaranteeDuration(e.target.value)}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isDark 
                      ? "border-gray-600 bg-[#252842] text-white" 
                      : "border-gray-300 bg-white text-gray-800"
                  }`}
                >
                  <option value="1">1小时</option>
                  <option value="3">3小时</option>
                  <option value="6">6小时</option>
                  <option value="12">12小时</option>
                  <option value="24">24小时</option>
                  <option value="48">48小时</option>
                  <option value="72">72小时</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  担保金比例(%)
                </label>
                <select
                  value={guaranteeDeposit}
                  onChange={(e) => setGuaranteeDeposit(e.target.value)}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isDark 
                      ? "border-gray-600 bg-[#252842] text-white" 
                      : "border-gray-300 bg-white text-gray-800"
                  }`}
                >
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowGuaranteeModal(false)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors border ${
                  isDark 
                    ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                取消
              </button>
              <button
                onClick={handleGuaranteeTransaction}
                disabled={!guaranteeAmount || !guaranteeDescription}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                  guaranteeAmount && guaranteeDescription
                    ? isDark
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                发起担保
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Menu */}
      {isMobile && showMobileProfileMenu && (
        <div className="fixed inset-0 z-[110] flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileProfileMenu(false)}
          />
          
          {/* Profile Menu Panel */}
          <div className={`relative w-80 h-full ${isDark ? "bg-[#1a1c2e]" : "bg-white"} shadow-xl transform transition-transform duration-300 ease-out`}>
            {/* Header */}
            <div className={`p-6 border-b ${isDark ? "border-[#3a3d4a]" : "border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                  个人中心
                </h2>
                <button
                  onClick={() => setShowMobileProfileMenu(false)}
                  className={`p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}
                >
                  <X className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-600"}`} />
                </button>
              </div>
              
              {/* User Info */}
              <div className="mt-4 flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ring-2 ${
                  isDark 
                    ? "bg-white/20 ring-white/30 text-white" 
                    : "bg-gray-800/80 ring-gray-600/50 text-white"
                }`}>
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                    交易达人
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    ID: BXB123456
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-2">
                {[
                  { icon: Home, label: "个人主页", onClick: () => router.push("/profile") },
                  { icon: Gift, label: "邀请返佣", onClick: () => {} },
                  { icon: Percent, label: "费率折扣", onClick: () => {} },
                  { icon: Shield, label: "安全中心", onClick: () => {} },
                  { icon: FileCheck, label: "身份认证", onClick: () => {} },
                  { icon: Key, label: "API管理", onClick: () => {} },
                  { icon: Settings, label: "系统设置", onClick: () => {} },
                  { icon: UserX, label: "切换账号", onClick: () => {} },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick()
                      setShowMobileProfileMenu(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${
                      isDark
                        ? "hover:bg-[#252842] text-gray-300"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    <span className="text-sm">{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                  </button>
                ))}
              </div>
              
              {/* Logout */}
              <div className={`py-2 border-t ${isDark ? "border-[#3a3d4a]" : "border-gray-200"}`}>
                <button
                  onClick={() => {
                    // Handle logout
                    setShowMobileProfileMenu(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${
                    isDark
                      ? "hover:bg-[#252842] text-red-400"
                      : "hover:bg-gray-50 text-red-600"
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">退出账号</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Chat Interface */}
      {isMobile && showMobileChat && selectedContact && (
        <div className="fixed inset-0 bg-[#f5f8fa] dark:bg-background z-[100] flex flex-col">
          {/* Mobile Chat Header */}
          <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"} flex items-center space-x-3`}>
            <button
              onClick={() => setShowMobileChat(false)}
              className={`p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}
            >
              <ArrowLeft className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-800"}`} />
            </button>
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {(() => {
                  const contact = [...friendContacts, ...groupContacts, ...escrowContacts, ...addressBookContacts].find(c => c.id === selectedContact)
                  return contact?.avatar || "?"
                })()}
              </div>
              <div>
                <h2 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                  {(() => {
                    const contact = [...friendContacts, ...groupContacts, ...escrowContacts, ...addressBookContacts].find(c => c.id === selectedContact)
                    return contact?.name || "Unknown"
                  })()}
                </h2>
                <p className="text-xs text-gray-400">
                  {(() => {
                    const contact = [...friendContacts, ...groupContacts, ...escrowContacts, ...addressBookContacts].find(c => c.id === selectedContact)
                    return contact?.isOnline ? "在线" : "离线"
                  })()}
                </p>
              </div>
            </div>
            
            {/* Voice and Video Call Buttons for Mobile */}
            <div className="flex items-center space-x-2">
              {/* Voice Call Button */}
              <button className={`p-2 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
              }`}>
                <Phone className="w-5 h-5" />
              </button>
              {/* Video Call Button */}
              <button className={`p-2 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
              }`}>
                <Video className="w-5 h-5" />
              </button>
              {/* Contact Info Button - Only for private chats */}
              {!selectedContact?.startsWith("group-") && (
                <button 
                  onClick={() => setShowContactInfo(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              )}
              
              {/* Group Info Button - Only for group chats */}
              {selectedContact?.startsWith("group-") && (
                <button className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Escrow Progress Bar */}
          {selectedContact && selectedContact.startsWith("escrow-") && (
            <div className={`border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}>
              <div 
                className={`p-3 cursor-pointer transition-all duration-300 ${
                  isDark ? "hover:bg-[#252842]" : "hover:bg-gray-50"
                }`}
                onClick={() => setShowEscrowProgress(!showEscrowProgress)}
              >
                {(() => {
                  const escrowData = escrowTransactionData[selectedContact as keyof typeof escrowTransactionData]
                  if (!escrowData) return null

                  const currentStep = escrowData.steps.find(step => step.status === 'current')
                  const completedSteps = escrowData.steps.filter(step => step.status === 'completed').length
                  const progressPercent = (completedSteps / escrowData.steps.length) * 100

                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          escrowData.progress === 6 ? 'bg-green-500' : 'bg-yellow-500'
                        } animate-pulse`} />
                        <div>
                          <div className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                            {escrowData.type} {escrowData.amount} {escrowData.currency}
                          </div>
                          <div className="text-xs text-gray-500">
                            {currentStep ? currentStep.title : '交易已完成'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Mobile Current Step Quick Action Buttons (1-2 buttons) */}
                        <div className="flex space-x-1">
                          {(() => {
                            const currentStepIndex = escrowData.steps.findIndex(step => step.status === 'current')
                            const currentStep = escrowData.steps[currentStepIndex]
                            const buttonsToShow = []
                            
                            // Show current step primary action
                            if (currentStep && currentStep.actions && currentStep.actions.length > 0) {
                              buttonsToShow.push({
                                step: currentStep,
                                action: currentStep.actions[0],
                                isPrimary: true
                              })
                              
                              // Show second action if available for current step
                              if (currentStep.actions.length > 1) {
                                buttonsToShow.push({
                                  step: currentStep,
                                  action: currentStep.actions[1],
                                  isPrimary: false
                                })
                              }
                            }
                            
                            return buttonsToShow.map((buttonData, index) => (
                              <button
                                key={`${buttonData.step.id}-${index}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  console.log(`Mobile Quick Action: ${buttonData.action.label} for step ${buttonData.step.id}`)
                                }}
                                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                  buttonData.action.type === 'primary'
                                    ? 'text-white hover:opacity-80'
                                    : buttonData.action.type === 'success'
                                    ? 'text-white hover:opacity-80'
                                    : buttonData.action.type === 'danger'
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : isDark
                                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                                style={{
                                  backgroundColor: buttonData.action.type === 'primary' || buttonData.action.type === 'success' ? '#20B2AA' : undefined
                                }}
                              >
                                {buttonData.action.label}
                              </button>
                            ))
                          })()}
                        </div>
                        
                        <div className="w-8 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300`}
                            style={{ 
                              width: `${progressPercent}%`,
                              backgroundColor: escrowData.progress === 6 ? '#20B2AA' : '#3b82f6'
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {completedSteps}/{escrowData.steps.length}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          showEscrowProgress ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </div>
                  )
                })()}
              </div>
              
              {/* Mobile Expanded Progress Details */}
              {showEscrowProgress && selectedContact && (
                <div className={`border-t ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-gray-50"} p-4`}>
                  {(() => {
                    const escrowData = escrowTransactionData[selectedContact as keyof typeof escrowTransactionData]
                    if (!escrowData) return null

                    return (
                      <div className="space-y-4">
                        {/* Mobile Transaction Info */}
                        <div className="space-y-2">
                          <div>
                            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              交易详情 #{escrowData.transactionId}
                            </h3>
                            <p className="text-sm text-gray-500">
                              买方: {escrowData.buyer} | 卖方: {escrowData.seller}
                            </p>
                          </div>
                          <div>
                            <div className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-800"}`}>
                              {escrowData.amount} {escrowData.currency}
                            </div>
                            <div className="text-sm text-gray-500">{escrowData.type}</div>
                          </div>
                        </div>

                        {/* Mobile Progress Steps */}
                        <div className="space-y-4">
                          {(() => {
                            // Filter steps based on arbitration state
                            const isInArbitration = escrowArbitrationState[selectedContact] || false
                            const filteredSteps = escrowData.steps.filter(step => {
                              // Show step 6 (arbitration) only if in arbitration state
                              if (step.id === 6) {
                                return isInArbitration
                              }
                              return true
                            })
                            
                            return filteredSteps.map((step, index) => (
                              <div key={step.id} className="space-y-2">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    step.status === 'completed' 
                                      ? 'text-white' 
                                      : step.status === 'current'
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-300 text-gray-600'
                                  }`}
                                  style={{
                                    backgroundColor: step.status === 'completed' ? '#20B2AA' : undefined
                                  }}>
                                    {step.status === 'completed' ? '✓' : step.id}
                                  </div>
                                  <div className="flex-1">
                                    <div className={`font-medium text-sm ${
                                      step.status === 'current' 
                                        ? isDark ? 'text-blue-400' : 'text-blue-600'
                                        : step.status === 'completed'
                                        ? ''
                                        : isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}
                                    style={{
                                      color: step.status === 'completed' ? '#20B2AA' : undefined
                                    }}>
                                      {step.title}
                                    </div>
                                    {step.timestamp && (
                                      <div className="text-xs text-gray-500">{step.timestamp}</div>
                                    )}
                                  </div>
                                  {step.status === 'current' && (
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                  )}
                                </div>
                                
                                {/* Mobile Action Buttons for All Steps */}
                                {step.actions && step.id !== 7 && (
                                  <div className="ml-9 flex space-x-2">
                                    {step.actions.map((action, actionIndex) => (
                                      <button
                                        key={actionIndex}
                                        disabled={step.status === 'pending'}
                                        onClick={() => {
                                          if (action.label === '申请仲裁') {
                                            handleArbitrationRequest(selectedContact)
                                          } else if (action.label === '确认收款') {
                                            handleConfirmPayment(selectedContact)
                                          } else {
                                            console.log(`Action: ${action.label} for step ${step.id}`)
                                          }
                                        }}
                                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                                          step.status === 'pending'
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : action.type === 'primary'
                                            ? 'text-white hover:opacity-80'
                                            : action.type === 'success'
                                            ? 'text-white hover:opacity-80'
                                            : action.type === 'danger'
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : isDark
                                            ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                                            : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                                        }`}
                                        style={{
                                          backgroundColor: step.status !== 'pending' && (action.type === 'primary' || action.type === 'success') ? '#20B2AA' : undefined
                                        }}
                                      >
                                        {action.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))
                          })()}
                        </div>

                        {/* Mobile Collapse Bar */}
                        <div 
                          className={`mt-6 pt-4 border-t ${isDark ? "border-[#3a3d4a]" : "border-gray-200"} cursor-pointer transition-all duration-300 ${
                            isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"
                          }`}
                          onClick={() => setShowEscrowProgress(false)}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                              收起详情
                            </span>
                            <ArrowUp className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                          </div>
                        </div>

                      </div>
                    )
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Mobile Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {(messages[selectedContact] || []).map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.senderId === "user"
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isDark
                        ? "bg-[#252842] text-white"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Input */}
          <div className={`p-4 border-t ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              {/* Voice Input Toggle Button for Mobile */}
              <button
                type="button"
                className={`p-3 rounded-lg transition-colors ${
                  isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}
                title="切换语音输入"
              >
                <Mic className="w-5 h-5" />
              </button>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入消息..."
                className={`flex-1 p-3 border rounded-lg resize-none ${
                  isDark
                    ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400"
                    : "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500"
                } focus:outline-none focus:border-[#00D4AA]`}
                rows={1}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  message.trim()
                    ? isDark
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                发送
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Notification Dropdown - Full screen overlay */}
      {showMobileNotificationDropdown && (
        <div 
          className="fixed inset-0 bg-black/50 z-[120] flex items-center justify-center p-4"
          onClick={() => setShowMobileNotificationDropdown(false)}
        >
          <div 
            className={`w-full max-w-md max-h-[80vh] rounded-lg shadow-xl overflow-hidden ${
              isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-4 border-b ${isDark ? "border-[#252842]" : "border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                  通知中心
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => router.push('/notifications')}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    查看全部
                  </button>
                  <button 
                    onClick={() => setShowMobileNotificationDropdown(false)}
                    className={`p-1 rounded-lg ${
                      isDark ? "hover:bg-[#252842] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex mt-3 space-x-1">
                {[
                  { id: 'all', label: '全部' },
                  { id: 'trading', label: '交易' },
                  { id: 'system', label: '系统' },
                  { id: 'social', label: '社交' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setNotificationFilter(filter.id as any)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      notificationFilter === filter.id
                        ? isDark
                          ? "bg-white text-black"
                          : "bg-black text-white"
                        : isDark
                        ? "text-gray-400 hover:text-white hover:bg-[#252842]"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-96">
              {/* Price Alert */}
              <div className={`p-4 border-b ${isDark ? "border-[#252842]" : "border-gray-100"} hover:bg-opacity-50 ${
                isDark ? "hover:bg-[#252842]" : "hover:bg-gray-50"
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                      价格提醒
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      BTC 已达到您设置的目标价格 $67,500
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2分钟前</p>
                  </div>
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                </div>
              </div>

              {/* Trading Update */}
              <div className={`p-4 border-b ${isDark ? "border-[#252842]" : "border-gray-100"} hover:bg-opacity-50 ${
                isDark ? "hover:bg-[#252842]" : "hover:bg-gray-50"
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowRightLeft className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                      交易完成
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      您的 ETH/USDT 订单已成功执行
                    </p>
                    <p className="text-xs text-gray-500 mt-1">5分钟前</p>
                  </div>
                </div>
              </div>

              {/* System Notice */}
              <div className={`p-4 border-b ${isDark ? "border-[#252842]" : "border-gray-100"} hover:bg-opacity-50 ${
                isDark ? "hover:bg-[#252842]" : "hover:bg-gray-50"
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Settings className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                      系统更新
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      平台将于今晚 2:00-4:00 进行系统维护
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1小时前</p>
                  </div>
                </div>
              </div>

              {/* Social Activity */}
              <div className={`p-4 hover:bg-opacity-50 ${
                isDark ? "hover:bg-[#252842]" : "hover:bg-gray-50"
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                      新的关注者
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      用户 @trader123 开始关注您
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3小时前</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Modal */}
      {showContactInfo && (
        <div 
          className="fixed inset-0 bg-black/50 z-[90]"
          onClick={() => setShowContactInfo(false)}
        >
          <div 
            className={`fixed top-0 right-0 h-full w-full md:w-96 transform transition-transform duration-300 ease-out shadow-xl ${
              isDark ? "bg-[#1a1d29]" : "bg-white"
            } overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-4 border-b ${isDark ? "border-[#252842]" : "border-gray-200"} flex items-center justify-between`}>
              <button 
                onClick={() => setShowContactInfo(false)}
                className={`p-2 rounded-lg ${
                  isDark ? "hover:bg-[#252842] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                聊天详情
              </h3>
              <div></div>
            </div>

            {/* Contact Avatar and Name */}
            <div className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {(() => {
                  const currentContact = friendContacts.find(c => c.id === selectedContact) || escrowContacts.find(c => c.id === selectedContact)
                  return currentContact?.avatar || "🤖"
                })()}
              </div>
              <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                {(() => {
                  const currentContact = friendContacts.find(c => c.id === selectedContact) || escrowContacts.find(c => c.id === selectedContact)
                  return currentContact?.name || "交易助手"
                })()}
              </h2>
              <button className={`mt-2 w-12 h-12 rounded border-2 border-dashed ${
                isDark ? "border-gray-600 text-gray-400 hover:border-gray-500" : "border-gray-300 text-gray-500 hover:border-gray-400"
              } flex items-center justify-center text-2xl transition-colors`}>
                +
              </button>
            </div>

            {/* Settings Options */}
            <div className="px-4 pb-4 space-y-1">
              {/* Search Chat Content */}
              <button className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#252842] text-white" : "hover:bg-gray-50 text-gray-800"
              }`}>
                <span>查找聊天内容</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Message Not Disturb */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                <span>消息免打扰</span>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? "bg-[#252842]" : "bg-gray-200"
                } focus:outline-none`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`} />
                </button>
              </div>

              {/* Pin Chat */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                <span>置顶聊天</span>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? "bg-[#252842]" : "bg-gray-200"
                } focus:outline-none`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`} />
                </button>
              </div>

              {/* Reminder */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                <span>提醒</span>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? "bg-[#252842]" : "bg-gray-200"
                } focus:outline-none`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`} />
                </button>
              </div>

              {/* Set Chat Background */}
              <button className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#252842] text-white" : "hover:bg-gray-50 text-gray-800"
              }`}>
                <span>设置当前聊天背景</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Clear Chat Records */}
              <button className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#252842] text-white" : "hover:bg-gray-50 text-gray-800"
              }`}>
                <span>清空聊天记录</span>
              </button>

              {/* Report */}
              <button className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#252842] text-white" : "hover:bg-gray-50 text-gray-800"
              }`}>
                <span>投诉</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Language Dropdown */}
      {showMobileLanguageDropdown && (
        <div 
          className="fixed inset-0 bg-black/50 z-[120] flex items-center justify-center p-4"
          onClick={() => setShowMobileLanguageDropdown(false)}
        >
          <div 
            className={`w-full max-w-xs rounded-lg shadow-xl overflow-hidden ${
              isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-4 border-b ${isDark ? "border-[#252842]" : "border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                  选择语言
                </h3>
                <button 
                  onClick={() => setShowMobileLanguageDropdown(false)}
                  className={`p-1 rounded-lg ${
                    isDark ? "hover:bg-[#252842] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Language Options */}
            <div className="p-2">
              <button
                onClick={() => handleLanguageSelect("zh")}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  language === "zh"
                    ? isDark
                      ? "bg-white text-black"
                      : "bg-black text-white"
                    : isDark
                    ? "text-white hover:bg-[#252842]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🇨🇳</span>
                  <span>中文</span>
                </div>
                {language === "zh" && (
                  <Check className="h-4 w-4" />
                )}
              </button>
              
              <button
                onClick={() => handleLanguageSelect("en")}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  language === "en"
                    ? isDark
                      ? "bg-white text-black"
                      : "bg-black text-white"
                    : isDark
                    ? "text-white hover:bg-[#252842]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                </div>
                {language === "en" && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}