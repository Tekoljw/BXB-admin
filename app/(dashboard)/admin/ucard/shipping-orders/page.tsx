'use client'

import { useState } from 'react'
import { Package, Eye, Truck, MapPin, Calendar, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { DataTotal } from "@/components/data-total"

interface ShippingOrder {
  id: string
  orderId: string
  userId: string
  username: string
  cardNumber: string
  cardType: string
  recipientName: string
  phone: string
  address: string
  province: string
  city: string
  district: string
  postalCode: string
  status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'returned'
  trackingNumber: string | null
  carrier: string | null
  createdAt: string
  shippedAt: string | null
  deliveredAt: string | null
  remark: string | null
}

const mockShippingOrders: ShippingOrder[] = [
  {
    id: '1',
    orderId: 'SHIP-20241125-001',
    userId: 'U123456',
    username: '张三',
    cardNumber: '4532****8901',
    cardType: '白金实体卡',
    recipientName: '张三',
    phone: '138****5678',
    address: '朝阳区建国路88号SOHO现代城A座2201',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    postalCode: '100022',
    status: 'delivered',
    trackingNumber: 'SF1234567890123',
    carrier: '顺丰速运',
    createdAt: '2024-11-20 10:30:00',
    shippedAt: '2024-11-21 09:00:00',
    deliveredAt: '2024-11-23 14:30:00',
    remark: null,
  },
  {
    id: '2',
    orderId: 'SHIP-20241125-002',
    userId: 'U234567',
    username: '李四',
    cardNumber: '4532****2345',
    cardType: '黑金实体卡',
    recipientName: '李四',
    phone: '139****1234',
    address: '南山区科技园南区T2栋15楼',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    postalCode: '518057',
    status: 'in_transit',
    trackingNumber: 'JD0123456789012',
    carrier: '京东物流',
    createdAt: '2024-11-23 15:20:00',
    shippedAt: '2024-11-24 10:00:00',
    deliveredAt: null,
    remark: null,
  },
  {
    id: '3',
    orderId: 'SHIP-20241125-003',
    userId: 'U345678',
    username: '王五',
    cardNumber: '4532****6789',
    cardType: '白金实体卡',
    recipientName: '王五',
    phone: '137****9012',
    address: '浦东新区陆家嘴环路1000号恒生银行大厦28楼',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    postalCode: '200120',
    status: 'shipped',
    trackingNumber: 'YTO9876543210987',
    carrier: '圆通速递',
    createdAt: '2024-11-24 09:45:00',
    shippedAt: '2024-11-25 08:30:00',
    deliveredAt: null,
    remark: null,
  },
  {
    id: '4',
    orderId: 'SHIP-20241125-004',
    userId: 'U456789',
    username: '赵六',
    cardNumber: '4532****0123',
    cardType: '标准实体卡',
    recipientName: '赵六',
    phone: '136****3456',
    address: '西湖区文三路478号华星科技大厦12楼',
    province: '浙江省',
    city: '杭州市',
    district: '西湖区',
    postalCode: '310012',
    status: 'processing',
    trackingNumber: null,
    carrier: null,
    createdAt: '2024-11-25 11:00:00',
    shippedAt: null,
    deliveredAt: null,
    remark: '正在制卡中',
  },
  {
    id: '5',
    orderId: 'SHIP-20241125-005',
    userId: 'U567890',
    username: '钱七',
    cardNumber: '4532****4567',
    cardType: '黑金实体卡',
    recipientName: '钱七',
    phone: '135****7890',
    address: '天河区珠江新城华夏路30号富力盈通大厦35楼',
    province: '广东省',
    city: '广州市',
    district: '天河区',
    postalCode: '510623',
    status: 'pending',
    trackingNumber: null,
    carrier: null,
    createdAt: '2024-11-25 14:30:00',
    shippedAt: null,
    deliveredAt: null,
    remark: null,
  },
  {
    id: '6',
    orderId: 'SHIP-20241124-001',
    userId: 'U678901',
    username: '孙八',
    cardNumber: '4532****8901',
    cardType: '白金实体卡',
    recipientName: '孙八',
    phone: '134****2345',
    address: '雨花台区软件大道119号丰盛商汇5楼',
    province: '江苏省',
    city: '南京市',
    district: '雨花台区',
    postalCode: '210012',
    status: 'returned',
    trackingNumber: 'ZTO1122334455667',
    carrier: '中通快递',
    createdAt: '2024-11-18 16:00:00',
    shippedAt: '2024-11-19 09:30:00',
    deliveredAt: null,
    remark: '地址错误，已退回',
  },
]

export default function UCardShippingOrdersPage() {
  const [orders] = useState<ShippingOrder[]>(mockShippingOrders)
  const [searchInput, setSearchInput] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrder | null>(null)

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped' || o.status === 'in_transit').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    returned: orders.filter(o => o.status === 'returned').length,
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchInput.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchInput.toLowerCase()) ||
      order.username.includes(searchInput) ||
      order.trackingNumber?.toLowerCase().includes(searchInput.toLowerCase()) ||
      order.recipientName.includes(searchInput)
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const badges: Record<string, JSX.Element> = {
      pending: <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">待处理</span>,
      processing: <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">制卡中</span>,
      shipped: <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">已发货</span>,
      in_transit: <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">运输中</span>,
      delivered: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">已签收</span>,
      returned: <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">已退回</span>,
    }
    return badges[status] || badges.pending
  }

  const getCardTypeBadge = (cardType: string) => {
    if (cardType.includes('黑金')) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-900 text-white dark:bg-gray-700 rounded">{cardType}</span>
    }
    if (cardType.includes('白金')) {
      return <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 rounded">{cardType}</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded">{cardType}</span>
  }

  const openDetailDialog = (order: ShippingOrder) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }

  const handleReset = () => {
    setSearchInput('')
    setFilterStatus('all')
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">实体卡寄送订单</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          管理所有实体卡的寄送订单和物流跟踪
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">总订单</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">待处理</div>
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{stats.pending}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">制卡中</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.processing}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">运输中</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.shipped}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">已签收</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.delivered}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">已退回</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.returned}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="搜索订单号、用户ID、收件人、物流单号..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1"
          />
          <Button className="bg-custom-green hover:bg-custom-green/90">
            <Search className="w-4 h-4 mr-1" />
            搜索
          </Button>
          <Button variant="outline" onClick={handleReset}>
            重置
          </Button>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待处理</SelectItem>
            <SelectItem value="processing">制卡中</SelectItem>
            <SelectItem value="shipped">已发货</SelectItem>
            <SelectItem value="in_transit">运输中</SelectItem>
            <SelectItem value="delivered">已签收</SelectItem>
            <SelectItem value="returned">已退回</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    订单信息
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    卡片信息
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    收件信息
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    物流信息
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3">
                      <div className="font-mono text-sm text-blue-600 dark:text-blue-400">
                        {order.orderId}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {order.createdAt}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {order.username}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {order.userId}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="mb-1">
                        {getCardTypeBadge(order.cardType)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {order.cardNumber}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {order.recipientName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {order.phone}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px] truncate" title={`${order.province}${order.city}${order.district}${order.address}`}>
                        {order.city}{order.district}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {order.trackingNumber ? (
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {order.carrier}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                            {order.trackingNumber}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetailDialog(order)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无寄送订单
          </div>
        )}

        {filteredOrders.length > 0 && (
          <DataTotal total={filteredOrders.length} />
        )}
      </div>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>寄送订单详情</DialogTitle>
            <DialogDescription>
              订单号: {selectedOrder?.orderId}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">订单状态</span>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      卡片信息
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">卡片类型</span>
                        <span className="text-sm font-medium">{selectedOrder.cardType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">卡号</span>
                        <span className="text-sm font-mono">{selectedOrder.cardNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      时间信息
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">创建时间</span>
                        <span className="text-sm">{selectedOrder.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">发货时间</span>
                        <span className="text-sm">{selectedOrder.shippedAt || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">签收时间</span>
                        <span className="text-sm">{selectedOrder.deliveredAt || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      收件信息
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">收件人</span>
                        <span className="text-sm font-medium">{selectedOrder.recipientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">联系电话</span>
                        <span className="text-sm">{selectedOrder.phone}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">收件地址</span>
                        <p className="text-sm mt-1">
                          {selectedOrder.province}{selectedOrder.city}{selectedOrder.district}{selectedOrder.address}
                        </p>
                        <span className="text-xs text-gray-400">邮编: {selectedOrder.postalCode}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      物流信息
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">快递公司</span>
                        <span className="text-sm">{selectedOrder.carrier || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">物流单号</span>
                        <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
                          {selectedOrder.trackingNumber || '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.remark && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <span className="text-sm text-yellow-800 dark:text-yellow-300">
                    备注: {selectedOrder.remark}
                  </span>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
