# BeDAO 管理后台系统

## Overview
BeDAO 管理后台是一个基于 Next.js 15 和 React 构建的专业加密货币交易平台后台管理系统。其核心目的是为平台运营人员提供全面的管理功能，包括用户管理、交易监控、财务管理和系统配置，以确保加密货币交易平台的顺畅运行和资产安全。该系统专注于后台管理功能，不包含任何面向用户的客户端功能。

## User Preferences
Preferred communication style: Simple, everyday Chinese language.

## System Architecture

### UI/UX Decisions
- **导航架构**: 采用顶部导航栏（16个一级模块菜单）与左侧边栏（动态二级子菜单）的双层导航体系。
- **响应式设计**: 支持桌面端横向滚动菜单和移动端汉堡菜单侧边Sheet弹窗。
- **主题**: 支持动态亮色/暗色主题切换，并持久化用户偏好。
- **品牌与配色**: 统一的BeDAO品牌设计，采用绿色、黑色、深蓝色、白色作为标准化配色方案。
- **登录页面**: 独立的登录页面布局。
- **功能优化**:
    - **通道管理**: 提供通道配置和费率管理，支持两级页签筛选、右侧滑出弹窗进行添加/编辑、Inline编辑通道名称、外显名称及费率数据，并支持状态快速开关。
    - **接口管理**: 采用紧凑卡片设计展示支付接口，支持Inline编辑接口名称和描述、状态快速开关、停用视觉反馈，以及通过右侧滑出面板进行供应商配置。
    - **代理商管理**: 重构佣金管理为代理商管理，提供启用/冻结开关、佣金比例查看等。
    - **商户管理**: 提供多种筛选、账户余额详情、密钥管理、域名审核及精细化费率配置。
    - **订单管理**: 涵盖代收、代付、兑换订单管理，支持信息查看、补发通知、冻结/退款等操作。
    - **Crypto模块**: 包含币种管理（支持两级页签筛选：一级按分类筛选全部/稳定币/主流币/MEME币，二级按网络类型动态筛选）、托管钱包接口、地址管理、法币买卖接口（支持两级页签筛选：一级按状态筛选全部/已启用/已停用，二级按地区筛选全部/亚洲/非洲/美洲/欧洲/其他）、Crypto入金/提币订单的详细管理功能，支持卡片式展示、状态开关、权重分配、链式过滤逻辑（搜索→分类→子分类）及订单统计。币种管理提供Inline编辑功能（logo上传、最小提现、提现手续费、排序）和右侧滑出Sheet添加新币种。
    - **U卡管理**: 包含U卡用户、供应商、基础配置、号段、开卡/充值/消费记录、用户资产变化及列表等全面管理功能，支持表格/卡片式布局、状态管理、筛选、搜索及配置。
    - **C2C模块**: 包含C2C管理、C2C订单、法币快捷配置、法币快捷订单、OTC配置、OTC订单等子页面。

### Technical Implementations
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui, React Context API for state management, Recharts, Lucide React, internationalization.
- **Backend**: Express.js with session management.
- **Database**: PostgreSQL with Drizzle ORM.
- **Authentication**: Replit Auth (OpenID Connect), independent admin login with email verification, PostgreSQL-backed session store.
- **Core Features**:
    - 综合性后台管理面板，包含16个管理模块。
    - 登录后访问控制和管理员认证状态持久化。
    - 客户端路由使用 `instant-navigation` 实现即时页面切换和加载动画。

### System Design Choices
- **客户端路由**: 采用 `instant-navigation` 组件和 `window.history.pushState`/`popstate` 实现即时页面切换，避免页面重载。
- **加载动画**: 页面切换时显示旋转加载器和“加载中...”文字。
- **状态管理**: 使用 React Context API 管理全局状态。
- **安全性**: 安全的会话处理和路由保护，未登录时自动跳转登录页。
- **部署**: 支持Next.js服务器功能和独立输出的自动扩展部署配置。
- **多级页签过滤系统**: 
  - **两级页签系统**（币种管理、法币买卖接口等）:
    - 采用嵌套shadcn Tabs组件实现两级筛选
    - 使用链式useMemo过滤（搜索→一级分类→二级分类）
    - 一级页签切换时自动重置二级页签选择
    - 二级页签选项根据一级分类动态生成（出入金币种）或固定预设（法币币种）
    - 数据模型扩展：Crypto币种添加category字段（stablecoin/mainstream/meme），法币币种添加region字段（asia/africa/americas/europe/other）
  - **三级页签系统**（OTC订单）:
    - **一级页签**：位于页面标题行右侧（买入/卖出/全部）
    - **二级页签**：位于搜索区域上方（供应商筛选，根据一级页签动态生成）
    - **三级页签**：位于搜索框同一行左侧（状态筛选）
    - **搜索和筛选行布局**：状态页签 + 搜索框（flex-1） + 币种下拉筛选（固定宽度）
    - 使用四级链式useMemo过滤（搜索+币种 → 类型 → 供应商 → 状态）
    - 级联重置：切换一级页签时自动重置二级页签为"全部"
    - 动态供应商列表：基于一级页签筛选结果生成可用供应商选项
  - 添加/编辑对话框包含完整字段选择确保TypeScript类型完整

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