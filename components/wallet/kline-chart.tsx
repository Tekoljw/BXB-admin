"use client"

import { ComposedChart, Line, Bar, ResponsiveContainer } from 'recharts'

interface KlineData {
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface KlineChartProps {
  data: KlineData[]
  height?: number
}

export default function KlineChart({ data, height = 40 }: KlineChartProps) {
  // 转换数据为图表格式
  const chartData = data.map((item, index) => ({
    index,
    ...item,
    candleColor: item.close > item.open ? '#00D4AA' : '#FF6B6B'
  }))

  return (
    <div className="w-16 h-10">
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke={chartData[chartData.length - 1]?.close > chartData[0]?.open ? '#00D4AA' : '#FF6B6B'}
            strokeWidth={1.5}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}