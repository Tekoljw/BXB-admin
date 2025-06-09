"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Menu, X } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "true")
    document.cookie = "isLoggedIn=true; path=/"
  }, [])

  const closeMobileSidebar = () => setMobileSidebarOpen(false)

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 h-12 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-[#00D4AA]">BeDAO</h1>
        <div className="w-8" />
      </div>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 md:relative md:translate-x-0 md:z-0 transition-transform duration-200 ${
          sidebarExpanded ? "md:w-64" : "md:w-16"
        }`}
      >
        <Sidebar
          onCloseMobile={closeMobileSidebar}
          onToggleExpanded={setSidebarExpanded}
          isExpanded={sidebarExpanded}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-12 md:pt-0">
        {children}
      </div>
    </div>
  )
}
