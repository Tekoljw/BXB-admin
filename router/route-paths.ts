// 路由路径配置：统一管理所有路由路径（仅路径定义，不包含路由逻辑）

export const routeGroups = {
  // 用户端路由
  user: {
    chat: '/chat',
    moments: '/moments',
    mall: '/mall',
    usdtTrade: '/usdt-trade',
    market: '/market',
    spot: '/spot',
    futures: '/futures',
    finance: '/finance',
    wallet: '/wallet',
  },

  // 管理后台路由
  admin: {
    // 认证相关
    login: '/admin/login',
    profile: '/admin/profile',
    dashboard: '/admin/operations/dashboard',

    // 权限管理
    permissions: {
      base: '/admin/permissions',
      roles: '/admin/permissions/roles',
      users: '/admin/permissions/users',
      menus: '/admin/permissions/menus',
    },

    // 运营管理
    marketing: {
      base: '/admin/marketing',
      registrationWhitelist: '/admin/marketing/registration-whitelist',
    },

    // 运营报表
    operations: {
      base: '/admin/operations',
      dashboard: '/admin/operations/dashboard',
      activities: '/admin/operations/activities',
      audit: '/admin/operations/audit',
      funds: '/admin/operations/funds',
      marketConfig: '/admin/operations/market-config',
      orders: '/admin/operations/orders',
      retention: '/admin/operations/retention',
      risk: '/admin/operations/risk',
    },

    // 用户管理
    users: {
      base: '/admin/users',
    },

    // IM管理
    im: {
      base: '/admin/im',
      accounts: '/admin/im/accounts',
      autoJoin: '/admin/im/auto-join',
      groupSearch: '/admin/im/group-search',
      groups: '/admin/im/groups',
      logs: '/admin/im/logs',
      messages: '/admin/im/messages',
      review: '/admin/im/review',
    },

    // 社交管理
    social: {
      base: '/admin/social',
    },

    // C2C管理
    c2c: {
      base: '/admin/c2c',
      c2c: '/admin/c2c/c2c',
      c2cOrders: '/admin/c2c/c2c-orders',
      otcConfig: '/admin/c2c/otc-config',
      otcOrders: '/admin/c2c/otc-orders',
      quickConfig: '/admin/c2c/quick-config',
      quickOrders: '/admin/c2c/quick-orders',
    },

    // 担保管理
    escrow: {
      base: '/admin/escrow',
      arbitrators: '/admin/escrow/arbitrators',
      complaints: '/admin/escrow/complaints',
      groups: '/admin/escrow/groups',
      rankings: '/admin/escrow/rankings',
      records: '/admin/escrow/records',
      rules: '/admin/escrow/rules',
    },

    // U卡管理
    ucard: {
      base: '/admin/ucard',
    },

    spot: {
      base: '/admin/spot',
    },

    // 合约管理
    futures: {
      base: '/admin/futures',
      analytics: '/admin/futures/analytics',
      campaigns: '/admin/futures/campaigns',
      config: '/admin/futures/config',
      copyTrade: '/admin/futures/copy-trade',
      feeTier: '/admin/futures/fee-tier',
      funds: '/admin/futures/funds',
      history: '/admin/futures/history',
      mmRisk: '/admin/futures/mm-risk',
      monitor: '/admin/futures/monitor',
      orders: '/admin/futures/orders',
      positions: '/admin/futures/positions',
      riskControl: '/admin/futures/risk-control',
      specialAccounts: '/admin/futures/special-accounts',
      traderSystem: '/admin/futures/trader-system',
      users: '/admin/futures/users',
    },

    // 跟单管理
    copytrade: {
      base: '/admin/copytrade',
    },

    // 理财管理
    finance: {
      base: '/admin/finance',
    },

    // 佣金管理
    commission: {
      base: '/admin/commission',
      escrow: '/admin/commission/escrow',
      finance: '/admin/commission/finance',
      futures: '/admin/commission/futures',
      payment: '/admin/commission/payment',
      ucard: '/admin/commission/ucard',
    },

    // Crypto管理
    crypto: {
      base: '/admin/crypto',
      address: '/admin/crypto/address',
      addresses: '/admin/crypto/addresses',
      businessReport: '/admin/crypto/business-report',
      cryptoUsers: '/admin/crypto/crypto-users',
      currencies: '/admin/crypto/currencies',
      currency: '/admin/crypto/currency',
      custodialWallets: '/admin/crypto/custodial-wallets',
      freezeRecords: '/admin/crypto/freeze-records',
      klineManagement: '/admin/crypto/kline-management',
      onchainDepositOrders: '/admin/crypto/onchain-deposit-orders',
      orderManagement: '/admin/crypto/order-management',
      otcOrders: '/admin/crypto/otc-orders',
      otcSuppliers: '/admin/crypto/otc-suppliers',
      spotMarket: '/admin/crypto/spot-market',
      spotMarketMaker: '/admin/crypto/spot-market-maker',
      tradeHistory: '/admin/crypto/trade-history',
    },

    // 法币管理
    fiat: {
      base: '/admin/fiat',
      reports: '/admin/fiat/reports',
      currencies: '/admin/fiat/currencies',
      suppliers: '/admin/fiat/suppliers',
      interfaces: '/admin/fiat/interfaces',
      channels: '/admin/fiat/channels',
      users: '/admin/fiat/users',
      commission: '/admin/fiat/commission',
      orders: '/admin/fiat/orders',
      freezeRecords: '/admin/fiat/freeze-records',
      exchangeOrders: '/admin/fiat/exchange-orders',
    },

    orders: {
      base: '/admin/orders',
    },

    options: {
      base: '/admin/options',
    },

    system: {
      base: '/admin/system',
    },

    // 市场管理
    market: {
      base: '/admin/market',
    },

    // IT管理
    it: {
      base: '/admin/it',
    },

    wallet: {
      base: '/admin/wallet',
    },
  },
} as const

// 模块配置：用于导航和权限管理
export const modules = {
  permissions: {
    id: 'permissions',
    name: '权限管理',
    basePath: routeGroups.admin.permissions.base,
    defaultPath: routeGroups.admin.permissions.base,
  },
  marketing: {
    id: 'marketing',
    name: '运营管理',
    basePath: routeGroups.admin.marketing.base,
    defaultPath: routeGroups.admin.marketing.base,
  },
  operations: {
    id: 'operations',
    name: '运营报表',
    basePath: routeGroups.admin.operations.base,
    defaultPath: routeGroups.admin.operations.dashboard,
    // operations在业务上属于marketing模块
  },
  users: {
    id: 'users',
    name: '用户管理',
    basePath: routeGroups.admin.users.base,
    defaultPath: routeGroups.admin.users.base,
  },
  im: {
    id: 'im',
    name: 'IM管理',
    basePath: routeGroups.admin.im.base,
    defaultPath: routeGroups.admin.im.base,
  },
  social: {
    id: 'social',
    name: '社交管理',
    basePath: routeGroups.admin.social.base,
    defaultPath: routeGroups.admin.social.base,
  },
  c2c: {
    id: 'c2c',
    name: 'C2C',
    basePath: routeGroups.admin.c2c.base,
    defaultPath: routeGroups.admin.c2c.base,
  },
  escrow: {
    id: 'escrow',
    name: '担保管理',
    basePath: routeGroups.admin.escrow.base,
    defaultPath: routeGroups.admin.escrow.base,
  },
  ucard: {
    id: 'ucard',
    name: 'U卡管理',
    basePath: routeGroups.admin.ucard.base,
    defaultPath: routeGroups.admin.ucard.base,
  },
  spot: {
    id: 'spot',
    name: '现货管理',
    basePath: routeGroups.admin.spot.base,
    defaultPath: routeGroups.admin.spot.base,
  },
  futures: {
    id: 'futures',
    name: '合约管理',
    basePath: routeGroups.admin.futures.base,
    defaultPath: routeGroups.admin.futures.base,
  },
  copytrade: {
    id: 'copytrade',
    name: '跟单管理',
    basePath: routeGroups.admin.copytrade.base,
    defaultPath: routeGroups.admin.copytrade.base,
  },
  finance: {
    id: 'finance',
    name: '理财管理',
    basePath: routeGroups.admin.finance.base,
    defaultPath: routeGroups.admin.finance.base,
  },
  commission: {
    id: 'commission',
    name: '佣金管理',
    basePath: routeGroups.admin.commission.base,
    defaultPath: routeGroups.admin.commission.base,
  },
  crypto: {
    id: 'crypto',
    name: 'Crypto',
    basePath: routeGroups.admin.crypto.base,
    defaultPath: routeGroups.admin.crypto.base,
  },
  fiat: {
    id: 'fiat',
    name: '法币',
    basePath: routeGroups.admin.fiat.base,
    defaultPath: routeGroups.admin.fiat.reports,
  },
  orders: {
    id: 'orders',
    name: '财务管理',
    basePath: routeGroups.admin.orders.base,
    defaultPath: routeGroups.admin.orders.base,
  },
  options: {
    id: 'options',
    name: '期权管理',
    basePath: routeGroups.admin.options.base,
    defaultPath: routeGroups.admin.options.base,
  },
  system: {
    id: 'system',
    name: '系统管理',
    basePath: routeGroups.admin.system.base,
    defaultPath: routeGroups.admin.system.base,
  },
} as const

// 根据路径获取模块ID（operations属于marketing模块）
export function getModuleFromPath(path: string): string {
  if (path.startsWith('/admin/operations')) {
    return 'marketing'
  }
  
  // 优先匹配更具体的路径
  const moduleEntries = Object.entries(modules).sort((a, b) => {
    return b[1].basePath.length - a[1].basePath.length
  })

  for (const [moduleId, moduleConfig] of moduleEntries) {
    if (path.startsWith(moduleConfig.basePath)) {
      return moduleId
    }
  }

  return 'permissions'
}

export function getModuleDefaultPath(moduleId: string): string {
  const module = modules[moduleId as keyof typeof modules]
  return module?.defaultPath || routeGroups.admin.dashboard
}

export function getModuleName(moduleId: string): string {
  const module = modules[moduleId as keyof typeof modules]
  return module?.name || '未知模块'
}

export const userRoutes = Object.values(routeGroups.user)
export const adminRoutes = [
  routeGroups.admin.login,
  routeGroups.admin.profile,
  routeGroups.admin.dashboard,
]
