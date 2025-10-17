# BeDAO Cryptocurrency Trading Platform

## Overview
BeDAO is a multilingual cryptocurrency and social networking platform built with Next.js 15 and React. Its primary purpose is to provide real-time cryptocurrency price tracking, portfolio management, trading interfaces, and advanced social features. The platform aims to be a comprehensive web solution for cryptocurrency traders and enthusiasts, featuring a bilingual (Chinese/English) interface and dynamic light/dark themes. The project's vision is to innovate the crypto economic ecosystem as the world's first integrated "Social + Guarantee + AI" digital asset platform, addressing market pain points like trust deficits and fragmented features. It offers a crypto social network, smart guarantee trading, and zero-threshold quantitative tools.

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
  - **14 Management Modules**:
    1. Operations Report (运营报表) - Platform statistics and analytics with 6 sub-pages:
       - Dashboard (总仪表盘)
       - Funds Analysis (出入金分析报表)
       - Retention Analysis (留存与活跃分析报表)
       - Risk Configuration (风控配置)
       - Activities Configuration (活动配置)
       - Financial Audit (财务审核)
    2. User Management (用户管理) - User accounts and permissions
    3. IM Management (IM管理) - Messaging and chat monitoring
    4. Social Management (社交管理) - Content moderation and social features
    5. Market Management (行情管理) - Trading pairs and market data
    6. Fiat Management (法币管理) - Fiat currency transactions
    7. Escrow Management (担保管理) - Guaranteed transaction oversight
    8. U-Card Management (U卡管理) - Virtual card issuance and tracking
    9. Spot Management (现货管理) - Spot trading operations
    10. Futures Management (合约管理) - Futures contract monitoring
    11. Finance Management (理财管理) - Investment products management
    12. Wallet Management (钱包管理) - Wallet operations and audits
    13. BePay Management (BePay管理) - Payment gateway administration
    14. Orders Management (订单管理) - Order tracking and fulfillment with 8 sub-pages:
       - Funds Records (资金记录)
       - USDT Trading Records (USDT买卖记录)
       - Spot Orders (现货订单)
       - Futures Orders (合约订单)
       - Finance Orders (理财订单)
       - U-Card Orders (U卡订单)
       - Escrow Records (担保记录)
       - Payment Orders (支付订单)
  - **Access Control**: Login required to access admin features
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