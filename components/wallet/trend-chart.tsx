"use client"

import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface TrendChartProps {
  data: number[]
  color?: string
  height?: number
  isPositive?: boolean
}

export default function TrendChart({ data, color, height = 40, isPositive = true }: TrendChartProps) {
  // 生成图表数据
  const chartData = data.map((value, index) => ({
    index,
    value
  }))

  const chartColor = color || (isPositive ? '#00D4AA' : '#FF6B6B')

  return (
    <div className="w-16 h-10">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={chartColor} 
            strokeWidth={2}
            dot={false}
            strokeDasharray={isPositive ? "0" : "0"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}