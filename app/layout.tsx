import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "../styles/globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { AdminProvider } from "@/contexts/admin-context"

export const metadata: Metadata = {
  title: "BeDAO - 管理后台系统", 
  description: "BeDAO 加密货币交易平台管理后台 - 综合管理系统",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="font-apple">
        <ThemeProvider>
          <AdminProvider>
            {children}
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
