      case "U卡账户":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedUCardView === "virtual"
                    ? "bg-[#00D4AA]/10 border-2 border-[#00D4AA] shadow-lg" 
                    : `${cardStyle} hover:shadow-md`
                }`}
                onClick={() => setSelectedUCardView("virtual")}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">虚拟卡账户</h3>
                  <CreditCard className={`h-5 w-5 ${
                    selectedUCardView === "virtual" ? "text-[#00D4AA]" : "text-gray-600 dark:text-gray-400"
                  }`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">总余额</span>
                    <span className="text-lg font-bold">{balanceVisible ? "2,222.22" : "****"} USDT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">已发卡数</span>
                    <span className="text-sm">2张</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">本月消费</span>
                    <span className="text-sm text-red-500">-678.90 USDT</span>
                  </div>
                </div>
              </div>

              <div 
                className={`rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedUCardView === "physical"
                    ? "bg-[#00D4AA]/10 border-2 border-[#00D4AA] shadow-lg" 
                    : `${cardStyle} hover:shadow-md`
                }`}
                onClick={() => setSelectedUCardView("physical")}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">实体卡账户</h3>
                  <CreditCard className={`h-5 w-5 ${
                    selectedUCardView === "physical" ? "text-[#00D4AA]" : "text-gray-600 dark:text-gray-400"
                  }`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">总余额</span>
                    <span className="text-lg font-bold">{balanceVisible ? "1,234.56" : "****"} USDT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">已发卡数</span>
                    <span className="text-sm">1张</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">本月消费</span>
                    <span className="text-sm text-red-500">-456.78 USDT</span>
                  </div>
                </div>
              </div>

              <div 
                className={`rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedUCardView === "balance"
                    ? "bg-[#00D4AA]/10 border-2 border-[#00D4AA] shadow-lg" 
                    : `${cardStyle} hover:shadow-md`
                }`}
                onClick={() => setSelectedUCardView("balance")}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">可用余额</h3>
                  <Wallet className={`h-5 w-5 ${
                    selectedUCardView === "balance" ? "text-[#00D4AA]" : "text-gray-600 dark:text-gray-400"
                  }`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">可划转金额</span>
                    <span className="text-lg font-bold text-green-600">{balanceVisible ? "3,456.78" : "****"} USDT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">冻结金额</span>
                    <span className="text-sm">0.00 USDT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">待入账</span>
                    <span className="text-sm text-blue-500">0.00 USDT</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedUCardView === "virtual" && (
              <div className={`${cardStyle} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4">虚拟卡管理</h3>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">显示虚拟卡详情和管理功能</p>
                  <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                    管理虚拟卡
                  </Button>
                </div>
              </div>
            )}

            {selectedUCardView === "physical" && (
              <div className={`${cardStyle} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4">实体卡管理</h3>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">您还没有申请实体卡</p>
                  <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                    立即申请实体卡
                  </Button>
                </div>
              </div>
            )}

            {selectedUCardView === "balance" && (
              <div className={`${cardStyle} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4">余额管理</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <span className="text-sm">USDT余额</span>
                      <span className="font-medium">{balanceVisible ? "3,456.78" : "****"} USDT</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <span className="text-sm">BTC余额</span>
                      <span className="font-medium">{balanceVisible ? "0.0123" : "****"} BTC</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                      余额划转
                    </Button>
                    <Button variant="outline" className="w-full border-black text-black hover:bg-gray-50 dark:border-white dark:text-white">
                      充值
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )