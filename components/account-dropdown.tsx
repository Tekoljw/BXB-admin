"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { User, LogOut, Settings, UserCircle, CreditCard, HelpCircle, Edit3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import ThemeToggle from "./theme-toggle"
import LanguageToggle from "./language-toggle"

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const { isDark } = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const calculatePosition = () => {
    if (!buttonRef.current) return

    const buttonRect = buttonRef.current.getBoundingClientRect()
    const dropdownWidth = 280
    const dropdownHeight = 400
    const padding = 16

    let left = buttonRect.left + buttonRect.width / 2 - dropdownWidth / 2
    let top = buttonRect.bottom + 8

    if (left < padding) {
      left = padding
    } else if (left + dropdownWidth > window.innerWidth - padding) {
      left = window.innerWidth - dropdownWidth - padding
    }

    if (top + dropdownHeight > window.innerHeight - padding) {
      top = buttonRect.top - dropdownHeight - 8
    }

    setDropdownPosition({ top, left })
  }

  const handleLogout = () => {
    setIsOpen(false)
    sessionStorage.removeItem("isLoggedIn")
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
  }

  const handleProfileClick = () => {
    router.push('/profile')
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="w-10 h-10 bg-gradient-to-br from-custom-green to-custom-green/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
        onClick={handleProfileClick}
      >
        <User className="h-5 w-5" />
      </button>

      {/* Removed dropdown popup - now redirects to profile page */}
      {false && isOpen && mounted && createPortal(
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            style={{ zIndex: 2147483646 }}
            onClick={() => setIsOpen(false)}
          />
          
          <div 
            ref={dropdownRef}
            className="fixed bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: '280px',
              zIndex: 2147483647
            }}
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-custom-green to-custom-green/80 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push("/profile")
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <UserCircle className="h-5 w-5" />
                <span>{t("profile")}</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push("/settings")
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>{t("settings")}</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push("/billing")
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                <span>{t("billing")}</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push("/help")
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                <span>{t("help")}</span>
              </button>

              <div className="border-t border-gray-100 dark:border-gray-800 my-2" />

              <div className="px-3 py-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t("theme")}</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t("language")}</span>
                  <LanguageToggle />
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 my-2" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{t("logout")}</span>
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  )
}