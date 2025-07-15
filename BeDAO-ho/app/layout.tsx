import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"

export const metadata: Metadata = {
  title: "BXB - Crypto Trading Platform",
  description: "Advanced crypto trading platform with social features",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-apple">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
