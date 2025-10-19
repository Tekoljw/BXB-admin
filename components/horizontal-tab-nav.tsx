"use client"

import React, { useRef, useState, useEffect } from "react"
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react"

export interface TabNavItem {
  path: string
  icon: LucideIcon
  label: string
}

interface HorizontalTabNavProps {
  items: TabNavItem[]
  currentPath: string
  onNavigate: (path: string) => void
}

export default function HorizontalTabNav({
  items,
  currentPath,
  onNavigate,
}: HorizontalTabNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const isActive = (path: string) => currentPath === path

  const checkArrows = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    )
  }

  useEffect(() => {
    checkArrows()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkArrows)
      return () => container.removeEventListener("scroll", checkArrows)
    }
  }, [items])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    setIsDragging(true)
    setStartX(e.pageX - container.offsetLeft)
    setScrollLeft(container.scrollLeft)
    container.style.cursor = "grabbing"
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const container = scrollContainerRef.current
    if (!container) return

    const x = e.pageX - container.offsetLeft
    const walk = (x - startX) * 2
    container.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    const container = scrollContainerRef.current
    if (container) {
      container.style.cursor = "grab"
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      const container = scrollContainerRef.current
      if (container) {
        container.style.cursor = "grab"
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 relative">
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-1 overflow-x-auto scrollbar-thin pb-2"
          style={{ cursor: "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  active
                    ? "bg-custom-green text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>

        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute right-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-1.5 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
            aria-label="向左滚动"
          >
            <ChevronLeft size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-1.5 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
            aria-label="向右滚动"
          >
            <ChevronRight size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>
    </div>
  )
}
