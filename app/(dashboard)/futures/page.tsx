export default function FuturesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">合约交易</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#00D4AA] text-white rounded-md hover:bg-[#00B89A]">
            USDT永续
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            币本位
          </button>
        </div>
      </div>

      {/* Position Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">当前持仓</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">总资产 (USDT)</p>
            <p className="text-xl font-bold text-gray-900">10,000.00</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">可用保证金</p>
            <p className="text-xl font-bold text-green-600">8,500.00</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">未实现盈亏</p>
            <p className="text-xl font-bold text-red-600">-125.50</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="xl:col-span-1 space-y-6">
          {/* Long Position */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-green-600 mb-4">做多 BTC-USDT永续</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-100 text-green-700 py-2 rounded font-medium">限价</button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded">市价</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格 (USDT)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="43,250.80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">数量 (张)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">杠杆倍数</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>1x</option>
                  <option>5x</option>
                  <option>10x</option>
                  <option>20x</option>
                  <option>50x</option>
                  <option>100x</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                <p>成本: ~432.51 USDT</p>
                <p>强平价: 38,625.72 USDT</p>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                开多仓
              </button>
            </div>
          </div>

          {/* Short Position */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-4">做空 BTC-USDT永续</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button className="flex-1 bg-red-100 text-red-700 py-2 rounded font-medium">限价</button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded">市价</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格 (USDT)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="43,250.80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">数量 (张)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">杠杆倍数</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>1x</option>
                  <option>5x</option>
                  <option>10x</option>
                  <option>20x</option>
                  <option>50x</option>
                  <option>100x</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                <p>成本: ~432.51 USDT</p>
                <p>强平价: 47,875.88 USDT</p>
              </div>
              <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                开空仓
              </button>
            </div>
          </div>
        </div>

        {/* Chart & Positions */}
        <div className="xl:col-span-2 space-y-6">
          {/* Price Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">BTC-USDT永续合约</h2>
              <div className="flex space-x-2 text-sm">
                <span className="text-gray-500">最新价格:</span>
                <span className="font-bold text-green-600">43,250.80</span>
                <span className="text-green-600">+2.45%</span>
              </div>
            </div>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">合约价格图表占位符</span>
            </div>
          </div>

          {/* Current Positions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">当前仓位</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">合约</th>
                    <th className="text-left py-2">方向</th>
                    <th className="text-left py-2">数量</th>
                    <th className="text-left py-2">开仓价</th>
                    <th className="text-left py-2">强平价</th>
                    <th className="text-left py-2">未实现盈亏</th>
                    <th className="text-left py-2">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">BTC-USDT永续</td>
                    <td className="py-2 text-green-600">多仓</td>
                    <td className="py-2">50张</td>
                    <td className="py-2">42,800.00</td>
                    <td className="py-2">38,520.00</td>
                    <td className="py-2 text-green-600">+225.40 USDT</td>
                    <td className="py-2">
                      <button className="text-red-600 hover:underline">平仓</button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">ETH-USDT永续</td>
                    <td className="py-2 text-red-600">空仓</td>
                    <td className="py-2">200张</td>
                    <td className="py-2">2,620.00</td>
                    <td className="py-2">2,882.00</td>
                    <td className="py-2 text-red-600">-78.40 USDT</td>
                    <td className="py-2">
                      <button className="text-red-600 hover:underline">平仓</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">委托历史</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">时间</th>
                <th className="text-left py-2">合约</th>
                <th className="text-left py-2">方向</th>
                <th className="text-left py-2">类型</th>
                <th className="text-left py-2">数量</th>
                <th className="text-left py-2">价格</th>
                <th className="text-left py-2">状态</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "14:30:25", contract: "BTC-USDT永续", side: "多仓", type: "限价", amount: "50", price: "42,800.00", status: "已成交", sideColor: "text-green-600", statusColor: "text-green-600" },
                { time: "13:15:40", contract: "ETH-USDT永续", side: "空仓", type: "市价", amount: "200", price: "2,620.00", status: "已成交", sideColor: "text-red-600", statusColor: "text-green-600" },
                { time: "12:45:15", contract: "BTC-USDT永续", side: "多仓", type: "限价", amount: "25", price: "43,000.00", status: "已撤销", sideColor: "text-green-600", statusColor: "text-gray-500" },
              ].map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{order.time}</td>
                  <td className="py-2">{order.contract}</td>
                  <td className={`py-2 ${order.sideColor}`}>{order.side}</td>
                  <td className="py-2">{order.type}</td>
                  <td className="py-2">{order.amount}张</td>
                  <td className="py-2">{order.price}</td>
                  <td className={`py-2 ${order.statusColor}`}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}