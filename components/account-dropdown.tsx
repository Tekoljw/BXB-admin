"use client"

import { useState, useRef, useEffect } from "react"
import { User, LogOut, Settings, UserCircle, CreditCard, HelpCircle, Edit3 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignOut = () => {
    // Clear login state
    sessionStorage.removeItem("isLoggedIn")
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    // Redirect to login page
    router.push("/login")
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`w-10 h-10 bg-gradient-to-br from-custom-green to-custom-green/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg ${isOpen ? "ring-2 ring-custom-green/50 scale-105" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card ring-1 ring-black/5 dark:ring-white/10 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="py-3 px-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors duration-200" onClick={() => console.log('Profile clicked')}>
                <div className="w-10 h-10 bg-gradient-to-br from-custom-green to-custom-green/80 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-center flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">demo@example.com</p>
                </div>
              </div>
              <button 
                className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-200 text-muted-foreground hover:text-foreground ml-2"
                title="编辑个人资料"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
              <UserCircle className="h-4 w-4 mr-3 text-muted-foreground" />
              My Profile
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
              <CreditCard className="h-4 w-4 mr-3 text-muted-foreground" />
              Billing
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
              <Settings className="h-4 w-4 mr-3 text-muted-foreground" />
              Settings
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
              <HelpCircle className="h-4 w-4 mr-3 text-muted-foreground" />
              Help Center
            </button>
          </div>

          <div className="py-1 border-t border-border">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-muted transition-colors duration-150"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
