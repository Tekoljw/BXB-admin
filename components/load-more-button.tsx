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
}

export function LoadMoreButton({
  onLoadMore,
  disabled = false,
  label = "加载更多",
  loadingLabel = "加载中...",
  className = "",
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
    <div className={`p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center ${className}`}>
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
  )
}
