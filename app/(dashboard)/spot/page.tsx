export default function SpotPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">现货交易</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#00D4AA] text-white rounded-md hover:bg-[#00B89A]">
            限价单
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            市价单
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="xl:col-span-1 space-y-6">
          {/* Buy Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-green-600 mb-4">买入 BTC</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格 (USDT)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="43,250.80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">数量 (BTC)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="0.001" />
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">25%</button>
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">50%</button>
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">75%</button>
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">100%</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">总额 (USDT)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="43.25" />
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                买入 BTC
              </button>
            </div>
          </div>

          {/* Sell Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-4">卖出 BTC</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格 (USDT)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="43,250.80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">数量 (BTC)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="0.001" />
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">25%</button>
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">50%</button>
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">75%</button>
                <button className="flex-1 text-xs bg-gray-100 py-1 rounded">100%</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">总额 (USDT)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="43.25" />
              </div>
              <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                卖出 BTC
              </button>
            </div>
          </div>
        </div>

        {/* Order Book & Chart */}
        <div className="xl:col-span-2 space-y-6">
          {/* Price Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">BTC/USDT 价格走势</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">价格图表占位符</span>
            </div>
          </div>

          {/* Order Book */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">订单簿</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Sell Orders */}
              <div>
                <h3 className="text-sm font-medium text-red-600 mb-2">卖单</h3>
                <div className="space-y-1">
                  {[
                    { price: "43,280.50", amount: "0.245", total: "10,603.72" },
                    { price: "43,275.20", amount: "0.180", total: "7,789.54" },
                    { price: "43,270.80", amount: "0.320", total: "13,846.66" },
                    { price: "43,265.40", amount: "0.150", total: "6,489.81" },
                  ].map((order, index) => (
                    <div key={index} className="grid grid-cols-3 text-xs text-red-600">
                      <span>{order.price}</span>
                      <span>{order.amount}</span>
                      <span>{order.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Orders */}
              <div>
                <h3 className="text-sm font-medium text-green-600 mb-2">买单</h3>
                <div className="space-y-1">
                  {[
                    { price: "43,250.80", amount: "0.425", total: "18,381.59" },
                    { price: "43,245.60", amount: "0.280", total: "12,108.77" },
                    { price: "43,240.20", amount: "0.190", total: "8,215.64" },
                    { price: "43,235.90", amount: "0.350", total: "15,132.57" },
                  ].map((order, index) => (
                    <div key={index} className="grid grid-cols-3 text-xs text-green-600">
                      <span>{order.price}</span>
                      <span>{order.amount}</span>
                      <span>{order.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">最近成交</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">时间</th>
                <th className="text-left py-2">价格 (USDT)</th>
                <th className="text-left py-2">数量 (BTC)</th>
                <th className="text-left py-2">总额 (USDT)</th>
                <th className="text-left py-2">方向</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "14:30:25", price: "43,250.80", amount: "0.125", total: "5,406.35", side: "买入", sideColor: "text-green-600" },
                { time: "14:30:20", price: "43,245.60", amount: "0.080", total: "3,459.65", side: "卖出", sideColor: "text-red-600" },
                { time: "14:30:15", price: "43,252.40", amount: "0.200", total: "8,650.48", side: "买入", sideColor: "text-green-600" },
                { time: "14:30:10", price: "43,248.90", amount: "0.150", total: "6,487.34", side: "卖出", sideColor: "text-red-600" },
              ].map((trade, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{trade.time}</td>
                  <td className="py-2">{trade.price}</td>
                  <td className="py-2">{trade.amount}</td>
                  <td className="py-2">{trade.total}</td>
                  <td className={`py-2 ${trade.sideColor}`}>{trade.side}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}