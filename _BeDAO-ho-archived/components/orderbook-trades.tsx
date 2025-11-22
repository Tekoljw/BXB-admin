"use client"

import type React from "react"

import { useState } from "react"
import { ArrowDown, ArrowUp, LayoutGrid } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrderbookTradesProps = {}

const OrderbookTrades: React.FC<OrderbookTradesProps> = ({}) => {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">("orderbook")
  const [layout, setLayout] = useState<"default" | "bids" | "asks">("default")
  const [precision, setPrecision] = useState<string>("0.1")

  return (
    <div className="w-full">
      {/* Tab Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex space-x-4">
          <button
            className={`text-sm font-medium ${activeTab === "orderbook" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("orderbook")}
          >
            委托信息
          </button>
          <button
            className={`text-sm font-medium ${activeTab === "trades" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("trades")}
          >
            最新成交
          </button>
        </div>

        {activeTab === "orderbook" && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-background rounded-md p-1">
              <button
                onClick={() => setLayout("default")}
                className={`p-1 rounded ${layout === "default" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setLayout("bids")}
                className={`p-1 rounded ${layout === "bids" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setLayout("asks")}
                className={`p-1 rounded ${layout === "asks" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
            <Select value={precision} onValueChange={setPrecision}>
              <SelectTrigger className="h-7 w-16 text-xs bg-background">
                <SelectValue placeholder="精度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">0.1</SelectItem>
                <SelectItem value="0.01">0.01</SelectItem>
                <SelectItem value="0.001">0.001</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === "orderbook" && <div>Orderbook Content</div>}
      {activeTab === "trades" && <div>Trades Content</div>}
    </div>
  )
}

export default OrderbookTrades
