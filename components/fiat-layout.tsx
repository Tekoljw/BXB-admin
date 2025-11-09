"use client"

import React, { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FiatLayoutProps {
  children: React.ReactNode
}

interface Currency {
  id: string
  code: string
  name: string
  exchangeRate?: {
    buyPrice: number
    sellPrice: number
    config: {
      source: "exchange" | "manual"
      manualConfig?: {
        expiresAt?: string
      }
    }
  }
}

export default function FiatLayout({ children }: FiatLayoutProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [expiringCurrencies, setExpiringCurrencies] = useState<Currency[]>([])

  useEffect(() => {
    const initializeDefaultData = () => {
      const existingData = localStorage.getItem("fiat_currencies")
      if (!existingData) {
        const defaultCurrencies: Currency[] = [
          {
            id: "CUR002",
            code: "USD",
            name: "美元",
            exchangeRate: {
              buyPrice: 1.0000,
              sellPrice: 1.0000,
              config: {
                source: "manual",
                manualConfig: {
                  expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString()
                }
              }
            }
          }
        ]
        localStorage.setItem("fiat_currencies", JSON.stringify(defaultCurrencies))
      }
    }

    const checkExpiry = () => {
      try {
        initializeDefaultData()
        
        const currenciesData = localStorage.getItem("fiat_currencies")
        if (!currenciesData) return

        const currencies: Currency[] = JSON.parse(currenciesData)
        const now = new Date().getTime()
        const oneHour = 60 * 60 * 1000

        const expiring = currencies.filter(currency => {
          if (!currency.exchangeRate || currency.exchangeRate.config.source !== "manual") {
            return false
          }
          
          const config = currency.exchangeRate.config.manualConfig
          if (!config?.expiresAt) return false
          
          const expiresAt = new Date(config.expiresAt).getTime()
          const timeLeft = expiresAt - now
          
          return timeLeft <= oneHour
        })

        setExpiringCurrencies(expiring)

        const dismissKey = `fiat_alert_dismissed_${expiring.map(c => c.id).join("_")}`
        const isDismissed = sessionStorage.getItem(dismissKey)
        
        setShowAlert(expiring.length > 0 && !isDismissed)
      } catch (error) {
        console.error("Error checking currency expiry:", error)
      }
    }

    checkExpiry()
    const interval = setInterval(checkExpiry, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    const dismissKey = `fiat_alert_dismissed_${expiringCurrencies.map(c => c.id).join("_")}`
    sessionStorage.setItem(dismissKey, "true")
    setShowAlert(false)
  }

  return (
    <div className="flex flex-col h-full">
      {showAlert && expiringCurrencies.length > 0 && (
        <div className="bg-red-600 dark:bg-red-700 text-white px-6 py-3 flex items-center justify-between border-b-2 border-red-700 dark:border-red-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">
                汇率失效警告：
                {expiringCurrencies.length === 1 ? (
                  <>币种 <span className="font-bold">{expiringCurrencies[0].name}</span> 的手动汇率{
                    new Date(expiringCurrencies[0].exchangeRate!.config.manualConfig!.expiresAt!).getTime() <= Date.now()
                      ? "已失效"
                      : "即将失效"
                  }，请及时更新！</>
                ) : (
                  <>有 <span className="font-bold">{expiringCurrencies.length}</span> 个币种的手动汇率即将失效或已失效（
                  {expiringCurrencies.map(c => c.name).join("、")}
                  ），请及时更新！</>
                )}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-red-700 dark:hover:bg-red-800 hover:text-white h-8 w-8 p-0 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
