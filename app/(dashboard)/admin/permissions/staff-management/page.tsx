"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Trash2, Edit, Loader2 } from "lucide-react"

interface Staff {
  id: string
  account: string
  name: string
  role: string
  department: string
  phone: string
  email: string
  status: "active" | "inactive"
  createdAt: string
  lastLogin: string
}

const mockStaffData: Staff[] = [
  { id: "1", account: "admin001", name: "张三", role: "超级管理员", department: "技术部", phone: "138****1234", email: "zhangsan@example.com", status: "active", createdAt: "2024-01-15", lastLogin: "2025-01-07 09:30" },
  { id: "2", account: "admin002", name: "李四", role: "财务审核员", department: "财务部", phone: "139****5678", email: "lisi@example.com", status: "active", createdAt: "2024-02-20", lastLogin: "2025-01-07 10:15" },
  { id: "3", account: "admin003", name: "王五", role: "风控专员", department: "风控部", phone: "137****9012", email: "wangwu@example.com", status: "active", createdAt: "2024-03-10", lastLogin: "2025-01-06 14:20" },
  { id: "4", account: "admin004", name: "赵六", role: "客服主管", department: "客服部", phone: "136****3456", email: "zhaoliu@example.com", status: "inactive", createdAt: "2024-04-05", lastLogin: "2024-12-25 11:00" },
  { id: "5", account: "admin005", name: "钱七", role: "运营专员", department: "运营部", phone: "135****7890", email: "qianqi@example.com", status: "active", createdAt: "2024-05-18", lastLogin: "2025-01-07 08:45" },
  { id: "6", account: "admin006", name: "孙八", role: "技术支持", department: "技术部", phone: "134****2345", email: "sunba@example.com", status: "active", createdAt: "2024-06-22", lastLogin: "2025-01-07 11:30" },
  { id: "7", account: "admin007", name: "周九", role: "财务主管", department: "财务部", phone: "133****6789", email: "zhoujiu@example.com", status: "active", createdAt: "2024-07-14", lastLogin: "2025-01-07 09:00" },
  { id: "8", account: "admin008", name: "吴十", role: "合规专员", department: "合规部", phone: "132****0123", email: "wushi@example.com", status: "inactive", createdAt: "2024-08-30", lastLogin: "2024-11-15 16:40" },
  { id: "9", account: "admin009", name: "郑十一", role: "产品经理", department: "产品部", phone: "131****4567", email: "zheng11@example.com", status: "active", createdAt: "2024-09-12", lastLogin: "2025-01-06 17:25" },
  { id: "10", account: "admin010", name: "冯十二", role: "数据分析师", department: "数据部", phone: "130****8901", email: "feng12@example.com", status: "active", createdAt: "2024-10-25", lastLogin: "2025-01-07 10:50" },
  { id: "11", account: "admin011", name: "陈十三", role: "安全专员", department: "安全部", phone: "139****1111", email: "chen13@example.com", status: "active", createdAt: "2024-11-08", lastLogin: "2025-01-07 08:30" },
  { id: "12", account: "admin012", name: "褚十四", role: "市场专员", department: "市场部", phone: "138****2222", email: "chu14@example.com", status: "active", createdAt: "2024-12-01", lastLogin: "2025-01-06 15:10" },
]

const roles = ["全部", "超级管理员", "财务审核员", "风控专员", "客服主管", "运营专员", "技术支持", "财务主管", "合规专员", "产品经理", "数据分析师", "安全专员", "市场专员"]
const departments = ["全部", "技术部", "财务部", "风控部", "客服部", "运营部", "合规部", "产品部", "数据部", "安全部", "市场部"]
const statuses = ["全部", "启用", "禁用"]

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<Staff[]>(mockStaffData)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterRole, setFilterRole] = useState("全部")
  const [filterDepartment, setFilterDepartment] = useState("全部")
  const [filterStatus, setFilterStatus] = useState("全部")
  
  const [displayCount, setDisplayCount] = useState(10)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState({
    account: "",
    name: "",
    role: "",
    department: "",
    phone: "",
    email: "",
  })

  const filteredStaff = staffList.filter(staff => {
    const matchKeyword = !searchKeyword || 
      staff.account.includes(searchKeyword) || 
      staff.name.includes(searchKeyword) ||
      staff.email.includes(searchKeyword)
    const matchRole = filterRole === "全部" || staff.role === filterRole
    const matchDepartment = filterDepartment === "全部" || staff.department === filterDepartment
    const matchStatus = filterStatus === "全部" || 
      (filterStatus === "启用" && staff.status === "active") ||
      (filterStatus === "禁用" && staff.status === "inactive")
    return matchKeyword && matchRole && matchDepartment && matchStatus
  })

  const displayedStaff = filteredStaff.slice(0, displayCount)
  const hasMore = displayCount < filteredStaff.length

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 10)
      setIsLoadingMore(false)
    }, 500)
  }

  const handleToggleStatus = (id: string) => {
    setStaffList(prev => prev.map(staff => 
      staff.id === id 
        ? { ...staff, status: staff.status === "active" ? "inactive" : "active" }
        : staff
    ))
  }

  const handleOpenAdd = () => {
    setFormData({ account: "", name: "", role: "", department: "", phone: "", email: "" })
    setAddDialogOpen(true)
  }

  const handleOpenEdit = (staff: Staff) => {
    setEditingStaff(staff)
    setFormData({
      account: staff.account,
      name: staff.name,
      role: staff.role,
      department: staff.department,
      phone: staff.phone,
      email: staff.email,
    })
    setEditDialogOpen(true)
  }

  const handleAdd = () => {
    if (!formData.account || !formData.name) return
    const newStaff: Staff = {
      id: Date.now().toString(),
      ...formData,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: "-",
    }
    setStaffList(prev => [newStaff, ...prev])
    setAddDialogOpen(false)
  }

  const handleEdit = () => {
    if (!editingStaff || !formData.account || !formData.name) return
    setStaffList(prev => prev.map(staff =>
      staff.id === editingStaff.id
        ? { ...staff, ...formData }
        : staff
    ))
    setEditDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setStaffList(prev => prev.filter(staff => staff.id !== id))
  }

  return (
    <PermissionsLayout>
      <div className="p-6 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label className="text-xs text-muted-foreground mb-1 block">搜索</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="账号/姓名/邮箱"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="w-[150px]">
                <Label className="text-xs text-muted-foreground mb-1 block">角色</Label>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[150px]">
                <Label className="text-xs text-muted-foreground mb-1 block">部门</Label>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[120px]">
                <Label className="text-xs text-muted-foreground mb-1 block">状态</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleOpenAdd}>
                <Plus className="w-4 h-4 mr-1" />
                添加人员
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>账号</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>部门</TableHead>
                  <TableHead>手机号</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead className="text-center">状态</TableHead>
                  <TableHead>最后登录</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-mono">{staff.account}</TableCell>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{staff.role}</Badge>
                      </TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.phone}</TableCell>
                      <TableCell className="text-muted-foreground">{staff.email}</TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={staff.status === "active"}
                          onCheckedChange={() => handleToggleStatus(staff.id)}
                        />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{staff.lastLogin}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(staff)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleDelete(staff.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            {hasMore && (
              <div className="flex justify-center py-4 border-t">
                <Button
                  variant="ghost"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      加载中...
                    </>
                  ) : (
                    `加载更多 (${filteredStaff.length - displayCount} 条)`
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加人员</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>账号 *</Label>
                <Input
                  placeholder="请输入账号"
                  value={formData.account}
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>姓名 *</Label>
                <Input
                  placeholder="请输入姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>角色</Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.filter(r => r !== "全部").map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>部门</Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.filter(d => d !== "全部").map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>手机号</Label>
                <Input
                  placeholder="请输入手机号"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>邮箱</Label>
                <Input
                  placeholder="请输入邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAdd} disabled={!formData.account || !formData.name}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑人员</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>账号 *</Label>
                <Input
                  placeholder="请输入账号"
                  value={formData.account}
                  onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>姓名 *</Label>
                <Input
                  placeholder="请输入姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>角色</Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.filter(r => r !== "全部").map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>部门</Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.filter(d => d !== "全部").map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>手机号</Label>
                <Input
                  placeholder="请输入手机号"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>邮箱</Label>
                <Input
                  placeholder="请输入邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEdit} disabled={!formData.account || !formData.name}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PermissionsLayout>
  )
}
