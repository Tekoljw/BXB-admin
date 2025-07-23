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
- January 30, 2025. Implemented complete guarantee transaction workflow in chat interface:
  - Added guarantee transaction message type with comprehensive data structure including amount, currency, description, type (buy/sell), duration, deposit percentage, and 4-step progress tracking
  - Created guarantee transaction modal with transaction type selection (求购/出售), currency selection, amount input, description textarea, duration options (1-72 hours), and deposit percentage options (5-30%)
  - Implemented interactive guarantee message display with gradient backgrounds, progress step visualization, status indicators, and action buttons
  - Built 4-step guarantee process: 发起担保交易 → 等待对方接受 → 双方支付担保金 → 完成交易确认
  - Added guarantee transaction functions: handleGuaranteeTransaction, handleAcceptGuarantee, handleCompleteGuaranteeStep with proper state management
  - Integrated guarantee transaction option into chat add menu with Shield icon
  - Created comprehensive guarantee message card with transaction details, progress tracking, and interactive buttons for accepting and completing steps
  - Added support for 6 cryptocurrencies (USDT, BTC, ETH, BNB, ADA, SOL) with proper currency icons and color coding
  - Implemented proper error handling, form validation, and modal state management for guarantee transactions
- January 30, 2025. Restructured commission records system:
  - Renamed "佣金记录" to "佣金结算记录" across all navigation and data structures
  - Created 5 separate commission tabs within order records: 合约佣金, 理财佣金, U卡佣金, 担保佣金, 支付佣金
  - Updated data structure from array format to object with separate arrays for each commission type
  - Enhanced commission data with specific transaction types and business contexts for each category
  - Updated getOrderRecords function to properly handle new 5-tab commission structure
  - Added "支付通道" column to 支付佣金 commission details for complete payment channel tracking
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
- January 30, 2025. Upgraded U卡佣金 to full 8-card layout with tab switching system:
  - Converted U卡佣金 from 4-card layout to complete 8-card layout matching other commission types
  - Added detailed tracking cards: U卡用户数, 开卡数量, 充值金额, 未结算佣金
  - Implemented tab switching between 开卡佣金 and 充值佣金 instead of vertical stacking
  - Added comprehensive search and filtering functionality with time-based tabs
  - Enhanced table structure with 8 columns including referral type, commission rates, and status tracking
  - Integrated dynamic content based on selected tab (card types vs currencies)
- January 30, 2025. Updated commission card naming conventions and fixed React errors:
  - 理财佣金: "理财客户数" → "直推理财用户", "活跃产品数" → "间推理财用户"
  - 合约佣金: "直推用户" → "直推合约用户", "间推用户" → "间推合约用户"
  - Fixed React rendering errors in U卡佣金 table with proper TypeScript typing (`record: any`)
  - Cleaned up all unnecessary type casting references for cleaner code
- January 30, 2025. Replaced mobile market tab with original market page content:
  - Removed custom market tabs component with self-designed data
  - Created MarketContent component that displays complete original market page content
  - Mobile market tab now shows authentic market data from main menu without additional tabs or search functionality
  - Market content includes top coins, gainers ranking, volume ranking, and complete market data table with price charts
  - Added mobile-specific responsive design: hidden top 6 cards (top coins, gainers ranking, volume ranking) on mobile devices (< 768px)
  - Mobile displays only the market data table for better user experience on small screens
  - Applied same mobile responsive design to main menu market page: hidden top 6 cards (4 top coins + 2 ranking cards) on mobile devices
  - Both mobile market tab and main market page now show only market data table with navigation tabs on mobile
  - Updated main menu market page tabs: removed "现货" and "合约" from primary tabs, added "热门", "涨幅榜", "跌幅榜", "新币榜", "成交额榜"
  - Moved "现货" and "合约" to secondary tabs for better organization
  - Implemented data filtering and sorting logic for each tab: favorites filter, volume ranking, gainers/losers filtering, new coins simulation, turnover ranking
- January 30, 2025. Designed mobile-responsive market table layout:
  - Created three-column mobile layout: 交易对/成交量, 价格, 24H涨跌
  - Split desktop and mobile views with separate headers and data presentation
  - Mobile view displays trading pair with volume below, price with high/low range, and color-coded change percentage
  - Implemented responsive design hiding complex desktop columns on mobile devices
  - Added proper border styling and spacing for mobile table rows
  - Mobile search box moved to independent row below primary tabs for better UX
  - Replaced card-style mobile headers with simple text display for cleaner interface
  - Mobile table headers use smaller text and muted colors for better hierarchy
  - Updated MarketContent component to use same mobile layout as main market page
  - Share page market tab now displays consistent three-column mobile layout
- January 30, 2025. Completed USDT trading page mobile adaptation:
  - Moved left sidebar filter panel to mobile top header with 买入USDT/卖出USDT tabs and currency dropdown
  - Hidden mobile filter functions: payment methods, transaction amounts, and custom ranges
  - Created independent card for C2C/快捷/OTC trading mode selection with horizontal icon+text layout
  - Implemented dynamic tag display system showing mode-specific advantages/disadvantages based on selected tab
  - C2C tags: 灵活价格, 多元支付, 支持现金交易, 支持大额 (green) / 等待时间长, KYC, 人工交易 (red)
  - 快捷 tags: KYC, 全自动, 秒到账, 银行卡 (green) / 小额, 每日限制, 学生禁止 (red)  
  - OTC tags: 每日限额高, 每月限额高, 支持大额, 银行监管 (green) / 每日限额高, 每月限额高, 手续费高 (red)
  - Desktop version maintains full functionality while mobile version provides streamlined interface
  - Fixed tab sliding background positioning and reduced tab height for better mobile UX
- January 30, 2025. Enhanced USDT trading page with comprehensive mobile card layouts:
  - Converted C2C merchant list to responsive card format for mobile devices with dedicated merchant information display
  - Fixed OTC text overflow issues using truncate classes and proper flex container management
  - Redesigned OTC service provider cards to match reference design: left (icon + name + payment icons), right (price info)
  - Added OTC purchase amount input card with "购买USDT数量" input field, minimum exchange info, and "重新查看报价" button
  - Implemented bottom action button "使用Ramp 购买" in green theme for both desktop and mobile layouts
  - Enhanced mobile UI with consistent card styling, proper spacing, and improved user experience across all trading modes
- January 30, 2025. Completed C2C mobile interface enhancements:
  - Added transaction type tabs (现金交易/线上转账) at top with publish order button on right
  - Moved cash transaction tags next to user names with location icon
  - Made chat button icon-only and repositioned action buttons to bottom-right aligned with payment methods
  - Added guarantee period display (担保周期：24小时) in blue color aligned with limit amount
  - Removed "支付方式" header text and "最低兑换 100 USDT • 无上限" text for cleaner mobile interface
- January 30, 2025. Implemented finance page mobile adaptation:
  - Converted left sidebar menu to mobile tabs for UBX/UBC mining selection
  - Positioned "新用户专属" banner at the top on mobile with compact design
  - Added sliding tab interface for mining type selection with HOT badge for UBC
  - Created mobile-optimized finance product cards with condensed layout and responsive spacing
  - Maintained desktop sidebar navigation while providing streamlined mobile experience
- January 30, 2025. Enhanced wallet page mobile adaptation with hamburger menu system:
  - Added hamburger menu button with 90-degree rotation animation on hover
  - Implemented current page title display next to hamburger menu for user orientation
  - Enlarged and repositioned top-level tabs (账户资产/订单记录) to be right-aligned with better sizing
  - Implemented sliding sidebar overlay with smooth slide-in/slide-out animations
  - Removed sidebar header and close button for cleaner mobile interface
  - Applied PC-style selection styling (border-[#00D4AA] with scale-105 effect) to mobile sidebar menu items
  - Created proper animation states with opacity transitions for overlay background
  - Enhanced mobile user experience with intuitive gesture-based navigation
- January 30, 2025. Optimized wallet overview mobile layout with single card display:
  - Added mobile-specific account type tabs (现金账户/总资产) above cards with full-width centered layout
  - Implemented conditional card rendering: single card display on mobile based on selected tab
  - Hidden desktop account type tabs and operation buttons section on mobile for cleaner interface
  - Created separate mobile operation buttons section with horizontal scrolling and flex-shrink-0 styling
  - Enhanced mobile UX with proper tab animations and responsive button layout
  - Maintained all functionality while providing streamlined mobile interface
- January 30, 2025. Updated mobile top-level tabs styling:
  - Changed mobile top-level tabs (账户资产/订单记录) from sliding background style to text+underline style
  - Implemented clean text-based tabs with animated underlines for active state
  - Applied proper color schemes for both light and dark themes with hover effects
  - Enhanced active state: larger bold text (text-base font-bold) with theme-appropriate colors
  - Active text: white for dark theme, dark gray for light theme
  - Active underline: thick bar (h-1) matching text color for consistent visual emphasis
  - Maintained smooth transitions while providing cleaner mobile interface design
- January 30, 2025. Optimized mobile operation buttons layout:
  - Hidden "现货交易记录" (spot trading records) button on mobile for cleaner interface
  - Removed bottom drag bar (overflow-x-auto pb-2) to eliminate horizontal scrolling
  - Changed button layout from flex-shrink-0 to flex-1 for main action buttons to auto-fit 5 buttons across screen width
  - Maintained single icon button (资金记录) as flex-shrink-0 for consistent sizing
  - Enhanced mobile UX with properly distributed button layout without scrolling
- January 30, 2025. Redesigned mobile operation buttons to vertical icon+text layout:
  - Changed mobile buttons from horizontal (icon+text) to vertical layout (icon on top, text below)
  - Increased button height from h-10 to h-16 to accommodate vertical layout
  - Enlarged icons from h-4 w-4 to h-6 w-6 for better mobile visibility
  - Added flex-col class and proper spacing (mb-1) between icon and text
  - Updated text size to text-xs for compact mobile display
  - Applied vertical layout to all 5 buttons: 入金, 提币, 交易, 划转, 记录
  - Made all buttons equal width using flex-1 class for consistent sizing
  - Enhanced mobile user experience with touch-friendly larger icons and cleaner visual hierarchy
- January 30, 2025. Hidden sorting functionality on mobile devices:
  - Completely hidden balance and market cap sorting buttons on mobile
  - Changed container from "flex" to "hidden md:flex" to hide entire sorting section
  - Desktop maintains full sorting functionality with "按余额排序" and "按市值排序"
  - Mobile interface simplified without sorting controls for cleaner layout
  - Improved mobile user experience by removing complexity and saving screen space
  - Sorting functionality remains available on desktop where screen space permits
- January 30, 2025. Implemented responsive modal slide directions:
  - Currency selection modal: slides from right on desktop, bottom on mobile
  - Asset management modal: slides from right on desktop, bottom on mobile
  - Applied responsive positioning with md: breakpoints for desktop behavior
  - Mobile modals use max-md: classes for bottom positioning with rounded top corners
  - Added max-h-[80vh] constraint on mobile for better screen utilization
  - Enhanced user experience with platform-appropriate interaction patterns
- January 30, 2025. Optimized total assets mode mobile layout:
  - Hidden percentage progress bars on mobile for cleaner interface
  - Hidden "记录" (record) button on mobile, showing only "划转" and "查看" buttons
  - Maintained full functionality on desktop with all three buttons and progress visualization
  - Applied responsive design using md: and md:hidden classes for optimal mobile experience
  - Reduced button padding on mobile (px-3) for better space utilization
- January 30, 2025. Enhanced contract account mobile card layout:
  - Changed mobile grid layout to three columns (grid-cols-3) to match desktop layout
  - Reduced mobile card padding from p-4 to p-2 for better space utilization
  - Scaled down mobile font sizes: titles from text-sm to text-xs, amounts from text-2xl to text-lg
  - Simplified mobile currency button: removed border, icon, and background - now shows only "USDT" text with down arrow
  - Desktop maintains full currency button styling with border, icon, and background
  - Reduced gap between cards on mobile (gap-2) while maintaining desktop spacing (md:gap-4)
  - Six contract cards now arranged in 2 rows × 3 columns on both mobile and desktop
  - Enhanced mobile user experience with appropriately sized text and spacing
- January 30, 2025. Redesigned contract account mobile navigation layout:
  - Separated desktop and mobile layouts: desktop maintains horizontal layout with tabs and buttons on same row
  - Mobile layout: operation buttons (划转, 交易, 记录按钮) appear in first row, centered with gap-2 spacing
  - Mobile layout: tabs (当前持仓, 账户余额) moved inside content card at the top for better organization
  - Applied responsive design with tabs hidden on desktop and shown on mobile within content area
  - Enhanced mobile UX with operation buttons above content and tabs integrated within the card interface
- January 30, 2025. Completed comprehensive contract account mobile optimization:
  - Redesigned operation buttons with vertical icon+text layout: icons (h-6 w-6) above text with h-16 button height
  - Changed button text labels: "资金记录" and "交易记录" now display full text instead of icon-only
  - Repositioned tabs to left alignment and position distribution button to right in same row within content card
  - Implemented mobile card layout for account balance list replacing desktop table view
  - Mobile cards feature: coin icon+name at top, 2x2 grid of data (账户余额, 未实现盈亏, 净资产余额, 保证金余额)
  - Desktop maintains original table layout while mobile provides touch-friendly card interface
  - Removed hover effects from contract account top cards: eliminated transition-all, duration-300, ease-out, and hover:shadow-xl classes
  - Contract account summary cards now have static styling without mouse interaction effects
- January 30, 2025. Enhanced cash account mobile layout adaptation:
  - Redesigned mobile account type tabs to be left-aligned instead of centered
  - Added right-side icon buttons for 资金记录, 交易记录, and 仓位分布 functions
  - Hidden mobile record button from operation buttons row, displaying only 4 main action buttons (入金, 提币, 交易, 划转)
  - Updated mobile tab layout: left side shows "现金账户/总资产" tabs, right side shows 3 functional icon buttons
  - Enhanced space utilization with justified layout between tabs and icons on mobile devices
- January 30, 2025. Optimized contract account mobile button layout:
  - Modified contract account mobile operation buttons to uniform size distribution across full screen width
  - Applied flex-1 class to all four buttons (划转, 交易, 资金记录, 交易记录) for equal width allocation
  - Reduced horizontal padding from px-3 to px-2 to accommodate equal distribution
  - Removed justify-center from button container to allow natural flex distribution
  - Enhanced mobile user experience with consistent button sizing and full-width utilization
- January 30, 2025. Redesigned contract account mobile balance card layout:
  - Restructured mobile account balance cards with improved visual hierarchy
  - Moved account balance to top-right corner alongside coin information for prominence
  - Repositioned remaining three data items (未实现盈亏, 净资产余额, 保证金余额) to bottom row with horizontal 3-column grid
  - Enhanced coin icon size from w-10 h-10 to w-12 h-12 and increased symbol font size for better visibility
  - Added border separator between top section (coin info + balance) and bottom data grid
  - Improved mobile readability with centered text alignment for bottom data items
- January 30, 2025. Optimized finance account mobile layout for 3-column display:
  - Changed finance card grid from grid-cols-1 md:grid-cols-3 to grid-cols-3 for mobile 3-column layout
  - Added responsive padding: p-2 on mobile, p-6 on desktop for compact mobile display
  - Reduced icon sizes from h-6 w-6 to h-4 w-4 on mobile, maintaining md:h-6 md:w-6 for desktop
  - Decreased text sizes: title from text-lg to text-xs on mobile, amount from text-3xl to text-lg on mobile
  - Hidden trend chart and transfer button on mobile to save space in compact layout
  - Applied responsive spacing adjustments: reduced margins and gaps for mobile optimization
- January 30, 2025. Enhanced finance account mobile text and currency button styling:
  - Further reduced mobile amount text from text-lg to text-sm for better fit in compact layout
  - Completely hidden currency unit and bottom description text on mobile devices
  - Simplified mobile currency buttons: removed border, background, and icon - showing only currency symbol
  - Desktop maintains full currency button styling with border, icon, and dropdown indicator
  - Mobile currency buttons positioned as simple text without visual containers for cleaner appearance
- January 30, 2025. Refined finance account mobile card titles and icons:
  - Reduced mobile title font size from text-xs to text-[10px] for better space utilization
  - Hidden all card icons (PiggyBank, BarChart3, CreditCard) on mobile devices using hidden md:block
  - Desktop maintains full icons with h-6 w-6 sizing and text-lg title font
  - Mobile cards now show only minimal text titles without visual clutter
- January 30, 2025. Reorganized finance account mobile operation button layout:
  - Moved four operation buttons (划转, 闪兑, 资金记录, 投资记录) to separate row above tabs on mobile
  - Used vertical icon+text layout with h-16 height and flex-1 width distribution across screen
  - Kept only position distribution button (持仓分布) alongside tabs, right-aligned
  - Tabs (收益计算, 当前持仓, 账户余额) remain left-aligned on same row as position distribution button
  - Desktop maintains original layout with all buttons on same row as tabs
- January 30, 2025. Fixed finance account tab width to auto-adapt within screen bounds:
  - Changed tabs from fixed 96px width to responsive flex-1 layout with max-width constraint
  - Updated sliding background to use percentage-based positioning (33.333% width)
  - Added truncate text and responsive font sizes (text-xs on mobile, text-sm on desktop)
  - Tabs now automatically adjust to available screen space without overflow
- January 30, 2025. Converted finance account balance from table to mobile card layout:
  - Added responsive design: desktop maintains table view (hidden md:block), mobile shows cards (md:hidden)
  - Mobile cards feature: coin icon+name+available balance at top, frozen amount+action buttons at bottom
  - Enhanced mobile card styling with larger icons (w-10 h-10), proper spacing, and 4-data-point layout
  - Preserved all functionality including balance visibility toggle and action buttons (划转, 闪兑)
  - Desktop table view unchanged for optimal data presentation on larger screens
- January 30, 2025. Added red warning notices to finance account sections:
  - Added prominent red warning boxes above "收益计算" and "当前持仓" section titles
  - Warning message: "以下内容不需要改成跟原型一样，使用ubx原有页面，排版和手机端适配需要根据原型适当优化即可。" in red text with red background and border
  - Styled with bg-red-50/dark:bg-red-900/20 background and red-200/dark:red-800 borders for visibility
  - Applied to both sections to inform users about UBX integration approach and mobile optimization requirements
- January 30, 2025. Removed selection state effects from finance account top cards:
  - Eliminated ring-2, border highlight, and shadow effects from all three finance cards
  - Removed transition animations and hover states for static card design
  - Cards now maintain consistent appearance without selection state visual feedback
- January 30, 2025. Adapted U卡账户 top cards for mobile two-column layout:
  - Changed grid from grid-cols-1 md:grid-cols-2 to grid-cols-2 for mobile two-column display
  - Reduced mobile padding from p-6 to p-2, maintained md:p-6 for desktop
  - Scaled down mobile text sizes: titles from text-lg to text-xs, amounts from text-2xl to text-lg
  - Hidden icons on mobile devices using hidden md:block for cleaner compact interface
  - Hidden trend charts and additional info on mobile to maximize space utilization
  - Desktop maintains full functionality with icons, charts, and larger text sizes
- January 30, 2025. Enhanced U卡账户 mobile layout with comprehensive button reorganization:
  - Moved USDT unit to top-right corner on mobile cards using absolute positioning
  - Added mobile operation buttons row above tabs with vertical icon+text layout (h-16 height, flex-1 width)
  - Included 5 main functions: 充值, 申请新卡, 激活卡片, 划款, 个人信息 with proper onClick handlers
  - Repositioned tabs to left alignment and added 3 right-aligned icon buttons: 充值记录, 消费记录, 资金分布
  - Desktop maintains original horizontal button layout while mobile uses optimized vertical icon+text pattern
  - Mobile buttons use gap-2 spacing with proper touch targets and responsive design
- January 30, 2025. Completed comprehensive U卡账户 physical card mobile optimization:
  - Changed grid layout from fixed minmax(350px, 1fr) to responsive grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  - Reduced mobile padding for all cards: p-3 on mobile, p-4 on medium, p-6 on large screens
  - Scaled down mobile text sizes: logo (text-xs), card numbers (text-xs), expiry dates (text-[10px])
  - Resized mobile icons and elements: chip icon (w-6 h-4), copy buttons (h-2 w-2), payment logos (w-2 h-2)
  - Updated card balance positioning and styling for mobile compatibility with proper USDT unit spacing
  - Enhanced mobile button layout with smaller gaps (gap-1) and responsive background styling for operation buttons
  - Applied mobile optimizations to all 5 physical cards: 白金卡, 钻石卡, 黑金卡, 商务卡, 学生卡
  - Updated branding from "BeDAO" to "BXB" across all physical card designs
  - Added proper responsive padding and typography scaling for optimal mobile viewing experience
- January 30, 2025. Optimized guarantee account (担保账户) mobile layout with 3-column card display:
  - Changed top cards grid from grid-cols-1 md:grid-cols-3 to grid-cols-3 for consistent mobile 3-column layout
  - Reduced mobile card padding from default to p-2 and adjusted gaps from gap-6 to gap-2 on mobile
  - Scaled down mobile text sizes: titles from text-lg to text-[10px], amounts from text-2xl to text-sm
  - Hidden icons on mobile devices and reduced icon sizes for visible elements
  - Hidden USDT currency units and description text on mobile for cleaner compact interface
  - Applied mobile optimization to all 3 guarantee account cards: 交易担保金额, 信誉担保金额, 可用余额
  - Desktop maintains full functionality with icons, larger text, and complete information display
- January 30, 2025. Enhanced guarantee account mobile interface with comprehensive button reorganization:
  - Shortened button text: "增加信誉担保资金" → "增加信誉担保", "延长信誉担保时间" → "延长信誉担保"
  - Added mobile-specific operation buttons above tabs with vertical icon+text layout (4 buttons in grid-cols-4)
  - Mobile buttons: 增加信誉担保, 延长信誉担保, 划转, 应收担保交易 with h-16 height and 6x6 icons
  - Repositioned tabs (收款担保/付款担保) to left alignment on same row as record buttons
  - Right-aligned record buttons: 资金记录 (FileText icon) and 担保记录 (History icon)
  - Removed third pie chart icon button from both desktop and mobile views
  - Desktop maintains horizontal button layout while mobile uses optimized vertical icon+text pattern
  - Enhanced mobile user experience with touch-friendly button layout and proper visual hierarchy
- January 30, 2025. Optimized guarantee account mobile card layout and text formatting:
  - Adjusted card titles to left alignment for mobile display consistency
  - Made countdown text and description text visible on mobile devices
  - Simplified countdown format from "担保解冻时间：00天00小时00分钟00秒" to "解冻：00:00:00:00"
  - Enhanced mobile user experience with proper text display and alignment across all three guarantee account cards
- January 30, 2025. Completed mobile responsive progress bar optimization for guarantee account cards:
  - Implemented separate desktop and mobile layouts for all guarantee transaction cards (收款担保 and 付款担保)
  - Desktop layout maintains progress bars on the right side with horizontal flex layout
  - Mobile layout moves progress bars to a new row below the content for better touch interface usability
  - Applied responsive design to 4 guarantee cards total: 2 in 收款担保 tab, 2 in 付款担保 tab
  - Enhanced mobile user experience with proper spacing and readability for transaction progress tracking
- January 30, 2025. Moved guarantee account buttons and contact icons to top-right corner on mobile:
  - Repositioned "查看合同" button and contact icon to right-aligned position on mobile layouts
  - Applied compact button styling: smaller padding (px-2 py-1), reduced text size (text-xs), smaller icons (h-4 w-4)
  - Changed mobile layout from vertical stacking to horizontal flex with justify-between alignment
  - Enhanced mobile touch interface with appropriately sized buttons in accessible top-right corner position
  - Updated all 4 guarantee cards (2 收款担保, 2 付款担保) with consistent mobile button placement
- January 30, 2025. Implemented BePAY account mobile adaptation with merchant ID card priority:
  - Placed merchant ID card at the very top on mobile devices (MP2025001234 + BeDAO科技有限公司)
  - Applied compact mobile styling to merchant card: smaller icons (h-6 w-6 → h-3 w-3), reduced padding and text sizes
  - Restructured payment API cards to display two per row on mobile (grid-cols-2) with condensed content
  - Mobile payment cards feature smaller text (text-xs), compact buttons, and reduced padding (p-3)
  - Maintained desktop three-column layout while providing streamlined mobile two-row structure
  - Enhanced mobile user experience with properly sized touch targets and clear visual hierarchy
- January 30, 2025. Enhanced BePAY account payment API cards with shared background and selection states:
  - Added shared gray background container around both payment API cards on mobile
  - Implemented selection state visual feedback: unselected cards show grayed text and icons
  - Applied gray styling to titles, amounts, and descriptions for unselected payment cards
  - Selected card maintains normal colors while unselected card uses text-gray-400 styling
  - Enhanced user interface clarity with proper visual hierarchy and selection indication
- January 30, 2025. Updated crypto payment card description text:
  - Changed "其他币种：28.95 ETH + 1.26 BTC" to "当前地址数：12312u"
  - Applied to both mobile and desktop layouts while maintaining selection state color logic
- January 30, 2025. Repositioned merchant ID card to first position in BePAY account layout:
  - Added merchant ID card to desktop layout with full horizontal layout (company info, certification status, API buttons)
  - Maintained mobile compact layout at top position with vertical button arrangement
  - Merchant ID card now appears first in both mobile and desktop BePAY account sections
  - Enhanced visual hierarchy with merchant information taking priority over payment API cards
- January 30, 2025. Enhanced BePAY account mobile operation buttons with vertical icon+text layout:
  - Updated mobile buttons to display icons above text (h-16 height on mobile, h-12 on desktop)
  - Applied to all BePAY operation buttons: 商户资产, 通道配置, 法币下发, 代付金充值, 地址管理, OTC供应商, 划转
  - Icons sized h-6 w-6 on mobile, h-4 w-4 on desktop with proper spacing (mb-1 on mobile, mr-2 on desktop)
  - Text sized text-[10px] on mobile, text-base on desktop for optimal readability
  - Maintained responsive flex layout (flex-col on mobile, flex-row on desktop)
- January 30, 2025. Optimized BePAY mobile button layout for 4-column display:
  - Changed mobile grid from grid-cols-2 to grid-cols-4 for displaying 4 buttons per row
  - Reduced gap spacing from gap-3 to gap-2 on mobile for better fit
  - Updated text size from text-xs to text-[10px] on mobile to accommodate narrower button width
  - Enhanced mobile space utilization while maintaining button functionality and readability
- January 30, 2025. Redesigned BePAY mobile record tabs and asset distribution layout:
  - Separated mobile layout into left-aligned sliding tabs and right-aligned icon button
  - Left side: record tabs (划转记录, 订单记录) with black sliding tab styling and dark mode support
  - Right side: asset distribution (资产分布) as icon-only button with PieChart icon
  - Filtered out asset distribution from sliding tabs to display separately as dedicated icon button
  - Enhanced mobile navigation with proper spacing and visual hierarchy between tabs and action button
- January 30, 2025. Implemented mobile chat interface navigation:
  - Added showMobileChat state to manage mobile chat view
  - Updated contact click handlers to trigger mobile chat interface on contact selection
  - Created full-screen mobile chat interface with back button, contact header, message display, and input area
  - Implemented proper mobile chat flow: contact list → chat interface → back to contact list
  - Enhanced mobile user experience with touch-friendly interface and proper message rendering
- January 30, 2025. Enhanced mobile chat interface with bottom navigation hiding:
  - Increased z-index to z-[100] to ensure mobile chat overlay completely covers bottom navigation
  - Added body scroll prevention when mobile chat is open to prevent background scrolling
  - Mobile chat interface now properly hides bottom navigation to prevent input box obstruction
  - Contact list and address book views maintain bottom navigation visibility
- January 30, 2025. Restructured BePay mobile interface with proper tab and button organization:
  - Reorganized mobile layout to display main functionality as sliding tabs: 资产管理/通道配置 for fiat, 资产管理/地址管理/OTC供应商 for crypto
  - Separated record functions as independent buttons: 划转记录, 订单记录 positioned on right side
  - Filtered out action buttons (法币下发, 代付金充值, 划转) from sliding tabs to focus on management functions
  - Enhanced mobile navigation with proper separation between main functions and record keeping features
- January 30, 2025. Updated merchant assets and channel configuration tabs to block-style tabs with sliding background animation:
  - Implemented block-style sliding tabs with gray background container and animated black/white sliding indicator
  - Added smooth 300ms transition animations for tab switching with proper positioning calculations
  - Enhanced visual hierarchy with contrasting text colors: active tabs show white/black text, inactive tabs show gray
  - Separate styling for fiat (2 tabs with 46% width) and crypto (3 tabs with 30% width) configurations
- January 30, 2025. Converted payment cards to adaptive width layout:
  - Changed mobile layout from fixed grid-cols-2 to flexible layout with flex and gap-3
  - Changed desktop layout from grid to flex with flex-col sm:flex-row for responsive behavior
  - Added flex-1 class to both fiat and crypto payment cards for automatic width adaptation
  - Removed fixed grid constraints to allow cards to span full available width
  - Enhanced responsive design to utilize full screen width on all device sizes
- January 30, 2025. Removed outer borders from fiat and crypto payment cards:
  - Eliminated border styling from both mobile and desktop payment card containers
  - Kept background colors but removed border-gray-700/border-gray-200 classes
  - Maintained visual hierarchy with background colors while creating cleaner card appearance
- January 30, 2025. Reduced top spacing for BePay account page cards:
  - Changed main container spacing from space-y-6 to space-y-1 for minimal vertical layout
  - Reduced mobile merchant info card bottom margin from mb-6 to mb-1
  - Reduced mobile payment API cards bottom margin from mb-6 to mb-1
  - Reduced desktop grid gap from gap-6 to gap-1 for maximum compact card positioning
- January 30, 2025. Fixed BePAY account card spacing issue:
  - Removed space-y-1 from main container to only reduce top edge spacing
  - Restored proper spacing between cards (mb-4 for mobile, mb-6 for desktop sections)
  - Enhanced section separation while maintaining compact top layout
- January 30, 2025. Fixed finance account desktop function buttons alignment:
  - Moved positioning distribution button (持仓分布) inside the right-aligned button group container
  - All desktop function buttons now properly right-aligned in same container
  - Added separate mobile-only positioning distribution button to maintain mobile functionality
  - Enhanced desktop layout consistency with other account types
- January 30, 2025. Enhanced BePAY account mobile fiat payment layout with merged currency cards:
  - Combined same currency merchant assets and standby funds into single cards on mobile
  - Mobile cards display currency header with both merchant assets and standby funds in vertical layout
  - Added border separator between merchant assets and standby funds sections within each card
  - Desktop maintains separate card layout for merchant assets and standby funds
  - Reduced button sizes and icons for compact mobile display
  - Enhanced mobile user experience with consolidated currency management interface
- January 30, 2025. Optimized BePAY account channel configuration mobile interface:
  - Created separate desktop and mobile layouts for channel configuration cards
  - Mobile cards feature vertical layout: channel name/status at top, data grid in middle, test button at bottom
  - Implemented 3-column data grid for daily limit, single limit, and fees on mobile
  - Added compact toggle switches and smaller test buttons for mobile interface
  - Enhanced mobile navigation: currency tabs at top with horizontal scrolling, payment method tabs below left-aligned
  - Repositioned payment method tabs (代收/代付) to display below currency selection and left-aligned (not full-screen)
  - Desktop maintains original horizontal layout while mobile provides touch-friendly vertical interface

## User Preferences

Preferred communication style: Simple, everyday language.