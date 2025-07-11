  return (
    <div className="min-h-screen flex relative">
      {/* 左侧导航栏 */}
      <div className={`
        fixed left-0 top-0 h-full z-30 transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
        w-48
      `}>
        <div className={`h-full ${cardStyle}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              钱包
            </h2>
          </div>
          <nav className="p-4 space-y-2">
            {walletTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsMobileSidebarOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#00D4AA] text-black'
                      : isDark
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* 遮罩层 */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* 主内容区域 */}
      <div className="flex-1 md:ml-0">
        <div className="p-4 md:p-6">
          {/* 移动端标题栏 */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">钱包</h1>
            <div className="w-10" />
          </div>

          {/* 渲染当前标签页内容 */}
          {renderTabContent()}
        </div>
      </div>

      {/* 所有模态框组件 */}
      {showNewCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardStyle} rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">申请新卡</h2>
                <button
                  onClick={() => {
                    setShowNewCardModal(false)
                    setCardApplicationStep(1)
                    setSelectedCardType('')
                    setSelectedCardBrand('')
                    setSelectedRegion('')
                    setMainlandUsage('')
                    setSelectedPaymentScenarios([])
                    setPersonalInfo({ name: '', phone: '', email: '', idNumber: '', address: '' })
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* 步骤指示器 */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${cardApplicationStep >= step
                        ? 'bg-[#00D4AA] text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {cardApplicationStep > step ? <Check className="h-5 w-5" /> : step}
                    </div>
                    {step < 5 && (
                      <div className={`
                        w-8 h-0.5 mx-2
                        ${cardApplicationStep > step
                          ? 'bg-[#00D4AA]'
                          : isDark
                            ? 'bg-gray-700'
                            : 'bg-gray-200'
                        }
                      `} />
                    )}
                  </div>
                ))}
              </div>

              {/* 步骤内容 */}
              {cardApplicationStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第一步：选择卡片类型</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCardType === 'virtual'
                          ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                          : isDark
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedCardType('virtual')}
                    >
                      <div className="text-center">
                        <CreditCard className={`h-12 w-12 mx-auto mb-4 ${
                          selectedCardType === 'virtual' ? 'text-[#00D4AA]' : 'text-gray-500'
                        }`} />
                        <h4 className="font-semibold mb-2">虚拟卡</h4>
                        <p className="text-sm text-gray-500">
                          即时开卡，适用于在线支付
                        </p>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCardType === 'physical'
                          ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                          : isDark
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedCardType('physical')}
                    >
                      <div className="text-center">
                        <Wallet className={`h-12 w-12 mx-auto mb-4 ${
                          selectedCardType === 'physical' ? 'text-[#00D4AA]' : 'text-gray-500'
                        }`} />
                        <h4 className="font-semibold mb-2">实体卡</h4>
                        <p className="text-sm text-gray-500">
                          实体卡片，支持ATM取现
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedCardType && (
                    <div className="space-y-4">
                      <h4 className="font-medium">选择卡片品牌</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedCardBrand === 'visa'
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : isDark
                                ? 'border-gray-600 hover:border-gray-500'
                                : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setSelectedCardBrand('visa')}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-2">VISA</div>
                            <p className="text-sm text-gray-500">全球通用</p>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedCardBrand === 'mastercard'
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : isDark
                                ? 'border-gray-600 hover:border-gray-500'
                                : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setSelectedCardBrand('mastercard')}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600 mb-2">MasterCard</div>
                            <p className="text-sm text-gray-500">万事达卡</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedCardBrand && (
                    <div className="space-y-4">
                      <h4 className="font-medium">选择发卡地区</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['europe', 'hongkong', 'usa'].map((region) => (
                          <div 
                            key={region}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedRegion === region
                                ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                                : isDark
                                  ? 'border-gray-600 hover:border-gray-500'
                                  : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => setSelectedRegion(region)}
                          >
                            <div className="text-center">
                              <h5 className="font-medium mb-1">
                                {region === 'europe' ? '欧洲' : region === 'hongkong' ? '香港' : '美国'}
                              </h5>
                              <p className="text-sm text-gray-500">
                                {region === 'europe' ? '欧盟地区发卡' : 
                                 region === 'hongkong' ? '香港地区发卡' : '美国地区发卡'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {cardApplicationStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第二步：大陆使用偏好</h3>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      请选择您是否计划在中国大陆使用此卡片
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          mainlandUsage === 'yes'
                            ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                            : isDark
                              ? 'border-gray-600 hover:border-gray-500'
                              : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setMainlandUsage('yes')}
                      >
                        <div className="text-center">
                          <MapPin className={`h-12 w-12 mx-auto mb-4 ${
                            mainlandUsage === 'yes' ? 'text-[#00D4AA]' : 'text-gray-500'
                          }`} />
                          <h4 className="font-semibold mb-2">计划在大陆使用</h4>
                          <p className="text-sm text-gray-500">
                            将为您推荐适合大陆使用的卡片配置
                          </p>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          mainlandUsage === 'no'
                            ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                            : isDark
                              ? 'border-gray-600 hover:border-gray-500'
                              : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setMainlandUsage('no')}
                      >
                        <div className="text-center">
                          <Globe className={`h-12 w-12 mx-auto mb-4 ${
                            mainlandUsage === 'no' ? 'text-[#00D4AA]' : 'text-gray-500'
                          }`} />
                          <h4 className="font-semibold mb-2">仅海外使用</h4>
                          <p className="text-sm text-gray-500">
                            主要用于境外消费和在线支付
                          </p>
                        </div>
                      </div>
                    </div>

                    {mainlandUsage === 'yes' && (
                      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">注意事项</p>
                            <p className="text-yellow-700 dark:text-yellow-300">
                              在中国大陆使用境外发行的卡片可能会受到外汇管制政策影响，部分商户可能不支持。
                              建议您了解相关法规并合规使用。
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {cardApplicationStep === 3 && selectedCardType === 'virtual' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第三步：支付场景选择</h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    请选择您主要的使用场景（可多选）
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                    {[
                      { id: 'aws', name: 'AWS', category: '云服务' },
                      { id: 'google-cloud', name: 'Google Cloud', category: '云服务' },
                      { id: 'azure', name: 'Microsoft Azure', category: '云服务' },
                      { id: 'google-ads', name: 'Google Ads', category: '广告推广' },
                      { id: 'facebook-ads', name: 'Facebook Ads', category: '广告推广' },
                      { id: 'apple-pay', name: 'Apple Pay', category: '移动支付' },
                      { id: 'google-pay', name: 'Google Pay', category: '移动支付' },
                      { id: 'paypal', name: 'PayPal', category: '移动支付' },
                      { id: 'alipay', name: '支付宝', category: '移动支付' },
                      { id: 'netflix', name: 'Netflix', category: '娱乐订阅' },
                      { id: 'spotify', name: 'Spotify', category: '娱乐订阅' },
                      { id: 'youtube-premium', name: 'YouTube Premium', category: '娱乐订阅' },
                      { id: 'amazon', name: 'Amazon', category: '电商购物' },
                      { id: 'ebay', name: 'eBay', category: '电商购物' },
                      { id: 'shopify', name: 'Shopify', category: '电商购物' },
                      { id: 'steam', name: 'Steam', category: '游戏平台' },
                      { id: 'app-store', name: 'App Store', category: '应用商店' },
                      { id: 'play-store', name: 'Google Play', category: '应用商店' },
                      { id: 'github', name: 'GitHub', category: '开发工具' },
                      { id: 'vercel', name: 'Vercel', category: '开发工具' },
                      { id: 'notion', name: 'Notion', category: '办公软件' },
                      { id: 'slack', name: 'Slack', category: '办公软件' },
                      { id: 'zoom', name: 'Zoom', category: '办公软件' },
                      { id: 'adobe', name: 'Adobe Creative', category: '设计软件' },
                      { id: 'canva', name: 'Canva', category: '设计软件' },
                      { id: 'uber', name: 'Uber', category: '出行服务' },
                      { id: 'airbnb', name: 'Airbnb', category: '住宿服务' },
                      { id: 'booking', name: 'Booking.com', category: '住宿服务' },
                      { id: 'hotels', name: 'Hotels.com', category: '住宿服务' },
                      { id: 'expedia', name: 'Expedia', category: '旅行服务' },
                      { id: 'chatgpt', name: 'ChatGPT Plus', category: 'AI服务' },
                      { id: 'midjourney', name: 'Midjourney', category: 'AI服务' },
                      { id: 'claude', name: 'Claude Pro', category: 'AI服务' },
                      { id: 'twitter', name: 'Twitter/X Premium', category: '社交媒体' },
                      { id: 'linkedin', name: 'LinkedIn Premium', category: '社交媒体' },
                      { id: 'telegram', name: 'Telegram Premium', category: '社交媒体' },
                      { id: 'discord', name: 'Discord Nitro', category: '社交媒体' },
                      { id: 'dropbox', name: 'Dropbox', category: '云存储' },
                      { id: 'icloud', name: 'iCloud', category: '云存储' },
                      { id: 'onedrive', name: 'OneDrive', category: '云存储' },
                      { id: 'grammarly', name: 'Grammarly', category: '写作工具' },
                      { id: 'coursera', name: 'Coursera', category: '在线教育' },
                      { id: 'udemy', name: 'Udemy', category: '在线教育' },
                      { id: 'skillshare', name: 'Skillshare', category: '在线教育' },
                      { id: 'duolingo', name: 'Duolingo Plus', category: '在线教育' },
                      { id: 'binance', name: 'Binance', category: '加密货币' },
                      { id: 'coinbase', name: 'Coinbase', category: '加密货币' },
                      { id: 'kraken', name: 'Kraken', category: '加密货币' },
                      { id: 'other', name: '其他', category: '其他' }
                    ].map((scenario) => (
                      <div 
                        key={scenario.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                          selectedPaymentScenarios.includes(scenario.id)
                            ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                            : isDark
                              ? 'border-gray-600 hover:border-gray-500'
                              : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => {
                          setSelectedPaymentScenarios(prev => 
                            prev.includes(scenario.id)
                              ? prev.filter(id => id !== scenario.id)
                              : [...prev, scenario.id]
                          )
                        }}
                      >
                        <div className="text-sm font-medium mb-1">{scenario.name}</div>
                        <div className="text-xs text-gray-500">{scenario.category}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    已选择 {selectedPaymentScenarios.length} 个支付场景
                  </div>
                </div>
              )}

              {(cardApplicationStep === 3 && selectedCardType === 'physical') || cardApplicationStep === 4 ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    第{selectedCardType === 'physical' && cardApplicationStep === 3 ? '三' : '四'}步：个人信息填写
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">姓名</label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">手机号码</label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入您的手机号码"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">邮箱地址</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入您的邮箱地址"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">身份证号码</label>
                      <input
                        type="text"
                        value={personalInfo.idNumber}
                        onChange={(e) => setPersonalInfo({...personalInfo, idNumber: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入您的身份证号码"
                      />
                    </div>
                  </div>
                  
                  {selectedCardType === 'physical' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">邮寄地址</label>
                      <textarea
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                        rows={3}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入实体卡片的邮寄地址"
                      />
                    </div>
                  )}
                </div>
              )}

              {((selectedCardType === 'physical' && cardApplicationStep === 4) || cardApplicationStep === 5) && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    第{selectedCardType === 'physical' ? '四' : '五'}步：申请确认
                  </h3>
                  
                  <div className="space-y-4">
                    <div className={`p-6 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                      <h4 className="font-semibold mb-4">申请信息确认</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">卡片类型：</span>
                          <span className="font-medium ml-2">{selectedCardType === 'virtual' ? '虚拟卡' : '实体卡'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">卡片品牌：</span>
                          <span className="font-medium ml-2">{selectedCardBrand === 'visa' ? 'VISA' : 'MasterCard'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">发卡地区：</span>
                          <span className="font-medium ml-2">
                            {selectedRegion === 'europe' ? '欧洲' : selectedRegion === 'hongkong' ? '香港' : '美国'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">大陆使用：</span>
                          <span className="font-medium ml-2">{mainlandUsage === 'yes' ? '是' : '否'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">姓名：</span>
                          <span className="font-medium ml-2">{personalInfo.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">手机：</span>
                          <span className="font-medium ml-2">{personalInfo.phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">邮箱：</span>
                          <span className="font-medium ml-2">{personalInfo.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">身份证：</span>
                          <span className="font-medium ml-2">{personalInfo.idNumber}</span>
                        </div>
                        {selectedCardType === 'physical' && personalInfo.address && (
                          <div className="md:col-span-2">
                            <span className="text-gray-500">邮寄地址：</span>
                            <span className="font-medium ml-2">{personalInfo.address}</span>
                          </div>
                        )}
                        {selectedCardType === 'virtual' && selectedPaymentScenarios.length > 0 && (
                          <div className="md:col-span-2">
                            <span className="text-gray-500">支付场景：</span>
                            <span className="font-medium ml-2">已选择 {selectedPaymentScenarios.length} 个场景</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-700 bg-blue-900/20' : 'border-blue-300 bg-blue-50'}`}>
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">申请说明</p>
                          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                            <li>• {selectedCardType === 'virtual' ? '虚拟卡将在审核通过后即时发放' : '实体卡审核通过后将在5-10个工作日内寄出'}</li>
                            <li>• 首次申请免收年费，后续按标准收费</li>
                            <li>• 请确保提供的信息真实有效</li>
                            <li>• 如有疑问，请联系客服</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 按钮区域 */}
              <div className="flex space-x-4 pt-6">
                {cardApplicationStep > 1 && (
                  <button
                    onClick={() => setCardApplicationStep(cardApplicationStep - 1)}
                    className={`px-6 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    上一步
                  </button>
                )}
                
                <button
                  onClick={() => {
                    if (
                      (cardApplicationStep === 1 && selectedCardType && selectedCardBrand && selectedRegion) ||
                      (cardApplicationStep === 2 && mainlandUsage) ||
                      (cardApplicationStep === 3 && (selectedCardType === 'physical' || selectedPaymentScenarios.length > 0)) ||
                      (cardApplicationStep === 4 && personalInfo.name && personalInfo.phone && personalInfo.email && personalInfo.idNumber) ||
                      ((selectedCardType === 'physical' && cardApplicationStep === 4) || cardApplicationStep === 5)
                    ) {
                      if ((selectedCardType === 'physical' && cardApplicationStep < 4) || (selectedCardType === 'virtual' && cardApplicationStep < 5)) {
                        setCardApplicationStep(cardApplicationStep + 1)
                      } else {
                        // 提交申请
                        alert('申请已提交，我们将在1-2个工作日内审核您的申请')
                        setShowNewCardModal(false)
                        setCardApplicationStep(1)
                        setSelectedCardType('')
                        setSelectedCardBrand('')
                        setSelectedRegion('')
                        setMainlandUsage('')
                        setSelectedPaymentScenarios([])
                        setPersonalInfo({ name: '', phone: '', email: '', idNumber: '', address: '' })
                      }
                    }
                  }}
                  disabled={
                    (cardApplicationStep === 1 && (!selectedCardType || !selectedCardBrand || !selectedRegion)) ||
                    (cardApplicationStep === 2 && !mainlandUsage) ||
                    (cardApplicationStep === 3 && selectedCardType === 'virtual' && selectedPaymentScenarios.length === 0) ||
                    (cardApplicationStep === 4 && (!personalInfo.name || !personalInfo.phone || !personalInfo.email || !personalInfo.idNumber)) ||
                    (selectedCardType === 'physical' && cardApplicationStep === 3 && (!personalInfo.name || !personalInfo.phone || !personalInfo.email || !personalInfo.idNumber || !personalInfo.address))
                  }
                  className={`flex-1 py-3 rounded-lg transition-colors ${
                    (cardApplicationStep === 1 && (!selectedCardType || !selectedCardBrand || !selectedRegion)) ||
                    (cardApplicationStep === 2 && !mainlandUsage) ||
                    (cardApplicationStep === 3 && selectedCardType === 'virtual' && selectedPaymentScenarios.length === 0) ||
                    (cardApplicationStep === 4 && (!personalInfo.name || !personalInfo.phone || !personalInfo.email || !personalInfo.idNumber)) ||
                    (selectedCardType === 'physical' && cardApplicationStep === 3 && (!personalInfo.name || !personalInfo.phone || !personalInfo.email || !personalInfo.idNumber || !personalInfo.address))
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#00D4AA] text-white hover:bg-[#00D4AA]/90'
                  }`}
                >
                  {((selectedCardType === 'physical' && cardApplicationStep === 4) || cardApplicationStep === 5) ? '提交申请' : '下一步'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 卡片激活模态框 */}
      {showCardActivationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardStyle} rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">卡片激活</h2>
                <button
                  onClick={() => {
                    setShowCardActivationModal(false)
                    setActivationStep(1)
                    setActivationInfo({ cardNumber: '', expiryDate: '', cvv: '', activationCode: '', phoneCode: '', emailCode: '', pin: '', confirmPin: '' })
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* 步骤指示器 */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${activationStep >= step
                        ? 'bg-[#00D4AA] text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {activationStep > step ? <Check className="h-5 w-5" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`
                        w-8 h-0.5 mx-2
                        ${activationStep > step
                          ? 'bg-[#00D4AA]'
                          : isDark
                            ? 'bg-gray-700'
                            : 'bg-gray-200'
                        }
                      `} />
                    )}
                  </div>
                ))}
              </div>

              {/* 步骤内容 */}
              {activationStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第一步：卡片信息确认</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">卡号</label>
                      <input
                        type="text"
                        value={activationInfo.cardNumber}
                        onChange={(e) => setActivationInfo({...activationInfo, cardNumber: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入16位卡号"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">有效期</label>
                        <input
                          type="text"
                          value={activationInfo.expiryDate}
                          onChange={(e) => setActivationInfo({...activationInfo, expiryDate: e.target.value})}
                          className={`w-full p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV安全码</label>
                        <input
                          type="text"
                          value={activationInfo.cvv}
                          onChange={(e) => setActivationInfo({...activationInfo, cvv: e.target.value})}
                          className={`w-full p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                          placeholder="CVV"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-700 bg-blue-900/20' : 'border-blue-300 bg-blue-50'}`}>
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">激活要求</p>
                        <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• 请确保卡片信息输入正确</li>
                          <li>• 激活过程中请保持网络连接稳定</li>
                          <li>• 如多次输入错误，卡片可能被临时锁定</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activationStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第二步：激活码验证</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">激活码</label>
                      <input
                        type="text"
                        value={activationInfo.activationCode}
                        onChange={(e) => setActivationInfo({...activationInfo, activationCode: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入邮件中的6位激活码"
                        maxLength={6}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">未收到激活码？</span>
                      <button className="text-sm text-[#00D4AA] hover:underline">
                        重新发送
                      </button>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-yellow-700 bg-yellow-900/20' : 'border-yellow-300 bg-yellow-50'}`}>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">重要提醒</p>
                        <p className="text-yellow-700 dark:text-yellow-300">
                          激活码已发送至您的注册邮箱，请注意查收。激活码有效期为10分钟。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activationStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第三步：双重验证</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">手机验证码</label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={activationInfo.phoneCode}
                          onChange={(e) => setActivationInfo({...activationInfo, phoneCode: e.target.value})}
                          className={`flex-1 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                          placeholder="请输入手机验证码"
                          maxLength={6}
                        />
                        <button className="px-4 py-3 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00D4AA]/90 transition-colors whitespace-nowrap">
                          发送验证码
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">邮箱验证码</label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={activationInfo.emailCode}
                          onChange={(e) => setActivationInfo({...activationInfo, emailCode: e.target.value})}
                          className={`flex-1 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                          placeholder="请输入邮箱验证码"
                          maxLength={6}
                        />
                        <button className="px-4 py-3 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00D4AA]/90 transition-colors whitespace-nowrap">
                          发送验证码
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-green-700 bg-green-900/20' : 'border-green-300 bg-green-50'}`}>
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-green-800 dark:text-green-200 mb-1">安全验证</p>
                        <p className="text-green-700 dark:text-green-300">
                          为了保护您的账户安全，我们需要验证您的手机号码和邮箱地址。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activationStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第四步：设置PIN码</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">设置PIN码</label>
                      <input
                        type="password"
                        value={activationInfo.pin}
                        onChange={(e) => setActivationInfo({...activationInfo, pin: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请设置6位PIN码"
                        maxLength={6}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">确认PIN码</label>
                      <input
                        type="password"
                        value={activationInfo.confirmPin}
                        onChange={(e) => setActivationInfo({...activationInfo, confirmPin: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请再次输入PIN码"
                        maxLength={6}
                      />
                    </div>
                    
                    {activationInfo.pin && activationInfo.confirmPin && activationInfo.pin !== activationInfo.confirmPin && (
                      <p className="text-sm text-red-500">两次输入的PIN码不一致</p>
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-700 bg-blue-900/20' : 'border-blue-300 bg-blue-50'}`}>
                    <div className="flex items-start">
                      <Key className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">PIN码安全提示</p>
                        <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• PIN码用于ATM取现和部分线下消费</li>
                          <li>• 请设置不易被猜测的6位数字</li>
                          <li>• 不要使用生日、手机号等个人信息</li>
                          <li>• 请妥善保管，不要告诉他人</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 按钮区域 */}
              <div className="flex space-x-4 pt-6">
                {activationStep > 1 && (
                  <button
                    onClick={() => setActivationStep(activationStep - 1)}
                    className={`px-6 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    上一步
                  </button>
                )}
                
                <button
                  onClick={() => {
                    if (activationStep < 4) {
                      setActivationStep(activationStep + 1)
                    } else {
                      if (activationInfo.pin === activationInfo.confirmPin && activationInfo.pin.length === 6) {
                        alert('卡片激活成功！')
                        setShowCardActivationModal(false)
                        setActivationStep(1)
                        setActivationInfo({ cardNumber: '', expiryDate: '', cvv: '', activationCode: '', phoneCode: '', emailCode: '', pin: '', confirmPin: '' })
                      }
                    }
                  }}
                  disabled={
                    (activationStep === 1 && (!activationInfo.cardNumber || !activationInfo.expiryDate || !activationInfo.cvv)) ||
                    (activationStep === 2 && !activationInfo.activationCode) ||
                    (activationStep === 3 && (!activationInfo.phoneCode || !activationInfo.emailCode)) ||
                    (activationStep === 4 && (!activationInfo.pin || !activationInfo.confirmPin || activationInfo.pin !== activationInfo.confirmPin))
                  }
                  className={`flex-1 py-3 rounded-lg transition-colors ${
                    (activationStep === 1 && (!activationInfo.cardNumber || !activationInfo.expiryDate || !activationInfo.cvv)) ||
                    (activationStep === 2 && !activationInfo.activationCode) ||
                    (activationStep === 3 && (!activationInfo.phoneCode || !activationInfo.emailCode)) ||
                    (activationStep === 4 && (!activationInfo.pin || !activationInfo.confirmPin || activationInfo.pin !== activationInfo.confirmPin))
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#00D4AA] text-white hover:bg-[#00D4AA]/90'
                  }`}
                >
                  {activationStep === 4 ? '完成激活' : '下一步'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 卡片充值模态框 */}
      {showCardRechargeModal && selectedCardInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardStyle} rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">卡片充值</h2>
                <button
                  onClick={() => {
                    setShowCardRechargeModal(false)
                    setSelectedCardInfo(null)
                    setRechargeAmount('')
                    setRechargeCurrency('USDT')
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">充值卡片</label>
                  <div className={`p-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{selectedCardInfo.name}</div>
                        <div className="text-sm text-gray-500">{selectedCardInfo.number}</div>
                      </div>
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">充值币种</label>
                  <select
                    value={rechargeCurrency}
                    onChange={(e) => setRechargeCurrency(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                  >
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="BNB">BNB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">充值金额</label>
                  <input
                    type="number"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                    placeholder="请输入充值金额"
                  />
                  <div className="flex space-x-2 mt-2">
                    {['100', '500', '1000', '5000'].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setRechargeAmount(amount)}
                        className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                          isDark 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>

                {rechargeAmount && (
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex justify-between items-center text-sm">
                      <span>充值金额：</span>
                      <span className="font-medium">{rechargeAmount} {rechargeCurrency}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span>手续费：</span>
                      <span className="font-medium">0.00 {rechargeCurrency}</span>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span>实际充值：</span>
                        <span>{rechargeAmount} {rechargeCurrency}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => {
                    setShowCardRechargeModal(false)
                    setSelectedCardInfo(null)
                    setRechargeAmount('')
                    setRechargeCurrency('USDT')
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    if (rechargeAmount) {
                      alert(`充值成功！已向 ${selectedCardInfo.name} 充值 ${rechargeAmount} ${rechargeCurrency}`)
                      setShowCardRechargeModal(false)
                      setSelectedCardInfo(null)
                      setRechargeAmount('')
                      setRechargeCurrency('USDT')
                    }
                  }}
                  disabled={!rechargeAmount}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    !rechargeAmount
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#00D4AA] text-white hover:bg-[#00D4AA]/90'
                  }`}
                >
                  确认充值
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 卡片划转模态框 */}
      {showCardTransferModal && selectedCardInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardStyle} rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">卡片划转</h2>
                <button
                  onClick={() => {
                    setShowCardTransferModal(false)
                    setSelectedCardInfo(null)
                    setTransferAmount('')
                    setTransferDirection('to-card')
                    setTransferAccount('现货账户')
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">卡片</label>
                  <div className={`p-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{selectedCardInfo.name}</div>
                        <div className="text-sm text-gray-500">{selectedCardInfo.number}</div>
                      </div>
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">划转方向</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTransferDirection('to-card')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        transferDirection === 'to-card'
                          ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                          : isDark
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <ArrowDownLeft className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm">转入卡片</div>
                    </button>
                    <button
                      onClick={() => setTransferDirection('from-card')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        transferDirection === 'from-card'
                          ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                          : isDark
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <ArrowUpRight className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm">转出卡片</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {transferDirection === 'to-card' ? '转出账户' : '转入账户'}
                  </label>
                  <select
                    value={transferAccount}
                    onChange={(e) => setTransferAccount(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                  >
                    <option value="现货账户">现货账户</option>
                    <option value="合约账户">合约账户</option>
                    <option value="理财账户">理财账户</option>
                    <option value="担保账户">担保账户</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">划转金额</label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                    placeholder="请输入划转金额"
                  />
                  <div className="flex space-x-2 mt-2">
                    {['100', '500', '1000', '全部'].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTransferAmount(amount === '全部' ? '2500.00' : amount)}
                        className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                          isDark 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>

                {transferAmount && (
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex justify-between items-center text-sm">
                      <span>划转金额：</span>
                      <span className="font-medium">{transferAmount} USDT</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span>手续费：</span>
                      <span className="font-medium">0.00 USDT</span>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span>实际{transferDirection === 'to-card' ? '转入' : '转出'}：</span>
                        <span>{transferAmount} USDT</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => {
                    setShowCardTransferModal(false)
                    setSelectedCardInfo(null)
                    setTransferAmount('')
                    setTransferDirection('to-card')
                    setTransferAccount('现货账户')
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    if (transferAmount) {
                      const direction = transferDirection === 'to-card' ? '转入' : '转出'
                      alert(`划转成功！已${direction} ${transferAmount} USDT`)
                      setShowCardTransferModal(false)
                      setSelectedCardInfo(null)
                      setTransferAmount('')
                      setTransferDirection('to-card')
                      setTransferAccount('现货账户')
                    }
                  }}
                  disabled={!transferAmount}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    !transferAmount
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#00D4AA] text-white hover:bg-[#00D4AA]/90'
                  }`}
                >
                  确认划转
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 更改密码模态框 */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardStyle} rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">更改密码</h2>
                <button
                  onClick={() => {
                    setShowChangePasswordModal(false)
                    setChangePasswordStep(1)
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '', verificationCode: '' })
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* 步骤指示器 */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${changePasswordStep >= step
                        ? 'bg-[#00D4AA] text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {changePasswordStep > step ? <Check className="h-5 w-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`
                        w-8 h-0.5 mx-2
                        ${changePasswordStep > step
                          ? 'bg-[#00D4AA]'
                          : isDark
                            ? 'bg-gray-700'
                            : 'bg-gray-200'
                        }
                      `} />
                    )}
                  </div>
                ))}
              </div>

              {/* 步骤内容 */}
              {changePasswordStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第一步：验证当前密码</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">当前密码</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入当前密码"
                      />
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border border-[#00D4AA]/30 bg-[#00D4AA]/10`}>
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-[#00D4AA] mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-[#00D4AA] mb-1">安全提醒</p>
                        <p className="text-[#00D4AA]/80">
                          为了保护您的账户安全，我们需要验证您的当前密码。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {changePasswordStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第二步：设置新密码</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">新密码</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请输入新密码"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">确认新密码</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className={`w-full p-3 rounded-lg border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                        placeholder="请再次输入新密码"
                      />
                    </div>
                    
                    {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                      <p className="text-sm text-red-500">两次输入的新密码不一致</p>
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-lg border border-[#00D4AA]/30 bg-[#00D4AA]/10`}>
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-[#00D4AA] mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-[#00D4AA] mb-1">密码安全要求</p>
                        <ul className="text-[#00D4AA]/80 space-y-1">
                          <li>• 密码长度至少8位</li>
                          <li>• 包含大小写字母、数字和特殊字符</li>
                          <li>• 不要使用常见密码或个人信息</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {changePasswordStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">第三步：验证身份</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">验证码</label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={passwordData.verificationCode}
                          onChange={(e) => setPasswordData({...passwordData, verificationCode: e.target.value})}
                          className={`flex-1 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-800 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                          placeholder="请输入验证码"
                          maxLength={6}
                        />
                        <button className="px-4 py-3 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00D4AA]/90 transition-colors whitespace-nowrap">
                          发送验证码
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border border-[#00D4AA]/30 bg-[#00D4AA]/10`}>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-[#00D4AA] mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-[#00D4AA] mb-1">即将完成</p>
                        <p className="text-[#00D4AA]/80">
                          验证码已发送至您的注册邮箱，输入验证码后即可完成密码修改。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 按钮区域 */}
              <div className="flex space-x-4 pt-6">
                {changePasswordStep > 1 && (
                  <button
                    onClick={() => setChangePasswordStep(changePasswordStep - 1)}
                    className={`px-6 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    上一步
                  </button>
                )}
                
                <Button
                  onClick={() => {
                    if (changePasswordStep < 3) {
                      setChangePasswordStep(changePasswordStep + 1)
                    } else {
                      if (passwordData.verificationCode) {
                        alert('密码修改成功！')
                        setShowChangePasswordModal(false)
                        setChangePasswordStep(1)
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '', verificationCode: '' })
                      }
                    }
                  }}
                  className={`flex-1 ${
                    isDark 
                      ? 'bg-white hover:bg-gray-100 text-black' 
                      : 'bg-black hover:bg-gray-900 text-white'
                  }`}
                >
                  {changePasswordStep === 1 ? '下一步' : 
                   changePasswordStep === 2 ? '确认修改' : 
                   '完成重置'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
