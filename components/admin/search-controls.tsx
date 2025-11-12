import * as React from "react"
import { Search, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchControlsProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  onReset?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  loading?: boolean
  className?: string
  showReset?: boolean
}

export function SearchControls({
  placeholder = "搜索...",
  value,
  onChange,
  onSearch,
  onReset,
  onKeyDown,
  loading = false,
  className = "",
  showReset = true,
}: SearchControlsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch()
            }
            onKeyDown?.(e)
          }}
          className="pl-10"
          disabled={loading}
        />
      </div>
      <Button
        onClick={onSearch}
        className="bg-custom-green hover:bg-custom-green/90 text-white"
        disabled={loading}
      >
        <Search className="w-4 h-4 mr-1" />
        搜索
      </Button>
      {showReset && onReset && (
        <Button
          onClick={onReset}
          variant="outline"
          disabled={loading}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          重置
        </Button>
      )}
    </div>
  )
}
