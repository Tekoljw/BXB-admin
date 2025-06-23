"use client"

interface TrendChartProps {
  data?: number[]
  color?: string
  height?: number
  isPositive?: boolean
  width?: number
}

export default function TrendChart({ 
  data, 
  color, 
  height = 32, 
  isPositive = true,
  width = 80
}: TrendChartProps) {
  
  // 生成平滑的趋势线数据
  const generateLineData = () => {
    if (data && data.length > 0) {
      return data
    }
    
    const points = []
    let baseValue = 50

    for (let i = 0; i < 12; i++) {
      const trend = isPositive ? 0.6 : -0.6
      const noise = (Math.random() - 0.5) * 6
      baseValue += trend + noise

      baseValue = Math.max(20, Math.min(80, baseValue))
      points.push(baseValue)
    }

    return points
  }

  const chartData = generateLineData()
  const padding = 3

  // 创建SVG路径
  const createPath = () => {
    const maxVal = Math.max(...chartData)
    const minVal = Math.min(...chartData)
    const range = maxVal - minVal || 1

    const pathData = chartData
      .map((value, index) => {
        const x = padding + (index / (chartData.length - 1)) * (width - padding * 2)
        const y = padding + ((maxVal - value) / range) * (height - padding * 2)
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")

    return pathData
  }

  const lineColor = color || (isPositive ? "#00D4AA" : "#ef4444")
  const gradientId = `gradient-${isPositive ? "up" : "down"}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 填充区域 */}
        <path
          d={`${createPath()} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#${gradientId})`}
        />

        {/* 主线条 */}
        <path
          d={createPath()}
          fill="none"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
          style={{
            filter: `drop-shadow(0 0 4px ${lineColor}50)`,
          }}
        />
      </svg>
    </div>
  )
}