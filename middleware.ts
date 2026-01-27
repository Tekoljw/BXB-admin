import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 登录页面和公开页面允许访问
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }
  
  // 检查admin路由的登录状态
  if (pathname.startsWith('/admin/') && pathname !== '/admin/login') {
    // 检查cookie中的登录标记（Next.js middleware只能访问cookie，不能访问localStorage）
    // 实际token存储在localStorage中，这里只做基本检查
    // 详细的token验证会在客户端进行
    const isLoggedInCookie = request.cookies.get('isAdminLoggedIn')?.value
    
    // 如果没有登录标记cookie，重定向到登录页
    // 注意：由于middleware无法访问localStorage，这里只做基本检查
    // 真正的token验证会在客户端组件中进行
    if (!isLoggedInCookie) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
