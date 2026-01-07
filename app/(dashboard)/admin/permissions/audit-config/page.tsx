"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
      <div className="p-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">类型</TableHead>
                  <TableHead className="text-center">sh.lineOfBusiness</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.type}</TableCell>
                    <TableCell className="text-center">{item.lineOfBusiness}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        编辑
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
