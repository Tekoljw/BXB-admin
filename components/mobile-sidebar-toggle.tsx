"use client"
import { Menu, X } from "lucide-react"
import { useCallback } from "react"

interface MobileSidebarToggleProps {
  onToggle: (isOpen: boolean) => void
  isOpen: boolean
}

export default function MobileSidebarToggle({ onToggle, isOpen }: MobileSidebarToggleProps) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // 直接操作 DOM，绕过 React 渲染
    const sidebar = document.getElementById('mobile-sidebar')
    const overlay = document.getElementById('sidebar-overlay')
    
    if (sidebar && overlay) {
      const newState = !isOpen
      
      if (newState) {
        // 打开侧边栏
        sidebar.classList.remove('sidebar-closed')
        sidebar.classList.add('sidebar-open')
        overlay.classList.remove('opacity-0', 'pointer-events-none')
        overlay.classList.add('opacity-50', 'pointer-events-auto')
      } else {
        // 关闭侧边栏
        sidebar.classList.remove('sidebar-open')
        sidebar.classList.add('sidebar-closed')
        overlay.classList.remove('opacity-50', 'pointer-events-auto')
        overlay.classList.add('opacity-0', 'pointer-events-none')
      }
      
      // 延迟调用 React 状态更新，避免阻塞动画
      setTimeout(() => onToggle(newState), 0)
    }
  }, [onToggle, isOpen])

  return (
    <button
      className="md:hidden p-2 rounded-md will-change-transform"
      onClick={handleClick}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
    </button>
  )
}
