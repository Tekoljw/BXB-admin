"use client"

import { useContext } from 'react'
import { useTheme } from '@/contexts/theme-context'
import { getTranslation, type Language } from '@/lib/translations'

export function useTranslation() {
  const { language } = useTheme()
  
  const t = (key: string): string => {
    return getTranslation(language as Language, key)
  }
  
  return { t, language }
}