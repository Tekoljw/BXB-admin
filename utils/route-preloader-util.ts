"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { userRoutes, adminRoutes } from "../router/route-paths"

// Pre-warm all routes to avoid compilation delays
export const useRoutePreloader = () => {
  const router = useRouter()

  useEffect(() => {
    // Pre-load all main routes
    const routes = [...userRoutes, ...adminRoutes]

    // Prefetch routes in the background
    routes.forEach(route => {
      router.prefetch(route)
    })
  }, [router])
}

// Instant navigation function
export const instantNavigate = (router: any, path: string) => {
  // Use replace for instant navigation without adding to history
  router.replace(path)
}
