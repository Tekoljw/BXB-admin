"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { 
  MessageCircle, 
  Users, 
  ArrowLeftRight, 
  FileText, 
  BarChart2, 
  DollarSign 
} from "lucide-react"

interface SideNavigationProps {
  onCloseMobile?: () => void
}

export default function SideNavigation({ onCloseMobile }: SideNavigationProps) {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const navigationItems = [
    { href: "/chat", icon: MessageCircle, label: "聊天" },
    { href: "/moments", icon: Users, label: "动态" },
    { href: "/spot", icon: ArrowLeftRight, label: "现货" },
    { href: "/futures", icon: FileText, label: "合约" },
    { href: "/usdt-trade", icon: DollarSign, label: "USDT买卖" },
    { href: "/market", icon: BarChart2, label: "行情" }
  ]

  return (
    <nav className={`w-64 h-screen ${isDark ? "bg-[#1a1d29]" : "bg-white"} border-r ${isDark ? "border-[#252842]" : "border-gray-200"}`}>
      <div className="p-4">
        <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-8`}>
          BeDAO
        </h1>
        
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left ${
                  isActive
                    ? "bg-[#00D4AA] text-white"
                    : isDark
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}