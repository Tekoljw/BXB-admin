"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isAdminLoggedIn: boolean
  login: () => void
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

  const login = () => {
    setIsAdminLoggedIn(true)
    sessionStorage.setItem("isAdminLoggedIn", "true")
    localStorage.setItem("isAdminLoggedIn", "true")
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
