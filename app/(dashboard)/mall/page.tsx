"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingBag, 
  Star, 
  Heart,
  Filter,
  Search,
  Grid3X3,
  List,
  ShoppingCart,
  Zap
} from "lucide-react"
import { useState } from "react"

export default function MallPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    {
      id: 1,
      name: "BXB Premium 会员卡",
      price: "199.99",
      originalPrice: "299.99",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      reviews: 128,
      category: "会员服务",
      discount: 33,
      isHot: true,
      description: "专享VIP服务，优先交易权限"
    },
    {
      id: 2,
      name: "高级交易策略包",
      price: "89.99",
      originalPrice: "129.99",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      reviews: 89,
      category: "交易工具",
      discount: 31,
      isNew: true,
      description: "专业量化交易策略，提升收益率"
    },
    {
      id: 3,
      name: "实时行情分析器",
      price: "59.99",
      originalPrice: "99.99",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      reviews: 156,
      category: "分析工具",
      discount: 40,
      description: "AI驱动的市场分析，精准预测"
    },
    {
      id: 4,
      name: "专属客服服务",
      price: "29.99",
      originalPrice: "49.99",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      reviews: 203,
      category: "客户服务",
      discount: 40,
      description: "7x24小时专属客服支持"
    },
    {
      id: 5,
      name: "风险管理套件",
      price: "149.99",
      originalPrice: "199.99",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      reviews: 76,
      category: "风险管理",
      discount: 25,
      description: "智能风控系统，保护资产安全"
    },
    {
      id: 6,
      name: "社群交流权限",
      price: "19.99",
      originalPrice: "39.99",
      image: "/api/placeholder/300/200",
      rating: 4.4,
      reviews: 298,
      category: "社群服务",
      discount: 50,
      description: "加入精英交易者社群"
    }
  ]

  const categories = ["全部", "会员服务", "交易工具", "分析工具", "客户服务", "风险管理", "社群服务"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-6">


        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Shopping Cart */}
              <Button variant="outline" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                购物车 (0)
              </Button>

              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索商品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] bg-background"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter */}
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "全部" ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-[#00D4AA] hover:text-white transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-[#00D4AA]/10 to-[#00D4AA]/5 flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-[#00D4AA]/30" />
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {product.discount && (
                    <Badge className="bg-red-500 text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.isHot && (
                    <Badge className="bg-[#00D4AA] text-white">
                      <Zap className="h-3 w-3 mr-1" />
                      热卖
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-blue-500 text-white">
                      新品
                    </Badge>
                  )}
                </div>

                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} 评价)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#00D4AA]">
                      ¥{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="flex-1 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    加入购物车
                  </Button>
                  <Button variant="outline" size="sm">
                    详情
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            加载更多商品
          </Button>
        </div>
      </div>
    </div>
  )
}