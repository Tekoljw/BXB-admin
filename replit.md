# BXB Cryptocurrency Trading Dashboard

## Overview

BXB is a modern cryptocurrency trading dashboard application built with Next.js 14 and React. The application provides real-time cryptocurrency price tracking, portfolio management, trading interfaces, and social features in a comprehensive web platform. It features a bilingual interface (Chinese/English) with both light and dark themes, designed for cryptocurrency traders and enthusiasts.

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
- January 29, 2025. Enhanced profile page navigation layout:
  - Redesigned left sidebar to be narrower (w-48) and taller (calc(100vh-8rem)) similar to wallet page
  - Updated menu structure with 9 new functions: 个人主页, 邀请返佣, 费率折扣, 安全中心, 身份认证, API管理, 系统设置, 切换账号, 退出账号
  - Implemented comprehensive content sections for each menu item with functional interfaces
  - Added invite commission tracking with statistics dashboard and referral link management
  - Created fee discount visualization with progress bars showing current trading fee rates
  - Built system settings panel with language, theme, and notification preferences
  - Designed account switching interface with current account display and add account option
  - Added logout confirmation dialog with proper user flow and security considerations
- January 29, 2025. Replaced main navigation settings with notifications:
  - Updated all navigation components (side-navigation, instant-navigation, side-navigation-new) to replace settings button with notifications
  - Added Bell icon with notification badge showing unread count in bottom navigation area
  - Created comprehensive notifications page (/notifications) with filtering, search, and management features
  - Implemented notification categories: price alerts, trading updates, system notifications, and social activities
  - Added notification priority levels (high, medium, low) with visual indicators
  - Built interactive notification management with mark as read, delete, and mark all as read functionality
- January 29, 2025. Enhanced guarantee account page layout and functionality:
  - Merged top 4 cards into 3 cards by combining "应收担保金额" and "应付担保金额" into one "交易担保金额" card
  - Added 7 function buttons: 应收担保交易, 应付担保交易, 增加信誉担保, 划转, 资金记录, 交易记录, 担保记录
  - Updated button styling to match wallet overview layout with transparent borders and proper spacing
  - Converted last three buttons (资金记录, 交易记录, 担保记录) to icon-only format for cleaner interface
  - Implemented full functionality for all tabs including transaction records, fund management, and guarantee history
- January 29, 2025. Redesigned guarantee account progress tracking system:
  - Removed担保解冻时间 display and replaced with comprehensive progress step visualization
  - Implemented reference-based progress design with larger circular steps (10x10px) and professional styling
  - Added 4-step process flow: 发起交易 → 对方/您已付担保金 → 等待确认完成交易 → 完成收款/争议待仲裁
  - Used color-coded progress indicators: blue for completed steps (with checkmarks), yellow for current step, gray for pending, red for disputes, green for final completion
  - Repositioned layout with amounts on left side and transaction objects/guarantee groups on right side in styled cards
  - Enhanced with comprehensive mock data showing different transaction states (USDT, BTC, ETH, SOL, NFT transactions)
  - Added expandable content functionality with relevant action buttons (催促对方, 确认收款, 申请仲裁, 查看仲裁等)
  - Implemented distinct visual states for 收款担保 and 付款担保 with appropriate progress tracking and status labels
- January 29, 2025. Implemented multi-step card application system:
  - Created comprehensive 5-step card application workflow with step indicator and progress tracking
  - Step 1: Card type selection (virtual/physical), brand selection (Visa/Mastercard), region selection (Europe/Hong Kong/USA)
  - Step 2: Mainland China usage preference with conditional warning messages
  - Step 3: Payment scenario selection for virtual cards (50 scenarios including AWS, Google Pay, Apple Pay, Alipay, etc.) with multi-select functionality
  - Step 4: Personal information collection (name, phone, email, ID number, shipping address for physical cards)
  - Step 5: Application confirmation and submission with complete information review
  - Physical cards automatically skip Step 3 (payment scenarios) and proceed directly from Step 2 to Step 4
  - Enhanced UI with responsive grid layouts, hover effects, and comprehensive form validation
  - Integrated custom dropdown component with fade animations for card selection in recharge modal
- January 29, 2025. Designed comprehensive card activation workflow:
  - Created 4-step card activation process with secure verification and PIN setup
  - Step 1: Card information confirmation with activation requirements overview
  - Step 2: Activation code input with email verification and resend functionality
  - Step 3: Dual verification (phone and email) with separate verification code inputs
  - Step 4: PIN code setup with confirmation validation and security guidelines
  - Added step progress indicator and form validation with real-time feedback
  - Implemented secure PIN code confirmation with mismatch warnings and security tips
- January 29, 2025. Completed wealth order account records implementation:
  - Added "理财账户记录" as 4th tab in wealth orders section
  - Configured table columns: 时间、类型、币种、金额、相关账户、状态
  - Implemented sample data for account transfers (转入、转出、收益发放)
  - Updated desktop table headers and data mapping logic for all wealth order tabs
  - Enhanced mobile view field mappings for wealth-related data display
  - Resolved red warning message displaying on wealth account records page
- January 30, 2025. Major homepage redesign - "Social + Guarantee + AI" platform presentation:
  - Completely redesigned homepage to showcase crypto economic ecosystem instead of wallet-focused approach
  - Updated hero section with new title "革新加密经济生态" and subtitle "全球首个「社交+担保+AI」一体化数字资产平台"
  - Added platform core function icons: social (chat), USDT, guarantee (shield), AI (brain)
  - Implemented P1 market pain points section highlighting trust deficit, high barriers, and fragmented features
  - Created P2 solution section showcasing three core modules: crypto social network, smart guarantee trading, zero-threshold quantitative tools
  - Redesigned P3 core features as "三大核心功能" with three independent first-level modules:
    * Module 01: 社交金融网络 (Social Finance Network) - green theme with user statistics
    * Module 02: 智能担保交易 (Smart Guarantee Trading) - purple theme with 4-step process flow
    * Module 03: AI量化生态 (AI Quantitative Ecosystem) - gradient theme with strategy statistics
  - Implemented P4 technical advantages section: multi-sig guarantee accounts, NLP smart contract generation, fiat channel aggregation
  - Removed top navigation items: 钱包 (Wallet) and 代币经济 (Tokenomic) for simplified interface
  - Removed P5 business model, P6 competitive advantages, and P7 development roadmap sections for streamlined presentation
  - Updated final CTA section with new slogan "让每一笔加密交易都安全可信任" and contact information
  - Applied consistent color scheme: deep blue (#14C2A3) + tech purple + fluorescent green throughout design
  - Fixed payment order data access logic in getOrderRecords function to support new 4-category structure
- January 30, 2025. Enhanced navigation and download interface:
  - Renamed top navigation "SDK&API" to "首页" (Home) with bilingual support
  - Replaced banner action buttons with comprehensive multi-platform download section
  - Added five download options: Web版 (with login functionality), Windows, 安卓APK, Google Play, and App Store
  - Implemented platform-specific icons and color schemes for each download button
  - Created responsive button layout with hover effects and proper spacing
- January 30, 2025. Implemented strict color scheme optimization:
  - Removed all purple, red, orange, and yellow colors from homepage design
  - Standardized color palette to only four colors: green (#14C2A3), black, deep blue (blue-400 to blue-900), and white
  - Updated AI engine section from purple theme to blue theme
  - Modified market pain points section (P1) from red/orange/yellow cards to gray/green/blue color scheme
  - Replaced all background gradients and accent colors to match restricted palette
  - Maintained visual hierarchy while adhering to simplified color requirements
- January 30, 2025. Removed homepage and implemented direct redirect:
  - Simplified app/page.tsx to automatically redirect users to /wallet page
  - Replaced complex homepage content with simple loading screen during redirect
  - Configured wallet button navigation to jump to specific order record tabs (资金记录 and 订单记录)
  - Users now access main project directly without homepage intermediary step
  - Maintained loading indicator with BXB branding during redirect process
- January 30, 2025. Brand evolution completed - BeDAO to BXB:
  - All "BeDAO" and "BEDAO" references replaced with "BXB" throughout the application
  - Updated application metadata, titles, and user interface text
  - Modified invite codes from "BEDAO2025" to "BXB2025"  
  - Updated domain references from "bedao.com" to "bxb.com"
  - Changed loading screens, web3 components, and product names to BXB branding
  - Maintained consistent branding across all navigation, wallet, mall, and profile pages
- January 30, 2025. Enhanced promotion method 1 with infinite commission system:
  - Expanded promotion method 1 from 4 steps to 5 steps
  - Added step 5: "无限层级佣金" (Infinite Level Commission)
  - Implemented perpetual commission structure where friends of friends become permanent referrals
  - Added feature tags: "永久收益" (Permanent Income), "无限层级" (Infinite Levels), "自动分佣" (Auto Commission)
  - Used red color scheme for step 5 badge to distinguish from other steps
  - Maintained consistent design pattern with visual icons and detailed descriptions
- January 30, 2025. Updated promotion method 1 step 2 with official Telegram channel integration:
  - Changed step 2 from generic "拉好友进群" to "邀请好友加入BXB官方频道"
  - Added detailed description about joining BXB's official Telegram channel/group for latest updates and communication
  - Integrated official Telegram channel link: https://t.me/bxb_official
  - Added styled link card with Telegram icon, channel name, and copy button functionality
  - Used blue color scheme consistent with Telegram branding
- January 30, 2025. Enhanced contract commission card design layout:
  - Updated contract commission cards to match invite friends top card layout pattern
  - Changed from centered icon-top layout to left-aligned header with icon and title
  - Added subtitle descriptions for better context (yesterday/last month comparison data)
  - Implemented consistent grid layout (2 columns on mobile, 4 on desktop)
  - Applied transition animations and proper spacing matching the invite friends design
  - Maintained color scheme and functionality while improving visual hierarchy
- January 30, 2025. Added contract agent level display to commission ratio card:
  - Added current contract agent level indicator in commission ratio card
  - Shows "当前等级：超级合约代理" below the percentage value
  - Used consistent color scheme with commission percentage for visual hierarchy
  - Maintained existing "查看佣金规则" button functionality
- January 30, 2025. Restructured commission and referral data into individual cards:
  - Split commission and referral data from two large cards into four individual cards
  - Created separate cards for: 可领取佣金, 直推人数, 间推人数, 活跃用户
  - Applied consistent design pattern matching invite friends top cards layout
  - Added appropriate icons and color schemes for each data type
  - Integrated claim button directly into the commission card
  - Enhanced data visualization with additional context (monthly growth, activity rates)
- January 30, 2025. Adjusted commission card layout and button styling:
  - Moved "可领取佣金" card to the last position in the grid
  - Changed "立即领取" button from green to black color scheme
  - Maintained consistent hover effects and accessibility
  - Removed next settlement time display from commission card
- January 30, 2025. Enhanced commission details table with comprehensive tracking:
  - Added referral type labels (直推/间推) with colored badges to distinguish direct vs indirect referrals
  - Integrated fee rate and fee amount columns for complete transaction transparency
  - Implemented filtering and search functionality with user ID, trading pair, referral type, and status filters
  - Updated table headers to include all relevant commission tracking information
  - Enhanced data visualization with proper color coding for different referral types
- January 30, 2025. Updated commission card branding and functionality:
  - Renamed "可领取佣金" to "未结算佣金" for clearer terminology
  - Changed "立即领取" button to "立即结算" with transparent black border styling
  - Modified button design from solid black to black frame transparent with hover effects
  - Added "加载更多" button to commission details table for pagination functionality
- January 30, 2025. Added comprehensive user list management system:
  - Added "查看名单" buttons to direct referral, indirect referral, and active user cards
  - Created modal popup displaying user lists with registration time and referral tracking
  - Implemented color-coded border buttons matching each card's theme (blue/purple/orange)
  - Built detailed user information table with user ID, username, registration time, and status
  - Reverted settlement button to solid black styling for better visual emphasis
- January 30, 2025. Standardized button styling for consistency:
  - Changed all "查看名单" buttons to uniform black border transparent style
  - Ensured visual alignment between "立即结算" and "查看名单" buttons
  - Maintained consistent hover effects across all commission card buttons
- January 30, 2025. Implemented commission settlement system:
  - Added red warning text for expiring commission amounts in unsettled commission card
  - Created comprehensive settlement modal with fee calculation and account destination
  - Displayed settlement fees (0.5%) and actual amount to be credited to spot account
  - Added expiration reminders and settlement instructions with 1-3 minute processing time
  - Integrated settlement confirmation flow with automatic fund transfer to spot account
- January 30, 2025. Enhanced user list modal with advanced filtering:
  - Removed "上月未结" display from unsettled commission card for cleaner interface
  - Added comprehensive search functionality for user ID and username filtering
  - Implemented three-tier filtering: registration time, registration country, and registration city
  - Updated table structure to display registration country and city instead of referral time
  - Enhanced user data with international location information (China, US, Singapore, Japan, Korea, UK, Canada)
  - Integrated dynamic filtering logic with real-time search and multi-criteria selection
- January 30, 2025. Refined commission expiration warning display:
  - Changed "即将过期金额" to "即将过期" for cleaner text presentation
  - Increased font size from text-xs to text-sm to match activity rate display consistency
- January 30, 2025. Completed comprehensive commission system implementation:
  - Successfully implemented all five commission types using contract commission template: 合约佣金, 理财佣金, U卡佣金, 担保佣金, 支付佣金
  - Each commission type features consistent 4-card layout: today's earnings, monthly statistics, cumulative totals, commission rates
  - Implemented specialized transaction tables for each type with relevant columns and data structures
  - U卡佣金 includes sub-tabs for "开卡佣金" and "充值佣金" with separate tracking systems
  - All commission types maintain consistent styling, data formatting, and status indicators
- January 30, 2025. Enhanced wealth commission layout to match contract commission:
  - Updated 理财佣金 from 4-card layout to full 8-card layout matching 合约佣金 template
  - Added detailed commission tracking cards: 理财客户数, 活跃产品数, 投资总额, 未结算佣金
  - Integrated user list management buttons and settlement functionality for wealth commission
  - Applied consistent left-aligned card layout with proper button styling and data presentation
- January 30, 2025. Enhanced wealth commission details with advanced features:
  - Added direct/indirect referral type indicators with colored badges in commission details table
  - Integrated commission rate and commission amount columns for complete transaction transparency
  - Implemented comprehensive search functionality (user ID, product name) and filtering system
  - Added time-based filtering tabs: 今日, 本周, 本月 for detailed commission tracking
  - Enhanced table structure with 8 columns including referral type, product type, and status indicators

## User Preferences

Preferred communication style: Simple, everyday language.