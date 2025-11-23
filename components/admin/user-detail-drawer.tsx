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

export interface KYCAddress {
  type: 'residential' | 'billing' | 'mailing'
  country: string
  province?: string
  city: string
  district?: string
  street: string
  postalCode?: string
  isPrimary: boolean
}

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
  kycAddresses?: KYCAddress[]
  kycDateOfBirth?: string
  kycNationality?: string
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
            
            <div className="space-y-4">
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
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">身份信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">真实姓名</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycRealName || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">出生日期</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycDateOfBirth || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">国籍</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycNationality || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">证件类型</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycIdType || '-'}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">证件号码</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycIdNumber || '-'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {user.kycAddresses && user.kycAddresses.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">地址信息</h4>
                      <div className="space-y-4">
                        {user.kycAddresses.map((address, index) => (
                          <div 
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                {address.type === 'residential' ? '居住地址' : 
                                 address.type === 'billing' ? '账单地址' : '邮寄地址'}
                              </span>
                              {address.isPrimary && (
                                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                                  主要地址
                                </span>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-900 dark:text-white">
                                {address.country}
                                {address.province && ` ${address.province}`}
                                {` ${address.city}`}
                                {address.district && ` ${address.district}`}
                              </p>
                              <p className="text-sm text-gray-900 dark:text-white">
                                {address.street}
                              </p>
                              {address.postalCode && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  邮编: {address.postalCode}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">认证时间</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycVerifiedAt || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">认证国家</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycCountry || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
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
