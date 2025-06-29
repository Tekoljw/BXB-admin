// 翻译配置文件
export const translations = {
  zh: {
    // 通用
    loading: "加载中...",
    search: "搜索",
    cancel: "取消",
    confirm: "确认",
    submit: "提交",
    save: "保存",
    edit: "编辑",
    delete: "删除",
    add: "添加",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    close: "关闭",
    
    // 导航菜单
    nav: {
      wallet: "钱包总览",
      market: "行情",
      spot: "现货交易",
      futures: "合约交易",
      usdt_trade: "USDT交易",
      marketplace: "商城",
      social: "社交",
      chat: "聊天",
      guarantee: "担保账户"
    },
    
    // 钱包页面
    wallet: {
      title: "钱包总览",
      total_balance: "总余额",
      available_balance: "可用余额",
      today_pnl: "今日盈亏",
      total_pnl: "总盈亏",
      my_assets: "我的资产",
      contract_account: "合约账户",
      position: "持仓",
      size: "数量",
      entry_price: "开仓价格",
      mark_price: "标记价格",
      pnl: "盈亏",
      margin: "保证金",
      no_positions: "暂无持仓",
      view_details: "查看详情"
    },
    
    // 行情页面
    market: {
      title: "行情",
      spot: "现货",
      futures: "合约",
      all: "全部",
      favorites: "自选",
      gainers: "涨幅榜",
      losers: "跌幅榜",
      new: "新币",
      price: "价格",
      change: "涨跌幅",
      high: "24h最高",
      low: "24h最低",
      volume: "24h成交量",
      turnover: "24h成交额"
    },
    
    // 交易页面
    trade: {
      buy: "买入",
      sell: "卖出",
      price: "价格",
      amount: "数量",
      total: "总额",
      available: "可用",
      order_book: "订单簿",
      recent_trades: "最新成交",
      order_history: "订单历史",
      trade_history: "成交历史"
    },
    
    // USDT交易页面
    usdt_trade: {
      title: "USDT交易",
      buy_usdt: "购买USDT",
      sell_usdt: "出售USDT",
      merchant: "商家",
      price: "价格",
      available: "可售",
      limit: "限额",
      payment_method: "支付方式",
      completion_rate: "完成率",
      orders: "订单数",
      buy_now: "立即购买",
      sell_now: "立即出售",
      post_ad: "发布广告"
    },
    
    // 社交页面
    social: {
      title: "社交",
      trending: "热门话题",
      following: "关注",
      followers: "粉丝",
      posts: "动态",
      likes: "点赞",
      comments: "评论",
      share: "分享",
      follow: "关注",
      unfollow: "取消关注"
    },
    
    // 聊天页面
    chat: {
      title: "聊天",
      online: "在线",
      offline: "离线",
      type_message: "输入消息...",
      send: "发送",
      group_chat: "群聊",
      private_chat: "私聊"
    },
    
    // 担保账户页面
    guarantee: {
      title: "担保账户",
      account_overview: "账户总览",
      deposit: "充值",
      withdraw: "提现",
      transfer: "转账",
      history: "历史记录",
      balance: "余额",
      frozen: "冻结",
      available: "可用"
    },
    
    // 错误信息
    errors: {
      network_error: "网络错误，请重试",
      invalid_input: "输入无效",
      insufficient_balance: "余额不足",
      order_failed: "下单失败",
      login_required: "请先登录"
    },
    
    // 成功信息
    success: {
      order_placed: "下单成功",
      order_cancelled: "订单已取消",
      transfer_success: "转账成功",
      saved: "保存成功"
    }
  },
  
  en: {
    // Common
    loading: "Loading...",
    search: "Search",
    cancel: "Cancel",
    confirm: "Confirm",
    submit: "Submit",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    back: "Back",
    next: "Next",
    previous: "Previous",
    close: "Close",
    
    // Navigation
    nav: {
      wallet: "Wallet",
      market: "Market",
      spot: "Spot Trading",
      futures: "Futures",
      usdt_trade: "USDT Trade",
      marketplace: "Marketplace",
      social: "Social",
      chat: "Chat",
      guarantee: "Guarantee Account"
    },
    
    // Wallet Page
    wallet: {
      title: "Wallet Overview",
      total_balance: "Total Balance",
      available_balance: "Available Balance",
      today_pnl: "Today's P&L",
      total_pnl: "Total P&L",
      my_assets: "My Assets",
      contract_account: "Contract Account",
      position: "Position",
      size: "Size",
      entry_price: "Entry Price",
      mark_price: "Mark Price",
      pnl: "P&L",
      margin: "Margin",
      no_positions: "No Positions",
      view_details: "View Details"
    },
    
    // Market Page
    market: {
      title: "Market",
      spot: "Spot",
      futures: "Futures",
      all: "All",
      favorites: "Favorites",
      gainers: "Gainers",
      losers: "Losers",
      new: "New",
      price: "Price",
      change: "Change",
      high: "24h High",
      low: "24h Low",
      volume: "24h Volume",
      turnover: "24h Turnover"
    },
    
    // Trading Page
    trade: {
      buy: "Buy",
      sell: "Sell",
      price: "Price",
      amount: "Amount",
      total: "Total",
      available: "Available",
      order_book: "Order Book",
      recent_trades: "Recent Trades",
      order_history: "Order History",
      trade_history: "Trade History"
    },
    
    // USDT Trading Page
    usdt_trade: {
      title: "USDT Trading",
      buy_usdt: "Buy USDT",
      sell_usdt: "Sell USDT",
      merchant: "Merchant",
      price: "Price",
      available: "Available",
      limit: "Limit",
      payment_method: "Payment Method",
      completion_rate: "Completion Rate",
      orders: "Orders",
      buy_now: "Buy Now",
      sell_now: "Sell Now",
      post_ad: "Post Ad"
    },
    
    // Social Page
    social: {
      title: "Social",
      trending: "Trending",
      following: "Following",
      followers: "Followers",
      posts: "Posts",
      likes: "Likes",
      comments: "Comments",
      share: "Share",
      follow: "Follow",
      unfollow: "Unfollow"
    },
    
    // Chat Page
    chat: {
      title: "Chat",
      online: "Online",
      offline: "Offline",
      type_message: "Type a message...",
      send: "Send",
      group_chat: "Group Chat",
      private_chat: "Private Chat"
    },
    
    // Guarantee Account Page
    guarantee: {
      title: "Guarantee Account",
      account_overview: "Account Overview",
      deposit: "Deposit",
      withdraw: "Withdraw",
      transfer: "Transfer",
      history: "History",
      balance: "Balance",
      frozen: "Frozen",
      available: "Available"
    },
    
    // Error Messages
    errors: {
      network_error: "Network error, please try again",
      invalid_input: "Invalid input",
      insufficient_balance: "Insufficient balance",
      order_failed: "Order failed",
      login_required: "Please login first"
    },
    
    // Success Messages
    success: {
      order_placed: "Order placed successfully",
      order_cancelled: "Order cancelled",
      transfer_success: "Transfer successful",
      saved: "Saved successfully"
    }
  }
}

export type TranslationKey = keyof typeof translations.zh
export type Language = keyof typeof translations

// 获取翻译文本的函数
export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.')
  let translation: any = translations[language]
  
  for (const k of keys) {
    if (translation && typeof translation === 'object' && k in translation) {
      translation = translation[k]
    } else {
      // 如果找不到翻译，回退到中文
      translation = translations.zh
      for (const fallbackKey of keys) {
        if (translation && typeof translation === 'object' && fallbackKey in translation) {
          translation = translation[fallbackKey]
        } else {
          return key // 如果都找不到，返回原始key
        }
      }
      break
    }
  }
  
  return typeof translation === 'string' ? translation : key
}