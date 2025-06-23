"use client"

import { useState } from "react"
import { Wallet, ArrowDownLeft, ArrowUpRight, RefreshCw, Download } from "lucide-react"
import WalletBalance from "@/components/wallet/wallet-balance"
import AssetDistribution from "@/components/wallet/asset-distribution"
import TransactionHistory from "@/components/wallet/transaction-history"
import QuickActions from "@/components/wallet/quick-actions"
import RecentActivity from "@/components/wallet/recent-activity"

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "deposit" | "withdraw" | "transfer">("overview")

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-custom-green-50 rounded-full p-2 mr-3">
            <Wallet className="h-6 w-6 text-custom-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your digital assets</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("deposit")}
            className="flex items-center px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green-dark transition-colors"
          >
            <ArrowDownLeft className="h-4 w-4 mr-2" />
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Withdraw
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WalletBalance />
            <QuickActions />
            <TransactionHistory />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <AssetDistribution />
            <RecentActivity />
          </div>
        </div>
      )}

      {activeTab === "deposit" && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Deposit Funds</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Choose your preferred method to add funds to your wallet
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-custom-green cursor-pointer">
                <h3 className="font-medium mb-2">Bank Transfer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Transfer funds directly from your bank account</p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-custom-green cursor-pointer">
                <h3 className="font-medium mb-2">Credit/Debit Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Instant deposit using your card</p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-custom-green cursor-pointer">
                <h3 className="font-medium mb-2">Cryptocurrency</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Deposit crypto from external wallet</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "withdraw" && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Withdraw Funds</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Withdraw your funds to external accounts or wallets
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-custom-green cursor-pointer">
                <h3 className="font-medium mb-2">Bank Account</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Withdraw to your linked bank account</p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-custom-green cursor-pointer">
                <h3 className="font-medium mb-2">Cryptocurrency Wallet</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Send crypto to external wallet address</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}