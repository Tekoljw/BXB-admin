"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "zh"
type Theme = "light" | "dark"

interface ThemeContextType {
  language: Language
  setLanguage: (language: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const value = {
    language,
    setLanguage,
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
