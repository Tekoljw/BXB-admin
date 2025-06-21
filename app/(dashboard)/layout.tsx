"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import SideNavigation from "@/components/side-navigation"
import { useState } from "react"
import MobileSidebarToggle from "@/components/mobile-sidebar-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toast } = useToast()
  const { isAuthenticated, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "需要登录",
        description: "请先登录以访问此页面",
        variant: "destructive",
      })
      setTimeout(() => {
        window.location.href = "/api/login"
      }, 500)
      return
    }
  }, [isAuthenticated, isLoading, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#1a1d29] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#00D4AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1d29]">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SideNavigation />
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1d29] border-b border-gray-200 dark:border-[#252842] px-4 py-3">
          <MobileSidebarToggle 
            onToggle={setIsMobileMenuOpen}
            isOpen={isMobileMenuOpen}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-64">
              <SideNavigation onCloseMobile={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="pt-16 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}