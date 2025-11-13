"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface AdminUser {
  id: string
  username: string
  email: string
  fullName: string
  role: string
  avatarUrl?: string
  locale: string
  lastLoginAt?: string
  permissions: string[]
  requires2FAReset: boolean
  passwordLastUpdated?: string
}

interface AdminContextType {
  isAdminLoggedIn: boolean
  adminUser: AdminUser | null
  login: (callback?: () => void) => void
  logout: () => void
  loadUser: (user: AdminUser) => void
  updateUser: (updates: Partial<AdminUser>) => void
  clearUser: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    // 检查管理员登录状态
    const adminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true" || 
                          localStorage.getItem("isAdminLoggedIn") === "true"
    setIsAdminLoggedIn(adminLoggedIn)
    
    // 尝试从localStorage加载用户信息
    if (adminLoggedIn) {
      const storedUser = localStorage.getItem("adminUser")
      if (storedUser) {
        try {
          setAdminUser(JSON.parse(storedUser))
        } catch (e) {
          console.error("Failed to parse admin user from storage", e)
        }
      }
    }
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

  const loadUser = (user: AdminUser) => {
    setAdminUser(user)
    // 只存储非敏感字段到localStorage
    const { permissions, ...nonSensitiveData } = user
    localStorage.setItem("adminUser", JSON.stringify(nonSensitiveData))
  }

  const updateUser = (updates: Partial<AdminUser>) => {
    setAdminUser(prev => {
      if (!prev) return null
      const updated = { ...prev, ...updates }
      const { permissions, ...nonSensitiveData } = updated
      localStorage.setItem("adminUser", JSON.stringify(nonSensitiveData))
      return updated
    })
  }

  const clearUser = () => {
    setAdminUser(null)
    localStorage.removeItem("adminUser")
  }

  const logout = () => {
    setIsAdminLoggedIn(false)
    sessionStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("isAdminLoggedIn")
    clearUser()
  }

  return (
    <AdminContext.Provider value={{ 
      isAdminLoggedIn, 
      adminUser, 
      login, 
      logout, 
      loadUser, 
      updateUser, 
      clearUser 
    }}>
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
