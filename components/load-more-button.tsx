"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface LoadMoreButtonProps {
  onLoadMore?: () => Promise<void> | void
  disabled?: boolean
  label?: string
  loadingLabel?: string
  className?: string
  currentCount?: number
  totalCount?: number
  showTotal?: boolean
}

export function LoadMoreButton({
  onLoadMore,
  disabled = false,
  label = "加载更多",
  loadingLabel = "加载中...",
  className = "",
  currentCount,
  totalCount,
  showTotal = true,
}: LoadMoreButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      if (onLoadMore) {
        await onLoadMore()
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {showTotal && totalCount !== undefined && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentCount !== undefined ? (
              <>
                显示 <span className="font-semibold text-gray-700 dark:text-gray-300">{currentCount}</span> / 共 <span className="font-semibold text-gray-700 dark:text-gray-300">{totalCount}</span> 条
              </>
            ) : (
              <>
                共 <span className="font-semibold text-gray-700 dark:text-gray-300">{totalCount}</span> 条数据
              </>
            )}
          </div>
        )}
        
        <Button
          onClick={handleClick}
          disabled={disabled || isLoading}
          variant="outline"
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {loadingLabel}
            </>
          ) : (
            label
          )}
        </Button>
      </div>
    </div>
  )
}
