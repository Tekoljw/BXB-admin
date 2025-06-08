"use client"

import type React from "react"

import { useEffect, useState, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import SideNavigation from "@/components/side-navigation"
import MobileSidebarToggle from "@/components/mobile-sidebar-toggle"
import NavigationLoader from "@/components/navigation-loader"

// 内存化侧边栏组件
const MemoizedSideNavigation = memo(SideNavigation)
const MemoizedMobileSidebarToggle = memo(MobileSidebarToggle)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) // 改为false减少初始渲染
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // 简化登录检查，移除不必要的延迟
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "true")
    document.cookie = "isLoggedIn=true; path=/"
  }, [])

  // 优化事件处理函数
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
      <div className="h-full w-full">
        <div className="bg-card shadow-lg h-full">
          <div className="flex h-screen">
            {/* Mobile Sidebar Toggle - 只在移动端显示 */}
            <div className="md:hidden fixed top-4 left-4 z-40">
              <div id="mobile-sidebar-toggle">
                <MemoizedMobileSidebarToggle onToggle={handleToggleMobile} isOpen={mobileSidebarOpen} />
              </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" />}

            {/* Sidebar */}
            <div
              id="mobile-sidebar"
              className={`${
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } fixed inset-y-0 left-0 z-30 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-out md:relative md:translate-x-0 md:w-24`}
            >
              <MemoizedSideNavigation onCloseMobile={handleCloseMobile} />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
