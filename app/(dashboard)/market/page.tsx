export default function MarketPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">行情中心</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#00D4AA] text-white rounded-md hover:bg-[#00B89A]">
            自选
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            涨幅榜
          </button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">BTC/USDT</h3>
          <p className="text-2xl font-bold text-green-600">$43,250.80</p>
          <p className="text-sm text-green-600">+2.45% (+$1,032.40)</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">ETH/USDT</h3>
          <p className="text-2xl font-bold text-red-600">$2,580.45</p>
          <p className="text-sm text-red-600">-1.23% (-$32.15)</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">BNB/USDT</h3>
          <p className="text-2xl font-bold text-green-600">$315.20</p>
          <p className="text-sm text-green-600">+0.85% (+$2.65)</p>
        </div>
      </div>

      {/* Market List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">实时行情</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">交易对</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase">最新价格</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase">24h涨跌</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase">24h成交量</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { pair: "BTC/USDT", price: "43,250.80", change: "+2.45%", volume: "1.2B", changeColor: "text-green-600" },
                { pair: "ETH/USDT", price: "2,580.45", change: "-1.23%", volume: "856M", changeColor: "text-red-600" },
                { pair: "BNB/USDT", price: "315.20", change: "+0.85%", volume: "124M", changeColor: "text-green-600" },
                { pair: "ADA/USDT", price: "0.4820", change: "+3.12%", volume: "89M", changeColor: "text-green-600" },
                { pair: "SOL/USDT", price: "98.45", change: "-0.67%", volume: "234M", changeColor: "text-red-600" },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{item.pair}</div>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-gray-900">
                    ${item.price}
                  </td>
                  <td className={`py-4 px-6 text-right font-medium ${item.changeColor}`}>
                    {item.change}
                  </td>
                  <td className="py-4 px-6 text-right text-gray-500">
                    ${item.volume}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[#00D4AA] hover:underline">交易</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}