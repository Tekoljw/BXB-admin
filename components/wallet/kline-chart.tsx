"use client"

interface KlineData {
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface KlineChartProps {
  data?: KlineData[]
  height?: number
  width?: number
}

export default function KlineChart({ 
  data, 
  height = 32, 
  width = 80 
}: KlineChartProps) {
  
  // 生成模拟K线数据
  const generateKlineData = () => {
    if (data && data.length > 0) {
      return data
    }
    
    const klineData = []
    let basePrice = 67000
    
    for (let i = 0; i < 10; i++) {
      const open = basePrice + (Math.random() - 0.5) * 200
      const close = open + (Math.random() - 0.5) * 400
      const high = Math.max(open, close) + Math.random() * 150
      const low = Math.min(open, close) - Math.random() * 150
      
      klineData.push({ open, high, low, close, volume: Math.random() * 1000 })
      basePrice = close
    }
    return klineData
  }

  const klineData = generateKlineData()
  const padding = 3
  
  // 计算价格范围
  const allPrices = klineData.flatMap(d => [d.high, d.low])
  const maxPrice = Math.max(...allPrices)
  const minPrice = Math.min(...allPrices)
  const priceRange = maxPrice - minPrice || 1
  
  // 计算整体趋势颜色
  const isPositive = klineData[klineData.length - 1]?.close > klineData[0]?.open
  const trendColor = isPositive ? "#00D4AA" : "#ef4444"
  const gradientId = `kline-gradient-${isPositive ? "up" : "down"}-${Math.random().toString(36).substr(2, 9)}`

  // 生成平滑趋势线路径
  const createTrendPath = () => {
    const closePrices = klineData.map(d => d.close)
    return closePrices
      .map((price, index) => {
        const x = padding + (index / (closePrices.length - 1)) * (width - padding * 2)
        const y = padding + ((maxPrice - price) / priceRange) * (height - padding * 2)
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={trendColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={trendColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* K线蜡烛图 */}
        {klineData.map((candle, index) => {
          const x = padding + (index / (klineData.length - 1)) * (width - padding * 2)
          const candleWidth = Math.max(1, (width - padding * 2) / klineData.length * 0.6)
          
          const openY = padding + ((maxPrice - candle.open) / priceRange) * (height - padding * 2)
          const closeY = padding + ((maxPrice - candle.close) / priceRange) * (height - padding * 2)
          const highY = padding + ((maxPrice - candle.high) / priceRange) * (height - padding * 2)
          const lowY = padding + ((maxPrice - candle.low) / priceRange) * (height - padding * 2)
          
          const isGreen = candle.close > candle.open
          const candleColor = isGreen ? "#00D4AA" : "#ef4444"
          
          return (
            <g key={index}>
              {/* 影线 */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={candleColor}
                strokeWidth="0.8"
                opacity="0.8"
              />
              {/* 实体 */}
              <rect
                x={x - candleWidth / 2}
                y={Math.min(openY, closeY)}
                width={candleWidth}
                height={Math.abs(closeY - openY) || 0.5}
                fill={candleColor}
                opacity="0.9"
              />
            </g>
          )
        })}

        {/* 趋势线覆盖 */}
        <path
          d={`${createTrendPath()} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#${gradientId})`}
        />
        
        <path
          d={createTrendPath()}
          fill="none"
          stroke={trendColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
          style={{
            filter: `drop-shadow(0 0 3px ${trendColor}40)`,
          }}
        />
      </svg>
    </div>
  )
}