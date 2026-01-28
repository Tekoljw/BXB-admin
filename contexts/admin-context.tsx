"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { storageUtils } from "@/utils/storage-util"
import { authApis, type UserInfo as AuthUserInfo } from "@/router/auth-api"

interface UserInfo {
  name: string
  email: string
  role: string
  avatar: string
  userId?: string
  sysUserId?: number
  access?: Set<string>
}

interface AdminContextType {
  isAdminLoggedIn: boolean
  isLoggingOut: boolean
  userInfo: UserInfo | null
  login: (userData?: UserInfo, callback?: () => void) => void
  logout: () => void
  fetchUserInfo: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const getInitialLoginState = () => {
    if (typeof window === 'undefined') return false
    const accessToken = storageUtils.disk.get<string>('accessToken', '')
    const refreshToken = storageUtils.disk.get<string>('refreshToken', '')
    return !!(accessToken || refreshToken)
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

  const fetchUserInfo = async () => {
    try {
      const authUserInfo = await authApis.queryCurrentUser()
      if (authUserInfo) {
        const localUserInfo: UserInfo = {
          name: authUserInfo.userName,
          email: `${authUserInfo.userName}@bedao.com`,
          role: "超级管理员",
          avatar: "",
          userId: authUserInfo.userId,
          sysUserId: authUserInfo.sysUserId,
          access: authUserInfo.access,
        }
        setUserInfo(localUserInfo)
        localStorage.setItem("adminUserInfo", JSON.stringify(localUserInfo))
        setIsAdminLoggedIn(true)
        sessionStorage.setItem("isAdminLoggedIn", "true")
        localStorage.setItem("isAdminLoggedIn", "true")
      } else {
        logout()
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      logout()
    }
  }

  const login = async (userData?: UserInfo, callback?: () => void) => {
    setIsAdminLoggedIn(true)
    sessionStorage.setItem("isAdminLoggedIn", "true")
    localStorage.setItem("isAdminLoggedIn", "true")
    
    if (userData) {
      setUserInfo(userData)
      localStorage.setItem("adminUserInfo", JSON.stringify(userData))
    } else {
      await fetchUserInfo()
    }
    
    if (callback) {
      setTimeout(callback, 0)
    }
  }

  const logout = () => {
    setIsLoggingOut(true)
    setIsAdminLoggedIn(false)
    setUserInfo(null)
    
    // 清除sessionStorage
    sessionStorage.removeItem("isAdminLoggedIn")
    
    // 清除localStorage
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("adminUserInfo")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("lastActivity")
    localStorage.removeItem("clientCode")
    
    // 清除disk存储（带前缀的）
    storageUtils.disk.remove("accessToken")
    storageUtils.disk.remove("refreshToken")
    storageUtils.disk.remove("lang")
    
    // 清除所有admin相关的localStorage项
    if (typeof window !== 'undefined') {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('admin.')) {
          localStorage.removeItem(key)
        }
      })
      
      // 清除cookie
      document.cookie = "admin.accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      document.cookie = "admin.refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      document.cookie = "isAdminLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      
      // 跳转到登录页
      window.location.href = "/admin/login"
    }
    
    setTimeout(() => setIsLoggingOut(false), 100)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && isAdminLoggedIn && !userInfo) {
      fetchUserInfo()
    }
  }, [])

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, isLoggingOut, userInfo, login, logout, fetchUserInfo }}>
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
