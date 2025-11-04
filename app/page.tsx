"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

export default function HomePage() {
  // 直接重定向到管理登录页
  redirect("/admin/login")
}
