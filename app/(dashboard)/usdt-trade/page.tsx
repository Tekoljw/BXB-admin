export default function USDTTradePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">USDT买卖</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buy Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">购买USDT</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">购买金额</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="输入金额" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">支付方式</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>银行卡</option>
                <option>支付宝</option>
                <option>微信支付</option>
              </select>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
              立即购买
            </button>
          </div>
        </div>

        {/* Sell Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">出售USDT</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">出售数量</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="输入数量" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">收款方式</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>银行卡</option>
                <option>支付宝</option>
                <option>微信支付</option>
              </select>
            </div>
            <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              立即出售
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">交易记录</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">时间</th>
                <th className="text-left py-2">类型</th>
                <th className="text-left py-2">数量</th>
                <th className="text-left py-2">价格</th>
                <th className="text-left py-2">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">2024-01-15 14:30</td>
                <td className="py-2 text-green-600">购买</td>
                <td className="py-2">1000 USDT</td>
                <td className="py-2">¥7,200</td>
                <td className="py-2 text-green-600">已完成</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2024-01-14 09:15</td>
                <td className="py-2 text-red-600">出售</td>
                <td className="py-2">500 USDT</td>
                <td className="py-2">¥3,600</td>
                <td className="py-2 text-green-600">已完成</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}