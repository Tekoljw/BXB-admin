"use client"

import { useState, useRef, useEffect } from "react"
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

  // Calculate dropdown position when opened
  const calculatePosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const dropdownWidth = 224 // w-56 = 14rem = 224px
      const dropdownHeight = 400 // estimated height
      const margin = 8
      
      // Calculate position from left instead of right for better control
      let left = buttonRect.right - dropdownWidth
      let top = buttonRect.bottom + margin
      
      // Ensure dropdown doesn't go off the left edge
      if (left < margin) {
        left = margin
      }
      
      // Ensure dropdown doesn't go off the right edge
      if (left + dropdownWidth > window.innerWidth - margin) {
        left = window.innerWidth - dropdownWidth - margin
      }
      
      // Ensure dropdown doesn't go off the bottom edge
      if (top + dropdownHeight > window.innerHeight - margin) {
        top = buttonRect.top - dropdownHeight - margin
        // If it still doesn't fit above, position it to fit within viewport
        if (top < margin) {
          top = margin
        }
      }
      
      setDropdownPosition({ top, left })
    }
  }

  // Handle click outside to close dropdown and window resize
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleResize() {
      if (isOpen) {
        calculatePosition()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("resize", handleResize)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen])

  const handleSignOut = () => {
    // Clear login state
    sessionStorage.removeItem("isLoggedIn")
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    // Redirect to login page
    router.push("/login")
  }

  const handleToggleDropdown = () => {
    if (!isOpen) {
      calculatePosition()
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={`w-10 h-10 bg-gradient-to-br from-custom-green to-custom-green/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg ${isOpen ? "ring-2 ring-custom-green/50 scale-105" : ""}`}
        onClick={handleToggleDropdown}
      >
        <User className="h-5 w-5" />
      </button>

      {isOpen && mounted && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            style={{ zIndex: 2147483646 }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div 
            ref={dropdownRef}
            className="fixed w-56 rounded-md shadow-2xl bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in slide-in-from-top-5 duration-200"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              zIndex: 2147483647
            }}
          >
          <div className="py-3 px-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200" onClick={() => console.log('Profile clicked')}>
                <div className="w-10 h-10 bg-gradient-to-br from-custom-green to-custom-green/80 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-center flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">demo@example.com</p>
                </div>
              </div>
              <button 
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ml-2"
                title="编辑个人资料"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
              <UserCircle className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              My Profile
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
              <CreditCard className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              Billing
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
              <Settings className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              Settings
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
              <HelpCircle className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              Help Center
            </button>
          </div>

          <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <div className="py-1 border-t border-gray-200 dark:border-gray-700">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-muted transition-colors duration-150"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </button>
          </div>
        </>,
        document.body
      )}
    </div>
  )
}
