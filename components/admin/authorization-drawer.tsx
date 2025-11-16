'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Shield, Calendar, MapPin } from 'lucide-react'

interface AuthorizedUser {
  id: string
  userId: string
  username: string
  phone: string
  email: string
  authorizedAt: string
  authorizedLocation?: string
  permissions: string[]
}

interface AuthorizationDrawerProps {
  open: boolean
  onClose: () => void
  ownerUserId: string
  ownerUsername: string
  authorizedUsers: AuthorizedUser[]
}

export function AuthorizationDrawer({ 
  open, 
  onClose, 
  ownerUserId, 
  ownerUsername,
  authorizedUsers 
}: AuthorizationDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-6 h-6 text-custom-green" />
            授权管理
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* 账户所有者信息 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">账户所有者</h3>
            <div className="space-y-1">
              <p className="text-base font-semibold text-gray-900 dark:text-white">{ownerUsername}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">用户ID: {ownerUserId}</p>
            </div>
          </div>

          {/* 授权用户列表 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              已授权用户 ({authorizedUsers.length})
            </h3>

            {authorizedUsers.length > 0 ? (
              <div className="space-y-4">
                {authorizedUsers.map((authUser) => (
                  <div 
                    key={authUser.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-custom-green dark:hover:border-custom-green transition-colors"
                  >
                    {/* 用户基本信息 */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                          {authUser.username}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          用户ID: {authUser.userId}
                        </p>
                      </div>
                    </div>

                    {/* 联系方式 */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">手机号</p>
                        <p className="text-sm text-gray-900 dark:text-white mt-1">{authUser.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">邮箱</p>
                        <p className="text-sm text-gray-900 dark:text-white mt-1 truncate">{authUser.email}</p>
                      </div>
                    </div>

                    {/* 授权信息 */}
                    <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">授权时间</p>
                          <p className="text-sm text-gray-900 dark:text-white mt-1">{authUser.authorizedAt}</p>
                        </div>
                      </div>
                      {authUser.authorizedLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">授权地点</p>
                            <p className="text-sm text-gray-900 dark:text-white mt-1">{authUser.authorizedLocation}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 权限列表 */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">授权权限</p>
                      <div className="flex flex-wrap gap-2">
                        {authUser.permissions.map((permission, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-custom-green/10 text-custom-green dark:bg-custom-green/20 rounded-full"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">该用户暂未授权其他用户操作账户</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
