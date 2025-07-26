import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "../styles/globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { ChatProvider } from "@/contexts/chat-context"

export const metadata: Metadata = {
  title: "BXB - Global Cryptocurrency Guaranteed Trading Exchange", 
  description: "BXB Global Cryptocurrency Guaranteed Trading Exchange - Advanced crypto trading platform with comprehensive guarantee account system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className="font-apple overflow-x-hidden" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
        <ThemeProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
