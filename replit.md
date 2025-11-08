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
    - **通道管理**: 支付通道管理页面，提供完整的通道配置和费率管理功能
      - **编辑弹窗交易量配置**: 在添加/编辑通道弹窗中，三个档位的最小金额和最大金额都可以输入编辑，最大金额留空表示无上限
      - **LOGO显示**: 每个支付通道显示品牌LOGO图标（支持emoji、图片链接、自动回退到文字）
      - **通道名称Inline编辑**: 在表格中直接点击通道名称进行编辑，支持Enter保存、Escape取消，提供保存/取消按钮，实时更新无需刷新
      - **外显名称Inline编辑**: 在表格中直接点击外显名称进行编辑，支持Enter保存、Escape取消，提供保存/取消按钮，实时更新无需刷新
      - **三档阶梯费率**: 根据交易金额范围自动匹配不同档位的手续费率（第1档：0-10,000；第2档：10,000-100,000；第3档：100,000+）
      - **费率直接显示**: 三档费率以内嵌表格形式直接显示在列表中，包含流水、代收费率、代收单笔、代付费率、代付单笔五列，一目了然无需弹窗查看
      - **费率Inline编辑**: 所有流水范围和费率数据（包括代收费率、代收单笔、代付费率、代付单笔）都可以直接在列表中点击编辑，支持Enter保存、Escape取消，提供保存/取消按钮，实时更新无需刷新
      - **深拷贝数据管理**: 编辑表单采用深拷贝机制，确保数据隔离和取消编辑时数据正确回滚
      - **状态快速开关**: 状态列旁边提供Switch开关按钮，可一键启用/禁用通道，实时生效
    - **接口管理**: 支付接口管理页面，提供完整的接口查看和供应商配置功能
      - **紧凑卡片设计**: 卡片宽度缩小，一行显示更多接口（响应式：移动端1列、平板3列、桌面4列、宽屏6列），padding减小，布局更紧凑
      - **接口名称Inline编辑**: 在卡片上直接点击接口名称进行编辑，支持Enter保存、Escape取消，提供保存/取消按钮
      - **描述Inline编辑**: 在卡片上直接点击描述文字进行编辑，支持Enter保存、Escape取消，提供保存/取消按钮
      - **状态快速开关**: 接口卡片右上角提供Switch开关按钮和状态标签（启用/停用），可一键切换，实时生效
      - **停用状态视觉反馈**: 关闭开关后，整个卡片显示为灰色背景，并标注"停用"标签，清晰区分启用和停用状态
      - **可点击查看详情**: 点击支付通道或支付币种数字，弹出详情窗口显示完整的支持币种列表和支付通道列表
      - **供应商配置**: 每个接口卡片上提供配置按钮，点击后从右侧滑出配置面板（Sheet组件）
      - **卡片展开式配置**: 配置输入直接在每个供应商卡片下方展开显示，无需滚动到底部，优化多供应商场景下的操作体验
      - **页签式配置**: 使用Tabs页签模式切换通用格式和自定义代码，操作更直观
      - **通用格式参数**: 包含上游接口商户ID、hostApi、API密钥三个字段
      - **自定义代码格式**: 支持JSON或其他自定义配置代码的多行输入
      - **安全提示**: 在配置弹窗中明确说明密钥应该使用后端安全存储，当前仅为演示功能
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
    - 法币管理模块包含支付方式、C2C管理、C2C订单、法币快捷配置、法币快捷订单、OTC配置、OTC订单7个子页面，支付方式页面功能与BePay通道管理完全相同（独立代码，不共用）。

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