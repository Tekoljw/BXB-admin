"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface UserInfo {
  name: string
  email: string
  role: string
  avatar: string
}

interface AdminContextType {
  isAdminLoggedIn: boolean
  isLoggingOut: boolean
  userInfo: UserInfo | null
  login: (userData?: UserInfo, callback?: () => void) => void
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // 同步初始化登录状态，避免首次渲染时错误地触发守卫
  const getInitialLoginState = () => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem("isAdminLoggedIn") === "true" || 
           localStorage.getItem("isAdminLoggedIn") === "true"
  }

  const getInitialUserInfo = () => {
    if (typeof window === 'undefined') return null
    const storedUserInfo = localStorage.getItem("adminUserInfo")
    if (storedUserInfo) {
      try {
        return JSON.parse(storedUserInfo)
      } catch {
        return null
      }
    }
    return null
  }

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(getInitialLoginState)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(getInitialUserInfo)

  const login = (userData?: UserInfo, callback?: () => void) => {
    setIsAdminLoggedIn(true)
    sessionStorage.setItem("isAdminLoggedIn", "true")
    localStorage.setItem("isAdminLoggedIn", "true")
    
    // 使用提供的用户数据或默认值
    const userInfoToSet: UserInfo = userData || {
      name: "管理员",
      email: "admin@bedao.com",
      role: "超级管理员",
      avatar: ""
    }
    setUserInfo(userInfoToSet)
    localStorage.setItem("adminUserInfo", JSON.stringify(userInfoToSet))
    
    // 如果提供了回调，在下一个事件循环中执行，确保状态已更新
    if (callback) {
      setTimeout(callback, 0)
    }
  }

  const logout = () => {
    // 立即设置登出状态，阻止渲染受保护内容
    setIsLoggingOut(true)
    setIsAdminLoggedIn(false)
    setUserInfo(null)
    sessionStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("adminUserInfo")
    
    // 跳转到登录页
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { 
        path: "/admin/login"
      } 
    }))
    
    // 重置登出状态
    setTimeout(() => setIsLoggingOut(false), 100)
  }

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, isLoggingOut, userInfo, login, logout }}>
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
