"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface MaintenanceContextType {
  maintenanceModules: Set<string>
  isModuleUnderMaintenance: (moduleId: string) => boolean
  setModuleMaintenance: (moduleId: string, isMaintenance: boolean) => void
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined)

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [maintenanceModules, setMaintenanceModules] = useState<Set<string>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem('maintenanceModules')
    if (stored) {
      try {
        const modules = JSON.parse(stored)
        setMaintenanceModules(new Set(modules))
      } catch (e) {
        console.error('Failed to parse maintenance modules:', e)
      }
    }
  }, [])

  const isModuleUnderMaintenance = (moduleId: string): boolean => {
    return maintenanceModules.has(moduleId)
  }

  const setModuleMaintenance = (moduleId: string, isMaintenance: boolean) => {
    setMaintenanceModules(prev => {
      const newSet = new Set(prev)
      if (isMaintenance) {
        newSet.add(moduleId)
      } else {
        newSet.delete(moduleId)
      }
      localStorage.setItem('maintenanceModules', JSON.stringify([...newSet]))
      return newSet
    })
  }

  return (
    <MaintenanceContext.Provider value={{
      maintenanceModules,
      isModuleUnderMaintenance,
      setModuleMaintenance
    }}>
      {children}
    </MaintenanceContext.Provider>
  )
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext)
  if (context === undefined) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider')
  }
  return context
}
