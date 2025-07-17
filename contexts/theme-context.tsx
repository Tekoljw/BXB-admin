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
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Load saved preferences from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    const savedTheme = localStorage.getItem('theme') as Theme
    
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return
    
    // Save language preference
    localStorage.setItem('language', language)
  }, [language, mounted])

  const value = {
    language,
    setLanguage,
    theme,
    setTheme,
    isDark: theme === "dark",
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
