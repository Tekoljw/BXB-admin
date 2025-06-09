"use client"

import type React from "react"

import { useEffect, useState, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import SideNavigation from "@/components/side-navigation-new"
import MobileSidebarToggle from "@/components/mobile-sidebar-toggle"
import NavigationLoader from "@/components/navigation-loader"

// 内存化侧边栏组件
const MemoizedSideNavigation = memo(SideNavigation)
const MemoizedMobileSidebarToggle = memo(MobileSidebarToggle)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) // 改为false减少初始渲染
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  // 简化登录检查，移除不必要的延迟
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "true")
    document.cookie = "isLoggedIn=true; path=/"
  }, [])

  // 事件处理函数
  const handleCloseMobile = useCallback(() => {
    setMobileSidebarOpen(false)
  }, [])

  const handleToggleMobile = useCallback((isOpen: boolean) => {
    setMobileSidebarOpen(isOpen)
  }, [])

  // 简化点击外部关闭逻辑
  useEffect(() => {
    if (!mobileSidebarOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar")
      const toggle = document.getElementById("mobile-sidebar-toggle")

      if (
        sidebar &&
        toggle &&
        !sidebar.contains(event.target as Node) &&
        !toggle.contains(event.target as Node)
      ) {
        setMobileSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileSidebarOpen])

  // 优化滚动控制
  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileSidebarOpen])

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <NavigationLoader />
      <div className="h-full w-full">
        <div className="bg-card shadow-lg h-full">
          <div className="flex min-h-screen">
            {/* Mobile Top Navigation Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-background border-b border-border p-3 flex items-center justify-between z-30 min-h-[56px]">
              <div id="mobile-sidebar-toggle">
                <MemoizedMobileSidebarToggle onToggle={handleToggleMobile} isOpen={mobileSidebarOpen} />
              </div>
              <h1 className="text-lg font-semibold text-[#00D4AA]">BeDAO</h1>
              <div className="w-8"></div> {/* 占位符保持居中 */}
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                onClick={handleCloseMobile}
              />
            )}

            {/* Sidebar */}
            <div
              id="mobile-sidebar"
              className={`${
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } ${sidebarExpanded ? "expanded" : ""} fixed inset-y-0 left-0 z-30 w-64 border-r border-[#4B5563] transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 sidebar-width h-screen overflow-hidden`}
            >
              <MemoizedSideNavigation 
                onCloseMobile={handleCloseMobile} 
                onToggleExpanded={setSidebarExpanded}
                isExpanded={sidebarExpanded}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto w-full pt-14 md:pt-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
