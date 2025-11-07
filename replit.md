# BeDAO 管理后台系统

## Overview
BeDAO 管理后台是一个专业的加密货币交易平台后台管理系统，基于 Next.js 15 和 React 构建。该系统旨在为平台运营人员提供全面的管理功能，包括用户管理、交易监控、财务管理和系统配置，确保加密货币交易平台的顺畅运行和资产安全。这是一个纯后台管理系统，不包含任何用户端功能。

## User Preferences
Preferred communication style: Simple, everyday Chinese language.

## System Architecture

### UI/UX Decisions
- **全新导航架构**: 采用顶部导航栏（15个一级模块菜单）与左侧边栏（动态二级子菜单）的双层导航体系。
- **响应式设计**: 桌面端使用横向滚动菜单，移动端使用汉堡菜单侧边Sheet弹窗。
- **主题**: 支持动态亮色/暗色主题切换，并持久化用户偏好。
- **品牌与配色**: 统一的BeDAO品牌设计，采用绿色、黑色、深蓝色、白色作为标准化配色方案。
- **登录页面**: 独立的登录页面布局。
- **页面优化**: 简化BePay管理模块页面布局，移除顶部统计卡片，统一页面结构和间距规范。
- **功能优化**:
    - **代理商管理**: 重构佣金管理为代理商管理，提供启用/冻结开关、佣金比例查看、详情记录分页及排名筛选系统。
    - **商户管理**: 提供API申请中、已有API、全部商户筛选页签，账户余额详情弹窗，密钥管理及域名审核功能，以及按币种和支付通道精细化配置费率系统。
    - **订单管理**: 包含代收订单、代付订单、兑换订单的详细管理功能，支持收款/付款信息查看、补发通知、重新校验、冻结/退款操作，以及兑换订单的汇率确认与利润计算。

### Technical Implementations
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui, custom design system, React Context API for state management, Recharts for charting, Lucide React for icons, internationalization (Chinese/English).
- **Backend**: Express.js with session management.
- **Database**: PostgreSQL with Drizzle ORM.
- **Authentication**: Replit Auth (OpenID Connect), independent admin login with email verification, PostgreSQL-backed session store.
- **Core Features**:
    - 综合性后台管理面板。
    - 15个管理模块，涵盖运营报表、用户管理、IM管理、社交管理、法币管理、担保管理、U卡管理、现货管理、合约管理、跟单管理、理财管理、佣金管理、BePay管理、财务管理、系统管理。
    - 登录后访问控制，持久化管理员认证状态。
    - BePay管理模块包含币种、供应商、接口、通道、商户、代理商、代收订单、代付订单、兑换订单9个子页面，通道管理支持三档阶梯费率配置。

### System Design Choices
- **客户端路由**: 使用 `instant-navigation` 组件和 `window.history.pushState`/`popstate` 实现即时页面切换，避免页面重载。
- **加载动画**: 页面切换时显示旋转加载器和“加载中...”文字（300ms过渡）。
- **状态管理**: 使用 React Context API (ThemeProvider, AdminProvider) 管理全局状态。
- **安全性**: 安全的会话处理和路由保护，未登录时自动跳转登录页。
- **部署**: 自动扩展部署配置，支持Next.js服务器功能和独立输出。

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