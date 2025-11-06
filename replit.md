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
- **BePay管理模块**: 包含9个子页面
  - **币种管理**: 管理支持的法币币种
  - **供应商管理**: 管理支付供应商
  - **接口管理**: 管理支付接口
  - **通道管理**: 管理支付通道
  - **商户管理**: 管理商户信息
  - **代理商管理**: 管理代理商及佣金比例
  - **代收订单**: 管理代收订单，包含补发/校验/冻结/退款功能
  - **代付订单**: 展示代付订单，支持币种/通道/状态筛选
  - **兑换订单**: 展示货币兑换订单，支持源/目标币种及状态筛选
- **UI/UX Decisions**:
  - **全新导航架构**: 顶部导航栏显示15个一级模块菜单，左侧边栏动态显示当前选中模块的二级子菜单。
  - **响应式导航系统**: 桌面端（≥768px）为横向滚动菜单，移动端（<768px）为汉堡菜单侧边Sheet弹窗。
  - 动态亮色/暗色主题切换，持久化用户偏好。
  - 统一的品牌设计（BeDAO）和标准化配色方案（绿色、黑色、深蓝色、白色）。
  - 登录页面独立布局。
  - **页面优化（BePay管理模块）**: 
    - 表格布局优化：通道管理(10→7列)、商户管理(9→6列)、代理商管理(9→5列)、订单管理(12→7列)，采用垂直堆叠设计合并相关信息
    - 删除顶部统计卡片：移除4个页面（通道/商户/代理商/订单管理）的顶部KPI卡片，让页面更简洁专注于核心功能
    - 统一页面结构：移除4个页面的外层白色背景容器，标题、筛选、搜索直接展示，仅表格部分使用白色卡片，与其他页面风格保持一致
    - 统一间距规范：所有BePay模块页面外层容器统一使用 `p-6 space-y-6`（24px padding + 24px垂直间距），确保与币种管理、接口管理等页面的视觉一致性
  - **代理商管理功能**：
    - 将原"佣金管理"重构为"代理商管理"，提供更全面的代理商管理功能
    - 展示代理商基本信息（ID、名称、邮箱、电话、佣金数据、商户数量、状态）
    - "佣金比例"功能：点击查看该代理商在各支付通道的佣金比例设置（通道ID、通道名称、支付方式、佣金比例%、更新时间）
    - "详情"功能：查看代理商的佣金详细记录（记录ID、订单号、商户ID、订单金额、佣金比例、佣金金额、创建时间、状态）
    - 支持按代理商名称、邮箱、电话、ID进行搜索过滤
  - **订单管理页面**：
    - **代收订单**：原"订单管理"重命名，包含完整管理功能
      - 补发通知：只有成功订单可用，其他状态按钮灰色禁用
      - 重新校验：只有失败订单可用，其他状态按钮灰色禁用
      - 冻结订单：只有成功订单可用，其他状态按钮灰色禁用
      - 订单退款：只有成功订单可用，其他状态按钮灰色禁用
      - 禁用状态视觉反馈：50%透明度 + 禁止光标样式
    - **代付订单**：包含完整管理功能，与代收订单样式完全一致
      - 补发通知、重新校验、冻结订单、订单退款功能
      - 币种/支付通道筛选，支持订单搜索
      - 按钮状态控制逻辑与代收订单相同
    - **兑换订单**：展示型页面，包含源币种/目标币种/状态筛选，显示兑换信息和汇率
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