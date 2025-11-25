'use client'

import { X, MapPin } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { CheckCircle, XCircle } from 'lucide-react'

export interface KYCAddress {
  label: string
  country: string
  province: string
  city: string
  district?: string
  street: string
  postalCode?: string
  fullAddress: string
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
  kycBirthday?: string
  kycGender?: string
  kycNationality?: string
  kycAddresses?: KYCAddress[]
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">国籍</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {user.kycNationality || user.kycCountry || '-'}
                      </p>
                    </div>
                    {user.kycBirthday && (
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">出生日期</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycBirthday}
                        </p>
                      </div>
                    )}
                    {user.kycGender && (
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">性别</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {user.kycGender}
                        </p>
                      </div>
                    )}
                  </div>
                  {user.kycVerifiedAt && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">认证时间</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {user.kycVerifiedAt}
                      </p>
                    </div>
                  )}
                  
                  {user.kycAddresses && user.kycAddresses.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        地址信息
                      </h4>
                      <div className="space-y-3">
                        {user.kycAddresses.map((address, index) => (
                          <div 
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                {address.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {address.fullAddress}
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>国家: {address.country}</span>
                              <span>省/州: {address.province}</span>
                              <span>城市: {address.city}</span>
                              {address.district && <span>区/县: {address.district}</span>}
                              {address.postalCode && <span>邮编: {address.postalCode}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
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
