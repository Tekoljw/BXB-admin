"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import { 
  ShoppingBag, 
  Search, 
  Filter,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MarketplacePage() {
  const { isDark } = useTheme()
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: "全部商品", count: 1248 },
    { id: "digital", label: "数字商品", count: 456 },
    { id: "services", label: "服务类", count: 234 },
    { id: "trading", label: "交易工具", count: 123 },
    { id: "education", label: "教育课程", count: 98 },
    { id: "hardware", label: "硬件设备", count: 67 },
  ]

  const products = [
    {
      id: 1,
      name: "专业交易策略包",
      description: "包含多种市场行情下的交易策略，适合进阶交易者",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 156,
      sales: 1234,
      image: "/api/placeholder/300/200",
      seller: "交易大师",
      isHot: true,
      tags: ["策略", "进阶"]
    },
    {
      id: 2,
      name: "量化交易机器人",
      description: "自动化交易机器人，24小时监控市场，智能下单",
      price: 1999,
      originalPrice: 2999,
      rating: 4.9,
      reviews: 89,
      sales: 456,
      image: "/api/placeholder/300/200",
      seller: "量化工作室",
      isNew: true,
      tags: ["量化", "自动化"]
    },
    {
      id: 3,
      name: "市场分析报告",
      description: "每日更新的专业市场分析报告，把握投资机会",
      price: 99,
      originalPrice: 199,
      rating: 4.7,
      reviews: 234,
      sales: 2345,
      image: "/api/placeholder/300/200",
      seller: "分析师团队",
      tags: ["分析", "报告"]
    },
    {
      id: 4,
      name: "加密货币钱包",
      description: "安全可靠的硬件钱包，保护您的数字资产",
      price: 599,
      originalPrice: 799,
      rating: 4.9,
      reviews: 345,
      sales: 789,
      image: "/api/placeholder/300/200",
      seller: "安全科技",
      tags: ["硬件", "安全"]
    },
    {
      id: 5,
      name: "交易心理学课程",
      description: "专业交易心理学培训，提升交易心态和技能",
      price: 199,
      originalPrice: 299,
      rating: 4.6,
      reviews: 123,
      sales: 567,
      image: "/api/placeholder/300/200",
      seller: "教育机构",
      tags: ["教育", "心理学"]
    },
    {
      id: 6,
      name: "区块链开发工具包",
      description: "完整的区块链开发工具和SDK，快速构建DApp",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 67,
      sales: 234,
      image: "/api/placeholder/300/200",
      seller: "开发者联盟",
      isHot: true,
      tags: ["开发", "工具"]
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "digital" && product.tags.includes("策略")) ||
      (selectedCategory === "services" && product.tags.includes("教育")) ||
      (selectedCategory === "trading" && product.tags.includes("量化")) ||
      (selectedCategory === "education" && product.tags.includes("教育")) ||
      (selectedCategory === "hardware" && product.tags.includes("硬件"))
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingBag className={`h-6 w-6 ${isDark ? "text-white" : "text-gray-900"}`} />
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              商城
            </h1>
          </div>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            发现优质的交易工具、策略和服务
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`} />
              <Input
                type="text"
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${
                  isDark 
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <Button
              variant="outline"
              className={`flex items-center space-x-2 ${
                isDark 
                  ? "border-gray-700 text-white hover:bg-gray-800" 
                  : "border-gray-300 text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>筛选</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className={`rounded-xl p-4 ${
              isDark ? "bg-gray-800" : "bg-white"
            } shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                商品分类
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-[#00D4AA] text-white"
                        : isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? "bg-white/20 text-white"
                        : isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg ${
                    isDark ? "bg-gray-800" : "bg-white"
                  } shadow-sm`}
                >
                  {/* Product Image */}
                  <div className="relative">
                    <div className={`w-full h-48 ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    } flex items-center justify-center`}>
                      <Eye className={`h-8 w-8 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`} />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      {product.isHot && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          热销
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          新品
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      isDark ? "bg-gray-800/80 hover:bg-gray-700" : "bg-white/80 hover:bg-white"
                    }`}>
                      <Heart className={`h-4 w-4 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>
                        {product.name}
                      </h3>
                    </div>
                    
                    <p className={`text-sm mb-3 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {product.description}
                    </p>

                    {/* Rating and Sales */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className={`text-sm ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {product.rating}
                        </span>
                        <span className={`text-xs ${
                          isDark ? "text-gray-500" : "text-gray-500"
                        }`}>
                          ({product.reviews})
                        </span>
                      </div>
                      <span className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-500"
                      }`}>
                        已售 {product.sales}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-bold text-[#00D4AA]`}>
                          ¥{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className={`text-sm line-through ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}>
                            ¥{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#00D4AA] hover:bg-[#00B89A] text-white"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        购买
                      </Button>
                    </div>

                    {/* Seller */}
                    <div className={`text-xs mt-2 ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}>
                      卖家: {product.seller}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className={`${
                    isDark 
                      ? "border-gray-700 text-white hover:bg-gray-800" 
                      : "border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  加载更多
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className={`text-center py-12 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>没有找到相关商品</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}