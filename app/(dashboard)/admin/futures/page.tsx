"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FuturesLayout from "@/components/futures-layout"
import FuturesConfigLayout from "@/components/futures-config-layout"

// 导入所有子页面组件
import SectorsPage from "./config/sectors/page"
import IndexPricePage from "./config/index-price/page"
import IndexSourcePage from "./config/index-source/page"
import SpecialMarkPricePage from "./config/special-mark-price/page"
import ProductPage from "./config/product/page"
import PredictGroupPage from "./config/predict-group/page"
import TransferCoinsPage from "./config/transfer-coins/page"
import MarkPricePage from "./config/mark-price/page"
import I18nPage from "./config/i18n/page"
import KlinePage from "./config/kline/page"
import SharePage from "./config/share/page"

export default function FuturesManagementPage() {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    
    // 如果访问的是根路径，重定向到板块管理
    if (window.location.pathname === "/admin/futures") {
      router.replace("/admin/futures/config/sectors")
    }
  }, [router])

  // 渲染对应的子页面
  const renderSubPage = () => {
    // 合约配置子页面
    if (currentPath === "/admin/futures/config/sectors") {
      return (
        <FuturesConfigLayout>
          <SectorsPage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/index-price") {
      return (
        <FuturesConfigLayout>
          <IndexPricePage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/index-source") {
      return (
        <FuturesConfigLayout>
          <IndexSourcePage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/special-mark-price") {
      return (
        <FuturesConfigLayout>
          <SpecialMarkPricePage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/product") {
      return (
        <FuturesConfigLayout>
          <ProductPage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/predict-group") {
      return (
        <FuturesConfigLayout>
          <PredictGroupPage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/transfer-coins") {
      return (
        <FuturesConfigLayout>
          <TransferCoinsPage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/mark-price") {
      return (
        <FuturesConfigLayout>
          <MarkPricePage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/i18n") {
      return (
        <FuturesConfigLayout>
          <I18nPage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/kline") {
      return (
        <FuturesConfigLayout>
          <KlinePage />
        </FuturesConfigLayout>
      )
    }
    if (currentPath === "/admin/futures/config/share") {
      return (
        <FuturesConfigLayout>
          <SharePage />
        </FuturesConfigLayout>
      )
    }

    // 其他二级目录的占位页面
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">合约管理</h1>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-center py-12">
              当前路径: {currentPath}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <FuturesLayout>
      {renderSubPage()}
    </FuturesLayout>
  )
}
