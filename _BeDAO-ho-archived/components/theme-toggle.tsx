"use client"

import { useTheme } from "@/contexts/theme-context"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group transition-transform duration-200 hover:scale-110 active:scale-95"
      aria-label={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
      title={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 md:h-6 md:w-6 text-white transition-colors duration-200" />
      ) : (
        <Moon className="h-5 w-5 md:h-6 md:w-6 text-white transition-colors duration-200" />
      )}
    </button>
  )
}
