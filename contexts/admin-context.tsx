"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isAdminLoggedIn: boolean
  login: (callback?: () => void) => void
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    // 检查管理员登录状态
    const adminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true" || 
                          localStorage.getItem("isAdminLoggedIn") === "true"
    setIsAdminLoggedIn(adminLoggedIn)
  }, [])

  const login = (callback?: () => void) => {
    setIsAdminLoggedIn(true)
    sessionStorage.setItem("isAdminLoggedIn", "true")
    localStorage.setItem("isAdminLoggedIn", "true")
    
    // 如果提供了回调，在下一个事件循环中执行，确保状态已更新
    if (callback) {
      setTimeout(callback, 0)
    }
  }

  const logout = () => {
    setIsAdminLoggedIn(false)
    sessionStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("isAdminLoggedIn")
  }

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
