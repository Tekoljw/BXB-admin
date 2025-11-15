"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function RegistrationWhitelistPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">注册白名单</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">管理允许注册的用户白名单</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>功能开发中</CardTitle>
          <CardDescription>此页面功能正在开发中</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
                <Settings className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                注册白名单管理功能正在开发中...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
