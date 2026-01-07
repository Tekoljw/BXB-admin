"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuditConfig {
  id: string
  type: string
  lineOfBusiness: string
}

const mockData: AuditConfig[] = [
  { id: "1", type: "添加资金", lineOfBusiness: "Asset System" },
  { id: "2", type: "扣减资金", lineOfBusiness: "Asset System" },
  { id: "3", type: "资金互转", lineOfBusiness: "Asset System" },
]

export default function AuditConfigPage() {
  const [data] = useState<AuditConfig[]>(mockData)
  const [editingItem, setEditingItem] = useState<AuditConfig | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({ lineOfBusiness: "" })

  const handleEdit = (item: AuditConfig) => {
    setEditingItem(item)
    setEditForm({ lineOfBusiness: item.lineOfBusiness })
    setEditDialogOpen(true)
  }

  const handleSave = () => {
    setEditDialogOpen(false)
    setEditingItem(null)
  }

  return (
    <PermissionsLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <th className="px-6 py-4 text-center text-sm font-medium text-blue-600 dark:text-blue-400">类型</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-blue-600 dark:text-blue-400">sh.lineOfBusiness</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-blue-600 dark:text-blue-400">操作</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700/30"}
                  >
                    <td className="px-6 py-4 text-center text-sm text-blue-600 dark:text-blue-400">{item.type}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-300">{item.lineOfBusiness}</td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => handleEdit(item)}
                      >
                        编辑
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑审核配置</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>类型</Label>
              <Input value={editingItem?.type || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>sh.lineOfBusiness</Label>
              <Input
                value={editForm.lineOfBusiness}
                onChange={(e) => setEditForm({ ...editForm, lineOfBusiness: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PermissionsLayout>
  )
}
