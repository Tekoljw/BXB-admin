# BeDAO 管理后台系统

## Overview
BeDAO 管理后台是一个基于 Next.js 15 和 React 构建的专业加密货币交易平台后台管理系统。其核心目的是为平台运营人员提供全面的管理功能，包括用户管理、交易监控、财务管理和系统配置，以确保加密货币交易平台的顺畅运行和资产安全。该系统专注于后台管理功能，不包含任何面向用户的客户端功能。

## User Preferences
Preferred communication style: Simple, everyday Chinese language.

## System Architecture

### UI/UX Decisions
- **导航架构**: 采用顶部导航栏（18个一级模块菜单）与左侧边栏（动态二级子菜单）的双层导航体系。
- **主题与品牌**: 支持动态亮色/暗色主题切换，并持久化用户偏好；统一的BeDAO品牌设计，采用绿色、黑色、深蓝色、白色作为标准化配色方案。
- **登录页面**: 独立的登录页面布局，提供账号密码登录、邮箱验证码验证，支持首次登录绑定谷歌验证码。
- **个人中心**: 登录后默认进入个人中心页面，提供个人信息展示、登录记录、安全设置等功能。
- **模块设计**: 审核和运营模块采用两级可折叠菜单分类结构。
- **功能优化**:
    - **通道管理**: 提供通道配置和费率管理，支持两级页签筛选、右侧滑出弹窗编辑、Inline编辑、状态快速开关。
    - **接口管理**: 采用紧凑卡片设计，支持Inline编辑、状态快速开关、供应商配置。
    - **代理商管理**: 重构佣金管理为代理商管理，提供启用/冻结开关、佣金比例查看。
    - **法币用户管理**: 提供筛选、账户余额详情、密钥管理、域名审核及精细化费率配置。
    - **订单管理**: 涵盖代收、代付、兑换订单管理，支持信息查看、补发通知、冻结/退款。
    - **Crypto模块**: 包含经营报表、币种管理、地址管理、供应商接口、Crypto出入金订单、Crypto用户管理、OTC供应商、OTC订单等子模块。Crypto用户管理完整复刻法币用户管理页面结构，包含多币种余额、利润分析、交易量分析、费率配置、API密钥审批等功能。
    - **权限管理模块**: 包含业务线、审核配置、人员管理、用户权限、系统管理、系统日志、手动开分（支持为用户充值或扣减资金，路径：`/admin/permissions/manual-credit`）、手动转账（支持用户间资金转移，路径：`/admin/permissions/manual-transfer`）、大额提币审核（支持大额提币订单的审核与拒绝，路径：`/admin/permissions/large-withdrawal-audit`）等共9个子页面。
    - **财务模块（orders）**: 包含财务经营报表（路径：`/admin/orders/business-overview`，展示各业务模块收入、成本、利润汇总）、Crypto资产管理（路径：`/admin/orders/crypto-assets`）、法币资产管理（路径：`/admin/orders/fiat-assets`）和U卡资产管理（路径：`/admin/orders/ucard-assets`，展示U卡总资产、供应商资产分布、卡片统计）四个子页面。点击顶部财务按钮默认打开财务经营报表。
    - **U卡管理**: 包含用户、供应商、基础配置、号段、开卡记录、U卡划转兑换（路径：`/admin/ucard/recharge-records`）、消费记录等功能。注：U卡账户划转记录已删除。
    - **C2C模块**: 包含C2C管理、C2C订单、法币快捷配置、法币快捷订单、OTC配置、OTC订单等子页面。
    - **法币模块**: 包含经营报表、法币用户管理、币种管理、供应商管理、接口管理、通道管理、代理商管理、代收订单、代付订单、兑换订单等子模块。
    - **佣金模块**: 包含支付佣金和U卡佣金，采用推广员排行榜设计，支持多维度排名和法币币种筛选。

### Technical Implementations
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui, React Context API, Recharts, Lucide React, internationalization。
- **Backend**: Express.js with session management。
- **Database**: PostgreSQL with Drizzle ORM。
- **Authentication**: Replit Auth (OpenID Connect), independent admin login with email verification, PostgreSQL-backed session store。
- **Core Features**: 综合性后台管理面板，包含16个管理模块；登录后访问控制和管理员认证状态持久化；客户端路由使用 `instant-navigation` 实现即时页面切换和加载动画。

### System Design Choices
- **客户端路由**: 采用 `instant-navigation` 实现即时页面切换，避免页面重载。
- **状态管理**: 使用 React Context API 管理全局状态。
- **安全性**: 安全的会话处理和路由保护，未登录时自动跳转登录页。
- **多级页签过滤系统**: 实现两级、三级、四级页签系统，支持链式过滤、级联重置和动态选项生成。

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