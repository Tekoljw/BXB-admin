"use client"

import { useState } from "react"
import { FileText, TrendingUp, TrendingDown, Calculator, Settings, RefreshCw } from "lucide-react"

export default function FuturesPage() {
  const [selectedContract, setSelectedContract] = useState("BTCUSDT")
  const [leverage, setLeverage] = useState(10)
  const [orderType, setOrderType] = useState<"limit" | "market">("limit")
  const [side, setSide] = useState<"long" | "short">("long")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")

  const futuresContracts = [
    { symbol: "BTCUSDT", price: "43,250.00", change: "+2.34%", volume: "1.2B", funding: "0.0125%", trend: "up" },
    { symbol: "ETHUSDT", price: "2,680.50", change: "-1.23%", volume: "856M", funding: "-0.0089%", trend: "down" },
    { symbol: "BNBUSDT", price: "315.20", change: "+0.87%", volume: "234M", funding: "0.0067%", trend: "up" },
    { symbol: "ADAUSDT", price: "0.4521", change: "+3.45%", volume: "189M", funding: "0.0156%", trend: "up" },
    { symbol: "SOLUSDT", price: "98.76", change: "-2.10%", volume: "445M", funding: "-0.0234%", trend: "down" },
    { symbol: "DOTUSDT", price: "7.89", change: "+1.56%", volume: "123M", funding: "0.0098%", trend: "up" },
  ]

  const positions = [
    {
      symbol: "BTCUSDT",
      side: "Long",
      size: "0.5",
      entryPrice: "42,800.00",
      markPrice: "43,250.00",
      pnl: "+225.00",
      pnlPercent: "+1.05%",
      margin: "2,140.00",
      leverage: "20x",
    },
    {
      symbol: "ETHUSDT",
      side: "Short",
      size: "2.0",
      entryPrice: "2,720.00",
      markPrice: "2,680.50",
      pnl: "+79.00",
      pnlPercent: "+1.45%",
      margin: "268.05",
      leverage: "10x",
    },
  ]

  const orders = [
    {
      symbol: "BTCUSDT",
      side: "Long",
      type: "Limit",
      amount: "0.1",
      price: "42,500.00",
      status: "Open",
      time: "14:32:45",
    },
    {
      symbol: "ETHUSDT",
      side: "Short",
      type: "Stop",
      amount: "0.5",
      price: "2,750.00",
      status: "Triggered",
      time: "14:28:12",
    },
  ]

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-emerald-100 rounded-full p-2 mr-3">
            <FileText className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">合约交易</h1>
            <p className="text-gray-500 text-sm">永续合约和期货交易</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border rounded-md text-sm font-medium flex items-center hover:bg-gray-50">
            <Calculator className="h-4 w-4 mr-2" />
            计算器
          </button>
          <button className="px-4 py-2 bg-white border rounded-md text-sm font-medium flex items-center hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            设置
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700">
            <RefreshCw className="h-4 w-4 inline-block mr-2" />
            刷新
          </button>
        </div>
      </div>

      {/* 合约列表 */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <h2 className="text-lg font-bold mb-4">永续合约</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="pb-2 text-left">合约</th>
                <th className="pb-2 text-right">最新价格</th>
                <th className="pb-2 text-right">24h涨跌</th>
                <th className="pb-2 text-right">24h成交量</th>
                <th className="pb-2 text-right">资金费率</th>
                <th className="pb-2 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {futuresContracts.map((contract, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3">
                    <div className="font-medium">{contract.symbol}</div>
                    <div className="text-xs text-gray-500">永续</div>
                  </td>
                  <td className="py-3 text-right font-medium">${contract.price}</td>
                  <td className={`py-3 text-right ${contract.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                    <div className="flex items-center justify-end">
                      {contract.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {contract.change}
                    </div>
                  </td>
                  <td className="py-3 text-right">{contract.volume}</td>
                  <td
                    className={`py-3 text-right ${contract.funding.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {contract.funding}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      className="text-emerald-600 hover:text-emerald-700 text-sm"
                      onClick={() => setSelectedContract(contract.symbol)}
                    >
                      交易
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 交易面板 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-bold mb-4">开仓 {selectedContract}</h3>

            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 text-center rounded-l-md ${
                  side === "long" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSide("long")}
              >
                做多
              </button>
              <button
                className={`flex-1 py-2 text-center rounded-r-md ${
                  side === "short" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSide("short")}
              >
                做空
              </button>
            </div>

            <div className="flex mb-4">
              <button
                className={`flex-1 py-1 text-center text-sm ${
                  orderType === "limit" ? "border-b-2 border-emerald-500 text-emerald-500" : "text-gray-500"
                }`}
                onClick={() => setOrderType("limit")}
              >
                限价
              </button>
              <button
                className={`flex-1 py-1 text-center text-sm ${
                  orderType === "market" ? "border-b-2 border-emerald-500 text-emerald-500" : "text-gray-500"
                }`}
                onClick={() => setOrderType("market")}
              >
                市价
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">杠杆倍数</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="125"
                    value={leverage}
                    onChange={(e) => setLeverage(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{leverage}x</span>
                </div>
              </div>

              {orderType === "limit" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="43,250.00"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">数量 (USDT)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>可用: 5,234.56 USDT</span>
                  <div className="space-x-1">
                    <button className="text-emerald-500">25%</button>
                    <button className="text-emerald-500">50%</button>
                    <button className="text-emerald-500">75%</button>
                    <button className="text-emerald-500">100%</button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>保证金:</span>
                  <span className="font-medium">432.50 USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>手续费:</span>
                  <span className="font-medium">2.16 USDT</span>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-md font-medium ${
                  side === "long"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {side === "long" ? "开多" : "开空"} {selectedContract}
              </button>
            </div>
          </div>
        </div>

        {/* 持仓和订单 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 持仓 */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-bold mb-4">持仓</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="pb-2 text-left">合约</th>
                    <th className="pb-2 text-left">方向</th>
                    <th className="pb-2 text-right">数量</th>
                    <th className="pb-2 text-right">开仓价</th>
                    <th className="pb-2 text-right">标记价格</th>
                    <th className="pb-2 text-right">盈亏</th>
                    <th className="pb-2 text-right">保证金</th>
                    <th className="pb-2 text-right">杠杆</th>
                    <th className="pb-2 text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 font-medium">{position.symbol}</td>
                      <td className={`py-3 ${position.side === "Long" ? "text-emerald-500" : "text-red-500"}`}>
                        {position.side}
                      </td>
                      <td className="py-3 text-right">{position.size}</td>
                      <td className="py-3 text-right">{position.entryPrice}</td>
                      <td className="py-3 text-right">{position.markPrice}</td>
                      <td
                        className={`py-3 text-right ${position.pnl.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                      >
                        <div>{position.pnl}</div>
                        <div className="text-xs">{position.pnlPercent}</div>
                      </td>
                      <td className="py-3 text-right">{position.margin}</td>
                      <td className="py-3 text-right">{position.leverage}</td>
                      <td className="py-3 text-right">
                        <button className="text-red-600 hover:text-red-700 text-sm">平仓</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 委托订单 */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-bold mb-4">委托订单</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="pb-2 text-left">合约</th>
                    <th className="pb-2 text-left">方向</th>
                    <th className="pb-2 text-left">类型</th>
                    <th className="pb-2 text-right">数量</th>
                    <th className="pb-2 text-right">价格</th>
                    <th className="pb-2 text-left">状态</th>
                    <th className="pb-2 text-left">时间</th>
                    <th className="pb-2 text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 font-medium">{order.symbol}</td>
                      <td className={`py-3 ${order.side === "Long" ? "text-emerald-500" : "text-red-500"}`}>
                        {order.side}
                      </td>
                      <td className="py-3">{order.type}</td>
                      <td className="py-3 text-right">{order.amount}</td>
                      <td className="py-3 text-right">{order.price}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.status === "Open" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{order.time}</td>
                      <td className="py-3 text-right">
                        <button className="text-red-600 hover:text-red-700 text-sm">撤销</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
