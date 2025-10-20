# BeDAO Cryptocurrency Trading Platform

## Overview
BeDAO is a multilingual cryptocurrency and social networking platform built with Next.js 15 and React. Its primary purpose is to provide real-time cryptocurrency price tracking, portfolio management, trading interfaces, and advanced social features. The platform aims to be a comprehensive web solution for cryptocurrency traders and enthusiasts, featuring a bilingual (Chinese/English) interface and dynamic light/dark themes. The project's vision is to innovate the crypto economic ecosystem as the world's first integrated "Social + Guarantee + AI" digital asset platform, addressing market pain points like trust deficits and fragmented features. It offers a crypto social network, smart guarantee trading, and zero-threshold quantitative tools.

**Default Entry Point**: The application starts with the admin management system. On launch, users are directed to `/admin`, which automatically redirects to `/admin/login` if not authenticated.

## User Preferences
Preferred communication style: Simple, everyday language.

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

### Core Features
- Multi-page Dashboard (chat, social moments, marketplace, wallet)
- Comprehensive Trading Interfaces (USDT, spot, futures, market analysis)
- Wallet Management (portfolio, transaction history, balance)
- Social Features (chat, friend moments, community interaction)
- Real-time Cryptocurrency Data Feeds
- BePAY merchant account system with dual-currency cards and payment management
- Finance center with investment management and product showcases
- Integrated multi-step card application and activation workflows
- Enhanced escrow transaction workflow with multi-step process and visual tracking
- **Admin Management System** (comprehensive backend admin panel with secure login)
  - **Authentication**: Dedicated admin login interface (demo: admin/admin123)
  - **Context-Aware Sidebar**: Automatically switches between user and admin navigation
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
    5. Fiat Management (法币管理) - Fiat currency transactions with 6 sub-pages:
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
    13. BePay Management (BePay管理) - Payment gateway administration
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

### UI/UX Decisions
- Responsive navigation (collapsible sidebar, mobile-friendly design)
- Dynamic light/dark mode with persistent preferences
- Custom loading states and performance optimizations (instant response buttons)
- Consistent branding (BXB) and a standardized color palette (green, black, deep blue, white)
- Redesigned homepage emphasizing "Social + Guarantee + AI"
- Mobile-first design approach for all core features (wallet, trading, finance, guarantee, BePAY, chat) with optimized layouts, touch-friendly elements, and responsive typography.
- Implementation of distinct mobile layouts (e.g., card-based views for tables, vertical icon+text buttons, horizontal scrolling tabs)

### System Design Choices
- RESTful API endpoints with authentication middleware
- Optimized data flow with client-side React Context and server-side Drizzle ORM
- Secure session handling and protected routes
- Autoscale deployment configured for Next.js server features and standalone output
- **Reusable Component Architecture**: Created `HorizontalTabNav` shared component for all admin module sub-navigation
  - Used by OperationsLayout, UsersLayout, IMLayout, SpotLayout, and OrdersLayout
  - Provides consistent horizontal tab navigation with scrolling support
  - Reduces code duplication and ensures UI consistency

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