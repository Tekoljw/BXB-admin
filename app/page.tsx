import { redirect } from 'next/navigation'

export default function HomePage() {
  // 服务器端重定向，避免客户端路由问题
  redirect('/wallet')
}