# BeDAO 管理后台系统

## Overview
BeDAO 管理后台是一个专业的加密货币交易平台后台管理系统，基于 Next.js 15 和 React 构建。该系统专注于为平台运营人员提供全面的管理功能，包括用户管理、交易监控、财务管理、系统配置等。本项目是纯后台管理系统，不包含任何用户端功能，旨在提供一个全面的、高效的、安全的运营管理平台，确保加密货币交易平台的顺畅运行和资产安全。

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

### Core Features
- **管理后台系统**: 综合性后台管理面板，包含安全的登录认证机制。
  - **Authentication**: 独立的管理员登录界面。
  - **新导航架构**: 采用顶部+左侧双层导航体系，一级菜单在顶部，二级菜单在左侧。
  - **15个管理模块**: 涵盖运营报表、用户管理、IM管理、社交管理、法币管理、担保管理、U卡管理、现货管理、合约管理、跟单管理、理财管理、佣金管理、BePay管理、财务管理、系统管理。
  - **访问控制**: 登录后才能访问管理功能，支持邮箱验证码。
  - **会话管理**: 持久的管理员认证状态。
- **UI/UX Decisions**:
  - **全新导航架构**: 顶部导航栏显示15个一级模块菜单，左侧边栏动态显示当前选中模块的二级子菜单。
  - **响应式导航系统**: 桌面端（≥768px）为横向滚动菜单，移动端（<768px）为汉堡菜单侧边Sheet弹窗。
  - 动态亮色/暗色主题切换，持久化用户偏好。
  - 统一的品牌设计（BeDAO）和标准化配色方案（绿色、黑色、深蓝色、白色）。
  - 登录页面独立布局。
- **System Design Choices**:
  - 客户端路由系统：使用 `instant-navigation` 组件处理所有页面导航，避免页面重载。
  - 自定义路由机制：使用 `window.history.pushState` 和 `popstate` 事件实现即时页面切换。
  - 状态管理：使用 React Context API（ThemeProvider、AdminProvider）管理全局状态。
  - 安全的会话处理和路由保护（未登录时自动跳转登录页）。
  - 自动扩展部署配置，支持 Next.js 服务器功能和独立输出。
  - **双层导航架构**: 采用顶部一级菜单 + 左侧二级菜单的设计。

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