"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Trash2, Edit, Loader2, RotateCcw, Settings } from "lucide-react"

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

interface Role {
  id: string
  name: string
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

const initialRoles: Role[] = [
  { id: "1", name: "超级管理员" },
  { id: "2", name: "财务审核员" },
  { id: "3", name: "风控专员" },
  { id: "4", name: "客服主管" },
  { id: "5", name: "运营专员" },
  { id: "6", name: "技术支持" },
  { id: "7", name: "财务主管" },
  { id: "8", name: "合规专员" },
  { id: "9", name: "产品经理" },
  { id: "10", name: "数据分析师" },
  { id: "11", name: "安全专员" },
  { id: "12", name: "市场专员" },
]

const departments = ["全部", "技术部", "财务部", "风控部", "客服部", "运营部", "合规部", "产品部", "数据部", "安全部", "市场部"]
const statuses = ["全部", "启用", "禁用"]

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<Staff[]>(mockStaffData)
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterRole, setFilterRole] = useState("全部")
  const [filterDepartment, setFilterDepartment] = useState("全部")
  const [filterStatus, setFilterStatus] = useState("全部")
  
  const [displayCount, setDisplayCount] = useState(10)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [editSheetOpen, setEditSheetOpen] = useState(false)
  const [roleSheetOpen, setRoleSheetOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState({
    account: "",
    name: "",
    role: "",
    department: "",
    phone: "",
    email: "",
  })
  
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [roleFormData, setRoleFormData] = useState({ name: "" })

  const roleNames = ["全部", ...roles.map(r => r.name)]

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

  const handleResetGoogleAuth = (staff: Staff) => {
    console.log(`已重置 ${staff.name} 的谷歌验证码`)
  }

  const handleOpenAdd = () => {
    setFormData({ account: "", name: "", role: "", department: "", phone: "", email: "" })
    setAddSheetOpen(true)
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
    setEditSheetOpen(true)
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
    setAddSheetOpen(false)
  }

  const handleEdit = () => {
    if (!editingStaff || !formData.account || !formData.name) return
    setStaffList(prev => prev.map(staff =>
      staff.id === editingStaff.id
        ? { ...staff, ...formData }
        : staff
    ))
    setEditSheetOpen(false)
  }

  const handleDelete = (id: string) => {
    setStaffList(prev => prev.filter(staff => staff.id !== id))
  }

  const handleAddRole = () => {
    if (!roleFormData.name) return
    const newRole: Role = {
      id: Date.now().toString(),
      ...roleFormData
    }
    setRoles(prev => [...prev, newRole])
    setRoleFormData({ name: "" })
  }

  const handleEditRole = (role: Role) => {
    setEditingRole(role)
    setRoleFormData({ name: role.name })
  }

  const handleSaveRole = () => {
    if (!editingRole || !roleFormData.name) return
    setRoles(prev => prev.map(r =>
      r.id === editingRole.id ? { ...r, ...roleFormData } : r
    ))
    setEditingRole(null)
    setRoleFormData({ name: "" })
  }

  const handleDeleteRole = (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id))
  }

  const handleCancelEditRole = () => {
    setEditingRole(null)
    setRoleFormData({ name: "" })
  }

  return (
    <PermissionsLayout>
      <div className="p-6 space-y-4">
        <Card>
          <CardContent className="p-4 space-y-3">
            <Tabs value={filterRole} onValueChange={setFilterRole}>
              <TabsList className="h-9">
                {roleNames.map(role => (
                  <TabsTrigger key={role} value={role} className="text-sm px-4 h-8">
                    {role}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-4">
              <Tabs value={filterDepartment} onValueChange={setFilterDepartment}>
                <TabsList className="h-8">
                  {departments.map(dept => (
                    <TabsTrigger key={dept} value={dept} className="text-xs px-3 h-7">
                      {dept}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-4">
              <Tabs value={filterStatus} onValueChange={setFilterStatus}>
                <TabsList className="h-8">
                  {statuses.map(status => (
                    <TabsTrigger key={status} value={status} className="text-xs px-3 h-7">
                      {status}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索账号/姓名/邮箱"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="pl-9 h-8"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => setRoleSheetOpen(true)}>
                <Settings className="w-4 h-4 mr-1" />
                角色管理
              </Button>
              <Button size="sm" onClick={handleOpenAdd}>
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
                  <TableHead className="text-center">状态</TableHead>
                  <TableHead>最后登录</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
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
                            title="重置谷歌验证码"
                            onClick={() => handleResetGoogleAuth(staff)}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="编辑"
                            onClick={() => handleOpenEdit(staff)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="删除"
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

      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>添加人员</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-6">
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
            <div className="space-y-2">
              <Label>角色</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
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
          <SheetFooter>
            <Button variant="outline" onClick={() => setAddSheetOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAdd} disabled={!formData.account || !formData.name}>
              确定
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>编辑人员</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-6">
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
            <div className="space-y-2">
              <Label>角色</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
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
          <SheetFooter>
            <Button variant="outline" onClick={() => setEditSheetOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEdit} disabled={!formData.account || !formData.name}>
              保存
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={roleSheetOpen} onOpenChange={setRoleSheetOpen}>
        <SheetContent className="w-[450px] sm:w-[500px]">
          <SheetHeader>
            <SheetTitle>角色管理</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder={editingRole ? "编辑角色名称" : "输入角色名称"}
                value={roleFormData.name}
                onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                className="flex-1"
              />
              {editingRole ? (
                <>
                  <Button size="sm" onClick={handleSaveRole} disabled={!roleFormData.name}>
                    保存
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEditRole}>
                    取消
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={handleAddRole} disabled={!roleFormData.name}>
                  <Plus className="w-4 h-4 mr-1" />
                  添加
                </Button>
              )}
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="font-medium">{role.name}</div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditRole(role)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </PermissionsLayout>
  )
}
