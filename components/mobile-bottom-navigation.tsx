"use client"

import { MessageCircle, Compass, DollarSign, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"

export default function MobileBottomNavigation() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === "dark"

  const navigationItems = [
    { 
      id: "chat", 
      icon: MessageCircle, 
      label: t("nav.chat"), 
      href: "/chat",
      isActive: pathname === "/chat"
    },
    { 
      id: "discover", 
      icon: Compass, 
      label: t("nav.discover"), 
      href: "/discover",
      isActive: pathname === "/discover"
    },
    { 
      id: "usdt", 
      icon: DollarSign, 
      label: "USDT", 
      href: "/usdt-trade",
      isActive: pathname === "/usdt-trade"
    },
    { 
      id: "trading", 
      icon: TrendingUp, 
      label: t("nav.trading"), 
      href: "/trading",
      isActive: pathname === "/trading" || pathname === "/spot" || pathname === "/futures"
    },
    { 
      id: "wallet", 
      icon: Wallet, 
      label: t("nav.wallet"), 
      href: "/wallet",
      isActive: pathname === "/wallet"
    }
  ]

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${
      isDark ? "bg-[#1a1d29] border-[#2a2d42]" : "bg-white border-gray-200"
    } border-t`}>
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-0 flex-1 ${
                item.isActive
                  ? isDark 
                    ? "bg-[#2a2d42] text-[#00D4AA]" 
                    : "bg-gray-100 text-[#00D4AA]"
                  : isDark 
                    ? "text-gray-400 hover:text-gray-300 hover:bg-[#252842]" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate max-w-full">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}