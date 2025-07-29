#!/bin/bash

# 正式服部署修复脚本
echo "🔧 修复正式服部署问题..."

# 清理所有构建缓存
echo "🧹 清理构建缓存..."
rm -rf .next
rm -rf out
rm -rf static
rm -rf node_modules/.cache

# 安装依赖
echo "📦 重新安装依赖..."
npm install

# 尝试构建（禁用优化）
echo "🏗️ 执行简化构建..."
export NODE_ENV=production
export DEPLOYMENT_TYPE=autoscale
npm run build

# 检查构建结果
if [ -d ".next" ]; then
    echo "✅ 构建成功！"
    echo "📁 输出目录: .next/"
    
    # 检查关键文件
    if [ -f ".next/standalone/server.js" ]; then
        echo "✅ 服务器文件已生成"
    fi
    
    if [ -d ".next/static" ]; then
        echo "✅ 静态资源已生成"
    fi
    
    echo ""
    echo "🚀 部署建议："
    echo "1. 确保 replit.toml 配置为 autoscale"
    echo "2. 点击 Replit 的 Deploy 按钮"
    echo "3. 部署应该会成功"
    
else
    echo "❌ 构建失败"
    echo "尝试静态构建作为后备方案..."
    
    export DEPLOYMENT_TYPE=static
    npm run build
    
    if [ -d "out" ]; then
        echo "✅ 静态构建成功！"
        echo "📁 输出目录: out/"
        echo ""
        echo "请将 replit.toml 中的 deploymentTarget 改为 'static'"
    else
        echo "❌ 所有构建方式都失败"
    fi
fi