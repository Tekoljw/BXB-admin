"use client"

import { useState, useEffect } from "react"
import Web3Loading from "./web3-loading"

interface AppLoaderProps {
  children: React.ReactNode
}

export default function AppLoader({ children }: AppLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // Check if this is the first load of the session
    const hasLoaded = sessionStorage.getItem('app-loaded')
    
    if (hasLoaded) {
      setIsLoading(false)
      setIsFirstLoad(false)
    } else {
      // Show loading for first time visitors
      setIsFirstLoad(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    sessionStorage.setItem('app-loaded', 'true')
  }

  // If not first load or loading is complete, show the app immediately
  if (!isFirstLoad || !isLoading) {
    return <>{children}</>
  }

  return <Web3Loading onComplete={handleLoadingComplete} />
}