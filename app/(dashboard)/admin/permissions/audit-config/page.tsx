"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface Auditor {
  id: string
  account: string
  name: string
  role: string
}

type AuditPermissionType = "add_funds" | "deduct_funds" | "transfer_funds"

interface PermissionAuditors {
  level1: Auditor[]
  level2: Auditor[]
}

const permissionLabels: Record<AuditPermissionType, string> = {
  add_funds: "添加资金",
  deduct_funds: "扣减资金",
  transfer_funds: "资金互转",
}

const initialData: Record<AuditPermissionType, PermissionAuditors> = {
  add_funds: {
    level1: [
      { id: "1", account: "admin001", name: "张三", role: "财务审核员" },
      { id: "2", account: "admin002", name: "李四", role: "风控审核员" },
    ],
    level2: [
      { id: "1", account: "manager001", name: "王五", role: "财务主管" },
    ],
  },
  deduct_funds: {
    level1: [
      { id: "1", account: "admin003", name: "孙八", role: "财务审核员" },
    ],
    level2: [
      { id: "1", account: "manager002", name: "周九", role: "风控主管" },
      { id: "2", account: "manager003", name: "吴十", role: "运营主管" },
    ],
  },
  transfer_funds: {
    level1: [
      { id: "1", account: "admin004", name: "郑十一", role: "财务审核员" },
      { id: "2", account: "admin005", name: "冯十二", role: "风控审核员" },
    ],
    level2: [
      { id: "1", account: "manager004", name: "陈十三", role: "财务主管" },
    ],
  },
}

interface AuditLevelSectionProps {
  title: string
  auditors: Auditor[]
  onAdd: () => void
  onRemove: (id: string) => void
}

function AuditLevelSection({ title, auditors, onAdd, onRemove }: AuditLevelSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4 mr-1" />
          添加审核人员
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>账号</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>角色</TableHead>
              <TableHead className="text-center w-24">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  暂无审核人员
                </TableCell>
              </TableRow>
            ) : (
              auditors.map((auditor) => (
                <TableRow key={auditor.id}>
                  <TableCell className="font-mono">{auditor.account}</TableCell>
                  <TableCell>{auditor.name}</TableCell>
                  <TableCell>{auditor.role}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => onRemove(auditor.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function AuditConfigPage() {
  const [activeTab, setActiveTab] = useState<AuditPermissionType>("add_funds")
  const [auditorsData, setAuditorsData] = useState<Record<AuditPermissionType, PermissionAuditors>>(initialData)
  
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addingLevel, setAddingLevel] = useState<1 | 2>(1)
  const [newAuditor, setNewAuditor] = useState({ account: "", name: "", role: "" })

  const handleOpenAddDialog = (level: 1 | 2) => {
    setAddingLevel(level)
    setNewAuditor({ account: "", name: "", role: "" })
    setAddDialogOpen(true)
  }

  const handleAddAuditor = () => {
    if (!newAuditor.account || !newAuditor.name) return
    
    const auditor: Auditor = {
      id: Date.now().toString(),
      ...newAuditor
    }
    
    setAuditorsData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [addingLevel === 1 ? "level1" : "level2"]: [
          ...prev[activeTab][addingLevel === 1 ? "level1" : "level2"],
          auditor
        ]
      }
    }))
    
    setAddDialogOpen(false)
  }

  const handleRemoveAuditor = (level: 1 | 2, id: string) => {
    const levelKey = level === 1 ? "level1" : "level2"
    setAuditorsData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [levelKey]: prev[activeTab][levelKey].filter(a => a.id !== id)
      }
    }))
  }

  const currentAuditors = auditorsData[activeTab]

  return (
    <PermissionsLayout>
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AuditPermissionType)}>
          <TabsList className="mb-6">
            {(Object.keys(permissionLabels) as AuditPermissionType[]).map((key) => (
              <TabsTrigger key={key} value={key} className="px-6">
                {permissionLabels[key]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {(Object.keys(permissionLabels) as AuditPermissionType[]).map((key) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <AuditLevelSection
                title="一级审核"
                auditors={auditorsData[key].level1}
                onAdd={() => handleOpenAddDialog(1)}
                onRemove={(id) => handleRemoveAuditor(1, id)}
              />
              
              <AuditLevelSection
                title="二级审核"
                auditors={auditorsData[key].level2}
                onAdd={() => handleOpenAddDialog(2)}
                onRemove={(id) => handleRemoveAuditor(2, id)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              添加{addingLevel === 1 ? "一级" : "二级"}审核人员 - {permissionLabels[activeTab]}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>账号 *</Label>
              <Input
                placeholder="请输入账号"
                value={newAuditor.account}
                onChange={(e) => setNewAuditor({ ...newAuditor, account: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>姓名 *</Label>
              <Input
                placeholder="请输入姓名"
                value={newAuditor.name}
                onChange={(e) => setNewAuditor({ ...newAuditor, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>角色</Label>
              <Input
                placeholder="请输入角色（可选）"
                value={newAuditor.role}
                onChange={(e) => setNewAuditor({ ...newAuditor, role: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={handleAddAuditor}
              disabled={!newAuditor.account || !newAuditor.name}
            >
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PermissionsLayout>
  )
}
