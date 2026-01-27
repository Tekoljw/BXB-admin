// 菜单API服务

interface MenuOption {
  code: string
  name: string
  showWeights: number
  verification: boolean
  method: string
  url: string
  children: null
  options: null
}

interface MenuItem {
  code: string
  name: string
  showWeights: number
  verification: boolean
  method: string
  url: string
  children: MenuItem[] | null
  options: MenuOption[] | null
}

interface MenuResponse {
  code: number
  msg: string
  data: MenuItem[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://mgmt.ubtai.biz'

async function fetchMenu(): Promise<MenuItem[]> {
  try {
    // 获取accessToken
    let accessToken = ''
    if (typeof window !== 'undefined') {
      // 尝试从localStorage获取（带admin.前缀）
      const adminToken = localStorage.getItem('admin.accessToken')
      if (adminToken) {
        try {
          const parsed = JSON.parse(adminToken)
          accessToken = parsed.value || ''
        } catch {
          accessToken = adminToken
        }
      }
      
      // 如果还没有，尝试从sessionStorage获取
      if (!accessToken) {
        accessToken = sessionStorage.getItem('accessToken') || ''
      }
    }

    // 开发环境使用代理
    const baseURL = typeof window !== 'undefined' && 
                   (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                   ? '/api/proxy'
                   : API_BASE_URL

    const response = await fetch(`${baseURL}/v1/admin/admin/profile/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Token': accessToken,
        'Sys-Code': 'management', // 根据API文档，需要Sys-Code header
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }

    const result: MenuResponse = await response.json()

    if (result.code !== 0) {
      throw new Error(result.msg || '获取菜单失败')
    }

    return result.data || []
  } catch (error) {
    console.error('Failed to fetch menu:', error)
    return []
  }
}

export { fetchMenu, type MenuItem, type MenuOption }
