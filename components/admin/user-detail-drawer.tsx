'use client'

import { X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { CheckCircle, XCircle } from 'lucide-react'

export interface AdminUserProfile {
  userId: string
  username: string
  phone: string
  email: string
  isKYC: boolean
  kycRealName?: string
  kycIdNumber?: string
  kycCountry?: string
  kycIdType?: string
  kycVerifiedAt?: string
  registeredAt: string
  registeredLocation?: string
  lastLoginLocation?: string
  lastLoginTime?: string
}

interface UserDetailDrawerProps {
  open: boolean
  onClose: () => void
  user: AdminUserProfile | null
  moduleSpecificContent?: React.ReactNode
}

export function UserDetailDrawer({ open, onClose, user, moduleSpecificContent }: UserDetailDrawerProps) {
  if (!user) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>用户详情</SheetTitle>
          <SheetDescription>
            查看用户的完整资料信息
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">基本信息</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">用户ID</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{user.userId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">用户名</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{user.username}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">手机号</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{user.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">邮箱</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">KYC认证</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">认证状态</p>
                {user.isKYC ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">已认证</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">未认证</span>
                  </div>
                )}
              </div>

              {user.isKYC && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">真实姓名</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {user.kycRealName || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">证件类型</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {user.kycIdType || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">证件号码</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {user.kycIdNumber || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">国家/地区</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {user.kycCountry || '-'}
                      </p>
                    </div>
                  </div>
                  {user.kycVerifiedAt && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">认证时间</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {user.kycVerifiedAt}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">注册与登录</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">注册时间</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{user.registeredAt}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">注册地址</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {user.registeredLocation || '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">最近登录时间</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {user.lastLoginTime || '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">最近登录地址</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {user.lastLoginLocation || '-'}
                </p>
              </div>
            </div>
          </div>

          {moduleSpecificContent && (
            <div>
              {moduleSpecificContent}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
