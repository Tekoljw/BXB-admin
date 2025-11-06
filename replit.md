# BeDAO 管理后台系统

## Overview
BeDAO 管理后台是一个专业的加密货币交易平台后台管理系统，基于 Next.js 15 和 React 构建。该系统专注于为平台运营人员提供全面的管理功能，包括用户管理、交易监控、财务管理、系统配置等。本项目是纯后台管理系统，不包含任何用户端功能。

**项目架构变更**: 
- 2024年11月4日进行了重大简化重构，移除了所有用户端页面和功能（包括聊天、钱包、交易、社交等），项目现在只包含管理后台模块。
- 2024年11月4日进行了导航架构重构，采用全新的三级导航体系：
  - **一级菜单**：位于顶部导航栏，显示15个主要管理模块
  - **二级菜单**：位于左侧边栏，显示当前选中模块的子页面
  - **内容区域**：右侧主内容区域，显示具体页面
- 2024年11月4日实现了响应式导航优化：
  - **桌面端**（≥768px）：顶部菜单支持横向滚动，带左右渐变指示器和箭头按钮
  - **移动端**（<768px）：汉堡菜单按钮，点击打开侧边Sheet弹窗显示所有模块

**最新更新 (2024年11月6日)**:
- 完成法币管理模块的全部7个核心页面开发：
  - **币种管理**: 添加/删除/编辑币种、配置币种简称、支持emoji和图片两种图标方式、真实文件上传功能（最大2MB）、图片预览和删除
  - **供应商管理**: 完整的CRUD操作、搜索功能、详细信息弹窗（接口/商户/余额/费率）
  - **接口管理**: 卡片式展示所有接口（Bitzpay、BePayOTC、CFpay等）、点击查看支持的币种和支付通道列表、接口统计数据
  - **通道管理**: 币种页签筛选、通道列表展示（代码、ID、demo视频、代收/代付手续费、接口来源）、完整的CRUD操作
  - **商户管理**: 商户列表、添加/删除/冻结商户、冻结资金、配置费率等功能
  - **佣金记录**: 用户佣金排行榜（前三名带奖杯图标）、点击查看详细佣金记录
  - **订单记录**: 两级页签筛选（币种+支付通道）、订单详情展示、四种操作（补发通知、重新校验、冻结订单、订单退款）
- 修复了"法币"模块的默认路由，点击后正确跳转到币种管理页面
- 所有页面采用统一的设计风格，包括搜索、筛选、表格展示、卡片展示、弹窗操作等
- 实现了真实的图标上传功能：文件选择、类型和大小验证、Base64转换、预览显示

**默认入口**: 应用启动时直接跳转到 `/admin/login` 管理员登录页面。登录后可访问完整的15个管理模块及其子页面。

## User Preferences
Preferred communication style: Simple, everyday Chinese language.

## System Architecture

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, shadcn/ui, custom design system
- **State Management**: React Context API
- **Charting**: Recharts
- **Icons**: Lucide React
- **Internationalization**: Chinese/English language toggle

### Backend
- **Server**: Express.js with session management
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL-backed session store

### Core Features (纯管理后台)
- **管理后台系统** - 综合性后台管理面板，包含安全的登录认证机制
  - **Authentication**: Dedicated admin login interface (demo: admin/admin123)
  - **新导航架构**: 采用顶部+左侧双层导航体系，一级菜单在顶部，二级菜单在左侧
  - **15 Management Modules**:
    1. Operations Report (运营报表) - Platform statistics and analytics with 6 sub-pages:
       - Dashboard (总仪表盘)
       - Funds Analysis (出入金分析报表)
       - Retention Analysis (留存与活跃分析报表)
       - Risk Configuration (风控配置)
       - Activities Configuration (活动配置)
       - Market Configuration (行情配置管理)
    2. User Management (用户管理) - User accounts and permissions with 14 sub-pages:
       - All Users (用户总表)
       - Blacklist Management (黑名单管理)
       - Deleted Accounts (已删除账户)
       - User Behavior (用户行为)
       - API Review (API审核)
       - API Management (API管理)
       - SMS Logs (短信日志)
       - Email Logs (邮箱日志)
       - F2A Review (F2A审核)
       - Voice Logs (语音日志)
       - Account Types Management (账户类型管理)
       - Special Accounts Management (特殊账户管理)
       - KYC Review (KYC审核)
       - KYC Records (KYC审核记录)
    3. IM Management (IM管理) - Messaging and chat monitoring with 7 sub-pages:
       - Accounts Management (账号管理)
       - Groups Management (群组管理)
       - Messages Management (消息管理)
       - Logs Query (日志查询)
       - Review Management (审核管理)
       - Auto Join (自动加群)
       - Group Search (群搜索)
    4. Social Management (社交管理) - Content moderation and social features
    5. Fiat Management (C2C&OTC) - Fiat currency transactions with 6 sub-pages:
       - C2C Management (C2C管理)
       - C2C Orders (C2C订单)
       - Quick Config (法币快捷配置)
       - Quick Orders (法币快捷订单)
       - OTC Config (OTC配置)
       - OTC Orders (OTC订单)
    6. Escrow Management (担保管理) - Guaranteed transaction oversight with 6 sub-pages:
       - Escrow Rules Configuration (担保规则配置)
       - Escrow Records (担保记录)
       - Reputation Rankings (信誉担保排名)
       - Escrow Groups Management (担保群管理)
       - Arbitrators Management (仲裁员管理)
       - Arbitration Complaint Records (仲裁投诉记录)
    7. U-Card Management (U卡管理) - Virtual card issuance and tracking with 5 sub-pages:
       - U-Card Users List (U卡用户列表)
       - U-Card Suppliers (U卡供应商)
       - U-Card Configuration (U卡基础配置)
       - U-Card Applications (U卡开卡记录)
       - U-Card Transactions (U卡消费记录)
    8. Spot Management (现货管理) - Spot trading operations with 10 sub-pages:
       - Coins Management (币种管理)
       - Networks Management (网络管理)
       - Markets Management (市场管理)
       - Market Makers (做市账户)
       - Sectors Management (板块管理)
       - Restricted Countries (交易受限国家)
       - User Whitelist (用户白名单)
       - Orders Management (委托管理)
       - K-line Management (K线管理)
       - Transactions (成交记录)
    9. Futures Management (合约管理) - Futures contract monitoring with 15 second-level and 70+ third-level sub-pages:
       - Contract Config (合约配置): Sectors, Index Price, Index Source, Special Mark Price, Product Config, Predict Group, Transfer Coins, Mark Price Config, I18N, K-line, Share Page (11 pages)
       - Special Accounts (特殊账户管理): Market Makers, Internal Accounts (2 pages)
       - Position Management (持仓管理): Scale Ratio, Position List, Net Position, Position History (4 pages)
       - Trader System (带单员系统): Trader Review, Trader Config, Review History, Trader List (4 pages)
       - Order Management (委托管理): Tracking Orders, Limit Orders, Plan Orders, Stop Profit/Loss (4 pages)
       - Fee Tier (阶梯费率): Fee Tier Config, User Fee Tier (2 pages)
       - Contract History (合约历史): Auto Delever, Liquidation, Tracking History, Order History, Plan History, Stop History, Takeover History (7 pages)
       - Risk Control (用户风控): Risk History, Profit ADL Trigger, Profit ADL Delever, Profit ADL Cooldown, Profit ADL, ADL Whitelist, User Monitor, Risk List, User Alert, Alert History (10 pages)
       - MM Risk (做市商风控): MM Monitor, MM Alert (2 pages)
       - Funds Management (资金管理): Fee Management, Fee Records, Rebate Details, Fee Details, Risk Fund Management, Risk Fund Records, User Flow, Asset Query, Trial Funds, Trial Details, Deduction Funds, Deduction Details (12 pages)
       - Analytics (数据分析): Reports, Contract Positions (2 pages)
       - Monitor (监控): Operation Logs (1 page)
       - Campaigns (运营活动): Lottery Management (1 page)
       - User Management (用户管理): Blacklist, Position Limit, User Info (3 pages)
       - Copy Trade (跟单管理): Stop Profit/Loss, Stop History, Leader Whitelist, Shared Leaders, Global Config, Contract Config, Leaders, Followers, Invite Traders, Positions, History, Pending Profit, Profit History (13 pages)
    10. Copy Trade Management (跟单管理) - Copy trading management and monitoring
    11. Finance Management (理财管理) - Investment products management
    12. Commission Management (佣金管理) - Commission tracking and management with 5 sub-pages:
       - Futures Commission (合约佣金)
       - Finance Commission (理财佣金)
       - U-Card Commission (U卡佣金)
       - Escrow Commission (担保佣金)
       - Payment Commission (支付佣金)
    13. BePay Management (法币管理) - Payment gateway administration with 7 sub-pages:
       - Currencies Management (币种管理): Add/edit/delete currencies, configure currency symbols, upload currency icons (emoji or image with 2MB limit), icon preview and removal
       - Suppliers Management (供应商管理): Full CRUD operations, search functionality, detailed modals for interfaces/merchants/balance/rates
       - Interfaces Management (接口管理): Card-based display of all payment interfaces (Bitzpay, BePayOTC, CFpay, etc.), click to view supported currencies and payment channels
       - Channels Management (通道管理): Channel listing with code/ID/demo video/fee configs, currency tab filtering, add/edit/delete operations
       - Merchants Management (商户管理): Merchant accounts with add/delete/freeze, fund freezing, fee rate configuration
       - Commission Management (佣金管理): User commission rankings with trophy icons for top 3, detailed commission records view
       - Orders Management (订单管理): Two-level filtering (currency + payment channel), order operations (resend notification, reverify, freeze, refund) with real-time state updates
    14. Financial Management (财务管理) - Financial tracking and fulfillment with 8 sub-pages:
       - Funds Records (资金记录)
       - USDT Trading Records (USDT买卖记录)
       - Spot Orders (现货订单)
       - Futures Orders (合约订单)
       - Finance Orders (理财订单)
       - U-Card Orders (U卡订单)
       - Escrow Records (担保记录)
       - Payment Orders (支付订单)
    15. System Management (系统管理) - System and infrastructure management with 8 sub-pages:
       - Permissions Management (权限管理)
       - Roles Management (角色管理)
       - Users Management (用户管理)
       - Audit Configuration (审核配置)
       - APP Management (APP管理)
       - Operations Management (运维管理)
       - Maintenance Plan Configuration (维护计划配置)
       - Maintenance Whitelist Management (维护白名单管理)
  - **Access Control**: Login required to access admin features with email verification code
  - **Session Management**: Persistent admin authentication state
  - **Navigation System**: Custom event-based navigation for seamless sub-page switching without sidebar reload

### UI/UX Decisions (仅管理后台)
- **全新导航架构**：采用顶部+左侧双层导航体系
  - 顶部导航栏：显示15个一级模块菜单，所有页面共用
  - 左侧边栏：动态显示当前选中模块的二级子菜单
  - 智能切换：点击顶部模块自动跳转到该模块的默认页面
- **响应式导航系统**：
  - 桌面端（≥768px）：横向滚动菜单，带渐变指示器和箭头按钮
  - 移动端（<768px）：汉堡菜单按钮，侧边Sheet弹窗显示所有模块
  - 断点设置：使用Tailwind的md断点（768px）切换布局模式
- 动态亮色/暗色主题切换，持久化用户偏好
- 自定义加载状态和性能优化（即时响应按钮）
- 统一的品牌设计（BeDAO）和标准化配色方案（绿色、黑色、深蓝色、白色）
- 管理后台专用设计，重点关注数据展示和操作效率
- 登录页面独立布局，不显示任何导航栏

### System Design Choices
- 客户端路由系统：使用 `instant-navigation` 组件处理所有页面导航，避免页面重载
- 自定义路由机制：使用 `window.history.pushState` 和 `popstate` 事件实现即时页面切换
- 状态管理：使用 React Context API（ThemeProvider、AdminProvider）管理全局状态
- 简化架构：移除了所有用户端相关的 Context（ChatProvider 等）和组件
- 安全的会话处理和路由保护（未登录时自动跳转登录页）
- 自动扩展部署配置，支持 Next.js 服务器功能和独立输出
- **双层导航架构**: 采用顶部一级菜单 + 左侧二级菜单的设计
  - 移除了所有二级顶部菜单（HorizontalTabNav），简化导航结构
  - 所有layout组件（OperationsLayout、UsersLayout等）简化为容器组件
  - 统一使用custom-green (#13C2A3) 作为主题绿色，替代原来的emerald色系

## External Dependencies

### Core
- React 19
- Next.js 15
- Drizzle ORM
- Neon Database (for PostgreSQL)
- Express.js
- Passport.js

### UI and Styling
- Tailwind CSS
- Radix UI
- Recharts
- Lucide React
- shadcn/ui

### Development Tools
- TypeScript
- Flask (development environment manager)
- pnpm
- ESLint