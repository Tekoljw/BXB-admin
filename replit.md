# BeDAO-ho Cryptocurrency Trading Dashboard

## Overview

BeDAO-ho is a modern cryptocurrency trading dashboard application built with Next.js 14 and React. The application provides real-time cryptocurrency price tracking, portfolio management, trading interfaces, and social features in a comprehensive web platform. It features a bilingual interface (Chinese/English) with both light and dark themes, designed for cryptocurrency traders and enthusiasts.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 14 with App Router for server-side rendering and optimal performance
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **State Management**: React Context API for theme and language preferences
- **Charts**: Recharts library for data visualization and trading charts
- **Icons**: Lucide React for consistent iconography
- **Routing**: Next.js App Router with instant navigation optimizations

### Backend Architecture
- **Server**: Express.js server with session management
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Storage**: PostgreSQL-backed session store with connect-pg-simple
- **API Structure**: RESTful API endpoints with authentication middleware

### Development Environment
- **Runtime**: Node.js 20 with TypeScript support
- **Package Manager**: pnpm for efficient dependency management
- **Development Tools**: Flask-based development environment manager
- **Database**: PostgreSQL 16 for data persistence

## Key Components

### Core Features
1. **Multi-page Dashboard**: Chat, social moments, marketplace, wallet management
2. **Trading Interfaces**: USDT trading, spot trading, futures trading, market analysis
3. **Wallet Management**: Portfolio tracking, transaction history, balance overview
4. **Social Features**: Chat system, friend moments, community interaction
5. **Real-time Data**: Cryptocurrency price feeds and market data

### User Interface Components
- **Responsive Navigation**: Collapsible sidebar with mobile-friendly design
- **Theme System**: Dynamic light/dark mode switching with persistent preferences
- **Internationalization**: Chinese/English language toggle with translation system
- **Loading States**: Custom creative loaders and skeleton components
- **Performance Optimizations**: Instant response buttons and optimized rendering

### Authentication System
- **Replit Auth**: Integrated OpenID Connect authentication
- **Session Management**: Secure session handling with PostgreSQL storage
- **User Storage**: User profiles and preferences in database
- **Protected Routes**: Middleware for route protection

## Data Flow

### Client-Side Flow
1. User interactions trigger optimized event handlers
2. React Context manages global state (theme, language, user preferences)  
3. Next.js App Router handles navigation with pre-loading
4. Components use hooks for data fetching and state management
5. Recharts renders real-time financial data visualizations

### Server-Side Flow
1. Express server handles API requests with authentication middleware
2. Drizzle ORM manages database queries with type safety
3. Session store maintains user authentication state
4. RESTful endpoints provide data to frontend components
5. Database operations are optimized for performance

### Authentication Flow
1. Users authenticate via Replit Auth (OpenID Connect)
2. Server validates tokens and creates user sessions
3. User data is stored/retrieved from PostgreSQL database
4. Protected routes verify authentication status
5. Client maintains authentication state in React Context

## External Dependencies

### Core Dependencies
- **React 19**: Latest React version for component architecture
- **Next.js 14**: Modern React framework with App Router
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL database connection
- **Express.js**: Backend server framework
- **Passport.js**: Authentication middleware

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Recharts**: Chart library for data visualization
- **Lucide React**: Icon library
- **shadcn/ui**: Component library built on Radix UI

### Development Tools
- **TypeScript**: Type safety across the application
- **Flask**: Development environment management
- **pnpm**: Fast, efficient package manager
- **ESLint**: Code linting and formatting

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit development environment
- **Multi-runtime Support**: Python 3.11, Node.js 20, PostgreSQL 16
- **Development Server**: Next.js dev server on port 5000
- **Hot Reloading**: Automatic code reloading during development

### Production Considerations
- **Build Optimization**: Next.js production build with static optimization
- **Database Connection**: Neon PostgreSQL for serverless deployment
- **Environment Variables**: Secure configuration management
- **Asset Optimization**: Image optimization and static asset serving

### Performance Optimizations
- **Instant Response**: Custom button components bypass React's synthetic events
- **Route Pre-loading**: Background loading of route components
- **Optimized Rendering**: Reduced re-renders and efficient state updates
- **Code Splitting**: Next.js automatic code splitting for optimal loading

## Changelog

- June 23, 2025. Initial setup
- January 23, 2025. Updated UI components:
  - Removed "我的圈子" titles from circle sections
  - Changed create circle button to transparent with black/white borders
  - Updated all black buttons to white buttons in dark mode
  - Implemented TOP leaderboard with auto-width sliding tabs (本周, 本月, 总收益)
  - Enhanced dark mode styling with proper button contrast
  - Created three-tier profile structure accessible via avatar click (not in main navigation)
  - Added reputation guarantee tags "信誉担保$123K" after usernames in sharing pages
  - Implemented follow buttons with follower counts in bottom-right corner of posts
  - Order: "已有XX人跟单" text followed by "跟单" button
  - Added three-dot menu dropdowns with 关注/屏蔽/举报 options on posts
  - Fixed left sidebar navigation filtering for "全部" and category tabs
- January 24, 2025. Enhanced chat financial features:
  - Removed all titles from wallet order record pages
  - Updated order record tabs to black/white button styling
  - Added transfer functionality for private chats with ArrowRightLeft icon
  - Added airdrop functionality for group chats with Zap icon (renamed from red packets)
  - Implemented premium card designs with gradient backgrounds and glass morphism
  - Added cryptocurrency selection (USDT, BTC, ETH, BNB, ADA, SOL) for both features
  - Created interactive claim buttons with progress tracking and animations
- January 25, 2025. Implemented BePAY merchant account system:
  - Added BePAY账户 tab with Receipt icon to wallet accounts section
  - Created comprehensive merchant payment management interface with top cards for 商户资产 and 代付备用金
  - Implemented six function buttons: 资产分布, 成功率分析, 通道配置, 划转, 资金记录, 订单记录
  - Added payment statistics dashboard and channel monitoring system
  - Integrated 支付订单 category to order records with payment transaction data
  - Configured payment order sub-categories: 收款记录, 代付记录, 退款记录
  - Fixed BePAY account rendering issue by properly placing case within renderTabContent function
  - Updated function button layout to match wallet overview page design pattern
- January 27, 2025. Enhanced BePAY account with dual-currency card system:
  - Redesigned top cards to show 法币总余额 (fiat) and 加密货币总余额 (crypto) with clickable interaction
  - Implemented currency conversion display (USD for fiat, USDT for crypto) with switchable calculation currencies
  - Added dynamic tab structure: 7 tabs for fiat card (商户资产, 代付备用金, 通道配置, 结算/充值 + 3 icon-only tabs)
  - Created separate tab structure for crypto card (商户资产, 地址管理, 通道配置, 划转 + 3 icon-only tabs)
  - Built interactive asset management with currency-specific action buttons (结算 for fiat, 充值 for standby funds)
  - Enhanced visual feedback with gradient backgrounds, ring highlighting, and hover effects
  - Implemented comprehensive multi-currency support (USD, EUR, GBP, JPY for fiat; USDT, BTC, ETH, BNB for crypto)
- January 29, 2025. Added finance center to main navigation:
  - Created new finance page (/finance) with comprehensive investment management interface
  - Added PiggyBank icon finance entry between futures trading and wallet in all navigation components
  - Implemented finance product showcase with APY rates, risk levels, and investment durations
  - Built portfolio overview with total assets, earnings tracking, and average APY display
  - Added holdings table with current investments and earnings breakdown
  - Updated navigation translations for Chinese/English finance labels
  - Integrated finance routing across all navigation variants (instant, side, new navigation)
  - Updated icon from TrendingUp to PiggyBank for better visual representation of finance/savings concept

## User Preferences

Preferred communication style: Simple, everyday language.